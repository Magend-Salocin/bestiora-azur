// Pixel helpers of the battle screen styles, drawn straight on the canvas with the active
// palette (no atlas frame needed): thin rounded panels, frames, menu icons.
import { drawPixels, fillArea } from '../../gfx/pixels.js';

export { drawPixels, fillArea };

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

/** Épurée frame: a 1-pixel mid-tone rounded outline on a plain background. */
export function drawFlatFrame(ctx, { x, y, width, height }) {
  roundedBox(ctx, x, y, width, height, 2);
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
