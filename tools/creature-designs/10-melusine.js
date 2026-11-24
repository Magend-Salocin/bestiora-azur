// Lignée de Mélusine (131 Mélusineau et 132 Mélusine, Eau et Arcane) et Nainmarin (133, Eau et Combat).
// Fiche : docs/bestiaire-folklorique/fiches/131-melusine.md.
// Tones: 0 eyes, belly and glints, 1 scales and skin, 2 back, fins and spots, 3 ink.
import { capsule, ellipse, eyes, iconFrom, minus, mirrorX, paint, poly, px, rect, stamp, toRows, union } from '../creature-painter.js';

const sparkle = (x, y) => stamp(x, y, ['.3.', '303', '.3.']);
const bubble = (x, y) => stamp(x, y, ['.3.', '303', '.3.']);
/** Forked fish tail fin pointing right from (x, y). */
const fishTail = (x, y, size) => poly([x, y], [x + size, y - size * 0.9], [x + size * 0.7, y], [x + size, y + size * 0.6]);
/** Fin fan from a root point: spiky rays between two angles (degrees). */
function fan(cx, cy, r, from, to, rays) {
  const points = [[cx, cy]];
  for (let i = 0; i <= rays * 2; i += 1) {
    const angle = ((from + ((to - from) * i) / (rays * 2)) * Math.PI) / 180;
    const radius = i % 2 ? r * 0.8 : r;
    points.push([cx + Math.cos(angle) * radius, cy + Math.sin(angle) * radius]);
  }
  return poly(...points);
}
/** Ink ribs from the root of a fan to each ray tip. */
function ribs(cx, cy, r, from, to, rays) {
  const pixels = [];
  for (let i = 0; i <= rays; i += 1) {
    const angle = ((from + ((to - from) * i) / rays) * Math.PI) / 180;
    for (let t = 0.35; t < 0.9; t += 0.08) pixels.push([Math.round(cx + Math.cos(angle) * r * t), Math.round(cy + Math.sin(angle) * r * t), 2]);
  }
  return pixels;
}
/** Crown of three little towers, the Lusignan castle. */
const turrets = (cx, base, height) => union(
  rect(cx - 5, base - height * 0.7, cx - 2, base), rect(cx - 1.5, base - height, cx + 2, base), rect(cx + 2.5, base - height * 0.7, cx + 5.5, base),
  rect(cx - 5, base - 1.5, cx + 5.5, base + 0.5),
);

// ---------- 131 Mélusineau: a little coiled water snake with a fish tail ----------
const M1 = {
  coil: capsule([[33, 42], [15, 42]], 3.6),
  tail: fishTail(35, 41, 8),
  neck: capsule([[15, 41], [12, 36], [16, 32], [25, 32], [27, 27], [24, 22]], 3.2),
  fins: mirrorX(poly([17.5, 15], [12, 10], [14, 18]), 22.5),
  head: ellipse(22.5, 18, 6, 5),
};

function melusineauFront() {
  return toRows(paint([
    { shape: M1.tail, tone: 2, shade: 3, pixels: px(3, [38, 39], [38, 42]) },
    { shape: M1.coil, tone: 1, shade: 2, light: { tone: 0, shape: rect(16, 43, 32, 44) }, pixels: px(2, [20, 40], [25, 40], [30, 40]) },
    { shape: M1.neck, tone: 1, shade: 2, light: { tone: 0, shape: capsule([[17, 33], [24, 33]], 0.6) }, pixels: px(2, [12, 37], [21, 30], [26, 26]) },
    { shape: M1.fins, tone: 2, shade: 3 },
    { shape: M1.head, tone: 1, shade: 2, pixels: [...eyes(19, 25, 16, { height: 2 }), ...stamp(21, 20, ['3..3', '.33.'])] },
    { pixels: [...bubble(34, 12), ...bubble(38, 20), ...sparkle(7, 24)] },
  ]));
}

function melusineauBack() {
  return toRows(paint([
    { shape: M1.tail, tone: 2, shade: 3 },
    { shape: M1.coil, tone: 2, shade: 3, light: { tone: 1, shape: rect(16, 40, 32, 41) } },
    { shape: M1.neck, tone: 2, shade: 3, light: { tone: 1, shape: capsule([[17, 31], [24, 31]], 0.6) } },
    { shape: M1.fins, tone: 2, shade: 3 },
    { shape: M1.head, tone: 2, shade: 3, light: { tone: 1, shape: ellipse(21, 16, 2.5, 1.5) } },
    { pixels: bubble(34, 12) },
  ]));
}

