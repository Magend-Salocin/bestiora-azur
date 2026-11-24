// Lignée du Follaton (078 et 079 Foudre, 080 Foudre et Métal) : esprit de maison savoyard
// logé dans une lanterne. Fiche : docs/bestiaire-folklorique/fiches/078-follaton.md.
// Tones: 0 glow, 1 glass and tin, 2 iron, 3 ink.
import { capsule, ellipse, iconFrom, minus, mirrorX, paint, poly, px, rect, stamp, toRows, union } from '../creature-painter.js';

const spark = (x, y) => stamp(x, y, ['.3.', '303', '.3.']);
const bolt = (x, y) => stamp(x, y, ['..33', '.303', '303.', '3033', '.030', '..3.']);
const ring = (cx, cy, r, width) => minus(ellipse(cx, cy, r, r), ellipse(cx, cy, r - width, r - width));
/** Face drawn on the glow: two eyes and a small mouth. */
const glowFace = (cx, y) => [...stamp(cx - 3, y, ['3...3', '3...3']), ...stamp(cx - 1, y + 3, ['333'])];

// ---------- 078 Follaton: a spark living in a small tin lantern ----------
const L1 = {
  handle: ring(24, 22, 3.5, 1.2),
  cap: poly([18, 29], [21, 25], [27, 25], [30, 29]),
  glass: ellipse(24, 35, 7, 7),
  base: rect(17, 41, 31, 43),
  feet: union(ellipse(20, 44.6, 2.5, 1.4), ellipse(28, 44.6, 2.5, 1.4)),
};

function follatonFront() {
  return toRows(paint([
    { shape: L1.feet, tone: 2, shade: 3 },
    { shape: L1.handle, tone: 2, outline: false, pixels: px(3, [24, 18]) },
    { shape: L1.glass, tone: 1, shade: 2, light: { tone: 0, shape: ellipse(24, 35, 5, 5) }, pixels: glowFace(24, 33) },
    { shape: L1.cap, tone: 2, shade: 3, light: { tone: 1, shape: rect(21, 26, 24, 27) } },
    { shape: L1.base, tone: 2, shade: 3 },
    { pixels: [...spark(12, 28), ...spark(34, 24), ...bolt(36, 34)] },
  ]));
}

function follatonBack() {
  return toRows(paint([
    { shape: L1.feet, tone: 2, shade: 3 },
    { shape: L1.handle, tone: 2, outline: false, pixels: px(3, [24, 18]) },
    { shape: L1.glass, tone: 1, shade: 2, light: { tone: 0, shape: ellipse(24, 35, 5, 5) }, pixels: px(1, [24, 30], [24, 31], [24, 32], [24, 33], [24, 34], [24, 35], [24, 36], [24, 37], [24, 38], [24, 39]) },
    { shape: L1.cap, tone: 2, shade: 3 },
    { shape: L1.base, tone: 2, shade: 3 },
    { pixels: [...spark(12, 28), ...bolt(36, 34)] },
  ]));
}

const FOLLATON_ICON = iconFrom([
  { shape: ring(8, 3.5, 2.5, 1), tone: 2, outline: false },
  { shape: ellipse(8, 10, 5, 4.8), tone: 1, shade: 2, light: { tone: 0, shape: ellipse(8, 10, 3.3, 3.3) }, pixels: [...px(3, [6, 9], [6, 10], [10, 9], [10, 10]), ...px(3, [7, 12], [8, 12], [9, 12])] },
  { shape: poly([3, 7], [5, 4.5], [11, 4.5], [13, 7]), tone: 2, shade: 3 },
  { shape: rect(3, 14, 13, 16), tone: 2, shade: 3 },
]);

