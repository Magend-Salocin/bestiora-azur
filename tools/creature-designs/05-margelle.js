// Lignées de la Margelle (062 et 063, Flore et Arcane), du Follet (064 et 065, Insecte et Foudre)
// et Gonfaron (066, Normal). Fiche : docs/bestiaire-folklorique/fiches/062-margelle.md.
// Tones: 0 glow and petals, 1 leaves and fur, 2 dark parts, 3 ink.
import { capsule, ellipse, eyes, iconFrom, mirrorX, paint, poly, px, rect, stamp, toRows, union } from '../creature-painter.js';

const sparkle = (x, y) => px(2, [x, y - 1], [x - 1, y], [x, y], [x + 1, y], [x, y + 1]);

// ---------- 062 Margelle: flower bud with a sleepy face, on two root feet ----------
const M1 = {
  feet: union(ellipse(20, 44.6, 3, 1.5), ellipse(28, 44.6, 3, 1.5)),
  stem: capsule([[24, 43], [24, 36]], 1.6),
  leaves: mirrorX(poly([22, 38], [13, 33], [11, 37], [16, 40])),
  bud: poly([15, 32], [16, 22], [20, 15], [24, 11], [28, 15], [32, 22], [33, 32], [24, 37]),
  sepals: union(poly([15, 31], [12, 36], [19, 35]), poly([33, 31], [36, 36], [29, 35]), poly([20, 34], [24, 39], [28, 34])),
  face: ellipse(24, 28, 5.5, 4.5),
};

function margelleFront() {
  return toRows(paint([
    { shape: M1.feet, tone: 1, shade: 2 },
    { shape: M1.stem, tone: 1, shade: 2 },
    { shape: M1.leaves, tone: 1, shade: 2, light: { tone: 0, shape: union(poly([14, 35], [19, 37], [15, 37]), poly([34, 35], [29, 37], [33, 37])) } },
    { shape: M1.bud, tone: 2, shade: 3, light: { tone: 1, shape: poly([18, 18], [22, 14], [19, 22]) }, pixels: px(3, [24, 14], [24, 17], [20, 21], [28, 21]) },
    { shape: M1.face, tone: 0, shade: 1, pixels: [...stamp(20, 27, ['333..333']), ...stamp(23, 30, ['33']), ...px(1, [19, 29], [29, 29])] },
    { shape: M1.sepals, tone: 1, shade: 2 },
    { pixels: [...sparkle(10, 20), ...sparkle(38, 24)] },
  ]));
}

function margelleBack() {
  return toRows(paint([
    { shape: M1.feet, tone: 1, shade: 2 },
    { shape: M1.stem, tone: 1, shade: 2 },
    { shape: M1.leaves, tone: 1, shade: 2 },
    { shape: M1.bud, tone: 2, shade: 3, light: { tone: 1, shape: poly([18, 18], [22, 14], [19, 22]) }, pixels: px(3, [24, 14], [24, 18], [24, 22], [24, 26], [24, 30], [20, 24], [28, 24]) },
    { shape: M1.sepals, tone: 1, shade: 2 },
    { pixels: sparkle(38, 24) },
  ]));
}

const MARGELLE_ICON = iconFrom([
  { shape: poly([2, 13], [3, 6], [6, 2], [8, 0.5], [10, 2], [13, 6], [14, 13], [8, 15.5]), tone: 2, shade: 3, light: { tone: 1, shape: poly([4.5, 6], [7, 3], [5, 8]) } },
  { shape: ellipse(8, 9.5, 4.2, 3.5), tone: 0, shade: 1, pixels: [...stamp(5, 9, ['33..33']), ...stamp(7, 11, ['33'])] },
  { shape: union(poly([2, 12], [0.5, 15.5], [6, 14.5]), poly([14, 12], [15.5, 15.5], [10, 14.5])), tone: 1, shade: 2 },
]);

// ---------- 063 Margolys: open lily, the fairy face in its heart ----------
const M2 = {
  feet: union(ellipse(19, 44.6, 3.4, 1.6), ellipse(29, 44.6, 3.4, 1.6)),
  skirt: poly([14, 44], [17, 34], [24, 31], [31, 34], [34, 44], [29, 41], [24, 44], [19, 41]),
  stem: capsule([[24, 36], [24, 27]], 2),
  arms: mirrorX(poly([22, 28], [13, 25], [11, 29], [15, 31], [22, 31])),
  petals: union(...[[24, 4], [12, 9], [36, 9], [9, 19], [39, 19]].map(([x, y]) => poly([24, 17], [x - 3, y + 2], [x, y - 2], [x + 3, y + 2]))),
  heart: ellipse(24, 17, 7.5, 6.5),
  stamens: union(capsule([[19, 12], [17, 5]], 0.6), capsule([[29, 12], [31, 5]], 0.6)),
};

