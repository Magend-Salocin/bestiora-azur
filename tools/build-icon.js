// Builds the application icon from the pixel source of Azurel: build/icon.png (512 × 512),
// build/icon.ico (Windows, 16 to 256) and build/icon.icns (macOS, 16 to 1024).
// The icon is a 64 × 64 pixel design (rounded badge in the Azur palette, Azurel in the middle)
// enlarged without smoothing. Usage: npm run icon
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { PNG } from 'pngjs';
import { PALETTES } from '../src/gfx/palette.js';
import { HAND_DRAWN_CREATURES } from '../src/gfx/sources/creatures/index.js';
import { TRANSPARENT, parseSprite } from '../src/gfx/sprite-utils.js';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const OUTPUT_DIR = path.join(ROOT, 'build');

const DESIGN_SIZE = 64;
const CORNER_RADIUS = 12;
const BORDER = 2;
const ICO_SIZES = [16, 32, 48, 64, 128, 256];
const ICNS_TYPES = [['icp4', 16], ['icp5', 32], ['icp6', 64], ['ic07', 128], ['ic08', 256], ['ic09', 512], ['ic10', 1024]];

const hexToRgba = (hex) => [1, 3, 5].map((offset) => parseInt(hex.slice(offset, offset + 2), 16)).concat(255);
const COLORS = PALETTES.find((palette) => palette.id === 'azur').colors.map(hexToRgba);

/** Is (x, y) inside a rounded square of `size` with corner radius `radius`, shrunk by `inset`? */
function insideRoundedSquare(x, y, size, radius, inset) {
  const min = inset;
  const max = size - 1 - inset;
  const r = radius - inset;
  if (x < min || x > max || y < min || y > max) return false;
  const cx = Math.min(Math.max(x, min + r), max - r);
  const cy = Math.min(Math.max(y, min + r), max - r);
  return (x - cx) ** 2 + (y - cy) ** 2 <= r ** 2;
}

/** 64 × 64 grid of palette indexes (TRANSPARENT outside the badge). */
export function iconDesign() {
  const grid = new Int8Array(DESIGN_SIZE * DESIGN_SIZE).fill(TRANSPARENT);
  for (let y = 0; y < DESIGN_SIZE; y += 1) {
    for (let x = 0; x < DESIGN_SIZE; x += 1) {
      if (insideRoundedSquare(x, y, DESIGN_SIZE, CORNER_RADIUS, BORDER)) grid[y * DESIGN_SIZE + x] = 1;
      else if (insideRoundedSquare(x, y, DESIGN_SIZE, CORNER_RADIUS, 0)) grid[y * DESIGN_SIZE + x] = 3;
    }
  }
  const sprite = parseSprite(HAND_DRAWN_CREATURES.azurel.front);
  const offsetX = (DESIGN_SIZE - sprite.width) / 2;
  const offsetY = (DESIGN_SIZE - sprite.height) / 2;
  const spriteAt = (x, y) => (x >= 0 && y >= 0 && x < sprite.width && y < sprite.height ? sprite.pixels[y * sprite.width + x] : TRANSPARENT);
  for (let y = -1; y <= sprite.height; y += 1) {
    for (let x = -1; x <= sprite.width; x += 1) {
      const value = spriteAt(x, y);
      // A light 1-pixel halo around the silhouette detaches Azurel from the badge.
      const halo = [[1, 0], [-1, 0], [0, 1], [0, -1]].some(([dx, dy]) => spriteAt(x + dx, y + dy) !== TRANSPARENT);
      if (value !== TRANSPARENT) grid[(y + offsetY) * DESIGN_SIZE + x + offsetX] = value;
      else if (halo) grid[(y + offsetY) * DESIGN_SIZE + x + offsetX] = 0;
    }
  }
  return grid;
}

/** PNG of the design at `size` × `size`, nearest neighbor (exact for multiples of 64). */
export function renderIconPng(grid, size) {
  const png = new PNG({ width: size, height: size });
  for (let y = 0; y < size; y += 1) {
    for (let x = 0; x < size; x += 1) {
      const value = grid[Math.floor((y * DESIGN_SIZE) / size) * DESIGN_SIZE + Math.floor((x * DESIGN_SIZE) / size)];
      const rgba = value === TRANSPARENT ? [0, 0, 0, 0] : COLORS[value];
      png.data.set(rgba, (y * size + x) * 4);
    }
  }
  return PNG.sync.write(png);
}

/** Windows .ico holding PNG images (supported since Windows Vista). */
export function buildIco(images) {
  const header = Buffer.alloc(6 + images.length * 16);
  header.writeUInt16LE(0, 0);
  header.writeUInt16LE(1, 2);
  header.writeUInt16LE(images.length, 4);
  let offset = header.length;
  images.forEach(({ size, data }, index) => {
    const entry = 6 + index * 16;
    header.writeUInt8(size >= 256 ? 0 : size, entry);
    header.writeUInt8(size >= 256 ? 0 : size, entry + 1);
    header.writeUInt16LE(1, entry + 4);
    header.writeUInt16LE(32, entry + 6);
    header.writeUInt32LE(data.length, entry + 8);
    header.writeUInt32LE(offset, entry + 12);
    offset += data.length;
  });
  return Buffer.concat([header, ...images.map((image) => image.data)]);
}

/** macOS .icns holding PNG images. */
export function buildIcns(images) {
  const chunks = images.map(({ type, data }) => {
    const head = Buffer.alloc(8);
    head.write(type, 0, 'ascii');
    head.writeUInt32BE(data.length + 8, 4);
    return Buffer.concat([head, data]);
  });
  const head = Buffer.alloc(8);
  head.write('icns', 0, 'ascii');
  head.writeUInt32BE(8 + chunks.reduce((total, chunk) => total + chunk.length, 0), 4);
  return Buffer.concat([head, ...chunks]);
}

function main() {
  const grid = iconDesign();
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  fs.writeFileSync(path.join(OUTPUT_DIR, 'icon.png'), renderIconPng(grid, 512));
  fs.writeFileSync(path.join(OUTPUT_DIR, 'icon.ico'), buildIco(ICO_SIZES.map((size) => ({ size, data: renderIconPng(grid, size) }))));
  fs.writeFileSync(path.join(OUTPUT_DIR, 'icon.icns'), buildIcns(ICNS_TYPES.map(([type, size]) => ({ type, data: renderIconPng(grid, size) }))));
  process.stdout.write(`Icônes écrites dans ${path.relative(ROOT, OUTPUT_DIR)}/ (icon.png, icon.ico, icon.icns)\n`);
}

if (process.argv[1] === fileURLToPath(import.meta.url)) main();
