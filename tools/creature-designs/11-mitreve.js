// Mitrêve (150, Arcane, mythique) : petite mite qui se nourrit des rêves des dormeurs.
// Fiche : docs/bestiaire-folklorique/fiches/150-mitreve.md.
// Tones: 0 moons and fluff highlights, 1 fluff, 2 wings, 3 ink.
import { capsule, ellipse, iconFrom, minus, mirrorX, paint, poly, px, stamp, toRows, union } from '../creature-painter.js';

const star = (x, y) => stamp(x, y, ['..3..', '..3..', '33033', '..3..', '..3..']);
const twinkle = (x, y) => stamp(x, y, ['.3.', '303', '.3.']);
/** Crescent moon: a disc minus an offset disc. */
const crescent = (cx, cy, r, dx) => minus(ellipse(cx, cy, r, r), ellipse(cx + dx, cy - r * 0.3, r * 0.85, r * 0.85));

const M = {
  shadow: ellipse(24, 45, 8, 1.2),
  wingsUp: mirrorX(union(ellipse(12, 19, 10, 8), poly([20, 22], [8, 12], [20, 16]))),
  wingsDown: mirrorX(ellipse(15, 32, 7, 6)),
  moons: union(crescent(11, 18, 4, 2), crescent(37, 18, 4, -2)),
  antennae: mirrorX(capsule([[22, 17], [19, 10], [15, 6]], 0.8)),
  plumes: mirrorX(union(ellipse(15, 6, 2.5, 1.5), ellipse(17.5, 9, 2.2, 1.3))),
  body: ellipse(24, 29, 5, 8),
  ruff: union(ellipse(24, 21.5, 7, 4.5), ellipse(24, 25, 6, 3)),
  head: ellipse(24, 19, 4.5, 4),
};

function mitreveFront() {
  return toRows(paint([
    { shape: M.shadow, tone: 2, outline: false },
    { shape: M.wingsDown, tone: 2, shade: 3, light: { tone: 1, shape: mirrorX(ellipse(13, 33, 3, 2.5)) } },
    { shape: M.wingsUp, tone: 2, shade: 3, light: { tone: 1, shape: mirrorX(ellipse(10, 21, 6, 4)) } },
    { shape: M.moons, tone: 0, shade: 1 },
    { shape: M.antennae, tone: 2, outline: false },
    { shape: M.plumes, tone: 1, shade: 2 },
    { shape: M.body, tone: 1, shade: 2, pixels: px(2, [22, 30], [26, 30], [23, 33], [25, 33]) },
    { shape: M.ruff, tone: 1, shade: 2, light: { tone: 0, shape: ellipse(21, 21, 2.5, 1.5) } },
    { shape: M.head, tone: 1, shade: 2, pixels: [...stamp(21, 19, ['3...3']), ...stamp(20, 18, ['.3.3.3.']), ...px(3, [24, 21])] },
    { pixels: [...star(3, 32), ...star(40, 33), ...twinkle(6, 2), ...twinkle(39, 4), ...twinkle(30, 40)] },
  ]));
}

function mitreveBack() {
  return toRows(paint([
    { shape: M.shadow, tone: 2, outline: false },
    { shape: M.antennae, tone: 2, outline: false },
    { shape: M.plumes, tone: 1, shade: 2 },
    { shape: M.head, tone: 1, shade: 2 },
    { shape: M.body, tone: 1, shade: 2 },
    { shape: M.wingsDown, tone: 2, shade: 3, light: { tone: 1, shape: mirrorX(ellipse(13, 33, 3, 2.5)) } },
    { shape: M.wingsUp, tone: 2, shade: 3, light: { tone: 1, shape: mirrorX(ellipse(10, 21, 6, 4)) } },
    { shape: M.moons, tone: 0, shade: 1 },
    { shape: ellipse(24, 23, 5, 4), tone: 1, shade: 2, light: { tone: 0, shape: ellipse(22, 22, 2, 1) } },
    { pixels: [...star(3, 32), ...star(40, 33), ...twinkle(6, 2), ...twinkle(39, 4)] },
  ]));
}

const MITREVE_ICON = iconFrom([
  { shape: mirrorX(union(ellipse(4.5, 7, 4.5, 4), ellipse(5.5, 12, 3, 2.5)), 8), tone: 2, shade: 3 },
  { shape: union(crescent(4, 6.5, 2, 1), crescent(12, 6.5, 2, -1)), tone: 0 },
  { shape: mirrorX(capsule([[7, 4], [5, 1]], 0.6), 8), tone: 2, outline: false },
  { shape: ellipse(8, 9, 2.5, 4.5), tone: 1, shade: 2 },
  { shape: ellipse(8, 6, 3, 2.5), tone: 1, shade: 2, pixels: px(3, [6, 6], [7, 6], [9, 6], [10, 6]) },
]);

export const line = [
  { id: 'mitreve', front: mitreveFront(), back: mitreveBack(), icon: MITREVE_ICON },
];
