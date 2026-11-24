// Lignée du Graoully (115 à 117, Toxique et Eau) : dragon-crapaud de Metz.
// Fiche : docs/bestiaire-folklorique/fiches/115-graoully.md.
// Tones: 0 eyes, fangs and belly light, 1 skin, 2 warts, wings and spines, 3 ink.
import { capsule, ellipse, iconFrom, mirrorX, paint, poly, px, stamp, toRows, union } from '../creature-painter.js';

const drip = (x, y) => stamp(x, y, ['.3.', '303', '303', '.3.']);
const warts = (list) => list.map(([x, y]) => [x, y, 2]);
/** Bulging toad eye: light ring and ink pupil, top-left pixel at (x, y). */
const toadEye = (x, y) => stamp(x, y, ['.333.', '30003', '30033', '.333.']);

// ---------- 115 Graoulet: a warty toadlet with two horn nubs ----------
const G1 = {
  tail: capsule([[31, 42], [37, 42], [40, 38]], 1.8),
  feet: mirrorX(poly([13, 45], [17, 41], [21, 45])),
  body: ellipse(24, 37, 11, 7.5),
  bumps: mirrorX(ellipse(18.5, 30.5, 3.5, 3.2)),
  horns: mirrorX(poly([16, 29], [14, 23], [18, 27.5])),
};

function graouletFront() {
  return toRows(paint([
    { shape: G1.tail, tone: 2, shade: 3 },
    { shape: G1.feet, tone: 1, shade: 2 },
    { shape: G1.horns, tone: 2, shade: 3 },
    { shape: union(G1.body, G1.bumps), tone: 1, shade: 2, light: { tone: 0, shape: ellipse(24, 41, 6, 2.5) }, pixels: warts([[15, 35], [17, 38], [31, 35], [33, 38], [24, 33], [29, 31]]) },
    { pixels: [...toadEye(16, 29), ...toadEye(27, 29), ...stamp(17, 36, ['3............3', '.333333333333.']), ...drip(40, 30)] },
  ]));
}

function graouletBack() {
  return toRows(paint([
    { shape: G1.feet, tone: 1, shade: 2 },
    { shape: G1.horns, tone: 2, shade: 3 },
    { shape: union(G1.body, G1.bumps), tone: 1, shade: 2, pixels: warts([[16, 34], [20, 37], [24, 33], [28, 37], [32, 34], [24, 40], [18, 30], [30, 30]]) },
    { shape: capsule([[24, 43], [30, 45], [36, 43]], 1.8), tone: 2, shade: 3 },
  ]));
}

const GRAOULET_ICON = iconFrom([
  { shape: mirrorX(poly([4, 6], [3, 2], [6, 5]), 8), tone: 2, shade: 3 },
  { shape: union(ellipse(8, 11, 6.5, 4.5), mirrorX(ellipse(5, 7, 2.5, 2.3), 8)), tone: 1, shade: 2, pixels: [...px(3, [4, 7], [5, 7], [11, 7], [12, 7]), ...px(0, [4, 6], [11, 6]), ...stamp(3, 11, ['3........3', '.33333333.'])] },
  { shape: mirrorX(poly([2, 16], [4, 13], [6, 16]), 8), tone: 1, shade: 2 },
]);

// ---------- 116 Graoulard: toad-dragon wading in the marsh, a row of spines on its back ----------
const G2 = {
  tail: capsule([[34, 40], [41, 40], [45, 35], [44, 30]], 2.4),
  spines: union(poly([20, 24], [21, 17], [25, 23]), poly([25, 23], [28, 15], [31, 23]), poly([31, 24], [35, 18], [36, 27]), poly([36, 28], [41, 24], [39, 32])),
  legs: union(capsule([[18, 38], [16, 44]], 3), capsule([[33, 38], [34, 44]], 3)),
  body: ellipse(27, 33, 12, 9),
  head: ellipse(14, 30, 9, 7),
  bump: ellipse(15, 24, 3.5, 3),
  jaw: poly([5, 32], [22, 32], [20, 37], [8, 36]),
  wing: poly([28, 27], [36, 20], [38, 26], [34, 31]),
};

function graoulardFront() {
  return toRows(paint([
    { shape: G2.tail, tone: 2, shade: 3, pixels: px(0, [44, 31]) },
    { shape: G2.spines, tone: 2, shade: 3 },
    { shape: G2.body, tone: 1, shade: 2, light: { tone: 0, shape: ellipse(26, 39, 6, 2) }, pixels: warts([[24, 29], [30, 31], [34, 35], [28, 35], [21, 34]]) },
    { shape: G2.wing, tone: 2, shade: 3, pixels: px(3, [33, 25], [35, 26]) },
    { shape: G2.legs, tone: 1, shade: 2, pixels: px(3, [14, 45], [16, 45], [33, 45], [35, 45]) },
    { shape: union(G2.head, G2.bump), tone: 1, shade: 2, pixels: warts([[11, 27], [19, 28]]) },
    { shape: G2.jaw, tone: 1, shade: 2, light: { tone: 0, shape: ellipse(14, 35, 4, 1) }, pixels: [...stamp(5, 32, ['33333333333333333']), ...px(0, [8, 33], [12, 33], [16, 33])] },
    { pixels: [...toadEye(12, 23), ...drip(4, 38), ...drip(1, 30)] },
  ]));
}