// ---------- 079 Follaclair: a walking lantern that lights the lanes ----------
const L2 = {
  handle: ring(24, 13, 3.5, 1.2),
  cap: poly([15, 22], [19, 16], [29, 16], [33, 22]),
  glass: rect(16, 22, 32, 37),
  bars: union(rect(16, 22, 17, 37), rect(31, 22, 32, 37), rect(16, 21, 32, 23), rect(16, 36, 32, 38)),
  base: poly([15, 37], [33, 37], [31, 40], [17, 40]),
  legs: union(capsule([[20, 40], [19, 44]], 1.8), capsule([[28, 40], [29, 44]], 1.8)),
  arms: mirrorX(capsule([[15, 28], [10, 31], [9, 35]], 1.5)),
};

function follaclairFront() {
  return toRows(paint([
    { shape: L2.legs, tone: 2, shade: 3, pixels: px(3, [17, 45], [18, 45], [30, 45], [31, 45]) },
    { shape: L2.arms, tone: 2, shade: 3 },
    { shape: L2.handle, tone: 2, outline: false, pixels: px(3, [24, 9]) },
    { shape: L2.glass, tone: 1, light: { tone: 0, shape: ellipse(24, 30, 6, 6) }, pixels: glowFace(24, 28) },
    { shape: L2.bars, tone: 2, outline: false },
    { shape: L2.cap, tone: 2, shade: 3, light: { tone: 1, shape: rect(19, 18, 23, 19) } },
    { shape: L2.base, tone: 2, shade: 3 },
    { pixels: [...spark(6, 37), ...spark(39, 37), ...bolt(38, 12), ...spark(8, 14)] },
  ]));
}

function follaclairBack() {
  return toRows(paint([
    { shape: L2.legs, tone: 2, shade: 3 },
    { shape: L2.arms, tone: 2, shade: 3 },
    { shape: L2.handle, tone: 2, outline: false, pixels: px(3, [24, 9]) },
    { shape: L2.glass, tone: 1, light: { tone: 0, shape: ellipse(24, 30, 5, 5) } },
    { shape: union(L2.bars, rect(23, 22, 25, 37)), tone: 2, outline: false },
    { shape: L2.cap, tone: 2, shade: 3 },
    { shape: L2.base, tone: 2, shade: 3 },
    { pixels: [...bolt(38, 12), ...spark(8, 14)] },
  ]));
}

const FOLLACLAIR_ICON = iconFrom([
  { shape: ring(8, 2.5, 2, 0.9), tone: 2, outline: false },
  { shape: rect(3, 5, 13, 12), tone: 1, light: { tone: 0, shape: ellipse(8, 8.5, 3.5, 3) }, pixels: [...px(3, [6, 8], [6, 9], [10, 8], [10, 9]), ...px(3, [7, 11], [8, 11], [9, 11])] },
  { shape: union(rect(3, 5, 4, 12), rect(12, 5, 13, 12)), tone: 2, outline: false },
  { shape: poly([2, 6], [4, 3.5], [12, 3.5], [14, 6]), tone: 2, shade: 3 },
  { shape: poly([2.5, 12], [13.5, 12], [12, 14], [4, 14]), tone: 2, shade: 3 },
  { shape: union(capsule([[6, 14], [5.5, 15]], 1), capsule([[10, 14], [10.5, 15]], 1)), tone: 2 },
]);

// ---------- 080 Follorage: iron storm lantern, lightning caught behind its panes ----------
const L3 = {
  rod: union(rect(23, 3, 25, 12), poly([21, 6], [24, 1], [27, 6])),
  cap: poly([11, 17], [17, 10], [31, 10], [37, 17]),
  glass: rect(13, 17, 35, 35),
  bars: union(rect(13, 17, 15, 35), rect(33, 17, 35, 35), rect(13, 16, 35, 18), rect(13, 34, 35, 36), rect(23, 17, 25, 21)),
  base: poly([11, 35], [37, 35], [35, 39], [13, 39]),
  legs: union(rect(15, 39, 21, 45), rect(27, 39, 33, 45)),
  arms: mirrorX(capsule([[12, 21], [6, 26], [6, 33]], 2.8)),
  fists: mirrorX(ellipse(6, 34, 3.2, 3)),
  rivets: px(0, [16, 13], [24, 13], [32, 13], [14, 37], [24, 37], [34, 37]),
};

