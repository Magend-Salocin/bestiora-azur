// Lignées de la Hada (025 à 027, Arcane, Vent au stade 3) et du Faramin (028 et 029, Normal).
// Fiches : docs/bestiaire-folklorique/fiches/025-hada.md et 028-faramin.md.
// Tones: 0 glow/face, 1 mid, 2 dark, 3 ink.
import { capsule, ellipse, eyes, mirrorX, paint, poly, px, rect, stamp, toRows, union } from '../creature-painter.js';

const sparkle = (x, y, tone = 2) => px(tone, [x, y - 1], [x - 1, y], [x, y], [x + 1, y], [x, y + 1]);

// ---------- 025 Hada: tiny light fairy of the Pyrenees ----------
const H1 = {
  wings: mirrorX(union(ellipse(17, 26, 5.5, 3.2), ellipse(18, 31.5, 4, 2.4))),
  dress: poly([20, 32], [28, 32], [31, 40], [27, 39], [24, 41], [21, 39], [17, 40]),
  body: ellipse(24, 30, 3.2, 3),
  arms: union(capsule([[21.5, 30], [18.5, 33]], 0.9), capsule([[26.5, 30], [30, 27], [31, 24]], 0.9)),
  legs: union(capsule([[22.5, 40], [22, 43]], 0.8), capsule([[25.5, 40], [26, 43]], 0.8)),
  orb: ellipse(31.5, 21.5, 2.6, 2.6),
  head: ellipse(24, 23.5, 5, 4.8),
  hat: poly([18.5, 21.5], [29.5, 21.5], [27, 18], [24, 16.5], [21, 18]),
  stem: capsule([[24, 16.5], [26, 13.5]], 0.6),
};

function hadaFront() {
  return toRows(paint([
    { shape: H1.wings, tone: 0, shade: 1, pixels: px(1, [14, 26], [16, 25], [32, 26], [34, 25]) },
    { shape: H1.legs, tone: 0 },
    { shape: H1.dress, tone: 1, shade: 2, light: { tone: 0, shape: poly([22, 33], [26, 33], [25, 37], [23, 37]) } },
    { shape: H1.body, tone: 1 },
    { shape: H1.arms, tone: 0 },
    { shape: H1.orb, tone: 0, pixels: [...sparkle(31, 17), ...sparkle(36, 22), ...px(1, [31, 21])] },
    { shape: H1.head, tone: 0, shade: 1 },
    { shape: union(H1.hat, H1.stem), tone: 2, light: { tone: 1, shape: poly([20, 20.5], [23, 18], [23, 20.5]) } },
    { pixels: [...eyes(21, 25, 23, { height: 2 }), ...px(3, [23, 26], [24, 26]), ...sparkle(12, 36), ...sparkle(16, 16)] },
  ]));
}

function hadaBack() {
  return toRows(paint([
    { shape: H1.legs, tone: 0 },
    { shape: H1.dress, tone: 1, shade: 2 },
    { shape: H1.arms, tone: 0 },
    { shape: H1.orb, tone: 0 },
    { shape: H1.head, tone: 1, shade: 2 },
    { shape: union(H1.hat, H1.stem, ellipse(24, 21, 5, 2.5)), tone: 2, light: { tone: 1, shape: poly([20, 20.5], [23, 18], [23, 20.5]) } },
    { shape: H1.wings, tone: 0, shade: 1, pixels: px(1, [17, 26], [18, 30], [31, 26], [30, 30], [24, 28]) },
    { pixels: [...sparkle(12, 36), ...sparkle(36, 34)] },
  ]));
}

// ---------- 026 Hadalune: moon fairy ----------
const H2 = {
  wings: mirrorX(union(ellipse(15, 22, 8, 4.2), ellipse(16, 30, 6, 3))),
  dress: poly([20, 27], [28, 27], [33, 43], [29, 42], [26.5, 44.5], [24, 42.5], [21.5, 44.5], [19, 42], [15, 43]),
  arms: union(capsule([[21, 25], [17, 29], [16, 33]], 1), capsule([[27, 25], [31, 29], [32, 33]], 1)),
  hands: union(ellipse(16, 33.5, 1.4, 1.4), ellipse(32, 33.5, 1.4, 1.4)),
  hair: poly([18, 14], [30, 14], [31.5, 22], [30, 28], [27, 24], [21, 24], [18, 28], [16.5, 22]),
  head: ellipse(24, 17.5, 5, 5.2),
  moon: union(ellipse(24, 8.5, 4.5, 4.5)),
  moonCut: ellipse(26, 7.5, 3.6, 3.6),
};

