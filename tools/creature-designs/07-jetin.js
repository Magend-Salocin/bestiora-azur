// Lignée du Jetin (099 et 100, Insecte et Vent) : petit peuple des falaises de Haute-Bretagne,
// réinventé en abeilles des côtes. Fiche : docs/bestiaire-folklorique/fiches/099-jetin.md.
// Tones: 0 eyes glints and wing shine, 1 fur and wings, 2 stripes, 3 ink.
import { capsule, ellipse, iconFrom, minus, mirrorX, paint, poly, px, rect, stamp, toRows, union } from '../creature-painter.js';

const gust = (x, y) => stamp(x, y, ['22..', '..22', '....', '.222']);
/** Horizontal dark bands across a shape between x0 and x1. */
const stripes = (x0, x1, rows) => rows.flatMap((y) => Array.from({ length: x1 - x0 + 1 }, (_, i) => [x0 + i, y, 2]));

// ---------- 099 Jetin: a round coastal bee riding the sea breeze ----------
const J1 = {
  shadow: ellipse(24, 45, 7, 1.2),
  wings: mirrorX(poly([20, 27], [11, 20], [5, 22], [6, 27], [12, 30])),
  abdomen: ellipse(24, 34, 7, 6.5),
  sting: poly([22.5, 39], [25.5, 39], [24, 43]),
  head: ellipse(24, 25, 7, 6),
  antennae: mirrorX(capsule([[21, 20], [18, 14], [16, 13]], 0.6)),
  tips: mirrorX(ellipse(16, 13, 1.4, 1.4)),
  legs: mirrorX(capsule([[19, 33], [16, 37]], 0.9)),
};

function jetinFront() {
  return toRows(paint([
    { shape: J1.shadow, tone: 2, outline: false },
    { shape: J1.wings, tone: 1, shade: 2, light: { tone: 0, shape: union(ellipse(10, 23, 2.5, 1.2), ellipse(38, 23, 2.5, 1.2)) } },
    { shape: J1.legs, tone: 2 },
    { shape: J1.sting, tone: 2, shade: 3 },
    { shape: J1.abdomen, tone: 1, shade: 2, pixels: stripes(18, 30, [33, 34, 37, 38]) },
    { shape: J1.antennae, tone: 3, outline: false },
    { shape: J1.tips, tone: 2, shade: 3 },
    { shape: J1.head, tone: 1, shade: 2, light: { tone: 0, shape: ellipse(21, 22, 1.5, 1) }, pixels: [...stamp(20, 24, ['33..33', '30..30', '33..33']), ...stamp(23, 28, ['33'])] },
    { pixels: [...gust(4, 34), ...gust(39, 34)] },
  ]));
}

function jetinBack() {
  return toRows(paint([
    { shape: J1.shadow, tone: 2, outline: false },
    { shape: J1.legs, tone: 2 },
    { shape: J1.sting, tone: 2, shade: 3 },
    { shape: J1.abdomen, tone: 1, shade: 2, pixels: stripes(18, 30, [33, 34, 37, 38]) },
    { shape: J1.antennae, tone: 3, outline: false },
    { shape: J1.tips, tone: 2, shade: 3 },
    { shape: J1.head, tone: 1, shade: 2, pixels: stripes(19, 29, [25, 26]) },
    { shape: J1.wings, tone: 1, shade: 2, light: { tone: 0, shape: union(ellipse(10, 23, 2.5, 1.2), ellipse(38, 23, 2.5, 1.2)) } },
    { pixels: gust(5, 33) },
  ]));
}

const JETIN_ICON = iconFrom([
  { shape: mirrorX(poly([6, 9], [2, 6], [0.5, 8], [1.5, 10.5], [5, 11]), 8), tone: 1, shade: 2 },
  { shape: ellipse(8, 12, 4, 3.5), tone: 1, shade: 2, pixels: stripes(5, 11, [11, 13]) },
  { shape: ellipse(8, 7, 3.8, 3.3), tone: 1, shade: 2, pixels: [...px(3, [6, 6], [6, 7], [10, 6], [10, 7]), ...px(0, [6, 6], [10, 6])] },
  { pixels: px(3, [6, 3], [5, 2], [10, 3], [11, 2]) },
]);

