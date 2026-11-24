// Lignée de la Cabro d'Or (101 Cabrillon, 102 Cabridor, Combat ; 103 Cabro d'Or, Combat et Roche) :
// la chèvre d'or des Baux. Fiche : docs/bestiaire-folklorique/fiches/101-cabro.md.
// Tones: 0 gold shine and eyes, 1 golden coat, 2 horns, hooves and rock, 3 ink.
import { capsule, ellipse, iconFrom, paint, poly, px, stamp, toRows, union } from '../creature-painter.js';

const glint = (x, y) => stamp(x, y, ['.3.', '303', '.3.']);

/** Goat seen from the side, facing left. s scales the body around the ground line. */
function goat({ x = 26, s = 1, horn, beard = false }) {
  const k = (v) => v * s;
  const ground = 45;
  const bodyY = ground - k(12);
  return {
    legsBack: union(capsule([[x + k(8), bodyY + k(3)], [x + k(9), ground - 1]], k(1.5)), capsule([[x - k(4), bodyY + k(3)], [x - k(5), ground - 1]], k(1.5))),
    legsFront: union(capsule([[x + k(5), bodyY + k(3)], [x + k(5), ground - 0.5]], k(1.7)), capsule([[x - k(7), bodyY + k(3)], [x - k(7), ground - 0.5]], k(1.7))),
    hooves: [...px(3, [Math.round(x + k(5)), ground], [Math.round(x - k(7)), ground])],
    body: ellipse(x, bodyY, k(10), k(6)),
    tail: poly([x + k(9), bodyY - k(3)], [x + k(13), bodyY - k(7)], [x + k(11), bodyY - k(1)]),
    neck: capsule([[x - k(7), bodyY - k(1)], [x - k(10), bodyY - k(7)]], k(3)),
    head: ellipse(x - k(12), bodyY - k(9), k(4.5), k(4)),
    snout: ellipse(x - k(16), bodyY - k(7.5), k(3), k(2.4)),
    ear: poly([x - k(9), bodyY - k(10)], [x - k(4), bodyY - k(8)], [x - k(9), bodyY - k(8)]),
    horn,
    beard: beard ? poly([x - k(17), bodyY - k(6)], [x - k(14), bodyY - k(5)], [x - k(15.5), bodyY + k(1)]) : null,
    eye: [Math.round(x - k(13)), Math.round(bodyY - k(10))],
    nose: [Math.round(x - k(18.5)), Math.round(bodyY - k(8))],
  };
}

function goatLayers(g, { coatLight, extra = [] }) {
  return [
    { shape: g.legsBack, tone: 2, shade: 3 },
    { shape: g.tail, tone: 1, shade: 2 },
    { shape: g.body, tone: 1, shade: 2, light: { tone: 0, shape: coatLight } },
    { shape: g.legsFront, tone: 1, shade: 2, pixels: g.hooves },
    { shape: g.neck, tone: 1, shade: 2 },
    { shape: g.horn, tone: 2, shade: 3, light: { tone: 1, shape: ellipse(g.eye[0] + 2, g.eye[1] - 5, 1, 1) } },
    { shape: g.ear, tone: 1, shade: 2 },
    { shape: union(g.head, g.snout), tone: 1, shade: 2, pixels: [...stamp(g.eye[0], g.eye[1], ['00', '03']), [g.nose[0], g.nose[1], 3]] },
    ...(g.beard ? [{ shape: g.beard, tone: 0, shade: 1 }] : []),
    ...extra,
  ];
}

// ---------- 101 Cabrillon: a golden kid with budding horns ----------
const G1 = goat({ x: 28, s: 0.85, horn: poly([16, 25], [18, 19], [20, 24]) });

function cabrillonFront() {
  return toRows(paint(goatLayers(G1, { coatLight: ellipse(26, 32, 4, 1.5), extra: [{ pixels: [...glint(37, 18), ...glint(7, 36)] }] })));
}

