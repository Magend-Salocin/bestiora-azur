// Lignée du Drac (038 à 040, Terre et Eau) et Bolégan (041, Terre).
// Fiche : docs/bestiaire-folklorique/fiches/038-drac.md.
// Tones: 0 belly and highlights, 1 skin, 2 fins and spots, 3 ink.
import { capsule, ellipse, eyes, iconFrom as icon, mirrorX, paint, poly, px, rect, stamp, toRows, union } from '../creature-painter.js';

// ---------- 038 Dracounet: newt-like baby drac with gill fins ----------
const D1 = {
  tail: capsule([[29, 41], [36, 42], [40, 38]], 2),
  tailFin: poly([37, 38], [41, 32], [43, 37], [41, 41]),
  feet: union(ellipse(19, 44.5, 3.6, 1.6), ellipse(29, 44.5, 3.6, 1.6)),
  body: ellipse(24, 37.5, 8, 6.5),
  arms: mirrorX(capsule([[17.5, 35], [16.5, 40]], 1.6)),
  gills: mirrorX(poly([16.5, 24], [10, 19], [11.5, 23], [9, 25], [12, 27], [10, 30], [16.5, 28])),
  crest: poly([19, 21], [20, 16], [22, 19], [24, 14], [26, 19], [28, 16], [29, 21]),
  head: ellipse(24, 26, 8.5, 7),
  snout: ellipse(24, 30, 5, 2.8),
};

function dracounetFront() {
  return toRows(paint([
    { shape: D1.tail, tone: 1, shade: 2 },
    { shape: D1.tailFin, tone: 2, shade: 3 },
    { shape: D1.feet, tone: 1, shade: 2, pixels: px(3, [17, 45], [19, 45], [29, 45], [31, 45]) },
    { shape: D1.body, tone: 1, shade: 2, light: { tone: 0, shape: ellipse(24, 39, 4.5, 4) } },
    { shape: D1.arms, tone: 1, shade: 2 },
    { shape: D1.gills, tone: 2, shade: 3, light: { tone: 1, shape: union(poly([11, 21], [16, 25], [12, 24]), poly([37, 21], [32, 25], [36, 24])) } },
    { shape: D1.crest, tone: 2, shade: 3 },
    { shape: D1.head, tone: 1, shade: 2, light: { tone: 0, shape: ellipse(20, 23, 2.5, 1.5) }, pixels: px(2, [17, 27], [30, 26], [29, 21]) },
    { shape: D1.snout, tone: 0, shade: 1, pixels: [...px(3, [22, 29], [26, 29]), ...stamp(21, 31, ['3......3', '.333333.'])] },
    { pixels: eyes(19, 27, 24) },
  ]));
}

function dracounetBack() {
  return toRows(paint([
    { shape: D1.feet, tone: 1, shade: 2 },
    { shape: D1.arms, tone: 1, shade: 2 },
    { shape: D1.body, tone: 1, shade: 2, pixels: px(2, [21, 35], [22, 35], [27, 38], [23, 40]) },
    { shape: capsule([[24, 41], [30, 44], [36, 43], [39, 39]], 2), tone: 1, shade: 2 },
    { shape: poly([36, 39], [40, 33], [42, 38], [40, 42]), tone: 2, shade: 3 },
    { shape: D1.gills, tone: 2, shade: 3 },
    { shape: D1.head, tone: 1, shade: 2, pixels: px(2, [20, 24], [21, 24], [27, 27], [24, 30]) },
    { shape: D1.crest, tone: 2, shade: 3 },
    { shape: capsule([[24, 21], [24, 36]], 1), tone: 2, outline: false },
  ]));
}

const DRACOUNET_ICON = icon([
  { shape: poly([4, 7], [1, 4], [1.5, 8], [0.5, 11], [4, 10]), tone: 2, shade: 3 },
  { shape: poly([12, 7], [15, 4], [14.5, 8], [15.5, 11], [12, 10]), tone: 2, shade: 3 },
  { shape: poly([5, 5], [6, 1.5], [8, 4], [10, 1.5], [11, 5]), tone: 2, shade: 3 },
  { shape: ellipse(8, 13.5, 4.5, 2.5), tone: 1, shade: 2, light: { tone: 0, shape: ellipse(8, 14, 2, 1.5) } },
  { shape: ellipse(8, 8, 5, 4.2), tone: 1, shade: 2 },
  { shape: ellipse(8, 10, 2.8, 1.5), tone: 0, pixels: px(3, [7, 10], [8, 10]) },
  { pixels: [...px(3, [5, 7], [5, 8], [10, 7], [10, 8]), ...px(0, [5, 6], [10, 6])] },
]);

