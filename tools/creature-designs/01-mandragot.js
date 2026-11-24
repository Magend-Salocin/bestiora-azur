// Lignées du Mandragot (020 et 021, Toxique et Flore), de la Dame verte (022, Flore) et du
// Basilic (023 et 024, Toxique). Fiche : docs/bestiaire-folklorique/fiches/020-mandragot.md. Tones: 0 light, 1 mid, 2 dark, 3 ink.
import { capsule, ellipse, eyes, mirrorX, paint, poly, px, rect, stamp, toRows, union } from '../creature-painter.js';

// ---------- 020 Mandragot: screaming mandrake root ----------
const M1 = {
  leaves: union(poly([22, 20], [14, 10], [12, 14], [17, 19]), poly([24, 19], [23, 7], [27, 10], [26, 19]), poly([26, 20], [34, 11], [36, 15], [30, 20])),
  root: poly([17, 22], [31, 22], [33, 30], [31, 38], [27, 42], [21, 42], [17, 38], [15, 30]),
  legs: union(capsule([[21, 41], [18, 45]], 1.2), capsule([[27, 41], [30, 45]], 1.2)),
  arms: union(capsule([[16, 28], [11, 26], [9, 22]], 1.1), capsule([[32, 28], [37, 27], [40, 23]], 1.1)),
};

function mandragotFront() {
  return toRows(paint([
    { shape: M1.leaves, tone: 2, light: { tone: 1, shape: union(poly([15, 12], [20, 18], [16, 15]), poly([24, 9], [25, 17], [24.5, 9])) },
      pixels: px(3, [18, 15], [25, 13], [31, 15]) },
    { shape: M1.legs, tone: 1 },
    { shape: M1.arms, tone: 1, pixels: px(3, [8, 21], [10, 21], [40, 22], [41, 24]) },
    { shape: M1.root, tone: 1, shade: 2, light: { tone: 0, shape: ellipse(22, 27, 3, 2.5) }, pixels: px(2, [18, 33], [19, 36], [30, 32], [29, 36], [24, 39]) },
    // Wide-open screaming mouth.
    { pixels: [...eyes(20, 26, 26), ...px(3, [19, 25], [21, 24], [26, 24], [28, 25]), ...stamp(21, 31, ['.333.', '32223', '32223', '.333.'])] },
  ]));
}

function mandragotBack() {
  return toRows(paint([
    { shape: M1.legs, tone: 1 },
    { shape: M1.arms, tone: 1 },
    { shape: M1.root, tone: 1, shade: 2, pixels: px(2, [19, 27], [24, 26], [29, 28], [21, 33], [27, 34], [24, 38]) },
    { shape: M1.leaves, tone: 2, light: { tone: 1, shape: union(poly([15, 12], [20, 18], [16, 15]), poly([24, 9], [25, 17], [24.5, 9])) } },
  ]));
}

// ---------- 021 Mandragoul: gnarled poison mandrake ----------
const M2 = {
  leaves: union(poly([20, 14], [8, 4], [6, 9], [15, 14]), poly([23, 13], [19, 1], [24, 4], [25, 13]), poly([26, 13], [32, 2], [34, 7], [28, 14]), poly([29, 15], [41, 7], [42, 12], [33, 16])),
  berries: union(ellipse(12, 12, 1.8, 1.8), ellipse(36, 13, 1.8, 1.8), ellipse(29, 6, 1.6, 1.6)),
  root: poly([15, 15], [33, 15], [36, 24], [34, 33], [30, 39], [18, 39], [14, 33], [12, 24]),
  legs: union(capsule([[19, 38], [14, 42], [12, 45]], 1.6), capsule([[24, 39], [24, 45]], 1.4), capsule([[29, 38], [34, 42], [36, 45]], 1.6)),
  arms: union(capsule([[13, 22], [7, 24], [4, 30], [5, 34]], 1.6), capsule([[35, 22], [41, 24], [44, 30], [43, 34]], 1.6)),
  claws: union(poly([3, 33], [6, 33], [4.5, 37]), poly([42, 33], [45, 33], [43.5, 37])),
};

