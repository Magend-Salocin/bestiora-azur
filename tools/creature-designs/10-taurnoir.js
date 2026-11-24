// Taurnoir (138, Feu) : le taureau noir des légendes. Mallet (139, Métal et Feu) : le cheval Mallet du Poitou.
// Fiche : docs/bestiaire-folklorique/fiches/138-taurnoir.md.
// Tones: 0 eyes, embers and fire cores, 1 horns, flames and steel, 2 hide and iron, 3 ink.
import { capsule, ellipse, iconFrom, mirrorX, paint, poly, px, rect, stamp, toRows, union } from '../creature-painter.js';

const ember = (x, y) => stamp(x, y, ['.3.', '303', '.3.']);
const puff = (x, y) => stamp(x, y, ['.11.', '1001', '.11.']);
/** Flame tongues rising from a base line: [x, base, height, half width] each. */
const flames = (list) => union(...list.map(([x, base, height, half]) => poly([x - half, base], [x - half * 0.4, base - height * 0.6], [x + half * 0.3, base - height], [x + half * 0.2, base - height * 0.5], [x + half, base])));

// ---------- 138 Taurnoir: a black bull, head lowered, fire snorting from its nostrils ----------
const T = {
  legs: union(capsule([[14, 36], [14, 44]], 3), capsule([[34, 36], [34, 44]], 3), capsule([[19, 38], [19, 44]], 2.6), capsule([[29, 38], [29, 44]], 2.6)),
  body: ellipse(24, 30, 15, 10),
  hump: ellipse(24, 21, 10, 6),
  horns: mirrorX(capsule([[16, 24], [9, 22], [5, 16], [6, 11]], 1.8)),
  head: ellipse(24, 30, 7.5, 7),
  muzzle: ellipse(24, 36, 5, 3.2),
};

function taurnoirFront() {
  return toRows(paint([
    { shape: T.legs, tone: 2, shade: 3, pixels: px(1, [12, 45], [13, 45], [15, 45], [16, 45], [32, 45], [33, 45], [35, 45], [36, 45]) },
    { shape: union(T.body, T.hump), tone: 2, shade: 3, light: { tone: 1, shape: ellipse(18, 19, 4, 1.5) }, pixels: px(3, [12, 30], [36, 30], [14, 35], [34, 35]) },
    { shape: T.horns, tone: 1, shade: 2, light: { tone: 0, shape: union(ellipse(6, 13, 0.8, 2), ellipse(42, 13, 0.8, 2)) } },
    { shape: T.head, tone: 2, shade: 3, pixels: [...stamp(19, 27, ['000...000', '.03...30.'])] },
    { shape: T.muzzle, tone: 1, shade: 2, pixels: [...px(3, [22, 36], [26, 36]), ...stamp(22, 38, ['33333'])] },
    { pixels: [...puff(15, 37), ...puff(30, 37), ...ember(9, 6), ...ember(37, 4)] },
  ]));
}

function taurnoirBack() {
  return toRows(paint([
    { shape: T.legs, tone: 2, shade: 3 },
    { shape: union(T.body, T.hump), tone: 2, shade: 3, light: { tone: 1, shape: union(ellipse(19, 19, 4, 1.5), rect(23, 22, 25, 36)) } },
    { shape: T.horns, tone: 1, shade: 2 },
    { shape: capsule([[24, 36], [24, 42]], 1), tone: 2, shade: 3, pixels: px(3, [24, 43]) },
    { pixels: [...ember(9, 6), ...ember(37, 4)] },
  ]));
}

const TAURNOIR_ICON = iconFrom([
  { shape: mirrorX(capsule([[5, 7], [2, 5], [1.5, 1.5]], 1), 8), tone: 1, shade: 2 },
  { shape: ellipse(8, 9.5, 5.5, 5), tone: 2, shade: 3, pixels: [...px(0, [5, 8], [10, 8])] },
  { shape: ellipse(8, 13, 3.2, 2), tone: 1, shade: 2, pixels: px(3, [7, 13], [9, 13]) },
]);