// ---------- 039 Dracorive: river drac standing up, small wings ----------
const D2 = {
  tail: capsule([[30, 40], [38, 42], [43, 38], [44, 32]], 2.2),
  tailFin: poly([42, 34], [44, 26], [47, 31], [46, 37]),
  wings: mirrorX(poly([17, 25], [9, 17], [6, 20], [7, 25], [5, 28], [10, 31], [16, 31])),
  legs: union(capsule([[18, 37], [17, 43]], 3), capsule([[30, 37], [31, 43]], 3)),
  feet: union(ellipse(16.5, 44.6, 4.2, 1.6), ellipse(31.5, 44.6, 4.2, 1.6)),
  body: ellipse(24, 32, 9.5, 8.5),
  arms: mirrorX(capsule([[16, 29], [15, 35]], 2)),
  gills: mirrorX(poly([17, 14], [11, 9], [12, 13], [9, 15], [12, 18], [11, 20], [17, 19])),
  crest: poly([18, 12], [19, 5], [21.5, 9], [24, 3], [26.5, 9], [29, 5], [30, 12]),
  head: ellipse(24, 16, 8, 6.5),
  snout: ellipse(24, 20, 5.5, 3),
};

function dracoriveFront() {
  return toRows(paint([
    { shape: D2.tail, tone: 1, shade: 2 },
    { shape: D2.tailFin, tone: 2, shade: 3 },
    { shape: D2.wings, tone: 2, shade: 3, light: { tone: 1, shape: union(poly([8, 20], [16, 27], [9, 24]), poly([40, 20], [32, 27], [39, 24])) }, pixels: px(3, [7, 27], [41, 27]) },
    { shape: D2.legs, tone: 1, shade: 2 },
    { shape: D2.feet, tone: 1, shade: 2, pixels: px(3, [14, 45], [16, 45], [18, 45], [30, 45], [32, 45], [34, 45]) },
    { shape: D2.body, tone: 1, shade: 2, light: { tone: 0, shape: ellipse(24, 34, 5, 5.5) },
      pixels: [...stamp(21, 31, ['333333', '......', '333333']), ...px(2, [16, 28], [31, 30], [32, 35])] },
    { shape: D2.arms, tone: 1, shade: 2, pixels: px(3, [14, 36], [16, 36], [32, 36], [34, 36]) },
    { shape: D2.gills, tone: 2, shade: 3, light: { tone: 1, shape: union(poly([12, 11], [16, 15], [13, 15]), poly([36, 11], [32, 15], [35, 15])) } },
    { shape: D2.crest, tone: 2, shade: 3 },
    { shape: D2.head, tone: 1, shade: 2, light: { tone: 0, shape: ellipse(20, 13, 2.5, 1.5) }, pixels: px(2, [29, 12], [18, 17]) },
    { shape: D2.snout, tone: 0, shade: 1, pixels: [...px(3, [22, 19], [26, 19]), ...stamp(20, 21, ['3........3', '.33333333.']), ...px(0, [21, 22], [27, 22])] },
    { pixels: eyes(19, 27, 14) },
  ]));
}

function dracoriveBack() {
  return toRows(paint([
    { shape: D2.legs, tone: 1, shade: 2 },
    { shape: D2.feet, tone: 1, shade: 2 },
    { shape: D2.arms, tone: 1, shade: 2 },
    { shape: D2.body, tone: 1, shade: 2, pixels: px(2, [19, 29], [20, 29], [29, 34], [22, 36], [28, 28]) },
    { shape: capsule([[24, 38], [30, 43], [38, 43], [43, 38], [44, 32]], 2.2), tone: 1, shade: 2 },
    { shape: poly([42, 34], [44, 26], [47, 31], [46, 37]), tone: 2, shade: 3 },
    { shape: D2.gills, tone: 2, shade: 3 },
    { shape: D2.head, tone: 1, shade: 2, pixels: px(2, [20, 15], [28, 17]) },
    { shape: D2.crest, tone: 2, shade: 3 },
    { shape: capsule([[24, 12], [24, 38]], 1), tone: 2, outline: false },
    { shape: D2.wings, tone: 2, shade: 3, light: { tone: 1, shape: union(poly([8, 20], [16, 27], [9, 24]), poly([40, 20], [32, 27], [39, 24])) } },
  ]));
}

