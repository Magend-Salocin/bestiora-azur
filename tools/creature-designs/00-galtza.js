import { capsule, ellipse, mirrorX, paint, poly, px, rect, stamp, toRows, union } from '../creature-painter.js';

// Galtzagorri line: Basque imps in red breeches, here fire spirits of the forge.
// Tones: 0 flame cores/belly, 1 skin, 2 breeches, 3 ink. Signature: flame tuft, small horns,
// red breeches with braces, flame-tipped tail.
const eyes = (lx, rx, y) => [
  ...px(3, [lx, y], [lx + 1, y], [lx, y + 1], [lx + 1, y + 1], [lx, y + 2], [lx + 1, y + 2]),
  ...px(3, [rx, y], [rx + 1, y], [rx, y + 1], [rx + 1, y + 1], [rx, y + 2], [rx + 1, y + 2]),
  ...px(0, [lx + 1, y], [rx + 1, y]),
];

// ---------- 004 Galtza ----------
const G1 = {
  tail: capsule([[29, 41], [35, 40], [38, 36], [38, 32]], 1.2),
  tailFlame: poly([36, 33], [37, 27], [38.5, 30], [40, 26], [40.5, 33], [39, 35]),
  legs: union(rect(19.5, 39, 22, 44), rect(26, 39, 28.5, 44)),
  feet: union(ellipse(20, 44.6, 3, 1.5), ellipse(28, 44.6, 3, 1.5)),
  breeches: poly([17.5, 34], [30.5, 34], [31, 41], [26, 41.5], [24, 39.5], [22, 41.5], [17, 41]),
  body: ellipse(24, 33, 6, 4.5),
  arms: union(capsule([[19, 31], [15, 28], [14, 25]], 1.6), capsule([[29, 32], [32.5, 35], [34, 37]], 1.6)),
  hands: union(ellipse(13.8, 23.8, 2, 2), ellipse(34.4, 37.8, 2, 2)),
  ears: mirrorX(poly([16.5, 23], [10, 21], [16.5, 27])),
  head: ellipse(24, 24.5, 8.2, 7.2),
  horns: mirrorX(poly([18.5, 18.6], [16.5, 14.5], [20.5, 17.5])),
  flame: poly([19.5, 18.5], [20.5, 13], [22.5, 15.5], [24, 9.5], [26, 15], [28, 12], [28.5, 18.5]),
};

function galtzaFront() {
  return toRows(paint([
    { shape: G1.tail, tone: 1 },
    { shape: G1.tailFlame, tone: 0, pixels: px(1, [38, 31], [39, 30], [38, 32]) },
    { shape: G1.legs, tone: 1 },
    { shape: G1.feet, tone: 2, shade: 3 },
    { shape: G1.body, tone: 0, shade: 1 },
    { shape: G1.breeches, tone: 2, shade: 3, light: { tone: 1, shape: rect(18, 35, 20, 39) },
      pixels: [...px(3, [20, 30], [20, 31], [20, 32], [20, 33], [27, 30], [27, 31], [27, 32], [27, 33]), ...px(0, [20, 35], [27, 35])] },
    { shape: G1.arms, tone: 1 },
    { shape: G1.hands, tone: 1, shade: 2 },
    { shape: G1.ears, tone: 1, shade: 2 },
    { shape: G1.horns, tone: 2 },
    { shape: G1.flame, tone: 0, pixels: px(1, [22, 17], [24, 14], [24, 15], [25, 16], [27, 16]) },
    { shape: G1.head, tone: 1, shade: 2, light: { tone: 0, shape: ellipse(24, 26.5, 5.5, 3.5) } },
    {
      pixels: [
        ...eyes(20, 26, 22),
        ...px(3, [21, 27], [22, 28], [23, 28], [24, 28], [25, 28], [26, 27]),
        ...px(0, [23, 29]),
        ...px(3, [22, 29], [24, 29], [23, 30]),
      ],
    },
  ]));
}