function cabrillonBack() {
  return toRows(paint([
    { shape: union(capsule([[19, 37], [19, 45]], 1.6), capsule([[29, 37], [29, 45]], 1.6)), tone: 1, shade: 2 },
    { shape: ellipse(24, 35, 9, 7), tone: 1, shade: 2, light: { tone: 0, shape: ellipse(21, 32, 3, 1.5) } },
    { shape: union(capsule([[21, 39], [20, 45]], 1.8), capsule([[27, 39], [28, 45]], 1.8)), tone: 1, shade: 2 },
    { shape: union(poly([19, 24], [17, 18], [21, 23]), poly([29, 24], [31, 18], [27, 23])), tone: 2, shade: 3 },
    { shape: union(ellipse(24, 27, 5, 4.5), poly([19, 26], [13, 27], [19, 28]), poly([29, 26], [35, 27], [29, 28])), tone: 1, shade: 2 },
    { shape: poly([24, 37], [22, 32], [26, 32]), tone: 0, shade: 1 },
    { pixels: glint(37, 18) },
  ]));
}

const CABRILLON_ICON = iconFrom([
  { shape: union(capsule([[6, 11], [6, 15]], 1), capsule([[12, 11], [12, 15]], 1)), tone: 1, shade: 2 },
  { shape: ellipse(10, 10, 4.5, 3), tone: 1, shade: 2 },
  { shape: poly([4, 4], [6, 0.5], [7, 4]), tone: 2, shade: 3 },
  { shape: union(ellipse(5, 6, 3, 2.6), ellipse(2.5, 7.5, 2, 1.6)), tone: 1, shade: 2, pixels: px(3, [4, 5], [1, 7]) },
]);

// ---------- 102 Cabridor: a sturdy goat with swept-back horns and a golden beard ----------
const G2 = goat({ x: 28, s: 1.15, horn: union(capsule([[16, 17], [17, 11], [22, 7], [27, 9]], 1.8), poly([26, 7], [30, 10], [26, 11])), beard: true });

function cabridorFront() {
  return toRows(paint(goatLayers(G2, { coatLight: ellipse(25, 28, 5, 2), extra: [{ pixels: [...glint(40, 12), ...glint(4, 20)] }] })));
}

function cabridorBack() {
  return toRows(paint([
    { shape: union(capsule([[17, 35], [17, 45]], 2), capsule([[31, 35], [31, 45]], 2)), tone: 1, shade: 2, pixels: px(3, [17, 46], [31, 46]) },
    { shape: ellipse(24, 32, 12, 9), tone: 1, shade: 2, light: { tone: 0, shape: ellipse(20, 28, 4, 2) } },
    { shape: union(capsule([[20, 38], [19, 45]], 2.3), capsule([[28, 38], [29, 45]], 2.3)), tone: 1, shade: 2 },
    { shape: union(capsule([[19, 20], [15, 13], [9, 11], [6, 14]], 1.8), capsule([[29, 20], [33, 13], [39, 11], [42, 14]], 1.8)), tone: 2, shade: 3 },
    { shape: union(ellipse(24, 22, 6, 5.5), poly([18, 21], [11, 22], [18, 24]), poly([30, 21], [37, 22], [30, 24])), tone: 1, shade: 2 },
    { shape: poly([24, 36], [21, 30], [27, 30]), tone: 0, shade: 1 },
  ]));
}

const CABRIDOR_ICON = iconFrom([
  { shape: union(capsule([[6, 11], [6, 15]], 1.1), capsule([[12, 11], [12, 15]], 1.1)), tone: 1, shade: 2 },
  { shape: ellipse(10, 10, 5, 3.5), tone: 1, shade: 2 },
  { shape: capsule([[5, 4], [7, 1.5], [10, 1.5]], 1), tone: 2, shade: 3 },
  { shape: union(ellipse(5, 6, 3, 2.6), ellipse(2.5, 7.5, 2, 1.6)), tone: 1, shade: 2, pixels: px(3, [4, 5], [1, 7]) },
  { shape: poly([1.5, 9], [4, 9], [2.5, 12]), tone: 0, shade: 1 },
]);

