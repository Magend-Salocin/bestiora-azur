// Dahu (144, Givre) et Bête du Gévaudan (145, Combat et Arcane).
// Fiche : docs/bestiaire-folklorique/fiches/144-dahu.md.
// Tones: 0 snow, eyes and fangs, 1 light fur, 2 dark fur and horns, 3 ink.
import { capsule, ellipse, iconFrom, mirrorX, paint, poly, px, stamp, toRows, union } from '../creature-painter.js';

const flake = (x, y) => stamp(x, y, ['.3.', '303', '.3.']);
const claws = (list) => list.map(([x, y]) => [x, y, 3]);

// ---------- 144 Dahu: a woolly mountain goat, its uphill legs shorter than the downhill ones ----------
// The slope rises from left (row 45) to right (row 34).
const slopeY = (x) => 45 - (11 * x) / 48;
const D = {
  slope: poly([0, 48], [0, slopeY(0)], [48, slopeY(48)], [48, 48]),
  legsDown: union(capsule([[15, 33], [15, slopeY(15) - 1]], 2), capsule([[20, 34], [20, slopeY(20) - 1]], 2)),
  legsUp: union(capsule([[28, 33], [28, slopeY(28) - 1]], 2), capsule([[33, 32], [33, slopeY(33) - 1]], 2)),
  body: ellipse(25, 28, 11.5, 7.5),
  tail: ellipse(36.5, 25, 2, 2),
  horns: union(capsule([[12, 16], [14, 10], [19, 7], [23, 9]], 1.5), capsule([[16, 16], [19, 12], [24, 11], [27, 14]], 1.4)),
  head: ellipse(14, 20, 5, 4.5),
  muzzle: ellipse(12, 24, 3, 2.5),
  beard: poly([10, 25], [14, 25], [12, 31]),
  ears: union(poly([9.5, 18], [5, 18], [9, 20]), poly([18.5, 18], [22, 17], [19, 20])),
};

function dahuFront() {
  return toRows(paint([
    { shape: D.slope, tone: 1, shade: 2, light: { tone: 0, shape: poly([0, 47], [0, slopeY(0) + 1], [48, slopeY(48) + 1], [48, 37]) }, pixels: px(2, [6, 46], [26, 43], [40, 41], [44, 38]) },
    { shape: D.legsDown, tone: 2, shade: 3 },
    { shape: D.legsUp, tone: 2, shade: 3 },
    { shape: D.tail, tone: 1, shade: 2 },
    { shape: D.body, tone: 1, shade: 2, light: { tone: 0, shape: ellipse(23, 24, 6, 2) }, pixels: px(2, [18, 30], [22, 32], [27, 31], [31, 29], [33, 26]) },
    { shape: D.horns, tone: 2, shade: 3 },
    { shape: D.ears, tone: 1, shade: 2 },
    { shape: D.beard, tone: 1, shade: 2 },
    { shape: union(D.head, D.muzzle), tone: 1, shade: 2, light: { tone: 0, shape: ellipse(12, 18, 2, 1) }, pixels: [...stamp(11, 20, ['3..3', '0..0']), ...px(3, [11, 25], [13, 25])] },
    { pixels: [...flake(36, 9), ...flake(4, 8), ...flake(42, 22)] },
  ]));
}

function dahuBack() {
  return toRows(paint([
    { shape: D.slope, tone: 1, shade: 2, light: { tone: 0, shape: poly([0, 47], [0, slopeY(0) + 1], [48, slopeY(48) + 1], [48, 37]) } },
    { shape: union(capsule([[18, 33], [18, slopeY(18) - 1]], 2.2), capsule([[30, 32], [30, slopeY(30) - 1]], 2.2)), tone: 2, shade: 3 },
    { shape: ellipse(24, 27, 11, 8), tone: 1, shade: 2, light: { tone: 0, shape: ellipse(22, 23, 6, 2) }, pixels: px(2, [17, 28], [22, 31], [28, 30], [31, 26]) },
    { shape: mirrorX(capsule([[21, 15], [19, 9], [14, 6], [11, 8]], 1.5)), tone: 2, shade: 3 },
    { shape: union(poly([19, 18], [14, 18], [19, 20]), poly([29, 18], [34, 18], [29, 20])), tone: 1, shade: 2 },
    { shape: ellipse(24, 18, 5, 4.5), tone: 1, shade: 2 },
    { shape: ellipse(24, 31, 1.8, 1.8), tone: 1, shade: 2 },
    { pixels: [...flake(38, 9), ...flake(5, 10)] },
  ]));
}

const DAHU_ICON = iconFrom([
  { shape: poly([0, 16], [0, 14], [16, 10], [16, 16]), tone: 1, shade: 2 },
  { shape: union(capsule([[5, 10], [5, 13]], 1), capsule([[11, 9], [11, 11]], 1)), tone: 2, shade: 3 },
  { shape: ellipse(8.5, 7.5, 5.5, 3.5), tone: 1, shade: 2, light: { tone: 0, shape: ellipse(8, 6, 3, 1) } },
  { shape: capsule([[2, 4], [2, 1], [5, 1]], 0.9), tone: 2 },
  { shape: ellipse(3.5, 5.5, 2.8, 2.5), tone: 1, shade: 2, pixels: px(3, [3, 5]) },
]);

