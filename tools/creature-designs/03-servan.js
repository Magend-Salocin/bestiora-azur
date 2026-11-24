// Lignée du Servan (044 à 046, Métal, Combat au stade 3) : lutin savoyard gardien des richesses.
// Fiche : docs/bestiaire-folklorique/fiches/042-houlin.md.
// Tones: 0 shine and skin highlights, 1 skin and metal, 2 armor and helmet, 3 ink.
import { capsule, ellipse, eyes, iconFrom, minus, mirrorX, paint, poly, px, rect, stamp, toRows, union } from '../creature-painter.js';

/** Keyhole: round top and a short stem. */
const keyhole = (x, y) => stamp(x, y, ['.33.', '3333', '3333', '.33.', '3333']);

// ---------- 044 Servan: little goblin under an iron pot, holding a big key ----------
const S1 = {
  key: union(capsule([[35, 30], [35, 42]], 1), ellipse(35, 28, 3, 3), rect(35, 38, 38, 39.5), rect(35, 41, 38, 42.5)),
  keyRing: ellipse(35, 28, 1.2, 1.2),
  feet: union(ellipse(19, 44.6, 3.4, 1.6), ellipse(29, 44.6, 3.4, 1.6)),
  body: ellipse(24, 37.5, 7.5, 6.5),
  arms: union(capsule([[17.5, 35], [16, 40]], 1.6), capsule([[30, 35], [34, 36]], 1.6)),
  ears: mirrorX(poly([18, 25], [7, 21], [10, 26], [18, 31])),
  head: ellipse(24, 28, 7.5, 6.5),
  helmet: union(minus(ellipse(24, 25, 9, 8), rect(0, 25, 48, 48)), rect(14, 24, 34, 26.5)),
  nose: ellipse(24, 30, 2.4, 2),
};

function servanFront() {
  return toRows(paint([
    { shape: S1.feet, tone: 2, shade: 3 },
    { shape: S1.body, tone: 1, shade: 2, light: { tone: 0, shape: ellipse(22, 37, 3, 3) }, pixels: [...stamp(17, 40, ['33333333333333']), ...px(0, [24, 40])] },
    { shape: S1.arms, tone: 1, shade: 2 },
    { shape: S1.key, tone: 1, shade: 2, light: { tone: 0, shape: rect(34, 30, 35, 37) } },
    { shape: S1.keyRing, tone: -1, outline: false, pixels: px(3, [35, 28]) },
    { shape: S1.ears, tone: 1, shade: 2, light: { tone: 0, shape: poly([16, 26], [10, 22.5], [16, 28]) } },
    { shape: S1.head, tone: 1, shade: 2 },
    { shape: S1.helmet, tone: 2, shade: 3, light: { tone: 1, shape: union(ellipse(20, 20, 2.5, 1.5), rect(15, 24, 33, 25)) }, pixels: px(0, [19, 19], [16, 24], [17, 24]) },
    { shape: S1.nose, tone: 0, shade: 1 },
    { pixels: [...eyes(19, 27, 27), ...stamp(20, 32, ['30000003', '.333333.'])] },
  ]));
}

function servanBack() {
  return toRows(paint([
    { shape: S1.feet, tone: 2, shade: 3 },
    { shape: S1.arms, tone: 1, shade: 2 },
    { shape: S1.body, tone: 1, shade: 2, pixels: stamp(17, 40, ['33333333333333']) },
    { shape: S1.ears, tone: 1, shade: 2 },
    { shape: S1.head, tone: 1, shade: 2 },
    { shape: union(S1.helmet, ellipse(24, 27, 8, 5)), tone: 2, shade: 3, light: { tone: 1, shape: ellipse(21, 20, 3, 1.5) }, pixels: px(3, [24, 30], [23, 31]) },
    { shape: union(capsule([[13, 30], [13, 42]], 1), ellipse(13, 28, 3, 3), rect(10, 38, 13, 39.5)), tone: 1, shade: 2 },
  ]));
}

