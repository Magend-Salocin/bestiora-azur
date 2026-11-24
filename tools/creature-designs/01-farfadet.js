// Lignée du Farfadet (010 à 012), Normal et Vent. Fiche : docs/bestiaire-folklorique/fiches/010-farfadet.md
// Lutins du Poitou devenus lutins des airs. Tones: 0 face/belly, 1 feathers, 2 cap/wings, 3 ink.
// Signature: feathered cap with a long plume, sparrow wings, fan tail, cheeky grin.
import { capsule, ellipse, eyes, mirrorX, paint, poly, px, rect, stamp, toRows, union } from '../creature-painter.js';

// ---------- 010 Farfadet: round sparrow-lutin ----------
const F1 = {
  tail: poly([20, 38], [28, 38], [31, 43], [24, 41.5], [17, 43]),
  wings: mirrorX(poly([17, 30], [7, 24], [5, 28], [7, 31], [6, 34], [11, 36], [17, 36])),
  feet: union(capsule([[21, 40], [20, 44.5]], 0.8), capsule([[27, 40], [28, 44.5]], 0.8), rect(18, 44, 22, 45), rect(26, 44, 30, 45)),
  body: ellipse(24, 35, 7, 6),
  head: ellipse(24, 25.5, 7.5, 6.5),
  cap: poly([16.5, 23], [31.5, 23], [30, 19], [26, 16.5], [21, 17], [17.5, 19.5]),
  plume: capsule([[28, 18], [33, 13], [37, 12], [39, 14]], 1.4),
};

function farfadetFront() {
  return toRows(paint([
    { shape: F1.tail, tone: 2, shade: 3, pixels: px(3, [24, 39], [24, 40], [21, 40], [27, 40]) },
    { shape: F1.wings, tone: 2, shade: 3, light: { tone: 1, shape: union(poly([8, 26], [15, 30], [8, 29]), poly([40, 26], [33, 30], [40, 29])) },
      pixels: px(3, [9, 31], [10, 33], [39, 31], [38, 33]) },
    { shape: F1.feet, tone: 2 },
    { shape: F1.body, tone: 1, shade: 2, light: { tone: 0, shape: ellipse(24, 36, 4, 3.5) } },
    { shape: F1.plume, tone: 1, shade: 2, pixels: px(0, [34, 13], [36, 12]) },
    { shape: F1.head, tone: 0, shade: 1 },
    { shape: F1.cap, tone: 2, light: { tone: 1, shape: poly([19, 20], [23, 17.5], [22, 19.5]) }, pixels: stamp(17, 22, ['333333333333333']) },
    { pixels: [...eyes(20, 26, 24), ...px(1, [19, 28], [29, 28]), ...stamp(22, 28, ['3...3', '.333.'])] },
  ]));
}

function farfadetBack() {
  return toRows(paint([
    { shape: F1.feet, tone: 2 },
    { shape: F1.body, tone: 1, shade: 2 },
    { shape: F1.tail, tone: 2, shade: 3, pixels: px(3, [24, 39], [24, 40], [21, 40], [27, 40]) },
    { shape: union(F1.wings, mirrorX(poly([17, 29], [20, 29], [20, 37], [16, 37]))), tone: 2, shade: 3,
      light: { tone: 1, shape: union(poly([8, 26], [15, 30], [8, 29]), poly([40, 26], [33, 30], [40, 29])) } },
    { shape: F1.plume, tone: 1, shade: 2 },
    { shape: F1.head, tone: 1, shade: 2 },
    { shape: union(F1.cap, ellipse(24, 23, 7.6, 4.2)), tone: 2, light: { tone: 1, shape: poly([19, 20], [23, 17.5], [22, 19.5]) } },
  ]));
}

// ---------- 011 Farfandole: wind dancer ----------
const F2 = {
  scarf: poly([28, 26], [33, 25], [40, 20], [44, 21], [41, 23], [44, 26], [38, 27], [31, 29]),
  wings: mirrorX(poly([17, 25], [4, 16], [2, 20], [4, 23], [2, 27], [6, 30], [5, 33], [12, 33], [17, 31])),
  tail: poly([20, 39], [28, 39], [32, 46], [26, 43.5], [24, 46], [22, 43.5], [16, 46]),
  legs: union(capsule([[21.5, 37], [19.5, 44.5]], 1.2), capsule([[26.5, 37], [28.5, 44.5]], 1.2)),
  feet: union(ellipse(18.8, 45, 2.4, 1.2), ellipse(29.2, 45, 2.4, 1.2)),
  body: poly([19, 25], [29, 25], [30.5, 34], [27.5, 39], [20.5, 39], [17.5, 34]),
  arms: union(capsule([[19, 27], [15, 31], [14, 35]], 1.4), capsule([[29, 27], [33, 24], [35, 20]], 1.4)),
  hands: union(ellipse(13.8, 36, 1.8, 1.8), ellipse(35.3, 19, 1.8, 1.8)),
  head: ellipse(24, 18.5, 6.8, 6),
  cap: poly([16.5, 16.5], [31.5, 16.5], [30, 12], [26, 9.5], [21, 10], [17.5, 13]),
  plume: capsule([[28, 11], [32, 5], [37, 2.5], [40, 4]], 1.5),
};

