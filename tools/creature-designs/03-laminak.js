// Lignée du Laminak (047 à 049, Eau) : esprits basques des sources, aux pieds de cane et au peigne d'or.
// Fiche : docs/bestiaire-folklorique/fiches/047-laminak.md.
// Tones: 0 skin and comb, 1 scales and webbed feet, 2 hair, 3 ink.
import { capsule, ellipse, eyes, iconFrom, mirrorX, paint, poly, px, rect, stamp, toRows, union } from '../creature-painter.js';

/** Webbed duck foot: three toes fanning out from the ankle. */
const duckFoot = (cx, y, dir) => poly([cx - 1.5, y - 2.5], [cx + 1.5, y - 2.5], [cx + 5.5 * dir, y + 1.6], [cx + 2 * dir, y + 1], [cx, y + 1.8], [cx - 2 * dir, y + 1], [cx - 3 * dir, y + 1.6]);
/** Gill slits on both cheeks. */
const gills = (lx, rx, y) => px(2, [lx, y], [lx, y + 2], [rx, y], [rx, y + 2]);
const comb = (x, y) => stamp(x, y, ['333333', '300003', '303030']);
const ripples = stamp(6, 46, ['3333.....3333........3333.....3333']);

// ---------- 047 Laminak: little spring sprite with long wet hair ----------
const L1 = {
  hair: poly([15, 25], [16, 19], [20, 16], [28, 16], [32, 19], [33, 25], [34, 34], [36, 40], [31, 38], [29, 41], [24, 38], [19, 41], [17, 38], [12, 40], [14, 34]),
  feet: union(duckFoot(19, 44, -1), duckFoot(29, 44, 1)),
  legs: union(capsule([[20, 39], [19, 42]], 1.3), capsule([[28, 39], [29, 42]], 1.3)),
  body: ellipse(24, 35, 5.5, 5),
  fins: mirrorX(poly([17, 25], [11, 21], [12, 26], [17, 28])),
  face: ellipse(24, 26, 6.5, 5.5),
  fringe: poly([17, 24], [18, 19], [24, 17], [30, 19], [31, 24], [28, 21], [24, 22], [20, 21]),
};

function laminakFront() {
  return toRows(paint([
    { shape: L1.hair, tone: 2, shade: 3, light: { tone: 1, shape: union(capsule([[16, 27], [15, 35]], 0.6), capsule([[32, 27], [33, 35]], 0.6)) } },
    { shape: L1.legs, tone: 1, shade: 2 },
    { shape: L1.feet, tone: 1, shade: 2, pixels: px(3, [16, 45], [18, 45], [30, 45], [32, 45]) },
    { shape: L1.body, tone: 1, shade: 2, light: { tone: 0, shape: ellipse(23, 34, 2.5, 2.5) }, pixels: px(2, [21, 37], [23, 38], [26, 37], [27, 35]) },
    { shape: L1.fins, tone: 1, shade: 2, light: { tone: 0, shape: union(poly([13, 23], [16, 25], [13, 25]), poly([35, 23], [32, 25], [35, 25])) } },
    { shape: L1.face, tone: 0, shade: 1 },
    { shape: L1.fringe, tone: 2, shade: 3, light: { tone: 1, shape: poly([19, 19], [22, 18], [20, 20]) } },
    { pixels: [...eyes(20, 26, 24), ...stamp(23, 28, ['33', '33']), ...gills(18, 30, 26), ...comb(29, 33)] },
  ]));
}

function laminakBack() {
  return toRows(paint([
    { shape: L1.legs, tone: 1, shade: 2 },
    { shape: L1.feet, tone: 1, shade: 2 },
    { shape: L1.body, tone: 1, shade: 2 },
    { shape: L1.fins, tone: 1, shade: 2 },
    { shape: union(L1.hair, L1.face), tone: 2, shade: 3, light: { tone: 1, shape: union(capsule([[20, 20], [20, 36]], 0.6), capsule([[25, 19], [26, 36]], 0.6), capsule([[30, 22], [31, 36]], 0.6)) } },
  ]));
}

const LAMINAK_ICON = iconFrom([
  { shape: poly([2, 9], [3, 3], [8, 1], [13, 3], [14, 9], [15, 15], [11, 13], [8, 15], [5, 13], [1, 15]), tone: 2, shade: 3 },
  { shape: union(poly([3, 7], [0, 4], [0.5, 8], [3, 9]), poly([13, 7], [16, 4], [15.5, 8], [13, 9])), tone: 1, shade: 2 },
  { shape: ellipse(8, 7.5, 4.5, 4), tone: 0, shade: 1 },
  { shape: poly([4, 6], [5, 3], [8, 2], [11, 3], [12, 6], [8, 4.5]), tone: 2, shade: 3 },
  { pixels: [...px(3, [5, 7], [5, 8], [10, 7], [10, 8]), ...px(0, [5, 7], [10, 7]), ...px(3, [7, 10], [8, 10])] },
]);

