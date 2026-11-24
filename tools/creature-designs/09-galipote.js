// Lignées de la Galipote (121 et 122, Toxique et Ombre) et du Matagot (123 et 124, Ombre).
// Fiche : docs/bestiaire-folklorique/fiches/121-galipote.md.
// Tones: 0 eyes, coins and highlights, 1 mist and pale fur, 2 dark fur, 3 ink.
import { capsule, ellipse, iconFrom, mirrorX, paint, poly, px, stamp, toRows, union } from '../creature-painter.js';

const puffs = (list) => union(...list.map(([x, y, r]) => ellipse(x, y, r, r * 0.8)));
const glint = (x, y) => stamp(x, y, ['.3.', '303', '.3.']);

// ---------- 121 Galipotin: a small night prowler trailing a sickly mist ----------
const P1 = {
  mist: puffs([[38, 20, 3], [42, 15, 2.5], [35, 15, 2], [8, 44, 3], [40, 44, 3]]),
  tail: capsule([[34, 37], [38, 31], [38, 24]], 2.6),
  legs: union(capsule([[17, 40], [17, 44]], 1.8), capsule([[22, 41], [22, 44]], 1.8), capsule([[30, 40], [31, 44]], 1.8), capsule([[34, 40], [35, 44]], 1.8)),
  body: ellipse(26, 37, 10, 5.5),
  ears: union(ellipse(11, 28, 2.2, 2.2), ellipse(18, 28, 2.2, 2.2)),
  head: ellipse(14, 33, 6.5, 5.5),
  snout: ellipse(9, 35, 3, 2.2),
};

function galipotinFront() {
  return toRows(paint([
    { shape: P1.mist, tone: 1, shade: 2 },
    { shape: P1.tail, tone: 2, shade: 3, light: { tone: 1, shape: ellipse(37, 26, 0.8, 2) } },
    { shape: P1.legs, tone: 2, shade: 3 },
    { shape: P1.body, tone: 2, shade: 3, light: { tone: 1, shape: ellipse(24, 41, 6, 1.2) } },
    { shape: P1.ears, tone: 2, shade: 3, pixels: px(1, [11, 28], [18, 28]) },
    { shape: union(P1.head, P1.snout), tone: 2, shade: 3, light: { tone: 1, shape: ellipse(10, 37, 3, 1) }, pixels: [...px(3, [6, 34]), ...stamp(11, 31, ['00..00', '.3...3'])] },
  ]));
}

function galipotinBack() {
  return toRows(paint([
    { shape: P1.mist, tone: 1, shade: 2 },
    { shape: union(capsule([[19, 40], [19, 44]], 1.8), capsule([[29, 40], [29, 44]], 1.8)), tone: 2, shade: 3 },
    { shape: ellipse(24, 36, 8, 7), tone: 2, shade: 3 },
    { shape: union(ellipse(24, 27, 6, 5), ellipse(19.5, 23, 2.2, 2.2), ellipse(28.5, 23, 2.2, 2.2)), tone: 2, shade: 3 },
    { shape: capsule([[28, 41], [34, 38], [36, 31]], 2.6), tone: 2, shade: 3, light: { tone: 1, shape: ellipse(35, 33, 0.8, 2) } },
  ]));
}

const GALIPOTIN_ICON = iconFrom([
  { shape: puffs([[13, 3, 2.2], [15, 7, 1.5]]), tone: 1, shade: 2 },
  { shape: capsule([[11, 12], [13, 8], [13, 5]], 1.5), tone: 2, shade: 3 },
  { shape: ellipse(9, 12, 4.5, 3), tone: 2, shade: 3 },
  { shape: union(ellipse(5, 9, 4, 3.5), ellipse(2.5, 6, 1.4, 1.4), ellipse(7, 5.5, 1.4, 1.4)), tone: 2, shade: 3, pixels: px(0, [3, 8], [6, 8]) },
  { shape: union(ellipse(6, 15, 1.2, 1), ellipse(12, 15, 1.2, 1)), tone: 2 },
]);

// ---------- 122 Galipote: a great beast caught in mid-leap, wrapped in poison mist ----------
const P2 = {
  mist: puffs([[36, 42, 4], [43, 39, 3], [29, 44, 3], [44, 10, 3], [40, 6, 2.5], [46, 4, 2]]),
  tail: capsule([[35, 26], [41, 20], [42, 12]], 2.8),
  hind: union(capsule([[34, 31], [38, 37], [40, 44]], 2.6), capsule([[30, 32], [32, 38], [31, 44]], 2.4)),
  fore: union(capsule([[14, 30], [9, 36], [4, 38]], 2.4), capsule([[17, 31], [14, 38], [10, 41]], 2.4)),
  body: capsule([[16, 26], [33, 28]], 7),
  mane: poly([10, 18], [14, 13], [18, 16], [21, 12], [24, 17], [27, 15], [27, 23], [12, 26]),
  ears: union(poly([8, 17], [6, 9], [12, 15]), poly([13, 15], [14, 8], [17, 15])),
  head: ellipse(10, 21, 7, 5.5),
  jaw: poly([2, 22], [11, 23], [9, 27], [3, 25]),
};

