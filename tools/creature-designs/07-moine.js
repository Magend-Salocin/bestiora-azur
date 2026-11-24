// Lignées du Moine bourru (088 et 089, Foudre et Ombre) et de la Dame blanche (090 à 092, Ombre et Arcane).
// Fiche : docs/bestiaire-folklorique/fiches/088-moine-bourru.md.
// Tones: 0 eyes, sparks and mist glow, 1 rope, claws and veil, 2 coarse wool, 3 ink.
import { capsule, ellipse, iconFrom, minus, mirrorX, paint, poly, px, rect, stamp, toRows, union } from '../creature-painter.js';

/** Hairy outline: radial tufts around an ellipse. */
function shaggy(cx, cy, rx, ry, count, length) {
  const points = [];
  for (let i = 0; i < count * 2; i += 1) {
    const angle = (Math.PI * i) / count;
    const grow = i % 2 ? 1 : 1 + length / Math.min(rx, ry);
    points.push([cx + Math.cos(angle) * rx * grow, cy + Math.sin(angle) * ry * grow]);
  }
  return poly(...points);
}
/** Wavy hem: band whose lower edge undulates between y0 and y1. */
function wavyHem(x0, x1, top, y0, y1, waves) {
  const points = [[x0, top]];
  const step = (x1 - x0) / waves;
  for (let i = 0; i <= waves; i += 1) points.push([x0 + step * i, i % 2 ? y1 : y0]);
  points.push([x1, top]);
  return poly(...points);
}
const bolt = (x, y) => stamp(x, y, ['..33', '.303', '303.', '3033', '.030', '..3.']);
const glowEyes = (lx, rx, y) => stamp(lx, y, [`00${'.'.repeat(rx - lx - 2)}00`]);
const mote = (x, y) => stamp(x, y, ['.1.', '101', '.1.']);

// ---------- 088 Moinillon: a bundle of coarse wool with a pointed hood and a rope belt ----------
const M1 = {
  paws: union(ellipse(19, 44.6, 3, 1.5), ellipse(29, 44.6, 3, 1.5)),
  body: shaggy(24, 36, 9.5, 8, 11, 3),
  hood: poly([15, 31], [16, 23], [21, 18], [28, 17], [35, 12], [38, 16], [33, 21], [33, 31]),
  cowl: ellipse(24, 28, 5.5, 4.5),
  snout: ellipse(24, 31, 2.8, 2),
  belt: rect(15, 38, 34, 39),
  cord: capsule([[29, 40], [30, 44]], 0.8),
};

function moinillonFront() {
  return toRows(paint([
    { shape: M1.paws, tone: 1, shade: 2, pixels: px(3, [18, 45], [20, 45], [28, 45], [30, 45]) },
    { shape: M1.body, tone: 2, shade: 3, pixels: px(3, [18, 42], [24, 43], [31, 42]) },
    { shape: M1.hood, tone: 2, shade: 3, light: { tone: 1, shape: poly([18, 23], [22, 19.5], [19, 27]) } },
    { shape: M1.cowl, tone: 3, outline: false, pixels: glowEyes(20, 27, 27) },
    { shape: M1.snout, tone: 1, outline: false, pixels: px(3, [24, 30]) },
    { shape: M1.belt, tone: 1, shade: 2, outline: false, pixels: px(3, [24, 38], [24, 39]) },
    { shape: M1.cord, tone: 1, outline: false },
    { pixels: [...bolt(9, 26), ...bolt(36, 20)] },
  ]));
}

function moinillonBack() {
  return toRows(paint([
    { shape: M1.paws, tone: 1, shade: 2 },
    { shape: M1.body, tone: 2, shade: 3, pixels: px(3, [20, 36], [28, 36]) },
    { shape: union(M1.hood, ellipse(24, 30, 9, 5)), tone: 2, shade: 3, light: { tone: 1, shape: poly([18, 23], [22, 19.5], [19, 27]) }, pixels: px(3, [24, 22], [24, 26]) },
    { shape: M1.belt, tone: 1, shade: 2, outline: false },
    { pixels: [...bolt(9, 26), ...bolt(36, 20)] },
  ]));
}