const SERVAN_ICON = iconFrom([
  { shape: mirrorX(poly([4, 8], [0, 5], [4, 10]), 8), tone: 1, shade: 2 },
  { shape: ellipse(8, 9, 5, 4.5), tone: 1, shade: 2 },
  { shape: union(minus(ellipse(8, 6.5, 6, 5.5), rect(0, 6.5, 16, 16)), rect(1.5, 5.5, 14.5, 7.5)), tone: 2, shade: 3, light: { tone: 1, shape: ellipse(5.5, 3, 1.5, 1) } },
  { shape: union(capsule([[14, 9], [14, 15]], 0.8), ellipse(14, 9, 1.8, 1.8)), tone: 1, shade: 2 },
  { pixels: [...px(3, [5, 8], [5, 9], [10, 8], [10, 9]), ...px(0, [5, 8], [10, 8]), ...px(0, [7, 10], [8, 10]), ...stamp(6, 12, ['3333'])] },
  { shape: ellipse(8, 15, 3.5, 1.2), tone: 1, shade: 2 },
]);

// ---------- 045 Servarmure: goblin in armor beaten from pots and coins ----------
const S2 = {
  legs: union(capsule([[19, 38], [18, 43]], 2.6), capsule([[29, 38], [30, 43]], 2.6)),
  feet: union(ellipse(17.5, 44.6, 4, 1.6), ellipse(30.5, 44.6, 4, 1.6)),
  body: ellipse(24, 32, 10, 8.5),
  plate: poly([17, 26], [31, 26], [32, 34], [24, 39], [16, 34]),
  pauldrons: mirrorX(ellipse(14, 27, 4.5, 3.5)),
  arms: mirrorX(capsule([[13, 29], [12, 36]], 2.4)),
  fists: mirrorX(ellipse(12, 37.5, 3, 2.6)),
  ears: mirrorX(poly([18, 14], [5, 8], [9, 15], [18, 20])),
  head: ellipse(24, 17, 7.5, 6.5),
  helmet: union(minus(ellipse(24, 14, 9.5, 8.5), rect(0, 14, 48, 48)), rect(13.5, 13, 34.5, 15.5)),
  crest: poly([22, 7], [24, 1.5], [26, 7]),
  nose: ellipse(24, 19, 2.4, 2),
};

function servarmureFront() {
  return toRows(paint([
    { shape: S2.legs, tone: 2, shade: 3 },
    { shape: S2.feet, tone: 2, shade: 3, light: { tone: 1, shape: union(ellipse(16, 44, 1.5, 0.8), ellipse(29, 44, 1.5, 0.8)) } },
    { shape: S2.body, tone: 1, shade: 2 },
    { shape: S2.plate, tone: 2, shade: 3, light: { tone: 1, shape: poly([18, 27], [22, 27], [19, 32]) }, pixels: [...keyhole(23, 29), ...px(0, [19, 28])] },
    { shape: S2.arms, tone: 1, shade: 2 },
    { shape: S2.fists, tone: 2, shade: 3, light: { tone: 1, shape: union(ellipse(11, 37, 1, 1), ellipse(37, 37, 1, 1)) } },
    { shape: S2.pauldrons, tone: 2, shade: 3, light: { tone: 0, shape: union(ellipse(13, 26, 1.5, 1), ellipse(35, 26, 1.5, 1)) } },
    { shape: S2.ears, tone: 1, shade: 2, light: { tone: 0, shape: poly([16, 15], [9, 10], [16, 17]) } },
    { shape: S2.head, tone: 1, shade: 2 },
    { shape: S2.crest, tone: 1, shade: 2 },
    { shape: S2.helmet, tone: 2, shade: 3, light: { tone: 1, shape: union(ellipse(20, 9, 2.5, 1.5), rect(14.5, 13, 33.5, 14)) }, pixels: px(0, [19, 8], [16, 13], [17, 13]) },
    { shape: S2.nose, tone: 0, shade: 1 },
    { pixels: [...eyes(19, 27, 16), ...stamp(20, 21, ['30000003', '.333333.'])] },
  ]));
}

