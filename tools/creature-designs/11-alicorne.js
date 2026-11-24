// Lignée de l'Alicorne (142 Alicornet et 143 Alicorne, Givre et Arcane) : licorne des glaces.
// Fiche : docs/bestiaire-folklorique/fiches/142-alicorne.md.
// Tones: 0 frost, horn and eyes glint, 1 coat, 2 mane and hooves, 3 ink.
import { capsule, ellipse, iconFrom, mirrorX, paint, poly, px, stamp, toRows, union } from '../creature-painter.js';

const flake = (x, y) => stamp(x, y, ['.3.', '303', '.3.']);
const star = (x, y) => stamp(x, y, ['..3..', '..3..', '33033', '..3..', '..3..']);
const hooves = (list) => list.map(([x, y]) => [x, y, 3]);

// ---------- 142 Alicornet: a frosty foal with a budding horn ----------
const A1 = {
  legsFar: union(capsule([[22, 36], [23, 44]], 1.3), capsule([[33, 36], [35, 44]], 1.3)),
  legsNear: union(capsule([[19, 36], [19, 44]], 1.5), capsule([[30, 36], [31, 44]], 1.5)),
  body: ellipse(27, 32, 9.5, 6),
  tail: capsule([[36, 29], [40, 31], [41, 37]], 1.8),
  neck: capsule([[20, 31], [16, 23]], 3.2),
  head: union(ellipse(14, 20, 4.5, 4), ellipse(9.5, 22.5, 3.5, 2.6)),
  ear: poly([16, 17], [18, 12], [18.5, 17]),
  horn: poly([12, 17.5], [9.5, 7], [15, 16.5]),
  mane: poly([16, 16], [20, 18], [23, 24], [24, 29], [21, 27], [19, 22], [17, 20]),
};

function alicornetFront() {
  return toRows(paint([
    { shape: A1.legsFar, tone: 2, shade: 3, pixels: hooves([[23, 45], [35, 45]]) },
    { shape: A1.tail, tone: 2, shade: 3, light: { tone: 1, shape: capsule([[38, 30], [40, 33]], 0.5) } },
    { shape: A1.body, tone: 1, shade: 2, light: { tone: 0, shape: ellipse(26, 35, 5, 1.6) } },
    { shape: A1.legsNear, tone: 1, shade: 2, pixels: hooves([[18, 45], [19, 45], [20, 45], [30, 45], [31, 45], [32, 45]]) },
    { shape: A1.neck, tone: 1, shade: 2 },
    { shape: A1.ear, tone: 1, shade: 2 },
    { shape: A1.horn, tone: 1, shade: 2, light: { tone: 0, shape: poly([11.5, 15], [10.5, 10], [12.5, 15]) } },
    { shape: A1.head, tone: 1, shade: 2, light: { tone: 0, shape: ellipse(12, 18, 1.5, 1) }, pixels: [...stamp(13, 19, ['33', '30']), ...px(3, [7, 22], [8, 24], [9, 24])] },
    { shape: A1.mane, tone: 2, shade: 3, light: { tone: 1, shape: poly([18, 19], [21, 22], [19, 21]) } },
    { pixels: [...flake(4, 10), ...flake(28, 14), ...star(38, 18)] },
  ]));
}

function alicornetBack() {
  return toRows(paint([
    { shape: union(capsule([[22, 36], [22, 44]], 1.8), capsule([[31, 36], [31, 44]], 1.8)), tone: 1, shade: 2, pixels: hooves([[21, 45], [22, 45], [23, 45], [30, 45], [31, 45], [32, 45]]) },
    { shape: ellipse(26, 32, 10, 7), tone: 1, shade: 2, light: { tone: 0, shape: ellipse(22, 28, 3, 1.5) } },
    { shape: capsule([[21, 30], [15, 21]], 3.4), tone: 1, shade: 2 },
    { shape: union(poly([11, 16], [10, 10], [13.5, 14]), poly([17, 16], [18, 10], [14.5, 14])), tone: 1, shade: 2 },
    { shape: poly([12.5, 14], [13.5, 5], [15.5, 14]), tone: 1, shade: 2, light: { tone: 0, shape: poly([13.5, 12], [13.6, 8], [14.3, 12]) } },
    { shape: ellipse(14, 18, 4, 4), tone: 1, shade: 2 },
    { shape: poly([13, 15], [16, 15], [19, 21], [23, 28], [20, 29], [16, 23]), tone: 2, shade: 3 },
    { shape: capsule([[34, 29], [36, 36], [35, 42]], 1.8), tone: 2, shade: 3 },
    { pixels: [...flake(6, 30), ...star(37, 14)] },
  ]));
}

const ALICORNET_ICON = iconFrom([
  { shape: union(capsule([[7, 12], [7, 15]], 1), capsule([[12, 12], [12, 15]], 1)), tone: 1, shade: 2 },
  { shape: ellipse(10, 10.5, 4.5, 3), tone: 1, shade: 2 },
  { shape: capsule([[7, 10], [5, 6]], 2), tone: 1, shade: 2 },
  { shape: poly([4, 3.5], [3, 0], [5.5, 3]), tone: 1, shade: 2 },
  { shape: union(ellipse(4.5, 5, 2.6, 2.3), ellipse(2, 6.5, 1.8, 1.5)), tone: 1, shade: 2, pixels: px(3, [4, 4], [1, 7]) },
  { shape: poly([6, 3.5], [9, 7], [8, 9], [6.5, 6]), tone: 2, shade: 3 },
]);

