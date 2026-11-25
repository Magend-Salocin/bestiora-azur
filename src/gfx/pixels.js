// Small pixel helpers drawn straight on the canvas with the active palette (no atlas frame):
// pixel rows and plain rectangles. Shared by the battle screen and the overworld ambience.
import { getColor } from './palette.js';

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
