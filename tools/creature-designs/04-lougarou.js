// Lignées du Lougarou (057 et 058, Combat), du Truffandec (059 et 060, Normal et Vent) et Warabouc (061, Combat).
// Fiche : docs/bestiaire-folklorique/fiches/057-lougarou.md.
// Tones: 0 highlights and muzzle, 1 light fur, 2 dark fur, 3 ink.
import { capsule, ellipse, eyes, iconFrom, mirrorX, paint, poly, px, rect, stamp, toRows, union } from '../creature-painter.js';

/** Ragged fur edge: a polygon with spikes between the given points. */
const shaggy = (cx, cy, rx, ry, spikes, depth = 2) => {
  const points = [];
  for (let i = 0; i < spikes * 2; i += 1) {
    const angle = (Math.PI * i) / spikes;
    const r = i % 2 ? 1 : 1 + depth / Math.min(rx, ry);
    points.push([cx + Math.cos(angle) * rx * r, cy + Math.sin(angle) * ry * r]);
  }
  return poly(...points);
};

// ---------- 057 Lougarou: shaggy wolf cub, paws up ----------
const W1 = {
  feet: union(ellipse(19, 44.5, 3.4, 1.6), ellipse(29, 44.5, 3.4, 1.6)),
  tail: capsule([[30, 41], [36, 39], [39, 34]], 2.2),
  body: shaggy(24, 37, 7.5, 6.5, 9, 1.5),
  paws: mirrorX(ellipse(15, 33, 3, 2.8)),
  arms: mirrorX(capsule([[19, 37], [15, 34]], 1.8)),
  ears: mirrorX(poly([18, 24], [15, 14], [22, 20])),
  head: shaggy(24, 26, 7.5, 6.5, 10, 1.5),
  muzzle: ellipse(24, 29, 3.8, 2.6),
};

function lougarouFront() {
  return toRows(paint([
    { shape: W1.tail, tone: 2, shade: 3 },
    { shape: W1.feet, tone: 2, shade: 3, pixels: px(3, [17, 45], [19, 45], [29, 45], [31, 45]) },
    { shape: W1.body, tone: 2, shade: 3, light: { tone: 1, shape: ellipse(24, 38, 4, 4) } },
    { shape: W1.arms, tone: 2, shade: 3 },
    { shape: W1.paws, tone: 1, shade: 2, pixels: px(3, [14, 31], [16, 31], [32, 31], [34, 31]) },
    { shape: W1.ears, tone: 2, shade: 3, light: { tone: 1, shape: union(poly([18, 21], [16, 16], [20, 20]), poly([30, 21], [32, 16], [28, 20])) } },
    { shape: W1.head, tone: 2, shade: 3, light: { tone: 1, shape: ellipse(24, 28, 5.5, 3.5) } },
    { shape: W1.muzzle, tone: 0, shade: 1, pixels: [...px(3, [23, 28], [24, 28]), ...stamp(22, 30, ['3..3', '.33.'])] },
    { pixels: [...stamp(19, 23, ['33....33']), ...eyes(19, 27, 24, { height: 2 })] },
  ]));
}

function lougarouBack() {
  return toRows(paint([
    { shape: W1.feet, tone: 2, shade: 3 },
    { shape: W1.paws, tone: 1, shade: 2 },
    { shape: W1.arms, tone: 2, shade: 3 },
    { shape: W1.body, tone: 2, shade: 3, pixels: px(1, [21, 35], [26, 38]) },
    { shape: capsule([[24, 40], [28, 44], [33, 43]], 2.2), tone: 2, shade: 3 },
    { shape: W1.ears, tone: 2, shade: 3 },
    { shape: W1.head, tone: 2, shade: 3, pixels: px(1, [21, 24], [26, 23], [24, 28]) },
  ]));
}

