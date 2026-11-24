// Lignée de la Bête des Vosges (109 Vosgoup, 110 Vosgar, Givre ; 111 Vosgarde, Givre et Combat) :
// ours des sapinières enneigées. Fiche : docs/bestiaire-folklorique/fiches/109-vosges.md.
// Tones: 0 frost, eyes and claws, 1 frosted fur, 2 dark fur, 3 ink.
import { capsule, ellipse, iconFrom, mirrorX, paint, poly, px, stamp, toRows, union } from '../creature-painter.js';

const flake = (x, y) => stamp(x, y, ['3.3', '.3.', '3.3']);
/** Ridge of fir needles: triangles along a line from (x0, y0) to (x1, y1), pointing up. */
function firRidge(x0, y0, x1, y1, count, height) {
  const parts = [];
  for (let i = 0; i < count; i += 1) {
    const t0 = i / count;
    const t1 = (i + 1) / count;
    const ax = x0 + (x1 - x0) * t0;
    const ay = y0 + (y1 - y0) * t0;
    const bx = x0 + (x1 - x0) * t1;
    const by = y0 + (y1 - y0) * t1;
    parts.push(poly([ax, ay + 2], [(ax + bx) / 2, (ay + by) / 2 - height], [bx, by + 2]));
  }
  return union(...parts);
}

// ---------- 109 Vosgoup: a frost-furred cub that rolls in the snow ----------
const V1 = {
  feet: union(ellipse(18.5, 44.6, 3.5, 1.6), ellipse(29.5, 44.6, 3.5, 1.6)),
  body: ellipse(24, 37, 9, 8),
  arms: mirrorX(capsule([[16, 35], [14, 40]], 2.2)),
  ears: mirrorX(ellipse(17, 20, 2.8, 2.8)),
  head: ellipse(24, 25, 8.5, 7),
  ruff: firRidge(15, 32, 33, 32, 6, 3),
  muzzle: ellipse(24, 28, 3.5, 2.5),
};

function vosgoupFront() {
  return toRows(paint([
    { shape: V1.feet, tone: 2, shade: 3 },
    { shape: V1.body, tone: 2, shade: 3, light: { tone: 1, shape: ellipse(24, 39, 4.5, 4) } },
    { shape: V1.arms, tone: 2, shade: 3, pixels: px(0, [13, 41], [15, 41], [33, 41], [35, 41]) },
    { shape: V1.ears, tone: 2, shade: 3, light: { tone: 1, shape: union(ellipse(17, 20, 1.2, 1.2), ellipse(31, 20, 1.2, 1.2)) } },
    { shape: V1.head, tone: 2, shade: 3, light: { tone: 1, shape: ellipse(20, 21, 2.5, 1.5) } },
    { shape: V1.ruff, tone: 1, shade: 2, light: { tone: 0, shape: ellipse(19, 32, 1.5, 0.8) } },
    { shape: V1.muzzle, tone: 1, shade: 2, pixels: [...stamp(23, 27, ['33']), ...stamp(23, 29, ['3', '.'])] },
    { pixels: [...stamp(19, 23, ['00....00', '03....03']), ...flake(8, 30), ...flake(38, 20)] },
  ]));
}

function vosgoupBack() {
  return toRows(paint([
    { shape: V1.feet, tone: 2, shade: 3 },
    { shape: V1.arms, tone: 2, shade: 3 },
    { shape: V1.body, tone: 2, shade: 3 },
    { shape: V1.ears, tone: 2, shade: 3 },
    { shape: V1.head, tone: 2, shade: 3, light: { tone: 1, shape: ellipse(21, 21, 3, 2) } },
    { shape: union(V1.ruff, firRidge(17, 36, 31, 36, 4, 3)), tone: 1, shade: 2 },
    { shape: ellipse(24, 43, 2, 1.5), tone: 1, shade: 2 },
    { pixels: [...flake(8, 30), ...flake(38, 20)] },
  ]));
}