// ---------- 048 Laminéa: tall lamia combing her hair at the spring ----------
const L2 = {
  hair: poly([14, 16], [17, 9], [24, 6], [31, 9], [34, 16], [35, 26], [38, 34], [40, 41], [35, 39], [33, 42], [30, 39], [24, 40], [18, 39], [15, 42], [13, 39], [8, 41], [10, 34], [13, 26]),
  feet: union(duckFoot(19, 44, -1), duckFoot(29, 44, 1)),
  legs: union(capsule([[20, 38], [19, 42]], 1.5), capsule([[28, 38], [29, 42]], 1.5)),
  dress: poly([19, 22], [29, 22], [32, 38], [16, 38]),
  arm: capsule([[29, 23], [32, 18], [30, 14]], 1.6),
  armLeft: capsule([[19, 24], [17, 31]], 1.6),
  fins: mirrorX(poly([17.5, 14], [10, 10], [11, 16], [17.5, 18])),
  face: ellipse(24, 15, 6, 5.5),
  fringe: poly([17.5, 13], [19, 8], [24, 7], [29, 8], [30.5, 13], [27, 10.5], [24, 11.5], [21, 10.5]),
};

function lamineaFront() {
  return toRows(paint([
    { shape: L2.hair, tone: 2, shade: 3, light: { tone: 1, shape: union(capsule([[14, 18], [12, 36]], 0.6), capsule([[34, 18], [36, 36]], 0.6), capsule([[16, 24], [15, 38]], 0.5)) } },
    { shape: L2.legs, tone: 1, shade: 2 },
    { shape: L2.feet, tone: 1, shade: 2, pixels: px(3, [16, 45], [18, 45], [30, 45], [32, 45]) },
    { shape: L2.dress, tone: 1, shade: 2, light: { tone: 0, shape: poly([20, 23], [23, 23], [20, 33], [18, 33]) },
      pixels: [...px(2, [22, 27], [26, 27], [24, 30], [21, 33], [27, 33], [24, 36]), ...px(3, [23, 27], [27, 27], [25, 30], [22, 33], [28, 33])] },
    { shape: L2.armLeft, tone: 0, shade: 1 },
    { shape: L2.arm, tone: 0, shade: 1 },
    { shape: L2.fins, tone: 1, shade: 2, light: { tone: 0, shape: union(poly([12, 12], [16, 15], [12, 15]), poly([36, 12], [32, 15], [36, 15])) } },
    { shape: L2.face, tone: 0, shade: 1 },
    { shape: L2.fringe, tone: 2, shade: 3, light: { tone: 1, shape: poly([20, 9], [23, 8], [21, 10]) } },
    // Golden comb held up to the hair.
    { shape: rect(29, 9, 35, 12), tone: 0, pixels: stamp(29, 12, ['3.3.3.']) },
    { pixels: [...eyes(20, 26, 14), ...stamp(23, 18, ['33']), ...gills(18, 30, 15)] },
  ]));
}

function lamineaBack() {
  return toRows(paint([
    { shape: L2.legs, tone: 1, shade: 2 },
    { shape: L2.feet, tone: 1, shade: 2 },
    { shape: L2.dress, tone: 1, shade: 2 },
    { shape: L2.fins, tone: 1, shade: 2 },
    { shape: union(L2.hair, L2.face), tone: 2, shade: 3,
      light: { tone: 1, shape: union(capsule([[19, 10], [17, 38]], 0.6), capsule([[24, 8], [24, 38]], 0.6), capsule([[29, 10], [31, 38]], 0.6)) } },
    { shape: rect(13, 11, 19, 14), tone: 0, pixels: stamp(13, 14, ['.3.3.3']) },
  ]));
}

const LAMINEA_ICON = iconFrom([
  { shape: poly([2, 7], [3, 2], [8, 0.5], [13, 2], [14, 7], [15.5, 15], [11, 13], [8, 15], [5, 13], [0.5, 15]), tone: 2, shade: 3, light: { tone: 1, shape: capsule([[2, 8], [1.5, 13]], 0.5) } },
  { shape: ellipse(8, 7, 4.2, 4), tone: 0, shade: 1 },
  { shape: poly([4, 6], [5, 2.5], [8, 1.5], [11, 2.5], [12, 6], [8, 4]), tone: 2, shade: 3 },
  { shape: rect(11, 1, 16, 3.5), tone: 0, pixels: stamp(11, 3, ['3.3.3']) },
  { pixels: [...px(3, [5, 6], [5, 7], [10, 6], [10, 7]), ...px(0, [5, 6], [10, 6]), ...px(3, [7, 9], [8, 9]), ...px(1, [7, 12], [8, 13])] },
]);