function margolysFront() {
  return toRows(paint([
    { shape: M2.petals, tone: 0, shade: 1, light: { tone: 0, shape: ellipse(24, 6, 1, 3) }, pixels: px(1, [24, 8], [15, 11], [33, 11], [13, 19], [35, 19]) },
    { shape: M2.stamens, tone: 2, outline: false, pixels: px(3, [17, 4], [31, 4], [16, 5], [32, 5]) },
    { shape: M2.feet, tone: 1, shade: 2 },
    { shape: M2.skirt, tone: 1, shade: 2, light: { tone: 0, shape: poly([18, 35], [22, 33], [18, 41]) }, pixels: px(2, [24, 37], [28, 39], [21, 40]) },
    { shape: M2.stem, tone: 1, shade: 2 },
    { shape: M2.arms, tone: 1, shade: 2, light: { tone: 0, shape: union(poly([13, 27], [19, 28], [14, 29]), poly([35, 27], [29, 28], [34, 29])) } },
    { shape: M2.heart, tone: 0, shade: 1, pixels: [...eyes(20, 26, 15), ...stamp(23, 20, ['33']), ...px(1, [18, 19], [30, 19])] },
    { pixels: [...sparkle(6, 6), ...sparkle(42, 6), ...sparkle(42, 34)] },
  ]));
}

function margolysBack() {
  return toRows(paint([
    { shape: M2.feet, tone: 1, shade: 2 },
    { shape: M2.skirt, tone: 1, shade: 2 },
    { shape: M2.arms, tone: 1, shade: 2 },
    { shape: M2.stem, tone: 1, shade: 2 },
    { shape: union(M2.petals, M2.heart), tone: 0, shade: 1, pixels: [...px(1, [24, 8], [15, 11], [33, 11], [13, 19], [35, 19]), ...stamp(20, 14, ['1.1.1.1.1']), ...stamp(21, 18, ['1.1.1.1'])] },
    { pixels: [...sparkle(6, 6), ...sparkle(42, 6)] },
  ]));
}

const MARGOLYS_ICON = iconFrom([
  { shape: union(...[[8, 0.5], [1, 4], [15, 4], [0.5, 11], [15.5, 11]].map(([x, y]) => poly([8, 8], [x - 2, y + 1.5], [x, y - 1], [x + 2, y + 1.5]))), tone: 0, shade: 1 },
  { shape: ellipse(8, 8.5, 4.5, 4), tone: 0, shade: 1, pixels: [...px(3, [6, 7], [6, 8], [9, 7], [9, 8]), ...px(0, [6, 7], [9, 7]), ...stamp(7, 10, ['33'])] },
  { shape: poly([4, 16], [6, 13], [10, 13], [12, 16]), tone: 1, shade: 2 },
]);

// ---------- 064 Follet: will-o'-the-wisp beetle with a glowing tail ----------
const F1 = {
  wings: mirrorX(ellipse(17, 31, 5, 3.5)),
  glow: ellipse(24, 39.5, 5, 4.5),
  body: ellipse(24, 32, 6, 5.5),
  antennae: mirrorX(capsule([[21.5, 25], [19, 20], [16, 19]], 0.6)),
  head: ellipse(24, 26.5, 5, 4),
  legs: mirrorX(capsule([[20, 35], [17, 39]], 0.8)),
};

function folletFront() {
  return toRows(paint([
    { shape: F1.wings, tone: 0, shade: 1, pixels: px(1, [14, 30], [34, 30]) },
    { shape: F1.legs, tone: 2, shade: 3 },
    { shape: F1.glow, tone: 0, shade: 1, pixels: [...stamp(22, 37, ['.0.', '000'])] },
    { shape: F1.body, tone: 2, shade: 3, light: { tone: 1, shape: ellipse(22, 30, 2, 1.5) } },
    { shape: F1.antennae, tone: 2, outline: false, pixels: px(0, [16, 18], [32, 18]) },
    { shape: F1.head, tone: 1, shade: 2, pixels: [...stamp(21, 25, ['33..33', '03..03']), ...px(3, [23, 28], [24, 28])] },
    { pixels: [...sparkle(16, 44), ...sparkle(32, 44)] },
  ]));
}

