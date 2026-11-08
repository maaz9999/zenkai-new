import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const manifest = JSON.parse(fs.readFileSync(path.join(root, 'src/data/mediaManifest.json'), 'utf8'));
const publicRoot = path.join(root, 'public');
const files = new Set();
function inventory(directory, relative = '') {
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    const key = `${relative}/${entry.name}`;
    if (entry.isDirectory()) inventory(path.join(directory, entry.name), key);
    else files.add(key);
  }
}
inventory(publicRoot);
function requireAsset(url) {
  assert(files.has(url), `Missing asset or incorrect filename casing: ${url}`);
  return path.join(publicRoot, url.slice(1));
}
// An MP4 can start streaming before downloading its media only with moov first.
function checkFastStart(file) {
  const fd = fs.openSync(file, 'r');
  const header = Buffer.alloc(16);
  let offset = 0;
  const atoms = [];
  while (offset < fs.statSync(file).size) {
    assert(fs.readSync(fd, header, 0, 16, offset) >= 8, `Invalid MP4 header: ${file}`);
    const size = header.readUInt32BE(0);
    const length = size === 1 ? Number(header.readBigUInt64BE(8)) : size;
    atoms.push(header.toString('ascii', 4, 8));
    if (length === 0) break;
    assert(length >= 8, `Invalid MP4 atom: ${file}`);
    offset += length;
  }
  fs.closeSync(fd);
  assert(atoms.includes('moov') && atoms.includes('mdat') && atoms.indexOf('moov') < atoms.indexOf('mdat'), `MP4 not ready for streaming: ${file}`);
}
let sourceBytes = 0;
let deliveryBytes = 0;
for (const reel of Object.values(manifest.leo)) {
  const file = requireAsset(reel.video);
  requireAsset(reel.poster);
  assert(reel.duration > 0, `Missing duration: ${file}`);
  assert(fs.statSync(file).size === reel.bytes, `Delivery asset changed without updating manifest: ${file}`);
  checkFastStart(file);
  sourceBytes += reel.sourceBytes;
  deliveryBytes += reel.bytes;
}
for (const [source, variants] of Object.entries(manifest.thumbnails)) {
  requireAsset(source);
  for (const image of Object.values(variants)) requireAsset(image);
}
checkFastStart(path.join(publicRoot, 'bg.v2.mp4'));
const buildLEO = path.join(root, 'dist/assets/LEO');
assert(fs.existsSync(buildLEO), 'Run the production build before this check.');
assert(!fs.readdirSync(buildLEO).some(file => /\.mp4$/i.test(file)), 'Full-size LEO exports leaked into the production build.');
console.log(`Verified ${Object.keys(manifest.leo).length} reels, fast-start MP4 headers, ${Object.keys(manifest.thumbnails).length} responsive image sets, and master-file exclusion.`);
console.log(`LEO: ${(sourceBytes / 1e6).toFixed(1)} MB -> ${(deliveryBytes / 1e6).toFixed(1)} MB (${(100 * (1 - deliveryBytes / sourceBytes)).toFixed(1)}% smaller).`);