// ---------- 049 Laminara: queen of the springs, her hair falls like waterfalls ----------
const L3 = {
  hair: poly([14, 12], [17, 5], [24, 2], [31, 5], [34, 12], [38, 18], [43, 26], [46, 36], [44, 44], [39, 41], [36, 44], [32, 40], [16, 40], [12, 44], [9, 41], [4, 44], [2, 36], [5, 26], [10, 18]),
  comb: poly([18, 5], [30, 5], [29, 1], [19, 1]),
  feet: union(duckFoot(19, 44, -1), duckFoot(29, 44, 1)),
  tail: poly([19, 18], [29, 18], [33, 30], [37, 41], [11, 41], [15, 30]),
  fins: mirrorX(poly([18, 10], [11, 5], [12, 12], [18, 15])),
  face: ellipse(24, 12, 6, 5.5),
  fringe: poly([17.5, 10], [19, 5.5], [24, 4.5], [29, 5.5], [30.5, 10], [27, 7.5], [24, 8.5], [21, 7.5]),
  water: union(ellipse(24, 45.5, 22, 2.5), ellipse(10, 43.5, 5, 1.5), ellipse(38, 43.5, 5, 1.5)),
};

function laminaraFront() {
  return toRows(paint([
    { shape: L3.hair, tone: 2, shade: 3,
      light: { tone: 1, shape: union(capsule([[12, 16], [5, 30], [4, 40]], 0.6), capsule([[36, 16], [43, 30], [44, 40]], 0.6), capsule([[14, 20], [9, 34], [9, 40]], 0.5), capsule([[34, 20], [39, 34], [39, 40]], 0.5)) } },
    { shape: L3.feet, tone: 1, shade: 2 },
    { shape: L3.tail, tone: 1, shade: 2, light: { tone: 0, shape: poly([19, 21], [22, 21], [18, 31], [17, 30]) },
      pixels: [...px(3, [21, 25], [24, 25], [27, 25], [19, 29], [22, 29], [25, 29], [28, 29], [21, 33], [24, 33], [27, 33], [22, 37], [25, 37])] },
    { shape: L3.fins, tone: 1, shade: 2, light: { tone: 0, shape: union(poly([13, 7], [17, 11], [13, 11]), poly([35, 7], [31, 11], [35, 11])) } },
    { shape: L3.face, tone: 0, shade: 1 },
    { shape: L3.fringe, tone: 2, shade: 3, light: { tone: 1, shape: poly([20, 6], [23, 5.5], [21, 7.5]) } },
    { shape: L3.comb, tone: 0, shade: 1, pixels: px(3, [20, 3], [22, 3], [24, 3], [26, 3], [28, 3]) },
    { pixels: [...eyes(20, 26, 11), ...stamp(23, 15, ['33']), ...gills(18, 30, 12)] },
    { shape: L3.water, tone: 1, shade: 2, light: { tone: 0, shape: union(ellipse(10, 43, 2.5, 0.8), ellipse(38, 43, 2.5, 0.8)) }, pixels: [...ripples, ...px(0, [17, 45], [31, 45])] },
  ]));
}

function laminaraBack() {
  return toRows(paint([
    { shape: L3.feet, tone: 1, shade: 2 },
    { shape: L3.tail, tone: 1, shade: 2 },
    { shape: L3.fins, tone: 1, shade: 2 },
    { shape: union(L3.hair, L3.face, poly([15, 12], [33, 12], [34, 40], [14, 40])), tone: 2, shade: 3,
      light: { tone: 1, shape: union(capsule([[18, 8], [16, 40]], 0.6), capsule([[24, 4], [24, 40]], 0.6), capsule([[30, 8], [32, 40]], 0.6), capsule([[12, 16], [5, 30], [4, 40]], 0.6), capsule([[36, 16], [43, 30], [44, 40]], 0.6)) } },
    { shape: L3.comb, tone: 0, shade: 1 },
    { shape: L3.water, tone: 1, shade: 2, light: { tone: 0, shape: union(ellipse(10, 43, 2.5, 0.8), ellipse(38, 43, 2.5, 0.8)) }, pixels: ripples },
  ]));
}

const LAMINARA_ICON = iconFrom([
  { shape: poly([3, 6], [5, 2], [11, 2], [13, 6], [15.5, 12], [16, 16], [0, 16], [0.5, 12]), tone: 2, shade: 3, light: { tone: 1, shape: union(capsule([[2, 9], [1, 15]], 0.5), capsule([[14, 9], [15, 15]], 0.5)) } },
  { shape: ellipse(8, 7.5, 4.2, 4), tone: 0, shade: 1 },
  { shape: poly([4, 6.5], [5, 3.5], [8, 2.5], [11, 3.5], [12, 6.5], [8, 5]), tone: 2, shade: 3 },
  { shape: poly([4.5, 2.5], [11.5, 2.5], [11, 0], [5, 0]), tone: 0, shade: 1, pixels: px(3, [6, 1], [8, 1], [10, 1]) },
  { shape: rect(5, 12, 11, 16), tone: 1, shade: 2, pixels: px(3, [6, 13], [8, 14], [10, 13]) },
  { pixels: [...px(3, [5, 7], [5, 8], [10, 7], [10, 8]), ...px(0, [5, 7], [10, 7]), ...px(3, [7, 10], [8, 10])] },
]);

export const line = [
  { id: 'goujonet', front: laminakFront(), back: laminakBack(), icon: LAMINAK_ICON },
  { id: 'goujarde', front: lamineaFront(), back: lamineaBack(), icon: LAMINEA_ICON },
  { id: 'brochemor', front: laminaraFront(), back: laminaraBack(), icon: LAMINARA_ICON },
];