// ---------- 143 Alicorne: a great unicorn of the frozen passes, her long horn streaming frost ----------
const A2 = {
  legsFar: union(capsule([[21, 34], [22, 44]], 1.9), capsule([[36, 34], [39, 44]], 1.9)),
  legsNear: union(capsule([[17, 34], [16, 44]], 2.2), capsule([[32, 34], [33, 44]], 2.2)),
  body: ellipse(28, 28, 12.5, 8),
  tail: capsule([[40, 24], [45, 26], [46, 34], [44, 40]], 2.4),
  neck: capsule([[18, 27], [14, 15]], 4.5),
  head: union(ellipse(11, 12, 5.5, 4.5), ellipse(5.5, 15, 4, 3)),
  ear: poly([13, 8.5], [16, 3], [16, 9]),
  horn: poly([8.5, 8.5], [2, 0], [11.5, 7.5]),
  mane: poly([14, 7], [19, 10], [22, 17], [24, 24], [21, 23], [22, 28], [18, 24], [17, 19], [15, 14]),
};

function alicorneFront() {
  return toRows(paint([
    { shape: A2.legsFar, tone: 2, shade: 3, pixels: hooves([[22, 45], [23, 45], [39, 45], [40, 45]]) },
    { shape: A2.tail, tone: 2, shade: 3, light: { tone: 1, shape: capsule([[43, 26], [45, 31]], 0.6) } },
    { shape: A2.body, tone: 1, shade: 2, light: { tone: 0, shape: ellipse(27, 32, 7, 1.8) } },
    { shape: A2.legsNear, tone: 1, shade: 2, light: { tone: 0, shape: capsule([[16, 37], [16, 41]], 0.4) }, pixels: hooves([[14, 45], [15, 45], [16, 45], [17, 45], [32, 45], [33, 45], [34, 45], [35, 45]]) },
    { shape: A2.neck, tone: 1, shade: 2 },
    { shape: A2.ear, tone: 1, shade: 2 },
    { shape: A2.horn, tone: 1, shade: 2, light: { tone: 0, shape: poly([7, 6], [3.5, 2], [8, 5]) }, pixels: px(2, [6, 5], [8, 7], [4, 3]) },
    { shape: A2.head, tone: 1, shade: 2, light: { tone: 0, shape: ellipse(9, 10, 2, 1) }, pixels: [...stamp(10, 11, ['333', '300']), ...px(3, [2, 15], [4, 17], [5, 17], [6, 17])] },
    { shape: A2.mane, tone: 2, shade: 3, light: { tone: 1, shape: poly([16, 10], [20, 14], [21, 20], [18, 15]) } },
    { pixels: [...star(30, 6), ...flake(40, 14), ...flake(24, 2), ...flake(2, 26)] },
  ]));
}

function alicorneBack() {
  return toRows(paint([
    { shape: union(capsule([[23, 36], [23, 44]], 2.5), capsule([[35, 36], [35, 44]], 2.5)), tone: 1, shade: 2, pixels: hooves([[21, 45], [22, 45], [23, 45], [24, 45], [34, 45], [35, 45], [36, 45], [37, 45]]) },
    { shape: ellipse(29, 29, 13, 9.5), tone: 1, shade: 2, light: { tone: 0, shape: ellipse(23, 24, 4, 1.8) } },
    { shape: capsule([[22, 27], [13, 13]], 4.8), tone: 1, shade: 2 },
    { shape: union(poly([8, 9], [7, 1], [11.5, 6]), poly([17, 9], [18, 1], [13.5, 6])), tone: 1, shade: 2 },
    { shape: poly([10.5, 6], [12, -2], [14.5, 6]), tone: 1, shade: 2, light: { tone: 0, shape: poly([12, 5], [12.2, 1], [13, 5]) } },
    { shape: ellipse(12.5, 10, 5, 4.5), tone: 1, shade: 2 },
    { shape: poly([11, 7], [15, 7], [20, 14], [25, 22], [27, 28], [23, 27], [17, 18]), tone: 2, shade: 3, light: { tone: 1, shape: poly([15, 10], [19, 16], [17, 16]) } },
    { shape: capsule([[38, 25], [41, 33], [40, 43]], 2.6), tone: 2, shade: 3, light: { tone: 1, shape: capsule([[39, 28], [40, 33]], 0.6) } },
    { pixels: [...star(34, 4), ...flake(4, 24)] },
  ]));
}

const ALICORNE_ICON = iconFrom([
  { shape: capsule([[13, 6], [15, 9], [15, 13]], 1.2), tone: 2, shade: 3 },
  { shape: union(capsule([[7, 12], [7, 15]], 1.1), capsule([[13, 12], [13, 15]], 1.1)), tone: 1, shade: 2 },
  { shape: ellipse(10, 9.5, 5, 3.2), tone: 1, shade: 2 },
  { shape: capsule([[7, 9], [5, 5]], 2.3), tone: 1, shade: 2 },
  { shape: poly([3, 2.5], [0.5, 0], [4.5, 2]), tone: 1, shade: 2 },
  { shape: union(ellipse(4, 4, 2.6, 2.3), ellipse(1.8, 5.5, 1.6, 1.4)), tone: 1, shade: 2, pixels: px(3, [4, 3], [1, 6]) },
  { shape: poly([5.5, 2], [9, 5], [8.5, 8.5], [6.5, 6]), tone: 2, shade: 3 },
]);

export const line = [
  { id: 'alicornet', front: alicornetFront(), back: alicornetBack(), icon: ALICORNET_ICON },
  { id: 'alicorne', front: alicorneFront(), back: alicorneBack(), icon: ALICORNE_ICON },
];
