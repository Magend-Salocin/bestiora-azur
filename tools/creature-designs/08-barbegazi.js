// Lignée du Barbegazi (107 Barbegel, Givre ; 108 Barbegazi, Givre et Vent) : créature des glaciers
// cachée sous sa barbe de givre. Fiche : docs/bestiaire-folklorique/fiches/107-barbegazi.md.
// Tones: 0 frost and eyes, 1 beard, 2 fur, feet and icicles, 3 ink.
import { capsule, ellipse, iconFrom, mirrorX, paint, poly, px, stamp, toRows, union } from '../creature-painter.js';

const flake = (x, y) => stamp(x, y, ['3.3', '.3.', '3.3']);
const gust = (x, y) => stamp(x, y, ['33333..', '.....3.', '..333.3', '.3...3.', '..33...']);
/** Hanging beard: a rounded top whose bottom edge splits into points. */
function beard(x0, x1, top, bottom, points) {
  const outline = [[x0, top]];
  const step = (x1 - x0) / points;
  for (let i = 0; i < points; i += 1) outline.push([x0 + step * (i + 0.5), bottom], [x0 + step * (i + 1), bottom - 4]);
  outline.push([x1, top]);
  return poly(...outline);
}

// ---------- 107 Barbegel: a small ball of fur lost under its frosted beard, on huge feet ----------
const B1 = {
  feet: union(ellipse(16, 44.5, 7, 2), ellipse(32, 44.5, 7, 2)),
  head: ellipse(24, 26, 9, 8),
  icicles: union(poly([16, 22], [14, 13], [19, 19]), poly([20, 19], [21, 11], [24, 18]), poly([25, 18], [28, 10], [29, 19]), poly([30, 20], [35, 14], [33, 23])),
  beard: union(ellipse(24, 32, 9, 4), beard(15, 33, 31, 44, 4)),
  nose: ellipse(24, 29, 2.2, 1.8),
};

function barbegelFront() {
  return toRows(paint([
    { shape: B1.feet, tone: 2, shade: 3, light: { tone: 1, shape: union(ellipse(13, 44, 2.5, 0.8), ellipse(29, 44, 2.5, 0.8)) } },
    { shape: B1.icicles, tone: 1, shade: 2, light: { tone: 0, shape: union(poly([16, 19], [15, 15], [17, 19]), poly([21, 16], [21.5, 13], [22.5, 16])) } },
    { shape: B1.head, tone: 2, shade: 3 },
    { shape: B1.beard, tone: 1, shade: 2, light: { tone: 0, shape: ellipse(20, 34, 2, 4) }, pixels: px(2, [22, 36], [26, 37], [24, 40], [19, 39], [29, 39]) },
    { shape: B1.nose, tone: 1, shade: 2 },
    { pixels: [...stamp(19, 25, ['00.....00', '03.....03']), ...flake(8, 20), ...flake(38, 28), ...flake(36, 12)] },
  ]));
}

function barbegelBack() {
  return toRows(paint([
    { shape: B1.feet, tone: 2, shade: 3 },
    { shape: union(B1.head, ellipse(24, 34, 9, 7)), tone: 2, shade: 3, light: { tone: 1, shape: ellipse(20, 23, 3, 2) } },
    { shape: B1.icicles, tone: 1, shade: 2 },
    { shape: mirrorX(beard(13, 17, 31, 42, 1)), tone: 1, shade: 2 },
    { pixels: [...flake(8, 20), ...flake(38, 28)] },
  ]));
}

const BARBEGEL_ICON = iconFrom([
  { shape: union(poly([4, 6], [3, 1], [6, 4]), poly([7, 4], [9, 0], [10, 4]), poly([11, 5], [14, 2], [13, 7])), tone: 1, shade: 2 },
  { shape: ellipse(8.5, 7.5, 5, 4.5), tone: 2, shade: 3 },
  { shape: union(ellipse(8.5, 10, 5, 2.5), beard(4, 13, 10, 15, 3)), tone: 1, shade: 2 },
  { pixels: [...px(3, [6, 7], [11, 7]), ...px(0, [6, 6], [11, 6])] },
  { shape: union(ellipse(4, 15, 3.5, 1), ellipse(13, 15, 3.5, 1)), tone: 2, shade: 3 },
]);