function galtzaBack() {
  return toRows(paint([
    { shape: G1.legs, tone: 1 },
    { shape: G1.feet, tone: 2, shade: 3 },
    { shape: G1.arms, tone: 1 },
    { shape: G1.hands, tone: 1, shade: 2 },
    { shape: G1.body, tone: 1, shade: 2 },
    { shape: G1.breeches, tone: 2, shade: 3, pixels: [...px(3, [21, 30], [21, 31], [21, 32], [21, 33], [26, 30], [26, 31], [26, 32], [26, 33]), ...stamp(20, 34, ['33333333'])] },
    { shape: capsule([[24, 38], [30, 39], [35, 36], [37, 31]], 1.2), tone: 1 },
    { shape: poly([35, 32], [36, 26], [37.5, 29], [39, 25], [39.5, 32], [38, 34]), tone: 0 },
    { shape: G1.ears, tone: 1, shade: 2 },
    { shape: G1.head, tone: 1, shade: 2 },
    { shape: G1.horns, tone: 2 },
    { shape: G1.flame, tone: 0, pixels: px(1, [22, 17], [24, 14], [25, 16], [27, 16], [23, 19], [25, 19]) },
  ]));
}

// ---------- 005 Galtzabras ----------
const G2 = {
  tail: capsule([[29, 40], [36, 39], [40, 34], [40, 29]], 1.5),
  tailFlame: poly([38, 30], [38.5, 22], [40.5, 26], [42.5, 21], [43.5, 29], [41.5, 32]),
  legs: union(capsule([[21, 37], [20, 44]], 1.8), capsule([[27, 37], [28, 44]], 1.8)),
  feet: union(ellipse(19.5, 44.8, 3.3, 1.5), ellipse(28.5, 44.8, 3.3, 1.5)),
  breeches: poly([17, 31], [31, 31], [31.5, 39.5], [26.5, 40], [24, 37.5], [21.5, 40], [16.5, 39.5]),
  chest: poly([18, 24], [30, 24], [31, 31.5], [17, 31.5]),
  arms: mirrorX(capsule([[18, 25], [13.5, 29], [12, 34]], 2.1)),
  fists: union(ellipse(11.8, 35.5, 2.8, 2.6), ellipse(36.2, 35.5, 2.8, 2.6)),
  fistFlames: union(poly([9.5, 34], [10, 29.5], [11.5, 31.5], [12.5, 28.5], [14, 33]), poly([34, 33], [35.5, 28.5], [36.5, 31.5], [38, 29.5], [38.5, 34])),
  ears: mirrorX(poly([17.5, 17], [9, 13.5], [17.5, 21])),
  head: ellipse(24, 18, 7.2, 6.3),
  horns: mirrorX(poly([19.5, 12.6], [17, 7.5], [21.5, 11.5])),
  flame: poly([18, 13], [18.5, 6.5], [21, 9.5], [22.5, 3], [24.5, 8], [26.5, 2], [28, 8.5], [30.5, 5.5], [30, 13]),
};

function galtzabrasFront() {
  return toRows(paint([
    { shape: G2.tail, tone: 1 },
    { shape: G2.tailFlame, tone: 0, pixels: px(1, [40, 27], [41, 26], [40, 28], [41, 29]) },
    { shape: G2.legs, tone: 1, shade: 2 },
    { shape: G2.feet, tone: 2, shade: 3 },
    { shape: G2.chest, tone: 1, shade: 2, light: { tone: 0, shape: ellipse(24, 27.5, 3.5, 2.6) } },
    { shape: G2.breeches, tone: 2, shade: 3, light: { tone: 1, shape: rect(17.5, 33, 19.5, 38) },
      pixels: [...stamp(17, 31, ['33333333333333']), ...px(0, [23, 31], [24, 31]), ...px(3, [20, 24], [20, 25], [20, 26], [20, 27], [20, 28], [20, 29], [20, 30], [27, 24], [27, 25], [27, 26], [27, 27], [27, 28], [27, 29], [27, 30])] },
    { shape: G2.arms, tone: 1, shade: 2 },
    { shape: G2.fistFlames, tone: 0, pixels: px(1, [11, 32], [12, 31], [36, 31], [37, 32]) },
    { shape: G2.fists, tone: 1, shade: 2, pixels: px(3, [11, 35], [36, 35]) },
    { shape: G2.ears, tone: 1, shade: 2 },
    { shape: G2.horns, tone: 2 },
    { shape: G2.flame, tone: 0, pixels: px(1, [21, 11], [23, 7], [24, 9], [26, 6], [27, 10], [29, 11], [20, 12]) },
    { shape: G2.head, tone: 1, shade: 2, light: { tone: 0, shape: ellipse(24, 20, 4.8, 2.6) } },
    {
      pixels: [
        ...eyes(20, 26, 16),
        ...px(3, [19, 15], [20, 15], [27, 15], [28, 15]),
        ...px(3, [21, 21], [22, 21], [23, 21], [24, 21], [25, 21], [26, 21], [21, 20], [26, 20]),
        ...px(0, [22, 22], [25, 22]),
        ...px(3, [22, 23], [25, 23]),
      ],
    },
  ]));
}