const MELUSINEAU_ICON = iconFrom([
  { shape: fishTail(12, 14, 3.5), tone: 2, shade: 3 },
  { shape: capsule([[12, 14], [4, 14]], 1.8), tone: 1, shade: 2 },
  { shape: capsule([[4, 13], [3.5, 11], [7, 9.5], [9, 8]], 1.6), tone: 1, shade: 2 },
  { shape: mirrorX(poly([5, 3], [3, 0.5], [4.5, 5]), 8), tone: 2, shade: 3 },
  { shape: ellipse(8, 5.5, 3.6, 3), tone: 1, shade: 2, pixels: [...px(3, [6, 5], [10, 5]), ...px(3, [7, 7], [8, 7], [9, 7])] },
]);

// ---------- 132 Mélusine: the great serpent of Lusignan, fin wings spread, crowned with towers ----------
const M2 = {
  coil: union(capsule([[40, 42], [14, 42]], 4.2), capsule([[14, 42], [9, 38], [14, 33], [22, 34]], 3.8)),
  tail: fishTail(41, 41, 6),
  neck: capsule([[22, 34], [28, 30], [27, 22], [23, 16]], 4),
  wings: union(fan(24, 25, 21, 185, 265, 4), fan(28, 25, 21, 275, 355, 4)),
  wingRibs: [...ribs(24, 25, 21, 185, 265, 4), ...ribs(28, 25, 21, 275, 355, 4)],
  head: union(ellipse(22, 13, 6, 4.5), ellipse(18, 15, 4, 2.6)),
  crown: stamp(17, 3, ['3333.333.3333', '3113.313.3113', '3113331333113', '3111111111113', '3333333333333']),
};

function melusineFront() {
  return toRows(paint([
    { shape: M2.wings, tone: 1, shade: 2, pixels: M2.wingRibs },
    { shape: M2.tail, tone: 2, shade: 3, pixels: px(3, [44, 39], [44, 42]) },
    { shape: M2.coil, tone: 1, shade: 2, light: { tone: 0, shape: rect(15, 44, 38, 45) }, pixels: px(2, [20, 40], [26, 40], [32, 40], [11, 37], [17, 33]) },
    { shape: M2.neck, tone: 1, shade: 2, light: { tone: 0, shape: capsule([[25, 30], [26, 23]], 1) }, pixels: px(2, [29, 27], [29, 22], [26, 18]) },
    { shape: M2.head, tone: 1, shade: 2, pixels: [...eyes(19, 24, 11, { height: 2 }), ...stamp(14, 16, ['33333']), ...px(3, [15, 14])] },
    { pixels: M2.crown },
    { pixels: [...sparkle(3, 34), ...sparkle(44, 31), ...bubble(5, 3)] },
  ]));
}

function melusineBack() {
  return toRows(paint([
    { shape: M2.tail, tone: 2, shade: 3 },
    { shape: M2.coil, tone: 2, shade: 3, light: { tone: 1, shape: rect(15, 40, 38, 41) } },
    { shape: M2.neck, tone: 2, shade: 3, light: { tone: 1, shape: capsule([[27, 28], [27, 22]], 0.8) } },
    { shape: M2.head, tone: 2, shade: 3 },
    { pixels: M2.crown },
    { shape: M2.wings, tone: 1, shade: 2, pixels: M2.wingRibs },
    { pixels: [...sparkle(3, 34), ...sparkle(44, 31)] },
  ]));
}

const MELUSINE_ICON = iconFrom([
  { shape: union(poly([7, 8], [3, 3], [0.5, 6], [1, 11], [6, 11]), poly([9, 8], [13, 3], [15.5, 6], [15, 11], [10, 11])), tone: 1, shade: 2 },
  { shape: capsule([[3, 14.5], [13, 14.5]], 1.4), tone: 1, shade: 2 },
  { shape: capsule([[8, 14], [9, 10], [8, 7]], 1.6), tone: 1, shade: 2 },
  { shape: union(rect(5, 1, 7, 3), rect(7.5, 0, 9, 3), rect(9.5, 1, 11.5, 3)), tone: 2, outline: false },
  { shape: ellipse(8, 5, 3.4, 2.4), tone: 1, shade: 2, pixels: [...px(3, [6, 5], [10, 5])] },
]);

