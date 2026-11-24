// Dev only: puts the game in the state of each README screenshot (npm run screenshots).
// The main process (electron/capture.js) calls window.debugCapture(step), waits for it, then
// captures the window.
import { createCreature } from '../battle/logic/creature.js';
import { CREATURES } from '../data/creatures.js';
import { createRng } from '../engine/rng.js';
import { hooks } from '../overworld/hooks.js';
import { addCreature, createGameState, markCaught, markSeen } from '../state/game-state.js';
import { BestiaryScreen } from '../ui/bestiary-screen.js';
import { PartyScreen } from '../ui/party-screen.js';
import { STARTER_IDS, StarterChoiceScene } from '../ui/starter-choice.js';

export const CAPTURE_STEPS = ['title', 'town', 'menu', 'battle'];

const wait = (seconds) => new Promise((resolve) => setTimeout(resolve, seconds * 1000));

function demoState() {
  const rng = createRng(12);
  const state = createGameState({ player: { name: 'Elio', gender: 'boy' }, flags: { has_bestiary: true } });
  for (const [species, level] of [['galtza', 24], ['farfadet', 18], ['tarasquin', 16]]) addCreature(state, createCreature(species, level, rng));
  for (const species of ['farfandole', 'tarasque', 'korrigan']) markSeen(state, species);
  state.badges = ['roche', 'eau', 'foudre'];
  state.playTime = 4 * 3600 + 17 * 60;
  return state;
}

/** ctx: { scenes, getOverworld, startGame }. Resolves when the screen is ready to capture. */
export async function runCaptureStep(step, { scenes, getOverworld, startGame }) {
  if (step === 'title') return wait(3);
  if (step === 'town') {
    startGame(demoState(), { map: 'cendrelune', x: 3, y: 9, facing: 'down' });
    return wait(1.5);
  }
  if (step === 'menu') {
    const overworld = getOverworld();
    overworld.runBusy(() => overworld.openStartMenu());
    return wait(0.8);
  }
  if (step === 'battle') {
    scenes.pop(); // the start menu
    hooks.startWildBattle({ creature: 'farfandole', level: 17 });
    return wait(5.5);
  }
  if (PREVIEW_STEPS.includes(step)) return runPreviewStep(step, { scenes, startGame });
  throw new Error(`Unknown capture step: ${step}`);
}

// Bestiary V2 preview (npm run screenshots -- --preview <species>): the species in every
// screen where it is drawn, written to docs/bestiaire-folklorique/rendus/.
export const PREVIEW_STEPS = ['starter', 'bestiary', 'bestiary-2', 'party', 'battle-front', 'battle-back'];

let previewBestiary = null;

function previewState(species, lead) {
  const rng = createRng(7);
  const state = createGameState({ player: { name: 'Elio', gender: 'boy' }, flags: { has_bestiary: true } });
  for (const [id, level] of [[lead, 12], ['farfadet', 9], ['tarasquin', 10]]) addCreature(state, createCreature(id, level, rng));
  markSeen(state, species);
  markCaught(state, species);
  return state;
}

async function runPreviewStep(step, { scenes, startGame }) {
  const species = new URLSearchParams(window.location.search).get('preview') ?? 'korrigan';
  const index = CREATURES.findIndex((creature) => creature.id === species);
  const reset = (lead = species) => {
    while (scenes.size > 1) scenes.pop();
    const state = previewState(species, lead);
    startGame(state, { map: 'cendrelune', x: 3, y: 9, facing: 'down' });
    return state;
  };
  if (step === 'starter') {
    reset();
    const starter = scenes.push(new StarterChoiceScene());
    starter.index = Math.max(0, STARTER_IDS.indexOf(species));
    return wait(1);
  }
  if (step === 'bestiary') {
    previewBestiary = new BestiaryScreen(reset());
    previewBestiary.index = index;
    previewBestiary.view = 'entry';
    scenes.push(previewBestiary);
    return wait(0.5);
  }
  if (step === 'bestiary-2') {
    previewBestiary.page = 1;
    return wait(0.6);
  }
  if (step === 'party') {
    scenes.push(new PartyScreen(reset().party));
    return wait(0.5);
  }
  if (step === 'battle-front') {
    reset('galtza');
    hooks.startWildBattle({ creature: species, level: 8 });
    return wait(5.5);
  }
  reset();
  hooks.startWildBattle({ creature: 'farfadet', level: 8 });
  await wait(5.5);
  await pressA(); // « Un Pivelin sauvage apparaît ! » → the player sends the species
  return wait(4);
}

/** Taps the A key (X), as the player would. */
async function pressA() {
  window.dispatchEvent(new KeyboardEvent('keydown', { code: 'KeyX' }));
  await wait(0.1);
  window.dispatchEvent(new KeyboardEvent('keyup', { code: 'KeyX' }));
}
