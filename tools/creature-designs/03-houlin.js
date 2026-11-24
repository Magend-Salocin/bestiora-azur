// Lignée du Houlin (042 et 043, Roche et Arcane) : fées des houles, nichées dans les grottes marines.
// Fiche : docs/bestiaire-folklorique/fiches/042-houlin.md.
// Tones: 0 crystal and skin, 1 light stone, 2 geode shell, 3 ink.
import { capsule, ellipse, eyes, iconFrom, minus, mirrorX, paint, poly, px, rect, stamp, toRows, union } from '../creature-painter.js';

const sparkle = (x, y) => px(2, [x, y - 1], [x - 1, y], [x, y], [x + 1, y], [x, y + 1]);

// ---------- 042 Houlin: tiny fairy sitting in a half geode ----------
const H1 = {
  wings: mirrorX(union(poly([20, 31], [11, 22], [13, 30]), poly([20, 34], [12, 33], [15, 37]))),
  body: ellipse(24, 36, 4.5, 4),
  hair: poly([16, 30], [16, 24], [17.5, 19], [20, 22], [22, 16], [24, 20], [26, 16], [28, 22], [30.5, 19], [32, 24], [32, 30]),
  head: ellipse(24, 28, 6.5, 5.5),
  geode: minus(ellipse(24, 39, 12, 6.5), rect(0, 0, 48, 37)),
  crystals: poly([12.5, 38], [14, 35], [16, 37], [18, 34], [20, 37.5], [28, 37.5], [30, 34], [32, 37], [34, 35], [35.5, 38]),
};

function houlinFront() {
  return toRows(paint([
    { shape: H1.wings, tone: 0, shade: 1, pixels: px(1, [15, 26], [17, 28], [33, 26], [31, 28]) },
    { shape: H1.body, tone: 1, shade: 2 },
    { shape: H1.hair, tone: 1, shade: 2, light: { tone: 0, shape: union(poly([17.5, 21], [19.5, 23], [17.5, 25]), poly([22, 18], [23, 21], [21, 21])) } },
    { shape: H1.head, tone: 0, shade: 1 },
    { pixels: [...eyes(20, 26, 27), ...px(3, [23, 31], [24, 31]), ...px(1, [19, 30], [29, 30])] },
    { shape: H1.crystals, tone: 1, shade: 2, light: { tone: 0, shape: union(poly([13.5, 37], [14, 35.5], [15, 37]), poly([17.5, 36], [18, 34.5], [19, 36]), poly([29.5, 36], [30, 34.5], [31, 36]), poly([33.5, 37], [34, 35.5], [35, 37])) } },
    { shape: H1.geode, tone: 2, shade: 3, light: { tone: 1, shape: rect(12, 38, 36, 40) }, pixels: px(3, [17, 41], [24, 43], [31, 41]) },
    { pixels: [...sparkle(10, 20), ...sparkle(38, 18), ...sparkle(36, 30)] },
  ]));
}

function houlinBack() {
  return toRows(paint([
    { shape: H1.body, tone: 1, shade: 2 },
    { shape: union(H1.hair, H1.head), tone: 1, shade: 2, light: { tone: 0, shape: union(poly([17.5, 21], [19.5, 23], [17.5, 25]), poly([22, 18], [23, 21], [21, 21])) },
      pixels: px(2, [21, 26], [24, 24], [27, 27], [24, 30]) },
    { shape: H1.wings, tone: 0, shade: 1, pixels: px(1, [15, 26], [17, 28], [33, 26], [31, 28]) },
    { shape: H1.crystals, tone: 1, shade: 2 },
    { shape: H1.geode, tone: 2, shade: 3, light: { tone: 1, shape: rect(12, 38, 36, 40) }, pixels: px(3, [17, 41], [24, 43], [31, 41]) },
    { pixels: [...sparkle(10, 20), ...sparkle(38, 18)] },
  ]));
}

const HOULIN_ICON = iconFrom([
  { shape: poly([3, 9], [3, 4], [5, 1], [7, 3], [8, 0.5], [9, 3], [11, 1], [13, 4], [13, 9]), tone: 1, shade: 2 },
  { shape: ellipse(8, 8, 4.5, 3.8), tone: 0, shade: 1 },
  { shape: minus(ellipse(8, 13, 6.5, 3), rect(0, 0, 16, 12)), tone: 2, shade: 3 },
  { shape: poly([2, 12], [3.5, 10], [5, 11.5], [8, 10.5], [11, 11.5], [12.5, 10], [14, 12]), tone: 1, shade: 2 },
  { pixels: [...px(3, [5, 7], [5, 8], [10, 7], [10, 8]), ...px(0, [5, 7], [10, 7]), ...px(3, [7, 10], [8, 10]), ...sparkle(14, 2)] },
]);

