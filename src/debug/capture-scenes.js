// Dev only: puts the game in the state of each README screenshot (npm run screenshots).
// The main process (electron/capture.js) calls window.debugCapture(step), waits for it, then
// captures the window.
import { createCreature } from '../battle/logic/creature.js';
import { createRng } from '../engine/rng.js';
import { hooks } from '../overworld/hooks.js';
import { addCreature, createGameState, markSeen } from '../state/game-state.js';

export const CAPTURE_STEPS = ['title', 'town', 'menu', 'battle'];

const wait = (seconds) => new Promise((resolve) => setTimeout(resolve, seconds * 1000));

function demoState() {
  const rng = createRng(12);
  const state = createGameState({ player: { name: 'Elio', gender: 'boy' }, flags: { has_bestiary: true } });
  for (const [species, level] of [['braisille', 24], ['pivelin', 18], ['flaquin', 16]]) addCreature(state, createCreature(species, level, rng));
  for (const species of ['grivelin', 'marevor', 'fenouillot']) markSeen(state, species);
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
    hooks.startWildBattle({ creature: 'grivelin', level: 17 });
    return wait(5.5);
  }
  throw new Error(`Unknown capture step: ${step}`);
}
