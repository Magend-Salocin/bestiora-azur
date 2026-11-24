// Lignée du Fullettu (067, Normal ; 068 Fullemarin, Eau ; 069 Fulletonne, Foudre) : lutin corse
// caché dans une bogue de châtaigne. Fiche : docs/bestiaire-folklorique/fiches/067-fullettu.md.
// Tones: 0 eyes and highlights, 1 imp skin, 2 husk, 3 ink.
import { capsule, ellipse, eyes, iconFrom, minus, mirrorX, paint, poly, px, rect, stamp, toRows, union } from '../creature-painter.js';

/** Chestnut husk: a round body bristling with short spines. */
function husk(cx, cy, r, spines, length = 2.5) {
  const points = [];
  for (let i = 0; i < spines * 2; i += 1) {
    const angle = (Math.PI * i) / spines - Math.PI / 2;
    const radius = i % 2 ? r : r + length;
    points.push([cx + Math.cos(angle) * radius, cy + Math.sin(angle) * radius]);
  }
  return poly(...points);
}
const bolt = (x, y) => stamp(x, y, ['..33', '.303', '303.', '3033', '.030', '..3.']);
const bubble = (x, y) => stamp(x, y, ['.3.', '303', '.3.']);

// ---------- 067 Fullettu: imp peeking out of a chestnut husk ----------
const C1 = {
  feet: union(ellipse(19.5, 44.6, 3, 1.5), ellipse(28.5, 44.6, 3, 1.5)),
  husk: husk(24, 34, 10, 16),
  opening: ellipse(24, 34, 6.5, 5),
  face: ellipse(24, 35, 5.5, 4),
  horns: mirrorX(poly([20, 31], [19, 27], [22, 30])),
};

function fullettuFront() {
  return toRows(paint([
    { shape: C1.feet, tone: 1, shade: 2 },
    { shape: C1.husk, tone: 2, shade: 3, light: { tone: 1, shape: ellipse(18, 28, 3, 2) } },
    { shape: C1.opening, tone: 3, outline: false },
    { shape: C1.horns, tone: 1, outline: false },
    { shape: C1.face, tone: 1, shade: 2, pixels: [...stamp(20, 33, ['00...00', '03...03']), ...stamp(22, 37, ['30003', '.333.'])] },
  ]));
}

function fullettuBack() {
  return toRows(paint([
    { shape: C1.feet, tone: 1, shade: 2 },
    { shape: C1.husk, tone: 2, shade: 3, light: { tone: 1, shape: ellipse(18, 28, 3, 2) }, pixels: px(3, [24, 26], [20, 32], [28, 32], [24, 38]) },
  ]));
}

const FULLETTU_ICON = iconFrom([
  { shape: husk(8, 8.5, 5.5, 12, 1.8), tone: 2, shade: 3 },
  { shape: ellipse(8, 9, 3.6, 3), tone: 3, outline: false },
  { shape: ellipse(8, 9.5, 3, 2.2), tone: 1, outline: false, pixels: [...px(0, [6, 9], [10, 9]), ...px(3, [6, 10], [10, 10]), ...px(3, [7, 11], [8, 11], [9, 11])] },
  { shape: union(ellipse(5.5, 15, 2, 1), ellipse(10.5, 15, 2, 1)), tone: 1, shade: 2 },
]);

// ---------- 068 Fullemarin: the husk split open on the waves, a foam-crested imp inside ----------
const halves = (cy) => ({
  left: minus(husk(15, cy, 9, 14), rect(15, 0, 48, 48)),
  right: minus(husk(33, cy, 9, 14), rect(0, 0, 33, 48)),
});
const H = halves(36);
const IMP = {
  body: ellipse(24, 35, 7.5, 7),
  head: ellipse(24, 23, 7.5, 6.5),
  ears: mirrorX(poly([17.5, 22], [11, 17], [12, 22], [17.5, 26])),
  arms: mirrorX(capsule([[18, 32], [14, 30]], 1.6)),
  feet: union(ellipse(20, 43.5, 3, 1.5), ellipse(28, 43.5, 3, 1.5)),
};

function fullemarinFront() {
  return toRows(paint([
    { shape: H.left, tone: 2, shade: 3, light: { tone: 1, shape: ellipse(10, 31, 2, 2) } },
    { shape: H.right, tone: 2, shade: 3, light: { tone: 1, shape: ellipse(36, 31, 2, 2) } },
    { shape: IMP.feet, tone: 1, shade: 2 },
    { shape: IMP.body, tone: 1, shade: 2, light: { tone: 0, shape: ellipse(24, 37, 3.5, 3.5) } },
    { shape: IMP.arms, tone: 1, shade: 2 },
    // Foam crest like a breaking wave.
    { shape: poly([17, 20], [17, 15], [20, 12], [24, 10], [29, 10], [33, 13], [31, 15], [29, 13], [27, 16], [24, 14], [21, 17]), tone: 0, shade: 1, pixels: px(1, [21, 13], [27, 12]) },
    { shape: IMP.ears, tone: 1, shade: 2, light: { tone: 0, shape: union(poly([13, 19], [17, 22], [13, 21]), poly([35, 19], [31, 22], [35, 21])) } },
    { shape: IMP.head, tone: 1, shade: 2 },
    { pixels: [...eyes(20, 26, 21), ...stamp(21, 26, ['3000003', '.33333.']), ...bubble(8, 16), ...bubble(38, 12), ...bubble(41, 20)] },
    { shape: union(ellipse(24, 45.5, 22, 2.5), ellipse(6, 44, 5, 1.5), ellipse(42, 44, 5, 1.5)), tone: 1, shade: 2, light: { tone: 0, shape: union(ellipse(6, 43.5, 2.5, 0.8), ellipse(42, 43.5, 2.5, 0.8)) },
      pixels: stamp(6, 46, ['3333.....3333........3333.....3333']) },
  ]));
}