function mandragoulFront() {
  return toRows(paint([
    { shape: M2.leaves, tone: 2, light: { tone: 1, shape: union(poly([9, 6], [17, 13], [10, 9]), poly([39, 9], [31, 15], [38, 12])) }, pixels: px(3, [12, 9], [22, 6], [31, 7], [37, 11]) },
    { shape: M2.berries, tone: 0, pixels: px(3, [12, 12], [36, 13], [29, 6]) },
    { shape: M2.legs, tone: 1, shade: 2 },
    { shape: M2.arms, tone: 1, shade: 2 },
    { shape: M2.claws, tone: 0 },
    { shape: M2.root, tone: 1, shade: 2, pixels: [...px(2, [15, 26], [16, 30], [33, 26], [32, 30], [20, 36], [28, 36], [24, 17]), ...px(3, [14, 20], [34, 21])] },
    { pixels: [...px(3, [18, 21], [19, 22], [20, 23], [30, 21], [29, 22], [28, 23]), ...eyes(19, 27, 23, { height: 2 }), ...stamp(19, 28, ['3333333333', '3030303033', '3222222223', '3303030303', '.33333333.'])] },
  ]));
}

function mandragoulBack() {
  return toRows(paint([
    { shape: M2.legs, tone: 1, shade: 2 },
    { shape: M2.arms, tone: 1, shade: 2 },
    { shape: M2.claws, tone: 0 },
    { shape: M2.root, tone: 1, shade: 2, pixels: px(2, [17, 22], [24, 20], [31, 22], [19, 28], [29, 28], [24, 31], [21, 35], [27, 35]) },
    { shape: M2.leaves, tone: 2, light: { tone: 1, shape: union(poly([9, 6], [17, 13], [10, 9]), poly([39, 9], [31, 15], [38, 12])) } },
    { shape: M2.berries, tone: 0 },
  ]));
}

// ---------- 022 Dame verte: forest fairy ----------
const D = {
  hair: poly([16, 14], [32, 14], [35, 24], [37, 34], [34, 33], [33, 38], [30, 36], [29, 30], [19, 30], [18, 36], [15, 38], [14, 33], [11, 34], [13, 24]),
  gown: poly([19, 24], [29, 24], [32, 34], [37, 44], [33, 43], [30, 45.5], [26, 44], [24, 46], [22, 44], [18, 45.5], [15, 43], [11, 44], [16, 34]),
  arms: union(capsule([[19.5, 25], [15, 31], [16, 36]], 1.2), capsule([[28.5, 25], [33, 31], [32, 36]], 1.2)),
  hands: union(ellipse(16.5, 36.5, 1.6, 1.5), ellipse(31.5, 36.5, 1.6, 1.5)),
  head: ellipse(24, 15.5, 6, 6.5),
  wreath: poly([17, 11], [19, 7.5], [22, 9], [24, 6.5], [26, 9], [29, 7.5], [31, 11], [27, 10.5], [24, 9.5], [21, 10.5]),
};

function dameVerteFront() {
  return toRows(paint([
    { shape: D.hair, tone: 2, light: { tone: 1, shape: union(poly([14, 24], [17, 18], [17, 30]), poly([34, 24], [31, 18], [31, 30])) }, pixels: px(3, [15, 28], [33, 28], [13, 32], [35, 32]) },
    { shape: D.gown, tone: 1, shade: 2, light: { tone: 0, shape: poly([22, 26], [26, 26], [27, 36], [21, 36]) },
      pixels: [...px(2, [17, 40], [20, 42], [28, 42], [31, 40], [24, 40]), ...px(3, [21, 30], [27, 30], [19, 37], [29, 37])] },
    { shape: D.arms, tone: 0, shade: 1 },
    { shape: D.hands, tone: 0, shade: 1 },
    { shape: D.head, tone: 0, shade: 1 },
    { shape: union(D.wreath, poly([17, 11], [31, 11], [30, 14], [18, 14])), tone: 2, light: { tone: 1, shape: union(ellipse(20, 9, 1.2, 1), ellipse(28, 9, 1.2, 1)) }, pixels: px(0, [24, 7], [24, 8]) },
    { pixels: [...eyes(20, 26, 15, { height: 2 }), ...px(1, [19, 18], [29, 18]), ...px(3, [23, 19], [24, 19])] },
  ]));
}

function dameVerteBack() {
  return toRows(paint([
    { shape: D.gown, tone: 1, shade: 2, pixels: px(2, [17, 40], [20, 42], [28, 42], [31, 40], [24, 40]) },
    { shape: D.arms, tone: 0, shade: 1 },
    { shape: D.hands, tone: 0, shade: 1 },
    { shape: union(D.hair, ellipse(24, 16, 7.5, 7), poly([18, 28], [30, 28], [32, 40], [24, 42], [16, 40])), tone: 2,
      light: { tone: 1, shape: union(rect(23.5, 12, 24.5, 40), poly([18, 18], [20, 18], [18, 36]), poly([30, 18], [28, 18], [30, 36])) } },
    { shape: D.wreath, tone: 2, light: { tone: 1, shape: union(ellipse(20, 9, 1.2, 1), ellipse(28, 9, 1.2, 1)) }, pixels: px(0, [24, 7], [24, 8]) },
  ]));
}