function galipoteFront() {
  return toRows(paint([
    { shape: P2.mist, tone: 1, shade: 2 },
    { shape: P2.tail, tone: 2, shade: 3 },
    { shape: P2.hind, tone: 2, shade: 3, pixels: px(3, [39, 45], [41, 45], [30, 45], [32, 45]) },
    { shape: P2.body, tone: 2, shade: 3, light: { tone: 1, shape: ellipse(24, 33, 7, 1.3) } },
    { shape: P2.fore, tone: 2, shade: 3, pixels: px(1, [3, 38], [9, 42]) },
    { shape: P2.mane, tone: 1, shade: 2, pixels: px(2, [16, 18], [21, 17], [24, 21]) },
    { shape: P2.ears, tone: 2, shade: 3 },
    { shape: P2.head, tone: 2, shade: 3 },
    { shape: P2.jaw, tone: 3, outline: false, pixels: px(0, [3, 23], [5, 23], [7, 23], [4, 25], [6, 25]) },
    { pixels: stamp(8, 19, ['000', '.03']) },
  ]));
}

function galipoteBack() {
  return toRows(paint([
    { shape: P2.mist, tone: 1, shade: 2 },
    { shape: union(capsule([[16, 38], [14, 44]], 3), capsule([[32, 38], [34, 44]], 3)), tone: 2, shade: 3 },
    { shape: ellipse(24, 32, 11, 10), tone: 2, shade: 3 },
    { shape: poly([14, 26], [16, 17], [20, 20], [24, 15], [28, 20], [32, 17], [34, 26], [24, 30]), tone: 1, shade: 2, pixels: px(2, [20, 23], [24, 20], [28, 23]) },
    { shape: union(poly([17, 18], [16, 9], [21, 15]), poly([31, 18], [32, 9], [27, 15])), tone: 2, shade: 3 },
    { shape: capsule([[30, 38], [38, 33], [41, 25]], 2.8), tone: 2, shade: 3 },
  ]));
}

const GALIPOTE_ICON = iconFrom([
  { shape: puffs([[13, 13, 2.5], [9, 14.5, 1.8]]), tone: 1, shade: 2 },
  { shape: capsule([[12, 8], [14, 4]], 1.5), tone: 2, shade: 3 },
  { shape: capsule([[6, 9], [12, 10]], 3), tone: 2, shade: 3 },
  { shape: capsule([[11, 12], [13, 15]], 1.2), tone: 2, shade: 3 },
  { shape: capsule([[5, 11], [2, 14]], 1.2), tone: 2, shade: 3 },
  { shape: union(ellipse(4, 6.5, 3.5, 3), poly([2, 4.5], [2, 1], [4.5, 4])), tone: 2, shade: 3, pixels: [...px(0, [3, 6], [4, 6]), ...px(3, [1, 8], [2, 8])] },
]);

// ---------- 123 Matagri: a grey kitten that follows whoever feeds it ----------
const T1 = {
  tail: capsule([[31, 42], [37, 40], [38, 34], [35, 31]], 1.8),
  feet: union(ellipse(20, 44.6, 2.6, 1.4), ellipse(28, 44.6, 2.6, 1.4)),
  body: ellipse(24, 38, 7, 6.5),
  ears: mirrorX(poly([15.5, 25], [15, 15], [21.5, 21])),
  head: ellipse(24, 27, 9, 7.5),
};

function matagriFront() {
  return toRows(paint([
    { shape: T1.tail, tone: 1, shade: 2, pixels: px(2, [36, 36], [37, 39]) },
    { shape: T1.feet, tone: 1, shade: 2 },
    { shape: T1.body, tone: 1, shade: 2, light: { tone: 0, shape: ellipse(24, 40, 3.5, 3.5) }, pixels: px(2, [19, 35], [29, 35]) },
    { shape: T1.ears, tone: 1, shade: 2, light: { tone: 0, shape: mirrorX(poly([16.5, 23], [16.5, 18], [19.5, 22])) } },
    { shape: T1.head, tone: 1, shade: 2, pixels: [...px(2, [22, 21], [24, 20], [26, 21])] },
    { pixels: [...stamp(18, 25, ['333...333', '303...303', '333...333']), ...stamp(23, 29, ['3.3', '.3.']), ...px(2, [14, 29], [15, 30], [34, 29], [33, 30])] },
  ]));
}

