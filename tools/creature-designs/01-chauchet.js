// Lignée du Chauchet (015 à 017), Insecte (Ombre au stade 3). Fiche : docs/bestiaire-folklorique/fiches/015-chauchet.md
// La Chauche-vieille pèse sur la poitrine des dormeurs. Larve en bonnet de nuit, cocon-couverture,
// phalène des cauchemars. Tones: 0 face/eyespots, 1 body, 2 nightcap/wings, 3 ink.
import { capsule, ellipse, eyes, mirrorX, paint, poly, px, rect, stamp, toRows, union } from '../creature-painter.js';

// ---------- 015 Chauchet: sleepy grub in a nightcap ----------
const C1 = {
  segments: union(ellipse(34, 41, 5, 4), ellipse(29, 42, 5, 4.2), ellipse(23.5, 41.5, 5.2, 4.4)),
  head: ellipse(17.5, 33, 7.5, 6.8),
  cap: poly([10.5, 30], [24.5, 30], [23, 26], [19, 24], [14, 25], [9, 21], [5.5, 23], [7, 25.5], [11, 27]),
  feet: union(rect(21, 45, 23, 46), rect(27, 45.5, 29, 46.5), rect(33, 44.5, 35, 45.5)),
};

function chauchetFront() {
  return toRows(paint([
    { shape: C1.feet, tone: 2 },
    { shape: C1.segments, tone: 1, shade: 2, light: { tone: 0, shape: union(ellipse(34, 40, 2.5, 1.5), ellipse(29, 41, 2.5, 1.5), ellipse(23.5, 40.5, 2.5, 1.5)) },
      pixels: px(3, [26, 39], [26, 40], [31, 38], [31, 39]) },
    { shape: C1.head, tone: 0, shade: 1 },
    { shape: C1.cap, tone: 2, light: { tone: 1, shape: poly([12, 27], [17, 25.5], [16, 27.5]) },
      pixels: [...stamp(10, 29, ['333333333333333']), ...px(0, [5, 22], [6, 22], [5, 23]), ...px(3, [4, 22], [5, 21])] },
    // Sleepy half-closed eyes and a yawning mouth.
    { pixels: [...stamp(13, 32, ['333...333', '.1.....1.']), ...stamp(16, 35, ['.33.', '3223', '.33.']), ...px(1, [12, 34], [23, 34])] },
    { pixels: stamp(26, 24, ['3333', '..3.', '.3..', '3333']) },
  ]));
}

function chauchetBack() {
  return toRows(paint([
    { shape: C1.feet, tone: 2 },
    { shape: C1.segments, tone: 1, shade: 2, pixels: px(3, [26, 39], [26, 40], [31, 38], [31, 39], [21, 39], [36, 39]) },
    { shape: C1.head, tone: 1, shade: 2 },
    { shape: union(C1.cap, ellipse(17.5, 30, 7.5, 3.5)), tone: 2, light: { tone: 1, shape: poly([12, 27], [17, 25.5], [16, 27.5]) } },
  ]));
}

// ---------- 016 Chauchenid: cocoon wrapped like a quilt ----------
const C2 = {
  thread: rect(23.5, 2, 24.5, 9),
  cocoon: poly([24, 8], [30, 12], [33, 20], [33, 30], [31, 38], [27, 43], [24, 44], [21, 43], [17, 38], [15, 30], [15, 20], [18, 12]),
};

function chauchenidFront() {
  return toRows(paint([
    { shape: C2.thread, tone: 1, outline: false },
    { shape: C2.cocoon, tone: 1, shade: 2,
      // Quilted blanket: stitched squares.
      pixels: [
        ...px(2, [18, 16], [20, 16], [22, 16], [24, 16], [26, 16], [28, 16], [30, 16], [17, 24], [19, 24], [21, 24], [27, 24], [29, 24], [31, 24], [17, 32], [19, 32], [21, 32], [23, 32], [25, 32], [27, 32], [29, 32], [31, 32]),
        ...px(2, [21, 12], [21, 14], [21, 18], [21, 20], [27, 12], [27, 14], [27, 18], [27, 20], [21, 34], [21, 36], [21, 38], [27, 34], [27, 36], [27, 38]),
      ] },
    // A gap in the quilt: one sleepy eye peeks out.
    { shape: ellipse(24, 25.5, 4.5, 3), tone: 3, pixels: [...stamp(21, 24, ['.000000.', '00330000', '.000000.'])] },
    { pixels: stamp(32, 6, ['333', '.3.', '333']) },
  ]));
}

function chauchenidBack() {
  return toRows(paint([
    { shape: C2.thread, tone: 1, outline: false },
    { shape: C2.cocoon, tone: 1, shade: 2,
      pixels: [
        ...px(2, [18, 16], [20, 16], [22, 16], [24, 16], [26, 16], [28, 16], [30, 16], [17, 26], [19, 26], [21, 26], [23, 26], [25, 26], [27, 26], [29, 26], [31, 26], [18, 36], [20, 36], [22, 36], [24, 36], [26, 36], [28, 36], [30, 36]),
        ...px(2, [24, 12], [24, 14], [24, 18], [24, 20], [24, 22], [24, 24], [24, 28], [24, 30], [24, 32], [24, 34], [24, 38], [24, 40]),
      ] },
  ]));
}

