// Lignée de l'Ankou (093 et 094, Ombre et Feu) et Revenant (095, Ombre).
// Fiche : docs/bestiaire-folklorique/fiches/093-ankou.md.
// Tones: 0 bone glints, flame core and eyes, 1 bone, stone and flame, 2 cloak and moss, 3 ink.
import { capsule, ellipse, iconFrom, minus, mirrorX, paint, poly, px, rect, stamp, toRows, union } from '../creature-painter.js';

/** Ragged hem: a band whose bottom edge zigzags between y0 and y1. */
function hem(x0, x1, y0, y1, teeth) {
  const points = [[x0, y0]];
  const step = (x1 - x0) / teeth;
  for (let i = 0; i < teeth; i += 1) points.push([x0 + step * (i + 0.5), y1], [x0 + step * (i + 1), y0 + (y1 - y0) * 0.35]);
  points.push([x1, y0]);
  return poly(...points);
}
const flame = (x, base, height, half) => poly([x - half, base], [x - half * 0.6, base - height * 0.5], [x, base - height], [x + half * 0.6, base - height * 0.5], [x + half, base]);
const wisp = (x, y) => stamp(x, y, ['.2.', '2.2', '..2', '.2.']);

// ---------- 093 Ankoulet: a small cloaked spirit with a bird skull and a candle flame ----------
const A1 = {
  cloak: union(ellipse(24, 36, 9, 7), hem(15, 33, 37, 45, 4)),
  skull: ellipse(24, 26, 6.5, 5.5),
  beak: poly([21, 29], [27, 29], [24, 36]),
  flame: flame(24, 21, 9, 3),
  wings: mirrorX(poly([16, 33], [10, 31], [8, 37], [12, 36], [11, 40], [16, 38])),
};

function ankouletFront() {
  return toRows(paint([
    { shape: A1.wings, tone: 2, shade: 3 },
    { shape: A1.cloak, tone: 2, shade: 3, light: { tone: 1, shape: ellipse(19, 33, 1.5, 1) } },
    { shape: A1.flame, tone: 1, shade: 2, light: { tone: 0, shape: ellipse(24, 17, 1.2, 2.5) } },
    { shape: A1.skull, tone: 1, shade: 2, light: { tone: 0, shape: ellipse(21, 23, 2, 1) }, pixels: [...stamp(20, 25, ['333..333', '303..303', '333..333'])] },
    { shape: A1.beak, tone: 1, shade: 2, pixels: px(3, [24, 31], [24, 32]) },
    { pixels: [...wisp(8, 20), ...wisp(38, 24)] },
  ]));
}

function ankouletBack() {
  return toRows(paint([
    { shape: A1.wings, tone: 2, shade: 3 },
    { shape: A1.cloak, tone: 2, shade: 3 },
    { shape: union(A1.skull, ellipse(24, 30, 7, 4)), tone: 2, shade: 3, light: { tone: 1, shape: ellipse(22, 24, 2, 1) } },
    { shape: A1.flame, tone: 1, shade: 2, light: { tone: 0, shape: ellipse(24, 17, 1.2, 2.5) } },
    { pixels: wisp(8, 20) },
  ]));
}

const ANKOULET_ICON = iconFrom([
  { shape: flame(8, 4.5, 4.5, 1.8), tone: 1, shade: 2, light: { tone: 0, shape: ellipse(8, 3, 0.6, 1) } },
  { shape: union(ellipse(8, 12, 5, 3.5), hem(3, 13, 12, 16, 3)), tone: 2, shade: 3 },
  { shape: ellipse(8, 7.5, 4, 3.3), tone: 1, shade: 2, pixels: [...px(3, [5, 7], [6, 7], [10, 7], [11, 7]), ...px(0, [6, 7], [10, 7])] },
  { shape: poly([6.5, 9.5], [9.5, 9.5], [8, 13]), tone: 1, shade: 2 },
]);

// ---------- 094 Ankou: a great raven-skulled bird, tattered wings, a scythe-blade tail and a pale flame ----------
const A2 = {
  tail: poly([29, 38], [40, 33], [45, 22], [44, 15], [42, 24], [36, 31], [28, 34]),
  wings: mirrorX(poly([16, 25], [5, 17], [2, 29], [5, 27], [4, 35], [8, 32], [9, 39], [15, 34])),
  legs: union(capsule([[20, 40], [19, 44.5]], 1.2), capsule([[28, 40], [29, 44.5]], 1.2)),
  body: union(ellipse(24, 30, 9, 9), hem(15, 33, 33, 42, 4)),
  crest: poly([16, 17], [18, 7], [21, 12], [24, 5], [27, 12], [30, 7], [32, 17]),
  skull: ellipse(24, 17, 6, 5.5),
  beak: poly([20.5, 20], [27.5, 20], [24, 31]),
  flame: flame(8, 14, 8, 3),
};

function ankouFront() {
  return toRows(paint([
    { shape: A2.tail, tone: 1, shade: 2, light: { tone: 0, shape: poly([43, 18], [44, 16], [42, 23]) } },
    { shape: A2.wings, tone: 2, shade: 3, light: { tone: 1, shape: poly([12, 21], [6, 19], [6, 21]) } },
    { shape: A2.legs, tone: 1, shade: 2, pixels: px(3, [17, 45], [18, 45], [21, 45], [27, 45], [30, 45], [31, 45]) },
    { shape: A2.body, tone: 2, shade: 3, pixels: px(3, [20, 31], [28, 31], [24, 36]) },
    { shape: A2.crest, tone: 2, shade: 3 },
    { shape: A2.skull, tone: 1, shade: 2, light: { tone: 0, shape: ellipse(21, 14, 1.5, 0.8) }, pixels: stamp(20, 16, ['333..333', '303..303', '333..333']) },
    { shape: A2.beak, tone: 1, shade: 2, pixels: px(3, [24, 23], [24, 24], [24, 25]) },
    { shape: A2.flame, tone: 1, shade: 2, light: { tone: 0, shape: ellipse(8, 10, 1.2, 2) } },
    { pixels: [...wisp(39, 40), ...wisp(3, 40)] },
  ]));
}

