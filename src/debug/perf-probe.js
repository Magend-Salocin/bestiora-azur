// Dev only (npm run perf): measures frame times on a dense map and in a battle with every move
// animation, plus the time from page load to the title screen.
import { TYPE_ANIMATIONS } from '../battle/ui/move-animations.js';
import { hooks } from '../overworld/hooks.js';
import { addCreature, createGameState } from '../state/game-state.js';
import { createCreature } from '../battle/logic/creature.js';
import { createRng } from '../engine/rng.js';
import { getMapDefinition } from '../data/maps/index.js';

const wait = (seconds) => new Promise((resolve) => setTimeout(resolve, seconds * 1000));

/** Wraps scenes.update / render to sum their CPU time while `measure` runs. */
function instrument(scenes) {
  const totals = { update: 0, render: 0 };
  const original = { update: scenes.update, render: scenes.render };
  scenes.update = (...args) => {
    const start = performance.now();
    original.update(...args);
    totals.update += performance.now() - start;
  };
  scenes.render = (...args) => {
    const start = performance.now();
    original.render(...args);
    totals.render += performance.now() - start;
  };
  return { totals, restore: () => Object.assign(scenes, original) };
}

/** Frame intervals (requestAnimationFrame) and game CPU time over `seconds`. */
async function measure(scenes, seconds) {
  const { totals, restore } = instrument(scenes);
  const intervals = [];
  let last = performance.now();
  let running = true;
  const tick = (now) => {
    intervals.push(now - last);
    last = now;
    if (running) requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
  await wait(seconds);
  running = false;
  restore();
  intervals.shift();
  const sorted = [...intervals].sort((a, b) => a - b);
  const frames = intervals.length;
  return {
    fps: Math.round((frames / seconds) * 10) / 10,
    frameMs95: Math.round(sorted[Math.floor(frames * 0.95)] * 100) / 100,
    frameMsMax: Math.round(sorted[frames - 1] * 100) / 100,
    framesOver20ms: intervals.filter((interval) => interval > 20).length,
    gameCpuMsPerFrame: Math.round(((totals.update + totals.render) / frames) * 1000) / 1000,
  };
}

function denseState() {
  const rng = createRng(3);
  const state = createGameState({ player: { name: 'Elio', gender: 'boy' } });
  for (const species of ['braisille', 'pivelin', 'flaquin']) addCreature(state, createCreature(species, 30, rng));
  return state;
}

/** ctx: { scenes, startGame, bootTime }. Resolves with the measures. */
export async function runPerfProbe({ scenes, startGame, bootTime }) {
  const results = { titleReadyMs: Math.round(bootTime) };
  // Ombrecourt: a large town with many NPCs walking around.
  const { flyPoint } = getMapDefinition('ombrecourt');
  startGame(denseState(), { map: 'ombrecourt', ...flyPoint, facing: 'down' });
  await wait(1);
  results.denseMap = await measure(scenes, 5);

  hooks.startWildBattle({ creature: 'grivelin', level: 30 });
  let battle = null;
  for (let attempt = 0; attempt < 50 && !battle; attempt += 1) {
    await wait(0.1);
    if (typeof scenes.top?.playAnimation === 'function') battle = scenes.top;
  }
  if (!battle) throw new Error('The battle scene did not open');
  const animations = Object.values(TYPE_ANIMATIONS);
  const from = { x: 40, y: 72 };
  const to = { x: 128, y: 32 };
  const playAll = (async () => {
    for (const animation of animations) await battle.playAnimation(animation, from, to);
  })();
  results.battleAnimations = await measure(scenes, 5);
  await playAll;
  return results;
}
