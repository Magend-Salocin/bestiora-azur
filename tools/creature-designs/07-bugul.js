// Lignée du Bugul Noz (096 et 097, Flore) et Roncefée (098, Flore et Roche).
// Fiche : docs/bestiaire-folklorique/fiches/096-bugul-noz.md.
// Tones: 0 teeth, eyes and glints, 1 leaves and stone, 2 dark leaves and brambles, 3 ink.
import { capsule, ellipse, iconFrom, minus, mirrorX, paint, poly, px, rect, stamp, toRows, union } from '../creature-painter.js';

/** Leafy hem: pointed leaf tips along the bottom edge. */
function leafHem(x0, x1, y0, y1, leaves) {
  const points = [[x0, y0]];
  const step = (x1 - x0) / leaves;
  for (let i = 0; i < leaves; i += 1) points.push([x0 + step * (i + 0.5), y1], [x0 + step * (i + 1), y0 + (y1 - y0) * 0.4]);
  points.push([x1, y0]);
  return poly(...points);
}
/** Row of teeth alternating up and down along a jaw line. */
function teeth(x0, x1, y) {
  const pixels = [];
  for (let x = x0; x <= x1; x += 2) pixels.push([x, y - 1, 0], [x + 1, y + 1, 0]);
  return pixels;
}
const berry = (x, y) => stamp(x, y, ['.33.', '3033', '3333', '.33.']);
const thorns = (list) => list.map(([x, y]) => [x, y, 3]);

// ---------- 096 Bugulin: a snapping bud in a wide leaf hat ----------
const G1 = {
  roots: union(ellipse(24, 44.5, 9, 1.5), poly([17, 45], [20, 41], [22, 45]), poly([26, 45], [28, 41], [31, 45])),
  stem: capsule([[24, 34], [24, 43]], 1.6),
  leaves: mirrorX(poly([23, 41], [13, 36], [10, 39], [16, 43])),
  head: ellipse(24, 28, 8, 6),
  brim: ellipse(24, 21.5, 12.5, 2.5),
  crown: ellipse(24, 18.5, 5.5, 3.5),
};

function bugulinFront() {
  return toRows(paint([
    { shape: G1.roots, tone: 2, shade: 3 },
    { shape: G1.stem, tone: 2, shade: 3 },
    { shape: G1.leaves, tone: 1, shade: 2, pixels: px(2, [14, 38], [17, 40], [34, 38], [31, 40]) },
    { shape: G1.head, tone: 1, shade: 2, light: { tone: 0, shape: ellipse(20, 26, 1.5, 1) }, pixels: [...stamp(16, 29, ['33333333333333333']), ...teeth(17, 31, 29), ...stamp(19, 25, ['33....33', '30....30'])] },
    { shape: G1.crown, tone: 2, shade: 3 },
    { shape: G1.brim, tone: 2, shade: 3, light: { tone: 1, shape: ellipse(17, 21, 3, 0.8) } },
  ]));
}

function bugulinBack() {
  return toRows(paint([
    { shape: G1.roots, tone: 2, shade: 3 },
    { shape: G1.stem, tone: 2, shade: 3 },
    { shape: G1.leaves, tone: 1, shade: 2 },
    { shape: G1.head, tone: 1, shade: 2, pixels: px(2, [24, 26], [24, 28], [24, 30]) },
    { shape: G1.crown, tone: 2, shade: 3 },
    { shape: G1.brim, tone: 2, shade: 3, light: { tone: 1, shape: ellipse(17, 21, 3, 0.8) } },
  ]));
}

const BUGULIN_ICON = iconFrom([
  { shape: capsule([[8, 11], [8, 15]], 1), tone: 2, shade: 3 },
  { shape: mirrorX(poly([7.5, 14], [2, 11], [2, 14]), 8), tone: 1, shade: 2 },
  { shape: ellipse(8, 8.5, 5, 3.5), tone: 1, shade: 2, pixels: [...stamp(4, 9, ['333333333']), ...px(0, [5, 8], [7, 8], [9, 8], [11, 8], [6, 10], [8, 10], [10, 10]), ...px(3, [6, 6], [10, 6])] },
  { shape: ellipse(8, 2.5, 3, 2), tone: 2, shade: 3 },
  { shape: ellipse(8, 4.3, 7.5, 1.3), tone: 2, shade: 3 },
]);

