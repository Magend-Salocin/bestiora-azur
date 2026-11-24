// Lignées du Tudgommon (050 et 051, Eau et Roche) et de la Morgann (052 et 053, Eau et Toxique).
// Fiche : docs/bestiaire-folklorique/fiches/050-tudgommon.md.
// Tones: 0 highlights, 1 stone and skin, 2 seaweed and bell, 3 ink.
import { capsule, ellipse, eyes, iconFrom, minus, mirrorX, paint, poly, px, rect, stamp, toRows, union } from '../creature-painter.js';

/** Seaweed fronds hanging from a line: [x, top, bottom] each, wavy capsules. */
const fronds = (list, r = 1.4) => union(...list.map(([x, top, bottom]) => capsule([[x, top], [x - 1, (top + bottom) / 2], [x + 1, bottom]], r)));

// ---------- 050 Tudgommon: pebble sprite wrapped in seaweed ----------
const T1 = {
  feet: union(ellipse(18.5, 44.6, 3.4, 1.6), ellipse(29.5, 44.6, 3.4, 1.6)),
  claws: mirrorX(union(ellipse(12, 37, 3.4, 3), poly([10, 34], [12, 30], [14, 34]))),
  arms: mirrorX(capsule([[16, 36], [13, 37]], 1.5)),
  body: ellipse(24, 35, 9.5, 9),
  weed: union(poly([14, 32], [16, 26], [20, 23], [28, 23], [32, 26], [34, 32], [32, 30], [30, 33], [27, 30], [24, 33], [21, 30], [18, 33], [16, 30]),
    fronds([[15.5, 30, 41], [32.5, 30, 41]], 1.3)),
  face: ellipse(24, 36, 5.5, 3.6),
};

function tudgommonFront() {
  return toRows(paint([
    { shape: T1.feet, tone: 1, shade: 2 },
    { shape: T1.arms, tone: 1, shade: 2 },
    { shape: T1.claws, tone: 1, shade: 2, light: { tone: 0, shape: union(ellipse(11, 36, 1.2, 1), ellipse(37, 36, 1.2, 1)) }, pixels: px(3, [12, 33], [36, 33]) },
    { shape: T1.body, tone: 1, shade: 2, light: { tone: 0, shape: ellipse(20, 38, 2.5, 2) }, pixels: px(2, [18, 41], [29, 40], [27, 42]) },
    { shape: T1.face, tone: 0, shade: 1, pixels: [...eyes(20, 26, 34), ...stamp(22, 38, ['3333'])] },
    { shape: T1.weed, tone: 2, shade: 3, light: { tone: 1, shape: union(poly([19, 25], [23, 24], [20, 27]), capsule([[15, 32], [15, 37]], 0.4)) } },
  ]));
}

function tudgommonBack() {
  return toRows(paint([
    { shape: T1.feet, tone: 1, shade: 2 },
    { shape: T1.claws, tone: 1, shade: 2 },
    { shape: T1.body, tone: 1, shade: 2, pixels: px(2, [18, 40], [26, 41], [30, 37]) },
    { shape: union(T1.weed, fronds([[19, 28, 42], [24, 28, 43], [29, 28, 42]], 1.3)), tone: 2, shade: 3, light: { tone: 1, shape: poly([19, 25], [23, 24], [20, 27]) } },
  ]));
}

const TUDGOMMON_ICON = iconFrom([
  { shape: mirrorX(union(ellipse(2.5, 10, 2.4, 2.2), poly([1, 8], [2.5, 5], [4, 8])), 8), tone: 1, shade: 2 },
  { shape: ellipse(8, 10.5, 5.5, 5), tone: 1, shade: 2 },
  { shape: ellipse(8, 11, 3.5, 2.5), tone: 0, shade: 1, pixels: [...px(3, [6, 10], [6, 11], [9, 10], [9, 11]), ...px(0, [6, 10], [9, 10]), ...px(3, [7, 13], [8, 13])] },
  { shape: poly([2, 9], [3.5, 5], [6, 3], [10, 3], [12.5, 5], [14, 9], [12, 8], [10, 9.5], [8, 8], [6, 9.5], [4, 8]), tone: 2, shade: 3 },
]);