const LOUGAROU_ICON = iconFrom([
  { shape: mirrorX(poly([3.5, 6], [2, 0.5], [6.5, 4]), 8), tone: 2, shade: 3, light: { tone: 1, shape: poly([3.5, 4], [3, 2], [5, 4]) } },
  { shape: shaggy(8, 9, 5.5, 4.5, 8, 1), tone: 2, shade: 3, light: { tone: 1, shape: ellipse(8, 11, 4, 2.5) } },
  { shape: ellipse(8, 11.5, 2.6, 1.8), tone: 0, pixels: [...px(3, [7, 11], [8, 11]), ...px(3, [6, 13], [9, 13])] },
  { pixels: [...px(3, [5, 8], [5, 9], [10, 8], [10, 9]), ...px(0, [5, 8], [10, 8])] },
  { shape: rect(4, 15, 12, 16), tone: 2, outline: false },
]);

// ---------- 058 Louvar: huge wolf reared on its hind legs ----------
const W2 = {
  tail: capsule([[32, 40], [40, 39], [44, 33], [43, 28]], 2.8),
  legs: union(capsule([[18, 36], [16, 43]], 3.4), capsule([[30, 36], [32, 43]], 3.4)),
  feet: union(ellipse(15, 44.6, 4.5, 1.6), ellipse(33, 44.6, 4.5, 1.6)),
  body: shaggy(24, 30, 10, 9.5, 11, 2.5),
  mane: shaggy(24, 22, 10, 5, 9, 3),
  arms: mirrorX(capsule([[15, 24], [10, 31], [11, 36]], 2.8)),
  claws: mirrorX(ellipse(11, 37, 3.4, 2.8)),
  ears: mirrorX(poly([18.5, 12], [15, 1], [23, 9])),
  head: shaggy(24, 15, 8, 6.5, 12, 1.5),
  muzzle: poly([20.5, 15], [27.5, 15], [27, 23], [21, 23]),
};

function louvarFront() {
  return toRows(paint([
    { shape: W2.tail, tone: 2, shade: 3 },
    { shape: W2.legs, tone: 2, shade: 3 },
    { shape: W2.feet, tone: 2, shade: 3, pixels: px(3, [12, 45], [15, 45], [18, 45], [30, 45], [33, 45], [36, 45]) },
    { shape: W2.body, tone: 2, shade: 3, light: { tone: 1, shape: poly([20, 27], [28, 27], [26, 37], [22, 37]) }, pixels: px(2, [23, 30], [25, 33], [24, 36]) },
    { shape: W2.arms, tone: 2, shade: 3 },
    { shape: W2.mane, tone: 2, shade: 3, pixels: px(1, [17, 21], [21, 23], [27, 23], [31, 21]) },
    { shape: W2.claws, tone: 1, shade: 2, pixels: [...stamp(8, 39, ['0.0.0']), ...stamp(36, 39, ['0.0.0'])] },
    { shape: W2.ears, tone: 2, shade: 3, light: { tone: 1, shape: union(poly([19, 9], [16.5, 4], [21, 8]), poly([29, 9], [31.5, 4], [27, 8])) } },
    { shape: W2.head, tone: 2, shade: 3 },
    { shape: W2.muzzle, tone: 1, shade: 2, light: { tone: 0, shape: rect(22, 16, 26, 18) }, pixels: [...stamp(23, 15, ['33', '33']), ...stamp(21, 20, ['333333', '0.00.0', '.3333.'])] },
    // Yellow-white eyes glaring under a heavy brow.
    { pixels: stamp(18, 12, ['3333..3333', '.003..300.']) },
  ]));
}

