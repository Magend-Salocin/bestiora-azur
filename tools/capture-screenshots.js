// npm run screenshots: launches the game in capture mode (electron/dev-tasks.js), which writes
// the 160 × 144 game canvas of each step to docs/screenshots/, then enlarges each image 4 times
// without smoothing for the README.
import fs from 'node:fs';
import path from 'node:path';
import { PNG } from 'pngjs';
import { ROOT, runElectron } from './run-electron.js';

import { CREATURES } from '../src/data/creatures.js';
import { TRAINER_CLASSES_BY_ID } from '../src/data/trainer-classes.js';
import { TRAINERS } from '../src/data/trainers.js';

/** Folder of a species' captures: number and displayed name, e.g. « 022-dame-verte ». */
export function previewFolder(species) {
  const slug = species.name.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
  return `${String(species.number).padStart(3, '0')}-${slug}`;
}

// --preview <id | name | number>: bestiary V2 preview of one species, in
// docs/bestiaire-folklorique/rendus/<number>-<name>/ (see previewFolder).
const previewIndex = process.argv.indexOf('--preview');
const previewArgument = previewIndex >= 0 ? process.argv[previewIndex + 1] ?? 'korrigan' : null;
const previewSpecies = previewArgument === null ? null : CREATURES.find((creature) =>
  [creature.id, creature.name.toLowerCase(), String(creature.number), String(creature.number).padStart(3, '0')].includes(previewArgument.toLowerCase()));
if (previewArgument !== null && !previewSpecies) {
  process.stderr.write(`Espèce inconnue : ${previewArgument}\n`);
  process.exit(1);
}
/** Portrait id shown for a trainer: its own, or its class's. */
export const trainerPortrait = (trainer) => (trainer.portrait ?? TRAINER_CLASSES_BY_ID[trainer.class]?.portrait ?? '').replace('portrait/', '');

// --trainer <trainer id | portrait id>: battle portrait captures (start and defeat) in
// docs/Pnj/rendus/<portrait id>/. A portrait id picks the first trainer that shows it.
const trainerIndex = process.argv.indexOf('--trainer');
const trainerArgument = trainerIndex >= 0 ? process.argv[trainerIndex + 1] : null;
const previewTrainer = trainerArgument === null ? null
  : TRAINERS.find((trainer) => trainer.id === trainerArgument) ?? TRAINERS.find((trainer) => trainerPortrait(trainer) === trainerArgument);
if (trainerArgument !== null && !previewTrainer) {
  process.stderr.write(`Dresseur ou portrait inconnu : ${trainerArgument}
`);
  process.exit(1);
}

let OUTPUT_DIR = path.join(ROOT, 'docs', 'screenshots');
if (previewSpecies) OUTPUT_DIR = path.join(ROOT, 'docs', 'bestiaire-folklorique', 'rendus', previewFolder(previewSpecies));
if (previewTrainer) OUTPUT_DIR = path.join(ROOT, 'docs', 'Pnj', 'rendus', trainerPortrait(previewTrainer));
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

const result = runElectron(['--dev', `--capture=${OUTPUT_DIR}`, ...(previewSpecies ? [`--preview=${previewSpecies.id}`] : []), ...(previewTrainer ? [`--trainer=${previewTrainer.id}`] : [])]);
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