function folletBack() {
  return toRows(paint([
    { shape: F1.legs, tone: 2, shade: 3 },
    { shape: F1.glow, tone: 0, shade: 1 },
    { shape: F1.antennae, tone: 2, outline: false, pixels: px(0, [16, 18], [32, 18]) },
    { shape: union(F1.body, F1.head), tone: 2, shade: 3, pixels: px(3, [24, 28], [24, 30], [24, 32], [24, 34]) },
    { shape: F1.wings, tone: 0, shade: 1, pixels: px(1, [14, 30], [34, 30]) },
  ]));
}

const FOLLET_ICON = iconFrom([
  { shape: mirrorX(ellipse(3, 8, 3, 2.5), 8), tone: 0, shade: 1 },
  { shape: ellipse(8, 13, 3.5, 2.5), tone: 0, shade: 1, pixels: px(1, [8, 14]) },
  { shape: ellipse(8, 8, 4, 3.8), tone: 2, shade: 3 },
  { shape: ellipse(8, 5, 3.5, 2.8), tone: 1, shade: 2, pixels: [...px(3, [6, 4], [6, 5], [9, 4], [9, 5]), ...px(0, [6, 5], [9, 5])] },
  { shape: mirrorX(capsule([[6, 2.5], [4, 0.5]], 0.5), 8), tone: 2, outline: false },
]);

// ---------- 065 Follumine: great luminous moth leading travellers astray ----------
const F2 = {
  wings: mirrorX(union(poly([21, 22], [8, 8], [2, 12], [4, 22], [14, 27]), poly([21, 30], [6, 30], [5, 38], [12, 40], [20, 35]))),
  glow: ellipse(24, 38, 6.5, 7),
  body: ellipse(24, 27, 6, 7),
  antennae: mirrorX(capsule([[22, 16], [18, 8], [13, 5]], 0.7)),
  head: ellipse(24, 17.5, 5.5, 4.5),
  ruff: ellipse(24, 22.5, 6.5, 2.4),
};

function follumineFront() {
  return toRows(paint([
    { shape: F2.wings, tone: 0, shade: 1, light: { tone: 0, shape: ellipse(24, 24, 1, 1) },
      pixels: [...px(1, [7, 13], [9, 16], [41, 13], [39, 16], [9, 34], [39, 34]), ...px(2, [8, 14], [40, 14], [10, 35], [38, 35])] },
    { shape: F2.glow, tone: 0, shade: 1, pixels: [...stamp(21, 35, ['.000.', '00000', '.000.']), ...px(1, [20, 41], [28, 41])] },
    { shape: F2.body, tone: 2, shade: 3, light: { tone: 1, shape: ellipse(22, 26, 2, 3) }, pixels: px(3, [21, 29], [27, 29], [21, 32], [27, 32]) },
    { shape: F2.antennae, tone: 2, outline: false, pixels: px(0, [13, 4], [35, 4], [12, 5], [36, 5]) },
    { shape: F2.ruff, tone: 0, shade: 1 },
    { shape: F2.head, tone: 1, shade: 2, pixels: [...stamp(20, 16, ['333..333', '.03..03.']), ...px(3, [23, 19], [24, 19])] },
    { pixels: [...sparkle(4, 44), ...sparkle(44, 44), ...sparkle(24, 46)] },
  ]));
}

function follumineBack() {
  return toRows(paint([
    { shape: F2.glow, tone: 0, shade: 1 },
    { shape: F2.antennae, tone: 2, outline: false, pixels: px(0, [13, 4], [35, 4]) },
    { shape: union(F2.body, F2.head), tone: 2, shade: 3, pixels: px(1, [24, 18], [24, 22], [24, 26], [24, 30]) },
    { shape: F2.ruff, tone: 0, shade: 1 },
    { shape: F2.wings, tone: 0, shade: 1, pixels: [...px(1, [7, 13], [9, 16], [41, 13], [39, 16], [9, 34], [39, 34]), ...px(2, [8, 14], [40, 14], [10, 35], [38, 35])] },
    { pixels: [...sparkle(4, 44), ...sparkle(44, 44)] },
  ]));
}

const FOLLUMINE_ICON = iconFrom([
  { shape: mirrorX(union(poly([6, 6], [0.5, 1], [0, 8], [5, 9]), poly([6, 10], [0.5, 10], [1, 15], [6, 13])), 8), tone: 0, shade: 1, pixels: px(2, [2, 5], [13, 5]) },
  { shape: ellipse(8, 12, 3, 3), tone: 0, shade: 1 },
  { shape: ellipse(8, 8, 3.2, 3.5), tone: 2, shade: 3 },
  { shape: ellipse(8, 5, 3.2, 2.6), tone: 1, shade: 2, pixels: [...px(3, [6, 4], [9, 4]), ...px(0, [6, 5], [9, 5]), ...px(3, [7, 5], [10, 5])] },
]);