function galtzabrasBack() {
  return toRows(paint([
    { shape: G2.legs, tone: 1, shade: 2 },
    { shape: G2.feet, tone: 2, shade: 3 },
    { shape: G2.fistFlames, tone: 0 },
    { shape: G2.arms, tone: 1, shade: 2 },
    { shape: G2.fists, tone: 1, shade: 2 },
    { shape: G2.chest, tone: 1, shade: 2, light: { tone: 2, shape: rect(23.5, 24, 24.5, 31) } },
    { shape: G2.breeches, tone: 2, shade: 3, pixels: [...stamp(17, 31, ['33333333333333']), ...px(3, [21, 24], [21, 26], [21, 28], [21, 30], [26, 24], [26, 26], [26, 28], [26, 30])] },
    { shape: capsule([[24, 37], [31, 38.5], [37, 35], [39, 29]], 1.5), tone: 1 },
    { shape: poly([37, 30], [37.5, 22], [39.5, 26], [41.5, 21], [42.5, 29], [40.5, 32]), tone: 0 },
    { shape: G2.ears, tone: 1, shade: 2 },
    { shape: G2.head, tone: 1, shade: 2 },
    { shape: G2.horns, tone: 2 },
    { shape: G2.flame, tone: 0, pixels: px(1, [21, 11], [23, 7], [26, 6], [27, 10], [29, 11], [22, 13], [25, 13]) },
  ]));
}

// ---------- 006 Galtzagor: forge giant ----------
const G3 = {
  tail: capsule([[32, 40], [39, 39], [43, 34], [43.5, 28]], 1.8),
  tailFlame: poly([41.5, 29], [42, 20], [44, 24], [45.5, 19], [46.5, 28], [44.5, 31.5]),
  legs: union(capsule([[19, 37], [17.5, 43]], 3), capsule([[29, 37], [30.5, 43]], 3)),
  feet: union(ellipse(17, 44.6, 4.6, 1.8), ellipse(31, 44.6, 4.6, 1.8)),
  torso: poly([12, 17], [36, 17], [33, 30], [15, 30]),
  apron: poly([16.5, 25], [31.5, 25], [33, 40], [15, 40]),
  arms: union(capsule([[13, 19], [8.5, 25], [8, 31]], 3.4), capsule([[35, 19], [39.5, 25], [40, 31]], 3.4)),
  fists: union(ellipse(8, 33, 3.8, 3.4), ellipse(40, 33, 3.8, 3.4)),
  hammer: union(rect(39, 10, 41, 33), rect(35, 5, 45, 11)),
  head: ellipse(24, 14.8, 7.8, 6.6),
  horns: mirrorX(poly([18, 11], [12, 9], [9.5, 3.5], [11.5, 4], [14, 7], [19.5, 8.5])),
  mane: poly([14.5, 16], [13.5, 9], [16.5, 10.5], [17, 4], [20, 7.5], [22, 1], [24, 6], [26, 1], [28, 7.5], [31, 4], [31.5, 10.5], [34.5, 9], [33.5, 16], [30, 13], [18, 13]),
};

function galtzagorFront() {
  return toRows(paint([
    { shape: G3.tail, tone: 1 },
    { shape: G3.tailFlame, tone: 0, pixels: px(1, [43, 26], [44, 24], [44, 27], [43, 28]) },
    { shape: G3.hammer, tone: 2, light: { tone: 1, shape: rect(35, 5, 45, 6) }, pixels: [...px(3, [39, 7], [40, 8], [41, 7]), ...px(0, [36, 6], [37, 6])] },
    { shape: G3.legs, tone: 1, shade: 2 },
    { shape: G3.feet, tone: 2, shade: 3 },
    { shape: G3.torso, tone: 1, shade: 2, light: { tone: 0, shape: union(ellipse(19.5, 22, 3.6, 2.6), ellipse(28.5, 22, 3.6, 2.6)) } },
    // Leather forge apron over the red breeches.
    { shape: G3.apron, tone: 2, shade: 3, light: { tone: 1, shape: rect(17, 27, 19, 38) },
      pixels: [...px(3, [21, 30], [22, 30], [23, 30], [24, 30], [25, 30], [26, 30], [27, 30], [21, 31], [27, 31], [21, 32], [27, 32], [21, 33], [22, 33], [23, 33], [24, 33], [25, 33], [26, 33], [27, 33]), ...px(0, [23, 31], [24, 32], [25, 31])] },
    { shape: G3.arms, tone: 1, shade: 2 },
    { shape: G3.fists, tone: 1, shade: 2, pixels: px(3, [7, 33], [9, 33], [39, 32], [41, 32]) },
    { shape: G3.horns, tone: 2, shade: 3 },
    { shape: G3.mane, tone: 0, pixels: px(1, [17, 8], [20, 9], [22, 5], [24, 8], [26, 5], [28, 9], [31, 8], [15, 13], [33, 13]) },
    { shape: G3.head, tone: 1, shade: 2, light: { tone: 0, shape: ellipse(24, 16.5, 4, 2) } },
    {
      pixels: [
        ...px(3, [20, 12], [21, 12], [22, 13], [27, 12], [28, 12], [26, 13]),
        ...px(0, [21, 13], [27, 13]),
        ...px(3, [20, 13], [20, 14], [21, 14], [28, 13], [28, 14], [27, 14]),
        ...px(3, [21, 17], [22, 18], [23, 18], [24, 18], [25, 18], [26, 18], [27, 17]),
        ...px(0, [22, 17], [26, 17]),
      ],
    },
  ]));
}

