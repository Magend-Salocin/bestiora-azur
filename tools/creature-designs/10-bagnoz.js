// Bagnoz (134, Ombre et Eau) : le bateau de nuit des noyés. Goélâme (135, Vent et Normal) : oiseau
// de mer qui porte l'âme d'un noyé. Fiche : docs/bestiaire-folklorique/fiches/134-bagnoz.md.
// Tones: 0 ghost lights and eyes, 1 sail, mist and feathers, 2 hull and wing tips, 3 ink.
import { capsule, ellipse, iconFrom, minus, paint, poly, px, rect, stamp, toRows, union } from '../creature-painter.js';

const wisp = (x, y) => stamp(x, y, ['.11.', '1..1', '..1.']);
const glowEye = (x, y) => stamp(x, y, ['.33.', '3003', '3003', '.33.']);
const waves = (y) => stamp(2, y, ['.33....33....33....33....33....33....33....33.', '3..3..3..3..3..3..3..3..3..3..3..3..3..3..3..3']);

// ---------- 134 Bagnoz: a ghost ship with porthole eyes and a tattered sail ----------
const B = {
  mast: rect(23, 6, 26, 36),
  sail: poly([10, 10], [22, 8], [22, 30], [16, 29], [14, 32], [11, 28], [8, 30], [9, 20]),
  flag: poly([26, 7], [34, 9], [30, 11], [34, 13], [26, 13]),
  sternSail: poly([27, 15], [37, 17], [38, 27], [34, 25], [32, 29], [27, 28]),
  hull: poly([4, 31], [44, 31], [40, 42], [9, 42]),
  rail: rect(4, 30, 44, 32),
  lantern: ellipse(24.5, 4.5, 2, 2),
};

function bagnozFront() {
  return toRows(paint([
    { shape: B.mast, tone: 2, shade: 3 },
    { shape: B.sail, tone: 1, shade: 2, pixels: [...px(3, [14, 15], [18, 21], [12, 24]), ...px(2, [16, 12], [16, 18], [16, 24])] },
    { shape: B.sternSail, tone: 1, shade: 2, pixels: px(3, [32, 20], [35, 22]) },
    { shape: B.flag, tone: 2, shade: 3 },
    { shape: B.hull, tone: 2, shade: 3, light: { tone: 1, shape: rect(8, 33, 40, 34) },
      pixels: [...glowEye(11, 34), ...glowEye(19, 34), ...stamp(27, 35, ['33333333333', '30303030303', '33333333333']), ...px(3, [40, 34], [36, 40])] },
    { shape: B.rail, tone: 2, shade: 3 },
    { shape: B.lantern, tone: 0, shade: 1 },
    { pixels: [...waves(43), ...wisp(3, 22), ...wisp(41, 4), ...wisp(42, 30)] },
  ]));
}

function bagnozBack() {
  return toRows(paint([
    { shape: union(B.hull, poly([14, 31], [34, 31], [32, 24], [16, 24])), tone: 2, shade: 3, light: { tone: 1, shape: rect(17, 26, 31, 27) }, pixels: [...glowEye(17, 27), ...glowEye(27, 27)] },
    { shape: B.mast, tone: 2, shade: 3 },
    { shape: poly([12, 9], [36, 9], [35, 21], [30, 19], [27, 22], [22, 19], [18, 22], [13, 20]), tone: 1, shade: 2, pixels: px(3, [17, 13], [29, 15], [23, 17]) },
    { shape: B.lantern, tone: 0, shade: 1 },
    { pixels: [...waves(43), ...wisp(3, 22), ...wisp(41, 4)] },
  ]));
}

const BAGNOZ_ICON = iconFrom([
  { shape: rect(7, 1, 9, 11), tone: 2 },
  { shape: poly([2, 2], [7, 2], [7, 9], [4, 8], [2, 10]), tone: 1, shade: 2 },
  { shape: poly([9, 4], [14, 5], [13, 10], [9, 9]), tone: 1, shade: 2 },
  { shape: poly([0.5, 10], [15.5, 10], [13, 14.5], [3, 14.5]), tone: 2, shade: 3, pixels: px(0, [4, 12], [5, 12], [8, 12], [9, 12]) },
]);