// ---------- 145 Gévaudan: a huge russet beast with a dark stripe, a great head and a tufted tail ----------
const G = {
  legsFar: union(capsule([[17, 36], [16, 44]], 2.6), capsule([[37, 35], [39, 44]], 2.6)),
  legsNear: union(capsule([[21, 35], [20, 44]], 3.2), capsule([[33, 34], [33, 44]], 3.2)),
  body: union(ellipse(29, 29, 14, 8.5), ellipse(19, 27, 8, 9)),
  stripe: capsule([[17, 19], [26, 21], [36, 21], [42, 24]], 1.4),
  tail: capsule([[42, 26], [46, 22], [45, 14]], 1.8),
  tuft: ellipse(44.5, 12, 3, 4),
  head: ellipse(11, 22, 7.5, 6.5),
  jaw: poly([2, 26], [10, 27], [13, 31], [5, 32], [1, 29]),
  snout: poly([1, 21], [8, 19], [10, 25], [1, 26]),
  ears: union(poly([10, 17], [9, 9], [14, 15]), poly([15, 17], [17, 9], [18, 17])),
};

function gevaudanFront() {
  return toRows(paint([
    { shape: G.legsFar, tone: 2, shade: 3, pixels: claws([[14, 45], [16, 45], [38, 45], [40, 45]]) },
    { shape: G.tail, tone: 2, shade: 3 },
    { shape: G.tuft, tone: 2, shade: 3, light: { tone: 1, shape: ellipse(43.5, 11, 1, 2) } },
    { shape: G.body, tone: 2, shade: 3, light: { tone: 1, shape: union(ellipse(27, 35, 9, 2.5), ellipse(16, 32, 4, 3)) }, pixels: px(3, [24, 27], [29, 26], [34, 27], [26, 31], [32, 31]) },
    { shape: G.stripe, tone: 3, outline: false },
    { shape: G.legsNear, tone: 2, shade: 3, light: { tone: 1, shape: capsule([[20, 37], [20, 41]], 0.5) }, pixels: claws([[17, 45], [19, 45], [21, 45], [23, 45], [31, 45], [33, 45], [35, 45]]) },
    { shape: G.ears, tone: 2, shade: 3, light: { tone: 1, shape: poly([11, 15], [10.5, 12], [12.5, 15]) } },
    { shape: G.jaw, tone: 1, shade: 2 },
    { shape: union(G.head, G.snout), tone: 2, shade: 3, light: { tone: 1, shape: ellipse(9, 24, 4, 2) }, pixels: [...px(3, [1, 21], [2, 21]), ...stamp(9, 20, ['00', '03'])] },
    { pixels: [...px(3, [2, 26], [3, 26], [4, 26], [5, 26], [6, 26], [7, 26], [8, 26], [9, 26], [10, 27], [11, 28]), ...px(0, [3, 27], [6, 27], [9, 27], [4, 25], [7, 25])] },
    { pixels: [...stamp(2, 6, ['.3.', '303', '.3.']), ...stamp(22, 6, ['.3.', '303', '.3.'])] },
  ]));
}

function gevaudanBack() {
  return toRows(paint([
    { shape: union(capsule([[16, 34], [15, 44]], 3.2), capsule([[32, 34], [33, 44]], 3.2)), tone: 2, shade: 3, pixels: claws([[13, 45], [15, 45], [17, 45], [31, 45], [33, 45], [35, 45]]) },
    { shape: union(ellipse(24, 29, 14, 10), ellipse(19, 21, 7, 6)), tone: 2, shade: 3, light: { tone: 1, shape: ellipse(26, 37, 7, 1.5) } },
    { shape: capsule([[21, 18], [24, 24], [26, 32], [26, 38]], 1.5), tone: 3, outline: false },
    { shape: union(poly([14, 18], [13, 9], [18, 15]), poly([22, 16], [24, 8], [25, 17])), tone: 2, shade: 3 },
    { shape: capsule([[37, 32], [43, 26], [43, 17]], 1.8), tone: 2, shade: 3 },
    { shape: ellipse(43, 14, 3, 4), tone: 2, shade: 3, light: { tone: 1, shape: ellipse(42, 13, 1, 2) } },
  ]));
}

const GEVAUDAN_ICON = iconFrom([
  { shape: capsule([[13, 9], [15, 5]], 1), tone: 2 },
  { shape: union(capsule([[7, 11], [7, 15]], 1.2), capsule([[12, 11], [12, 15]], 1.2)), tone: 2, shade: 3 },
  { shape: ellipse(10, 9.5, 5, 3.5), tone: 2, shade: 3, pixels: px(3, [8, 7], [10, 6], [12, 7]) },
  { shape: union(poly([3, 5], [3, 1], [5.5, 4]), poly([5.5, 5], [7, 1], [7.5, 5])), tone: 2, shade: 3 },
  { shape: union(ellipse(4.5, 7.5, 3.5, 3), poly([0, 7], [3, 6], [3, 10], [0, 9.5])), tone: 2, shade: 3, pixels: [...px(0, [4, 6]), ...px(3, [0, 9], [1, 9], [2, 9], [3, 9]), ...px(0, [1, 10])] },
]);

export const line = [
  { id: 'dahu', front: dahuFront(), back: dahuBack(), icon: DAHU_ICON },
  { id: 'gevaudan', front: gevaudanFront(), back: gevaudanBack(), icon: GEVAUDAN_ICON },
];
