// Lignée de la Grand'Goule (136 Goulinet et 137 Grangoule, Feu et Roche) : dragon des souterrains de Poitiers.
// Fiche : docs/bestiaire-folklorique/fiches/136-grangoule.md.
// Tones: 0 embers, eyes and teeth, 1 stone skin, 2 rock plates and wings, 3 ink.
import { capsule, ellipse, iconFrom, mirrorX, paint, poly, px, stamp, toRows, union } from '../creature-painter.js';

const ember = (x, y) => stamp(x, y, ['.3.', '303', '.3.']);
const smoke = (x, y) => stamp(x, y, ['.22.', '2..2', '..2.', '.2..']);
/** Open maw: dark gap with a glowing throat and a row of teeth along top and bottom. */
function mawPixels(x0, x1, top, bottom) {
  const pixels = [];
  for (let x = x0; x <= x1; x += 2) pixels.push([x, top, 0], [x + 1, bottom, 0]);
  return pixels;
}

// ---------- 136 Goulinet: a little stone dragon that is mostly jaw ----------
const G1 = {
  tail: capsule([[32, 40], [39, 39], [43, 34], [42, 29]], 2.2),
  tailTip: poly([40, 30], [42, 24], [45, 30]),
  plates: union(poly([25, 28], [28, 22], [31, 28]), poly([30, 30], [34, 25], [36, 32])),
  legs: union(capsule([[18, 39], [17, 44]], 2.6), capsule([[30, 39], [31, 44]], 2.6)),
  body: ellipse(26, 36, 10, 7),
  head: ellipse(18, 27, 9, 7.5),
  maw: poly([10, 27], [25, 26], [23, 33], [12, 33]),
  brows: union(poly([12, 21], [16, 17], [18, 22]), poly([20, 21], [24, 17], [25, 22])),
};

function goulinetFront() {
  return toRows(paint([
    { shape: G1.tail, tone: 1, shade: 2 },
    { shape: G1.tailTip, tone: 2, shade: 3 },
    { shape: G1.plates, tone: 2, shade: 3 },
    { shape: G1.legs, tone: 1, shade: 2, pixels: px(3, [16, 45], [18, 45], [30, 45], [32, 45]) },
    { shape: G1.body, tone: 1, shade: 2, light: { tone: 0, shape: ellipse(24, 40, 4, 1.5) }, pixels: [...px(2, [30, 34], [33, 37], [28, 38]), ...stamp(19, 36, ['3.3', '.3.'])] },
    { shape: G1.head, tone: 1, shade: 2, pixels: px(2, [11, 24], [24, 25]) },
    { shape: G1.maw, tone: 3, outline: false, light: { tone: 2, shape: ellipse(17.5, 30, 3, 1.5) }, pixels: mawPixels(12, 23, 27, 32) },
    { shape: G1.brows, tone: 2, shade: 3 },
    { pixels: [...stamp(15, 22, ['00', '03']), ...stamp(21, 22, ['00', '03']), ...ember(4, 22), ...smoke(5, 15)] },
  ]));
}

function goulinetBack() {
  return toRows(paint([
    { shape: G1.legs, tone: 1, shade: 2 },
    { shape: G1.body, tone: 1, shade: 2, pixels: px(2, [22, 35], [28, 33], [26, 39]) },
    { shape: union(poly([20, 32], [23, 25], [26, 32]), poly([25, 34], [29, 27], [31, 35])), tone: 2, shade: 3 },
    { shape: G1.tail, tone: 1, shade: 2 },
    { shape: G1.tailTip, tone: 2, shade: 3 },
    { shape: G1.head, tone: 1, shade: 2, pixels: px(2, [14, 25], [20, 23]) },
    { shape: G1.brows, tone: 2, shade: 3 },
    { pixels: smoke(5, 15) },
  ]));
}

const GOULINET_ICON = iconFrom([
  { shape: capsule([[11, 13], [14, 12], [15, 9]], 1.2), tone: 1, shade: 2 },
  { shape: ellipse(10, 12, 4.5, 3), tone: 1, shade: 2 },
  { shape: ellipse(6.5, 7.5, 5.5, 5), tone: 1, shade: 2 },
  { shape: poly([2, 8], [11, 7.5], [10, 11], [3, 11]), tone: 3, outline: false, pixels: px(0, [3, 8], [5, 8], [7, 8], [9, 8], [4, 10], [6, 10], [8, 10]) },
  { pixels: [...px(0, [4, 4], [8, 4]), ...px(3, [4, 5], [8, 5]), ...px(2, [3, 3], [9, 3])] },
  { shape: union(ellipse(7, 15, 1.5, 1), ellipse(12, 15, 1.5, 1)), tone: 1, shade: 2 },
]);