function hadaluneFront() {
  return toRows(paint([
    { shape: H2.wings, tone: 0, shade: 1, pixels: px(1, [10, 21], [13, 20], [38, 21], [35, 20], [12, 30], [36, 30]) },
    { shape: H2.dress, tone: 1, shade: 2, light: { tone: 0, shape: poly([22, 28], [26, 28], [27, 38], [21, 38]) },
      pixels: [...sparkle(20, 38, 0), ...sparkle(28, 36, 0)] },
    { shape: H2.arms, tone: 0, shade: 1 },
    { shape: H2.hands, tone: 0, shade: 1 },
    { shape: H2.hair, tone: 2, light: { tone: 1, shape: union(poly([18, 18], [20, 16], [19, 26]), poly([30, 18], [28, 16], [29, 26])) } },
    { shape: H2.head, tone: 0, shade: 1 },
    // Crescent moon floating over the head.
    { shape: (x, y) => H2.moon(x, y) && !H2.moonCut(x, y), tone: 0, shade: 1 },
    { pixels: [...stamp(19, 13, ['3333333333']), ...eyes(21, 25, 16, { height: 2 }), ...px(3, [23, 20], [24, 20]), ...sparkle(10, 12), ...sparkle(39, 9)] },
  ]));
}

function hadaluneBack() {
  return toRows(paint([
    { shape: H2.dress, tone: 1, shade: 2 },
    { shape: H2.arms, tone: 0, shade: 1 },
    { shape: H2.hands, tone: 0, shade: 1 },
    { shape: union(H2.hair, H2.head, poly([19, 20], [29, 20], [30, 33], [24, 35], [18, 33])), tone: 2, light: { tone: 1, shape: union(rect(23.5, 14, 24.5, 33), poly([19, 18], [21, 17], [19, 30]), poly([29, 18], [27, 17], [29, 30])) } },
    { shape: (x, y) => H2.moon(x, y) && !H2.moonCut(x, y), tone: 0, shade: 1 },
    { shape: H2.wings, tone: 0, shade: 1, pixels: px(1, [12, 22], [15, 24], [36, 22], [33, 24], [14, 30], [34, 30]) },
  ]));
}

// ---------- 027 Hadélys: aurora fairy ----------
const H3 = {
  veils: mirrorX(poly([20, 18], [10, 6], [3, 8], [6, 14], [1, 20], [7, 24], [2, 31], [9, 33], [6, 40], [14, 38], [19, 30])),
  dress: poly([20, 25], [28, 25], [32, 37], [36, 46], [31, 44], [27, 46.5], [24, 44.5], [21, 46.5], [17, 44], [12, 46], [16, 37]),
  arms: union(capsule([[21, 23], [16, 19], [13, 15]], 1), capsule([[27, 23], [32, 19], [35, 15]], 1)),
  hands: union(ellipse(12.6, 14.4, 1.5, 1.5), ellipse(35.4, 14.4, 1.5, 1.5)),
  hair: poly([18.5, 10], [29.5, 10], [31, 18], [29, 25], [19, 25], [17, 18]),
  head: ellipse(24, 13.5, 5, 5.2),
  lily: poly([19, 7], [20, 2.5], [22.5, 5.5], [24, 0.5], [25.5, 5.5], [28, 2.5], [29, 7]),
};

function hadelysFront() {
  return toRows(paint([
    // Ribbons of light like an aurora.
    { shape: H3.veils, tone: 1, shade: 2, light: { tone: 0, shape: union(poly([18, 18], [10, 9], [8, 11], [16, 21]), poly([30, 18], [38, 9], [40, 11], [32, 21]), poly([17, 27], [6, 22], [8, 26]), poly([31, 27], [42, 22], [40, 26])) } },
    { shape: H3.dress, tone: 1, shade: 2, light: { tone: 0, shape: poly([22, 26], [26, 26], [28, 40], [20, 40]) }, pixels: [...sparkle(19, 41, 0), ...sparkle(29, 39, 0), ...sparkle(24, 35, 1)] },
    { shape: H3.arms, tone: 0, shade: 1 },
    { shape: H3.hands, tone: 0, shade: 1, pixels: [...sparkle(10, 11), ...sparkle(38, 11)] },
    { shape: H3.hair, tone: 2, light: { tone: 1, shape: union(poly([19, 14], [21, 12], [20, 23]), poly([29, 14], [27, 12], [28, 23])) } },
    { shape: H3.head, tone: 0, shade: 1 },
    { shape: H3.lily, tone: 0, shade: 1, pixels: px(1, [24, 4], [21, 6], [27, 6]) },
    { pixels: [...stamp(19, 9, ['3333333333']), ...eyes(21, 25, 12, { height: 2 }), ...px(3, [23, 16], [24, 16])] },
  ]));
}

