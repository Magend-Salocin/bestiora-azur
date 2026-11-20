// Options screen: left/right change a value, A on TOUCHES / MANETTE remaps the keyboard or the
// gamepad (one press per button, in the order of BUTTONS), B saves and closes.
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../engine/constants.js';
import { BUTTONS } from '../engine/constants.js';
import { drawText } from '../gfx/font.js';
import { PALETTES, getColor, setActivePalette } from '../gfx/palette.js';
import {
  BATTLE_STYLES, OPTION_LIMITS, TEXT_SPEED_IDS, TOUCH_MODES, getOptions, normalizeOptions, setOptions,
} from '../state/options.js';
import { setTouchControlsMode } from './touch-controls.js';
import { setTextSpeed } from './dialog-box.js';
import { hooks } from '../overworld/hooks.js';
import { PromiseScene, moveCursor } from './menu-cursor.js';
import { drawWindowFrame } from './window-frame.js';

const TEXT_SPEED_LABELS = { slow: 'LENT', medium: 'MOYEN', fast: 'RAPIDE', instant: 'INSTANT' };
const BUTTON_LABELS = { up: 'HAUT', down: 'BAS', left: 'GAUCHE', right: 'DROITE', a: 'A', b: 'B', start: 'START', select: 'SELECT' };
const ROWS = [
  'textSpeed', 'battleAnimations', 'reduceFlashes', 'battleStyle', 'musicVolume', 'sfxVolume', 'palette',
  'windowScale', 'fullscreen', 'touchControls', 'keys', 'gamepad',
];
const ROW_LABELS = {
  textSpeed: 'TEXTE', battleAnimations: 'ANIMATIONS', reduceFlashes: 'FLASHS RÉDUITS', battleStyle: 'STYLE',
  musicVolume: 'MUSIQUE', sfxVolume: 'EFFETS', palette: 'PALETTE', windowScale: 'TAILLE', fullscreen: 'PLEIN ÉCRAN',
  touchControls: 'TACTILE', keys: 'TOUCHES', gamepad: 'MANETTE',
};
const TOUCH_LABELS = { auto: 'AUTO', on: 'OUI', off: 'NON' };
const FIRST_ROW_Y = 6;
const ROW_HEIGHT = 11;

let targets = { input: null };

/** main.js registers the input so key bindings can be applied. */
export function registerOptionTargets(next) {
  targets = { ...targets, ...next };
}

/** Applies options to the running game (text speed, palette, keys, window). */
export function applyOptions(options = getOptions()) {
  setTextSpeed(options.textSpeed);
  hooks.setVolumes(options.musicVolume / 10, options.sfxVolume / 10);
  if (PALETTES.some((palette) => palette.id === options.palette)) setActivePalette(options.palette);
  if (options.keyBindings) targets.input?.setKeyBindings(options.keyBindings);
  if (options.gamepadBindings) targets.input?.setGamepadBindings(options.gamepadBindings);
  window.bestiora?.setWindowScale?.(options.windowScale);
  window.bestiora?.setFullscreen?.(options.fullscreen);
  setTouchControlsMode(options.touchControls);
}

/** Loads userData/options.json (or browser storage). Resolves true when options were found. */
export async function loadAndApplyOptions() {
  let saved = null;
  try {
    saved = (await window.bestiora?.loadOptions?.()) ?? JSON.parse(localStorage.getItem('bestiora-options') ?? 'null');
  } catch {
    saved = null;
  }
  applyOptions(setOptions(saved ?? {}));
  return saved !== null;
}

export function persistOptions(options = getOptions()) {
  const json = JSON.stringify(options);
  try {
    if (window.bestiora?.saveOptions) window.bestiora.saveOptions(json);
    else localStorage.setItem('bestiora-options', json);
  } catch {
    // Options stay in memory and in the next game save.
  }
}

/** Indexes of the gamepad buttons pressed right now, on every connected gamepad. */
function pressedPadButtons() {
  const pressed = new Set();
  for (const pad of navigator.getGamepads?.() ?? []) {
    pad?.buttons.forEach((button, index) => {
      if (button.pressed) pressed.add(index);
    });
  }
  return pressed;
}

function cycle(list, value, delta) {
  const index = list.indexOf(value);
  return list[(index + delta + list.length) % list.length];
}

const clampStep = (value, [min, max], delta) => Math.max(min, Math.min(max, value + delta));

export class OptionsScene extends PromiseScene {
  constructor() {
    super();
    this.options = { ...getOptions() };
    this.index = 0;
    this.remapping = null; // index in BUTTONS while waiting for a key or a gamepad button
    this.remapDevice = null; // 'keys' | 'gamepad'
    this.onKey = null;
    this.heldPadButtons = new Set();
  }

