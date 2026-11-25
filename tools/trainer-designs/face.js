// Face pieces shared by the portrait designs: pixel lists for the `pixels` field of a layer.
import { px } from '../creature-painter.js';

/** 2 × 3 eye with a glint in its top right pixel; (x, y) is the top left pixel. */
export const eye = (x, y) => [...px(3, [x, y], [x, y + 1], [x + 1, y + 1], [x, y + 2], [x + 1, y + 2]), ...px(0, [x + 1, y])];

/** Two 2 × 3 eyes on the same rows. */
export const eyes = (leftX, rightX, y) => [...eye(leftX, y), ...eye(rightX, y)];

/** Horizontal run of one tone from x0 to x1 included, on row y. */
export const hline = (tone, x0, x1, y) => px(tone, ...Array.from({ length: x1 - x0 + 1 }, (_, i) => [x0 + i, y]));

/** Vertical run of one tone from y0 to y1 included, on column x. */
export const vline = (tone, x, y0, y1) => px(tone, ...Array.from({ length: y1 - y0 + 1 }, (_, i) => [x, y0 + i]));
