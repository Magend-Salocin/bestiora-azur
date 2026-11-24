// Lignée de la Coulobre (054 à 056, Eau et Foudre) : serpent ailé de la Fontaine-de-Vaucluse.
// Fiche : docs/bestiaire-folklorique/fiches/054-coulobre.md.
// Tones: 0 belly and sparks, 1 scales, 2 wings and back, 3 ink.
import { capsule, ellipse, eyes, iconFrom, mirrorX, paint, poly, px, rect, stamp, toRows, union } from '../creature-painter.js';

/** Zigzag spark of 1-pixel ink around a light core. */
const bolt = (x, y) => stamp(x, y, ['..33', '.303', '303.', '3033', '.030', '..3.']);
const ripples = stamp(6, 46, ['3333.....3333........3333.....3333']);

// ---------- 054 Coulobrin: little coiled eel with stubby wings ----------
const C1 = {
  coils: union(ellipse(24, 42, 10, 3.6), ellipse(24, 37.5, 7.5, 3.2)),
  tail: capsule([[33, 42], [38, 40], [40, 36]], 1.3),
  neck: capsule([[24, 36], [23, 31], [24, 27]], 3.2),
  wings: mirrorX(poly([20, 30], [12, 24], [11, 28], [13, 31], [19, 33])),
  fins: mirrorX(poly([19, 22], [14, 17], [15, 22], [19, 25])),
  head: ellipse(24, 24, 6.5, 5.5),
  snout: ellipse(24, 27, 3.8, 2.2),
};

function coulobrinFront() {
  return toRows(paint([
    { shape: C1.tail, tone: 1, shade: 2 },
    { shape: C1.coils, tone: 1, shade: 2, light: { tone: 0, shape: union(ellipse(24, 42.5, 6, 1.5), ellipse(24, 38, 4, 1.3)) } },
    { shape: C1.wings, tone: 2, shade: 3, light: { tone: 1, shape: union(poly([13, 26], [18, 30], [14, 29]), poly([35, 26], [30, 30], [34, 29])) } },
    { shape: C1.neck, tone: 1, shade: 2, light: { tone: 0, shape: rect(23, 29, 26, 36) } },
    { shape: C1.fins, tone: 2, shade: 3 },
    { shape: C1.head, tone: 1, shade: 2, light: { tone: 0, shape: ellipse(21, 21, 2, 1.2) }, pixels: px(2, [24, 19], [23, 20], [25, 20]) },
    { shape: C1.snout, tone: 0, shade: 1, pixels: [...px(3, [22, 26], [26, 26]), ...stamp(22, 28, ['33333'])] },
    { pixels: [...eyes(20, 26, 22), ...bolt(38, 31)] },
  ]));
}

function coulobrinBack() {
  return toRows(paint([
    { shape: capsule([[15, 42], [10, 40], [8, 36]], 1.3), tone: 1, shade: 2 },
    { shape: C1.coils, tone: 1, shade: 2, pixels: px(2, [18, 41], [24, 43], [30, 41], [21, 37], [27, 37]) },
    { shape: C1.neck, tone: 1, shade: 2, pixels: px(2, [24, 30], [24, 33]) },
    { shape: C1.fins, tone: 2, shade: 3 },
    { shape: C1.head, tone: 1, shade: 2, pixels: px(2, [24, 20], [22, 23], [26, 23], [24, 26]) },
    { shape: C1.wings, tone: 2, shade: 3, light: { tone: 1, shape: union(poly([13, 26], [18, 30], [14, 29]), poly([35, 26], [30, 30], [34, 29])) } },
    { pixels: bolt(6, 30) },
  ]));
}

const COULOBRIN_ICON = iconFrom([
  { shape: mirrorX(poly([4, 7], [0.5, 3], [1, 8], [4, 10]), 8), tone: 2, shade: 3 },
  { shape: union(ellipse(8, 14, 6, 2), capsule([[8, 13], [8, 9]], 2.5)), tone: 1, shade: 2 },
  { shape: ellipse(8, 7, 5, 4.5), tone: 1, shade: 2 },
  { shape: ellipse(8, 9, 3, 1.8), tone: 0, pixels: px(3, [7, 10], [8, 10]) },
  { pixels: [...px(3, [5, 6], [5, 7], [10, 6], [10, 7]), ...px(0, [5, 6], [10, 6]), ...px(0, [14, 11]), ...px(3, [14, 10], [15, 11], [13, 12])] },
]);

