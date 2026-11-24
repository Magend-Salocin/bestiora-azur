// Lignées du Lycastre (084 et 085, Terre) et de la Câme-Cruse (086 et 087, Insecte et Ombre).
// Fiche : docs/bestiaire-folklorique/fiches/084-lycastre.md.
// Tones: 0 eyes, teeth and silk, 1 skin, 2 soil and dark carapace, 3 ink.
import { capsule, ellipse, iconFrom, minus, mirrorX, paint, poly, px, rect, stamp, toRows, union } from '../creature-painter.js';

/** Ink rings across a capsule path, one every `step` pixels along y between y0 and y1. */
const segments = (x0, x1, y0, y1, step) => {
  const pixels = [];
  for (let y = y0; y <= y1; y += step) for (let x = x0; x <= x1; x += 1) pixels.push([x, y, 2]);
  return pixels;
};
const pebbles = (list) => list.map(([x, y]) => [x, y, 3]);
/** Thin silk line between two points. */
function thread(x0, y0, x1, y1) {
  const pixels = [];
  const steps = Math.max(Math.abs(x1 - x0), Math.abs(y1 - y0));
  for (let i = 0; i <= steps; i += 1) pixels.push([Math.round(x0 + ((x1 - x0) * i) / steps), Math.round(y0 + ((y1 - y0) * i) / steps), 2]);
  return pixels;
}

// ---------- 084 Lycastre: a burrowing worm rising from its mound ----------
const W1 = {
  mound: union(ellipse(24, 44, 14, 3), ellipse(24, 42.5, 8, 2.5)),
  body: capsule([[25, 42], [22, 35], [26, 28], [24, 23]], 4.5),
  head: ellipse(24, 19, 6.5, 5.5),
  frill: mirrorX(poly([18, 17], [13, 12], [19, 14])),
};

function lycastreFront() {
  return toRows(paint([
    { shape: W1.frill, tone: 2, shade: 3 },
    { shape: W1.body, tone: 1, shade: 2, light: { tone: 0, shape: capsule([[21, 36], [23, 30]], 0.8) }, pixels: [...segments(20, 29, 27, 40, 4)] },
    { shape: W1.mound, tone: 2, shade: 3, light: { tone: 1, shape: ellipse(16, 43, 3, 1) }, pixels: pebbles([[13, 45], [33, 44], [36, 46]]) },
    { shape: W1.head, tone: 1, shade: 2, light: { tone: 0, shape: ellipse(21, 16, 2, 1) }, pixels: [...stamp(21, 18, ['3..3', '3..3']), ...stamp(22, 21, ['33'])] },
    { pixels: pebbles([[8, 40], [10, 38], [39, 39]]) },
  ]));
}

function lycastreBack() {
  return toRows(paint([
    { shape: W1.frill, tone: 2, shade: 3 },
    { shape: W1.body, tone: 1, shade: 2, pixels: segments(20, 29, 27, 40, 4) },
    { shape: W1.head, tone: 1, shade: 2, pixels: segments(19, 29, 19, 19, 4) },
    { shape: W1.mound, tone: 2, shade: 3, pixels: pebbles([[13, 45], [33, 44]]) },
  ]));
}

const LYCASTRE_ICON = iconFrom([
  { shape: mirrorX(poly([5, 4], [2, 1], [6, 2.5]), 8), tone: 2, shade: 3 },
  { shape: capsule([[8, 14], [7, 10], [8, 7]], 2.5), tone: 1, shade: 2, pixels: segments(6, 10, 10, 13, 3) },
  { shape: ellipse(8, 5.5, 3.6, 3), tone: 1, shade: 2, pixels: px(3, [7, 5], [9, 5]) },
  { shape: ellipse(8, 15, 7, 1.5), tone: 2, shade: 3 },
]);

// ---------- 085 Lycastron: a giant worm that shakes the villages, its round maw ringed with fangs ----------
const W2 = {
  mound: union(ellipse(24, 44.5, 22, 2.5), ellipse(10, 42, 5, 2.5), ellipse(40, 42, 5, 2.5)),
  body: capsule([[33, 44], [38, 36], [32, 28], [22, 25]], 7),
  plates: union(poly([37, 30], [44, 25], [40, 33]), poly([40, 37], [47, 35], [42, 40]), poly([31, 24], [34, 16], [35, 26])),
  head: ellipse(17, 20, 10, 9),
  maw: ellipse(15, 21, 5.5, 5),
};