  change(row, delta) {
    const o = this.options;
    if (row === 'textSpeed') o.textSpeed = cycle(TEXT_SPEED_IDS, o.textSpeed, delta);
    else if (row === 'battleAnimations') o.battleAnimations = !o.battleAnimations;
    else if (row === 'reduceFlashes') o.reduceFlashes = !o.reduceFlashes;
    else if (row === 'battleStyle') o.battleStyle = cycle(BATTLE_STYLES, o.battleStyle, delta);
    else if (row === 'musicVolume') o.musicVolume = clampStep(o.musicVolume, OPTION_LIMITS.volume, delta);
    else if (row === 'sfxVolume') o.sfxVolume = clampStep(o.sfxVolume, OPTION_LIMITS.volume, delta);
    else if (row === 'palette') o.palette = cycle(PALETTES.map((palette) => palette.id), o.palette, delta);
    else if (row === 'windowScale') o.windowScale = clampStep(o.windowScale, OPTION_LIMITS.windowScale, delta);
    else if (row === 'fullscreen') o.fullscreen = !o.fullscreen;
    else if (row === 'touchControls') o.touchControls = cycle(TOUCH_MODES, o.touchControls, delta);
    else return;
    applyOptions(setOptions(o));
  }

  startRemap() {
    this.remapping = 0;
    this.remapDevice = 'keys';
    const bindings = targets.input?.getKeyBindings() ?? {};
    this.onKey = (event) => {
      event.preventDefault();
      bindings[BUTTONS[this.remapping]] = [event.code];
      this.remapping += 1;
      if (this.remapping >= BUTTONS.length) {
        window.removeEventListener('keydown', this.onKey, true);
        this.remapping = null;
        this.options.keyBindings = bindings;
        applyOptions(setOptions(this.options));
      }
    };
    window.addEventListener('keydown', this.onKey, true);
  }

  startGamepadRemap() {
    if (!(navigator.getGamepads?.() ?? []).some(Boolean)) {
      this.noGamepadTime = 1.5;
      return;
    }
    this.remapping = 0;
    this.remapDevice = 'gamepad';
    this.padBindings = {};
    this.heldPadButtons = pressedPadButtons(); // the A press that opened the remap is ignored
  }

  /** One newly pressed gamepad button per BUTTONS entry; buttons still held are ignored. */
  updateGamepadRemap() {
    const pressed = pressedPadButtons();
    const fresh = [...pressed].find((index) => !this.heldPadButtons.has(index));
    this.heldPadButtons = pressed;
    if (fresh === undefined) return;
    this.padBindings[BUTTONS[this.remapping]] = [fresh];
    this.remapping += 1;
    if (this.remapping < BUTTONS.length) return;
    this.remapping = null;
    this.options.gamepadBindings = this.padBindings;
    applyOptions(setOptions(this.options));
  }

  update(dt, input) {
    this.noGamepadTime = Math.max(0, (this.noGamepadTime ?? 0) - dt);
    if (this.remapping !== null) {
      if (this.remapDevice === 'gamepad') this.updateGamepadRemap();
      return;
    }
    this.index = moveCursor(this.index, ROWS.length, input);
    const row = ROWS[this.index];
    const delta = (input.repeat('right') ? 1 : 0) - (input.repeat('left') ? 1 : 0);
    if (delta) this.change(row, delta);
    if (input.justPressed('a')) {
      if (row === 'keys') this.startRemap();
      else if (row === 'gamepad') this.startGamepadRemap();
      else this.change(row, 1);
    }
    if (input.justPressed('b')) {
      persistOptions(normalizeOptions(this.options));
      this.done(getOptions());
    }
  }

  value(row) {
    const o = this.options;
    switch (row) {
      case 'textSpeed': return TEXT_SPEED_LABELS[o.textSpeed];
      case 'battleAnimations': return o.battleAnimations ? 'OUI' : 'NON';
      case 'reduceFlashes': return o.reduceFlashes ? 'OUI' : 'NON';
      case 'battleStyle': return o.battleStyle === 'choice' ? 'CHOIX' : 'DÉFINI';
      case 'musicVolume': return String(o.musicVolume);
      case 'sfxVolume': return String(o.sfxVolume);
      case 'palette': return PALETTES.find((palette) => palette.id === o.palette)?.name.toUpperCase() ?? '';
      case 'windowScale': return `×${o.windowScale}`;
      case 'fullscreen': return o.fullscreen ? 'OUI' : 'NON';
      case 'touchControls': return TOUCH_LABELS[o.touchControls];
      default: return '';
    }
  }

  render(ctx) {
    ctx.fillStyle = getColor(0);
    ctx.fillRect(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT);
    drawWindowFrame(ctx, 0, 0, SCREEN_WIDTH, SCREEN_HEIGHT);
    ROWS.forEach((row, index) => {
      const y = FIRST_ROW_Y + index * ROW_HEIGHT;
      if (index === this.index) drawText(ctx, '▶', 8, y);
      drawText(ctx, ROW_LABELS[row], 16, y);
      const value = this.value(row);
      drawText(ctx, value, 152 - Array.from(value).length * 8, y);
    });
    if (this.remapping !== null) {
      drawWindowFrame(ctx, 0, 104, SCREEN_WIDTH, 40);
      const prompt = this.remapDevice === 'gamepad' ? 'Bouton' : 'Touche';
      drawText(ctx, `${prompt} pour ${BUTTON_LABELS[BUTTONS[this.remapping]]}`, 8, 116);
    } else if (this.noGamepadTime > 0) {
      drawWindowFrame(ctx, 0, 104, SCREEN_WIDTH, 40);
      drawText(ctx, 'Aucune manette.', 8, 116);
    }
  }
}

export function openOptions(manager) {
  return manager.push(new OptionsScene()).promise;
}