// ---------- 051 Goémonroc: rock mound with a seaweed mane and big claws ----------
const T2 = {
  feet: union(ellipse(16, 44.5, 5, 2), ellipse(32, 44.5, 5, 2)),
  claws: mirrorX(union(ellipse(7, 32, 5.5, 4.5), poly([1.5, 31], [2, 21], [4, 19], [6, 29]), poly([8, 29], [10, 22], [12, 24], [12, 30]))),
  arms: mirrorX(capsule([[14, 33], [9, 32]], 3)),
  body: union(ellipse(24, 33, 13, 11.5), ellipse(24, 40, 12, 5)),
  weed: union(poly([10, 30], [11, 22], [15, 16], [20, 13], [28, 13], [33, 16], [37, 22], [38, 30], [35, 27], [33, 31], [30, 27], [27, 30], [24, 27], [21, 30], [18, 27], [15, 31], [13, 27]),
    fronds([[11.5, 26, 40], [36.5, 26, 40]], 1.6)),
  face: ellipse(24, 33, 7, 4.5),
  barnacles: union(ellipse(16, 39, 1.6, 1.4), ellipse(31, 40, 1.8, 1.5), ellipse(27, 42.5, 1.3, 1.1)),
};

function goemonrocFront() {
  return toRows(paint([
    { shape: T2.feet, tone: 1, shade: 2, pixels: px(3, [13, 46], [16, 46], [19, 46], [29, 46], [32, 46], [35, 46]) },
    { shape: T2.arms, tone: 1, shade: 2 },
    { shape: T2.claws, tone: 1, shade: 2, light: { tone: 0, shape: union(ellipse(5, 32, 2, 1.5), ellipse(43, 32, 2, 1.5), poly([2.5, 26], [3, 21], [4, 25]), poly([45.5, 26], [45, 21], [44, 25])) } },
    { shape: T2.body, tone: 1, shade: 2, light: { tone: 0, shape: ellipse(18, 37, 3, 2.5) }, pixels: px(2, [14, 35], [33, 36], [21, 42]) },
    { shape: T2.barnacles, tone: 0, shade: 1, pixels: px(3, [16, 39], [31, 40]) },
    { shape: T2.face, tone: 0, shade: 1, pixels: [...stamp(19, 30, ['333....333']), ...eyes(19, 27, 31, { height: 2 }), ...stamp(21, 35, ['3333333', '.0...0.'])] },
    { shape: T2.weed, tone: 2, shade: 3, light: { tone: 1, shape: union(poly([17, 16], [23, 14], [18, 19]), capsule([[11, 28], [11, 36]], 0.5), capsule([[37, 28], [37, 36]], 0.5)) } },
  ]));
}

function goemonrocBack() {
  return toRows(paint([
    { shape: T2.feet, tone: 1, shade: 2 },
    { shape: T2.arms, tone: 1, shade: 2 },
    { shape: T2.claws, tone: 1, shade: 2 },
    { shape: T2.body, tone: 1, shade: 2, pixels: px(2, [15, 36], [30, 34], [22, 42]) },
    { shape: T2.barnacles, tone: 0, shade: 1 },
    { shape: union(T2.weed, fronds([[17, 24, 40], [24, 24, 42], [31, 24, 40]], 1.6)), tone: 2, shade: 3, light: { tone: 1, shape: union(poly([17, 16], [23, 14], [18, 19]), capsule([[24, 28], [24, 38]], 0.5)) } },
  ]));
}