function servarmureBack() {
  return toRows(paint([
    { shape: S2.legs, tone: 2, shade: 3 },
    { shape: S2.feet, tone: 2, shade: 3 },
    { shape: S2.arms, tone: 1, shade: 2 },
    { shape: S2.fists, tone: 2, shade: 3 },
    { shape: S2.body, tone: 2, shade: 3, light: { tone: 1, shape: ellipse(21, 28, 3, 2) }, pixels: px(3, [24, 26], [24, 30], [24, 34]) },
    // Big key slung across the back.
    { shape: union(capsule([[17, 37], [31, 25]], 1), ellipse(32, 23.5, 3, 3), rect(16, 34, 18, 37)), tone: 1, shade: 2, pixels: px(3, [32, 23]) },
    { shape: S2.pauldrons, tone: 2, shade: 3 },
    { shape: S2.ears, tone: 1, shade: 2 },
    { shape: S2.crest, tone: 1, shade: 2 },
    { shape: union(S2.helmet, ellipse(24, 16, 8, 5.5)), tone: 2, shade: 3, light: { tone: 1, shape: ellipse(21, 9, 3, 1.5) } },
  ]));
}

const SERVARMURE_ICON = iconFrom([
  { shape: mirrorX(poly([4, 8], [0, 4], [4, 10]), 8), tone: 1, shade: 2 },
  { shape: poly([7, 3], [8, 0], [9, 3]), tone: 1, shade: 2 },
  { shape: ellipse(8, 9, 5, 4.2), tone: 1, shade: 2 },
  { shape: union(minus(ellipse(8, 6.5, 6, 5), rect(0, 6.5, 16, 16)), rect(1.5, 5.5, 14.5, 7.5)), tone: 2, shade: 3, light: { tone: 1, shape: ellipse(5.5, 3.5, 1.5, 1) } },
  { shape: poly([3, 13], [13, 13], [12, 16], [4, 16]), tone: 2, shade: 3, pixels: px(3, [8, 14], [8, 15]) },
  { pixels: [...px(3, [5, 8], [5, 9], [10, 8], [10, 9]), ...px(0, [5, 8], [10, 8]), ...stamp(6, 11, ['3003'])] },
]);

// ---------- 046 Servargent: silver-clad guardian of hidden treasure ----------
const S3 = {
  legs: union(capsule([[17, 37], [15, 42]], 3.6), capsule([[31, 37], [33, 42]], 3.6)),
  boots: union(ellipse(14.5, 44.2, 5, 2.2), ellipse(33.5, 44.2, 5, 2.2)),
  body: poly([13, 20], [35, 20], [37, 30], [32, 39], [16, 39], [11, 30]),
  plate: poly([16, 22], [32, 22], [33, 31], [24, 37], [15, 31]),
  belt: rect(15, 35, 33, 38),
  arms: mirrorX(capsule([[9, 24], [7, 33]], 3.2)),
  fists: mirrorX(ellipse(6.5, 36, 5, 4.5)),
  pauldrons: mirrorX(ellipse(9.5, 21, 6.5, 4.5)),
  ears: mirrorX(poly([18, 10], [4, 3], [8, 10], [18, 16])),
  head: ellipse(24, 13, 7, 6),
  helmet: union(minus(ellipse(24, 11, 9, 8.5), rect(0, 11, 48, 48)), rect(14, 10, 34, 12.5)),
  nose: ellipse(24, 15.5, 2.4, 2),
  crest: poly([21, 4], [24, 0], [27, 4]),
};