// ---------- 103 Cabro d'Or: the golden goat standing on her rock, long spiral horns ----------
const G3 = goat({ x: 27, s: 1.05, horn: capsule([[15, 20], [17, 14], [22, 10], [28, 11], [30, 15], [28, 18]], 1.7), beard: true });
const rock = poly([5, 46], [8, 40], [16, 38], [34, 38], [42, 41], [44, 46]);
const lift = (layers) => layers.map((layer) => ({ ...layer, shape: layer.shape && ((x, y) => layer.shape(x, y + 7)), light: layer.light && { ...layer.light, shape: (x, y) => layer.light.shape(x, y + 7) }, pixels: layer.pixels && layer.pixels.map(([x, y, t]) => [x, y - 7, t]) }));

function cabroFront() {
  return toRows(paint([
    { shape: rock, tone: 2, shade: 3, light: { tone: 1, shape: poly([10, 41], [16, 39.5], [14, 42]) }, pixels: px(3, [22, 42], [23, 43], [33, 41], [12, 44]) },
    ...lift(goatLayers(G3, { coatLight: union(ellipse(24, 30, 6, 2), ellipse(10, 26, 1.5, 1)) })),
    { pixels: [...glint(38, 6), ...glint(42, 22), ...glint(4, 12), ...px(0, [20, 30], [30, 29])] },
  ]));
}

function cabroBack() {
  return toRows(paint([
    { shape: rock, tone: 2, shade: 3, pixels: px(3, [22, 42], [23, 43], [33, 41], [12, 44]) },
    { shape: union(capsule([[17, 30], [17, 39]], 2), capsule([[31, 30], [31, 39]], 2)), tone: 1, shade: 2 },
    { shape: ellipse(24, 27, 12, 8.5), tone: 1, shade: 2, light: { tone: 0, shape: ellipse(20, 23, 5, 2) } },
    { shape: union(capsule([[20, 33], [19, 39]], 2.3), capsule([[28, 33], [29, 39]], 2.3)), tone: 1, shade: 2 },
    { shape: union(capsule([[20, 14], [15, 7], [9, 6], [6, 9], [8, 12]], 1.6), capsule([[28, 14], [33, 7], [39, 6], [42, 9], [40, 12]], 1.6)), tone: 2, shade: 3 },
    { shape: union(ellipse(24, 17, 6, 5), poly([18, 16], [11, 17], [18, 19]), poly([30, 16], [37, 17], [30, 19])), tone: 1, shade: 2 },
    { shape: poly([24, 31], [21, 25], [27, 25]), tone: 0, shade: 1 },
    { pixels: [...glint(38, 6), ...glint(42, 22), ...glint(4, 12)] },
  ]));
}

const CABRO_ICON = iconFrom([
  { shape: poly([1, 16], [3, 12], [13, 12], [15, 16]), tone: 2, shade: 3 },
  { shape: union(capsule([[6, 9], [6, 12]], 1), capsule([[12, 9], [12, 12]], 1)), tone: 1, shade: 2 },
  { shape: ellipse(10, 8, 5, 3.2), tone: 1, shade: 2, light: { tone: 0, shape: ellipse(9, 7, 2, 1) } },
  { shape: capsule([[4, 3], [5, 0.5], [9, 0.5]], 1), tone: 2, shade: 3 },
  { shape: union(ellipse(4.5, 4.5, 3, 2.5), ellipse(2.5, 6, 2, 1.5)), tone: 1, shade: 2, pixels: px(3, [4, 4], [1, 6]) },
]);

export const line = [
  { id: 'cabrillon', front: cabrillonFront(), back: cabrillonBack(), icon: CABRILLON_ICON },
  { id: 'cabridor', front: cabridorFront(), back: cabridorBack(), icon: CABRIDOR_ICON },
  { id: 'cabro_dor', front: cabroFront(), back: cabroBack(), icon: CABRO_ICON },
];