// ---------- 023 Basilin: hatchling basilisk ----------
const B1 = {
  coil: union(ellipse(24, 40, 12, 5), capsule([[32, 38], [36, 33], [33, 28], [28, 26]], 3.2)),
  tail: capsule([[13, 41], [8, 40], [6, 37]], 1.4),
  wings: mirrorX(poly([20, 30], [13, 25], [12, 30], [15, 33])),
  head: ellipse(24, 23, 6.5, 5.5),
  crest: poly([20, 19], [19, 13], [22, 16], [24, 11], [26, 16], [29, 13], [28, 19]),
  beak: poly([22, 25], [26, 25], [24, 29]),
  wattle: ellipse(24, 30, 1.4, 1.6),
};

function basilinFront() {
  return toRows(paint([
    { shape: B1.tail, tone: 1, shade: 2 },
    { shape: B1.coil, tone: 1, shade: 2, light: { tone: 0, shape: union(rect(16, 40, 32, 41), ellipse(33, 33, 1, 3)) }, pixels: px(2, [14, 39], [18, 37], [30, 37], [34, 40], [35, 30]) },
    { shape: B1.wings, tone: 2, shade: 3, pixels: px(1, [15, 28], [33, 28]) },
    { shape: B1.crest, tone: 2, light: { tone: 1, shape: poly([22, 16], [24, 12], [25, 16]) } },
    { shape: B1.head, tone: 1, shade: 2 },
    { shape: B1.wattle, tone: 2 },
    { shape: B1.beak, tone: 0, shade: 1 },
    { pixels: [...eyes(20, 26, 21), ...px(3, [19, 20], [20, 20], [27, 20], [28, 20])] },
  ]));
}

function basilinBack() {
  return toRows(paint([
    { shape: B1.coil, tone: 1, shade: 2, pixels: px(2, [14, 39], [18, 37], [30, 37], [34, 40], [35, 30], [22, 40], [26, 40]) },
    { shape: B1.tail, tone: 1, shade: 2 },
    { shape: B1.head, tone: 1, shade: 2 },
    { shape: B1.wings, tone: 2, shade: 3 },
    { shape: B1.crest, tone: 2, light: { tone: 1, shape: poly([22, 16], [24, 12], [25, 16]) } },
  ]));
}

// ---------- 024 Basilic: cockerel-serpent ----------
const B2 = {
  coil: union(ellipse(24, 41, 18, 5.5), capsule([[38, 39], [42, 31], [38, 24], [31, 21]], 4.2)),
  tail: capsule([[8, 42], [3, 39], [2, 33], [5, 30]], 1.8),
  tailBarb: poly([3, 31], [7, 27], [7, 32]),
  wings: mirrorX(poly([19, 24], [7, 13], [3, 15], [5, 21], [3, 25], [8, 30], [17, 31])),
  head: ellipse(24, 18, 7.5, 6.5),
  crest: poly([18, 14], [16, 5], [20, 9], [22, 2], [25, 8], [28, 2], [29, 9], [33, 5], [31, 14]),
  beak: poly([21, 21], [27, 21], [24, 27]),
  wattle: ellipse(24, 28.5, 2, 2.4),
};

function basilicFront() {
  return toRows(paint([
    { shape: B2.tail, tone: 1, shade: 2 },
    { shape: B2.tailBarb, tone: 0, shade: 1 },
    { shape: B2.coil, tone: 1, shade: 2, light: { tone: 0, shape: rect(10, 41, 38, 42) }, pixels: px(2, [10, 39], [15, 37], [20, 36], [28, 36], [33, 37], [38, 38], [41, 34], [40, 28]) },
    { shape: B2.wings, tone: 2, shade: 3, light: { tone: 1, shape: union(poly([6, 16], [16, 24], [6, 20]), poly([42, 16], [32, 24], [42, 20])) }, pixels: px(3, [5, 22], [7, 26], [43, 22], [41, 26]) },
    { shape: B2.crest, tone: 2, light: { tone: 1, shape: union(poly([20, 9], [22, 4], [23, 9]), poly([26, 9], [28, 4], [28.5, 9])) } },
    { shape: B2.head, tone: 1, shade: 2 },
    { shape: B2.wattle, tone: 2, shade: 3 },
    { shape: B2.beak, tone: 0, shade: 1, pixels: px(3, [22, 23], [23, 23], [24, 23], [25, 23], [26, 23]) },
    // Petrifying glare: pale irises ringed with ink.
    { pixels: [...stamp(18, 15, ['3333..3333', '3003..3003', '3333..3333']), ...px(3, [17, 14], [18, 13], [30, 14], [29, 13])] },
  ]));
}