const VOSGOUP_ICON = iconFrom([
  { shape: mirrorX(ellipse(4, 3.5, 2, 2), 8), tone: 2, shade: 3 },
  { shape: ellipse(8, 7, 5.5, 4.5), tone: 2, shade: 3, pixels: [...px(3, [5, 6], [11, 6]), ...px(0, [5, 5], [11, 5])] },
  { shape: ellipse(8, 9, 2.4, 1.6), tone: 1, pixels: px(3, [8, 8]) },
  { shape: firRidge(2.5, 11, 13.5, 11, 4, 2), tone: 1, shade: 2 },
  { shape: ellipse(8, 14, 5, 2), tone: 2, shade: 3 },
]);

// ---------- 110 Vosgar: a great bear of the fir forests, a ridge of frozen needles on its back ----------
const V2 = {
  legsBack: union(capsule([[33, 36], [35, 43]], 3.2), capsule([[20, 36], [19, 43]], 3)),
  legsFront: union(capsule([[29, 36], [30, 43.5]], 3.4), capsule([[14, 34], [13, 43.5]], 3.4)),
  body: ellipse(27, 30, 14, 9),
  ridge: firRidge(16, 22, 39, 23, 6, 5),
  head: ellipse(11, 25, 7, 6.5),
  muzzle: ellipse(5.5, 28, 3.5, 2.6),
  ear: ellipse(13, 18.5, 2.5, 2.5),
};

function vosgarFront() {
  return toRows(paint([
    { shape: V2.legsBack, tone: 2, shade: 3 },
    { shape: V2.ridge, tone: 1, shade: 2, light: { tone: 0, shape: union(ellipse(22, 19, 0.8, 1.5), ellipse(30, 19, 0.8, 1.5)) } },
    { shape: V2.body, tone: 2, shade: 3, light: { tone: 1, shape: ellipse(24, 26, 6, 2) } },
    { shape: V2.legsFront, tone: 2, shade: 3, pixels: px(0, [11, 44], [13, 44], [15, 44], [28, 44], [30, 44], [32, 44]) },
    { shape: V2.ear, tone: 2, shade: 3 },
    { shape: V2.head, tone: 2, shade: 3, light: { tone: 1, shape: ellipse(12, 30, 4, 1.5) } },
    { shape: V2.muzzle, tone: 1, shade: 2, pixels: [...px(3, [2, 27], [3, 27]), ...stamp(3, 30, ['3333'])] },
    { pixels: [...stamp(9, 23, ['00', '03']), ...flake(40, 8), ...flake(4, 12)] },
  ]));
}

function vosgarBack() {
  return toRows(paint([
    { shape: union(capsule([[16, 36], [15, 44]], 3.4), capsule([[32, 36], [33, 44]], 3.4)), tone: 2, shade: 3 },
    { shape: ellipse(24, 30, 13, 10), tone: 2, shade: 3, light: { tone: 1, shape: ellipse(19, 26, 4, 2) } },
    { shape: firRidge(13, 24, 35, 24, 6, 6), tone: 1, shade: 2 },
    { shape: mirrorX(ellipse(18, 16, 2.6, 2.6)), tone: 2, shade: 3 },
    { shape: ellipse(24, 20, 7, 5.5), tone: 2, shade: 3, light: { tone: 1, shape: ellipse(21, 18, 2.5, 1.5) } },
    { shape: ellipse(24, 40, 2.5, 2), tone: 1, shade: 2 },
    { pixels: [...flake(40, 8), ...flake(4, 12)] },
  ]));
}

const VOSGAR_ICON = iconFrom([
  { shape: firRidge(6, 7, 15, 7, 3, 3), tone: 1, shade: 2 },
  { shape: union(capsule([[6, 11], [6, 15]], 1.4), capsule([[13, 11], [13, 15]], 1.4)), tone: 2, shade: 3 },
  { shape: ellipse(10.5, 10, 5, 3.5), tone: 2, shade: 3 },
  { shape: ellipse(4.5, 3.5, 1.6, 1.6), tone: 2, shade: 3 },
  { shape: union(ellipse(4, 7, 3.5, 3.2), ellipse(1.5, 8.5, 1.6, 1.4)), tone: 2, shade: 3, pixels: [...px(3, [3, 6]), ...px(0, [3, 5]), ...px(3, [0, 8])] },
]);

