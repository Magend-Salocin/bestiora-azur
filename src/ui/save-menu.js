// SAUVER from the start menu: summary window, confirmation, « Sauvegarde en cours… » while the
// file is written, then the save sound and the result.
import { getText } from '../data/texts/index.js';
import { drawText } from '../gfx/font.js';
import { hooks } from '../overworld/hooks.js';
import { summarizeSave } from '../save/save-format.js';
import { getGameState } from '../state/game-state.js';
import { showHeldDialog } from './dialog-box.js';
import { ask, say } from './messages.js';
import { drawWindowFrame } from './window-frame.js';

/** The message stays at least this long, so it can be read even when the write is instant. */
const MIN_SAVING_TIME = 0.8;

const SUMMARY_BOX = { x: 0, y: 0, width: 144, height: 72 };

/** Passive widget for the menu layer. */
export class SaveSummaryWindow {
  constructor(state) {
    this.summary = summarizeSave(state);
  }

  update() {}

  render(ctx) {
    const { x, y, width, height } = SUMMARY_BOX;
    const { name, badges, caught, playTime } = this.summary;
    drawWindowFrame(ctx, x, y, width, height);
    const rows = [['JOUEUR', name], ['BADGES', String(badges)], ['BESTIAIRE', String(caught)], ['TEMPS', playTime]];
    rows.forEach(([label, value], index) => {
      const lineY = y + 8 + index * 14;
      drawText(ctx, label, x + 8, lineY);
      drawText(ctx, value, x + width - 8 - Array.from(value).length * 8, lineY);
    });
  }
}

const wait = (seconds) => new Promise((resolve) => setTimeout(resolve, seconds * 1000));

/**
 * field: { save(), canSave() }. `layer` is the start menu layer (the summary is drawn on it).
 * Resolves true when the game was saved.
 */
export async function runSaveMenu(manager, layer, state, field) {
  if (field.canSave && !field.canSave()) {
    await say(manager, 'menu_save_forbidden');
    return false;
  }
  const hideSummary = layer.show(new SaveSummaryWindow(state));
  try {
    if (!(await ask(manager, 'menu_save_ask'))) return false;
    const saving = showHeldDialog(manager, getText('menu_saving'), { speed: 'instant' });
    const [saved] = await Promise.all([field.save?.() ?? false, wait(MIN_SAVING_TIME)]);
    saving.close();
    if (saved) hooks.playSfx('save');
    await say(manager, saved ? 'menu_saved' : 'menu_save_failed', { PLAYER: getGameState().player.name });
    return saved;
  } finally {
    hideSummary();
  }
}
