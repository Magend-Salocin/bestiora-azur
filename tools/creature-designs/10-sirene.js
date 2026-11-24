// Lignée de la Sirène (129 Sirénéa et 130 Sirénor, Eau et Vent) : poisson-oiseau des eaux de la Garonne.
// Fiche : docs/bestiaire-folklorique/fiches/129-sirenea.md.
// Tones: 0 belly, eyes and spray, 1 scales and feathers, 2 back and wing tips, 3 ink.
import { capsule, ellipse, iconFrom, mirrorX, paint, poly, px, stamp, toRows, union } from '../creature-painter.js';

const spray = (x, y) => stamp(x, y, ['.3.', '303', '.3.']);
/** Feather lines: short ink strokes from each [x, y] going down-right. */
const featherLines = (list, tone = 2) => list.flatMap(([x, y]) => [[x, y, tone], [x + 1, y + 1, tone]]);
const sideEye = (x, y) => stamp(x, y, ['33', '03', '33']);

// ---------- 129 Sirénéa: a little flying fish with bird wings and a veil tail ----------
const S1 = {
  wingBack: poly([27, 28], [33, 15], [38, 10], [40, 14], [39, 19], [41, 21], [37, 25], [38, 28], [32, 31]),
  tail: poly([29, 34], [37, 38], [43, 44], [39, 36], [44, 30], [37, 32]),
  body: ellipse(21, 33, 10, 6.5),
  fin: poly([18, 27], [21, 21], [26, 27]),
  wingFront: poly([18, 31], [11, 19], [8, 12], [12, 13], [14, 17], [16, 15], [18, 20], [20, 19], [23, 30]),
  ripple: stamp(10, 45, ['2222..222222..2222']),
};

function sireneaFront() {
  return toRows(paint([
    { pixels: S1.ripple },
    { shape: S1.wingBack, tone: 2, shade: 3, pixels: featherLines([[34, 18], [36, 22], [33, 25]], 3) },
    { shape: S1.tail, tone: 1, shade: 2, pixels: px(2, [36, 36], [39, 39], [38, 33]) },
    { shape: S1.fin, tone: 2, shade: 3 },
    { shape: S1.body, tone: 1, shade: 2, light: { tone: 0, shape: ellipse(19, 36.5, 7, 2.2) }, pixels: px(2, [24, 31], [27, 32], [25, 34], [28, 35]) },
    { shape: S1.wingFront, tone: 1, shade: 2, light: { tone: 0, shape: poly([11, 15], [12, 15], [17, 25], [16, 25]) }, pixels: featherLines([[13, 21], [16, 23], [18, 26]]) },
    { pixels: [...sideEye(14, 31), ...stamp(11, 35, ['333']), ...spray(4, 38), ...spray(42, 22)] },
  ]));
}

function sireneaBack() {
  return toRows(paint([
    { pixels: S1.ripple },
    { shape: S1.tail, tone: 1, shade: 2 },
    { shape: S1.body, tone: 2, shade: 3, light: { tone: 1, shape: ellipse(19, 30, 6, 2) } },
    { shape: S1.fin, tone: 2, shade: 3 },
    { shape: union(S1.wingFront, S1.wingBack), tone: 1, shade: 2, pixels: featherLines([[13, 21], [16, 23], [34, 18], [36, 22]]) },
    { pixels: spray(4, 38) },
  ]));
}

const SIRENEA_ICON = iconFrom([
  { shape: poly([9, 9], [12, 3], [15, 2], [14, 7], [12, 10]), tone: 2, shade: 3 },
  { shape: poly([11, 11], [15, 15], [13, 11], [15.5, 8.5]), tone: 1, shade: 2 },
  { shape: ellipse(7.5, 10.5, 5, 3.2), tone: 1, shade: 2, light: { tone: 0, shape: ellipse(7, 12.5, 3.5, 1) } },
  { shape: poly([6, 10], [2, 4], [4, 3.5], [8, 9]), tone: 1, shade: 2 },
  { pixels: [...px(3, [4, 10], [4, 11]), ...px(0, [5, 10])] },
]);

