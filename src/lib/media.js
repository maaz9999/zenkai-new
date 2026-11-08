import media from '../data/mediaManifest.json';

export function thumbnailPreview(image, width = 960) {
  return media.thumbnails[image]?.[String(width)] || image;
}

export function thumbnailSrcSet(image) {
  const variants = media.thumbnails[image];
  return variants ? `${variants['360']} 360w, ${variants['960']} 960w` : undefined;
}

export function reelPoster(videoUrl) {
  const leo = Object.values(media.leo).find((reel) => reel.video === videoUrl);
  if (leo) return leo.poster;
  if (videoUrl?.includes('/assets/REELS/')) return videoUrl.replace('/assets/REELS/', '/assets/REELS/posters/').replace(/\.mp4$/i, '.webp');
  if (videoUrl === '/assets/GROWTH CREATIVE.mp4') return '/assets/REELS/posters/GROWTH CREATIVE.webp';
  if (videoUrl === '/media/reel-showcase.mp4') return '/assets/REELS/posters/reel-showcase.webp';
  return undefined;
}