function matagriBack() {
  return toRows(paint([
    { shape: T1.feet, tone: 1, shade: 2 },
    { shape: T1.body, tone: 1, shade: 2, pixels: px(2, [21, 36], [24, 35], [27, 36]) },
    { shape: capsule([[25, 43], [31, 44], [35, 40], [34, 35]], 1.8), tone: 1, shade: 2 },
    { shape: T1.ears, tone: 1, shade: 2 },
    { shape: T1.head, tone: 1, shade: 2, pixels: px(2, [20, 24], [24, 23], [28, 24], [22, 28], [26, 28]) },
  ]));
}

const MATAGRI_ICON = iconFrom([
  { shape: mirrorX(poly([3, 6], [3, 0.5], [7, 4]), 8), tone: 1, shade: 2 },
  { shape: ellipse(8, 8, 5.5, 4.5), tone: 1, shade: 2, pixels: [...px(3, [5, 7], [5, 8], [11, 7], [11, 8]), ...px(0, [5, 7], [11, 7]), ...px(3, [8, 10])] },
  { shape: ellipse(8, 13.5, 4, 2.5), tone: 1, shade: 2 },
]);

// ---------- 124 Matagot: the sorcerer's black cat, sitting on its hoard ----------
const T2 = {
  coins: union(ellipse(9, 44, 4, 2), ellipse(9, 41.5, 3.5, 1.8), ellipse(9, 39, 3, 1.6), ellipse(39, 44, 3.5, 2), ellipse(39, 41.5, 3, 1.6)),
  tail: capsule([[32, 40], [40, 38], [42, 30], [38, 24], [35, 26]], 2),
  body: union(ellipse(24, 35, 9, 10), poly([17, 42], [31, 42], [32, 45], [16, 45])),
  ears: mirrorX(poly([15.5, 15], [14, 4], [21.5, 11])),
  head: ellipse(24, 17, 9, 7.5),
  collar: ellipse(24, 25, 6, 1.6),
};

function matagotFront() {
  return toRows(paint([
    { shape: T2.tail, tone: 2, shade: 3 },
    { shape: T2.body, tone: 2, shade: 3, light: { tone: 1, shape: ellipse(20, 30, 2, 3) }, pixels: px(3, [21, 41], [21, 44], [27, 41], [27, 44]) },
    { shape: T2.coins, tone: 1, shade: 2, pixels: [...px(0, [8, 38], [8, 41], [8, 43], [38, 41], [38, 43]), ...px(3, [6, 40], [12, 40], [6, 43], [12, 43], [36, 43], [42, 43])] },
    { shape: T2.ears, tone: 2, shade: 3, light: { tone: 1, shape: mirrorX(poly([16.5, 12], [16, 7], [19, 10])) } },
    { shape: T2.head, tone: 2, shade: 3 },
    { shape: T2.collar, tone: 1, shade: 2, pixels: stamp(23, 26, ['00', '00']) },
    { pixels: [...stamp(18, 15, ['000...000', '030...030']), ...stamp(23, 20, ['3.3', '.3.']), ...px(1, [14, 18], [15, 19], [34, 18], [33, 19]), ...glint(4, 33), ...glint(42, 36)] },
  ]));
}

function matagotBack() {
  return toRows(paint([
    { shape: T2.coins, tone: 1, shade: 2 },
    { shape: T2.body, tone: 2, shade: 3, light: { tone: 1, shape: ellipse(22, 30, 1.5, 4) } },
    { shape: capsule([[24, 43], [32, 45], [38, 41], [38, 33]], 2), tone: 2, shade: 3 },
    { shape: T2.ears, tone: 2, shade: 3 },
    { shape: T2.head, tone: 2, shade: 3 },
    { shape: T2.collar, tone: 1, shade: 2 },
  ]));
}

const MATAGOT_ICON = iconFrom([
  { shape: mirrorX(poly([3, 5], [2.5, 0.5], [6.5, 3]), 8), tone: 2, shade: 3 },
  { shape: ellipse(8, 7, 5.5, 4.5), tone: 2, shade: 3, pixels: [...px(0, [5, 6], [6, 6], [10, 6], [11, 6]), ...px(3, [8, 9])] },
  { shape: ellipse(8, 13, 4, 3), tone: 2, shade: 3 },
  { shape: ellipse(13, 14, 2.5, 1.5), tone: 1, shade: 2, pixels: px(0, [12, 13]) },
]);

export const line = [
  { id: 'pestelet', front: galipotinFront(), back: galipotinBack(), icon: GALIPOTIN_ICON },
  { id: 'pestorne', front: galipoteFront(), back: galipoteBack(), icon: GALIPOTE_ICON },
  { id: 'chafouin', front: matagriFront(), back: matagriBack(), icon: MATAGRI_ICON },
  { id: 'chafourbe', front: matagotFront(), back: matagotBack(), icon: MATAGOT_ICON },
];
