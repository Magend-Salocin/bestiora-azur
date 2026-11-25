// Small pixel helpers for the battle screen styles, drawn straight on the canvas with the active
// palette (no atlas frame needed): pixel rows, thin rounded panels, menu icons.
import { getColor } from '../../gfx/palette.js';

/** Rows of '0'-'3' palette indexes, '.' = transparent. `ink` replaces index 3. */
export function drawPixels(ctx, rows, x, y, ink = 3) {
  rows.forEach((row, dy) => {
    for (let dx = 0; dx < row.length; dx += 1) {
      const pixel = row[dx];
      if (pixel === '.') continue;
      ctx.fillStyle = getColor(pixel === '3' ? ink : Number(pixel));
      ctx.fillRect(x + dx, y + dy, 1, 1);
    }
  });
}

export function fillArea(ctx, colorIndex, x, y, width, height) {
  ctx.fillStyle = getColor(colorIndex);
  ctx.fillRect(x, y, width, height);
}

function roundedBox(ctx, x, y, width, height, border) {
  fillArea(ctx, border, x + 1, y, width - 2, height);
  fillArea(ctx, border, x, y + 1, width, height - 2);
  fillArea(ctx, 0, x + 1, y + 1, width - 2, height - 2);
}

/** Thin rounded info panel. */
export function drawPanel(ctx, { x, y, width, height }) {
  roundedBox(ctx, x, y, width, height, 3);
  fillArea(ctx, 2, x + 2, y + height - 3, width - 4, 1);
}

// Speech bubble tail under the bottom left corner, pointing down-left to the player's creature.
const BUBBLE_TAIL = ['3000003', '300003.', '30003..', '3003...', '303....', '33.....'];

/**
 * Moderne box: dark outline, light bevel, dark inner line, a 1-pixel shade on the right and
 * bottom. tail: speech bubble tail at the bottom left (drawn over the bottom border).
 */
export function drawBevelPanel(ctx, { x, y, width, height }, { tail = false } = {}) {
  const w = width - 1;
  const h = height - 1;
  fillArea(ctx, 2, x + 2, y + h, w - 1, 1);
  fillArea(ctx, 2, x + w, y + 2, 1, h - 1);
  roundedBox(ctx, x, y, w, h, 3);
  fillArea(ctx, 1, x + 1, y + 1, w - 2, h - 2);
  fillArea(ctx, 3, x + 2, y + 2, w - 4, h - 4);
  fillArea(ctx, 0, x + 3, y + 3, w - 6, h - 6);
  if (tail) drawPixels(ctx, BUBBLE_TAIL, x + 6, y + h - 3);
}

/** Rounded rectangle with corners cut by `radius` pixels (0 to 2). */
function roundedFill(ctx, colorIndex, x, y, width, height, radius) {
  for (let step = 0; step <= radius; step += 1) {
    const inset = radius - step;
    fillArea(ctx, colorIndex, x + inset, y + step, width - 2 * inset, height - 2 * step);
  }
}

/** Classique frame: thick dark rounded border, light inner line, plain background. */
export function drawRoundFrame(ctx, { x, y, width, height }) {
  roundedFill(ctx, 3, x, y, width, height, 2);
  roundedFill(ctx, 1, x + 2, y + 2, width - 4, height - 4, 1);
  fillArea(ctx, 0, x + 3, y + 3, width - 6, height - 6);
}

/** 8 × 8 menu icons of the moderne style: sword, crescent creature, bag, runner. */
export const MENU_ICONS = {
  fight: ['.......3', '......32', '.....32.', '3...32..', '.3.32...', '..32....', '.3.3....', '3.......'],
  party: ['..3333..', '.32..3..', '322.....', '322.....', '322.....', '322.....', '.32..3..', '..3333..'],
  bag: ['..3333..', '.3....3.', '.333333.', '32222223', '32233223', '32222223', '32222223', '.333333.'],
  run: ['....33..', '....33..', '..333...', '.3.33.3.', '...3.3..', '..3...3.', '.3....3.', '3.......'],
};