// ---------- 139 Mallet: an iron-shod night horse with a mane of fire ----------
const H = {
  tail: flames([[40, 30, 10, 2.5], [43, 32, 8, 2.2]]),
  legsBack: union(capsule([[17, 34], [16, 43]], 1.8), capsule([[35, 34], [36, 43]], 1.8)),
  legsFront: union(capsule([[13, 34], [11, 43]], 2), capsule([[32, 34], [31, 43]], 2)),
  body: ellipse(25, 29, 13, 7),
  neck: poly([10, 30], [8, 18], [14, 15], [19, 26]),
  head: union(ellipse(9, 16, 4.5, 4), poly([6, 15], [1, 19], [3, 22], [8, 20])),
  ears: poly([10, 13], [12, 7], [13, 13]),
  mane: flames([[12, 17, 9, 2.4], [15, 21, 10, 2.6], [18, 25, 9, 2.4]]),
  shoes: union(rect(9, 43, 14, 45), rect(14, 43, 19, 45), rect(29, 43, 34, 45), rect(34, 43, 39, 45)),
};

function malletFront() {
  return toRows(paint([
    { shape: H.tail, tone: 1, shade: 2, light: { tone: 0, shape: ellipse(41, 27, 1, 2) } },
    { shape: H.legsBack, tone: 2, shade: 3 },
    { shape: H.body, tone: 2, shade: 3, light: { tone: 1, shape: union(ellipse(24, 25, 7, 1.5), rect(14, 29, 37, 30)) }, pixels: px(0, [16, 27], [22, 27], [28, 27], [34, 27]) },
    { shape: H.legsFront, tone: 2, shade: 3, light: { tone: 1, shape: union(rect(11, 36, 12, 41), rect(30, 36, 31, 41)) } },
    { shape: H.shoes, tone: 1, shade: 2, pixels: px(0, [11, 43], [31, 43]) },
    { shape: H.neck, tone: 2, shade: 3 },
    { shape: H.ears, tone: 2, shade: 3 },
    { shape: H.head, tone: 2, shade: 3, light: { tone: 1, shape: rect(3, 19, 8, 20) }, pixels: [...stamp(8, 14, ['00', '03']), ...px(3, [2, 19])] },
    { shape: H.mane, tone: 1, shade: 2, light: { tone: 0, shape: union(ellipse(15, 15, 0.8, 2), ellipse(18, 19, 0.8, 2)) } },
    { pixels: [...ember(22, 7), ...ember(44, 40), ...ember(2, 30)] },
  ]));
}

function malletBack() {
  return toRows(paint([
    { shape: H.legsFront, tone: 2, shade: 3 },
    { shape: H.shoes, tone: 1, shade: 2 },
    { shape: H.head, tone: 2, shade: 3 },
    { shape: H.ears, tone: 2, shade: 3 },
    { shape: H.neck, tone: 2, shade: 3 },
    { shape: H.body, tone: 2, shade: 3, light: { tone: 1, shape: rect(14, 24, 37, 25) }, pixels: px(0, [18, 28], [25, 28], [32, 28]) },
    { shape: H.legsBack, tone: 2, shade: 3 },
    { shape: union(H.mane, flames([[22, 23, 8, 2.4], [27, 23, 7, 2.2]])), tone: 1, shade: 2, light: { tone: 0, shape: ellipse(15, 15, 0.8, 2) } },
    { shape: H.tail, tone: 1, shade: 2 },
    { pixels: [...ember(22, 7), ...ember(44, 40)] },
  ]));
}

const MALLET_ICON = iconFrom([
  { shape: flames([[7, 8, 6, 1.6], [9, 10, 6, 1.6]]), tone: 1, shade: 2 },
  { shape: poly([5, 11], [4, 5], [7, 4], [9, 11]), tone: 2, shade: 3 },
  { shape: union(ellipse(4.5, 4.5, 2.6, 2.2), poly([3, 4], [0.5, 6.5], [2, 7.5], [5, 6])), tone: 2, shade: 3, pixels: px(0, [4, 4]) },
  { shape: ellipse(10.5, 11, 5, 2.6), tone: 2, shade: 3 },
  { shape: union(rect(6, 13, 7, 15), rect(13, 13, 14, 15)), tone: 2 },
  { shape: union(rect(5, 15, 8, 16), rect(12, 15, 15, 16)), tone: 1 },
]);

export const line = [
  { id: 'pyrobelier', front: taurnoirFront(), back: taurnoirBack(), icon: TAURNOIR_ICON },
  { id: 'enclumor', front: malletFront(), back: malletBack(), icon: MALLET_ICON },
];