// ---------- 130 Sirénor: a great ray with feathered wing tips, gliding over the river ----------
const S2 = {
  tail: capsule([[24, 34], [27, 40], [33, 44], [40, 45]], 1.1),
  wings: poly([24, 18], [33, 20], [41, 24], [47, 30], [42, 31], [44, 34], [38, 33], [39, 37], [32, 34], [24, 36], [16, 34], [9, 37], [10, 33], [4, 34], [6, 31], [1, 30], [7, 24], [15, 20]),
  horns: mirrorX(poly([18, 22], [15, 13], [21, 19])),
  crest: poly([21, 18], [24, 9], [27, 18]),
  head: ellipse(24, 24, 6.5, 5),
};

function sirenorFront() {
  return toRows(paint([
    { shape: S2.tail, tone: 2, shade: 3 },
    { shape: S2.horns, tone: 2, shade: 3 },
    { shape: S2.crest, tone: 1, shade: 2, pixels: px(0, [24, 11]) },
    { shape: S2.wings, tone: 2, shade: 3, light: { tone: 1, shape: union(ellipse(24, 30, 9, 4), poly([8, 26], [18, 24], [17, 26])) },
      pixels: [...featherLines([[5, 30], [9, 32], [13, 33], [41, 30], [37, 32], [33, 33]], 3), ...px(0, [24, 30], [21, 31], [27, 31])] },
    { shape: S2.head, tone: 1, shade: 2, pixels: [...stamp(19, 22, ['03......03', '33......33'])] },
    { shape: poly([21.5, 27], [24, 32], [26.5, 27]), tone: 2, shade: 3 },
    { pixels: stamp(8, 46, ['2222..2222222222..2222..2222']) },
    { pixels: [...spray(3, 14), ...spray(42, 12), ...spray(44, 40)] },
  ]));
}

function sirenorBack() {
  return toRows(paint([
    { shape: S2.tail, tone: 2, shade: 3 },
    { shape: S2.horns, tone: 2, shade: 3 },
    { shape: S2.crest, tone: 1, shade: 2 },
    { shape: S2.wings, tone: 2, shade: 3, light: { tone: 1, shape: union(poly([8, 26], [18, 22], [17, 25]), poly([40, 26], [30, 22], [31, 25])) },
      pixels: [...featherLines([[5, 30], [9, 32], [13, 33], [41, 30], [37, 32], [33, 33]], 3), ...px(1, [20, 27], [24, 28], [28, 27], [22, 31], [26, 31])] },
    { shape: ellipse(24, 23, 6, 4.5), tone: 2, shade: 3, light: { tone: 1, shape: ellipse(22, 21, 2, 1) } },
    { pixels: stamp(8, 46, ['2222..2222222222..2222..2222']) },
  ]));
}

const SIRENOR_ICON = iconFrom([
  { shape: capsule([[8, 11], [11, 14], [15, 15]], 0.6), tone: 2 },
  { shape: poly([8, 4], [12, 5], [15.5, 9], [12, 9.5], [11, 12], [8, 11], [5, 12], [4, 9.5], [0.5, 9], [4, 5]), tone: 2, shade: 3, light: { tone: 1, shape: ellipse(8, 9, 3, 1.5) } },
  { shape: poly([7, 4], [8, 0.5], [9, 4]), tone: 1, shade: 2 },
  { shape: ellipse(8, 6, 2.8, 2.2), tone: 1, shade: 2, pixels: [...px(3, [6, 5], [10, 5]), ...px(3, [7, 7], [8, 7], [9, 7])] },
]);

export const line = [
  { id: 'sirenea', front: sireneaFront(), back: sireneaBack(), icon: SIRENEA_ICON },
  { id: 'sirenor', front: sirenorFront(), back: sirenorBack(), icon: SIRENOR_ICON },
];