const DRACORIVE_ICON = icon([
  { shape: poly([4, 6], [0.5, 2], [1.5, 6], [0.5, 9], [4, 9]), tone: 2, shade: 3 },
  { shape: poly([12, 6], [15.5, 2], [14.5, 6], [15.5, 9], [12, 9]), tone: 2, shade: 3 },
  { shape: poly([4.5, 4], [5.5, 0.5], [7, 3], [8, 0], [9, 3], [10.5, 0.5], [11.5, 4]), tone: 2, shade: 3 },
  { shape: ellipse(8, 14, 5.5, 3), tone: 1, shade: 2, light: { tone: 0, shape: ellipse(8, 14.5, 2.5, 2) } },
  { shape: ellipse(8, 7, 5, 4), tone: 1, shade: 2 },
  { shape: ellipse(8, 9.5, 3.5, 1.8), tone: 0, pixels: [...px(3, [6, 9], [10, 9]), ...stamp(6, 10, ['30003'])] },
  { pixels: [...px(3, [5, 6], [5, 7], [10, 6], [10, 7]), ...px(0, [5, 5], [10, 5])] },
]);

// ---------- 040 Dracrhodan: the drac of the Rhône, rising from the river ----------
const D3 = {
  wings: mirrorX(poly([16, 22], [7, 9], [1, 7], [2.5, 13], [0.5, 17], [3.5, 21], [1, 26], [6, 29], [6, 33], [12, 33], [17, 29])),
  tail: capsule([[32, 41], [40, 41], [45, 37], [45, 31]], 2.3),
  tailFin: poly([43, 33], [45, 24], [48, 29], [47.5, 36]),
  legs: union(capsule([[16, 37], [14, 42]], 3.6), capsule([[32, 37], [34, 42]], 3.6)),
  body: ellipse(24, 33, 10.5, 9.5),
  arms: mirrorX(capsule([[15, 29], [13, 36]], 2.4)),
  gills: mirrorX(poly([17.5, 13], [11, 7], [12, 11], [9, 13], [12, 16], [10, 19], [17.5, 18])),
  crest: poly([18, 10], [18.5, 4], [21, 7], [24, 2], [27, 7], [29.5, 4], [30, 10]),
  neck: poly([19.5, 27], [20, 17], [28, 17], [28.5, 27]),
  head: ellipse(24, 14, 7.5, 6),
  snout: ellipse(24, 19, 6, 3.4),
  river: union(ellipse(24, 45.5, 23, 2.6), ellipse(9, 43.5, 6, 1.6), ellipse(39, 43.5, 6, 1.6)),
};

const riverLayer = (detail) => ({ shape: D3.river, tone: 1, shade: 2, light: { tone: 0, shape: union(ellipse(9, 43, 3, 0.8), ellipse(39, 43, 3, 0.8)) },
  pixels: detail ? [...stamp(6, 46, ['333...3333.......3333...333']), ...px(0, [17, 45], [31, 45])] : stamp(6, 46, ['333...3333.......3333...333']) });

