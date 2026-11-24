// Lignée de la Lavandière (118 et 119, Insecte et Eau) et Magou (120, Terre et Eau).
// Fiche : docs/bestiaire-folklorique/fiches/118-lavandiere.md.
// Tones: 0 linen and eyes, 1 pale carapace, ripples and belly, 2 dark carapace and mud, 3 ink.
import { capsule, ellipse, iconFrom, mirrorX, paint, poly, px, stamp, toRows, union } from '../creature-painter.js';

const ripples = (list) => union(...list.map(([x, y, r]) => ellipse(x, y, r, r * 0.3)));
const bubble = (x, y) => stamp(x, y, ['.3.', '303', '.3.']);

// ---------- 118 Lavandière: a water strider wringing a scrap of linen ----------
const L1 = {
  ripples: ripples([[7, 44, 4], [41, 44, 4], [14, 40, 3], [34, 40, 3]]),
  legs: mirrorX(union(capsule([[20, 33], [12, 36], [7, 43]], 1), capsule([[21, 31], [15, 34], [14, 39]], 1))),
  body: ellipse(24, 32, 5, 5.5),
  head: ellipse(24, 24.5, 4.5, 4),
  arms: union(capsule([[21, 28], [16, 30], [14, 27]], 1.1), capsule([[27, 27], [32, 22], [35, 19]], 1.1)),
  linen: poly([33, 18], [40, 17], [41, 29], [39, 27], [37, 31], [35, 27], [33, 29]),
};

function lavandiereFront() {
  return toRows(paint([
    { shape: L1.ripples, tone: 1, outline: false, pixels: [...stamp(3, 44, ['3........3']), ...stamp(37, 44, ['3........3'])] },
    { shape: L1.legs, tone: 2, shade: 3 },
    { shape: L1.body, tone: 2, shade: 3, light: { tone: 1, shape: ellipse(23, 31, 2, 3) } },
    { shape: L1.arms, tone: 2, shade: 3 },
    { shape: L1.linen, tone: 0, shade: 1, pixels: px(1, [36, 20], [36, 23], [38, 22], [39, 25]) },
    { shape: L1.head, tone: 2, shade: 3, pixels: [...stamp(21, 23, ['00..00', '03..03'])] },
    { pixels: [...bubble(8, 30), ...bubble(10, 22)] },
  ]));
}

function lavandiereBack() {
  return toRows(paint([
    { shape: L1.ripples, tone: 1, outline: false },
    { shape: L1.legs, tone: 2, shade: 3 },
    { shape: L1.linen, tone: 0, shade: 1, pixels: px(1, [36, 20], [36, 23], [38, 22]) },
    { shape: L1.arms, tone: 2, shade: 3 },
    { shape: union(L1.body, L1.head), tone: 2, shade: 3, light: { tone: 1, shape: ellipse(24, 32, 1, 4) } },
  ]));
}

const LAVANDIERE_ICON = iconFrom([
  { shape: mirrorX(union(capsule([[6, 10], [3, 12], [1, 15]], 0.7), capsule([[6, 9], [3, 9], [1.5, 11]], 0.7)), 8), tone: 2 },
  { shape: ellipse(8, 10, 3, 3.5), tone: 2, shade: 3 },
  { shape: poly([2, 1], [14, 1], [13, 5], [8, 4], [3, 5]), tone: 0, shade: 1 },
  { shape: ellipse(8, 6, 2.6, 2.2), tone: 2, shade: 3, pixels: px(0, [7, 6], [9, 6]) },
]);

// ---------- 119 Lavandâme: a great pale strider beating a long white sheet at night ----------
const L2 = {
  ripples: ripples([[5, 45, 4], [43, 45, 4], [13, 42, 3], [35, 42, 3]]),
  legs: mirrorX(union(capsule([[20, 34], [11, 37], [5, 44]], 1.2), capsule([[21, 36], [16, 39], [13, 42]], 1.2))),
  wings: mirrorX(poly([22, 26], [14, 18], [12, 26], [20, 34])),
  body: ellipse(24, 31, 5.5, 7),
  head: ellipse(24, 19.5, 5, 4.5),
  antennae: mirrorX(capsule([[22, 16], [19, 9], [16, 7]], 0.6)),
  arms: union(capsule([[21, 24], [25, 15], [30, 9]], 1.3), capsule([[27, 24], [33, 16], [38, 8]], 1.3)),
  sheet: poly([29, 7], [43, 5], [45, 18], [44, 33], [42, 30], [40, 35], [38, 29], [35, 33], [34, 26], [31, 28]),
};

function lavandameFront() {
  return toRows(paint([
    { shape: L2.ripples, tone: 1, outline: false, pixels: stamp(1, 45, ['3........3']) },
    { shape: L2.legs, tone: 2, shade: 3 },
    { shape: L2.wings, tone: 1, shade: 2, light: { tone: 0, shape: union(poly([15, 20], [17, 22], [14, 25]), poly([33, 20], [31, 22], [34, 25])) } },
    { shape: L2.body, tone: 1, shade: 2, pixels: [...px(2, [22, 30], [26, 30], [22, 34], [26, 34]), ...px(3, [24, 27], [24, 31], [24, 35])] },
    { shape: L2.sheet, tone: 0, shade: 1, pixels: px(1, [35, 10], [39, 14], [37, 19], [41, 22], [39, 25], [42, 12]) },
    { shape: L2.arms, tone: 2, shade: 3 },
    { shape: L2.antennae, tone: 2, outline: false },
    { shape: L2.head, tone: 1, shade: 2, pixels: stamp(20, 18, ['000..000', '.03..30.']) },
  ]));
}