function basilicBack() {
  return toRows(paint([
    { shape: B2.coil, tone: 1, shade: 2, pixels: px(2, [10, 39], [15, 37], [20, 36], [28, 36], [33, 37], [38, 38], [41, 34], [40, 28], [24, 40]) },
    { shape: B2.tail, tone: 1, shade: 2 },
    { shape: B2.tailBarb, tone: 0, shade: 1 },
    { shape: B2.head, tone: 1, shade: 2 },
    { shape: B2.wings, tone: 2, shade: 3, light: { tone: 1, shape: union(poly([6, 16], [16, 24], [6, 20]), poly([42, 16], [32, 24], [42, 20])) } },
    { shape: B2.crest, tone: 2, light: { tone: 1, shape: union(poly([20, 9], [22, 4], [23, 9]), poly([26, 9], [28, 4], [28.5, 9])) } },
  ]));
}

const MANDRAGOT_ICON = [
  '...3...3...3....',
  '..323.323.323...',
  '..3223222322 3..',
  '...3322222233...',
  '....31111113....',
  '...3130113013...',
  '.3.3133113313.3.',
  '313311300311 313',
  '.33.31322313.33.',
  '....31322313....',
  '....31133113....',
  '....31111113....',
  '.....311113.....',
  '....3.3333.3....',
  '...33......33...',
  '................',
].map((row) => row.replace(/ /g, '').slice(0, 16).padEnd(16, '.'));

const MANDRAGOUL_ICON = [
  '33..3...3...3.33',
  '3233323.32 32323',
  '.32232223222 23.',
  '..333222222333..',
  '..311111111113..',
  '.3133013310331 3',
  '31130303303031 3',
  '3113222222223113',
  '3013303030333103',
  '.3.3111111113.3.',
  '...3111111113...',
  '....31111113....',
  '...3.333333.3...',
  '..3...3..3...3..',
  '.33..33..33..33.',
  '................',
].map((row) => row.replace(/ /g, '').slice(0, 16).padEnd(16, '.'));

const DAME_VERTE_ICON = [
  '....3.3..3.3....',
  '...3232332323...',
  '..32233333322 3.',
  '..322300003223..',
  '.3223030030322 3',
  '.32230000003223.',
  '.322230330322 23',
  '.3222300003222 3',
  '..3223111132 23.',
  '..3233100133323.',
  '...3311001133...',
  '...3111001113...',
  '..311111111113..',
  '.31121111112113.',
  '.33333333333333.',
  '................',
].map((row) => row.replace(/ /g, '').slice(0, 16).padEnd(16, '.'));

const BASILIN_ICON = [
  '................',
  '......3.3.3.....',
  '.....3232323....',
  '.....32222223...',
  '....3111111113..',
  '.33.3303113033 .',
  '3223310303 0133.',
  '3222331000 133..',
  '.3223310013.33..',
  '..33.312213311 3',
  '....31111111111 3',
  '...311111111111 3',
  '.33111111111113.',
  '3113333333333 3.',
  '.33.............',
  '................',
].map((row) => row.replace(/ /g, '').slice(0, 16).padEnd(16, '.'));

const BASILIC_ICON = [
  '..3.3..3..3.3...',
  '.32323323323 23.',
  '..3222222222 3..',
  '.333111111111333',
  '3223303113033223',
  '3222300000032223',
  '.322331000133223',
  '..3223310013223.',
  '...333312213333.',
  '..3111111111111 3',
  '.31111111111111 3',
  '3311333333333113',
  '3113111111111113',
  '.33300000000003.',
  '...33333333333..',
  '................',
].map((row) => row.replace(/ /g, '').slice(0, 16).padEnd(16, '.'));

export const line = [
  { id: 'morillon', front: mandragotFront(), back: mandragotBack(), icon: MANDRAGOT_ICON },
  { id: 'morillard', front: mandragoulFront(), back: mandragoulBack(), icon: MANDRAGOUL_ICON },
  { id: 'glandor', front: dameVerteFront(), back: dameVerteBack(), icon: DAME_VERTE_ICON },
  { id: 'venimot', front: basilinFront(), back: basilinBack(), icon: BASILIN_ICON },
  { id: 'venimorde', front: basilicFront(), back: basilicBack(), icon: BASILIC_ICON },
];
