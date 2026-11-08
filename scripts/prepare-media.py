"""Create web delivery assets without changing source exports.

Requires Pillow and ffmpeg. Run: python scripts/prepare-media.py --ffmpeg /path/to/ffmpeg
Original LEO exports stay local; commit the generated assets and mediaManifest.json.
"""
import argparse
from concurrent.futures import ThreadPoolExecutor
import io
import json
from pathlib import Path
import re
import subprocess

from PIL import Image, ImageDraw

ROOT = Path(__file__).resolve().parents[1]
PUBLIC = ROOT / "public"
parser = argparse.ArgumentParser(description=__doc__)
parser.add_argument("--ffmpeg", default="ffmpeg")
parser.add_argument("--images-only", action="store_true", help="Only rebuild responsive images; keep existing video manifest")
args = parser.parse_args()


def run(*command):
    result = subprocess.run([args.ffmpeg, "-hide_banner", "-loglevel", "error", *map(str, command)], capture_output=True)
    if result.returncode:
        raise RuntimeError(result.stderr.decode(errors="replace"))
    return result.stdout


def url(path):
    return "/" + path.relative_to(PUBLIC).as_posix()


def prepare_video(source):
    probe = subprocess.run([args.ffmpeg, "-hide_banner", "-i", str(source)], capture_output=True).stderr.decode(errors="replace")
    duration_match = re.search(r"Duration: (\d+):(\d+):([\d.]+)", probe)
    size_match = re.search(r"Video:.*? (\d{3,5})x(\d{3,5})", probe)
    if not duration_match or not size_match:
        raise ValueError(f"Could not read video metadata: {source.name}")
    hours, minutes, seconds = map(float, duration_match.groups())
    duration = hours * 3600 + minutes * 60 + seconds
    width, height = map(int, size_match.groups())
    slug = re.sub(r"[^a-z0-9]+", "-", source.stem.lower()).strip("-")
    delivery = source.parent / "optimized" / f"{slug}.v1.mp4"
    poster = source.parent / "posters" / f"{slug}.v1.webp"
    delivery.parent.mkdir(exist_ok=True)
    poster.parent.mkdir(exist_ok=True)
    if delivery.exists():
        existing_probe = subprocess.run([args.ffmpeg, "-hide_banner", "-i", str(delivery)], capture_output=True).stderr.decode(errors="replace")
        if not re.search(r"Duration: \d+:\d+:[\d.]+", existing_probe):
            delivery.rename(delivery.with_suffix('.incomplete'))
    if not delivery.exists():
        scale = "scale=-2:720" if width >= height else "scale=720:-2"
        temporary = delivery.with_suffix('.tmp.mp4')
        run("-y", "-i", source, "-map", "0:v:0", "-map", "0:a:0?", "-vf", scale,
            "-r", "30", "-c:v", "libx264", "-preset", "fast", "-crf", "22",
            "-maxrate", "4M", "-bufsize", "8M", "-pix_fmt", "yuv420p",
            "-threads", "2", "-c:a", "aac", "-b:a", "128k", "-movflags", "+faststart", temporary)
        temporary.replace(delivery)
    frames = []
    for fraction in (0.2, 0.5, 0.8):
        data = run("-ss", duration * fraction, "-i", source, "-frames:v", "1", "-vf", "scale=640:-2", "-f", "image2pipe", "-vcodec", "png", "-")
        frame = Image.open(io.BytesIO(data)).convert("RGB")
        frames.append(frame)
    if not poster.exists():
        frames[0].save(poster, "WEBP", quality=82)
    print(f"Prepared {source.name}: {source.stat().st_size / 1e6:.1f} MB -> {delivery.stat().st_size / 1e6:.1f} MB", flush=True)
    return source.name, {
        "video": url(delivery), "poster": url(poster), "duration": round(duration, 2),
        "orientation": "landscape" if width >= height else "portrait",
        "sourceBytes": source.stat().st_size, "bytes": delivery.stat().st_size,
    }, frames


sources = [] if args.images_only else sorted((PUBLIC / "assets" / "LEO").glob("*.mp4"))
if not sources and not args.images_only:
    raise SystemExit("No LEO source exports found in public/assets/LEO")
with ThreadPoolExecutor(max_workers=2) as pool:
    videos = list(pool.map(prepare_video, sources))

previews = {}
# Include existing WebP artwork and large raster images referenced by the app.
image_sources = set(PUBLIC.rglob('*.webp'))
for code in (ROOT / 'src').rglob('*'):
    if code.suffix not in ('.jsx', '.js'):
        continue
    for image_url in re.findall(r'''['"](/[^'"?]+\.(?:png|jpg|jpeg|JPG|PNG|webp))(?:\?[^'"]*)?['"]''', code.read_text(encoding='utf-8')):
        source = PUBLIC / image_url.lstrip('/')
        if source.exists():
            image_sources.add(source)
for source in sorted(image_sources):
    if 'previews' in source.parts or 'LEO' in source.parts or source.stat().st_size < 25000:
        continue
    with Image.open(source) as original:
        width, height = original.size
    if width < 960:
        continue
    variants = {}
    for size in (360, 960):
        target = source.parent / "previews" / f"{source.name}.{size}.v2.webp"
        target.parent.mkdir(exist_ok=True)
        if not target.exists():
            with Image.open(source) as image:
                image = image.resize((size, round(height * size / width)), Image.Resampling.LANCZOS)
                image.save(target, "WEBP", quality=76 if size == 360 else 82)
        variants[str(size)] = url(target)
    previews[url(source)] = variants

previous = json.loads((ROOT / 'src/data/mediaManifest.json').read_text(encoding='utf-8')) if args.images_only else {}
manifest = {"leo": previous.get('leo', {name: data for name, data, _ in videos}), "thumbnails": previews}
(ROOT / "src" / "data" / "mediaManifest.json").write_text(json.dumps(manifest, indent=2) + "\n", encoding="utf-8")

background = PUBLIC / 'bg.v2.mp4'
if not background.exists() and not args.images_only:
    temporary = PUBLIC / 'bg.v2.tmp.mp4'
    run('-y', '-i', PUBLIC / 'bg.mp4', '-vf', 'scale=960:-2', '-r', '24', '-an',
        '-c:v', 'libx264', '-preset', 'fast', '-crf', '30', '-maxrate', '600k',
        '-bufsize', '1200k', '-pix_fmt', 'yuv420p', '-threads', '2', '-movflags', '+faststart', temporary)
    temporary.replace(background)

# Review multiple points of each edit, rather than picking samples by filename.
review_dir = ROOT / "scratch" / "media-review"
review_dir.mkdir(parents=True, exist_ok=True)
for batch in range(0, len(videos), 6):
    entries = videos[batch:batch + 6]
    sheet = Image.new("RGB", (1200, len(entries) * 256), "#101014")
    draw = ImageDraw.Draw(sheet)
    for row, (name, data, frames) in enumerate(entries):
        y = row * 256
        draw.text((12, y + 8), f"{name} | {data['duration']}s", fill="white")
        for col, frame in enumerate(frames):
            frame.thumbnail((392, 216))
            sheet.paste(frame, (col * 400 + 4, y + 30))
    sheet.save(review_dir / f"leo-{batch // 6 + 1}.jpg")
print("Wrote media manifest, thumbnail variants, and review contact sheets.", flush=True)
