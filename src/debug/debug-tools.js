// Dev only (npm run dev): F1 debug menu and window.debugGame. Loaded with a dynamic import by
// src/main.js, and left out of the packaged game (build.files in package.json).
import { getMapDefinition } from '../data/maps/index.js';
import { getGameState } from '../state/game-state.js';
import { runCaptureStep } from './capture-scenes.js';
import { DebugMenuScene } from './debug-menu.js';
import { runPerfProbe } from './perf-probe.js';

/**
 * getOverworld() returns the current OverworldScene, or null before the game starts;
 * startGame(state, start) replaces the current scene with the map; screen is the 160 × 144
 * canvas the game draws into (both used by the captures); getTitleTime() is the time (ms since
 * page load) the title screen appeared (npm run perf).
 */
export function attachDebugTools({ scenes, getOverworld, startGame, screen, getTitleTime }) {
  window.debugPerf = () => runPerfProbe({ scenes, startGame, bootTime: getTitleTime() });
  window.debugCapture = async (step) => {
    await runCaptureStep(step, { scenes, getOverworld, startGame });
    return screen.toDataURL('image/png');
  };
  const warp = (mapId) => {
    const overworld = getOverworld();
    const definition = getMapDefinition(mapId);
    const target = definition.flyPoint ?? definition.warps?.[0] ?? { x: 1, y: 1 };
    overworld.runBusy(() => overworld.doWarp(mapId, target.x, target.y, 'down'));
  };
  window.addEventListener('keydown', (event) => {
    const overworld = getOverworld();
    if (event.code !== 'F1' || !overworld || scenes.top !== overworld || overworld.busy) return;
    event.preventDefault();
    scenes.push(new DebugMenuScene(getGameState(), { warp }));
  });
}