function dracrhodanFront() {
  return toRows(paint([
    { shape: D3.wings, tone: 2, shade: 3, light: { tone: 1, shape: union(poly([3, 10], [14, 21], [4, 15]), poly([45, 10], [34, 21], [44, 15]), poly([3, 23], [13, 28], [5, 28]), poly([45, 23], [35, 28], [43, 28])) },
      pixels: px(3, [3, 19], [6, 27], [8, 31], [45, 19], [42, 27], [40, 31]) },
    { shape: D3.tail, tone: 1, shade: 2 },
    { shape: D3.tailFin, tone: 2, shade: 3 },
    { shape: D3.legs, tone: 1, shade: 2 },
    { shape: D3.body, tone: 1, shade: 2, light: { tone: 0, shape: ellipse(24, 35, 6, 6.5) },
      pixels: [...stamp(19, 32, ['3333333333', '..........', '3333333333', '..........', '3333333333']), ...px(2, [15, 27], [16, 28], [32, 30], [33, 35])] },
    { shape: D3.arms, tone: 1, shade: 2, pixels: px(3, [11, 37], [13, 38], [15, 37], [33, 37], [35, 38], [37, 37]) },
    { shape: D3.neck, tone: 1, shade: 2, light: { tone: 0, shape: rect(22, 21, 26, 27) } },
    { shape: D3.gills, tone: 2, shade: 3, light: { tone: 1, shape: union(poly([12, 9], [17, 14], [13, 13]), poly([36, 9], [31, 14], [35, 13])) } },
    { shape: D3.crest, tone: 2, shade: 3 },
    { shape: D3.head, tone: 1, shade: 2, light: { tone: 0, shape: ellipse(20, 11, 2.5, 1.3) }, pixels: px(2, [29, 10], [18, 15]) },
    { shape: D3.snout, tone: 0, shade: 1, pixels: [...px(3, [21, 18], [27, 18]), ...stamp(19, 20, ['3333333333', '.0......0.'])] },
    { pixels: [...stamp(19, 12, ['333....333']), ...eyes(19, 27, 13, { height: 2 })] },
    riverLayer(true),
  ]));
}

function dracrhodanBack() {
  return toRows(paint([
    { shape: D3.legs, tone: 1, shade: 2 },
    { shape: D3.body, tone: 1, shade: 2, pixels: px(2, [18, 28], [19, 28], [29, 32], [22, 37], [28, 26]) },
    { shape: capsule([[24, 40], [32, 42], [40, 41], [45, 36], [45, 31]], 2.3), tone: 1, shade: 2 },
    { shape: poly([43, 33], [45, 24], [48, 29], [47.5, 36]), tone: 2, shade: 3 },
    { shape: D3.arms, tone: 1, shade: 2 },
    { shape: D3.neck, tone: 1, shade: 2 },
    { shape: D3.gills, tone: 2, shade: 3 },
    { shape: D3.head, tone: 1, shade: 2, pixels: px(2, [21, 12], [27, 15]) },
    { shape: D3.crest, tone: 2, shade: 3 },
    { shape: capsule([[24, 10], [24, 40]], 1), tone: 2, outline: false },
    { shape: D3.wings, tone: 2, shade: 3, light: { tone: 1, shape: union(poly([3, 10], [14, 21], [4, 15]), poly([45, 10], [34, 21], [44, 15])) } },
    riverLayer(false),
  ]));
}

const DRACRHODAN_ICON = icon([
  { shape: poly([4, 8], [0, 2], [0.5, 7], [0, 11], [4, 12]), tone: 2, shade: 3, light: { tone: 1, shape: poly([1, 4], [4, 9], [1, 8]) } },
  { shape: poly([12, 8], [16, 2], [15.5, 7], [16, 11], [12, 12]), tone: 2, shade: 3, light: { tone: 1, shape: poly([15, 4], [12, 9], [15, 8]) } },
  { shape: poly([4.5, 4.5], [5, 1], [7, 3], [8, 0.5], [9, 3], [11, 1], [11.5, 4.5]), tone: 2, shade: 3 },
  { shape: ellipse(8, 14.5, 5.5, 2.5), tone: 1, shade: 2 },
  { shape: ellipse(8, 7.5, 5, 3.8), tone: 1, shade: 2 },
  { shape: ellipse(8, 10.5, 3.8, 2), tone: 0, shade: 1, pixels: [...stamp(5, 11, ['333333']), ...px(0, [5, 12], [10, 12])] },
  { pixels: [...px(3, [4, 6], [5, 6], [6, 6], [9, 6], [10, 6], [11, 6], [5, 7], [6, 7], [9, 7], [10, 7]), ...px(0, [6, 7], [10, 7])] },
]);