// ---------- 017 Chauchemor: moth of nightmares ----------
const C3 = {
  upper: mirrorX(poly([21, 20], [12, 9], [4, 7], [1, 12], [2, 19], [6, 25], [14, 27], [21, 26])),
  lower: mirrorX(poly([21, 27], [12, 28], [6, 33], [7, 39], [12, 41], [17, 38], [21, 32])),
  antennae: mirrorX(capsule([[22, 14], [19, 8], [15, 5]], 0.7)),
  antennaTips: mirrorX(ellipse(14.5, 4.5, 1.8, 1.3)),
  body: union(ellipse(24, 23, 4, 5), ellipse(24, 33, 3.6, 7)),
  head: ellipse(24, 16, 5.5, 4.8),
  ruff: ellipse(24, 20, 6.5, 2.4),
};

function chauchemorFront() {
  return toRows(paint([
    { shape: C3.antennae, tone: 2, outline: false },
    { shape: C3.antennaTips, tone: 1 },
    { shape: C3.lower, tone: 2, shade: 3, light: { tone: 1, shape: union(ellipse(12, 35, 2.4, 2.4), ellipse(36, 35, 2.4, 2.4)) },
      pixels: px(3, [12, 35], [36, 35]) },
    // Upper wings with staring eye spots.
    { shape: C3.upper, tone: 2, shade: 3,
      light: { tone: 0, shape: union(ellipse(10, 17, 4, 3.6), ellipse(38, 17, 4, 3.6)) },
      pixels: [...px(3, [9, 16], [10, 16], [9, 17], [10, 17], [38, 16], [39, 16], [38, 17], [39, 17]), ...px(1, [7, 15], [41, 15]), ...px(3, [4, 10], [5, 12], [44, 10], [43, 12], [3, 18], [45, 18])] },
    { shape: C3.body, tone: 1, shade: 2, pixels: px(3, [22, 30], [26, 30], [22, 34], [26, 34], [23, 38], [25, 38]) },
    { shape: C3.ruff, tone: 0, shade: 1 },
    { shape: C3.head, tone: 1, shade: 2 },
    { pixels: [...eyes(21, 25, 15, { height: 2 }), ...px(3, [23, 18], [24, 18])] },
  ]));
}

function chauchemorBack() {
  return toRows(paint([
    { shape: C3.antennae, tone: 2, outline: false },
    { shape: C3.antennaTips, tone: 1 },
    { shape: C3.body, tone: 1, shade: 2 },
    { shape: C3.head, tone: 1, shade: 2 },
    { shape: C3.lower, tone: 2, shade: 3, pixels: px(1, [12, 35], [36, 35], [11, 34], [37, 34]) },
    { shape: C3.upper, tone: 2, shade: 3,
      light: { tone: 1, shape: union(poly([20, 22], [10, 12], [8, 14]), poly([28, 22], [38, 12], [40, 14])) },
      pixels: px(3, [5, 15], [7, 20], [43, 15], [41, 20]) },
    { shape: ellipse(24, 24, 3.5, 9), tone: 1, shade: 2, pixels: px(2, [24, 18], [24, 22], [24, 26], [24, 30]) },
    { shape: C3.ruff, tone: 0, shade: 1 },
  ]));
}

const CHAUCHET_ICON = [
  '................',
  '................',
  '.33.............',
  '3003333.........',
  '.3322223........',
  '...3222223......',
  '...33333333.....',
  '..3000000003....',
  '..3033003303....',
  '..3000330003....',
  '...30033003.333.',
  '....3333331113 3',
  '...3111311131113',
  '...3111311131113',
  '....33333333333.',
  '....3.3...3.3...',
].map((row) => row.replace(/ /g, '').slice(0, 16).padEnd(16, '.'));

const CHAUCHENID_ICON = [
  '.......33.......',
  '.......33.......',
  '......3113......',
  '.....312213.....',
  '....31211213....',
  '....31111113....',
  '....33000033....',
  '....30330003....',
  '....33000033....',
  '....31211213....',
  '....31111113....',
  '.....312213.....',
  '.....311113.....',
  '......3113......',
  '.......33.......',
  '................',
];

const CHAUCHEMOR_ICON = [
  '..3..........3..',
  '...3........3...',
  '.33.3......3.33.',
  '3223.3.33.3.3223',
  '3200233113320023',
  '3203231111323023',
  '3200231331320023',
  '.322231001322 23',
  '..3333311113333.',
  '...32231113223..',
  '..322223132 223.',
  '..32123.3.32123.',
  '...333..3..333..',
  '................',
  '................',
  '................',
].map((row) => row.replace(/ /g, '').slice(0, 16).padEnd(16, '.'));

export const line = [
  { id: 'chauchet', front: chauchetFront(), back: chauchetBack(), icon: CHAUCHET_ICON },
  { id: 'chauchenid', front: chauchenidFront(), back: chauchenidBack(), icon: CHAUCHENID_ICON },
  { id: 'chauchemor', front: chauchemorFront(), back: chauchemorBack(), icon: CHAUCHEMOR_ICON },
];