// ---------- 111 Vosgarde: the beast rises on its hind legs, frozen fists raised to guard the pass ----------
const V3 = {
  legs: union(capsule([[18, 36], [17, 43]], 3.6), capsule([[30, 36], [31, 43]], 3.6)),
  feet: union(ellipse(16, 44.5, 5, 1.8), ellipse(32, 44.5, 5, 1.8)),
  body: ellipse(24, 29, 12, 11),
  belly: ellipse(24, 31, 7, 7),
  arms: mirrorX(capsule([[14, 23], [8, 22], [6, 16]], 3.2)),
  fists: mirrorX(ellipse(6, 13, 3.8, 3.6)),
  mane: firRidge(9, 21, 39, 21, 8, 6),
  ears: mirrorX(ellipse(17.5, 9, 2.6, 2.6)),
  head: ellipse(24, 14, 7.5, 6.5),
  muzzle: ellipse(24, 17, 3.5, 2.5),
};

function vosgardeFront() {
  return toRows(paint([
    { shape: V3.legs, tone: 2, shade: 3 },
    { shape: V3.feet, tone: 2, shade: 3, pixels: px(0, [12, 44], [14, 44], [34, 44], [36, 44]) },
    { shape: V3.body, tone: 2, shade: 3 },
    { shape: V3.belly, tone: 1, shade: 2, light: { tone: 0, shape: ellipse(22, 29, 2, 2) }, pixels: px(2, [21, 33], [27, 34], [24, 36]) },
    { shape: V3.arms, tone: 2, shade: 3 },
    { shape: V3.fists, tone: 1, shade: 2, light: { tone: 0, shape: union(ellipse(5, 12, 1.2, 1), ellipse(41, 12, 1.2, 1)) }, pixels: px(3, [5, 15], [7, 15], [41, 15], [43, 15]) },
    { shape: V3.mane, tone: 1, shade: 2, light: { tone: 0, shape: union(ellipse(16, 16, 0.8, 1.5), ellipse(32, 16, 0.8, 1.5)) } },
    { shape: V3.ears, tone: 2, shade: 3 },
    { shape: V3.head, tone: 2, shade: 3 },
    { shape: V3.muzzle, tone: 1, shade: 2, pixels: [...stamp(23, 16, ['33']), ...stamp(22, 18, ['3..3', '.33.'])] },
    { pixels: [...stamp(19, 12, ['000...000', '.03...30.']), ...flake(2, 30), ...flake(43, 28)] },
  ]));
}

function vosgardeBack() {
  return toRows(paint([
    { shape: V3.legs, tone: 2, shade: 3 },
    { shape: V3.feet, tone: 2, shade: 3 },
    { shape: V3.arms, tone: 2, shade: 3 },
    { shape: V3.fists, tone: 1, shade: 2 },
    { shape: V3.body, tone: 2, shade: 3, light: { tone: 1, shape: ellipse(19, 26, 3, 2) } },
    { shape: union(V3.mane, firRidge(16, 28, 32, 28, 4, 5)), tone: 1, shade: 2 },
    { shape: V3.ears, tone: 2, shade: 3 },
    { shape: V3.head, tone: 2, shade: 3, light: { tone: 1, shape: ellipse(21, 11, 2.5, 1.5) } },
    { pixels: [...flake(2, 30), ...flake(43, 28)] },
  ]));
}

const VOSGARDE_ICON = iconFrom([
  { shape: mirrorX(ellipse(2.5, 6, 2.2, 2.2), 8), tone: 1, shade: 2 },
  { shape: mirrorX(ellipse(5, 2, 1.6, 1.6), 8), tone: 2, shade: 3 },
  { shape: ellipse(8, 12, 5, 4), tone: 2, shade: 3, light: { tone: 1, shape: ellipse(8, 13, 2.5, 2) } },
  { shape: firRidge(3, 9, 13, 9, 4, 2.5), tone: 1, shade: 2 },
  { shape: ellipse(8, 5, 4.5, 3.8), tone: 2, shade: 3, pixels: [...px(3, [6, 4], [10, 4]), ...px(0, [6, 3], [10, 3]), ...px(3, [8, 6])] },
]);

export const line = [
  { id: 'frimousson', front: vosgoupFront(), back: vosgoupBack(), icon: VOSGOUP_ICON },
  { id: 'frimours', front: vosgarFront(), back: vosgarBack(), icon: VOSGAR_ICON },
  { id: 'frimastoc', front: vosgardeFront(), back: vosgardeBack(), icon: VOSGARDE_ICON },
];
