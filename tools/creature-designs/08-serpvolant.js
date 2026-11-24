// Lignée du Serpent volant (104 Serpvolin et 105 Serpvolant, Vent) et Koril (106, Roche et Vent).
// Fiche : docs/bestiaire-folklorique/fiches/104-serpvolant.md.
// Tones: 0 eyes, belly and wind, 1 scales and stone, 2 wings and carvings, 3 ink.
import { capsule, ellipse, iconFrom, mirrorX, paint, poly, px, stamp, toRows, union } from '../creature-painter.js';

const gust = (x, y) => stamp(x, y, ['33333..', '.....3.', '..333.3', '.3...3.', '..33...']);
/** Belly scales: short ink ticks along a polyline. */
const ticks = (points) => points.map(([x, y]) => [x, y, 2]);

// ---------- 104 Serpvolin: a small serpent hovering on two leathery wings ----------
const S1 = {
  body: capsule([[30, 42], [36, 38], [33, 33], [24, 32], [20, 27], [22, 22]], 2.8),
  head: ellipse(21, 18, 5, 4),
  snout: ellipse(16.5, 19.5, 3, 2),
  crest: poly([22, 14], [27, 9], [26, 15], [30, 13], [26, 18]),
  wings: union(poly([27, 30], [39, 18], [43, 21], [40, 25], [41, 29], [36, 30]), poly([22, 30], [8, 24], [6, 28], [9, 31], [9, 35], [16, 33])),
  tail: poly([29, 42], [22, 44], [26, 40]),
};

function serpvolinFront() {
  return toRows(paint([
    { shape: S1.wings, tone: 2, shade: 3, pixels: [...px(3, [38, 22], [37, 26], [10, 29], [12, 32])] },
    { shape: S1.tail, tone: 1, shade: 2 },
    { shape: S1.body, tone: 1, shade: 2, light: { tone: 0, shape: capsule([[25, 33], [21, 28]], 0.8) }, pixels: ticks([[33, 36], [31, 33], [27, 33]]) },
    { shape: S1.crest, tone: 2, shade: 3 },
    { shape: union(S1.head, S1.snout), tone: 1, shade: 2, pixels: [...stamp(19, 16, ['00', '03']), ...px(3, [14, 19]), ...stamp(15, 21, ['333'])] },
    { pixels: [...gust(4, 40), ...gust(38, 8)] },
  ]));
}

function serpvolinBack() {
  return toRows(paint([
    { shape: S1.tail, tone: 1, shade: 2 },
    { shape: S1.body, tone: 1, shade: 2, pixels: ticks([[33, 36], [31, 33], [27, 33], [22, 28]]) },
    { shape: S1.head, tone: 1, shade: 2 },
    { shape: S1.crest, tone: 2, shade: 3 },
    { shape: S1.wings, tone: 2, shade: 3, light: { tone: 1, shape: union(ellipse(38, 23, 1.5, 1.5), ellipse(10, 29, 1.5, 1.5)) } },
    { pixels: gust(4, 40) },
  ]));
}

const SERPVOLIN_ICON = iconFrom([
  { shape: union(poly([9, 9], [15, 3], [15, 9]), poly([7, 10], [1, 6], [2, 12])), tone: 2, shade: 3 },
  { shape: capsule([[12, 15], [9, 12], [7, 8], [8, 5]], 1.6), tone: 1, shade: 2 },
  { shape: union(ellipse(7, 4.5, 3, 2.5), ellipse(4, 5.5, 2, 1.4)), tone: 1, shade: 2, pixels: px(3, [6, 4], [3, 5]) },
]);

// ---------- 105 Serpvolant: the great flying serpent, feathered wings spread over the valley ----------
const S2 = {
  body: capsule([[44, 40], [38, 44], [30, 41], [28, 34], [22, 31], [16, 26], [14, 19]], 3.4),
  tailFin: poly([44, 39], [47, 33], [46, 42]),
  head: ellipse(13, 13, 6.5, 5),
  jaw: ellipse(7, 15, 4, 2.5),
  crest: poly([14, 8], [19, 2], [20, 9], [25, 6], [21, 12]),
  wingFar: poly([26, 30], [33, 10], [38, 7], [45, 9], [42, 14], [46, 17], [41, 21], [44, 25], [36, 28]),
  wingNear: poly([20, 28], [8, 30], [2, 34], [5, 37], [2, 40], [9, 41], [7, 45], [17, 39], [24, 35]),
};

function serpvolantFront() {
  return toRows(paint([
    { shape: S2.wingFar, tone: 2, shade: 3, light: { tone: 1, shape: poly([34, 13], [40, 10], [36, 18]) }, pixels: px(3, [38, 15], [39, 20], [37, 24]) },
    { shape: S2.tailFin, tone: 2, shade: 3 },
    { shape: S2.body, tone: 1, shade: 2, light: { tone: 0, shape: capsule([[26, 35], [20, 29]], 1) }, pixels: ticks([[34, 43], [29, 38], [24, 33], [18, 28]]) },
    { shape: S2.crest, tone: 2, shade: 3 },
    { shape: union(S2.head, S2.jaw), tone: 1, shade: 2, pixels: [...stamp(12, 10, ['000', '033']), ...px(3, [4, 14]), ...stamp(5, 16, ['3333']), ...px(0, [6, 17], [8, 17])] },
    { shape: S2.wingNear, tone: 2, shade: 3, light: { tone: 1, shape: poly([10, 33], [18, 31], [12, 36]) }, pixels: px(3, [8, 36], [11, 39], [15, 37]) },
    { pixels: [...gust(30, 2), ...gust(24, 44 - 5)] },
  ]));
}