// ---------- 137 Grangoule: the great jaw of Poitiers, stone-scaled, wings of rock ----------
const G2 = {
  wings: mirrorX(poly([14, 20], [6, 8], [2, 12], [1, 20], [4, 18], [4, 25], [8, 22], [10, 28], [15, 26])),
  horns: mirrorX(poly([15, 12], [10, 3], [18, 9])),
  legs: union(capsule([[15, 38], [14, 44]], 3.4), capsule([[33, 38], [34, 44]], 3.4)),
  body: ellipse(24, 34, 12, 9),
  head: ellipse(24, 19, 11, 9),
  maw: poly([15, 18], [33, 18], [31, 28], [17, 28]),
  brow: poly([13, 15], [20, 12], [24, 15], [28, 12], [35, 15], [34, 17], [14, 17]),
};

function grangouleFront() {
  return toRows(paint([
    { shape: G2.wings, tone: 2, shade: 3, light: { tone: 1, shape: union(poly([6, 11], [12, 19], [8, 17]), poly([42, 11], [36, 19], [40, 17])) }, pixels: px(3, [4, 21], [8, 19], [44, 21], [40, 19]) },
    { shape: G2.legs, tone: 1, shade: 2, pixels: px(3, [12, 45], [14, 45], [16, 45], [32, 45], [34, 45], [36, 45]) },
    { shape: G2.body, tone: 1, shade: 2, light: { tone: 0, shape: ellipse(24, 38, 5, 2.5) },
      pixels: [...px(2, [14, 32], [16, 36], [33, 32], [31, 36]), ...stamp(20, 34, ['3...3..3', '.3.3.33.', '..3....3'])] },
    { shape: G2.horns, tone: 1, shade: 2, light: { tone: 0, shape: poly([11, 5], [12, 4], [13, 8]) } },
    { shape: G2.head, tone: 1, shade: 2, pixels: px(2, [14, 21], [34, 21], [16, 25], [32, 25]) },
    { shape: G2.maw, tone: 3, outline: false, light: { tone: 2, shape: ellipse(24, 24, 4, 2) }, pixels: [...mawPixels(16, 31, 19, 27), ...px(0, [16, 20], [32, 20])] },
    { shape: G2.brow, tone: 2, shade: 3, pixels: [...stamp(17, 13, ['00', '03']), ...stamp(29, 13, ['00', '03'])] },
    { pixels: [...ember(3, 31), ...ember(42, 30), ...smoke(22, 2)] },
  ]));
}

function grangouleBack() {
  return toRows(paint([
    { shape: G2.legs, tone: 1, shade: 2 },
    { shape: G2.body, tone: 1, shade: 2, pixels: px(2, [18, 32], [24, 36], [30, 32]) },
    { shape: G2.horns, tone: 1, shade: 2 },
    { shape: G2.head, tone: 1, shade: 2, pixels: px(2, [18, 16], [24, 20], [30, 16]) },
    { shape: G2.wings, tone: 2, shade: 3, light: { tone: 1, shape: union(poly([6, 11], [12, 19], [8, 17]), poly([42, 11], [36, 19], [40, 17])) } },
    { pixels: smoke(22, 2) },
  ]));
}

const GRANGOULE_ICON = iconFrom([
  { shape: mirrorX(poly([4, 7], [1, 2], [0.5, 9], [4, 10]), 8), tone: 2, shade: 3 },
  { shape: mirrorX(poly([5, 4], [3, 0.5], [6.5, 3]), 8), tone: 1, shade: 2 },
  { shape: ellipse(8, 7.5, 5.5, 4.5), tone: 1, shade: 2 },
  { shape: poly([4, 7], [12, 7], [11, 11], [5, 11]), tone: 3, outline: false, pixels: px(0, [5, 7], [7, 7], [9, 7], [11, 7], [6, 10], [8, 10], [10, 10]) },
  { pixels: [...px(0, [5, 5], [10, 5]), ...px(3, [6, 5], [11, 5])] },
  { shape: ellipse(8, 14, 5, 2), tone: 1, shade: 2 },
]);

export const line = [
  { id: 'tisonnet', front: goulinetFront(), back: goulinetBack(), icon: GOULINET_ICON },
  { id: 'tisonnard', front: grangouleFront(), back: grangouleBack(), icon: GRANGOULE_ICON },
];