const MOINILLON_ICON = iconFrom([
  { shape: union(shaggy(8, 11, 5, 4, 8, 1.5), poly([3, 9], [4, 4], [8, 2.5], [12, 0.5], [14.5, 2], [12, 4.5], [13, 9])), tone: 2, shade: 3 },
  { shape: ellipse(8, 7.5, 3, 2.5), tone: 3, outline: false, pixels: px(0, [6, 7], [10, 7]) },
  { shape: ellipse(8, 9.5, 1.5, 1), tone: 1, outline: false },
  { shape: union(ellipse(5.5, 15, 2, 1), ellipse(10.5, 15, 2, 1)), tone: 1, shade: 2 },
]);

// ---------- 089 Moinbourru: a hunched hairy beast in a torn cowl, its fur crackling ----------
const M2 = {
  legs: union(capsule([[18, 38], [17, 43.5]], 3), capsule([[32, 38], [33, 43.5]], 3)),
  arms: mirrorX(capsule([[13, 24], [7, 32], [7, 39]], 3)),
  claws: mirrorX(union(poly([4, 40], [4, 45], [6, 41]), poly([6, 41], [7, 46], [8, 41]), poly([8, 40], [10, 45], [10, 39]))),
  body: shaggy(24, 30, 14, 11, 16, 2),
  hood: poly([12, 26], [14, 15], [20, 8], [27, 5], [26, 10], [33, 14], [36, 26]),
  cowl: ellipse(24, 20, 7, 6),
  snout: poly([20, 21], [28, 21], [27, 26], [21, 26]),
};

function moinbourruFront() {
  return toRows(paint([
    { shape: M2.legs, tone: 2, shade: 3, pixels: px(1, [15, 45], [17, 45], [19, 45], [31, 45], [33, 45], [35, 45]) },
    { shape: M2.body, tone: 2, shade: 3, pixels: px(3, [16, 38], [22, 40], [29, 39], [34, 37]) },
    { shape: M2.arms, tone: 2, shade: 3, light: { tone: 1, shape: capsule([[11, 26], [8, 30]], 0.6) } },
    { shape: M2.claws, tone: 1, shade: 2 },
    { shape: M2.hood, tone: 2, shade: 3, light: { tone: 1, shape: poly([16, 17], [21, 10], [18, 21]) } },
    { shape: M2.cowl, tone: 3, outline: false, pixels: glowEyes(19, 28, 17) },
    { shape: M2.snout, tone: 1, shade: 2, pixels: [...stamp(23, 21, ['33']), ...stamp(21, 24, ['3.00.3', '.3333.'])] },
    { shape: rect(16, 34, 34, 35), tone: 1, outline: false, pixels: px(3, [25, 34]) },
    { shape: capsule([[25, 35], [26, 40]], 0.8), tone: 1, outline: false },
    { pixels: [...bolt(2, 14), ...bolt(41, 11), ...bolt(40, 30)] },
  ]));
}

function moinbourruBack() {
  return toRows(paint([
    { shape: M2.legs, tone: 2, shade: 3 },
    { shape: M2.arms, tone: 2, shade: 3 },
    { shape: M2.claws, tone: 1, shade: 2 },
    { shape: M2.body, tone: 2, shade: 3, pixels: px(3, [18, 28], [24, 26], [30, 29], [22, 38], [28, 40]) },
    { shape: union(M2.hood, poly([14, 22], [34, 22], [30, 30], [18, 30])), tone: 2, shade: 3, light: { tone: 1, shape: poly([16, 17], [21, 10], [18, 21]) } },
    { shape: rect(16, 34, 34, 35), tone: 1, outline: false },
    { pixels: [...bolt(2, 14), ...bolt(41, 11)] },
  ]));
}

const MOINBOURRU_ICON = iconFrom([
  { shape: mirrorX(capsule([[4, 8], [1.5, 12], [1.5, 15]], 1.3), 8), tone: 2, shade: 3 },
  { shape: shaggy(8, 10.5, 5.5, 4.5, 10, 1), tone: 2, shade: 3 },
  { shape: poly([2.5, 9], [4, 3], [8, 0.5], [12, 3], [13.5, 9]), tone: 2, shade: 3 },
  { shape: ellipse(8, 7, 3.5, 3), tone: 3, outline: false, pixels: px(0, [6, 6], [10, 6]) },
  { shape: ellipse(8, 9, 2, 1.5), tone: 1, outline: false, pixels: px(3, [8, 8]) },
]);