// ---------- 100 Jetinelle: a slender cliff wasp with four wings and a long striped body ----------
const J2 = {
  shadow: ellipse(24, 45.5, 9, 1.3),
  wingsUp: mirrorX(poly([20, 20], [10, 6], [3, 8], [5, 15], [18, 23])),
  wingsLow: mirrorX(poly([20, 25], [7, 23], [3, 28], [8, 31], [19, 27])),
  abdomen: capsule([[24, 30], [24, 40]], 4.5),
  sting: poly([22.5, 44], [25.5, 44], [24, 47]),
  thorax: ellipse(24, 25, 5.5, 4.5),
  head: ellipse(24, 16, 6, 5.5),
  antennae: mirrorX(capsule([[21, 12], [19, 6], [16, 3]], 0.6)),
  tips: mirrorX(poly([16, 1], [14, 4], [17, 4])),
  legs: mirrorX(union(capsule([[20, 27], [15, 31], [15, 35]], 0.9), capsule([[21, 30], [18, 36], [19, 40]], 0.9))),
};

function jetinelleFront() {
  return toRows(paint([
    { shape: J2.shadow, tone: 2, outline: false },
    { shape: J2.wingsUp, tone: 1, shade: 2, light: { tone: 0, shape: union(poly([8, 9], [15, 15], [7, 12]), poly([40, 9], [33, 15], [41, 12])) } },
    { shape: J2.wingsLow, tone: 1, shade: 2 },
    { shape: J2.legs, tone: 2 },
    { shape: J2.sting, tone: 2, shade: 3 },
    { shape: J2.abdomen, tone: 1, shade: 2, pixels: stripes(20, 28, [32, 33, 37, 38, 42]) },
    { shape: J2.thorax, tone: 2, shade: 3, light: { tone: 1, shape: ellipse(22, 23, 1.5, 1) } },
    { shape: J2.antennae, tone: 3, outline: false },
    { shape: J2.tips, tone: 2, shade: 3 },
    { shape: J2.head, tone: 1, shade: 2, light: { tone: 0, shape: ellipse(21, 13, 1.5, 1) }, pixels: [...stamp(19, 15, ['333..333', '300..300', '333..333']), ...stamp(23, 19, ['33'])] },
    { pixels: [...gust(2, 36), ...gust(40, 38), ...gust(38, 2)] },
  ]));
}

function jetinelleBack() {
  return toRows(paint([
    { shape: J2.shadow, tone: 2, outline: false },
    { shape: J2.legs, tone: 2 },
    { shape: J2.sting, tone: 2, shade: 3 },
    { shape: J2.abdomen, tone: 1, shade: 2, pixels: stripes(20, 28, [32, 33, 37, 38, 42]) },
    { shape: J2.thorax, tone: 2, shade: 3 },
    { shape: J2.antennae, tone: 3, outline: false },
    { shape: J2.tips, tone: 2, shade: 3 },
    { shape: J2.head, tone: 1, shade: 2, pixels: stripes(19, 29, [16, 17]) },
    { shape: J2.wingsLow, tone: 1, shade: 2 },
    { shape: J2.wingsUp, tone: 1, shade: 2, light: { tone: 0, shape: union(poly([8, 9], [15, 15], [7, 12]), poly([40, 9], [33, 15], [41, 12])) } },
    { pixels: [...gust(2, 36), ...gust(40, 38)] },
  ]));
}

const JETINELLE_ICON = iconFrom([
  { shape: mirrorX(poly([6, 6], [2, 1], [0.5, 3], [1, 7], [6, 8]), 8), tone: 1, shade: 2, light: { tone: 0, shape: union(ellipse(2.5, 4, 0.8, 1), ellipse(13.5, 4, 0.8, 1)) } },
  { shape: capsule([[8, 10], [8, 14]], 2.2), tone: 1, shade: 2, pixels: stripes(6, 10, [11, 13]) },
  { shape: ellipse(8, 5.5, 3.3, 3), tone: 1, shade: 2, pixels: [...px(3, [6, 5], [6, 6], [10, 5], [10, 6]), ...px(0, [6, 5], [10, 5])] },
  { pixels: px(3, [6, 2], [5, 1], [10, 2], [11, 1]) },
]);

export const line = [
  { id: 'jetin', front: jetinFront(), back: jetinBack(), icon: JETIN_ICON },
  { id: 'jetinelle', front: jetinelleFront(), back: jetinelleBack(), icon: JETINELLE_ICON },
];