function ankouBack() {
  return toRows(paint([
    { shape: A2.legs, tone: 1, shade: 2 },
    { shape: A2.body, tone: 2, shade: 3 },
    { shape: A2.wings, tone: 2, shade: 3, light: { tone: 1, shape: poly([12, 21], [6, 19], [6, 21]) }, pixels: px(3, [10, 27], [38, 27], [11, 32], [37, 32]) },
    { shape: union(A2.crest, ellipse(24, 17, 6.5, 6)), tone: 2, shade: 3, light: { tone: 1, shape: ellipse(21, 13, 2, 1.2) } },
    { shape: A2.tail, tone: 1, shade: 2 },
    { shape: A2.flame, tone: 1, shade: 2, light: { tone: 0, shape: ellipse(8, 10, 1.2, 2) } },
  ]));
}

const ANKOU_ICON = iconFrom([
  { shape: poly([10, 13], [14, 10], [15.5, 4], [13, 9], [10, 11]), tone: 1, shade: 2 },
  { shape: mirrorX(poly([5, 9], [1, 6], [0.5, 12], [4, 13]), 8), tone: 2, shade: 3 },
  { shape: ellipse(8, 11.5, 4, 3.5), tone: 2, shade: 3 },
  { shape: poly([4, 6], [5, 1], [8, 3], [11, 1], [12, 6]), tone: 2, shade: 3 },
  { shape: ellipse(8, 6, 3, 2.6), tone: 1, shade: 2, pixels: [...px(3, [6, 6], [10, 6]), ...px(0, [6, 5])] },
  { shape: poly([6.5, 7.5], [9.5, 7.5], [8, 12]), tone: 1, shade: 2 },
]);

// ---------- 095 Revenant: a cracked headstone that climbs back out of its grave ----------
const R = {
  mound: union(ellipse(24, 44.5, 16, 2.5), ellipse(24, 42.5, 11, 2.5)),
  stone: union(ellipse(24, 16, 10, 9), rect(14, 16, 35, 42)),
  crack: poly([24, 7], [22, 13], [26, 19], [21, 26], [25, 31], [23.5, 31], [19.5, 26], [24.5, 19], [20.5, 13], [22.5, 7]),
  moss: union(ellipse(15, 37, 3, 4), ellipse(33, 30, 2.5, 3), ellipse(19, 8.5, 3, 1.5)),
  chain: capsule([[13, 31], [24, 35], [35, 31]], 1.2),
  arms: mirrorX(capsule([[14, 24], [9, 27], [7, 32]], 1.8)),
};

function revenantFront() {
  return toRows(paint([
    { shape: R.arms, tone: 2, shade: 3, pixels: px(1, [6, 33], [8, 33], [40, 33], [42, 33]) },
    { shape: R.stone, tone: 1, shade: 2, light: { tone: 0, shape: poly([16, 14], [19, 9], [17, 24]) }, pixels: stamp(17, 20, ['33........33', '30........30', '33........33']) },
    { shape: R.crack, tone: 3, outline: false },
    { shape: R.moss, tone: 2, outline: false },
    { shape: R.chain, tone: 2, shade: 3, pixels: px(0, [16, 32], [20, 34], [28, 34], [32, 32]) },
    { shape: R.mound, tone: 2, shade: 3, light: { tone: 1, shape: ellipse(14, 42.5, 3, 1) }, pixels: px(3, [11, 45], [30, 44], [37, 45]) },
    { pixels: [...wisp(6, 10), ...wisp(39, 8), ...wisp(41, 20)] },
  ]));
}

function revenantBack() {
  return toRows(paint([
    { shape: R.arms, tone: 2, shade: 3 },
    { shape: R.stone, tone: 1, shade: 2, light: { tone: 0, shape: poly([16, 14], [19, 9], [17, 24]) }, pixels: px(2, [20, 20], [27, 25], [23, 33]) },
    { shape: R.moss, tone: 2, outline: false },
    { shape: R.chain, tone: 2, shade: 3 },
    { shape: R.mound, tone: 2, shade: 3 },
    { pixels: [...wisp(6, 10), ...wisp(39, 8)] },
  ]));
}

const REVENANT_ICON = iconFrom([
  { shape: union(ellipse(8, 5.5, 5, 4.5), rect(3, 5, 14, 14)), tone: 1, shade: 2, pixels: [...px(3, [8, 2], [7, 4], [8, 6], [7, 8]), ...px(3, [5, 8], [11, 8])] },
  { shape: ellipse(8, 14.5, 7.5, 1.5), tone: 2, shade: 3 },
  { shape: ellipse(4, 12, 1.5, 1.5), tone: 2, outline: false },
]);

export const line = [
  { id: 'ankoulet', front: ankouletFront(), back: ankouletBack(), icon: ANKOULET_ICON },
  { id: 'ankou', front: ankouFront(), back: ankouBack(), icon: ANKOU_ICON },
  { id: 'revenant', front: revenantFront(), back: revenantBack(), icon: REVENANT_ICON },
];
