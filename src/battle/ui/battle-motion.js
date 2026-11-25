// Battle micro animations that do not depend on the UI style: the status marks above the
// creatures, the dust puff of a K.O., the gliding cursor and the menu cascade.
import { drawPixels } from './battle-pixels.js';

// ---- Menus -----------------------------------------------------------------------

const GLIDE_TIME = 0.1;
const CASCADE_STEP = 0.04;

/** Menu entries appear one after the other when a menu opens. */
export const revealed = (time, index) => time >= index * CASCADE_STEP;

/** Cursor that glides from the previous entry to the selected one (ease out). */
export class CursorGlide {
  constructor(index) {
    this.from = index;
    this.to = index;
    this.progress = 1;
  }

  update(dt, index) {
    if (index !== this.to) {
      this.from = this.to;
      this.to = index;
      this.progress = 0;
    }
    this.progress = Math.min(1, this.progress + dt / GLIDE_TIME);
  }

  /** Interpolated position; `positionOf(index)` returns the { x, y } of an entry. */
  at(positionOf) {
    const from = positionOf(this.from);
    const to = positionOf(this.to);
    const eased = 1 - (1 - this.progress) ** 2;
    return {
      x: Math.round(from.x + (to.x - from.x) * eased),
      y: Math.round(from.y + (to.y - from.y) * eased),
    };
  }
}

// ---- Status marks ------------------------------------------------------------------

const SLEEP_Z = ['3333', '..3.', '.3..', '3333'];
const BUBBLE = ['.3.', '3.3', '.3.'];
const SPARK = ['..3', '.3.', '333', '.3.', '3..'];
const FLAME = ['..3..', '..33.', '.323.', '.3223', '32223', '.333.'];
const FLAME_MIRRORED = FLAME.map((row) => [...row].reverse().join(''));
const FROST = [
  ['3.3.3', '.333.', '33.33', '.333.', '3.3.3'],
  ['..3..', '.3.3.', '3.3.3', '.3.3.', '..3..'],
];

/** Position in a looping cycle of `period` seconds, shifted by `offset` (0 to 1). */
const cycle = (time, period, offset = 0) => ((time / period + offset) % 1 + 1) % 1;

const STATUS_MARKS = {
  // Two « z » rising and drifting right.
  som(ctx, x, y, time) {
    [0, 0.5].forEach((offset) => {
      const p = cycle(time, 1.6, offset);
      if (p < 0.85) drawPixels(ctx, SLEEP_Z, x + Math.round(p * 5), y + 8 - Math.round(p * 10));
    });
  },
  // Three bubbles rising at different moments.
  psn(ctx, x, y, time) {
    [0, 0.35, 0.7].forEach((offset, i) => {
      const p = cycle(time, 1.2, offset);
      if (p < 0.8) drawPixels(ctx, BUBBLE, x + i * 4, y + 10 - Math.round(p * 10));
    });
  },
  // A spark jumping between two spots.
  par(ctx, x, y, time) {
    const spot = Math.floor(time * 3) % 2;
    drawPixels(ctx, SPARK, x + spot * 6, y + 2 - spot * 2);
  },
  // A flickering flame.
  brl(ctx, x, y, time) {
    drawPixels(ctx, Math.floor(time * 4) % 2 ? FLAME_MIRRORED : FLAME, x + 2, y + 2);
  },
  // A twinkling snowflake.
  gel(ctx, x, y, time) {
    drawPixels(ctx, FROST[Math.floor(time * 1.5) % 2], x + 2, y + 2);
  },
};

/** Status mark near the top right corner of a 48 × 48 creature sprite placed at (x, y). */
export function drawStatusMark(ctx, statusId, x, y, time) {
  STATUS_MARKS[statusId]?.(ctx, x + 36, y + 2, time);
}

// ---- K.O. dust ----------------------------------------------------------------------

const DUST_BIG = ['.222.', '20002', '20002', '.222.'];
const DUST_SMALL = ['.2.', '202', '.2.'];

/** Three clouds spreading from the bottom center of a sprite area; progress from 0 to 1. */
export function drawDustPuff(ctx, centerX, bottomY, progress) {
  if (progress >= 1) return;
  const spread = Math.round(progress * 10);
  const rise = Math.round(progress * 4);
  const cloud = progress < 0.5 ? DUST_BIG : DUST_SMALL;
  const half = Math.floor(cloud[0].length / 2);
  [-8 - spread, 0, 8 + spread].forEach((dx) => {
    drawPixels(ctx, cloud, centerX + dx - half, bottomY - cloud.length - rise);
  });
}
