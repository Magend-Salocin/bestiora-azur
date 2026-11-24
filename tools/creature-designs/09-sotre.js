// Lignée du Sotré (125 et 126, Arcane et Métal), Birette (127, Arcane et Ombre) et Drapet (128, Normal et Ombre).
// Fiche : docs/bestiaire-folklorique/fiches/125-sotre.md.
// Tones: 0 glass shine, eyes and veils, 1 pale metal, feathers and fur, 2 dark metal and fur, 3 ink.
import { capsule, ellipse, iconFrom, minus, mirrorX, paint, poly, px, rect, stamp, toRows, union } from '../creature-painter.js';

const ring = (cx, cy, rx, ry, width) => minus(ellipse(cx, cy, rx, ry), ellipse(cx, cy, rx - width, ry - width));
const twinkle = (x, y) => stamp(x, y, ['.3.', '303', '.3.']);
const rune = (x, y) => stamp(x, y, ['3.3', '.3.', '3.3']);

// ---------- 125 Sotrin: a little hand mirror that pulls faces ----------
const S1 = {
  handle: capsule([[24, 35], [24, 42]], 2),
  foot: ellipse(24, 44.6, 4.5, 1.4),
  arms: mirrorX(capsule([[15, 27], [11, 31], [12, 34]], 1.3)),
  glass: ellipse(24, 25, 8, 8.5),
  frame: ring(24, 25, 9.5, 10, 2),
  finial: poly([21, 16], [24, 8], [27, 16]),
};

function sotrinFront() {
  return toRows(paint([
    { shape: S1.foot, tone: 2, shade: 3 },
    { shape: S1.handle, tone: 2, shade: 3, light: { tone: 1, shape: rect(23, 36, 24, 41) } },
    { shape: S1.arms, tone: 2, shade: 3 },
    { shape: S1.finial, tone: 2, shade: 3, pixels: px(0, [24, 10]) },
    { shape: S1.glass, tone: 1, light: { tone: 0, shape: poly([18, 22], [22, 18], [24, 18], [19, 24]) },
      pixels: [...stamp(20, 24, ['33...33', '.......', '.......', '3333333', '.3.3.3.'])] },
    { shape: S1.frame, tone: 2, outline: true, pixels: px(1, [17, 21], [31, 21], [24, 15]) },
    { pixels: [...twinkle(7, 15), ...twinkle(38, 20)] },
  ]));
}

function sotrinBack() {
  return toRows(paint([
    { shape: S1.foot, tone: 2, shade: 3 },
    { shape: S1.handle, tone: 2, shade: 3 },
    { shape: S1.arms, tone: 2, shade: 3 },
    { shape: S1.finial, tone: 2, shade: 3 },
    { shape: ellipse(24, 25, 9.5, 10), tone: 2, shade: 3, light: { tone: 1, shape: ellipse(21, 21, 2.5, 2) }, pixels: [...rune(23, 24)] },
    { pixels: twinkle(38, 20) },
  ]));
}

const SOTRIN_ICON = iconFrom([
  { shape: poly([6.5, 3], [8, 0], [9.5, 3]), tone: 2, shade: 3 },
  { shape: capsule([[8, 11], [8, 15]], 1.3), tone: 2, shade: 3 },
  { shape: ellipse(8, 7, 5.5, 4.8), tone: 2, shade: 3 },
  { shape: ellipse(8, 7, 4, 3.4), tone: 1, outline: false, pixels: [...px(3, [6, 6], [10, 6]), ...stamp(6, 8, ['33333']), ...px(0, [5, 4], [6, 4])] },
]);

// ---------- 126 Sotrémage: a standing mirror whose glass watches you back ----------
const S2 = {
  legs: union(capsule([[17, 37], [12, 42], [10, 45]], 1.6), capsule([[31, 37], [36, 42], [38, 45]], 1.6), capsule([[24, 38], [24, 45]], 1.6)),
  arms: mirrorX(capsule([[13, 22], [7, 24], [5, 30], [8, 33]], 1.6)),
  frame: ellipse(24, 22, 12, 16),
  glass: ellipse(24, 22, 9, 13),
  crest: poly([18, 7], [21, 3], [24, 0], [27, 3], [30, 7], [24, 9]),
};