function hadelysBack() {
  return toRows(paint([
    { shape: H3.dress, tone: 1, shade: 2 },
    { shape: H3.arms, tone: 0, shade: 1 },
    { shape: H3.hands, tone: 0, shade: 1 },
    { shape: union(H3.hair, H3.head, poly([19, 16], [29, 16], [30, 30], [24, 32], [18, 30])), tone: 2, light: { tone: 1, shape: rect(23.5, 10, 24.5, 30) } },
    { shape: H3.veils, tone: 1, shade: 2, light: { tone: 0, shape: union(poly([18, 18], [10, 9], [8, 11], [16, 21]), poly([30, 18], [38, 9], [40, 11], [32, 21])) } },
    { shape: H3.lily, tone: 0, shade: 1 },
  ]));
}

// ---------- 028 Faramin: the beast nobody ever sees, hiding behind its tail ----------
const F1 = {
  tail: poly([28, 44], [36, 40], [41, 32], [40, 22], [35, 17], [30, 19], [33, 25], [32, 33], [27, 39]),
  feet: union(ellipse(19, 44.6, 3, 1.4), ellipse(26, 44.6, 3, 1.4)),
  body: ellipse(22.5, 37, 7.5, 7),
  ears: union(poly([15, 25], [13, 14], [19, 22]), poly([28, 23], [31, 13], [32, 24])),
  head: ellipse(22.5, 27, 8.5, 7),
};

function faraminFront() {
  return toRows(paint([
    { shape: F1.feet, tone: 2, shade: 3 },
    { shape: F1.body, tone: 1, shade: 2, light: { tone: 0, shape: ellipse(22, 38.5, 4.5, 4.5) } },
    { shape: F1.ears, tone: 1, shade: 2, light: { tone: 0, shape: union(poly([15.5, 23], [14.5, 17], [17.5, 21.5]), poly([29.5, 22], [30.5, 17], [30.8, 22.5])) } },
    { shape: F1.head, tone: 1, shade: 2, light: { tone: 0, shape: ellipse(22.5, 30, 5, 3) } },
    // Huge fluffy tail curling in front, the face peeking over it.
    { shape: F1.tail, tone: 2, shade: 3, light: { tone: 1, shape: poly([35, 20], [38, 25], [38, 32], [36, 27]) }, pixels: px(1, [31, 37], [35, 33], [37, 26]) },
    { pixels: [...eyes(17, 24, 25, { height: 3 }), ...px(1, [16, 29], [27, 29]), ...px(3, [21, 29], [22, 29]), ...stamp(19, 31, ['3...3', '.333.'])] },
  ]));
}

function faraminBack() {
  return toRows(paint([
    { shape: F1.feet, tone: 2, shade: 3 },
    { shape: F1.body, tone: 1, shade: 2 },
    { shape: F1.ears, tone: 1, shade: 2 },
    { shape: F1.head, tone: 1, shade: 2, pixels: px(2, [19, 25], [23, 24], [26, 27]) },
    { shape: poly([23, 45], [33, 42], [39, 34], [39, 24], [34, 18], [29, 20], [32, 26], [31, 34], [25, 40]), tone: 2, shade: 3, light: { tone: 1, shape: poly([34, 21], [37, 26], [37, 33], [35, 27]) } },
  ]));
}

// ---------- 029 Faramine ----------
const F2 = {
  tail: poly([30, 44], [41, 38], [46, 28], [45, 15], [39, 8], [32, 9], [36, 15], [38, 24], [35, 33], [28, 39]),
  legs: union(capsule([[18, 37], [16, 44]], 2.4), capsule([[28, 37], [29, 44]], 2.4)),
  feet: union(ellipse(15.5, 44.8, 3.4, 1.4), ellipse(29.5, 44.8, 3.4, 1.4)),
  body: ellipse(22.5, 33, 9, 8),
  mane: poly([11, 26], [9, 20], [12, 21], [11, 15], [15, 17], [16, 12], [20, 15], [23, 11], [26, 15], [30, 13], [31, 18], [34, 19], [33, 25], [35, 30], [30, 30], [24, 33], [16, 31], [10, 31]),
  ears: union(poly([14, 16], [10, 3], [18, 12]), poly([29, 13], [34, 2], [33, 15])),
  head: ellipse(22.5, 22, 7.5, 6.3),
};

function faramineFront() {
  return toRows(paint([
    { shape: F2.legs, tone: 1, shade: 2 },
    { shape: F2.feet, tone: 2, shade: 3, pixels: px(0, [12, 45], [14, 46], [30, 46], [32, 45]) },
    { shape: F2.body, tone: 1, shade: 2, light: { tone: 0, shape: ellipse(22, 35, 5, 4.5) } },
    { shape: F2.ears, tone: 1, shade: 2, light: { tone: 0, shape: union(poly([13.5, 14], [11.5, 6], [16, 12]), poly([30, 12], [32.5, 5], [32, 13])) } },
    { shape: F2.mane, tone: 2, shade: 3, pixels: px(1, [12, 24], [14, 19], [19, 15], [27, 15], [31, 20], [32, 26]) },
    { shape: F2.head, tone: 1, shade: 2, light: { tone: 0, shape: ellipse(22.5, 25, 4.5, 2.6) } },
    { shape: F2.tail, tone: 2, shade: 3, light: { tone: 1, shape: poly([40, 11], [43, 17], [43, 27], [40, 20]) }, pixels: px(1, [34, 36], [38, 31], [41, 24], [39, 14]) },
    { pixels: [...eyes(18, 25, 20), ...px(3, [17, 19], [18, 18], [27, 18], [28, 19]), ...px(3, [22, 24], [23, 24]), ...stamp(19, 26, ['3.....3', '.30303.', '..333..'])] },
  ]));
}