const GOEMONROC_ICON = iconFrom([
  { shape: mirrorX(union(ellipse(2, 9, 2.2, 2.4), poly([0.5, 7], [1.5, 2.5], [3.5, 6.5])), 8), tone: 1, shade: 2 },
  { shape: ellipse(8, 11, 6, 5), tone: 1, shade: 2, pixels: px(0, [4, 14], [12, 13]) },
  { shape: ellipse(8, 11, 3.8, 2.4), tone: 0, shade: 1, pixels: [...px(3, [5, 10], [6, 10], [9, 10], [10, 10]), ...px(3, [6, 13], [7, 13], [8, 13], [9, 13])] },
  { shape: poly([2, 9], [3, 4], [6, 1.5], [10, 1.5], [13, 4], [14, 9], [12, 7.5], [10, 9], [8, 7.5], [6, 9], [4, 7.5]), tone: 2, shade: 3 },
]);

// ---------- 052 Morgann: little sea fairy under a jellyfish bell ----------
const M1 = {
  tentacles: union(...[17, 21, 24, 27, 31].map((x, i) => capsule([[x, 33], [x + (i % 2 ? 1 : -1), 38], [x, 43]], 1.1))),
  body: ellipse(24, 33, 6.5, 4),
  bell: union(minus(ellipse(24, 28, 11, 10), rect(0, 30, 48, 48)), ellipse(24, 30, 11, 2)),
  frill: poly([13, 30], [15, 33], [17, 30.5], [19, 33], [21, 30.5], [24, 33], [27, 30.5], [29, 33], [31, 30.5], [33, 33], [35, 30]),
  face: ellipse(24, 27, 5.5, 4.5),
};

function morgannFront() {
  return toRows(paint([
    { shape: M1.tentacles, tone: 1, shade: 2, pixels: px(0, [16, 36], [24, 38], [32, 36]) },
    { shape: M1.body, tone: 1, shade: 2 },
    { shape: M1.bell, tone: 2, shade: 3, light: { tone: 1, shape: union(ellipse(18, 22, 3, 2), ellipse(30, 24, 1.5, 1.2)) }, pixels: px(0, [17, 21], [18, 21]) },
    { shape: M1.frill, tone: 1, shade: 2 },
    { shape: M1.face, tone: 0, shade: 1, pixels: [...eyes(21, 25, 25), ...stamp(23, 29, ['33']), ...px(1, [20, 28], [28, 28])] },
  ]));
}

function morgannBack() {
  return toRows(paint([
    { shape: M1.tentacles, tone: 1, shade: 2 },
    { shape: M1.body, tone: 1, shade: 2 },
    { shape: M1.bell, tone: 2, shade: 3, light: { tone: 1, shape: ellipse(18, 22, 3, 2) }, pixels: px(1, [20, 26], [24, 23], [28, 26], [24, 28]) },
    { shape: M1.frill, tone: 1, shade: 2 },
  ]));
}

const MORGANN_ICON = iconFrom([
  { shape: union(...[3, 6, 10, 13].map((x) => capsule([[x, 10], [x, 15]], 0.8))), tone: 1, shade: 2 },
  { shape: union(minus(ellipse(8, 8, 7, 7), rect(0, 9, 16, 16)), ellipse(8, 9, 7, 1.5)), tone: 2, shade: 3, light: { tone: 1, shape: ellipse(5, 4, 1.5, 1) } },
  { shape: ellipse(8, 8, 3.5, 3), tone: 0, shade: 1, pixels: [...px(3, [6, 7], [6, 8], [9, 7], [9, 8]), ...px(0, [6, 7], [9, 7]), ...px(3, [7, 10], [8, 10])] },
]);

