// Lignée du Croquemitaine (081 Croquemine et 082 Croquefrou, Ombre) et Dame noire (083, Roche et Ombre).
// Fiche : docs/bestiaire-folklorique/fiches/081-croquemitaine.md.
// Tones: 0 eyes and teeth, 1 rock and claws, 2 shadow, 3 ink.
import { capsule, ellipse, iconFrom, minus, mirrorX, paint, poly, px, rect, stamp, toRows, union } from '../creature-painter.js';

/** Ragged hem: a band whose bottom edge zigzags between y0 and y1. */
function hem(x0, x1, y0, y1, teeth) {
  const points = [[x0, y0]];
  const step = (x1 - x0) / teeth;
  for (let i = 0; i < teeth; i += 1) points.push([x0 + step * (i + 0.5), y1], [x0 + step * (i + 1), y0 + (y1 - y0) * 0.35]);
  points.push([x1, y0]);
  return poly(...points);
}
/** Gaping mouth with a row of teeth on top and bottom. */
function mouthPixels(x0, x1, top, bottom) {
  const pixels = [];
  for (let x = x0; x <= x1; x += 2) pixels.push([x, top, 0], [x + 1, bottom, 0]);
  return pixels;
}
const slantEyes = (lx, rx, y) => [...stamp(lx, y, ['000.', '.000']), ...stamp(rx, y, ['.000', '000.'])];

// ---------- 081 Croquemine: a small shadow that is mostly mouth ----------
const C1 = {
  horns: mirrorX(poly([16, 25], [13, 17], [20, 23])),
  body: union(ellipse(24, 31, 11, 9.5), hem(13, 35, 34, 44, 5)),
  arms: mirrorX(capsule([[14, 33], [9, 35], [8, 38]], 1.6)),
  mouth: ellipse(24, 34, 7, 3.6),
};

function croqueminFront() {
  return toRows(paint([
    { shape: C1.horns, tone: 2, shade: 3 },
    { shape: C1.arms, tone: 2, shade: 3, pixels: px(1, [7, 39], [9, 39], [39, 39], [41, 39]) },
    { shape: C1.body, tone: 2, shade: 3, light: { tone: 1, shape: ellipse(18, 25, 2.5, 1.5) } },
    { shape: C1.mouth, tone: 3, outline: false, pixels: mouthPixels(18, 29, 31, 37) },
    { pixels: slantEyes(17, 27, 26) },
  ]));
}

function croqueminBack() {
  return toRows(paint([
    { shape: C1.arms, tone: 2, shade: 3 },
    { shape: C1.horns, tone: 2, shade: 3 },
    { shape: C1.body, tone: 2, shade: 3, light: { tone: 1, shape: ellipse(20, 26, 3, 2) } },
  ]));
}

const CROQUEMIN_ICON = iconFrom([
  { shape: mirrorX(poly([4, 5], [2, 0.5], [7, 3.5]), 8), tone: 2, shade: 3 },
  { shape: union(ellipse(8, 8.5, 6, 5.5), hem(2, 14, 10, 15.5, 3)), tone: 2, shade: 3 },
  { shape: ellipse(8, 10, 4, 2), tone: 3, outline: false, pixels: [...px(0, [5, 9], [7, 9], [9, 9], [11, 9], [6, 11], [8, 11], [10, 11])] },
  { pixels: [...px(0, [5, 6], [6, 6], [10, 6], [11, 6])] },
]);

// ---------- 082 Croquefrou: a looming shadow with a gaping maw and long claws ----------
const C2 = {
  horns: union(poly([14, 16], [6, 3], [19, 12]), poly([34, 16], [42, 3], [29, 12])),
  body: union(ellipse(24, 23, 13, 12), poly([11, 24], [37, 24], [39, 36], [9, 36]), hem(9, 39, 34, 45, 6)),
  arms: mirrorX(capsule([[12, 24], [6, 29], [4, 36]], 2.6)),
  claws: mirrorX(union(poly([2, 36], [1, 42], [4, 38]), poly([4, 37], [4, 43], [6, 38]), poly([6, 36], [8, 41], [7, 35]))),
  mouth: poly([14, 26], [34, 26], [31, 36], [17, 36]),
};

function croquefrouFront() {
  return toRows(paint([
    { shape: C2.horns, tone: 2, shade: 3 },
    { shape: C2.arms, tone: 2, shade: 3 },
    { shape: C2.claws, tone: 1, shade: 2 },
    { shape: C2.body, tone: 2, shade: 3, light: { tone: 1, shape: ellipse(13, 26, 1.5, 3) } },
    { shape: C2.mouth, tone: 3, outline: false, pixels: [...mouthPixels(15, 32, 27, 35), ...px(0, [16, 28], [32, 28], [18, 34], [30, 34])] },
    { pixels: [...slantEyes(15, 29, 18), ...stamp(23, 15, ['00', '00'])] },
  ]));
}