function louvarBack() {
  return toRows(paint([
    { shape: W2.legs, tone: 2, shade: 3 },
    { shape: W2.feet, tone: 2, shade: 3 },
    { shape: W2.claws, tone: 1, shade: 2 },
    { shape: W2.arms, tone: 2, shade: 3 },
    { shape: W2.body, tone: 2, shade: 3, pixels: px(1, [20, 26], [27, 29], [23, 33], [25, 23]) },
    { shape: W2.mane, tone: 2, shade: 3 },
    { shape: capsule([[24, 36], [30, 42], [38, 42], [42, 37]], 2.8), tone: 2, shade: 3 },
    { shape: W2.ears, tone: 2, shade: 3 },
    { shape: W2.head, tone: 2, shade: 3, pixels: px(1, [21, 13], [26, 12], [24, 17]) },
  ]));
}

const LOUVAR_ICON = iconFrom([
  { shape: mirrorX(poly([3.5, 6], [1.5, 0], [7, 3.5]), 8), tone: 2, shade: 3 },
  { shape: shaggy(8, 8.5, 5.5, 4.5, 9, 1.2), tone: 2, shade: 3 },
  { shape: poly([5, 9], [11, 9], [10.5, 13.5], [5.5, 13.5]), tone: 1, shade: 2, pixels: [...px(3, [7, 9], [8, 9]), ...stamp(5, 11, ['333333', '.0..0.'])] },
  { pixels: stamp(4, 7, ['333..333', '.03..30.']) },
  { shape: rect(3, 15, 13, 16), tone: 2, outline: false },
]);

// ---------- 059 Truffandec: woolly hearth sprite with a curl of smoke ----------
const F1 = {
  feet: union(ellipse(20, 44.6, 2.8, 1.5), ellipse(28, 44.6, 2.8, 1.5)),
  wool: union(...[[24, 35, 9], [16.5, 32, 4], [31.5, 32, 4], [18, 40, 4], [30, 40, 4], [24, 41, 5], [20, 27, 4], [28, 27, 4], [24, 25.5, 4]].map(([x, y, r]) => ellipse(x, y, r, r * 0.9))),
  smoke: capsule([[24, 22], [26, 19], [23, 17], [25, 14]], 1.3),
  face: ellipse(24, 34, 5.5, 4.2),
};

function truffandecFront() {
  return toRows(paint([
    { shape: F1.feet, tone: 2, shade: 3 },
    { shape: F1.smoke, tone: 1, shade: 2 },
    { shape: F1.wool, tone: 0, shade: 1, pixels: px(1, [14, 31], [19, 26], [29, 26], [33, 34], [17, 41], [31, 41], [24, 44]) },
    { shape: F1.face, tone: 1, shade: 2,
      pixels: [...eyes(20, 26, 32), ...stamp(23, 36, ['333']), ...px(2, [19, 35], [29, 35])] },
  ]));
}

function truffandecBack() {
  return toRows(paint([
    { shape: F1.feet, tone: 2, shade: 3 },
    { shape: F1.wool, tone: 0, shade: 1, pixels: px(1, [14, 31], [19, 26], [29, 26], [24, 33], [20, 38], [28, 37], [24, 44]) },
    { shape: F1.smoke, tone: 1, shade: 2 },
  ]));
}

const TRUFFANDEC_ICON = iconFrom([
  { shape: capsule([[8, 3], [9.5, 1.5]], 1), tone: 1, shade: 2 },
  { shape: union(...[[8, 10, 5.5], [3, 8, 2.5], [13, 8, 2.5], [5, 5.5, 2.5], [11, 5.5, 2.5], [8, 13, 3]].map(([x, y, r]) => ellipse(x, y, r, r * 0.9))), tone: 0, shade: 1 },
  { shape: ellipse(8, 9.5, 3.5, 2.8), tone: 1, shade: 2, pixels: [...px(3, [6, 8], [6, 9], [9, 8], [9, 9]), ...px(0, [6, 8], [9, 8]), ...stamp(7, 11, ['33'])] },
]);