// ---------- 041 Bolégan: little digger of the underground folk ----------
const B = {
  feet: union(ellipse(18, 44.6, 4, 1.6), ellipse(30, 44.6, 4, 1.6)),
  body: ellipse(24, 37, 9.5, 7.5),
  hands: union(ellipse(12.5, 36, 4.2, 3.6), ellipse(35.5, 36, 4.2, 3.6)),
  arms: mirrorX(capsule([[17, 33], [13, 36]], 2)),
  hood: poly([13, 28], [16, 19], [21, 14], [27, 12], [33, 9], [32, 15], [35, 22], [35, 28]),
  face: ellipse(24, 26, 7.5, 5.5),
  nose: ellipse(24, 28, 3, 2.4),
  lantern: rect(37, 26, 42, 32),
};

function boleganFront() {
  return toRows(paint([
    { shape: B.feet, tone: 1, shade: 2, pixels: px(3, [16, 45], [18, 45], [28, 45], [30, 45]) },
    { shape: B.body, tone: 2, shade: 3, light: { tone: 1, shape: ellipse(21, 36, 3.5, 3) }, pixels: [...stamp(15, 39, ['333333333333333333']), ...px(0, [23, 39], [24, 39])] },
    { shape: B.arms, tone: 2, shade: 3 },
    { shape: B.hands, tone: 1, shade: 2, light: { tone: 0, shape: union(ellipse(11.5, 35, 1.5, 1.2), ellipse(34.5, 35, 1.5, 1.2)) },
      pixels: px(3, [9, 38], [11, 39], [13, 39], [35, 39], [37, 39], [39, 38]) },
    { shape: B.hood, tone: 2, shade: 3, light: { tone: 1, shape: poly([17, 20], [22, 15], [20, 20]) } },
    { shape: B.face, tone: 1, shade: 2, light: { tone: 0, shape: ellipse(24, 28.5, 5, 2.5) } },
    { shape: B.nose, tone: 0, shade: 1, pixels: px(3, [23, 30], [25, 30]) },
    // Small mole eyes, squinting, and a beard of roots.
    { pixels: [...stamp(19, 24, ['333....333', '.0......0.']), ...stamp(19, 31, ['3.3.3.3.3.3']), ...px(2, [20, 32], [24, 33], [28, 32])] },
  ]));
}

function boleganBack() {
  return toRows(paint([
    { shape: B.feet, tone: 1, shade: 2 },
    { shape: B.hands, tone: 1, shade: 2 },
    { shape: B.arms, tone: 2, shade: 3 },
    { shape: B.body, tone: 2, shade: 3, pixels: stamp(15, 39, ['333333333333333333']) },
    { shape: union(B.hood, ellipse(24, 26, 9, 6)), tone: 2, shade: 3, light: { tone: 1, shape: poly([17, 20], [22, 15], [20, 20]) }, pixels: px(3, [24, 22], [24, 26], [24, 30]) },
    // Sack of roots and pebbles on the back.
    { shape: ellipse(24, 37, 5, 4.5), tone: 1, shade: 2, pixels: [...px(0, [22, 35]), ...stamp(21, 33, ['333333'])] },
  ]));
}

const BOLEGAN_ICON = icon([
  { shape: poly([2, 13], [3, 7], [7, 3], [12, 1], [11, 5], [14, 9], [14, 13]), tone: 2, shade: 3, light: { tone: 1, shape: poly([4, 8], [7, 4], [6, 8]) } },
  { shape: ellipse(8, 11, 5, 3.6), tone: 1, shade: 2, light: { tone: 0, shape: ellipse(8, 12.5, 3, 1.5) } },
  { shape: ellipse(8, 12, 1.8, 1.4), tone: 0, pixels: px(3, [7, 13], [9, 13]) },
  { shape: rect(4, 15, 12, 16), tone: 2, outline: false },
  { pixels: [...px(3, [5, 9], [6, 9], [10, 9], [11, 9]), ...px(3, [4, 15], [6, 15], [10, 15], [12, 15])] },
]);

export const line = [
  { id: 'salamoue', front: dracounetFront(), back: dracounetBack(), icon: DRACOUNET_ICON },
  { id: 'salamarde', front: dracoriveFront(), back: dracoriveBack(), icon: DRACORIVE_ICON },
  { id: 'salamassif', front: dracrhodanFront(), back: dracrhodanBack(), icon: DRACRHODAN_ICON },
  { id: 'fouisseron', front: boleganFront(), back: boleganBack(), icon: BOLEGAN_ICON },
];
