// Lignées du Lébérou (070 à 072, Feu, Ombre au stade 3) et du Gobelin (073 et 074, Métal et Foudre).
// Fiche : docs/bestiaire-folklorique/fiches/070-leberou.md.
// Tones: 0 embers, eyes and sparks, 1 light fur and metal, 2 dark fur and rust, 3 ink.
import { capsule, ellipse, iconFrom, mirrorX, paint, poly, px, rect, stamp, toRows, union } from '../creature-painter.js';

/** Flame tongues rising from a base line: [x, base, height, half width] each. */
const flames = (list) => union(...list.map(([x, base, height, half]) => poly([x - half, base], [x - half * 0.4, base - height * 0.6], [x + half * 0.3, base - height], [x + half * 0.2, base - height * 0.5], [x + half, base])));
const glowEyes = (lx, rx, y) => stamp(lx, y, [`00${'.'.repeat(rx - lx - 2)}00`, `03${'.'.repeat(rx - lx - 2)}03`]);
const smoke = (x, y) => stamp(x, y, ['.22.', '2..2', '..2.', '.2..']);
const bolt = (x, y) => stamp(x, y, ['..33', '.303', '303.', '3033', '.030', '..3.']);

// ---------- 070 Lébérou: ember pup with a smoking tail ----------
const L1 = {
  tail: capsule([[30, 41], [36, 39], [38, 34]], 2.2),
  feet: union(ellipse(19.5, 44.6, 3, 1.5), ellipse(28.5, 44.6, 3, 1.5)),
  body: ellipse(24, 38, 7.5, 6.5),
  ears: mirrorX(poly([17.5, 24], [13, 26], [13, 33], [17, 31])),
  head: ellipse(24, 27.5, 7.5, 6.5),
  tuft: flames([[20.5, 23, 7, 2.2], [24, 23, 10, 2.5], [27.5, 23, 7, 2.2]]),
  muzzle: ellipse(24, 31, 3.6, 2.4),
};

function leberouFront() {
  return toRows(paint([
    { shape: L1.tail, tone: 2, shade: 3 },
    { shape: L1.feet, tone: 2, shade: 3 },
    { shape: L1.body, tone: 2, shade: 3, light: { tone: 1, shape: ellipse(24, 39.5, 4, 3.5) }, pixels: px(0, [19, 36], [29, 38]) },
    { shape: L1.tuft, tone: 1, shade: 2, light: { tone: 0, shape: ellipse(24, 18, 1.2, 3) } },
    { shape: L1.ears, tone: 2, shade: 3 },
    { shape: L1.head, tone: 2, shade: 3, light: { tone: 1, shape: ellipse(24, 29.5, 5, 3) }, pixels: px(0, [18, 25], [30, 24]) },
    { shape: L1.muzzle, tone: 1, shade: 2, pixels: [...px(3, [23, 30], [24, 30]), ...stamp(22, 32, ['3..3', '.33.'])] },
    { pixels: [...glowEyes(19, 27, 26), ...smoke(37, 28)] },
  ]));
}

function leberouBack() {
  return toRows(paint([
    { shape: L1.feet, tone: 2, shade: 3 },
    { shape: L1.body, tone: 2, shade: 3, pixels: px(0, [20, 36], [27, 39]) },
    { shape: capsule([[24, 42], [30, 44], [35, 41], [36, 36]], 2.2), tone: 2, shade: 3 },
    { shape: L1.ears, tone: 2, shade: 3 },
    { shape: L1.head, tone: 2, shade: 3, pixels: px(0, [21, 26], [27, 29]) },
    { shape: L1.tuft, tone: 1, shade: 2, light: { tone: 0, shape: ellipse(24, 18, 1.2, 3) } },
    { pixels: smoke(35, 30) },
  ]));
}

