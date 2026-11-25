// Review sheet of battle portraits: one row per portrait, drawn in the 6 palettes of the game
// (Classique, Azur, Sépia, Gris, Nuit, Contraste), on the light background of the battle screen.
// Usage: npm run planche -- --portraits <lot> <id> [<id> ...]
//   <id> is a portrait id (portrait/<id>) or back/<id> for a player back view.
// Output: docs/Pnj/rendus/planche-portraits-<lot>.png
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { PNG } from 'pngjs';

import { PALETTES } from '../src/gfx/palette.js';
import { buildTrainerFrames } from '../src/gfx/sources/trainers/index.js';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const OUTPUT_DIR = path.join(ROOT, 'docs', 'Pnj', 'rendus');
const SCALE = 3;
const GAP = 6;
const SIZE = 48;
const hex = (color) => [1, 3, 5].map((index) => parseInt(color.slice(index, index + 2), 16));

/** frames: [[label, rows]]. Returns the PNG buffer. */
export function buildPortraitSheet(frames, palettes = PALETTES) {
  const cell = SIZE * SCALE + GAP;
  const width = palettes.length * cell + GAP;
  const height = frames.length * cell + GAP;
  const png = new PNG({ width, height });
  const separator = [128, 128, 128];
  for (let i = 0; i < width * height; i += 1) png.data.set([...separator, 255], i * 4);
  frames.forEach(([, rows], row) => palettes.forEach((palette, column) => {
    const colors = palette.colors.map(hex);
    const ox = GAP + column * cell;
    const oy = GAP + row * cell;
    rows.forEach((line, y) => [...line].forEach((character, x) => {
      const color = colors[character === '.' ? 0 : Number(character)];
      for (let dy = 0; dy < SCALE; dy += 1) {
        for (let dx = 0; dx < SCALE; dx += 1) png.data.set([...color, 255], ((oy + y * SCALE + dy) * width + ox + x * SCALE + dx) * 4);
      }
    }));
  }));
  return PNG.sync.write(png);
}

export function main([lot, ...ids]) {
  if (!lot || ids.length === 0) throw new Error('Usage: npm run planche -- --portraits <lot> <id> [...]');
  const all = buildTrainerFrames();
  const frames = ids.map((id) => {
    const key = id.startsWith('back/') ? id : `portrait/${id}`;
    if (!all[key]) throw new Error(`Portrait inconnu : ${key}`);
    return [key, all[key]];
  });
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  const file = path.join(OUTPUT_DIR, `planche-portraits-${lot}.png`);
  fs.writeFileSync(file, buildPortraitSheet(frames));
  process.stdout.write(`${path.relative(ROOT, file)} : ${frames.map(([key]) => key).join(', ')}\n`);
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  try {
    main(process.argv.slice(2));
  } catch (error) {
    process.stderr.write(`${error.message}\n`);
    process.exit(1);
  }
}
