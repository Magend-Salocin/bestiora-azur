// Légendaires (146 à 149) : Vouivre (Vent, Arcane), Gaussier (Givre, Roche),
// Draguignan (Feu, Terre) et Veneur (Foudre, Vent).
// Fiche : docs/bestiaire-folklorique/fiches/146-legendaires.md.
// Tones: 0 gem, frost, flames and eyes, 1 light scales and stone, 2 dark hide and wings, 3 ink.
import { capsule, ellipse, iconFrom, minus, mirrorX, paint, poly, px, rect, stamp, toRows, union } from '../creature-painter.js';

const flake = (x, y) => stamp(x, y, ['.3.', '303', '.3.']);
const bolt = (x, y) => stamp(x, y, ['..33', '.303', '303.', '3033', '.030', '..3.']);
const ink = (...points) => points.map(([x, y]) => [x, y, 3]);
/** Ink line between two points, used for wing ribs and cracks. */
function rib(x0, y0, x1, y1, tone = 3) {
  const steps = Math.max(Math.abs(x1 - x0), Math.abs(y1 - y0));
  return Array.from({ length: steps + 1 }, (_, i) => [Math.round(x0 + ((x1 - x0) * i) / steps), Math.round(y0 + ((y1 - y0) * i) / steps), tone]);
}

// ---------- 146 Vouivre: a winged serpent with a carbuncle on her brow ----------
const V = {
  wings: mirrorX(poly([20, 22], [12, 6], [2, 2], [3, 10], [1, 16], [6, 16], [4, 23], [10, 22], [10, 29], [19, 28])),
  coil: union(ellipse(24, 41, 15, 4.5)),
  coilHole: ellipse(24, 40.5, 9, 2),
  body: capsule([[33, 40], [33, 32], [26, 26], [24, 18]], 3.6),
  head: union(ellipse(24, 13, 5.5, 4.5), ellipse(24, 17, 3.5, 2.5)),
  horns: mirrorX(poly([20, 10], [16, 3], [21.5, 8])),
  gem: ellipse(24, 10.5, 1.7, 1.7),
};

function vouivreFront() {
  return toRows(paint([
    { shape: V.wings, tone: 2, shade: 3, light: { tone: 1, shape: mirrorX(poly([12, 7], [4, 4], [5, 9])) },
      pixels: [...rib(20, 22, 3, 3), ...rib(19, 24, 2, 15), ...rib(19, 26, 5, 22), ...rib(28, 22, 45, 3), ...rib(29, 24, 46, 15), ...rib(29, 26, 43, 22)] },
    { shape: minus(V.coil, V.coilHole), tone: 1, shade: 2, light: { tone: 0, shape: ellipse(15, 39, 3, 1) }, pixels: px(2, [12, 42], [18, 44], [26, 45], [34, 43], [37, 40]) },
    { shape: V.body, tone: 1, shade: 2, light: { tone: 0, shape: capsule([[29, 28], [26, 24]], 0.6) }, pixels: px(2, [33, 36], [31, 31], [27, 27], [25, 22]) },
    { shape: V.horns, tone: 2, shade: 3 },
    { shape: V.head, tone: 1, shade: 2, pixels: [...stamp(20, 12, ['33...33', '30...03']), ...px(3, [23, 18], [25, 18])] },
    { shape: V.gem, tone: 0, shade: 1, pixels: px(3, [24, 11]) },
    { pixels: [...px(3, [24, 20], [24, 21], [23, 22], [25, 22])] },
  ]));
}

function vouivreBack() {
  return toRows(paint([
    { shape: minus(V.coil, V.coilHole), tone: 1, shade: 2, pixels: px(2, [12, 42], [18, 44], [26, 45], [34, 43]) },
    { shape: V.body, tone: 1, shade: 2, pixels: px(2, [33, 36], [31, 31], [27, 27], [25, 22]) },
    { shape: V.horns, tone: 2, shade: 3 },
    { shape: V.head, tone: 1, shade: 2, pixels: px(2, [22, 12], [26, 12], [24, 15]) },
    { shape: V.wings, tone: 2, shade: 3, light: { tone: 1, shape: mirrorX(poly([18, 22], [12, 9], [16, 22])) },
      pixels: [...rib(20, 22, 3, 3), ...rib(19, 24, 2, 15), ...rib(19, 26, 5, 22), ...rib(28, 22, 45, 3), ...rib(29, 24, 46, 15), ...rib(29, 26, 43, 22)] },
  ]));
}