function serpvolantBack() {
  return toRows(paint([
    { shape: S2.tailFin, tone: 2, shade: 3 },
    { shape: S2.body, tone: 1, shade: 2, pixels: ticks([[34, 43], [29, 38], [24, 33], [18, 28]]) },
    { shape: S2.head, tone: 1, shade: 2 },
    { shape: S2.crest, tone: 2, shade: 3 },
    { shape: union(S2.wingFar, S2.wingNear), tone: 2, shade: 3, light: { tone: 1, shape: union(poly([34, 13], [40, 10], [36, 18]), poly([10, 33], [18, 31], [12, 36])) } },
    { pixels: gust(30, 2) },
  ]));
}

const SERPVOLANT_ICON = iconFrom([
  { shape: poly([8, 9], [12, 2], [16, 3], [14, 8], [16, 11], [11, 12]), tone: 2, shade: 3 },
  { shape: capsule([[15, 15], [10, 14], [7, 10], [6, 6]], 1.7), tone: 1, shade: 2 },
  { shape: union(ellipse(5.5, 4.5, 3.5, 3), ellipse(2.5, 5.5, 2, 1.4)), tone: 1, shade: 2, pixels: px(3, [5, 3], [1, 5]) },
  { shape: poly([6, 11], [1, 12], [2, 15], [8, 13]), tone: 2, shade: 3 },
]);

// ---------- 106 Koril: a little dancing standing stone, spinning in its own whirlwind ----------
const K = {
  stone: poly([15, 41], [14, 30], [16, 19], [19, 12], [23, 8], [28, 9], [32, 16], [34, 27], [33, 41]),
  feet: union(ellipse(19, 44, 3.5, 1.6), ellipse(30, 43, 3.5, 1.6)),
  legs: union(capsule([[20, 40], [19, 43]], 1.6), capsule([[28, 40], [30, 42]], 1.6)),
  arms: union(capsule([[16, 28], [11, 26], [9, 22]], 1.8), capsule([[32, 30], [37, 32], [40, 30]], 1.8)),
  whirl: union(capsule([[6, 35], [14, 38], [32, 38], [41, 34]], 0.7), capsule([[8, 18], [16, 14], [33, 14], [40, 18]], 0.7)),
};

function korilFront() {
  return toRows(paint([
    { shape: K.whirl, tone: 2, outline: false },
    { shape: K.legs, tone: 1, shade: 2 },
    { shape: K.feet, tone: 1, shade: 2 },
    { shape: K.arms, tone: 1, shade: 2 },
    { shape: K.stone, tone: 1, shade: 2, light: { tone: 0, shape: poly([19, 16], [22, 11], [19, 26]) },
      pixels: [...stamp(21, 22, ['33..33', '03..03']), ...stamp(23, 27, ['33']), ...stamp(21, 32, ['22222', '2...2', '2.2.2', '2..22']), ...px(2, [30, 20], [31, 24], [17, 36])] },
    { pixels: [...px(3, [5, 35], [42, 33], [7, 18], [41, 18]), ...gust(36, 4)] },
  ]));
}

function korilBack() {
  return toRows(paint([
    { shape: K.whirl, tone: 2, outline: false },
    { shape: K.legs, tone: 1, shade: 2 },
    { shape: K.feet, tone: 1, shade: 2 },
    { shape: K.arms, tone: 1, shade: 2 },
    { shape: K.stone, tone: 1, shade: 2, pixels: stamp(21, 20, ['22222', '2...2', '2.2.2', '2...2', '22222']) },
    { pixels: px(3, [5, 35], [42, 33], [7, 18], [41, 18]) },
  ]));
}

const KORIL_ICON = iconFrom([
  { shape: union(capsule([[6, 14], [6, 15]], 1.2), capsule([[10, 14], [10.5, 15]], 1.2)), tone: 1, shade: 2 },
  { shape: union(capsule([[5, 8], [2, 5]], 1), capsule([[11, 9], [14, 8]], 1)), tone: 1, shade: 2 },
  { shape: poly([5, 14], [5, 6], [7, 1], [9, 1], [11, 6], [11, 14]), tone: 1, shade: 2, pixels: [...px(3, [6, 6], [9, 6]), ...px(3, [7, 9], [8, 9])] },
  { shape: capsule([[1, 12], [5, 13]], 0.5), tone: 3, outline: false },
  { shape: capsule([[11, 12], [15, 11]], 0.5), tone: 3, outline: false },
]);

export const line = [
  { id: 'volplanin', front: serpvolinFront(), back: serpvolinBack(), icon: SERPVOLIN_ICON },
  { id: 'volplaneur', front: serpvolantFront(), back: serpvolantBack(), icon: SERPVOLANT_ICON },
  { id: 'eolithe', front: korilFront(), back: korilBack(), icon: KORIL_ICON },
];