// ---------- 108 Barbegazi: its beard streams out like wings in the blizzard ----------
const B2 = {
  feet: union(ellipse(15, 44.5, 8, 2.2), ellipse(33, 44.5, 8, 2.2)),
  legs: union(capsule([[19, 36], [17, 42]], 2.6), capsule([[29, 36], [31, 42]], 2.6)),
  body: ellipse(24, 30, 10, 9),
  head: ellipse(24, 18, 8, 7),
  icicles: union(poly([16, 15], [12, 5], [19, 12]), poly([20, 12], [20, 2], [24, 11]), poly([25, 11], [29, 1], [30, 12]), poly([31, 13], [37, 6], [33, 17])),
  beardWings: union(
    poly([20, 23], [10, 22], [3, 26], [6, 28], [1, 32], [7, 33], [4, 38], [13, 35], [20, 31]),
    poly([28, 23], [38, 22], [45, 26], [42, 28], [47, 32], [41, 33], [44, 38], [35, 35], [28, 31]),
  ),
  beard: union(ellipse(24, 25, 7, 3.5), beard(18, 30, 24, 37, 3)),
  nose: ellipse(24, 21.5, 2.5, 2),
};

function barbegaziFront() {
  return toRows(paint([
    { shape: B2.feet, tone: 2, shade: 3, light: { tone: 1, shape: union(ellipse(11, 44, 3, 0.8), ellipse(29, 44, 3, 0.8)) } },
    { shape: B2.legs, tone: 2, shade: 3 },
    { shape: B2.body, tone: 2, shade: 3 },
    { shape: B2.beardWings, tone: 1, shade: 2, light: { tone: 0, shape: union(poly([8, 25], [16, 24], [10, 28]), poly([32, 25], [40, 24], [38, 28])) }, pixels: px(2, [9, 31], [14, 30], [34, 30], [39, 31]) },
    { shape: B2.icicles, tone: 1, shade: 2, light: { tone: 0, shape: union(poly([15, 10], [14, 7], [17, 11]), poly([21, 8], [21, 4], [22.5, 9])) } },
    { shape: B2.head, tone: 2, shade: 3 },
    { shape: B2.beard, tone: 1, shade: 2, light: { tone: 0, shape: ellipse(21, 28, 1.5, 3) }, pixels: px(2, [24, 30], [22, 33], [26, 33]) },
    { shape: B2.nose, tone: 1, shade: 2 },
    { pixels: [...stamp(19, 17, ['00.....00', '03.....03']), ...gust(1, 12), ...gust(40, 15), ...flake(8, 3), ...flake(40, 4)] },
  ]));
}

function barbegaziBack() {
  return toRows(paint([
    { shape: B2.feet, tone: 2, shade: 3 },
    { shape: B2.legs, tone: 2, shade: 3 },
    { shape: B2.beardWings, tone: 1, shade: 2, pixels: px(2, [9, 31], [14, 30], [34, 30], [39, 31]) },
    { shape: union(B2.body, B2.head), tone: 2, shade: 3, light: { tone: 1, shape: ellipse(20, 15, 3, 2) } },
    { shape: B2.icicles, tone: 1, shade: 2 },
    { pixels: [...gust(1, 12), ...gust(40, 15)] },
  ]));
}

const BARBEGAZI_ICON = iconFrom([
  { shape: union(poly([4, 5], [2, 0], [6, 3]), poly([7, 3], [8, 0], [9.5, 3]), poly([11, 4], [14, 0], [13, 6])), tone: 1, shade: 2 },
  { shape: ellipse(8.5, 6.5, 4.5, 4), tone: 2, shade: 3, pixels: [...px(3, [6, 6], [11, 6]), ...px(0, [6, 5], [11, 5])] },
  { shape: union(poly([6, 9], [0.5, 9], [1, 13], [6, 12]), poly([11, 9], [16, 9], [16, 13], [11, 12]), beard(5, 12, 9, 14.5, 2)), tone: 1, shade: 2 },
  { shape: union(ellipse(4, 15, 3.5, 1), ellipse(13, 15, 3.5, 1)), tone: 2, shade: 3 },
]);

export const line = [
  { id: 'barbegel', front: barbegelFront(), back: barbegelBack(), icon: BARBEGEL_ICON },
  { id: 'barbegazi', front: barbegaziFront(), back: barbegaziBack(), icon: BARBEGAZI_ICON },
];