const VOUIVRE_ICON = iconFrom([
  { shape: mirrorX(poly([6, 8], [1, 1], [0.5, 9], [5, 11]), 8), tone: 2, shade: 3 },
  { shape: minus(ellipse(8, 14, 6, 2), ellipse(8, 14, 3, 0.6)), tone: 1, shade: 2 },
  { shape: capsule([[11, 13], [10, 9], [8, 6]], 1.6), tone: 1, shade: 2 },
  { shape: ellipse(8, 4.5, 3, 2.6), tone: 1, shade: 2, pixels: [...px(3, [6, 5], [10, 5]), ...px(0, [8, 3])] },
]);

// ---------- 147 Gaussier: the frost-bitten stone lion of the Alpilles ----------
const L = {
  rocks: union(ellipse(24, 45, 20, 2.5), poly([3, 46], [6, 39], [11, 46]), poly([37, 46], [41, 38], [46, 46])),
  haunches: mirrorX(ellipse(13, 37, 7, 7.5)),
  paws: mirrorX(union(rect(16, 30, 21, 44), ellipse(18.5, 43, 3.5, 2))),
  chest: ellipse(24, 30, 9, 10),
  mane: poly([12, 22], [9, 14], [13, 15], [12, 7], [17, 10], [19, 3], [24, 7], [29, 3], [31, 10], [36, 7], [35, 15], [39, 14], [36, 22], [37, 28], [31, 27], [24, 30], [17, 27], [11, 28]),
  face: ellipse(24, 18, 7, 6.5),
  muzzle: union(ellipse(21.5, 22, 3, 2.5), ellipse(26.5, 22, 3, 2.5)),
  ears: mirrorX(ellipse(17, 11, 2.2, 2.2)),
  frost: union(poly([12, 7], [17, 10], [19, 3], [24, 7], [29, 3], [31, 10], [36, 7], [34, 10], [29, 8], [24, 10], [19, 8], [14, 10])),
};

function gaussierFront() {
  return toRows(paint([
    { shape: L.rocks, tone: 1, shade: 2, light: { tone: 0, shape: union(ellipse(6, 41, 1, 1.5), ellipse(40, 40, 1, 1.5)) } },
    { shape: L.haunches, tone: 1, shade: 2, light: { tone: 0, shape: union(ellipse(9, 33, 2.5, 1.2), ellipse(35, 33, 2.5, 1.2)) }, pixels: [...rib(8, 37, 11, 41), ...rib(40, 36, 38, 40)] },
    { shape: L.chest, tone: 1, shade: 2, pixels: rib(22, 34, 25, 39) },
    { shape: L.paws, tone: 1, shade: 2, pixels: ink([17, 44], [19, 44], [29, 44], [31, 44], [18, 33], [30, 35]) },
    { shape: L.mane, tone: 2, shade: 3, pixels: [...rib(14, 22, 12, 25), ...rib(34, 22, 36, 25)] },
    { shape: L.frost, tone: 0, shade: 1 },
    { shape: L.ears, tone: 1, shade: 2 },
    { shape: L.face, tone: 1, shade: 2, light: { tone: 0, shape: ellipse(21, 14, 2, 1) }, pixels: [...stamp(19, 16, ['33....33', '.03..30.'])] },
    { shape: L.muzzle, tone: 1, shade: 2, light: { tone: 0, shape: ellipse(21, 21.5, 1.2, 0.8) },
      pixels: [...stamp(22, 19, ['3333', '.33.']), ...stamp(23, 21, ['33']), ...stamp(21, 24, ['3.33.3', '.3..3.'])] },
    { pixels: [...flake(4, 18), ...flake(42, 20), ...flake(40, 2)] },
  ]));
}

