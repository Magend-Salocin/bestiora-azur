// Lignée du Babau (140 Babauet et 141 Babau, Feu et Insecte) : le croque-mitaine du Languedoc,
// dont le nom désigne aussi une petite bête. Fiche : docs/bestiaire-folklorique/fiches/140-babau.md.
// Tones: 0 embers and eyes, 1 legs and horn, 2 shell, 3 ink.
import { capsule, ellipse, iconFrom, minus, mirrorX, paint, poly, px, rect, stamp, toRows, union } from '../creature-painter.js';

const ember = (x, y) => stamp(x, y, ['.3.', '303', '.3.']);
const smoke = (x, y) => stamp(x, y, ['.22.', '2..2', '..2.', '.2..']);

// ---------- 140 Babauet: a round little ember beetle ----------
const B1 = {
  legs: mirrorX(union(capsule([[17, 36], [12, 39], [11, 44]], 1.2), capsule([[18, 40], [15, 44]], 1.2))),
  antennae: mirrorX(capsule([[21, 25], [18, 19], [14, 18]], 0.9)),
  shell: ellipse(24, 35, 10, 8.5),
  head: ellipse(24, 27, 5.5, 4),
};

function babauetFront() {
  return toRows(paint([
    { shape: B1.legs, tone: 1, shade: 2 },
    { shape: B1.antennae, tone: 1, outline: true, pixels: px(0, [14, 18], [34, 18]) },
    { shape: B1.shell, tone: 2, shade: 3, light: { tone: 1, shape: ellipse(19, 31, 2.5, 2) },
      pixels: [...px(3, [24, 30], [24, 31], [24, 32], [24, 33], [24, 34], [24, 35], [24, 36], [24, 37], [24, 38], [24, 39], [24, 40], [24, 41], [24, 42]), ...px(0, [19, 37], [21, 40], [28, 36], [29, 40], [27, 33])] },
    { shape: B1.head, tone: 2, shade: 3, pixels: [...stamp(20, 26, ['00.....00']), ...stamp(22, 29, ['3..3'])] },
    { pixels: [...ember(9, 28), ...ember(37, 25), ...smoke(32, 10)] },
  ]));
}

function babauetBack() {
  return toRows(paint([
    { shape: B1.legs, tone: 1, shade: 2 },
    { shape: B1.head, tone: 2, shade: 3 },
    { shape: B1.antennae, tone: 1 },
    { shape: ellipse(24, 34, 10.5, 9.5), tone: 2, shade: 3, light: { tone: 1, shape: ellipse(19, 29, 2.5, 2) },
      pixels: [...px(3, [24, 26], [24, 27], [24, 28], [24, 29], [24, 30], [24, 31], [24, 32], [24, 33], [24, 34], [24, 35], [24, 36], [24, 37], [24, 38], [24, 39], [24, 40], [24, 41], [24, 42]), ...px(0, [19, 35], [21, 39], [28, 34], [29, 39], [27, 30])] },
    { pixels: [...ember(9, 28), ...smoke(32, 10)] },
  ]));
}

const BABAUET_ICON = iconFrom([
  { shape: mirrorX(capsule([[6, 6], [4, 2], [2, 2]], 0.6), 8), tone: 1 },
  { shape: mirrorX(capsule([[4, 11], [1.5, 14]], 0.7), 8), tone: 1 },
  { shape: ellipse(8, 11, 5, 4.2), tone: 2, shade: 3, pixels: [...px(3, [8, 8], [8, 9], [8, 10], [8, 11], [8, 12], [8, 13], [8, 14]), ...px(0, [5, 12], [11, 11])] },
  { shape: ellipse(8, 6.5, 3, 2.2), tone: 2, shade: 3, pixels: px(0, [6, 6], [10, 6]) },
]);

