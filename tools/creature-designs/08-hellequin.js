// Lignée de la Mesnie Hellequin (112 Hellequet et 113 Hellequin, Vent) et Bayard (114, Vent et Métal).
// Fiche : docs/bestiaire-folklorique/fiches/112-hellequin.md.
// Tones: 0 eyes, cloud light and shine, 1 cloud and steel, 2 storm cloud and coat, 3 ink.
import { capsule, ellipse, iconFrom, mirrorX, paint, poly, px, stamp, toRows, union } from '../creature-painter.js';

const gust = (x, y) => stamp(x, y, ['33333..', '.....3.', '..333.3', '.3...3.', '..33...']);
const puffs = (list) => union(...list.map(([x, y, r]) => ellipse(x, y, r, r * 0.85)));

// ---------- 112 Hellequet: a hound pup made of storm cloud, straying from the hunt ----------
const H1 = {
  body: puffs([[24, 39, 6], [17, 41, 4], [31, 41, 4], [20, 34, 3.5], [28, 34, 3.5]]),
  tail: puffs([[33, 34, 3], [37, 30, 2.5], [39, 26, 2]]),
  ears: mirrorX(poly([18, 22], [12, 30], [17, 31], [20, 25])),
  head: ellipse(24, 24, 7, 6),
  muzzle: ellipse(24, 28, 3.5, 2.5),
};

function hellequetFront() {
  return toRows(paint([
    { shape: H1.tail, tone: 1, shade: 2, light: { tone: 0, shape: ellipse(37, 29, 1, 1) } },
    { shape: H1.body, tone: 1, shade: 2, light: { tone: 0, shape: union(ellipse(20, 36, 2.5, 1.5), ellipse(16, 40, 1.5, 1)) } },
    { shape: H1.ears, tone: 2, shade: 3 },
    { shape: H1.head, tone: 2, shade: 3 },
    { shape: H1.muzzle, tone: 1, shade: 2, pixels: [...stamp(23, 27, ['33']), ...stamp(22, 29, ['3..3'])] },
    { pixels: [...stamp(19, 22, ['00...00', '03...30']), ...px(2, [24, 38], [19, 40], [29, 40]), ...gust(4, 26), ...gust(38, 40)] },
  ]));
}

function hellequetBack() {
  return toRows(paint([
    { shape: H1.body, tone: 1, shade: 2, light: { tone: 0, shape: ellipse(20, 36, 2.5, 1.5) } },
    { shape: puffs([[30, 36, 3], [34, 33, 2.5], [36, 29, 2]]), tone: 1, shade: 2 },
    { shape: H1.ears, tone: 2, shade: 3 },
    { shape: H1.head, tone: 2, shade: 3, light: { tone: 1, shape: ellipse(21, 21, 3, 2) } },
    { pixels: gust(4, 26) },
  ]));
}

const HELLEQUET_ICON = iconFrom([
  { shape: puffs([[8, 12.5, 4], [4, 14, 2.5], [12, 14, 2.5]]), tone: 1, shade: 2 },
  { shape: mirrorX(poly([4, 4], [1, 10], [3.5, 10.5], [5.5, 6]), 8), tone: 2, shade: 3 },
  { shape: ellipse(8, 6.5, 4.5, 4), tone: 2, shade: 3, pixels: [...px(0, [5, 6], [6, 6], [10, 6], [11, 6]), ...px(3, [8, 9])] },
]);

// ---------- 113 Hellequin: the storm hound leading the wild hunt across the clouds ----------
const H2 = {
  legsBack: union(capsule([[34, 33], [40, 38], [44, 37]], 2.2), capsule([[30, 34], [33, 40], [37, 42]], 2.4)),
  legsFront: union(capsule([[16, 32], [10, 36], [5, 35]], 2.3), capsule([[19, 33], [15, 39], [10, 41]], 2.4)),
  body: ellipse(25, 27, 11, 6.5),
  tail: puffs([[37, 23, 3.5], [41, 18, 3], [44, 13, 2.5], [46, 9, 2]]),
  neck: capsule([[18, 24], [13, 17]], 4.5),
  head: ellipse(11, 14, 6, 5),
  snout: union(poly([7, 11], [0, 13], [1, 15], [8, 15]), poly([7, 16], [2, 18], [3, 19.5], [9, 18])),
  ear: poly([12, 10], [18, 3], [16, 11]),
  cloudTrail: puffs([[8, 44, 3], [16, 45, 3.5], [26, 45, 4], [36, 45, 3.5], [43, 44, 2.5]]),
};