const LEBEROU_ICON = iconFrom([
  { shape: flames([[6, 5, 4, 1.6], [8, 5, 5, 1.8], [10, 5, 4, 1.6]]), tone: 1, shade: 2 },
  { shape: mirrorX(poly([3.5, 6], [0.5, 8], [0.5, 13], [3, 11]), 8), tone: 2, shade: 3 },
  { shape: ellipse(8, 9.5, 5, 4.5), tone: 2, shade: 3, light: { tone: 1, shape: ellipse(8, 11.5, 3, 2) } },
  { shape: ellipse(8, 12, 2.4, 1.6), tone: 1, pixels: [...px(3, [7, 11], [8, 11]), ...px(3, [7, 13], [8, 13])] },
  { pixels: stamp(4, 8, ['00....00', '03....03']) },
]);

// ---------- 071 Lébérouge: great hound with a mane of flames ----------
const L2 = {
  tail: capsule([[33, 38], [40, 36], [43, 30]], 2.6),
  tailFire: flames([[43, 30, 6, 2.4]]),
  legs: union(capsule([[16, 37], [16, 43]], 2.8), capsule([[32, 37], [32, 43]], 2.8)),
  paws: union(ellipse(15.5, 44.4, 3.8, 1.8), ellipse(32.5, 44.4, 3.8, 1.8)),
  body: ellipse(24, 33, 11, 8.5),
  mane: flames([[9, 33, 12, 3], [13, 30, 14, 3], [17, 28, 13, 3], [24, 26, 15, 3], [31, 28, 13, 3], [35, 30, 14, 3], [39, 33, 12, 3]]),
  ears: mirrorX(poly([17.5, 15], [12, 17], [12, 25], [16.5, 22])),
  head: ellipse(24, 19, 7.5, 6.5),
  muzzle: poly([20, 20], [28, 20], [27, 26], [21, 26]),
};

function leberougeFront() {
  return toRows(paint([
    { shape: L2.tail, tone: 2, shade: 3 },
    { shape: L2.tailFire, tone: 1, shade: 2, light: { tone: 0, shape: ellipse(43, 28, 1, 2) } },
    { shape: L2.legs, tone: 2, shade: 3 },
    { shape: L2.paws, tone: 2, shade: 3, pixels: px(3, [13, 45], [15, 45], [31, 45], [33, 45]) },
    { shape: L2.body, tone: 2, shade: 3, light: { tone: 1, shape: ellipse(24, 36, 5, 4) }, pixels: px(0, [16, 34], [31, 35], [20, 39]) },
    { shape: L2.mane, tone: 1, shade: 2, light: { tone: 0, shape: union(ellipse(9, 27, 1, 3), ellipse(13, 23, 1, 3.5), ellipse(35, 23, 1, 3.5), ellipse(39, 27, 1, 3)) } },
    { shape: L2.ears, tone: 2, shade: 3 },
    { shape: L2.head, tone: 2, shade: 3 },
    { shape: L2.muzzle, tone: 1, shade: 2, pixels: [...stamp(23, 20, ['33', '33']), ...stamp(21, 23, ['333333', '0.00.0', '.3333.'])] },
    { pixels: glowEyes(19, 27, 17) },
  ]));
}

function leberougeBack() {
  return toRows(paint([
    { shape: L2.legs, tone: 2, shade: 3 },
    { shape: L2.paws, tone: 2, shade: 3 },
    { shape: L2.body, tone: 2, shade: 3, pixels: px(0, [18, 33], [29, 36], [24, 38]) },
    { shape: capsule([[24, 40], [32, 43], [40, 40], [42, 34]], 2.6), tone: 2, shade: 3 },
    { shape: flames([[42, 34, 6, 2.4]]), tone: 1, shade: 2 },
    { shape: L2.ears, tone: 2, shade: 3 },
    { shape: L2.head, tone: 2, shade: 3 },
    { shape: union(L2.mane, flames([[24, 34, 14, 4]])), tone: 1, shade: 2, light: { tone: 0, shape: union(ellipse(16, 21, 1, 3), ellipse(24, 16, 1.2, 3), ellipse(32, 21, 1, 3), ellipse(24, 27, 1.2, 3)) } },
  ]));
}