// ---------- 097 Bugul Noz: the night shepherd, a great snapping plant under a broad hat ----------
const G2 = {
  crook: union(capsule([[40, 44], [40, 12]], 1.1), minus(ellipse(37, 12, 3.5, 3.5), union(ellipse(37, 12, 2, 2), rect(30, 12, 48, 20)))),
  roots: union(ellipse(22, 45, 14, 1.5), poly([9, 46], [12, 41], [15, 46]), poly([28, 46], [31, 41], [34, 46])),
  cloak: union(poly([13, 16], [31, 16], [35, 38], [9, 38]), leafHem(8, 36, 36, 45, 6)),
  arm: capsule([[31, 24], [37, 27], [39, 27]], 2),
  jaw: ellipse(22, 22, 9, 7),
  mouth: ellipse(22, 23, 6.5, 3.5),
  brim: ellipse(22, 12.5, 17, 3),
  crown: ellipse(22, 8.5, 7.5, 4.5),
};

function bugulNozFront() {
  return toRows(paint([
    { shape: G2.crook, tone: 2, shade: 3 },
    { shape: G2.roots, tone: 2, shade: 3 },
    { shape: G2.cloak, tone: 2, shade: 3, light: { tone: 1, shape: union(poly([13, 30], [17, 25], [16, 36]), poly([24, 32], [28, 28], [27, 37])) }, pixels: px(3, [21, 29], [21, 34], [29, 33]) },
    { shape: G2.jaw, tone: 1, shade: 2, light: { tone: 0, shape: ellipse(16, 19, 1.5, 1) } },
    { shape: G2.mouth, tone: 3, outline: false, pixels: [...teeth(16, 27, 20).filter(([, y]) => y >= 20), ...teeth(17, 27, 25).filter(([, y]) => y <= 25)] },
    { shape: G2.arm, tone: 2, shade: 3 },
    { shape: G2.crown, tone: 2, shade: 3 },
    { shape: G2.brim, tone: 2, shade: 3, light: { tone: 1, shape: ellipse(12, 12, 4, 0.8) } },
    { pixels: stamp(17, 15, ['00......00']) },
  ]));
}

function bugulNozBack() {
  return toRows(paint([
    { shape: G2.crook, tone: 2, shade: 3 },
    { shape: G2.roots, tone: 2, shade: 3 },
    { shape: union(G2.cloak, ellipse(22, 22, 9, 7)), tone: 2, shade: 3, light: { tone: 1, shape: union(poly([13, 30], [17, 25], [16, 36]), poly([24, 32], [28, 28], [27, 37])) }, pixels: px(3, [22, 20], [22, 26], [18, 32], [26, 32]) },
    { shape: G2.arm, tone: 2, shade: 3 },
    { shape: G2.crown, tone: 2, shade: 3 },
    { shape: G2.brim, tone: 2, shade: 3, light: { tone: 1, shape: ellipse(12, 12, 4, 0.8) } },
  ]));
}

const BUGUL_NOZ_ICON = iconFrom([
  { shape: capsule([[14, 4], [14, 15]], 0.6), tone: 2 },
  { shape: union(poly([4, 8], [12, 8], [14, 15.5], [2, 15.5])), tone: 2, shade: 3 },
  { shape: ellipse(8, 9, 4.5, 3.5), tone: 1, shade: 2, pixels: [...stamp(4, 9, ['333333333']), ...px(0, [5, 8], [7, 8], [9, 8], [11, 8], [6, 10], [8, 10], [10, 10])] },
  { shape: ellipse(8, 2.5, 3.5, 2.2), tone: 2, shade: 3 },
  { shape: ellipse(8, 4.5, 7.5, 1.3), tone: 2, shade: 3, pixels: px(0, [6, 6], [10, 6]) },
]);