function farfandoleFront() {
  return toRows(paint([
    { shape: F2.tail, tone: 2, shade: 3, pixels: px(3, [24, 41], [24, 42], [21, 41], [27, 41]) },
    { shape: F2.wings, tone: 2, shade: 3, light: { tone: 1, shape: union(poly([5, 18], [15, 25], [5, 22]), poly([43, 18], [33, 25], [43, 22])) },
      pixels: px(3, [6, 26], [7, 29], [8, 31], [42, 26], [41, 29], [40, 31]) },
    { shape: F2.legs, tone: 1, shade: 2 },
    { shape: F2.feet, tone: 2 },
    { shape: F2.body, tone: 1, shade: 2, light: { tone: 0, shape: ellipse(24, 31, 3.5, 4.5) }, pixels: stamp(18, 34, ['3333333333333']) },
    { shape: F2.arms, tone: 1, shade: 2 },
    { shape: F2.hands, tone: 0, shade: 1 },
    { shape: F2.scarf, tone: 2, light: { tone: 1, shape: poly([31, 26], [39, 21], [40, 22], [33, 27]) } },
    { shape: F2.plume, tone: 1, shade: 2, pixels: px(0, [33, 4], [36, 3], [38, 3]) },
    { shape: F2.head, tone: 0, shade: 1 },
    { shape: F2.cap, tone: 2, light: { tone: 1, shape: poly([19, 13.5], [23, 10.5], [22, 12.5]) }, pixels: stamp(17, 15, ['333333333333333']) },
    { pixels: [...eyes(20, 26, 17), ...px(3, [19, 16], [29, 16]), ...stamp(21, 21, ['3.....3', '.33333.']), ...px(0, [22, 22])] },
  ]));
}

function farfandoleBack() {
  return toRows(paint([
    { shape: F2.legs, tone: 1, shade: 2 },
    { shape: F2.feet, tone: 2 },
    { shape: F2.arms, tone: 1, shade: 2 },
    { shape: F2.hands, tone: 0, shade: 1 },
    { shape: F2.body, tone: 1, shade: 2, pixels: stamp(18, 34, ['3333333333333']) },
    { shape: F2.tail, tone: 2, shade: 3, pixels: px(3, [24, 41], [24, 42], [21, 41], [27, 41]) },
    { shape: F2.wings, tone: 2, shade: 3, light: { tone: 1, shape: union(poly([5, 18], [15, 25], [5, 22]), poly([43, 18], [33, 25], [43, 22])) } },
    { shape: F2.scarf, tone: 2, light: { tone: 1, shape: poly([31, 26], [39, 21], [40, 22], [33, 27]) } },
    { shape: F2.plume, tone: 1, shade: 2 },
    { shape: F2.head, tone: 1, shade: 2 },
    { shape: union(F2.cap, ellipse(24, 16, 6.8, 4)), tone: 2, light: { tone: 1, shape: poly([19, 13.5], [23, 10.5], [22, 12.5]) } },
  ]));
}

// ---------- 012 Farfator: lord of the winds ----------
const F3 = {
  wings: mirrorX(poly([17, 22], [8, 10], [2, 6], [0.5, 12], [3, 14], [0.5, 19], [4, 21], [1, 26], [6, 28], [4, 32], [10, 33], [16, 30])),
  cape: poly([16, 21], [32, 21], [37, 38], [33, 37], [30, 39], [27, 37.5], [24, 39.5], [21, 37.5], [18, 39], [15, 37], [11, 38]),
  tail: poly([19, 39], [29, 39], [33, 46.5], [27, 44.5], [24, 46.5], [21, 44.5], [15, 46.5]),
  legs: union(capsule([[21, 36], [19.5, 44]], 1.6), capsule([[27, 36], [28.5, 44]], 1.6)),
  feet: union(ellipse(18.5, 44.8, 3, 1.4), ellipse(29.5, 44.8, 3, 1.4)),
  body: poly([18.5, 21], [29.5, 21], [30, 31], [27, 37], [21, 37], [18, 31]),
  head: ellipse(24, 15, 6.6, 5.8),
  crown: poly([16, 13], [15, 6], [18.5, 9], [20, 3], [22.5, 8], [24, 1], [25.5, 8], [28, 3], [29.5, 9], [33, 6], [32, 13]),
};