// ---------- 055 Coulobron: serpent rearing up, bat wings spread ----------
const C2 = {
  coils: union(ellipse(24, 42.5, 13, 3.4), ellipse(25, 37.5, 9.5, 3.2)),
  tail: capsule([[36, 42], [42, 40], [44, 35], [42, 31]], 1.4),
  body: capsule([[25, 36], [21, 30], [24, 23], [24, 18]], 3.6),
  wings: mirrorX(poly([20, 24], [8, 10], [3, 12], [5, 17], [2, 21], [7, 24], [5, 29], [12, 29], [19, 29])),
  crest: poly([20, 9], [19, 4], [22, 7], [24, 2], [26, 7], [29, 4], [28, 9]),
  fins: mirrorX(poly([17, 13], [10, 8], [11, 14], [17, 17])),
  head: ellipse(24, 13, 8, 6.3),
  snout: ellipse(24, 17, 4.8, 2.6),
};

function coulobronFront() {
  return toRows(paint([
    { shape: C2.tail, tone: 1, shade: 2 },
    { shape: C2.coils, tone: 1, shade: 2, light: { tone: 0, shape: union(ellipse(24, 43, 8, 1.4), ellipse(25, 38, 5, 1.3)) } },
    { shape: C2.wings, tone: 2, shade: 3, light: { tone: 1, shape: union(poly([5, 14], [17, 25], [7, 20]), poly([43, 14], [31, 25], [41, 20])) }, pixels: px(3, [5, 19], [8, 26], [43, 19], [40, 26]) },
    { shape: C2.body, tone: 1, shade: 2, light: { tone: 0, shape: capsule([[24, 34], [21, 29], [24, 22]], 1.3) } },
    { shape: C2.crest, tone: 0, shade: 1 },
    { shape: C2.fins, tone: 2, shade: 3 },
    { shape: C2.head, tone: 1, shade: 2 },
    { shape: C2.snout, tone: 0, shade: 1, pixels: [...px(3, [22, 15], [26, 15]), ...stamp(20, 18, ['3.......3', '.3333333.'])] },
    { pixels: [...eyes(20, 26, 11), ...bolt(41, 25)] },
  ]));
}

function coulobronBack() {
  return toRows(paint([
    { shape: capsule([[12, 42], [6, 40], [4, 35], [6, 31]], 1.4), tone: 1, shade: 2 },
    { shape: C2.coils, tone: 1, shade: 2, pixels: px(2, [16, 42], [24, 44], [32, 42], [20, 37], [28, 37]) },
    { shape: C2.body, tone: 1, shade: 2, pixels: px(2, [22, 30], [24, 25], [24, 20]) },
    { shape: C2.crest, tone: 0, shade: 1 },
    { shape: C2.fins, tone: 2, shade: 3 },
    { shape: C2.head, tone: 1, shade: 2, pixels: px(2, [22, 12], [26, 12], [24, 15]) },
    { shape: C2.wings, tone: 2, shade: 3, light: { tone: 1, shape: union(poly([5, 14], [17, 25], [7, 20]), poly([43, 14], [31, 25], [41, 20])) } },
    { pixels: bolt(3, 25) },
  ]));
}

const COULOBRON_ICON = iconFrom([
  { shape: mirrorX(poly([4, 8], [0, 1], [0.5, 6], [0, 11], [4, 12]), 8), tone: 2, shade: 3, light: { tone: 1, shape: poly([1, 4], [4, 9], [1, 8]) } },
  { shape: poly([5, 4], [5.5, 0.5], [7, 2], [8, 0], [9, 2], [10.5, 0.5], [11, 4]), tone: 0, shade: 1 },
  { shape: capsule([[8, 10], [7, 15]], 2.5), tone: 1, shade: 2 },
  { shape: ellipse(8, 7, 5, 4.2), tone: 1, shade: 2 },
  { shape: ellipse(8, 9.3, 3.2, 1.8), tone: 0, pixels: stamp(6, 10, ['3...3', '.333.']) },
  { pixels: [...px(3, [5, 6], [5, 7], [10, 6], [10, 7]), ...px(0, [5, 6], [10, 6])] },
]);

// ---------- 056 Coulobre: the winged serpent of the spring, crowned with lightning ----------
const C3 = {
  wings: mirrorX(poly([19, 20], [9, 6], [2, 2], [0.5, 8], [3, 12], [0.5, 17], [4, 21], [1, 26], [7, 29], [6, 34], [13, 33], [19, 28])),
  coils: union(ellipse(24, 41, 15, 3.8), ellipse(24, 35.5, 11, 3.6)),
  body: capsule([[24, 34], [20, 27], [24, 19], [24, 15]], 4.2),
  crest: poly([17, 7], [15, 0.5], [19, 4], [21, 0], [24, 3.5], [27, 0], [29, 4], [33, 0.5], [31, 7]),
  fins: mirrorX(poly([16.5, 10], [9, 5], [10, 12], [16.5, 15])),
  head: ellipse(24, 11, 8.5, 6.5),
  jaw: ellipse(24, 15.5, 6, 3),
  water: union(ellipse(24, 45.5, 22, 2.5), ellipse(8, 43.5, 5, 1.5), ellipse(40, 43.5, 5, 1.5)),
};