// ---------- 043 Houlécrin: crystal fairy rising from its geode casket ----------
const H2 = {
  wings: mirrorX(union(poly([19, 24], [4, 6], [7, 20]), poly([19, 28], [3, 22], [6, 30]), poly([20, 32], [9, 34], [14, 38]))),
  geode: minus(ellipse(24, 40, 18, 7.5), rect(0, 0, 48, 38)),
  crystals: poly([6.5, 39], [8, 34], [10, 37], [12, 31], [15, 36.5], [18, 33], [20, 38], [28, 38], [30, 33], [33, 36.5], [36, 31], [38, 37], [40, 34], [41.5, 39]),
  dress: poly([19, 26], [29, 26], [32, 38], [16, 38]),
  arms: mirrorX(capsule([[20, 27], [17, 32], [21, 34]], 1.5)),
  orb: ellipse(24, 33.5, 3.2, 3),
  hair: poly([15, 27], [15, 15], [18, 9], [24, 7], [30, 9], [33, 15], [33, 27], [30, 24], [18, 24]),
  crown: poly([17, 11], [18, 4], [20, 8], [22, 1], [24, 6], [26, 1], [28, 8], [30, 4], [31, 11]),
  head: ellipse(24, 17, 6, 5.5),
};

function houlecrinFront() {
  return toRows(paint([
    { shape: H2.wings, tone: 0, shade: 1, pixels: px(1, [8, 12], [10, 16], [40, 12], [38, 16], [6, 25], [42, 25]) },
    { shape: H2.hair, tone: 1, shade: 2, light: { tone: 0, shape: poly([16, 16], [18, 11], [18, 18]) } },
    { shape: H2.dress, tone: 1, shade: 2, light: { tone: 0, shape: poly([21, 27], [23, 27], [21, 37], [19, 37]) }, pixels: px(2, [26, 30], [28, 34], [22, 36]) },
    { shape: H2.arms, tone: 0, shade: 1 },
    { shape: H2.orb, tone: 0, shade: 1, light: { tone: 0, shape: ellipse(23, 33, 1.5, 1.5) }, pixels: px(2, [25, 34]) },
    { shape: H2.crown, tone: 0, shade: 1, pixels: px(2, [22, 6], [26, 6], [24, 9]) },
    { shape: H2.head, tone: 0, shade: 1 },
    { pixels: [...eyes(20, 26, 16), ...px(3, [23, 20], [24, 20]), ...px(1, [19, 19], [29, 19])] },
    { shape: H2.crystals, tone: 1, shade: 2, light: { tone: 0, shape: union(poly([8, 37], [8, 35], [9.5, 37]), poly([11.5, 34], [12, 32], [13.5, 35]), poly([17.5, 35], [18, 34], [19, 36]), poly([29.5, 35], [30, 34], [31, 36]), poly([35.5, 34], [36, 32], [37, 35]), poly([39.5, 37], [40, 35], [41, 37])) } },
    { shape: H2.geode, tone: 2, shade: 3, light: { tone: 1, shape: rect(6, 39, 42, 41) },
      pixels: [...px(3, [12, 42], [19, 45], [29, 45], [36, 42]), ...px(1, [15, 44], [33, 44])] },
    { pixels: [...sparkle(4, 32), ...sparkle(44, 32), ...sparkle(10, 3), ...sparkle(38, 3)] },
  ]));
}

function houlecrinBack() {
  return toRows(paint([
    { shape: H2.dress, tone: 1, shade: 2 },
    { shape: H2.arms, tone: 0, shade: 1 },
    { shape: union(H2.hair, H2.head, poly([16, 20], [32, 20], [30, 33], [18, 33])), tone: 1, shade: 2, light: { tone: 0, shape: poly([16, 16], [18, 11], [18, 18]) },
      pixels: px(2, [21, 14], [24, 19], [27, 24], [22, 28], [26, 31]) },
    { shape: H2.crown, tone: 0, shade: 1 },
    { shape: H2.wings, tone: 0, shade: 1, pixels: px(1, [8, 12], [10, 16], [40, 12], [38, 16], [6, 25], [42, 25]) },
    { shape: H2.crystals, tone: 1, shade: 2 },
    { shape: H2.geode, tone: 2, shade: 3, light: { tone: 1, shape: rect(6, 39, 42, 41) }, pixels: px(3, [12, 42], [19, 45], [29, 45], [36, 42]) },
    { pixels: [...sparkle(4, 32), ...sparkle(44, 32)] },
  ]));
}

const HOULECRIN_ICON = iconFrom([
  { shape: union(poly([4, 8], [0, 1], [1.5, 8]), poly([12, 8], [16, 1], [14.5, 8])), tone: 0, shade: 1 },
  { shape: poly([3.5, 12], [3.5, 6], [8, 4], [12.5, 6], [12.5, 12]), tone: 1, shade: 2 },
  { shape: poly([4.5, 5], [5, 1], [6.5, 3], [8, 0], [9.5, 3], [11, 1], [11.5, 5]), tone: 0, shade: 1 },
  { shape: ellipse(8, 8, 3.8, 3.5), tone: 0, shade: 1 },
  { shape: minus(ellipse(8, 14, 7.5, 2.5), rect(0, 0, 16, 13)), tone: 2, shade: 3 },
  { shape: poly([1, 13], [2.5, 11], [4, 12.5], [6, 11], [8, 12.5], [10, 11], [12, 12.5], [13.5, 11], [15, 13]), tone: 1, shade: 2 },
  { pixels: [...px(3, [6, 7], [6, 8], [9, 7], [9, 8]), ...px(0, [6, 7], [9, 7])] },
]);

export const line = [
  { id: 'quartzelle', front: houlinFront(), back: houlinBack(), icon: HOULIN_ICON },
  { id: 'quartzard', front: houlecrinFront(), back: houlecrinBack(), icon: HOULECRIN_ICON },
];