function sotremageFront() {
  return toRows(paint([
    { shape: S2.legs, tone: 2, shade: 3 },
    { shape: S2.arms, tone: 2, shade: 3, pixels: px(1, [8, 26], [40, 26]) },
    { shape: S2.crest, tone: 2, shade: 3, pixels: px(0, [24, 4]) },
    { shape: S2.frame, tone: 2, shade: 3, pixels: [...rune(14, 10), ...rune(31, 10), ...rune(13, 31), ...rune(32, 31)].map(([x, y]) => [x, y, 1]) },
    { shape: S2.glass, tone: 1, light: { tone: 0, shape: poly([17, 15], [22, 10], [24, 10], [18, 19]) } },
    { shape: ellipse(24, 23, 5.5, 4), tone: 0, shade: 1 },
    { shape: ellipse(24, 23, 2, 3.5), tone: 3, outline: false, pixels: px(0, [24, 22]) },
    { pixels: [...twinkle(3, 8), ...twinkle(42, 12), ...twinkle(42, 38)] },
  ]));
}

function sotremageBack() {
  return toRows(paint([
    { shape: S2.legs, tone: 2, shade: 3 },
    { shape: S2.arms, tone: 2, shade: 3 },
    { shape: S2.crest, tone: 2, shade: 3 },
    { shape: S2.frame, tone: 2, shade: 3, light: { tone: 1, shape: ellipse(19, 14, 2.5, 4) }, pixels: [...rune(23, 20), ...rune(23, 26)].map(([x, y]) => [x, y, 1]) },
    { pixels: [...twinkle(3, 8), ...twinkle(42, 12)] },
  ]));
}

const SOTREMAGE_ICON = iconFrom([
  { shape: union(capsule([[6, 12], [4, 15]], 0.9), capsule([[10, 12], [12, 15]], 0.9)), tone: 2 },
  { shape: poly([6, 2], [8, 0], [10, 2]), tone: 2, shade: 3 },
  { shape: ellipse(8, 7.5, 5, 5.5), tone: 2, shade: 3 },
  { shape: ellipse(8, 7.5, 3.5, 4), tone: 1, outline: false, pixels: [...px(0, [7, 7], [9, 7], [6, 5]), ...px(3, [8, 6], [8, 7], [8, 8])] },
]);

// ---------- 127 Birette: a veiled owl that haunts the hedges at night ----------
const B = {
  branch: union(capsule([[2, 41], [46, 40]], 1.8), capsule([[38, 40], [44, 44]], 1)),
  tail: poly([20, 40], [28, 40], [26, 46], [22, 46]),
  body: ellipse(24, 31, 9.5, 10),
  veil: poly([24, 10], [32, 14], [35, 21], [35, 27], [32, 25], [30, 28], [27, 25], [24, 28], [21, 25], [18, 28], [16, 25], [13, 27], [13, 21], [16, 14]),
  wings: mirrorX(poly([15, 25], [10, 31], [12, 40], [17, 38])),
  face: ellipse(24, 22, 7.5, 6),
  tufts: mirrorX(poly([17, 13], [14, 5], [21, 11])),
  claws: mirrorX(capsule([[20, 39], [20, 41]], 1.2)),
};

function biretteFront() {
  return toRows(paint([
    { shape: B.branch, tone: 2, shade: 3 },
    { shape: B.tail, tone: 2, shade: 3 },
    { shape: B.body, tone: 1, shade: 2, pixels: [...stamp(20, 33, ['2.2.2.2.2']), ...stamp(21, 36, ['2.2.2.2'])] },
    { shape: B.wings, tone: 2, shade: 3, pixels: px(1, [12, 32], [13, 35], [36, 32], [35, 35]) },
    { shape: B.tufts, tone: 1, shade: 2 },
    { shape: B.veil, tone: 0, shade: 1, pixels: px(1, [16, 20], [32, 20], [24, 12]) },
    { shape: B.face, tone: 1, shade: 2, pixels: [...stamp(17, 19, ['.3333.3333.', '3000333003.', '3003033030.', '3000333003.', '.3333.3333.']).map(([x, y, t]) => [x + 1, y, t]), ...stamp(23, 24, ['22', '.2'])] },
    { shape: B.claws, tone: 1, shade: 2 },
    { pixels: [...twinkle(5, 10), ...twinkle(40, 6)] },
  ]));
}

function biretteBack() {
  return toRows(paint([
    { shape: B.branch, tone: 2, shade: 3 },
    { shape: B.tail, tone: 2, shade: 3 },
    { shape: B.tufts, tone: 1, shade: 2 },
    { shape: B.body, tone: 2, shade: 3, pixels: px(1, [20, 33], [24, 35], [28, 33], [22, 37], [26, 37]) },
    { shape: B.veil, tone: 0, shade: 1, pixels: px(1, [18, 18], [30, 18], [24, 22]) },
    { pixels: twinkle(40, 6) },
  ]));
}