function hellequinFront() {
  return toRows(paint([
    { shape: H2.cloudTrail, tone: 1, shade: 2, light: { tone: 0, shape: union(ellipse(15, 43.5, 1.5, 0.8), ellipse(25, 43, 2, 0.8)) } },
    { shape: H2.tail, tone: 1, shade: 2, light: { tone: 0, shape: ellipse(40, 17, 1, 1) } },
    { shape: H2.legsBack, tone: 2, shade: 3 },
    { shape: H2.body, tone: 2, shade: 3, light: { tone: 1, shape: union(ellipse(24, 20, 3, 1.2), ellipse(17, 22, 2, 1)) } },
    { shape: H2.legsFront, tone: 2, shade: 3 },
    { shape: H2.neck, tone: 2, shade: 3 },
    { shape: puffs([[15, 18, 3], [19, 20, 3], [24, 19, 3], [29, 20, 3], [34, 22, 2.5]]), tone: 1, shade: 2, light: { tone: 0, shape: union(ellipse(14, 17, 1, 0.8), ellipse(23, 18, 1, 0.8)) } },
    { shape: H2.ear, tone: 2, shade: 3 },
    { shape: union(H2.head, H2.snout), tone: 2, shade: 3, pixels: [...stamp(9, 12, ['000', '.00']), ...px(3, [1, 13]), ...px(0, [2, 15], [4, 15], [6, 15], [3, 17], [5, 17])] },
    { pixels: [...gust(24, 4), ...gust(36, 30 + 4)] },
  ]));
}

function hellequinBack() {
  return toRows(paint([
    { shape: H2.cloudTrail, tone: 1, shade: 2 },
    { shape: H2.legsBack, tone: 2, shade: 3 },
    { shape: H2.legsFront, tone: 2, shade: 3 },
    { shape: H2.body, tone: 2, shade: 3, light: { tone: 1, shape: union(ellipse(26, 21, 4, 1.5), ellipse(18, 23, 2, 1)) } },
    { shape: H2.tail, tone: 1, shade: 2 },
    { shape: union(H2.neck, H2.head), tone: 2, shade: 3 },
    { shape: H2.ear, tone: 2, shade: 3 },
    { pixels: gust(24, 4) },
  ]));
}

const HELLEQUIN_ICON = iconFrom([
  { shape: puffs([[13, 6, 2], [15, 3, 1.5]]), tone: 1, shade: 2 },
  { shape: union(capsule([[6, 11], [2, 14]], 1.2), capsule([[12, 11], [15, 14]], 1.2)), tone: 2, shade: 3 },
  { shape: ellipse(9, 9.5, 5, 3), tone: 2, shade: 3 },
  { shape: poly([5, 4], [8, 0], [7, 5]), tone: 2, shade: 3 },
  { shape: union(ellipse(4.5, 6, 3, 2.6), poly([2, 5], [0, 7], [2, 8.5])), tone: 2, shade: 3, pixels: px(0, [3, 5], [4, 5]) },
]);

// ---------- 114 Bayard: the enchanted horse, armoured in steel, its mane a gale ----------
const BY = {
  legsBack: union(capsule([[35, 32], [37, 38], [36, 44]], 2.2), capsule([[18, 32], [17, 38], [18, 44]], 2.2)),
  legsFront: union(capsule([[31, 32], [32, 38], [31, 44]], 2.4), capsule([[14, 32], [13, 38], [14, 44]], 2.4)),
  body: ellipse(25, 27, 13, 7),
  barding: union(poly([14, 21], [36, 21], [38, 28], [12, 28])),
  neck: capsule([[15, 24], [10, 14]], 4.2),
  head: union(ellipse(9, 11, 4.5, 4), poly([6, 10], [1, 15], [3, 18], [9, 15])),
  chanfron: poly([5, 9], [9, 6], [11, 9], [4, 16]),
  ear: poly([10, 7], [12, 2], [13, 8]),
  mane: union(poly([12, 9], [20, 5], [17, 10], [25, 9], [19, 14], [26, 15], [18, 19], [24, 22], [15, 22])),
  tail: poly([37, 24], [46, 21], [42, 26], [47, 30], [41, 30], [44, 35], [37, 30]),
};