function lavandameBack() {
  return toRows(paint([
    { shape: L2.ripples, tone: 1, outline: false },
    { shape: L2.legs, tone: 2, shade: 3 },
    { shape: L2.sheet, tone: 0, shade: 1, pixels: px(1, [35, 10], [39, 14], [37, 19], [41, 22]) },
    { shape: L2.arms, tone: 2, shade: 3 },
    { shape: union(L2.body, L2.head), tone: 1, shade: 2 },
    { shape: L2.antennae, tone: 2, outline: false },
    { shape: mirrorX(poly([23, 24], [15, 22], [13, 32], [22, 38])), tone: 1, shade: 2, light: { tone: 0, shape: mirrorX(poly([21, 26], [16, 25], [16, 30])) } },
  ]));
}

const LAVANDAME_ICON = iconFrom([
  { shape: mirrorX(capsule([[6, 12], [2.5, 13], [1, 15.5]], 0.7), 8), tone: 2 },
  { shape: ellipse(8, 11.5, 2.8, 3.5), tone: 1, shade: 2 },
  { shape: poly([1, 1], [15, 1], [15, 4], [13, 7], [12, 4.5], [10, 6]), tone: 0, shade: 1 },
  { shape: union(capsule([[6, 9], [3, 6], [2, 3]], 0.8), capsule([[10, 9], [13, 6], [14, 3]], 0.8)), tone: 2 },
  { shape: ellipse(8, 7, 2.6, 2.2), tone: 1, shade: 2, pixels: px(3, [7, 7], [9, 7]) },
]);

// ---------- 120 Magou: a bearded catfish rising from the flood mud ----------
const M = {
  mud: union(ellipse(24, 45, 22, 2.5), ellipse(38, 43, 7, 2)),
  tail: poly([36, 31], [46, 22], [44, 32], [46, 41], [36, 36]),
  body: union(ellipse(27, 34, 13, 8), capsule([[30, 33], [38, 33]], 4)),
  dorsal: poly([22, 27], [27, 20], [32, 27]),
  fin: poly([20, 37], [24, 43], [27, 38]),
  head: ellipse(14, 33, 10, 8),
  mouth: poly([4, 35], [17, 35], [15, 38], [6, 38]),
  barbels: union(capsule([[7, 34], [3, 38], [1, 43]], 0.7), capsule([[10, 36], [9, 41], [6, 45]], 0.7), capsule([[8, 31], [4, 27], [2, 22]], 0.7)),
};

function magouFront() {
  return toRows(paint([
    { shape: M.mud, tone: 2, shade: 3, pixels: px(3, [12, 46], [30, 45], [40, 43]) },
    { shape: M.tail, tone: 2, shade: 3 },
    { shape: M.dorsal, tone: 2, shade: 3 },
    { shape: M.body, tone: 2, shade: 3, light: { tone: 1, shape: ellipse(26, 39, 10, 2.5) }, pixels: px(1, [24, 30], [30, 31], [35, 32]) },
    { shape: M.fin, tone: 2, shade: 3 },
    { shape: M.head, tone: 2, shade: 3, light: { tone: 1, shape: ellipse(12, 39, 5, 2) } },
    { shape: M.mouth, tone: 3, outline: false, pixels: px(1, [8, 36], [12, 36]) },
    { shape: M.barbels, tone: 1, outline: false },
    { pixels: [...stamp(11, 29, ['00', '03']), ...bubble(5, 14), ...bubble(10, 9)] },
  ]));
}

function magouBack() {
  return toRows(paint([
    { shape: M.mud, tone: 2, shade: 3 },
    { shape: mirrorX(poly([10, 34], [2, 30], [4, 38])), tone: 2, shade: 3 },
    { shape: union(ellipse(24, 34, 13, 8)), tone: 2, shade: 3, light: { tone: 1, shape: ellipse(24, 30, 2, 5) } },
    { shape: poly([21, 27], [24, 19], [27, 27]), tone: 2, shade: 3 },
    { shape: poly([20, 41], [24, 37], [28, 41], [24, 46]), tone: 2, shade: 3 },
    { shape: mirrorX(capsule([[13, 38], [9, 42], [8, 45]], 0.7)), tone: 1, outline: false },
  ]));
}

const MAGOU_ICON = iconFrom([
  { shape: poly([11, 8], [16, 3], [15, 9], [16, 14], [11, 11]), tone: 2, shade: 3 },
  { shape: ellipse(8, 9.5, 6, 4), tone: 2, shade: 3, light: { tone: 1, shape: ellipse(7, 12, 4, 1) } },
  { shape: poly([1, 10], [7, 10], [6, 12], [2, 12]), tone: 3, outline: false },
  { shape: union(capsule([[2, 10], [0.5, 14]], 0.6), capsule([[4, 12], [3, 15.5]], 0.6)), tone: 1, outline: false },
  { pixels: px(0, [5, 7]) },
]);

export const line = [
  { id: 'lavandiere', front: lavandiereFront(), back: lavandiereBack(), icon: LAVANDIERE_ICON },
  { id: 'lavandame', front: lavandameFront(), back: lavandameBack(), icon: LAVANDAME_ICON },
  { id: 'magou', front: magouFront(), back: magouBack(), icon: MAGOU_ICON },
];