function servargentFront() {
  return toRows(paint([
    { shape: S3.legs, tone: 2, shade: 3 },
    { shape: S3.boots, tone: 2, shade: 3, light: { tone: 1, shape: union(ellipse(12.5, 43.5, 2, 0.8), ellipse(31.5, 43.5, 2, 0.8)) } },
    { shape: S3.arms, tone: 2, shade: 3 },
    { shape: S3.body, tone: 2, shade: 3 },
    { shape: S3.plate, tone: 1, shade: 2, light: { tone: 0, shape: poly([17, 23], [22, 23], [18, 29]) }, pixels: [...keyhole(23, 27), ...px(2, [28, 25], [30, 29])] },
    { shape: S3.belt, tone: 2, shade: 3, pixels: [...stamp(22, 35, ['3333', '3003', '3333'])] },
    { shape: S3.fists, tone: 1, shade: 2, light: { tone: 0, shape: union(ellipse(5, 34.5, 1.8, 1.2), ellipse(43, 34.5, 1.8, 1.2)) },
      pixels: px(3, [3, 38], [5, 39], [7, 39], [9, 38], [39, 38], [41, 39], [43, 39], [45, 38]) },
    { shape: S3.pauldrons, tone: 1, shade: 2, light: { tone: 0, shape: union(ellipse(8, 19.5, 2.5, 1.3), ellipse(40, 19.5, 2.5, 1.3)) }, pixels: px(3, [6, 23], [9, 24], [12, 23], [36, 23], [39, 24], [42, 23]) },
    { shape: S3.ears, tone: 1, shade: 2, light: { tone: 0, shape: poly([16, 11], [9, 6], [16, 13]) } },
    { shape: S3.head, tone: 1, shade: 2 },
    { shape: S3.crest, tone: 1, shade: 2 },
    { shape: S3.helmet, tone: 1, shade: 2, light: { tone: 0, shape: union(ellipse(20, 5, 2.5, 1.5), rect(15, 10, 33, 11)) } },
    { shape: S3.nose, tone: 0, shade: 1 },
    { pixels: [...stamp(18, 12, ['3333....3333']), ...eyes(19, 27, 13, { height: 2 }), ...stamp(19, 18, ['3333333333', '.0.0..0.0.'])] },
  ]));
}

function servargentBack() {
  return toRows(paint([
    { shape: S3.legs, tone: 2, shade: 3 },
    { shape: S3.boots, tone: 2, shade: 3 },
    { shape: S3.arms, tone: 2, shade: 3 },
    { shape: S3.fists, tone: 1, shade: 2 },
    { shape: S3.body, tone: 2, shade: 3, light: { tone: 1, shape: poly([14, 21], [20, 21], [15, 27]) } },
    // Treasure chest strapped on the back.
    { shape: rect(16, 23, 32, 35), tone: 1, shade: 2, light: { tone: 0, shape: rect(17, 24, 31, 25) },
      pixels: [...stamp(16, 27, ['3333333333333333']), ...keyhole(22, 29), ...px(2, [18, 31], [29, 32])] },
    { shape: S3.belt, tone: 2, shade: 3 },
    { shape: S3.pauldrons, tone: 1, shade: 2 },
    { shape: S3.ears, tone: 1, shade: 2 },
    { shape: S3.crest, tone: 1, shade: 2 },
    { shape: union(S3.helmet, ellipse(24, 13, 8, 6)), tone: 1, shade: 2, light: { tone: 0, shape: ellipse(20, 5, 2.5, 1.5) } },
  ]));
}

const SERVARGENT_ICON = iconFrom([
  { shape: mirrorX(poly([4, 7], [0, 2], [4, 9]), 8), tone: 1, shade: 2 },
  { shape: poly([7, 2.5], [8, 0], [9, 2.5]), tone: 1, shade: 2 },
  { shape: union(minus(ellipse(8, 6.5, 6, 5.5), rect(0, 6.5, 16, 16)), rect(2, 5.5, 14, 11)), tone: 1, shade: 2, light: { tone: 0, shape: ellipse(5.5, 3, 1.5, 1) } },
  { shape: ellipse(8, 9.5, 4, 2.5), tone: 1, shade: 2, pixels: [...px(3, [5, 8], [6, 8], [9, 8], [10, 8]), ...px(0, [6, 9], [10, 9]), ...px(3, [5, 9], [9, 9]), ...stamp(6, 11, ['3333'])] },
  { shape: union(ellipse(2.5, 13.5, 2.5, 2), ellipse(13.5, 13.5, 2.5, 2), rect(4, 12, 12, 16)), tone: 2, shade: 3, pixels: px(3, [8, 13], [8, 14]) },
]);

export const line = [
  { id: 'servan', front: servanFront(), back: servanBack(), icon: SERVAN_ICON },
  { id: 'servarmure', front: servarmureFront(), back: servarmureBack(), icon: SERVARMURE_ICON },
  { id: 'servargent', front: servargentFront(), back: servargentBack(), icon: SERVARGENT_ICON },
];