// ---------- 135 Goélâme: a pale gull with a hollow glowing eye and a tail of mist ----------
const G = {
  wingBack: poly([25, 24], [30, 12], [37, 5], [44, 3], [41, 9], [43, 11], [38, 15], [39, 18], [32, 25]),
  tail: poly([30, 30], [40, 30], [44, 34], [40, 33], [42, 37], [37, 34], [36, 38], [32, 34]),
  body: ellipse(23, 30, 10, 6),
  head: ellipse(12, 25, 5.5, 5),
  beak: poly([7, 25], [1, 27], [7, 28]),
  wingFront: poly([18, 27], [16, 16], [12, 8], [6, 4], [9, 10], [7, 12], [11, 15], [9, 18], [14, 25], [24, 31]),
  legs: union(rect(21, 35, 22, 40), rect(25, 35, 26, 40)),
};

function goelameFront() {
  return toRows(paint([
    { shape: G.wingBack, tone: 1, shade: 2, light: { tone: 2, shape: poly([37, 5], [44, 3], [41, 9], [43, 11], [38, 15], [36, 9]) } },
    { shape: G.tail, tone: 1, shade: 2, pixels: px(2, [38, 32], [40, 34]) },
    { pixels: stamp(20, 40, ['3333..3333']) },
    { shape: G.legs, tone: 2, outline: false },
    { shape: G.body, tone: 1, shade: 2, light: { tone: 0, shape: ellipse(20, 33, 6, 2) } },
    { shape: G.wingFront, tone: 1, shade: 2, light: { tone: 2, shape: poly([12, 8], [6, 4], [9, 10], [7, 12], [11, 15], [13, 13]) }, pixels: px(2, [15, 20], [17, 24]) },
    { shape: G.beak, tone: 2, shade: 3 },
    { shape: G.head, tone: 1, shade: 2, pixels: glowEye(9, 23) },
    { pixels: [...wisp(42, 40), ...wisp(36, 42), ...wisp(4, 34)] },
  ]));
}

function goelameBack() {
  return toRows(paint([
    { shape: G.tail, tone: 1, shade: 2 },
    { pixels: stamp(20, 40, ['3333..3333']) },
    { shape: G.legs, tone: 2, outline: false },
    { shape: G.body, tone: 1, shade: 2 },
    { shape: G.beak, tone: 2, shade: 3 },
    { shape: G.head, tone: 1, shade: 2 },
    { shape: union(G.wingFront, G.wingBack), tone: 1, shade: 2, light: { tone: 2, shape: union(poly([12, 8], [6, 4], [9, 10], [7, 12], [11, 15], [13, 13]), poly([37, 5], [44, 3], [41, 9], [43, 11], [38, 15], [36, 9])) } },
    { pixels: [...wisp(42, 40), ...wisp(4, 34)] },
  ]));
}

const GOELAME_ICON = iconFrom([
  { shape: poly([9, 9], [12, 3], [15.5, 1], [14, 5], [12, 10]), tone: 1, shade: 2 },
  { shape: poly([10, 11], [15.5, 12], [12, 13], [14, 15]), tone: 1, shade: 2 },
  { shape: ellipse(8, 11, 4.5, 3), tone: 1, shade: 2 },
  { shape: poly([3, 7], [0.5, 8.5], [3, 9]), tone: 2 },
  { shape: ellipse(5, 7.5, 2.6, 2.4), tone: 1, shade: 2, pixels: px(0, [5, 7]) },
  { shape: poly([6, 10], [4, 3], [1, 1], [3, 5], [5, 11]), tone: 1, shade: 2 },
]);

export const line = [
  { id: 'epavard', front: bagnozFront(), back: bagnozBack(), icon: BAGNOZ_ICON },
  { id: 'albavent', front: goelameFront(), back: goelameBack(), icon: GOELAME_ICON },
];