// ---------- 090 Blanchin: a wisp of white mist trailing a scrap of veil ----------
const B1 = {
  shadow: ellipse(24, 45, 6, 1.2),
  tail: capsule([[24, 36], [29, 40], [33, 38], [34, 34]], 2),
  body: ellipse(24, 30, 7.5, 7),
  veil: poly([16, 29], [18, 22], [24, 20], [30, 22], [32, 29], [30, 27], [27, 29], [24, 26], [21, 29], [18, 27]),
};

function blanchinFront() {
  return toRows(paint([
    { shape: B1.shadow, tone: 2, outline: false },
    { shape: B1.tail, tone: 1, shade: 2, light: { tone: 0, shape: capsule([[26, 38], [29, 39]], 0.6) } },
    { shape: B1.body, tone: 1, shade: 2, light: { tone: 0, shape: ellipse(23, 32, 4, 3.5) }, pixels: stamp(20, 30, ['33..33', '33..33']) },
    { shape: B1.veil, tone: 1, shade: 2, light: { tone: 0, shape: poly([19, 24], [23, 21.5], [20, 26]) } },
    { pixels: [...mote(10, 22), ...mote(36, 18), ...mote(39, 30)] },
  ]));
}

function blanchinBack() {
  return toRows(paint([
    { shape: B1.shadow, tone: 2, outline: false },
    { shape: B1.tail, tone: 1, shade: 2 },
    { shape: union(B1.body, B1.veil, poly([17, 28], [31, 28], [28, 36], [20, 36])), tone: 1, shade: 2, light: { tone: 0, shape: poly([19, 24], [23, 21.5], [20, 28]) } },
    { pixels: [...mote(10, 22), ...mote(36, 18)] },
  ]));
}

const BLANCHIN_ICON = iconFrom([
  { shape: capsule([[8, 12], [11, 14], [13, 12]], 1.2), tone: 1, shade: 2 },
  { shape: ellipse(8, 8.5, 5, 4.5), tone: 1, shade: 2, light: { tone: 0, shape: ellipse(7, 9.5, 2.5, 2) }, pixels: px(3, [6, 8], [6, 9], [10, 8], [10, 9]) },
  { shape: poly([3, 8], [5, 4], [8, 3], [11, 4], [13, 8], [11, 7], [8, 8], [5, 7]), tone: 1, shade: 2 },
]);

// ---------- 091 Blancôme: a floating veil whose sleeves dissolve into mist ----------
const B2 = {
  shadow: ellipse(24, 45, 9, 1.5),
  sleeves: mirrorX(poly([16, 22], [6, 26], [3, 32], [8, 30], [6, 35], [12, 31], [17, 31])),
  drape: union(ellipse(24, 17, 8, 7.5), poly([15, 18], [33, 18], [36, 34], [16.5, 40], [12, 34])),
  hem: wavyHem(12, 36, 33, 37, 41, 6),
  face: ellipse(24, 18, 4.5, 4),
};

function blancomeFront() {
  return toRows(paint([
    { shape: B2.shadow, tone: 2, outline: false },
    { shape: B2.sleeves, tone: 1, shade: 2, light: { tone: 0, shape: union(poly([8, 27], [14, 24], [10, 28]), poly([40, 27], [34, 24], [38, 28])) } },
    { shape: union(B2.drape, B2.hem), tone: 1, shade: 2, light: { tone: 0, shape: poly([18, 13], [22, 11], [19, 22], [20, 32], [17, 30]) }, pixels: px(2, [22, 28], [22, 33], [27, 30], [27, 36]) },
    { shape: B2.face, tone: 3, outline: false, pixels: stamp(21, 17, ['00..00', '00..00']) },
    { pixels: [...mote(4, 12), ...mote(41, 10), ...mote(42, 38)] },
  ]));
}

function blancomeBack() {
  return toRows(paint([
    { shape: B2.shadow, tone: 2, outline: false },
    { shape: B2.sleeves, tone: 1, shade: 2 },
    { shape: union(B2.drape, B2.hem), tone: 1, shade: 2, light: { tone: 0, shape: poly([18, 13], [22, 11], [19, 22], [20, 32], [17, 30]) }, pixels: px(2, [24, 22], [24, 27], [21, 33], [28, 33]) },
    { pixels: [...mote(4, 12), ...mote(41, 10)] },
  ]));
}