const LEBEROUGE_ICON = iconFrom([
  { shape: flames([[2, 10, 6, 2], [5, 7, 7, 2], [8, 6, 6, 2], [11, 7, 7, 2], [14, 10, 6, 2]]), tone: 1, shade: 2 },
  { shape: mirrorX(poly([3.5, 5], [0.5, 7], [0.5, 12], [3, 10]), 8), tone: 2, shade: 3 },
  { shape: ellipse(8, 8.5, 5, 4.5), tone: 2, shade: 3 },
  { shape: poly([5, 9], [11, 9], [10.5, 14], [5.5, 14]), tone: 1, shade: 2, pixels: [...px(3, [7, 9], [8, 9]), ...stamp(5, 11, ['333333', '.0..0.'])] },
  { pixels: stamp(4, 7, ['00....00']) },
]);

// ---------- 072 Lébérombre: shadow beast dissolving into smoke, eyes like coals ----------
const L3 = {
  smoke: union(ellipse(11, 40, 6, 3.5), ellipse(18, 43.5, 6, 3), ellipse(30, 43.5, 6, 3), ellipse(37, 40, 6, 3.5), ellipse(24, 45, 7, 2.5), ellipse(5, 36, 3, 2), ellipse(43, 36, 3, 2)),
  paws: union(capsule([[18, 30], [17, 37]], 2.4), capsule([[30, 30], [31, 37]], 2.4)),
  claws: union(ellipse(17, 38, 3.2, 2), ellipse(31, 38, 3.2, 2)),
  body: poly([13, 20], [35, 20], [37, 29], [32, 37], [24, 41], [16, 37], [11, 29]),
  mane: flames([[9, 26, 10, 3], [13, 20, 12, 3], [18, 15, 12, 3], [24, 13, 13, 3.2], [30, 15, 12, 3], [35, 20, 12, 3], [39, 26, 10, 3]]),
  ears: mirrorX(poly([17.5, 9], [11, 10], [12, 18], [17, 15])),
  head: ellipse(24, 14, 8, 7),
  jaw: poly([19, 16], [29, 16], [28, 23], [20, 23]),
};
const manePixels = px(0, [13, 13], [18, 8], [24, 4], [30, 8], [35, 13]);

function leberombreFront() {
  return toRows(paint([
    { shape: L3.smoke, tone: 2, shade: 3, light: { tone: 1, shape: union(ellipse(10, 38.5, 2.5, 1), ellipse(38, 38.5, 2.5, 1), ellipse(18, 42, 2, 0.8), ellipse(30, 42, 2, 0.8)) } },
    { shape: L3.mane, tone: 1, shade: 2, pixels: manePixels },
    { shape: L3.body, tone: 3, outline: false, light: { tone: 2, shape: poly([19, 24], [29, 24], [27, 33], [21, 33]) }, pixels: px(0, [16, 27], [32, 29], [24, 37]) },
    { shape: L3.paws, tone: 3, outline: false },
    { shape: L3.claws, tone: 2, shade: 3, pixels: [...stamp(15, 39, ['0.0.0']), ...stamp(29, 39, ['0.0.0'])] },
    { shape: L3.ears, tone: 3, outline: false },
    { shape: L3.head, tone: 3, outline: false },
    { shape: L3.jaw, tone: 2, shade: 3, pixels: [...stamp(20, 19, ['000000000']), ...stamp(21, 21, ['0.0.0.0'])] },
    { pixels: [...glowEyes(18, 27, 12), ...px(0, [20, 12], [29, 12])] },
  ]));
}

function leberombreBack() {
  return toRows(paint([
    { shape: L3.smoke, tone: 2, shade: 3 },
    { shape: L3.paws, tone: 3, outline: false },
    { shape: L3.body, tone: 3, outline: false, pixels: px(2, [20, 26], [27, 30], [23, 35]) },
    { shape: L3.ears, tone: 3, outline: false },
    { shape: L3.head, tone: 3, outline: false },
    { shape: union(L3.mane, flames([[24, 32, 16, 6]])), tone: 1, shade: 2, pixels: [...manePixels, ...px(0, [24, 22])] },
  ]));
}