function follorageFront() {
  return toRows(paint([
    { shape: L3.legs, tone: 2, shade: 3, light: { tone: 1, shape: union(rect(16, 40, 17, 44), rect(28, 40, 29, 44)) } },
    { shape: L3.arms, tone: 2, shade: 3, light: { tone: 1, shape: capsule([[10, 22], [7, 25]], 0.6) } },
    { shape: L3.fists, tone: 2, shade: 3 },
    { shape: L3.rod, tone: 2, shade: 3 },
    { shape: L3.glass, tone: 1, light: { tone: 0, shape: ellipse(24, 26, 8, 7.5) },
      pixels: [...stamp(18, 24, ['33', '33']), ...stamp(28, 24, ['33', '33']), ...stamp(20, 29, ['3.3.3.3.', '.3.3.3.3'])] },
    { shape: L3.bars, tone: 2, outline: false },
    { shape: L3.cap, tone: 2, shade: 3, light: { tone: 1, shape: rect(17, 11, 22, 12) }, pixels: L3.rivets.slice(0, 3) },
    { shape: L3.base, tone: 2, shade: 3, pixels: L3.rivets.slice(3) },
    { pixels: [...bolt(2, 12), ...bolt(41, 9), ...spark(38, 41), ...spark(7, 41)] },
  ]));
}

function follorageBack() {
  return toRows(paint([
    { shape: L3.legs, tone: 2, shade: 3 },
    { shape: L3.arms, tone: 2, shade: 3 },
    { shape: L3.fists, tone: 2, shade: 3 },
    { shape: L3.rod, tone: 2, shade: 3 },
    { shape: L3.glass, tone: 1, light: { tone: 0, shape: ellipse(24, 26, 7, 7) } },
    { shape: union(L3.bars, rect(23, 17, 25, 35), rect(13, 25, 35, 27)), tone: 2, outline: false },
    { shape: L3.cap, tone: 2, shade: 3, pixels: L3.rivets.slice(0, 3) },
    { shape: L3.base, tone: 2, shade: 3, pixels: L3.rivets.slice(3) },
    { pixels: [...bolt(2, 12), ...bolt(41, 9)] },
  ]));
}

const FOLLORAGE_ICON = iconFrom([
  { shape: union(rect(7, 0, 9, 3)), tone: 2 },
  { shape: mirrorX(capsule([[3, 7], [1, 10], [1.5, 12]], 1.3), 8), tone: 2, shade: 3 },
  { shape: rect(3, 5, 13, 12), tone: 1, light: { tone: 0, shape: ellipse(8, 8.5, 3.5, 3) }, pixels: [...px(3, [6, 7], [6, 8], [10, 7], [10, 8]), ...stamp(5, 10, ['3.3.3.', '.3.3.3'])] },
  { shape: union(rect(3, 5, 4, 12), rect(12, 5, 13, 12)), tone: 2, outline: false },
  { shape: poly([2, 6], [4.5, 2.5], [11.5, 2.5], [14, 6]), tone: 2, shade: 3 },
  { shape: poly([2, 12], [14, 12], [13, 14], [3, 14]), tone: 2, shade: 3 },
  { shape: union(rect(4, 14, 7, 16), rect(9, 14, 12, 16)), tone: 2, shade: 3 },
]);

export const line = [
  { id: 'follaton', front: follatonFront(), back: follatonBack(), icon: FOLLATON_ICON },
  { id: 'follaclair', front: follaclairFront(), back: follaclairBack(), icon: FOLLACLAIR_ICON },
  { id: 'follorage', front: follorageFront(), back: follorageBack(), icon: FOLLORAGE_ICON },
];