// ---------- 133 Nainmarin: a stout octopus brawler with a tentacle beard and a conch helmet ----------
const N = {
  legs: union(...[[18, 12, 44], [22, 20, 45], [26, 28, 45], [30, 36, 44]].map(([x, tip, y]) => capsule([[x, 38], [(x + tip) / 2, y - 1], [tip, y - 2]], 1.8))),
  arms: mirrorX(capsule([[16, 29], [10, 32], [9, 26]], 2.6)),
  fists: mirrorX(ellipse(9, 23.5, 3.8, 3.5)),
  body: ellipse(24, 34, 9, 7.5),
  shell: poly([16, 18], [20, 10], [26, 5], [31, 9], [32, 18]),
  head: ellipse(24, 21, 9, 6.5),
  beard: union(capsule([[19, 24], [18, 31], [20, 33]], 1.6), capsule([[24, 25], [24, 34]], 1.6), capsule([[29, 24], [30, 31], [28, 33]], 1.6)),
};

function nainmarinFront() {
  return toRows(paint([
    { shape: N.legs, tone: 1, shade: 2, pixels: px(0, [15, 43], [21, 44], [27, 44], [33, 43]) },
    { shape: N.body, tone: 1, shade: 2, pixels: px(2, [18, 36], [30, 35], [26, 39]) },
    { shape: N.arms, tone: 1, shade: 2, pixels: px(0, [11, 31], [37, 31]) },
    { shape: N.fists, tone: 1, shade: 2, light: { tone: 0, shape: union(ellipse(8, 22, 1.5, 1), ellipse(38, 22, 1.5, 1)) } },
    { shape: N.shell, tone: 2, shade: 3, light: { tone: 1, shape: poly([21, 12], [25, 7], [24, 11]) }, pixels: [...px(3, [21, 15], [24, 12], [27, 10], [28, 15])] },
    { shape: N.head, tone: 1, shade: 2, pixels: [...stamp(18, 18, ['3333...3333']), ...stamp(19, 19, ['03.....03', '33.....33']), ...px(2, [16, 21], [32, 21])] },
    { shape: N.beard, tone: 1, shade: 2, pixels: px(2, [19, 27], [24, 29], [29, 27]) },
    { pixels: [...bubble(4, 12), ...bubble(40, 10), ...bubble(42, 36)] },
  ]));
}

function nainmarinBack() {
  return toRows(paint([
    { shape: N.legs, tone: 1, shade: 2 },
    { shape: N.body, tone: 1, shade: 2, pixels: px(2, [20, 33], [28, 35], [24, 38]) },
    { shape: N.arms, tone: 1, shade: 2 },
    { shape: N.fists, tone: 1, shade: 2 },
    { shape: N.head, tone: 1, shade: 2, pixels: px(2, [19, 21], [24, 24], [29, 21]) },
    { shape: N.shell, tone: 2, shade: 3, light: { tone: 1, shape: poly([21, 12], [25, 7], [24, 11]) }, pixels: px(3, [21, 15], [24, 12], [27, 10], [28, 15]) },
  ]));
}

const NAINMARIN_ICON = iconFrom([
  { shape: union(ellipse(2.5, 7, 2.2, 2), ellipse(13.5, 7, 2.2, 2)), tone: 1, shade: 2 },
  { shape: poly([4, 5], [6, 1.5], [9, 0], [12, 4]), tone: 2, shade: 3 },
  { shape: ellipse(8, 7.5, 4.5, 3.2), tone: 1, shade: 2, pixels: [...px(3, [6, 7], [10, 7]), ...px(3, [5, 6], [6, 6], [10, 6], [11, 6])] },
  { shape: union(capsule([[6, 10], [6, 13]], 0.9), capsule([[8, 10], [8, 14]], 0.9), capsule([[10, 10], [10, 13]], 0.9)), tone: 1, shade: 2 },
  { shape: union(ellipse(5, 15, 2, 1), ellipse(11, 15, 2, 1)), tone: 1, shade: 2 },
]);

export const line = [
  { id: 'melusineau', front: melusineauFront(), back: melusineauBack(), icon: MELUSINEAU_ICON },
  { id: 'melusine', front: melusineFront(), back: melusineBack(), icon: MELUSINE_ICON },
  { id: 'nainmarin', front: nainmarinFront(), back: nainmarinBack(), icon: NAINMARIN_ICON },
];