// ---------- 060 Truffandor: golden fleece cloud riding the wind ----------
const F2 = {
  gusts: union(capsule([[2, 20], [9, 18], [12, 21]], 1), capsule([[46, 30], [39, 28], [36, 31]], 1), capsule([[4, 36], [9, 34]], 1)),
  wool: union(...[[24, 26, 12], [12, 24, 6], [36, 24, 6], [15, 33, 6], [33, 33, 6], [24, 35, 7], [17, 16, 5.5], [31, 16, 5.5], [24, 13, 6]].map(([x, y, r]) => ellipse(x, y, r, r * 0.85))),
  halo: ellipse(24, 4.5, 7, 2),
  hooves: union(ellipse(19, 42.5, 2.4, 2), ellipse(29, 42.5, 2.4, 2)),
  face: ellipse(24, 25, 7, 5.5),
  horns: mirrorX(capsule([[18.5, 20], [15, 19], [14, 22], [16, 24]], 1.3)),
};

function truffandorFront() {
  return toRows(paint([
    { shape: F2.hooves, tone: 2, shade: 3 },
    { shape: F2.wool, tone: 0, shade: 1, pixels: px(1, [8, 23], [14, 15], [34, 15], [40, 24], [11, 34], [37, 34], [24, 40], [20, 10], [28, 10]) },
    { shape: F2.halo, tone: 1, shade: 2, light: { tone: 0, shape: rect(20, 3, 28, 4) }, pixels: px(3, [24, 5]) },
    { shape: F2.horns, tone: 1, shade: 2 },
    { shape: F2.face, tone: 2, shade: 3, light: { tone: 1, shape: ellipse(24, 28, 3, 1.3) },
      pixels: [...eyes(20, 26, 23), ...stamp(22, 28, ['30003', '.333.'])] },
    { shape: F2.gusts, tone: 1, outline: false, pixels: px(3, [2, 21], [12, 22], [46, 31], [36, 32]) },
  ]));
}

function truffandorBack() {
  return toRows(paint([
    { shape: F2.hooves, tone: 2, shade: 3 },
    { shape: F2.horns, tone: 1, shade: 2 },
    { shape: F2.wool, tone: 0, shade: 1, pixels: px(1, [8, 23], [14, 15], [34, 15], [40, 24], [24, 26], [19, 31], [29, 31], [24, 40]) },
    { shape: F2.halo, tone: 1, shade: 2, light: { tone: 0, shape: rect(20, 3, 28, 4) } },
    { shape: F2.gusts, tone: 1, outline: false },
  ]));
}

const TRUFFANDOR_ICON = iconFrom([
  { shape: ellipse(8, 1.5, 4, 1.2), tone: 1, shade: 2 },
  { shape: union(...[[8, 9, 6], [2.5, 8, 2.5], [13.5, 8, 2.5], [4, 13, 3], [12, 13, 3], [5, 4.5, 2.5], [11, 4.5, 2.5]].map(([x, y, r]) => ellipse(x, y, r, r * 0.9))), tone: 0, shade: 1 },
  { shape: ellipse(8, 9, 3.8, 3), tone: 2, shade: 3, pixels: [...px(3, [6, 8], [6, 9], [9, 8], [9, 9]), ...px(0, [6, 8], [9, 8]), ...stamp(7, 11, ['33'])] },
]);

// ---------- 061 Warabouc: shapeshifting billy goat standing like a wrestler ----------
const G = {
  legs: union(capsule([[19, 36], [18, 43]], 3), capsule([[29, 36], [30, 43]], 3)),
  hooves: union(rect(14.5, 42, 21.5, 46), rect(26.5, 42, 33.5, 46)),
  body: shaggy(24, 31, 9, 8, 10, 1.5),
  arms: mirrorX(capsule([[16, 26], [11, 31], [12, 35]], 2.6)),
  fists: mirrorX(rect(8.5, 34, 15.5, 39)),
  horns: mirrorX(capsule([[19, 13], [13, 9], [8, 11], [7, 16], [10, 19]], 2)),
  ears: mirrorX(poly([17, 17], [11, 19], [17, 20])),
  head: ellipse(24, 16, 6.5, 6.5),
  muzzle: ellipse(24, 20, 3.6, 2.8),
  beard: poly([21.5, 22], [26.5, 22], [25.5, 28], [24, 31], [22.5, 28]),
};