// ---------- 053 Morgavague: sea fairy whose jellyfish hood trails long stinging tresses ----------
const M2 = {
  tresses: union(...[[12, 18, 44], [16, 20, 46], [32, 20, 46], [36, 18, 44]].map(([x, top, bottom]) => capsule([[x, top], [x - 2, (top + bottom) / 2], [x + 1, bottom]], 1.6))),
  tail: poly([19, 26], [29, 26], [31, 36], [28, 42], [32, 46], [24, 44], [16, 46], [20, 42], [17, 36]),
  arms: mirrorX(capsule([[19, 27], [15, 33], [17, 36]], 1.5)),
  hood: union(minus(ellipse(24, 17, 13, 13), rect(0, 20, 48, 48)), ellipse(24, 20, 13, 2.5)),
  frill: poly([11, 20], [13, 24], [15, 21], [18, 24], [21, 21], [24, 24], [27, 21], [30, 24], [33, 21], [35, 24], [37, 20]),
  face: ellipse(24, 17, 6, 5),
  shells: union(ellipse(18, 7, 2, 1.8), ellipse(24, 5.5, 2.2, 2), ellipse(30, 7, 2, 1.8)),
};

function morgavagueFront() {
  return toRows(paint([
    { shape: M2.tresses, tone: 1, shade: 2, pixels: px(0, [11, 30], [15, 34], [33, 34], [37, 30]) },
    { shape: M2.tail, tone: 2, shade: 3, light: { tone: 1, shape: poly([20, 27], [23, 27], [20, 35]) },
      pixels: px(3, [22, 30], [26, 30], [24, 33], [21, 36], [27, 36], [24, 39]) },
    { shape: M2.arms, tone: 0, shade: 1 },
    { shape: M2.hood, tone: 2, shade: 3, light: { tone: 1, shape: union(ellipse(16, 11, 3.5, 2.5), ellipse(33, 13, 1.5, 1.5)) }, pixels: px(0, [15, 10], [16, 10]) },
    { shape: M2.shells, tone: 0, shade: 1, pixels: px(3, [24, 5], [18, 7], [30, 7]) },
    { shape: M2.frill, tone: 1, shade: 2 },
    { shape: M2.face, tone: 0, shade: 1, pixels: [...eyes(20, 26, 15), ...stamp(23, 19, ['33']), ...px(2, [18, 17], [30, 17])] },
  ]));
}

function morgavagueBack() {
  return toRows(paint([
    { shape: M2.tail, tone: 2, shade: 3 },
    { shape: M2.arms, tone: 0, shade: 1 },
    { shape: union(M2.tresses, fronds([[21, 22, 42], [27, 22, 42]], 1.6)), tone: 1, shade: 2 },
    { shape: M2.hood, tone: 2, shade: 3, light: { tone: 1, shape: ellipse(16, 11, 3.5, 2.5) }, pixels: px(1, [20, 15], [24, 11], [28, 15], [24, 18]) },
    { shape: M2.shells, tone: 0, shade: 1 },
    { shape: M2.frill, tone: 1, shade: 2 },
  ]));
}

const MORGAVAGUE_ICON = iconFrom([
  { shape: union(capsule([[2, 8], [1, 15]], 1), capsule([[14, 8], [15, 15]], 1)), tone: 1, shade: 2 },
  { shape: union(minus(ellipse(8, 7, 7.5, 6.5), rect(0, 8, 16, 16)), ellipse(8, 8, 7.5, 1.5)), tone: 2, shade: 3, light: { tone: 1, shape: ellipse(4.5, 4, 1.5, 1) } },
  { shape: ellipse(8, 1.5, 1.6, 1.4), tone: 0 },
  { shape: ellipse(8, 9, 3.8, 3.5), tone: 0, shade: 1, pixels: [...px(3, [6, 8], [6, 9], [9, 8], [9, 9]), ...px(0, [6, 8], [9, 8]), ...px(3, [7, 11], [8, 11])] },
  { shape: rect(6, 13, 10, 16), tone: 2, outline: false },
]);

export const line = [
  { id: 'tudgommon', front: tudgommonFront(), back: tudgommonBack(), icon: TUDGOMMON_ICON },
  { id: 'goemonroc', front: goemonrocFront(), back: goemonrocBack(), icon: GOEMONROC_ICON },
  { id: 'morgann', front: morgannFront(), back: morgannBack(), icon: MORGANN_ICON },
  { id: 'morgavague', front: morgavagueFront(), back: morgavagueBack(), icon: MORGAVAGUE_ICON },
];
