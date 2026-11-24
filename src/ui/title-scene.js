// Title screen: logo, Azurel floating as a silhouette and revealing its colors every few
// seconds, a parade of random bestioles along the bottom, « APPUYEZ SUR START » blinking.
// Then CONTINUER (when a save exists), NOUVELLE PARTIE, OPTIONS.
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../engine/constants.js';
import { createRng } from '../engine/rng.js';
import { CREATURES } from '../data/creatures.js';
import { drawSprite, drawSpritePart } from '../gfx/draw.js';
import { drawText, measureText } from '../gfx/font.js';
import { getColor } from '../gfx/palette.js';
import { ListMenu } from './components/list-menu.js';
import { openOptions } from './options-screen.js';
import { hooks } from '../overworld/hooks.js';
import { ask, say } from './messages.js';

const SPRITE_SIZE = 48;
const AZUREL = { x: 56, y: 41 }; // the Vouivre fills its 48 rows: it sits between the logo and the parade
/** Azurel cycle, in seconds: silhouette, colors appear top-down, colors, colors disappear. */
const REVEAL = { start: 5, show: 0.5, hold: 2, period: 8 };

const PARADE_Y = 86;
const PARADE_GROUND_Y = PARADE_Y + SPRITE_SIZE;
const PARADE_SPACING = 56;
const PARADE_SLOTS = Math.ceil((SCREEN_WIDTH + SPRITE_SIZE) / PARADE_SPACING) + 1;
const PARADE_SPEED = 16; // pixels per second
/** Legendaries and the mythical one (habitat « inconnu ») are kept secret. */
const PARADE_SPECIES = CREATURES.filter((creature) => creature.habitat !== 'inconnu').map((creature) => creature.id);

const PRESS_START = 'APPUYEZ SUR START';

/** Rows of Azurel's colored sprite shown at `time` (0 = silhouette only). */
export function azurelRevealRows(time) {
  const t = (time % REVEAL.period) - REVEAL.start;
  if (t < 0) return 0;
  const hideStart = REVEAL.show + REVEAL.hold;
  const progress = t < REVEAL.show ? t / REVEAL.show : t < hideStart ? 1 : Math.max(0, 1 - (t - hideStart) / REVEAL.show);
  return Math.round(progress * SPRITE_SIZE);
}

export class TitleScene {
  transparent = false;
  blocksInput = true;

  /**
   * onChoice(choice) is called with 'continue', 'new' or 'reset' (TOUT EFFACER, confirmed twice).
   * hasSave tells whether CONTINUER is shown.
   * notice: text id shown once when the title appears (save loaded from its backup, unreadable save).
   */
  constructor({ hasSave = false, notice = null, onChoice }) {
    this.hasSave = hasSave;
    this.notice = notice;
    this.onChoice = onChoice;
    this.time = 0;
    this.menu = null;
    this.busy = false;
    this.rng = createRng(Date.now());
    this.parade = Array.from({ length: PARADE_SLOTS }, (_, index) => ({
      frame: this.randomFrame(),
      x: SCREEN_WIDTH + index * PARADE_SPACING - PARADE_SPACING,
    }));
  }

  randomFrame() {
    return `${PARADE_SPECIES[this.rng.int(0, PARADE_SPECIES.length - 1)]}/front`;
  }

  /** Bestioles walk right to left; one leaving the screen comes back at the end of the line. */
  updateParade(dt) {
    for (const slot of this.parade) {
      slot.x -= PARADE_SPEED * dt;
      if (slot.x <= -SPRITE_SIZE) {
        slot.x += PARADE_SLOTS * PARADE_SPACING;
        slot.frame = this.randomFrame();
      }
    }
  }

  enter(manager) {
    this.manager = manager;
    manager.fadeIn({ color: 'black', duration: 0.6 });
    hooks.playMusic('title');
    if (this.notice) {
      this.busy = true;
      say(manager, this.notice).then(() => {
        this.busy = false;
      });
    }
  }

  get entries() {
    return [...(this.hasSave ? [{ id: 'continue', label: 'CONTINUER' }] : []), { id: 'new', label: 'NOUVELLE PARTIE' }, { id: 'options', label: 'OPTIONS' }, { id: 'reset', label: 'TOUT EFFACER' }];
  }

  async select(id) {
    if (id === 'options') {
      this.busy = true;
      await openOptions(this.manager);
      this.busy = false;
      return;
    }
    this.busy = true;
    if (id === 'reset' && !((await ask(this.manager, 'title_reset_ask')) && (await ask(this.manager, 'title_reset_confirm')))) {
      this.busy = false;
      return;
    }
    await this.manager.fadeOut();
    this.onChoice(id);
  }

  update(dt, input) {
    this.time += dt;
    this.updateParade(dt);
    if (this.busy) return;
    if (!this.menu) {
      if (input.justPressed('start') || input.justPressed('a')) {
        this.menu = new ListMenu(this.entries.map((entry) => ({ label: entry.label })), { x: 8, width: 144, rows: this.entries.length, rowHeight: 14 });
        this.menu.y = SCREEN_HEIGHT - this.menu.height; // bottom of the screen, whatever the entry count
      }
      return;
    }
    const result = this.menu.update(dt, input);
    if (!result) return;
    if (result.value === null) this.menu = null;
    else this.select(this.entries[result.value].id);
  }

  render(ctx) {
    ctx.fillStyle = getColor(0);
    ctx.fillRect(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT);
    drawSprite(ctx, 'ui', 'logo/bestiora', 15, 4);
    drawSprite(ctx, 'ui', 'logo/azur', 47, 24);
    this.renderParade(ctx);
    this.renderAzurel(ctx);
    if (this.menu) {
      this.menu.render(ctx);
    } else if (Math.floor(this.time * 2) % 2 === 0) {
      drawText(ctx, PRESS_START, Math.floor((SCREEN_WIDTH - measureText(PRESS_START)) / 2), PARADE_GROUND_Y + 2);
    }
  }

  renderParade(ctx) {
    for (const slot of this.parade) {
      if (slot.x < SCREEN_WIDTH) drawSprite(ctx, 'creatures', slot.frame, slot.x, PARADE_Y);
    }
    ctx.fillStyle = getColor(2);
    ctx.fillRect(0, PARADE_GROUND_Y - 1, SCREEN_WIDTH, 1);
  }

  renderAzurel(ctx) {
    const y = AZUREL.y + Math.round(Math.sin(this.time * 2));
    drawSprite(ctx, 'ui', 'title/vouivre', AZUREL.x, y);
    const rows = azurelRevealRows(this.time);
    if (rows > 0) drawSpritePart(ctx, 'creatures', 'vouivre/front', 0, 0, SPRITE_SIZE, rows, AZUREL.x, y);
  }
}