function lycastronFront() {
  return toRows(paint([
    { shape: W2.plates, tone: 2, shade: 3 },
    { shape: W2.body, tone: 1, shade: 2, light: { tone: 0, shape: capsule([[34, 31], [37, 35]], 0.8) },
      pixels: [...thread(26, 23, 26, 32), ...thread(31, 26, 29, 33), ...thread(35, 31, 31, 36), ...thread(38, 37, 33, 39)] },
    { shape: W2.mound, tone: 2, shade: 3, light: { tone: 1, shape: ellipse(9, 41, 2, 1) }, pixels: pebbles([[20, 46], [28, 45], [14, 46]]) },
    { shape: W2.head, tone: 1, shade: 2, light: { tone: 0, shape: ellipse(12, 13, 3, 1.5) } },
    { shape: W2.maw, tone: 3, outline: false, pixels: px(0, [12, 17], [15, 16], [18, 17], [20, 20], [19, 24], [16, 26], [13, 25], [10, 22], [10, 19]) },
    { pixels: [...stamp(22, 13, ['00', '03']), ...stamp(7, 13, ['00', '30']), ...pebbles([[4, 35], [6, 33], [44, 18]])] },
  ]));
}

function lycastronBack() {
  return toRows(paint([
    { shape: W2.plates, tone: 2, shade: 3 },
    { shape: W2.body, tone: 1, shade: 2, pixels: [...thread(26, 23, 26, 32), ...thread(31, 26, 29, 33), ...thread(35, 31, 31, 36), ...thread(38, 37, 33, 39)] },
    { shape: W2.head, tone: 1, shade: 2, pixels: [...thread(13, 12, 11, 28), ...thread(19, 11, 19, 29)] },
    { shape: W2.mound, tone: 2, shade: 3, pixels: pebbles([[20, 46], [28, 45]]) },
  ]));
}

const LYCASTRON_ICON = iconFrom([
  { shape: capsule([[11, 15], [13, 10], [9, 7]], 3), tone: 1, shade: 2 },
  { shape: ellipse(6, 7, 5, 4.6), tone: 1, shade: 2 },
  { shape: ellipse(5.5, 7.5, 2.6, 2.4), tone: 3, outline: false, pixels: px(0, [4, 6], [6, 6], [7, 8], [4, 9]) },
  { shape: ellipse(8, 15.5, 8, 1), tone: 2, shade: 3 },
]);

// ---------- 086 Câmecru: a one-legged cave grub with a single great eye ----------
const K1 = {
  leg: capsule([[24, 36], [27, 40], [24, 44]], 2.4),
  foot: ellipse(23, 45, 4, 1.4),
  body: ellipse(24, 28, 9, 8.5),
  palps: mirrorX(capsule([[17, 33], [14, 36]], 1.1)),
  eye: ellipse(24, 27, 5, 4.5),
  pupil: ellipse(24.5, 27.5, 2, 2.5),
};

function camecruFront() {
  return toRows(paint([
    { pixels: thread(24, 0, 24, 19) },
    { shape: K1.leg, tone: 1, shade: 2, pixels: px(3, [27, 40]) },
    { shape: K1.foot, tone: 1, shade: 2 },
    { shape: K1.palps, tone: 2, shade: 3 },
    { shape: K1.body, tone: 2, shade: 3, light: { tone: 1, shape: ellipse(18, 23, 1.5, 1.5) } },
    { shape: K1.eye, tone: 0, shade: 1 },
    { shape: K1.pupil, tone: 3, outline: false, pixels: px(0, [24, 26]) },
    { pixels: stamp(21, 33, ['3.3.3.3']) },
  ]));
}

function camecruBack() {
  return toRows(paint([
    { pixels: thread(24, 0, 24, 19) },
    { shape: K1.leg, tone: 1, shade: 2 },
    { shape: K1.foot, tone: 1, shade: 2 },
    { shape: K1.palps, tone: 2, shade: 3 },
    { shape: K1.body, tone: 2, shade: 3, light: { tone: 1, shape: ellipse(20, 24, 2.5, 2) }, pixels: px(1, [24, 25], [21, 30], [27, 30]) },
  ]));
}