function farfatorFront() {
  return toRows(paint([
    { shape: F3.wings, tone: 2, shade: 3,
      light: { tone: 1, shape: union(poly([3, 9], [14, 21], [3, 14]), poly([45, 9], [34, 21], [45, 14]), poly([3, 22], [13, 27], [5, 26]), poly([45, 22], [35, 27], [43, 26])) },
      pixels: px(3, [4, 17], [5, 23], [7, 29], [44, 17], [43, 23], [41, 29]) },
    { shape: F3.tail, tone: 2, shade: 3, pixels: px(3, [24, 41], [24, 43], [21, 42], [27, 42]) },
    { shape: F3.cape, tone: 2, shade: 3, light: { tone: 1, shape: union(poly([14, 26], [17, 23], [15, 35]), poly([34, 26], [31, 23], [33, 35])) } },
    { shape: F3.legs, tone: 1, shade: 2 },
    { shape: F3.feet, tone: 2 },
    { shape: F3.body, tone: 1, shade: 2, light: { tone: 0, shape: ellipse(24, 28, 4, 5.5) },
      pixels: [...stamp(18, 31, ['333333333333']), ...px(0, [23, 31], [24, 31])] },
    { shape: F3.crown, tone: 1, shade: 2, pixels: px(0, [20, 5], [24, 3], [28, 5], [17, 9], [31, 9]) },
    { shape: F3.head, tone: 0, shade: 1 },
    { pixels: [...stamp(17, 10, ['33333333333333']), ...eyes(20, 26, 13), ...px(3, [19, 12], [20, 12], [27, 12], [28, 12]), ...stamp(21, 18, ['3.....3', '.33333.'])] },
  ]));
}

function farfatorBack() {
  return toRows(paint([
    { shape: F3.legs, tone: 1, shade: 2 },
    { shape: F3.feet, tone: 2 },
    { shape: F3.body, tone: 1, shade: 2 },
    { shape: F3.tail, tone: 2, shade: 3, pixels: px(3, [24, 41], [24, 43], [21, 42], [27, 42]) },
    { shape: F3.wings, tone: 2, shade: 3,
      light: { tone: 1, shape: union(poly([3, 9], [14, 21], [3, 14]), poly([45, 9], [34, 21], [45, 14]), poly([3, 22], [13, 27], [5, 26]), poly([45, 22], [35, 27], [43, 26])) } },
    { shape: F3.cape, tone: 2, shade: 3, light: { tone: 1, shape: union(rect(23.5, 22, 24.5, 37), poly([17, 24], [20, 23], [16, 36]), poly([31, 24], [28, 23], [32, 36])) } },
    { shape: F3.crown, tone: 1, shade: 2 },
    { shape: F3.head, tone: 1, shade: 2, pixels: px(2, [20, 13], [24, 12], [28, 13], [22, 17], [26, 17]) },
  ]));
}

const FARFADET_ICON = [
  '................',
  '..........333...',
  '.....3333.3003..',
  '....32222333.3..',
  '...3222122223...',
  '...333333333....',
  '...300000003....',
  '33.303000303.33.',
  '3233000000032223',
  '3222303330322223',
  '.322311111322 3.',
  '..3231000013223.',
  '...31100001133..',
  '....33111133....',
  '....3.3333.3....',
  '...33......33...',
].map((row) => row.replace(/ /g, '2').slice(0, 16));

const FARFANDOLE_ICON = [
  '..........3333..',
  '......33333003..',
  '.....3222233....',
  '....32212222333.',
  '....3333333333 3',
  '3...300000003..3',
  '323.303000303.32',
  '3223300333003322',
  '3222230000032222',
  '.322311111113223',
  '..33311000113 3.',
  '....3311113.....',
  '....3233332 3...',
  '...323.3.3223...',
  '...33..3..33....',
  '................',
].map((row) => row.replace(/ /g, '3').slice(0, 16));

const FARFATOR_ICON = [
  '.....3.33.3.....',
  '3...313113 13..3',
  '23..3111111 3.32',
  '223.330000033.22',
  '2223303003033222',
  '.222300333003222',
  '.3222330003 3223',
  '..322311111 3223',
  '...3221000122 3.',
  '...32210001223..',
  '..3222333332223.',
  '..322233.33222 3',
  '...3333...3333..',
  '....33.....33...',
  '................',
  '................',
].map((row) => row.replace(/ /g, '3').slice(0, 16));

export const line = [
  { id: 'pivelin', front: farfadetFront(), back: farfadetBack(), icon: FARFADET_ICON },
  { id: 'grivelin', front: farfandoleFront(), back: farfandoleBack(), icon: FARFANDOLE_ICON },
  { id: 'aquilard', front: farfatorFront(), back: farfatorBack(), icon: FARFATOR_ICON },
];
