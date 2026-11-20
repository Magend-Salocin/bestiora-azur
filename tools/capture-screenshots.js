// npm run screenshots: launches the game in capture mode (electron/dev-tasks.js), which writes
// the 160 × 144 game canvas of each step to docs/screenshots/, then enlarges each image 4 times
// without smoothing for the README.
import fs from 'node:fs';
import path from 'node:path';
import { PNG } from 'pngjs';
import { ROOT, runElectron } from './run-electron.js';

const OUTPUT_DIR = path.join(ROOT, 'docs', 'screenshots');
const SCALE = 4;

/** Nearest neighbor enlargement of a PNG buffer. */
export function enlargePng(buffer, scale) {
  const source = PNG.sync.read(buffer);
  const target = new PNG({ width: source.width * scale, height: source.height * scale });
  for (let y = 0; y < target.height; y += 1) {
    for (let x = 0; x < target.width; x += 1) {
      const from = (Math.floor(y / scale) * source.width + Math.floor(x / scale)) * 4;
      source.data.copy(target.data, (y * target.width + x) * 4, from, from + 4);
    }
  }
  return PNG.sync.write(target);
}

const result = runElectron(['--dev', `--capture=${OUTPUT_DIR}`]);
if (result.status !== 0) {
  process.stderr.write(`La capture a échoué (code ${result.status ?? result.signal}).\n`);
  process.exit(1);
}
const files = fs.readdirSync(OUTPUT_DIR).filter((file) => file.endsWith('.png'));
for (const file of files) {
  const target = path.join(OUTPUT_DIR, file);
  const image = PNG.sync.read(fs.readFileSync(target));
  if (image.width === 160) fs.writeFileSync(target, enlargePng(fs.readFileSync(target), SCALE));
}
process.stdout.write(`${files.length} captures dans ${path.relative(ROOT, OUTPUT_DIR)}/\n`);
