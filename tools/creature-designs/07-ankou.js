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

// ---------- 094 Ankou: the tall reaper with a raven skull, its scythe and a pale flame ----------
const A2 = {
  handle: capsule([[38, 6], [40, 44]], 1),
  blade: poly([38, 5], [26, 4], [16, 8], [26, 7], [38, 9]),
  cloak: union(poly([16, 16], [32, 16], [38, 38], [10, 38]), hem(10, 38, 36, 45, 6)),
  hood: ellipse(24, 15, 8, 7.5),
  skull: ellipse(24, 16, 5, 4.5),
  beak: poly([21, 18], [27, 18], [24, 29]),
  arm: capsule([[30, 22], [36, 26], [38, 25]], 2.2),
  hand: ellipse(38.5, 25, 2, 2),
  armLeft: capsule([[17, 22], [11, 28], [10, 31]], 2),
  flame: flame(10, 36, 8, 3),
};

function ankouFront() {
  return toRows(paint([
    { shape: A2.handle, tone: 2, shade: 3 },
    { shape: A2.blade, tone: 1, shade: 2, light: { tone: 0, shape: poly([30, 6], [22, 6], [30, 7]) } },
    { shape: A2.cloak, tone: 2, shade: 3, light: { tone: 3, shape: poly([22, 24], [26, 24], [28, 40], [20, 40]) }, pixels: px(1, [14, 30], [33, 31]) },
    { shape: A2.armLeft, tone: 2, shade: 3 },
    { shape: A2.flame, tone: 1, shade: 2, light: { tone: 0, shape: ellipse(10, 32, 1.2, 2) } },
    { shape: A2.hood, tone: 2, shade: 3, light: { tone: 1, shape: ellipse(19, 11, 2, 1.5) } },
    { shape: A2.skull, tone: 1, shade: 2, light: { tone: 0, shape: ellipse(22, 13, 1.5, 0.8) }, pixels: stamp(21, 15, ['33..33', '30..03']) },
    { shape: A2.beak, tone: 1, shade: 2, pixels: px(3, [24, 21], [24, 22], [24, 23]) },
    { shape: A2.arm, tone: 2, shade: 3 },
    { shape: A2.hand, tone: 1, shade: 2 },
    { pixels: [...wisp(3, 14), ...wisp(5, 41)] },
  ]));
}

function ankouBack() {
  return toRows(paint([
    { shape: A2.flame, tone: 1, shade: 2, light: { tone: 0, shape: ellipse(10, 32, 1.2, 2) } },
    { shape: A2.cloak, tone: 2, shade: 3, pixels: px(3, [24, 26], [24, 32], [20, 38], [28, 38]) },
    { shape: A2.armLeft, tone: 2, shade: 3 },
    { shape: A2.hood, tone: 2, shade: 3, light: { tone: 1, shape: ellipse(20, 11, 2.5, 2) } },
    { shape: A2.handle, tone: 2, shade: 3 },
    { shape: A2.blade, tone: 1, shade: 2 },
    { shape: A2.arm, tone: 2, shade: 3 },
    { shape: A2.hand, tone: 1, shade: 2 },
  ]));
}

const ANKOU_ICON = iconFrom([
  { shape: capsule([[13, 1], [14, 15]], 0.6), tone: 2 },
  { shape: poly([13, 1], [6, 0.5], [3, 2.5], [8, 2], [13, 3]), tone: 1, shade: 2 },
  { shape: union(poly([5, 7], [11, 7], [13, 15.5], [3, 15.5])), tone: 2, shade: 3 },
  { shape: ellipse(8, 6.5, 4, 3.5), tone: 2, shade: 3 },
  { shape: ellipse(8, 7, 2.5, 2.2), tone: 1, outline: false, pixels: [...px(3, [7, 7], [9, 7])] },
  { shape: poly([6.5, 8], [9.5, 8], [8, 12]), tone: 1, shade: 2 },
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