function gaussierBack() {
  return toRows(paint([
    { shape: L.rocks, tone: 1, shade: 2 },
    { shape: L.haunches, tone: 1, shade: 2, light: { tone: 0, shape: union(ellipse(9, 33, 2.5, 1.2), ellipse(35, 33, 2.5, 1.2)) } },
    { shape: ellipse(24, 33, 11, 11), tone: 1, shade: 2, light: { tone: 0, shape: ellipse(20, 26, 3, 1.5) }, pixels: [...rib(24, 26, 24, 42, 2), ...rib(30, 30, 33, 34)] },
    { shape: capsule([[30, 41], [38, 41], [42, 36]], 1.4), tone: 1, shade: 2 },
    { shape: ellipse(43, 34, 2.5, 2.5), tone: 2, shade: 3 },
    { shape: union(L.mane, ellipse(24, 16, 12, 9)), tone: 2, shade: 3 },
    { shape: L.frost, tone: 0, shade: 1 },
    { pixels: [...flake(4, 18), ...flake(40, 2)] },
  ]));
}

const GAUSSIER_ICON = iconFrom([
  { shape: union(rect(4, 10, 7, 16), rect(9, 10, 12, 16)), tone: 1, shade: 2 },
  { shape: poly([2, 9], [1, 3], [4, 3], [5, 0], [8, 2], [11, 0], [12, 3], [15, 3], [14, 9], [8, 11]), tone: 2, shade: 3 },
  { shape: poly([1, 3], [4, 3], [5, 0], [8, 2], [11, 0], [12, 3], [15, 3], [13, 4.5], [8, 4], [3, 4.5]), tone: 0, shade: 1 },
  { shape: ellipse(8, 7, 3.5, 3.5), tone: 1, shade: 2, pixels: [...px(3, [6, 6], [10, 6]), ...px(3, [7, 9], [8, 9], [9, 9])] },
]);

// ---------- 148 Draguignan: a rock-plated dragon breathing fire ----------
const R = {
  wing: poly([28, 22], [33, 6], [40, 0], [47, 3], [44, 10], [47, 14], [41, 17], [44, 23], [36, 24]),
  tail: capsule([[36, 36], [43, 40], [46, 36], [45, 31]], 3),
  legsFar: union(capsule([[22, 36], [21, 44]], 2.6), capsule([[38, 34], [40, 44]], 2.6)),
  body: ellipse(29, 32, 12, 8.5),
  plates: union(poly([22, 25], [24, 18], [28, 24]), poly([28, 24], [31, 17], [34, 24]), poly([34, 25], [38, 19], [39, 27])),
  legsNear: union(capsule([[25, 37], [25, 44]], 3.4), capsule([[35, 37], [35, 44]], 3.4)),
  neck: capsule([[22, 30], [17, 22], [14, 17]], 4.2),
  head: union(ellipse(12, 14, 6, 5), poly([3, 12], [10, 10], [11, 17], [4, 17])),
  jaw: poly([4, 18], [12, 18], [13, 21], [6, 21]),
  horns: union(poly([13, 10], [16, 1], [17, 10]), poly([10, 10], [9, 3], [12, 9])),
  flame: poly([5, 18], [1, 13], [2, 17], [0, 19], [1, 24], [3, 22], [4, 27], [6, 21]),
};

function draguignanFront() {
  return toRows(paint([
    { shape: R.wing, tone: 2, shade: 3, light: { tone: 1, shape: poly([34, 9], [40, 3], [37, 14]) }, pixels: [...rib(30, 21, 40, 1), ...rib(32, 22, 46, 14), ...rib(35, 23, 43, 22)] },
    { shape: R.tail, tone: 2, shade: 3, pixels: ink([44, 34], [42, 40]) },
    { shape: R.legsFar, tone: 2, shade: 3, pixels: ink([19, 45], [21, 45], [39, 45], [41, 45]) },
    { shape: R.plates, tone: 1, shade: 2 },
    { shape: R.body, tone: 2, shade: 3, light: { tone: 1, shape: ellipse(28, 37, 8, 2.5) }, pixels: [...rib(22, 36, 34, 36), ...px(2, [24, 38], [28, 38], [32, 38])] },
    { shape: R.legsNear, tone: 2, shade: 3, light: { tone: 1, shape: capsule([[24, 39], [24, 42]], 0.5) }, pixels: ink([23, 45], [25, 45], [27, 45], [33, 45], [35, 45], [37, 45]) },
    { shape: R.neck, tone: 2, shade: 3, light: { tone: 1, shape: capsule([[19, 30], [15, 23]], 1.2) } },
    { shape: R.horns, tone: 1, shade: 2 },
    { shape: R.jaw, tone: 2, shade: 3, pixels: px(0, [7, 18], [10, 18]) },
    { shape: R.head, tone: 2, shade: 3, light: { tone: 1, shape: ellipse(12, 11, 2.5, 1) }, pixels: [...stamp(12, 12, ['00', '03']), ...px(3, [4, 13])] },
    { shape: R.flame, tone: 1, shade: 2, light: { tone: 0, shape: poly([4, 19], [2, 16], [2, 22], [4, 23]) } },
    { pixels: [...stamp(1, 26, ['.3.', '303', '.3.']), ...stamp(15, 40, ['3', '.'])] },
  ]));
}