const LEBEROMBRE_ICON = iconFrom([
  { shape: flames([[1, 11, 7, 2], [4, 7, 7, 2], [8, 5, 6, 2], [12, 7, 7, 2], [15, 11, 7, 2]]), tone: 1, shade: 2 },
  { shape: union(ellipse(8, 9, 5.5, 5), poly([3, 12], [13, 12], [12, 16], [4, 16])), tone: 3, outline: false },
  { shape: poly([5.5, 11], [10.5, 11], [10, 14], [6, 14]), tone: 2, pixels: stamp(6, 12, ['00000']) },
  { pixels: stamp(4, 8, ['00....00', '03....03']) },
]);

// ---------- 073 Gobelinet: rusty round imp crackling with sparks ----------
const G1 = {
  feet: union(ellipse(19.5, 44.6, 3, 1.5), ellipse(28.5, 44.6, 3, 1.5)),
  tail: capsule([[30, 40], [36, 41], [38, 37]], 1),
  body: ellipse(24, 34.5, 9, 8.5),
  arms: mirrorX(capsule([[15.5, 34], [12, 37]], 1.6)),
  hands: mirrorX(ellipse(11.5, 38, 2.2, 2)),
  horn: poly([22, 27], [24, 18], [26, 27]),
  rivets: px(3, [17, 31], [31, 31], [17, 38], [31, 38]),
};

function gobelinetFront() {
  return toRows(paint([
    { shape: G1.tail, tone: 2, shade: 3 },
    { shape: G1.feet, tone: 2, shade: 3 },
    { shape: G1.arms, tone: 1, shade: 2 },
    { shape: G1.hands, tone: 1, shade: 2 },
    { shape: G1.horn, tone: 1, shade: 2, light: { tone: 0, shape: poly([23, 25], [24, 20], [24, 25]) } },
    { shape: G1.body, tone: 1, shade: 2, light: { tone: 0, shape: ellipse(20, 30, 2.5, 1.8) }, pixels: [...G1.rivets, ...px(2, [29, 34], [30, 35], [19, 40], [27, 41])] },
    { pixels: [...stamp(19, 31, ['000...000', '033...330']), ...stamp(19, 36, ['333333333', '303030303', '.3333333.']), ...bolt(38, 30), ...bolt(6, 26)] },
  ]));
}

function gobelinetBack() {
  return toRows(paint([
    { shape: G1.feet, tone: 2, shade: 3 },
    { shape: G1.arms, tone: 1, shade: 2 },
    { shape: G1.hands, tone: 1, shade: 2 },
    { shape: G1.horn, tone: 1, shade: 2 },
    { shape: G1.body, tone: 1, shade: 2, pixels: [...px(3, [24, 30], [24, 34], [24, 38]), ...px(2, [19, 32], [28, 37], [21, 40])] },
    { shape: capsule([[24, 41], [18, 43], [13, 41]], 1), tone: 2, shade: 3 },
    { pixels: bolt(8, 34) },
  ]));
}

const GOBELINET_ICON = iconFrom([
  { shape: poly([6.5, 5], [8, 0], [9.5, 5]), tone: 1, shade: 2 },
  { shape: ellipse(8, 9.5, 6, 5.5), tone: 1, shade: 2, pixels: [...stamp(4, 7, ['000..000', '033..330']), ...stamp(4, 11, ['33333333', '30303030', '.333333.'])] },
  { pixels: [...px(3, [14, 2], [15, 3], [14, 4]), ...px(0, [15, 2])] },
]);