// ---------- 098 Roncefée: a boulder overgrown with brambles, leaf wings and berries ----------
const R = {
  wings: mirrorX(union(poly([14, 30], [3, 22], [1, 27], [5, 32], [12, 33]), poly([16, 27], [9, 16], [6, 19], [8, 25], [14, 29]))),
  rock: ellipse(24, 35, 13, 10),
  ground: ellipse(24, 45.5, 15, 1.5),
  brambles: union(capsule([[11, 37], [17, 34], [24, 36], [31, 34], [37, 37]], 1), capsule([[14, 42], [22, 40], [30, 42]], 1), capsule([[31, 34], [33, 29], [30, 25], [26, 24]], 1)),
  blossom: ellipse(24, 23.5, 2.8, 2.5),
};
const BRAMBLE_THORNS = thorns([[14, 35], [20, 34], [27, 36], [34, 35], [18, 41], [26, 41], [33, 31], [31, 26]]);

function roncefeeFront() {
  return toRows(paint([
    { shape: R.wings, tone: 1, shade: 2, light: { tone: 0, shape: union(poly([4, 25], [11, 29], [4, 27]), poly([44, 25], [37, 29], [44, 27])) }, pixels: px(2, [6, 26], [9, 28], [11, 22], [42, 26], [39, 28], [37, 22]) },
    { shape: R.ground, tone: 2, outline: false },
    { shape: R.rock, tone: 1, shade: 2, light: { tone: 0, shape: ellipse(17, 29, 2.5, 1.5) }, pixels: [...px(2, [30, 40], [16, 40]), ...stamp(19, 28, ['33....33', '30....30']), ...stamp(22, 31, ['3..3', '.33.'])] },
    { shape: R.brambles, tone: 2, outline: false, pixels: BRAMBLE_THORNS },
    { shape: R.blossom, tone: 1, shade: 2, pixels: px(0, [24, 23]) },
    { pixels: [...berry(8, 36), ...berry(36, 37), ...berry(24, 41)] },
  ]));
}

function roncefeeBack() {
  return toRows(paint([
    { shape: R.ground, tone: 2, outline: false },
    { shape: R.rock, tone: 1, shade: 2, light: { tone: 0, shape: ellipse(18, 29, 3, 1.5) }, pixels: px(2, [22, 31], [29, 30], [17, 40]) },
    { shape: R.brambles, tone: 2, outline: false, pixels: BRAMBLE_THORNS },
    { shape: R.wings, tone: 1, shade: 2, pixels: px(2, [6, 26], [9, 28], [11, 22], [42, 26], [39, 28], [37, 22]) },
    { pixels: [...berry(8, 36), ...berry(36, 37)] },
  ]));
}

const RONCEFEE_ICON = iconFrom([
  { shape: mirrorX(poly([5, 10], [0.5, 6], [0.5, 10], [3, 12]), 8), tone: 1, shade: 2 },
  { shape: ellipse(8, 10.5, 5.5, 4.5), tone: 1, shade: 2, pixels: [...px(3, [6, 9], [10, 9]), ...px(2, [3, 12], [4, 11], [5, 12], [6, 12], [10, 12], [11, 12], [12, 11], [13, 12]), ...px(3, [4, 12], [12, 12])] },
  { shape: ellipse(8, 5, 1.5, 1.3), tone: 1, shade: 2 },
]);

export const line = [
  { id: 'dionelle', front: bugulinFront(), back: bugulinBack(), icon: BUGULIN_ICON },
  { id: 'dionavore', front: bugulNozFront(), back: bugulNozBack(), icon: BUGUL_NOZ_ICON },
  { id: 'ronceroc', front: roncefeeFront(), back: roncefeeBack(), icon: RONCEFEE_ICON },
];