function draguignanBack() {
  return toRows(paint([
    { shape: union(capsule([[17, 37], [16, 44]], 3.4), capsule([[31, 37], [32, 44]], 3.4)), tone: 2, shade: 3, pixels: ink([14, 45], [16, 45], [18, 45], [30, 45], [32, 45], [34, 45]) },
    { shape: ellipse(24, 33, 12, 9), tone: 2, shade: 3 },
    { shape: union(poly([18, 27], [20, 19], [24, 26]), poly([24, 26], [27, 18], [30, 26])), tone: 1, shade: 2 },
    { shape: mirrorX(poly([20, 24], [10, 6], [2, 2], [4, 10], [1, 15], [6, 16], [3, 22], [13, 26])), tone: 2, shade: 3, light: { tone: 1, shape: mirrorX(poly([10, 8], [4, 4], [6, 12])) },
      pixels: [...rib(20, 24, 3, 3), ...rib(18, 25, 2, 15), ...rib(28, 24, 45, 3), ...rib(30, 25, 46, 15)] },
    { shape: capsule([[24, 28], [24, 18]], 4), tone: 2, shade: 3 },
    { shape: union(poly([21, 14], [19, 5], [23, 12]), poly([27, 14], [29, 5], [25, 12])), tone: 1, shade: 2 },
    { shape: ellipse(24, 15, 5.5, 4.5), tone: 2, shade: 3, light: { tone: 1, shape: ellipse(22, 13, 2, 1) } },
    { shape: capsule([[30, 41], [38, 43], [43, 39]], 3), tone: 2, shade: 3 },
  ]));
}

const DRAGUIGNAN_ICON = iconFrom([
  { shape: poly([9, 7], [11, 1], [15, 0], [14, 5], [15, 8], [11, 9]), tone: 2, shade: 3 },
  { shape: ellipse(10, 11, 5, 3.5), tone: 2, shade: 3, light: { tone: 1, shape: ellipse(10, 13, 3, 1) } },
  { shape: union(capsule([[8, 13], [8, 15]], 1.2), capsule([[13, 13], [13, 15]], 1.2)), tone: 2, shade: 3 },
  { shape: capsule([[7, 10], [5, 6]], 1.8), tone: 2, shade: 3 },
  { shape: union(ellipse(4.5, 4.5, 3, 2.5), poly([0.5, 4], [3, 3], [3, 7], [0.5, 6.5])), tone: 2, shade: 3, pixels: [...px(0, [5, 3]), ...px(3, [0, 5])] },
  { shape: poly([5, 1.5], [6, -1], [7, 2.5]), tone: 1 },
]);

// ---------- 149 Veneur: a phantom stag whose antlers crackle, a hunting horn slung at its neck ----------
const S = {
  antlers: union(
    capsule([[13, 12], [10, 7], [6, 2]], 1.1), capsule([[10, 7], [4, 7]], 1), capsule([[8, 4], [9, 0]], 1),
    capsule([[17, 12], [21, 6], [26, 2]], 1.1), capsule([[21, 6], [27, 7]], 1), capsule([[23, 4], [21, 0]], 1),
  ),
  cloud: union(ellipse(36, 38, 7, 5), ellipse(43, 33, 5, 4.5), ellipse(29, 42, 6, 3.5), ellipse(41, 41, 6, 3.5), ellipse(44, 26, 3.5, 3)),
  legs: union(capsule([[17, 34], [16, 44]], 1.6), capsule([[22, 34], [22, 44]], 1.8), capsule([[29, 35], [30, 42]], 1.6)),
  body: ellipse(28, 29, 11, 7),
  neck: capsule([[20, 28], [16, 18]], 3.8),
  head: union(ellipse(15, 16, 4.5, 4), poly([12, 15], [6, 18], [7, 21], [13, 20])),
  ears: union(poly([11, 13], [7, 11], [11, 15]), poly([19, 13], [22, 11], [19, 15])),
  horn: minus(ellipse(20, 25, 5, 4.5), ellipse(20, 25, 3.3, 2.8)),
  bell: poly([23, 28], [27, 26], [28, 31]),
};