const CAMECRU_ICON = iconFrom([
  { pixels: thread(8, 0, 8, 2) },
  { shape: capsule([[8, 11], [9, 13], [8, 15]], 1.2), tone: 1, shade: 2 },
  { shape: ellipse(8, 7.5, 5.5, 5), tone: 2, shade: 3 },
  { shape: ellipse(8, 7, 3, 2.7), tone: 0, shade: 1 },
  { shape: ellipse(8.5, 7.5, 1.2, 1.5), tone: 3, outline: false },
]);

// ---------- 087 Câmecruse: a stilt-legged weaver of cave webs, her single eye wide open ----------
const K2 = {
  web: [...thread(0, 0, 14, 14), ...thread(0, 14, 14, 14), ...thread(14, 0, 14, 14), ...thread(4, 0, 4, 9), ...thread(0, 6, 9, 6),
    ...thread(47, 0, 34, 13), ...thread(34, 0, 34, 13), ...thread(47, 13, 34, 13), ...thread(42, 0, 42, 8), ...thread(47, 6, 39, 6)],
  leg: capsule([[24, 32], [29, 37], [24, 44]], 2.8),
  foot: ellipse(23, 45, 5, 1.5),
  arms: mirrorX(union(capsule([[16, 21], [10, 19], [6, 12], [8, 6]], 1.4), capsule([[16, 28], [10, 28], [5, 22], [4, 16]], 1.4))),
  abdomen: ellipse(24, 13, 7, 6),
  body: ellipse(24, 25, 10, 9),
  eye: ellipse(24, 24, 6, 5.5),
  pupil: minus(ellipse(24, 24.5, 1.5, 4), rect(0, 0, 48, 20)),
};

function camecruseFront() {
  return toRows(paint([
    { pixels: K2.web },
    { shape: K2.arms, tone: 2, shade: 3 },
    { shape: K2.leg, tone: 1, shade: 2, light: { tone: 0, shape: capsule([[25, 34], [27, 36]], 0.5) }, pixels: px(3, [29, 37]) },
    { shape: K2.foot, tone: 1, shade: 2 },
    { shape: K2.abdomen, tone: 2, shade: 3, light: { tone: 1, shape: ellipse(21, 11, 2, 1.5) }, pixels: px(0, [24, 10], [22, 14], [26, 14]) },
    { shape: K2.body, tone: 2, shade: 3 },
    { shape: K2.eye, tone: 0, shade: 1 },
    { shape: ellipse(24, 24.5, 1.6, 4), tone: 3, outline: false, pixels: px(0, [24, 22]) },
    { pixels: stamp(19, 31, ['3.3.3.3.3.3']) },
  ]));
}

function camecruseBack() {
  return toRows(paint([
    { pixels: K2.web },
    { shape: K2.arms, tone: 2, shade: 3 },
    { shape: K2.leg, tone: 1, shade: 2 },
    { shape: K2.foot, tone: 1, shade: 2 },
    { shape: K2.body, tone: 2, shade: 3 },
    { shape: ellipse(24, 17, 9, 8), tone: 2, shade: 3, light: { tone: 1, shape: ellipse(20, 14, 2.5, 2) }, pixels: px(0, [24, 14], [20, 19], [28, 19], [24, 21]) },
  ]));
}

const CAMECRUSE_ICON = iconFrom([
  { shape: mirrorX(capsule([[4, 6], [1.5, 4], [2, 1]], 0.9), 8), tone: 2, shade: 3 },
  { shape: capsule([[8, 12], [10, 14], [8, 15.5]], 1.2), tone: 1, shade: 2 },
  { shape: ellipse(8, 7.5, 5, 5), tone: 2, shade: 3 },
  { shape: ellipse(8, 7, 3, 3), tone: 0, shade: 1 },
  { shape: ellipse(8, 7.5, 0.8, 2), tone: 3, outline: false },
]);

export const line = [
  { id: 'lombrin', front: lycastreFront(), back: lycastreBack(), icon: LYCASTRE_ICON },
  { id: 'lombrigant', front: lycastronFront(), back: lycastronBack(), icon: LYCASTRON_ICON },
  { id: 'filandrin', front: camecruFront(), back: camecruBack(), icon: CAMECRU_ICON },
  { id: 'filandrix', front: camecruseFront(), back: camecruseBack(), icon: CAMECRUSE_ICON },
];