function coulobreFront() {
  return toRows(paint([
    { shape: C3.wings, tone: 2, shade: 3, light: { tone: 1, shape: union(poly([2, 5], [16, 20], [3, 11]), poly([46, 5], [32, 20], [45, 11]), poly([3, 22], [15, 27], [5, 26]), poly([45, 22], [33, 27], [43, 26])) },
      pixels: px(3, [3, 15], [4, 21], [8, 31], [45, 15], [44, 21], [40, 31]) },
    { shape: C3.coils, tone: 1, shade: 2, light: { tone: 0, shape: union(ellipse(24, 41.5, 10, 1.5), ellipse(24, 36, 7, 1.4)) }, pixels: px(2, [12, 40], [36, 40], [16, 35], [32, 35]) },
    { shape: C3.body, tone: 1, shade: 2, light: { tone: 0, shape: capsule([[24, 32], [21, 27], [24, 20]], 1.6) },
      pixels: px(3, [22, 31], [23, 31], [21, 27], [22, 27], [23, 23], [24, 23]) },
    { shape: C3.crest, tone: 0, shade: 1, pixels: px(3, [19, 5], [24, 4], [29, 5]) },
    { shape: C3.fins, tone: 2, shade: 3 },
    { shape: C3.head, tone: 1, shade: 2, light: { tone: 0, shape: ellipse(21, 7.5, 2, 1) } },
    { shape: C3.jaw, tone: 0, shade: 1, pixels: [...px(3, [21, 14], [27, 14]), ...stamp(19, 16, ['3333333333', '.0......0.'])] },
    { pixels: [...stamp(18, 9, ['3333....3333']), ...eyes(19, 27, 10, { height: 2 }), ...bolt(1, 36), ...bolt(43, 36)] },
    { shape: C3.water, tone: 1, shade: 2, light: { tone: 0, shape: union(ellipse(8, 43, 2.5, 0.8), ellipse(40, 43, 2.5, 0.8)) }, pixels: ripples },
  ]));
}

function coulobreBack() {
  return toRows(paint([
    { shape: C3.coils, tone: 1, shade: 2, pixels: px(2, [12, 40], [20, 42], [28, 42], [36, 40], [18, 35], [30, 35]) },
    { shape: C3.body, tone: 1, shade: 2, pixels: px(2, [22, 30], [21, 26], [24, 21], [24, 17]) },
    { shape: C3.crest, tone: 0, shade: 1 },
    { shape: C3.fins, tone: 2, shade: 3 },
    { shape: C3.head, tone: 1, shade: 2, pixels: px(2, [21, 9], [27, 9], [24, 12]) },
    { shape: C3.wings, tone: 2, shade: 3, light: { tone: 1, shape: union(poly([2, 5], [16, 20], [3, 11]), poly([46, 5], [32, 20], [45, 11])) } },
    { shape: C3.water, tone: 1, shade: 2, light: { tone: 0, shape: union(ellipse(8, 43, 2.5, 0.8), ellipse(40, 43, 2.5, 0.8)) }, pixels: ripples },
  ]));
}

const COULOBRE_ICON = iconFrom([
  { shape: mirrorX(poly([4, 8], [0, 2], [0.5, 7], [0, 12], [4, 13]), 8), tone: 2, shade: 3, light: { tone: 1, shape: poly([1, 4], [4, 9], [1, 8]) } },
  { shape: poly([3.5, 4], [3, 0], [5.5, 2], [6.5, 0], [8, 2], [9.5, 0], [10.5, 2], [13, 0], [12.5, 4]), tone: 0, shade: 1 },
  { shape: capsule([[8, 11], [8, 15]], 2.8), tone: 1, shade: 2 },
  { shape: ellipse(8, 7, 5, 3.8), tone: 1, shade: 2 },
  { shape: ellipse(8, 10, 3.5, 2), tone: 0, pixels: [...stamp(5, 10, ['333333']), ...px(0, [5, 11], [10, 11])] },
  { pixels: [...px(3, [4, 6], [5, 6], [6, 6], [9, 6], [10, 6], [11, 6], [5, 7], [6, 7], [9, 7], [10, 7]), ...px(0, [6, 7], [10, 7])] },
]);

export const line = [
  { id: 'anguilet', front: coulobrinFront(), back: coulobrinBack(), icon: COULOBRIN_ICON },
  { id: 'anguistral', front: coulobronFront(), back: coulobronBack(), icon: COULOBRON_ICON },
  { id: 'fulmarene', front: coulobreFront(), back: coulobreBack(), icon: COULOBRE_ICON },
];