function graoulardBack() {
  return toRows(paint([
    { shape: union(capsule([[17, 38], [15, 44]], 3), capsule([[31, 38], [33, 44]], 3)), tone: 1, shade: 2 },
    { shape: union(poly([16, 26], [17, 18], [21, 25]), poly([21, 24], [24, 15], [27, 24]), poly([27, 24], [31, 17], [32, 27])), tone: 2, shade: 3 },
    { shape: ellipse(24, 33, 13, 9.5), tone: 1, shade: 2, pixels: warts([[17, 31], [22, 28], [29, 30], [32, 35], [24, 36], [16, 37]]) },
    { shape: mirrorX(poly([17, 28], [10, 21], [11, 28], [16, 32])), tone: 2, shade: 3 },
    { shape: capsule([[26, 41], [33, 44], [40, 42], [43, 37]], 2.4), tone: 2, shade: 3 },
  ]));
}

const GRAOULARD_ICON = iconFrom([
  { shape: union(poly([8, 6], [9, 2], [11, 6]), poly([11, 6], [13, 2.5], [14, 7])), tone: 2, shade: 3 },
  { shape: ellipse(10.5, 10, 5, 4), tone: 1, shade: 2 },
  { shape: union(ellipse(5, 9, 4.5, 3.5), poly([0.5, 10], [8, 10], [7, 13], [2, 12.5])), tone: 1, shade: 2, pixels: [...px(3, [5, 7], [6, 7]), ...px(0, [5, 6]), ...stamp(1, 10, ['3333333'])] },
  { shape: union(ellipse(6, 14.5, 1.6, 1.2), ellipse(12, 14.5, 1.6, 1.2)), tone: 1, shade: 2 },
]);

// ---------- 117 Graoully: winged toad-dragon of Metz, maw full of fangs ----------
const G3 = {
  wings: mirrorX(poly([15, 22], [3, 8], [2, 20], [5, 18], [4, 27], [8, 24], [9, 31], [15, 29])),
  tail: capsule([[30, 41], [38, 43], [44, 39], [45, 33]], 2.4),
  tailTip: poly([43, 34], [45, 27], [47, 34]),
  legs: union(capsule([[17, 38], [16, 44]], 3.2), capsule([[31, 38], [32, 44]], 3.2)),
  body: ellipse(24, 33, 10, 10),
  belly: ellipse(24, 36, 6, 6),
  head: ellipse(24, 17, 9, 7),
  horns: mirrorX(poly([17, 13], [13, 4], [20, 11])),
  bumps: mirrorX(ellipse(19.5, 12, 3, 2.6)),
  jaw: poly([15, 18], [33, 18], [30, 24], [18, 24]),
};

function graoullyFront() {
  return toRows(paint([
    { shape: G3.wings, tone: 2, shade: 3, pixels: px(3, [5, 19], [8, 24], [43, 19], [40, 24]) },
    { shape: G3.tail, tone: 2, shade: 3 },
    { shape: G3.tailTip, tone: 1, shade: 2 },
    { shape: G3.legs, tone: 1, shade: 2, pixels: px(3, [14, 45], [16, 45], [31, 45], [33, 45]) },
    { shape: G3.body, tone: 1, shade: 2, pixels: warts([[16, 30], [32, 30], [17, 36]]) },
    { shape: G3.belly, tone: 0, shade: 1, pixels: [...stamp(21, 33, ['1111..']), ...stamp(20, 36, ['1111111']), ...stamp(21, 39, ['11111'])] },
    { shape: G3.horns, tone: 2, shade: 3 },
    { shape: union(G3.head, G3.bumps), tone: 1, shade: 2, pixels: warts([[18, 16], [30, 16]]) },
    { shape: G3.jaw, tone: 3, outline: false, pixels: [...px(0, [16, 18], [19, 19], [22, 18], [26, 18], [29, 19], [32, 18], [20, 23], [24, 22], [28, 23]), ...px(2, [23, 21], [24, 21], [25, 21])] },
    { pixels: [...toadEye(16, 10), ...toadEye(28, 10), ...drip(19, 27), ...drip(2, 34)] },
  ]));
}

function graoullyBack() {
  return toRows(paint([
    { shape: G3.wings, tone: 2, shade: 3, pixels: px(3, [5, 19], [8, 24], [43, 19], [40, 24]) },
    { shape: G3.legs, tone: 1, shade: 2 },
    { shape: union(G3.body, G3.head, G3.bumps), tone: 1, shade: 2, pixels: warts([[19, 26], [28, 29], [23, 33], [18, 36], [30, 37], [24, 15], [20, 19], [28, 19]]) },
    { shape: union(poly([22, 24], [24, 20], [26, 24]), poly([22, 31], [24, 27], [26, 31]), poly([22, 38], [24, 34], [26, 38])), tone: 2, shade: 3 },
    { shape: G3.horns, tone: 2, shade: 3 },
    { shape: capsule([[24, 42], [32, 45], [40, 43], [44, 37]], 2.4), tone: 2, shade: 3 },
  ]));
}

const GRAOULLY_ICON = iconFrom([
  { shape: mirrorX(poly([5, 7], [0.5, 2], [0.5, 10], [5, 11]), 8), tone: 2, shade: 3 },
  { shape: mirrorX(poly([5, 3], [4, 0], [7, 2]), 8), tone: 2, shade: 3 },
  { shape: ellipse(8, 11.5, 4.5, 4), tone: 1, shade: 2, light: { tone: 0, shape: ellipse(8, 12.5, 2, 2) } },
  { shape: ellipse(8, 5.5, 5, 3.5), tone: 1, shade: 2, pixels: [...px(3, [5, 4], [11, 4]), ...stamp(5, 6, ['303303']), ...stamp(6, 7, ['3333'])] },
]);

export const line = [
  { id: 'graoulet', front: graouletFront(), back: graouletBack(), icon: GRAOULET_ICON },
  { id: 'graoulard', front: graoulardFront(), back: graoulardBack(), icon: GRAOULARD_ICON },
  { id: 'graoully', front: graoullyFront(), back: graoullyBack(), icon: GRAOULLY_ICON },
];
