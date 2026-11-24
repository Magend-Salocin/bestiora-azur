// Review sheet of creature sprites: one row per species with front, back and party icon,
// on the Classique palette. Species without a hand-drawn source show their generated sprite.
// Usage: npm run planche -- <from>-<to> [<from>-<to> ...]   (numbers, e.g. 001-009 010-024)
// Output: docs/bestiaire-folklorique/rendus/planche-<from>-<to>.png
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { PNG } from 'pngjs';

import { CREATURES } from '../src/data/creatures.js';
import { PALETTES } from '../src/gfx/palette.js';
import { HAND_DRAWN_CREATURES } from '../src/gfx/sources/creatures/index.js';
import { spriteToRows } from '../src/gfx/sprite-utils.js';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const OUTPUT_DIR = path.join(ROOT, 'docs', 'bestiaire-folklorique', 'rendus');
const SCALE = 3;
const GAP = 6;
const COLUMNS = 3;
const hex = (color) => [1, 3, 5].map((index) => parseInt(color.slice(index, index + 2), 16));
const COLORS = PALETTES[0].colors.map(hex);

function views(species) {
  return HAND_DRAWN_CREATURES[species.id];
}

export function buildSheet(species) {
  const cellWidth = (48 * 2 + 16) * SCALE + 3 * GAP;
  const cellHeight = 48 * SCALE + GAP;
  const rows = Math.ceil(species.length / COLUMNS);
  const width = Math.min(COLUMNS, species.length) * cellWidth + GAP;
  const height = rows * cellHeight + GAP;
  const png = new PNG({ width, height });
  for (let i = 0; i < width * height; i += 1) png.data.set([...COLORS[3], 255], i * 4);
  const draw = (pixels, ox, oy) => pixels.forEach((row, y) => [...row].forEach((character, x) => {
    const color = COLORS[character === '.' ? 0 : Number(character)];
    for (let dy = 0; dy < SCALE; dy += 1) {
      for (let dx = 0; dx < SCALE; dx += 1) png.data.set([...color, 255], ((oy + y * SCALE + dy) * width + ox + x * SCALE + dx) * 4);
    }
  }));
  species.forEach((item, index) => {
    const { front, back, icon } = views(item);
    const ox = GAP + (index % COLUMNS) * cellWidth;
    const oy = GAP + Math.floor(index / COLUMNS) * cellHeight;
    draw(front, ox, oy);
    draw(back, ox + 48 * SCALE + GAP, oy);
    if (icon) draw(icon, ox + 96 * SCALE + 2 * GAP, oy);
  });
  return PNG.sync.write(png);
}

function main(ranges) {
  if (ranges.length === 0) throw new Error('Usage: npm run planche -- <from>-<to> [...]');
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  for (const range of ranges) {
    const [from, to = from] = range.split('-').map(Number);
    const species = CREATURES.filter((creature) => creature.number >= from && creature.number <= to);
    if (species.length === 0) throw new Error(`No species in ${range}`);
    const name = `planche-${String(from).padStart(3, '0')}-${String(to).padStart(3, '0')}.png`;
    fs.writeFileSync(path.join(OUTPUT_DIR, name), buildSheet(species));
    process.stdout.write(`${path.relative(ROOT, path.join(OUTPUT_DIR, name))} : ${species.length} espèces\n`);
  }
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  try {
    main(process.argv.slice(2));
  } catch (error) {
    process.stderr.write(`${error.message}\n`);
    process.exit(1);
  }
}
