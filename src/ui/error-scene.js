// Fatal error screen: the message, then RECHARGER (reloads the game: the title screen offers
// CONTINUER on the last save) or QUITTER. Uses only the font and the window frame, which do not
// depend on the atlases, so it works whatever broke.
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../engine/constants.js';
import { drawText } from '../gfx/font.js';
import { getColor, setFadeLevel } from '../gfx/palette.js';
import { wrapParagraph } from './text-layout.js';
import { drawWindowFrame } from './window-frame.js';

const MESSAGE_LINES = 5;
const CHOICES = [
  { id: 'reload', label: 'RECHARGER' },
  { id: 'quit', label: 'QUITTER' },
];

/** Short, drawable description of an error (any thrown value). */
export function describeError(error) {
  const text = error instanceof Error ? `${error.name}: ${error.message}` : String(error);
  const lines = wrapParagraph(text.replace(/\s+/g, ' ').trim() || 'Erreur inconnue', 18);
  return lines.length > MESSAGE_LINES ? [...lines.slice(0, MESSAGE_LINES - 1), `${lines[MESSAGE_LINES - 1].slice(0, 17)}…`] : lines;
}

export class ErrorScene {
  transparent = false;
  blocksInput = true;

  /** actions: { reload(), quit() } */
  constructor(error, actions) {
    this.lines = describeError(error);
    this.actions = actions;
    this.index = 0;
    setFadeLevel(0);
  }

  update(dt, input) {
    if (input.justPressed('up') || input.justPressed('down')) this.index = (this.index + 1) % CHOICES.length;
    if (input.justPressed('a') || input.justPressed('start')) this.actions[CHOICES[this.index].id]?.();
  }

  render(ctx) {
    ctx.fillStyle = getColor(0);
    ctx.fillRect(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT);
    drawWindowFrame(ctx, 0, 0, SCREEN_WIDTH, 96);
    drawText(ctx, 'Une erreur est', 8, 8);
    drawText(ctx, 'survenue.', 8, 20);
    this.lines.forEach((line, index) => drawText(ctx, line, 8, 36 + index * 11, 2));
    drawWindowFrame(ctx, 0, 96, SCREEN_WIDTH, 48);
    CHOICES.forEach(({ label }, index) => {
      const y = 108 + index * 16;
      if (index === this.index) drawText(ctx, '▶', 8, y);
      drawText(ctx, label, 16, y);
    });
  }
}