function bayardFront() {
  return toRows(paint([
    { shape: BY.legsBack, tone: 2, shade: 3, pixels: px(3, [18, 45], [36, 45]) },
    { shape: BY.tail, tone: 1, shade: 2, light: { tone: 0, shape: poly([39, 25], [44, 23], [41, 26]) } },
    { shape: BY.body, tone: 2, shade: 3 },
    { shape: BY.barding, tone: 1, shade: 2, light: { tone: 0, shape: poly([16, 22], [24, 22], [16, 24]) }, pixels: px(3, [15, 26], [20, 26], [25, 26], [30, 26], [35, 26]) },
    { shape: BY.legsFront, tone: 2, shade: 3, pixels: px(1, [14, 42], [14, 43], [31, 42], [31, 43]) },
    { shape: BY.neck, tone: 2, shade: 3 },
    { shape: BY.mane, tone: 1, shade: 2, light: { tone: 0, shape: poly([18, 7], [20, 6], [17, 9]) } },
    { shape: BY.ear, tone: 2, shade: 3 },
    { shape: BY.head, tone: 2, shade: 3, pixels: [...px(3, [2, 15]), ...stamp(8, 10, ['00', '30'])] },
    { shape: BY.chanfron, tone: 1, shade: 2, pixels: px(3, [7, 10]) },
    { pixels: [...gust(30, 6), ...gust(2, 30)] },
  ]));
}

function bayardBack() {
  return toRows(paint([
    { shape: union(capsule([[17, 34], [16, 44]], 2.6), capsule([[31, 34], [32, 44]], 2.6)), tone: 2, shade: 3 },
    { shape: ellipse(24, 29, 11, 9), tone: 2, shade: 3 },
    { shape: union(capsule([[20, 36], [19, 44]], 2.6), capsule([[28, 36], [29, 44]], 2.6)), tone: 2, shade: 3 },
    { shape: poly([13, 23], [35, 23], [34, 31], [14, 31]), tone: 1, shade: 2, pixels: px(3, [16, 29], [20, 29], [24, 29], [28, 29], [32, 29]) },
    { shape: poly([22, 30], [26, 30], [30, 40], [24, 37], [18, 40]), tone: 1, shade: 2 },
    { shape: capsule([[24, 22], [24, 13]], 4.2), tone: 2, shade: 3 },
    { shape: mirrorX(poly([21, 10], [20, 4], [23, 9])), tone: 2, shade: 3 },
    { shape: poly([22, 9], [27, 8], [34, 5], [31, 10], [38, 11], [31, 15], [36, 19], [27, 21], [24, 22]), tone: 1, shade: 2, light: { tone: 0, shape: poly([28, 9], [32, 7], [29, 11]) } },
    { pixels: gust(36, 6) },
  ]));
}

const BAYARD_ICON = iconFrom([
  { shape: union(capsule([[6, 11], [6, 15]], 1), capsule([[13, 11], [13, 15]], 1)), tone: 2, shade: 3 },
  { shape: ellipse(10, 9.5, 5.5, 3), tone: 2, shade: 3 },
  { shape: poly([5, 7], [15, 7], [15, 10], [5, 10]), tone: 1, shade: 2 },
  { shape: capsule([[5, 8], [4, 4]], 2), tone: 2, shade: 3 },
  { shape: poly([5, 2], [10, 1], [8, 4], [10, 6], [6, 7]), tone: 1, shade: 2 },
  { shape: union(ellipse(3.5, 3, 2.5, 2), poly([2, 2], [0, 5], [3, 5])), tone: 2, shade: 3, pixels: px(0, [3, 2]) },
]);

export const line = [
  { id: 'nuageot', front: hellequetFront(), back: hellequetBack(), icon: HELLEQUET_ICON },
  { id: 'cumulard', front: hellequinFront(), back: hellequinBack(), icon: HELLEQUIN_ICON },
  { id: 'girouette', front: bayardFront(), back: bayardBack(), icon: BAYARD_ICON },
];