function waraboucFront() {
  return toRows(paint([
    { shape: G.legs, tone: 2, shade: 3 },
    { shape: G.hooves, tone: 3, outline: false, pixels: px(2, [17, 43], [29, 43]) },
    { shape: G.body, tone: 2, shade: 3, light: { tone: 1, shape: ellipse(24, 32, 5, 5.5) } },
    { shape: G.arms, tone: 2, shade: 3 },
    { shape: G.fists, tone: 3, outline: false, pixels: px(2, [10, 35], [12, 35], [36, 35], [38, 35]) },
    { shape: G.horns, tone: 1, shade: 2, light: { tone: 0, shape: union(ellipse(14, 9.5, 2, 0.8), ellipse(34, 9.5, 2, 0.8)) }, pixels: px(2, [11, 11], [9, 14], [37, 11], [39, 14]) },
    { shape: G.ears, tone: 2, shade: 3 },
    { shape: G.head, tone: 1, shade: 2, light: { tone: 0, shape: ellipse(22, 13, 2, 1.2) } },
    { shape: G.muzzle, tone: 0, shade: 1, pixels: [...px(3, [23, 19], [25, 19]), ...stamp(22, 21, ['33333'])] },
    { shape: G.beard, tone: 2, shade: 3, pixels: px(1, [23, 25], [24, 27]) },
    // Goat eyes: horizontal pupils.
    { pixels: stamp(19, 15, ['333..333', '303..303']) },
  ]));
}

function waraboucBack() {
  return toRows(paint([
    { shape: G.legs, tone: 2, shade: 3 },
    { shape: G.hooves, tone: 3, outline: false },
    { shape: G.fists, tone: 3, outline: false },
    { shape: G.arms, tone: 2, shade: 3 },
    { shape: G.body, tone: 2, shade: 3, pixels: px(1, [20, 27], [27, 30], [23, 35]) },
    { shape: poly([22, 37], [26, 37], [24, 41]), tone: 1, shade: 2 },
    { shape: G.ears, tone: 2, shade: 3 },
    { shape: G.head, tone: 1, shade: 2, pixels: px(2, [22, 14], [26, 17]) },
    { shape: G.horns, tone: 1, shade: 2, light: { tone: 0, shape: union(ellipse(14, 9.5, 2, 0.8), ellipse(34, 9.5, 2, 0.8)) } },
  ]));
}

const WARABOUC_ICON = iconFrom([
  { shape: mirrorX(capsule([[5.5, 4], [2, 2], [0.8, 5], [2, 8]], 1.2), 8), tone: 1, shade: 2 },
  { shape: poly([6, 12], [10, 12], [8.5, 15.5], [7.5, 15.5]), tone: 2, shade: 3 },
  { shape: ellipse(8, 7.5, 4.5, 4.5), tone: 1, shade: 2 },
  { shape: ellipse(8, 10.5, 2.6, 1.8), tone: 0, shade: 1, pixels: px(3, [7, 10], [9, 10]) },
  { pixels: stamp(4, 6, ['00....00', '30....30']) },
]);

export const line = [
  { id: 'lougarou', front: lougarouFront(), back: lougarouBack(), icon: LOUGAROU_ICON },
  { id: 'louvar', front: louvarFront(), back: louvarBack(), icon: LOUVAR_ICON },
  { id: 'truffandec', front: truffandecFront(), back: truffandecBack(), icon: TRUFFANDEC_ICON },
  { id: 'truffandor', front: truffandorFront(), back: truffandorBack(), icon: TRUFFANDOR_ICON },
  { id: 'warabouc', front: waraboucFront(), back: waraboucBack(), icon: WARABOUC_ICON },
];