function veneurFront() {
  return toRows(paint([
    { shape: S.cloud, tone: 1, shade: 2, light: { tone: 0, shape: union(ellipse(34, 36, 3, 1.5), ellipse(42, 31, 2, 1.2)) } },
    { shape: S.legs, tone: 2, shade: 3, pixels: ink([15, 45], [16, 45], [17, 45], [21, 45], [22, 45], [23, 45]) },
    { shape: S.body, tone: 2, shade: 3, light: { tone: 1, shape: ellipse(26, 25, 5, 1.2) } },
    { shape: S.neck, tone: 2, shade: 3 },
    { shape: S.antlers, tone: 1, shade: 2 },
    { shape: S.ears, tone: 2, shade: 3 },
    { shape: S.head, tone: 2, shade: 3, light: { tone: 1, shape: ellipse(9, 19, 2, 1) }, pixels: [...stamp(13, 15, ['000', '.0.']), ...px(3, [6, 19])] },
    { shape: S.horn, tone: 1, shade: 2, light: { tone: 0, shape: ellipse(16, 23, 1, 1) } },
    { shape: S.bell, tone: 1, shade: 2, pixels: ink([27, 28], [27, 29]) },
    { pixels: [...bolt(1, 1), ...bolt(29, 1), ...bolt(40, 12), ...stamp(14, 4, ['.3.', '303', '.3.'])] },
  ]));
}

function veneurBack() {
  return toRows(paint([
    { shape: union(ellipse(24, 40, 13, 5), ellipse(14, 36, 5, 4), ellipse(34, 36, 5, 4)), tone: 1, shade: 2, light: { tone: 0, shape: ellipse(14, 35, 2, 1) } },
    { shape: ellipse(24, 29, 10, 9), tone: 2, shade: 3, light: { tone: 1, shape: ellipse(21, 24, 3, 1.5) } },
    { shape: capsule([[24, 26], [24, 16]], 4), tone: 2, shade: 3 },
    { shape: mirrorX(union(capsule([[21, 11], [16, 6], [11, 1]], 1.1), capsule([[16, 6], [10, 7]], 1), capsule([[14, 4], [15, 0]], 1))), tone: 1, shade: 2 },
    { shape: mirrorX(poly([20, 13], [15, 11], [20, 15])), tone: 2, shade: 3 },
    { shape: ellipse(24, 14, 4.5, 4), tone: 2, shade: 3 },
    { pixels: [...bolt(2, 8), ...bolt(41, 8)] },
  ]));
}

const VENEUR_ICON = iconFrom([
  { shape: union(ellipse(11, 13, 4, 2.5), ellipse(14, 10, 2, 2)), tone: 1, shade: 2 },
  { shape: union(capsule([[6, 12], [6, 15]], 1), capsule([[9, 12], [9, 15]], 1)), tone: 2, shade: 3 },
  { shape: ellipse(9, 10.5, 4.5, 2.8), tone: 2, shade: 3 },
  { shape: capsule([[6, 10], [5, 6]], 1.8), tone: 2, shade: 3 },
  { shape: union(capsule([[4, 3], [2, 0]], 0.7), capsule([[6, 3], [8, 0]], 0.7)), tone: 1, shade: 2 },
  { shape: union(ellipse(5, 5, 2.3, 2), poly([4, 4.5], [0.5, 6.5], [4, 7])), tone: 2, shade: 3, pixels: px(0, [5, 4]) },
]);

export const line = [
  { id: 'azurel', front: vouivreFront(), back: vouivreBack(), icon: VOUIVRE_ICON },
  { id: 'glacerne', front: gaussierFront(), back: gaussierBack(), icon: GAUSSIER_ICON },
  { id: 'volcarde', front: draguignanFront(), back: draguignanBack(), icon: DRAGUIGNAN_ICON },
  { id: 'fulgorine', front: veneurFront(), back: veneurBack(), icon: VENEUR_ICON },
];