function croquefrouBack() {
  return toRows(paint([
    { shape: C2.arms, tone: 2, shade: 3 },
    { shape: C2.claws, tone: 1, shade: 2 },
    { shape: C2.horns, tone: 2, shade: 3 },
    { shape: C2.body, tone: 2, shade: 3, light: { tone: 1, shape: ellipse(18, 16, 4, 2.5) } },
  ]));
}

const CROQUEFROU_ICON = iconFrom([
  { shape: union(poly([4, 5], [1, 0], [6, 3]), poly([12, 5], [15, 0], [10, 3])), tone: 2, shade: 3 },
  { shape: union(ellipse(8, 7.5, 6, 5.5), hem(2, 14, 9, 15.5, 3)), tone: 2, shade: 3 },
  { shape: poly([4, 8], [12, 8], [11, 13], [5, 13]), tone: 3, outline: false, pixels: px(0, [5, 9], [7, 9], [9, 9], [11, 9], [6, 12], [8, 12], [10, 12]) },
  { pixels: px(0, [4, 5], [5, 5], [11, 5], [12, 5], [8, 4]) },
]);

// ---------- 083 Dame noire: a veiled stalagmite with two pale eyes in the dark ----------
const D = {
  rock: poly([12, 45], [17, 20], [21, 10], [24, 6], [27, 10], [31, 20], [36, 45]),
  veil: poly([24, 7], [29, 12], [31, 20], [36, 30], [37, 37], [34, 34], [32, 38], [29, 34], [26, 38], [24, 34], [22, 38], [19, 34], [16, 38], [14, 34], [11, 37], [12, 30], [17, 20], [19, 12]),
  hollow: ellipse(24, 21, 5, 6),
  drips: union(poly([5, 0], [9, 0], [7, 9]), poly([37, 0], [43, 0], [40, 12]), poly([10, 0], [13, 0], [11.5, 5])),
  ground: union(ellipse(24, 45.5, 16, 2), poly([8, 46], [10, 40], [13, 46]), poly([35, 46], [38, 41], [40, 46])),
};

function dameNoireFront() {
  return toRows(paint([
    { shape: D.drips, tone: 1, shade: 2 },
    { shape: D.ground, tone: 1, shade: 2 },
    { shape: D.rock, tone: 1, shade: 2, light: { tone: 0, shape: poly([18, 30], [20, 22], [19, 40]) }, pixels: px(2, [16, 40], [17, 43], [31, 40], [33, 43], [29, 42]) },
    { shape: D.veil, tone: 2, shade: 3, pixels: px(3, [17, 30], [31, 30], [20, 34], [28, 34], [24, 31]) },
    { shape: D.hollow, tone: 3, outline: false, pixels: stamp(21, 19, ['00..00', '00..00']) },
    { pixels: [...px(0, [7, 12], [40, 15])] },
  ]));
}

function dameNoireBack() {
  return toRows(paint([
    { shape: D.drips, tone: 1, shade: 2 },
    { shape: D.ground, tone: 1, shade: 2 },
    { shape: D.rock, tone: 1, shade: 2, pixels: px(2, [16, 40], [17, 43], [31, 40], [33, 43], [29, 42]) },
    { shape: union(D.veil, poly([16, 26], [32, 26], [24, 10])), tone: 2, shade: 3, light: { tone: 1, shape: poly([21, 14], [23, 11], [22, 20]) }, pixels: px(3, [22, 24], [26, 24], [24, 30]) },
  ]));
}

const DAME_NOIRE_ICON = iconFrom([
  { shape: poly([3, 16], [6, 6], [8, 1], [10, 6], [13, 16]), tone: 1, shade: 2 },
  { shape: poly([5, 9], [7, 3], [8, 2], [9, 3], [11, 9], [11.5, 13], [10, 11.5], [8, 13], [6, 11.5], [4.5, 13]), tone: 2, shade: 3 },
  { shape: ellipse(8, 6.5, 1.8, 2.2), tone: 3, outline: false, pixels: px(0, [7, 6], [9, 6]) },
]);

export const line = [
  { id: 'sombrelin', front: croqueminFront(), back: croqueminBack(), icon: CROQUEMIN_ICON },
  { id: 'sombrecor', front: croquefrouFront(), back: croquefrouBack(), icon: CROQUEFROU_ICON },
  { id: 'stalactor', front: dameNoireFront(), back: dameNoireBack(), icon: DAME_NOIRE_ICON },
];