function faramineBack() {
  return toRows(paint([
    { shape: F2.legs, tone: 1, shade: 2 },
    { shape: F2.feet, tone: 2, shade: 3 },
    { shape: F2.body, tone: 1, shade: 2 },
    { shape: F2.ears, tone: 1, shade: 2 },
    { shape: union(F2.mane, F2.head), tone: 2, shade: 3, pixels: px(1, [14, 22], [18, 18], [23, 16], [28, 18], [31, 23], [20, 27], [26, 27]) },
    { shape: poly([26, 45], [38, 40], [44, 30], [44, 16], [38, 9], [31, 10], [35, 16], [37, 25], [33, 34], [25, 40]), tone: 2, shade: 3, light: { tone: 1, shape: poly([39, 12], [42, 18], [42, 28], [39, 21]) } },
  ]));
}

const HADA_ICON = [
  '..........3.....',
  '..........3.....',
  '.......33333....',
  '.3....3222223...',
  '303..300000003..',
  '.3..30303030303.',
  '....300000000003',
  '.33333000330003.',
  '3000033000003...',
  '30000333113.33..',
  '.33330311130000.',
  '3000031111130003',
  '.3333111111133 3.',
  '....3111111113..',
  '.....3.3333.3...',
  '.....3......3...',
].map((row) => row.replace(/ /g, '').slice(0, 16).padEnd(16, '.'));

const HADALUNE_ICON = [
  '......333.......',
  '.....30033......',
  '.....303........',
  '.....30033......',
  '....3333333.....',
  '...32000002 3...',
  '33.320300302 3.33',
  '3003200000023003',
  '3000233003320003',
  '.3333311113 3333.',
  '3000311111130003',
  '.33331111111333.',
  '...31111111113..',
  '..311111111113..',
  '..33333333333 3.',
  '................',
].map((row) => row.replace(/ /g, '').slice(0, 16).padEnd(16, '.'));

const HADELYS_ICON = [
  '.....3.3.3......',
  '....3030303.....',
  '.33.3333333..33.',
  '3113320003231113',
  '3111203030211113',
  '.31120000021113.',
  '.3112333332 113.',
  '..31111111111 3.',
  '.31113111131113.',
  '3111311111131113',
  '.33331111111333.',
  '...311111111113.',
  '..3111111111113.',
  '..31111111111113',
  '..33333333333333',
  '................',
].map((row) => row.replace(/ /g, '').slice(0, 16).padEnd(16, '.'));

const FARAMIN_ICON = [
  '................',
  '..3.....3.......',
  '.303...303..33..',
  '.3013.3013.3223.',
  '.311333113.32223',
  '3111111111332223',
  '3130111301132223',
  '3133111331132223',
  '3111033011322223',
  '.31100001132222 3',
  '..3311113322223.',
  '..3111111322223.',
  '..31100013222 3.',
  '..3111111322 3..',
  '...3133313333...',
  '...333.333......',
].map((row) => row.replace(/ /g, '').slice(0, 16).padEnd(16, '.'));

const FARAMINE_ICON = [
  '.3......3...333.',
  '303....303.32223',
  '3013.33013.32223',
  '3113322113 322223',
  '32222222223322223',
  '3221111111322223',
  '3213031301332223',
  '3213311331322223',
  '3221303031322 23',
  '.3221333313222 3.',
  '..3311111132223.',
  '..31100001322 3.',
  '..311000013223..',
  '..31111111333...',
  '.31133313313....',
  '.333..333.......',
].map((row) => row.replace(/ /g, '').slice(0, 16).padEnd(16, '.'));

export const line = [
  { id: 'hada', front: hadaFront(), back: hadaBack(), icon: HADA_ICON },
  { id: 'hadalune', front: hadaluneFront(), back: hadaluneBack(), icon: HADALUNE_ICON },
  { id: 'hadelys', front: hadelysFront(), back: hadelysBack(), icon: HADELYS_ICON },
  { id: 'faramin', front: faraminFront(), back: faraminBack(), icon: FARAMIN_ICON },
  { id: 'faramine', front: faramineFront(), back: faramineBack(), icon: FARAMINE_ICON },
];
