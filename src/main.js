import { createInput } from './engine/input.js';
import { attachFocusPause, createLoop } from './engine/loop.js';
import { createRenderer } from './engine/renderer.js';
import { createSceneManager } from './engine/scene-manager.js';
import { getAtlas, loadAtlases } from './gfx/atlas.js';
import { cyclePalette } from './gfx/palette.js';
import { installBattleHooks } from './battle/ui/battle-setup.js';
import { GAME_START, HOME_RESPAWN, TEST_START } from './data/maps/index.js';
import { hooks, setHooks } from './overworld/hooks.js';
import { OverworldScene } from './overworld/overworld-scene.js';
import { createGameState, getGameState, setGameState } from './state/game-state.js';
import { setOptions } from './state/options.js';
import { clearAllData, readGameSave, writeGameSave } from './save/save-system.js';
import { ErrorScene } from './ui/error-scene.js';
import { LoadingScene } from './ui/loading-scene.js';
import { installMenuHooks } from './ui/menu-hooks.js';
import { createAudioSystem } from './audio/audio-system.js';
import { applyOptions, loadAndApplyOptions, registerOptionTargets } from './ui/options-screen.js';
import { TitleScene } from './ui/title-scene.js';
import { installTouchControls } from './ui/touch-controls.js';
import { requireAccessKey } from './access/access-gate.js';
import { playIntro } from './ui/intro-scene.js';

const renderer = createRenderer(document.getElementById('screen'));
const input = createInput();
const scenes = createSceneManager();
const isDev = Boolean(window.bestiora?.isDev);
let overworld = null;
let audio = null;
let hasOptionsFile = false;
let titleTime = null; // ms since page load when the title screen appeared (npm run perf)

function isPaletteShortcut() {
  return (
    (input.isDown('select') && input.justPressed('start')) ||
    (input.isDown('start') && input.justPressed('select'))
  );
}

// ---- Fatal errors: logged in userData/logs/, then the error screen replaces the game. ----

let errorScene = null;

function logError(error) {
  const report = error instanceof Error ? (error.stack ?? error.message) : String(error);
  if (isDev) console.error(error);
  try {
    window.bestiora?.logError?.(report);
  } catch {
    // Nothing more can be done.
  }
}

function handleFatalError(error) {
  logError(error);
  if (errorScene) return;
  try {
    audio?.stopMusic();
  } catch {
    // The audio may be what failed.
  }
  errorScene = new ErrorScene(error, {
    reload: () => (window.bestiora?.reload ? window.bestiora.reload() : window.location.reload()),
    quit: () => window.close(),
  });
}

window.addEventListener('error', (event) => handleFatalError(event.error ?? event.message));
window.addEventListener('unhandledrejection', (event) => handleFatalError(event.reason));

const loop = createLoop({
  update(dt) {
    input.update(dt);
    if (errorScene) {
      errorScene.update(dt, input);
      return;
    }
    try {
      if (isPaletteShortcut()) cyclePalette();
      if (overworld) getGameState().playTime += dt;
      scenes.update(dt, input);
    } catch (error) {
      handleFatalError(error);
    }
  },
  render() {
    try {
      (errorScene ?? scenes).render(renderer.ctx);
    } catch (error) {
      handleFatalError(error);
    }
    renderer.present();
  },
});

function startGame(state, start, respawn = HOME_RESPAWN) {
  setGameState(state);
  const tilesets = getAtlas('tiles').meta.tilesets;
  overworld = scenes.replace(new OverworldScene({ start, tilesets, state, respawn }));
  if (isDev) window.debugGame = { scenes, overworld, state, hooks, audio };
}

const SAVE_NOTICES = { backup: 'save_loaded_backup', corrupt: 'save_corrupt' };

async function showTitle() {
  const result = await readGameSave();
  const save = result.save ?? null;
  titleTime ??= performance.now();
  scenes.replace(new TitleScene({
    hasSave: Boolean(save),
    notice: SAVE_NOTICES[result.status] ?? null,
    onChoice: (choice) => {
      if (choice === 'continue') continueGame(save);
      else if (choice === 'reset') resetEverything();
      else startNewGame();
    },
  }));
}

/** TOUT EFFACER: everything is deleted, then the game restarts (web: the key is asked again). */
async function resetEverything() {
  await clearAllData();
  if (window.bestiora?.reload) window.bestiora.reload();
  else window.location.reload();
}

/** The options file wins; the options stored in the save only fill in when it is missing. */
function continueGame(save) {
  if (save.options && !hasOptionsFile) applyOptions(setOptions(save.options));
  startGame(save.state, save.state.position);
}

async function startNewGame() {
  const identity = await playIntro(scenes);
  startGame(createGameState(identity), GAME_START);
}

async function boot() {
  const loading = scenes.push(new LoadingScene());
  try {
    registerOptionTargets({ input });
    installTouchControls(input);
    audio = createAudioSystem();
    setHooks({ playMusic: audio.playMusic, playSfx: audio.playSfx, setVolumes: audio.setVolumes, saveGame: writeGameSave });
    hasOptionsFile = await loadAndApplyOptions();
    await loadAtlases((loaded, total) => loading.setProgress(loaded, total));
    installBattleHooks(scenes);
    installMenuHooks(scenes);
    if (isDev) {
      window.debugGame = { scenes, hooks, audio };
      const { attachDebugTools } = await import('./debug/debug-tools.js');
      attachDebugTools({ scenes, getOverworld: () => overworld, startGame, screen: renderer.ctx.canvas, getTitleTime: () => titleTime });
      if (new URLSearchParams(window.location.search).has('newgame')) showTitle();
      else startGame(getGameState(), TEST_START, TEST_START);
    } else {
      showTitle();
    }
  } catch (error) {
    loading.error = error.message;
    throw error;
  }
}

// Dev tasks (screenshots, perf) run in a window that may not have the focus.
if (!(isDev && new URLSearchParams(window.location.search).has('devtask'))) attachFocusPause(loop);
loop.start();
/**
 * Web version on HTTPS (GitHub Pages): the service worker keeps the game on the device, so it
 * starts offline once loaded. Not on plain HTTP (npm run web), where browsers refuse it.
 */
function registerOfflineMode() {
  if (!window.isSecureContext || !('serviceWorker' in navigator)) return;
  navigator.serviceWorker.register('sw.js').catch(logError);
}

// Web version (no Electron bridge): private test, an activation key is required first.
if (window.bestiora) {
  boot();
} else {
  registerOfflineMode();
  requireAccessKey().then(boot);
}