// ---------- 066 Gonfaron: the donkey that flew, little wings on its back ----------
const D = {
  legs: union(capsule([[16, 37], [16, 44]], 2.6), capsule([[32, 37], [32, 44]], 2.6), capsule([[20, 38], [20, 43]], 2.2), capsule([[28, 38], [28, 43]], 2.2)),
  hooves: union(rect(13, 43, 19, 46), rect(29, 43, 35, 46)),
  wings: mirrorX(poly([15, 26], [5, 18], [2, 21], [4, 25], [2, 28], [8, 31], [15, 31])),
  body: ellipse(24, 32, 11, 8),
  mane: poly([20, 13], [21, 8], [23, 11], [24, 7], [25, 11], [27, 8], [28, 13], [24, 15]),
  ears: mirrorX(capsule([[20, 13], [15, 3]], 2.2)),
  head: ellipse(24, 18, 6.5, 6),
  muzzle: ellipse(24, 25, 5.5, 4),
};

function gonfaronFront() {
  return toRows(paint([
    { shape: D.wings, tone: 0, shade: 1, pixels: px(1, [5, 21], [7, 25], [43, 21], [41, 25]) },
    { shape: D.legs, tone: 1, shade: 2 },
    { shape: D.hooves, tone: 3, outline: false, pixels: px(2, [15, 44], [31, 44]) },
    { shape: D.body, tone: 1, shade: 2, light: { tone: 0, shape: ellipse(24, 35, 5, 3.5) } },
    { shape: D.ears, tone: 1, shade: 2, light: { tone: 0, shape: union(capsule([[19, 11], [16.5, 5]], 0.7), capsule([[29, 11], [31.5, 5]], 0.7)) }, pixels: px(3, [15, 2], [16, 2], [32, 2], [33, 2]) },
    { shape: D.head, tone: 1, shade: 2 },
    { shape: D.mane, tone: 2, shade: 3 },
    { shape: D.muzzle, tone: 0, shade: 1, pixels: [...px(3, [21, 24], [22, 24], [26, 24], [27, 24]), ...stamp(21, 27, ['3333333'])] },
    { pixels: eyes(19, 27, 17) },
  ]));
}

function gonfaronBack() {
  return toRows(paint([
    { shape: D.legs, tone: 1, shade: 2 },
    { shape: D.hooves, tone: 3, outline: false },
    { shape: D.body, tone: 1, shade: 2 },
    { shape: capsule([[24, 36], [25, 42]], 1), tone: 1, shade: 2, pixels: px(2, [24, 42], [25, 43], [26, 43]) },
    { shape: D.ears, tone: 1, shade: 2 },
    { shape: D.head, tone: 1, shade: 2 },
    { shape: union(D.mane, capsule([[24, 14], [24, 26]], 2)), tone: 2, shade: 3 },
    { shape: D.wings, tone: 0, shade: 1, pixels: px(1, [5, 21], [7, 25], [43, 21], [41, 25]) },
  ]));
}

const GONFARON_ICON = iconFrom([
  { shape: mirrorX(capsule([[5, 5], [3, 0.5]], 1.4), 8), tone: 1, shade: 2 },
  { shape: ellipse(8, 7, 4.5, 4), tone: 1, shade: 2 },
  { shape: poly([6, 4], [7, 1.5], [8, 3], [9, 1.5], [10, 4], [8, 5]), tone: 2, shade: 3 },
  { shape: ellipse(8, 12, 4, 3), tone: 0, shade: 1, pixels: [...px(3, [6, 11], [10, 11]), ...stamp(6, 13, ['33333'])] },
  { pixels: [...px(3, [5, 7], [5, 8], [10, 7], [10, 8]), ...px(0, [5, 7], [10, 7])] },
]);

export const line = [
  { id: 'petalune', front: margelleFront(), back: margelleBack(), icon: MARGELLE_ICON },
  { id: 'corolline', front: margolysFront(), back: margolysBack(), icon: MARGOLYS_ICON },
  { id: 'lampyrin', front: folletFront(), back: folletBack(), icon: FOLLET_ICON },
  { id: 'lampyrex', front: follumineFront(), back: follumineBack(), icon: FOLLUMINE_ICON },
  { id: 'bovaillon', front: gonfaronFront(), back: gonfaronBack(), icon: GONFARON_ICON },
];