const BLANCOME_ICON = iconFrom([
  { shape: mirrorX(poly([4, 7], [0.5, 10], [1, 12], [4.5, 10]), 8), tone: 1, shade: 2 },
  { shape: union(ellipse(8, 5.5, 4, 4), poly([3.5, 6], [12.5, 6], [14, 15], [2, 15])), tone: 1, shade: 2, light: { tone: 0, shape: poly([5, 4], [7, 2.5], [5.5, 10]) } },
  { shape: ellipse(8, 6, 2.5, 2), tone: 3, outline: false, pixels: px(0, [7, 6], [9, 6]) },
]);

// ---------- 092 Blancélune: a great moonlit veil crowned with a crescent ----------
const B3 = {
  shadow: ellipse(24, 45.5, 12, 1.5),
  crescent: minus(ellipse(24, 7, 6, 5), ellipse(24, 4.5, 5.5, 4.5)),
  wings: mirrorX(poly([17, 16], [6, 12], [1, 20], [4, 22], [2, 28], [7, 27], [6, 33], [12, 30], [16, 28])),
  drape: union(ellipse(24, 17, 8.5, 7.5), poly([15, 18], [33, 18], [38, 38], [10, 38])),
  hem: wavyHem(10, 38, 36, 38, 43, 8),
  face: ellipse(24, 18, 5, 4.5),
};

function blanceluneFront() {
  return toRows(paint([
    { shape: B3.shadow, tone: 2, outline: false },
    { shape: B3.wings, tone: 1, shade: 2, light: { tone: 0, shape: union(poly([5, 17], [14, 18], [6, 21]), poly([43, 17], [34, 18], [42, 21])) } },
    { shape: union(B3.drape, B3.hem), tone: 1, shade: 2, light: { tone: 0, shape: poly([18, 12], [22, 10.5], [19, 24], [19, 36], [15, 33]) }, pixels: px(2, [22, 29], [22, 35], [27, 31], [27, 38], [31, 35]) },
    { shape: B3.face, tone: 3, outline: false, pixels: stamp(21, 17, ['00..00', '00..00']) },
    { shape: B3.crescent, tone: 1, shade: 2, light: { tone: 0, shape: ellipse(21, 10, 2, 1) } },
    { pixels: [...mote(8, 4), ...mote(38, 3), ...mote(3, 38), ...mote(42, 40)] },
  ]));
}

function blanceluneBack() {
  return toRows(paint([
    { shape: B3.shadow, tone: 2, outline: false },
    { shape: B3.wings, tone: 1, shade: 2 },
    { shape: union(B3.drape, B3.hem), tone: 1, shade: 2, light: { tone: 0, shape: poly([18, 12], [22, 10.5], [19, 24], [19, 36], [15, 33]) }, pixels: px(2, [24, 22], [24, 29], [20, 35], [29, 35]) },
    { shape: B3.crescent, tone: 1, shade: 2 },
    { pixels: [...mote(8, 4), ...mote(38, 3)] },
  ]));
}

const BLANCELUNE_ICON = iconFrom([
  { shape: mirrorX(poly([4, 7], [0.5, 6], [0.5, 12], [4, 11]), 8), tone: 1, shade: 2 },
  { shape: union(ellipse(8, 7, 3.8, 3.5), poly([4, 7], [12, 7], [14, 15], [2, 15])), tone: 1, shade: 2, light: { tone: 0, shape: poly([5, 6], [7, 4.5], [5, 12]) } },
  { shape: ellipse(8, 7.5, 2.4, 2), tone: 3, outline: false, pixels: px(0, [7, 7], [9, 7]) },
  { shape: minus(ellipse(8, 2.2, 3, 2.2), ellipse(8, 0.8, 2.8, 2)), tone: 1, shade: 2 },
]);

export const line = [
  { id: 'fusiblet', front: moinillonFront(), back: moinillonBack(), icon: MOINILLON_ICON },
  { id: 'fusiblard', front: moinbourruFront(), back: moinbourruBack(), icon: MOINBOURRU_ICON },
  { id: 'brumelin', front: blanchinFront(), back: blanchinBack(), icon: BLANCHIN_ICON },
  { id: 'brumoire', front: blancomeFront(), back: blancomeBack(), icon: BLANCOME_ICON },
  { id: 'brumaitre', front: blanceluneFront(), back: blanceluneBack(), icon: BLANCELUNE_ICON },
];