// ---------- 074 Gobelin: hunched rust goblin, long arms and a crackling horn ----------
const G2 = {
  legs: union(capsule([[19, 37], [18, 43]], 2.6), capsule([[29, 37], [30, 43]], 2.6)),
  feet: union(ellipse(17, 44.6, 4, 1.6), ellipse(31, 44.6, 4, 1.6)),
  arms: mirrorX(capsule([[15, 22], [9, 30], [8, 37]], 2.6)),
  hands: mirrorX(union(ellipse(8, 39, 4, 3.2), capsule([[5, 40], [4, 43]], 1), capsule([[8, 41], [8, 44]], 1))),
  body: ellipse(24, 29, 10, 10),
  plate: poly([17, 24], [31, 24], [30, 33], [18, 33]),
  horn: poly([21, 10], [24, 0], [27, 10]),
  head: ellipse(24, 15, 8, 7),
};

function gobelinFront() {
  return toRows(paint([
    { shape: G2.legs, tone: 2, shade: 3 },
    { shape: G2.feet, tone: 2, shade: 3 },
    { shape: G2.arms, tone: 1, shade: 2 },
    { shape: G2.hands, tone: 1, shade: 2, pixels: px(3, [5, 37], [8, 37], [11, 37], [37, 37], [40, 37], [43, 37]) },
    { shape: G2.body, tone: 2, shade: 3, light: { tone: 1, shape: ellipse(20, 24, 3, 2) } },
    { shape: G2.plate, tone: 1, shade: 2, light: { tone: 0, shape: rect(18, 25, 22, 26) }, pixels: [...px(3, [18, 25], [30, 25], [18, 32], [30, 32]), ...px(2, [25, 28], [27, 30])] },
    { shape: G2.horn, tone: 1, shade: 2, light: { tone: 0, shape: poly([23, 8], [24, 3], [24, 8]) } },
    { shape: G2.head, tone: 1, shade: 2, light: { tone: 0, shape: ellipse(20, 11, 2, 1.2) }, pixels: px(2, [29, 12], [30, 13], [18, 17]) },
    { pixels: [...stamp(18, 12, ['3333..3333', '.003..300.']), ...stamp(18, 17, ['3333333333', '3030303033', '.33333333.']), ...bolt(28, 0), ...bolt(16, 1), ...bolt(41, 18)] },
  ]));
}

function gobelinBack() {
  return toRows(paint([
    { shape: G2.legs, tone: 2, shade: 3 },
    { shape: G2.feet, tone: 2, shade: 3 },
    { shape: G2.arms, tone: 1, shade: 2 },
    { shape: G2.hands, tone: 1, shade: 2 },
    { shape: G2.body, tone: 2, shade: 3, pixels: [...px(1, [19, 24], [28, 30], [22, 34]), ...px(3, [24, 22], [24, 27], [24, 32])] },
    { shape: G2.horn, tone: 1, shade: 2 },
    { shape: G2.head, tone: 1, shade: 2, pixels: px(2, [21, 13], [27, 16], [24, 19]) },
    { pixels: [...bolt(28, 0), ...bolt(16, 1)] },
  ]));
}

const GOBELIN_ICON = iconFrom([
  { shape: poly([6.5, 4], [8, 0], [9.5, 4]), tone: 1, shade: 2 },
  { shape: ellipse(8, 8, 5.5, 4.5), tone: 1, shade: 2, pixels: [...stamp(4, 6, ['333..333', '.03..30.']), ...stamp(4, 10, ['33333333', '30303030'])] },
  { shape: poly([3, 13], [13, 13], [12, 16], [4, 16]), tone: 2, shade: 3 },
  { pixels: [...px(3, [12, 0], [13, 1], [12, 2]), ...px(0, [13, 0])] },
]);

export const line = [
  { id: 'leberou', front: leberouFront(), back: leberouBack(), icon: LEBEROU_ICON },
  { id: 'leberouge', front: leberougeFront(), back: leberougeBack(), icon: LEBEROUGE_ICON },
  { id: 'leberombre', front: leberombreFront(), back: leberombreBack(), icon: LEBEROMBRE_ICON },
  { id: 'gobelinet', front: gobelinetFront(), back: gobelinetBack(), icon: GOBELINET_ICON },
  { id: 'gobelin', front: gobelinFront(), back: gobelinBack(), icon: GOBELIN_ICON },
];