function fullemarinBack() {
  return toRows(paint([
    { shape: IMP.feet, tone: 1, shade: 2 },
    { shape: IMP.body, tone: 1, shade: 2 },
    { shape: IMP.arms, tone: 1, shade: 2 },
    { shape: IMP.ears, tone: 1, shade: 2 },
    { shape: union(IMP.head, poly([17, 20], [17, 15], [20, 12], [24, 10], [29, 10], [33, 13], [31, 22], [17, 22])), tone: 0, shade: 1, pixels: px(1, [21, 15], [26, 13], [24, 19]) },
    { shape: H.left, tone: 2, shade: 3 },
    { shape: H.right, tone: 2, shade: 3 },
    { pixels: [...bubble(8, 16), ...bubble(38, 12)] },
    { shape: union(ellipse(24, 45.5, 22, 2.5), ellipse(6, 44, 5, 1.5), ellipse(42, 44, 5, 1.5)), tone: 1, shade: 2, pixels: stamp(6, 46, ['3333.....3333........3333.....3333']) },
  ]));
}

const FULLEMARIN_ICON = iconFrom([
  { shape: union(minus(husk(3, 11, 3.5, 8, 1.2), rect(3, 0, 16, 16)), minus(husk(13, 11, 3.5, 8, 1.2), rect(0, 0, 13, 16))), tone: 2, shade: 3 },
  { shape: poly([3, 6], [4, 2], [8, 0.5], [12, 1], [13.5, 3], [11, 3.5], [9, 2.5], [6, 4.5]), tone: 0, shade: 1 },
  { shape: ellipse(8, 8, 4.5, 4), tone: 1, shade: 2, pixels: [...px(3, [6, 7], [6, 8], [9, 7], [9, 8]), ...px(0, [6, 7], [9, 7]), ...stamp(6, 10, ['3003'])] },
  { shape: ellipse(8, 14, 3, 2), tone: 1, shade: 2 },
]);

// ---------- 069 Fulletonne: storm imp, her hair standing on end ----------
function fulletonneFront() {
  return toRows(paint([
    { shape: H.left, tone: 2, shade: 3, light: { tone: 1, shape: ellipse(10, 31, 2, 2) } },
    { shape: H.right, tone: 2, shade: 3, light: { tone: 1, shape: ellipse(36, 31, 2, 2) } },
    { shape: IMP.feet, tone: 1, shade: 2 },
    { shape: IMP.body, tone: 1, shade: 2, light: { tone: 0, shape: ellipse(24, 37, 3.5, 3.5) }, pixels: stamp(22, 34, ['..3.', '.33.', '333.', '.3..']) },
    { shape: IMP.arms, tone: 1, shade: 2 },
    // Bristling hair in jagged spikes.
    { shape: poly([16, 22], [12, 13], [18, 16], [18, 7], [22, 13], [25, 3], [27, 12], [31, 6], [31, 15], [37, 12], [33, 22]), tone: 2, shade: 3, light: { tone: 1, shape: poly([19, 10], [21, 14], [19, 14]) } },
    { shape: IMP.ears, tone: 1, shade: 2 },
    { shape: IMP.head, tone: 1, shade: 2 },
    { pixels: [...eyes(20, 26, 21), ...stamp(21, 26, ['3000003', '.33333.']), ...px(2, [18, 25], [30, 25]), ...bolt(5, 14), ...bolt(39, 16)] },
  ]));
}

function fulletonneBack() {
  return toRows(paint([
    { shape: IMP.feet, tone: 1, shade: 2 },
    { shape: IMP.body, tone: 1, shade: 2 },
    { shape: IMP.arms, tone: 1, shade: 2 },
    { shape: IMP.ears, tone: 1, shade: 2 },
    { shape: union(IMP.head, poly([16, 22], [12, 13], [18, 16], [18, 7], [22, 13], [25, 3], [27, 12], [31, 6], [31, 15], [37, 12], [33, 22]), rect(17, 20, 31, 28)), tone: 2, shade: 3, light: { tone: 1, shape: poly([19, 10], [21, 14], [19, 14]) } },
    { shape: H.left, tone: 2, shade: 3 },
    { shape: H.right, tone: 2, shade: 3 },
    { pixels: [...bolt(5, 14), ...bolt(39, 16)] },
  ]));
}

const FULLETONNE_ICON = iconFrom([
  { shape: poly([2, 7], [0.5, 2], [4, 4], [5, 0], [8, 3], [11, 0], [12, 4], [15.5, 2], [14, 7]), tone: 2, shade: 3 },
  { shape: ellipse(8, 8.5, 4.5, 4), tone: 1, shade: 2, pixels: [...px(3, [6, 8], [6, 9], [9, 8], [9, 9]), ...px(0, [6, 8], [9, 8]), ...stamp(6, 11, ['3003'])] },
  { shape: ellipse(8, 14.5, 3, 1.5), tone: 1, shade: 2 },
  { shape: union(minus(husk(2, 13, 2.5, 7, 1), rect(2, 0, 16, 16)), minus(husk(14, 13, 2.5, 7, 1), rect(0, 0, 14, 16))), tone: 2, shade: 3 },
]);

export const line = [
  { id: 'fullettu', front: fullettuFront(), back: fullettuBack(), icon: FULLETTU_ICON },
  { id: 'fullemarin', front: fullemarinFront(), back: fullemarinBack(), icon: FULLEMARIN_ICON },
  { id: 'fulletonne', front: fulletonneFront(), back: fulletonneBack(), icon: FULLETONNE_ICON },
];