function galtzagorBack() {
  return toRows(paint([
    { shape: G3.hammer, tone: 2, light: { tone: 1, shape: rect(35, 5, 45, 6) } },
    { shape: G3.legs, tone: 1, shade: 2 },
    { shape: G3.feet, tone: 2, shade: 3 },
    { shape: G3.arms, tone: 1, shade: 2 },
    { shape: G3.fists, tone: 1, shade: 2 },
    { shape: G3.torso, tone: 1, shade: 2, light: { tone: 2, shape: rect(23.5, 17, 24.5, 30) } },
    { shape: poly([15.5, 28], [32.5, 28], [33, 40], [15, 40]), tone: 2, shade: 3, pixels: [...stamp(16, 28, ['33333333333333333']), ...px(3, [23, 23], [24, 23]), ...px(3, [19, 18], [20, 19], [21, 20], [22, 21], [29, 18], [28, 19], [27, 20], [26, 21])] },
    { shape: capsule([[24, 38], [33, 39.5], [40, 36], [42, 29]], 1.8), tone: 1 },
    { shape: poly([40, 30], [40.5, 21], [42.5, 25], [44, 20], [45, 29], [43, 32.5]), tone: 0 },
    { shape: G3.horns, tone: 2, shade: 3 },
    { shape: G3.head, tone: 1, shade: 2 },
    { shape: G3.mane, tone: 0, pixels: px(1, [17, 8], [20, 9], [22, 5], [26, 5], [28, 9], [31, 8], [19, 12], [24, 11], [29, 12]) },
  ]));
}

const GALTZA_ICON = [
  '.......3.3......',
  '......303033....',
  '...33.300003....',
  '..3203001003.3..',
  '.3203111111302..',
  '.3311111111113..',
  '.3113011030113..',
  '..313311033131..',
  '..3110000000133.',
  '...31033330133.3',
  '....3111111303.0',
  '...3222222223..3',
  '..3222322322233.',
  '...322232223333.',
  '....3133313.....',
  '....333.333.....',
];

const GALTZABRAS_ICON = [
  '....3.3..3.3....',
  '...30300303.3...',
  '..3200000003023.',
  '..3233111113323.',
  '..3311111111113.',
  '...31303303113..',
  '...31333333113..',
  '....311001113...',
  '.30.33333333.03.',
  '3003111001113003',
  '3113311111133113',
  '.333222222223333',
  '...3222332223...',
  '...322233222333.',
  '....3133313.....',
  '....333.333.....',
];

const GALTZAGOR_ICON = [
  '33.3.3.3.3.3.333',
  '3230303030303232',
  '.32300000000323.',
  '..3311111111333.',
  '...31303303113..',
  '...31333333113..',
  '..3311000001133.',
  '.31111111111113.',
  '3111311111131113',
  '3113322222233113',
  '3113322332233113',
  '.333322222233333',
  '...3222222223...',
  '..311322223113..',
  '..311333333113..',
  '..33333..33333..',
];

export const line = [
  { id: 'galtza', front: galtzaFront(), back: galtzaBack(), icon: GALTZA_ICON },
  { id: 'galtzabras', front: galtzabrasFront(), back: galtzabrasBack(), icon: GALTZABRAS_ICON },
  { id: 'galtzagor', front: galtzagorFront(), back: galtzagorBack(), icon: GALTZAGOR_ICON },
];