// ---------- 141 Babau: a huge horned beetle, its shell cracked with embers ----------
const B2 = {
  legs: mirrorX(union(capsule([[14, 30], [8, 32], [4, 40], [3, 45]], 1.6), capsule([[15, 36], [10, 40], [9, 45]], 1.6), capsule([[18, 40], [15, 45]], 1.6))),
  shell: ellipse(24, 33, 13, 11),
  head: ellipse(24, 20, 8, 6),
  horn: union(capsule([[24, 18], [24, 11], [26, 6], [29, 4]], 2.6), poly([21, 13], [24, 8], [27, 13])),
  mandibles: mirrorX(poly([20, 24], [15, 26], [17, 30], [21, 26])),
};

function babauFront() {
  return toRows(paint([
    { shape: B2.legs, tone: 1, shade: 2, pixels: px(3, [3, 45], [9, 45], [15, 45], [45, 45], [39, 45], [33, 45]) },
    { shape: B2.shell, tone: 2, shade: 3, light: { tone: 1, shape: ellipse(17, 27, 3, 2) },
      pixels: [...capsuleLine(24, 23, 24, 44), ...stamp(14, 33, ['0..', '.0.', '.00', '..0']), ...stamp(29, 31, ['..0', '.0.', '00.', '0..']), ...stamp(18, 39, ['0.0', '.0.']), ...px(0, [31, 39], [30, 41])] },
    { shape: B2.horn, tone: 1, shade: 2, light: { tone: 0, shape: capsule([[23, 14], [24, 10]], 0.6) } },
    { shape: B2.head, tone: 2, shade: 3, pixels: [...stamp(19, 19, ['000....000', '.03....30.'])] },
    { shape: B2.mandibles, tone: 1, shade: 2 },
    { pixels: [...ember(5, 18), ...ember(40, 14), ...smoke(33, 3), ...smoke(4, 6)] },
  ]));
}

/** Ink seam between the two wing cases. */
function capsuleLine(x0, y0, x1, y1) {
  const pixels = [];
  for (let y = y0; y <= y1; y += 1) pixels.push([Math.round(x0 + ((x1 - x0) * (y - y0)) / (y1 - y0 || 1)), y, 3]);
  return pixels;
}

function babauBack() {
  return toRows(paint([
    { shape: B2.legs, tone: 1, shade: 2 },
    { shape: B2.horn, tone: 1, shade: 2 },
    { shape: B2.head, tone: 2, shade: 3 },
    { shape: ellipse(24, 32, 14, 12), tone: 2, shade: 3, light: { tone: 1, shape: ellipse(17, 25, 3, 2) },
      pixels: [...capsuleLine(24, 21, 24, 44), ...stamp(14, 31, ['0..', '.0.', '.00', '..0']), ...stamp(29, 29, ['..0', '.0.', '00.', '0..']), ...stamp(18, 38, ['0.0', '.0.'])] },
    { pixels: [...ember(5, 18), ...smoke(33, 3)] },
  ]));
}

const BABAU_ICON = iconFrom([
  { shape: mirrorX(union(capsule([[4, 10], [1, 13], [1, 15]], 0.7), capsule([[5, 13], [3, 15]], 0.7)), 8), tone: 1 },
  { shape: ellipse(8, 11.5, 5.5, 4), tone: 2, shade: 3, pixels: [...px(3, [8, 9], [8, 10], [8, 11], [8, 12], [8, 13], [8, 14], [8, 15]), ...px(0, [5, 11], [11, 12])] },
  { shape: capsule([[8, 6], [8, 3], [6, 1]], 1), tone: 1, shade: 2 },
  { shape: ellipse(8, 7, 3.2, 2.2), tone: 2, shade: 3, pixels: px(0, [6, 7], [10, 7]) },
]);

export const line = [
  { id: 'scorielle', front: babauetFront(), back: babauetBack(), icon: BABAUET_ICON },
  { id: 'scoriarque', front: babauFront(), back: babauBack(), icon: BABAU_ICON },
];