const BIRETTE_ICON = iconFrom([
  { shape: mirrorX(poly([4, 4], [3, 0.5], [6.5, 3]), 8), tone: 1, shade: 2 },
  { shape: poly([8, 1.5], [13, 4], [14, 13], [11, 11.5], [8, 13], [5, 11.5], [2, 13], [3, 4]), tone: 0, shade: 1 },
  { shape: ellipse(8, 7, 4, 3.2), tone: 1, shade: 2, pixels: [...px(3, [5, 6], [6, 6], [10, 6], [11, 6], [5, 8], [6, 8], [10, 8], [11, 8]), ...px(2, [8, 9])] },
  { shape: rect(0, 14, 16, 16), tone: 2, outline: false },
]);

// ---------- 128 Drapet: a sheet-draped house thief carrying its loot ----------
const R = {
  tail: capsule([[32, 40], [39, 38], [42, 32]], 2.6),
  feet: union(ellipse(18, 44.6, 2.8, 1.4), ellipse(28, 44.6, 2.8, 1.4)),
  sheet: poly([23, 12], [30, 16], [33, 26], [35, 40], [32, 38], [30, 43], [27, 39], [24, 43], [21, 39], [18, 43], [15, 39], [12, 41], [14, 26], [17, 16]),
  mask: ellipse(23, 24, 7, 3),
  ears: union(ellipse(17, 13.5, 2, 2), ellipse(29, 13.5, 2, 2)),
  bundle: ellipse(10, 33, 5, 4.5),
  paw: ellipse(14, 31, 2, 1.8),
  spoon: capsule([[7, 28], [4, 22]], 0.6),
};

function drapetFront() {
  return toRows(paint([
    { shape: R.tail, tone: 2, shade: 3, pixels: [...px(1, [36, 39], [37, 38], [40, 35], [41, 34])] },
    { shape: R.feet, tone: 2, shade: 3 },
    { shape: R.ears, tone: 2, shade: 3 },
    { shape: R.sheet, tone: 0, shade: 1, pixels: px(1, [20, 30], [26, 32], [30, 28], [18, 22]) },
    { shape: R.mask, tone: 2, shade: 3, pixels: [...stamp(19, 23, ['00...00', '03...03']), ...px(3, [23, 26])] },
    { shape: R.spoon, tone: 1, shade: 2 },
    { shape: R.bundle, tone: 1, shade: 2, light: { tone: 0, shape: ellipse(8, 31, 1.5, 1) }, pixels: [...px(2, [9, 30], [10, 30], [11, 29]), ...px(3, [10, 33], [11, 34], [9, 34])] },
    { shape: R.paw, tone: 2, shade: 3 },
  ]));
}

function drapetBack() {
  return toRows(paint([
    { shape: R.feet, tone: 2, shade: 3 },
    { shape: R.ears, tone: 2, shade: 3 },
    { shape: R.sheet, tone: 0, shade: 1, pixels: px(1, [20, 30], [26, 32], [30, 28], [24, 20]) },
    { shape: capsule([[26, 41], [33, 41], [37, 35]], 2.6), tone: 2, shade: 3, pixels: px(1, [31, 41], [32, 41], [36, 37]) },
    { shape: R.bundle, tone: 1, shade: 2 },
  ]));
}

const DRAPET_ICON = iconFrom([
  { shape: capsule([[11, 13], [14, 11], [15, 8]], 1.3), tone: 2, shade: 3 },
  { shape: union(ellipse(5, 2.5, 1.3, 1.3), ellipse(11, 2.5, 1.3, 1.3)), tone: 2, shade: 3 },
  { shape: poly([8, 1.5], [12, 4], [13, 13], [10.5, 12], [8, 14], [5.5, 12], [3, 13], [4, 4]), tone: 0, shade: 1 },
  { shape: ellipse(8, 6.5, 4, 1.6), tone: 2, shade: 3, pixels: px(0, [6, 6], [10, 6]) },
  { shape: ellipse(3, 11, 2.5, 2.2), tone: 1, shade: 2 },
]);

export const line = [
  { id: 'sotrin', front: sotrinFront(), back: sotrinBack(), icon: SOTRIN_ICON },
  { id: 'sotremage', front: sotremageFront(), back: sotremageBack(), icon: SOTREMAGE_ICON },
  { id: 'birette', front: biretteFront(), back: biretteBack(), icon: BIRETTE_ICON },
  { id: 'drapet', front: drapetFront(), back: drapetBack(), icon: DRAPET_ICON },
];
