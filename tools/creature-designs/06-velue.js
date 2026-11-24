// Lignée de la Velue (075 Veluchon et 076 Velucorne, Toxique) et Fouletot (077, Foudre).
// Fiche : docs/bestiaire-folklorique/fiches/075-velue.md.
// Tones: 0 eyes, quill tips and sparks, 1 fur and skin, 2 dark fur and spines, 3 ink.
import { capsule, ellipse, eyes, iconFrom, mirrorX, paint, poly, px, stamp, toRows, union } from '../creature-painter.js';

/** Star-like outline between two angles (degrees, 0 = right, 90 = down): long and short points alternate. */
function bristles(cx, cy, r, count, length, from = -180, to = 180) {
  const points = [];
  for (let i = 0; i <= count * 2; i += 1) {
    const angle = ((from + ((to - from) * i) / (count * 2)) * Math.PI) / 180;
    const radius = i % 2 ? r + length : r;
    points.push([cx + Math.cos(angle) * radius, cy + Math.sin(angle) * radius]);
  }
  if (to - from < 360) points.push([cx, cy]);
  return poly(...points);
}
const spark = (x, y) => stamp(x, y, ['.3.', '303', '.3.']);
const bolt = (x, y) => stamp(x, y, ['..33', '.303', '303.', '3033', '.030', '..3.']);
const drip = (x, y) => stamp(x, y, ['.3.', '303', '303', '.3.']);

// ---------- 075 Veluchon: shaggy ball of green hair with poisoned quills and a snake tail ----------
const V1 = {
  tail: capsule([[30, 41], [37, 42], [41, 38], [40, 33]], 1.7),
  tailTip: poly([38, 34], [40, 27], [42, 34]),
  feet: union(ellipse(19.5, 44.6, 3, 1.5), ellipse(28.5, 44.6, 3, 1.5)),
  quills: union(poly([17, 28], [13, 18], [21, 26]), poly([22, 25], [23, 14], [27, 25]), poly([28, 26], [35, 17], [32, 28])),
  body: bristles(24, 35, 9.5, 14, 2.5),
  fringe: poly([15, 30], [17, 27], [24, 25], [31, 27], [33, 30], [31, 33], [29, 31], [27, 34], [25, 31], [23, 34], [21, 31], [19, 34], [17, 31]),
};

function veluchonFront() {
  return toRows(paint([
    { shape: V1.tail, tone: 2, shade: 3 },
    { shape: V1.tailTip, tone: 1, shade: 2, light: { tone: 0, shape: poly([39.5, 30], [40.5, 28], [40.5, 32]) } },
    { shape: V1.feet, tone: 2, shade: 3 },
    { shape: V1.quills, tone: 2, shade: 3, pixels: px(0, [14, 19], [23, 15], [34, 18]) },
    { shape: V1.body, tone: 1, shade: 2, light: { tone: 0, shape: ellipse(18, 37, 1.5, 2.5) }, pixels: px(2, [16, 38], [17, 40], [31, 38], [30, 41], [24, 42]) },
    { shape: V1.fringe, tone: 2, shade: 3 },
    { pixels: [...eyes(19, 27, 34, { height: 2 }), ...stamp(22, 38, ['3..3', '.33.']), ...drip(10, 30)] },
  ]));
}

function veluchonBack() {
  return toRows(paint([
    { shape: V1.feet, tone: 2, shade: 3 },
    { shape: V1.quills, tone: 2, shade: 3, pixels: px(0, [14, 19], [23, 15], [34, 18]) },
    { shape: V1.body, tone: 1, shade: 2, pixels: px(2, [18, 32], [22, 36], [27, 33], [30, 38], [24, 40], [19, 39]) },
    { shape: capsule([[26, 43], [33, 43], [37, 39], [36, 33]], 1.7), tone: 2, shade: 3 },
    { shape: poly([34.5, 34], [36, 27], [38, 34]), tone: 1, shade: 2 },
  ]));
}

const VELUCHON_ICON = iconFrom([
  { shape: union(poly([5, 6], [3, 1], [7.5, 5]), poly([9, 5], [12.5, 1], [11, 6.5])), tone: 2, shade: 3 },
  { shape: bristles(8, 9.5, 5, 10, 1.5), tone: 1, shade: 2 },
  { shape: poly([3.5, 8], [8, 5.5], [12.5, 8], [11, 9.5], [9.5, 8.5], [8, 10], [6.5, 8.5], [5, 9.5]), tone: 2, shade: 3 },
  { pixels: [...px(3, [6, 10], [6, 11], [10, 10], [10, 11]), ...px(0, [6, 10], [10, 10]), ...px(3, [7, 13], [8, 13])] },
]);

// ---------- 076 Velucorne: great shaggy beast of the Huisne, quilled back, horned snout, snake tail ----------
const V2 = {
  tail: capsule([[38, 34], [44, 32], [45, 25], [41, 21]], 2.2),
  tailTip: poly([39, 23], [36, 15], [43, 21]),
  legsBack: union(capsule([[22, 38], [22, 43]], 2.8), capsule([[38, 38], [38, 43]], 2.8)),
  legsFront: union(capsule([[17, 38], [16, 43.5]], 3), capsule([[33, 38], [33, 43.5]], 3)),
  quills: union(
    poly([19, 26], [16, 13], [24, 23]), poly([24, 23], [27, 9], [30, 22]), poly([30, 22], [36, 11], [35, 24]), poly([35, 25], [43, 17], [39, 29]),
  ),
  body: bristles(29, 31, 11, 16, 2.2),
  head: ellipse(12, 31, 7, 6),
  snout: ellipse(7.5, 34, 4.5, 3.2),
  horn: poly([5, 32], [3, 21], [9, 30]),
  fringe: poly([6, 28], [10, 24.5], [17, 25], [19, 29], [17, 31], [15, 29], [13, 31.5], [11, 29], [9, 31], [7, 30]),
};

function velucorneFront() {
  return toRows(paint([
    { shape: V2.tail, tone: 2, shade: 3 },
    { shape: V2.tailTip, tone: 1, shade: 2, light: { tone: 0, shape: poly([38, 19], [37, 16], [40, 20]) } },
    { shape: V2.legsBack, tone: 2, shade: 3 },
    { shape: V2.quills, tone: 2, shade: 3, pixels: px(0, [17, 14], [27, 10], [35, 12], [42, 18]) },
    { shape: V2.body, tone: 1, shade: 2, pixels: px(2, [22, 31], [26, 34], [31, 29], [35, 33], [29, 37], [38, 30]) },
    { shape: V2.legsFront, tone: 1, shade: 2, pixels: px(3, [15, 44], [17, 44], [32, 44], [34, 44]) },
    { shape: V2.horn, tone: 1, shade: 2, light: { tone: 0, shape: poly([4.5, 28], [4, 24], [6, 29]) } },
    { shape: V2.head, tone: 1, shade: 2 },
    { shape: V2.snout, tone: 1, shade: 2, pixels: [...px(3, [5, 33], [6, 34]), ...stamp(5, 36, ['33333'])] },
    { shape: V2.fringe, tone: 2, shade: 3 },
    { pixels: [...stamp(11, 30, ['00', '03']), ...stamp(14, 30, ['00', '03']), ...drip(3, 39)] },
  ]));
}

function velucorneBack() {
  return toRows(paint([
    { shape: union(capsule([[16, 38], [15, 43.5]], 3), capsule([[32, 38], [32, 43.5]], 3)), tone: 2, shade: 3 },
    { shape: union(poly([14, 27], [10, 14], [19, 23]), poly([20, 22], [22, 8], [26, 21]), poly([27, 22], [33, 10], [32, 24]), poly([32, 25], [40, 16], [37, 29])), tone: 2, shade: 3, pixels: px(0, [11, 15], [22, 9], [32, 11], [39, 17]) },
    { shape: bristles(24, 32, 12, 16, 2.2), tone: 1, shade: 2, pixels: px(2, [18, 30], [23, 27], [29, 31], [24, 36], [16, 36], [32, 37]) },
    { shape: union(capsule([[20, 40], [17, 43.5]], 3), capsule([[28, 40], [31, 43.5]], 3)), tone: 1, shade: 2 },
    { shape: capsule([[24, 41], [30, 44], [38, 43], [42, 38]], 2.2), tone: 2, shade: 3 },
    { shape: poly([40, 39], [44, 31], [44, 40]), tone: 1, shade: 2 },
  ]));
}

const VELUCORNE_ICON = iconFrom([
  { shape: union(poly([7, 6], [6, 1], [9.5, 5]), poly([10, 5], [12.5, 0.5], [13, 6])), tone: 2, shade: 3 },
  { shape: bristles(10, 9.5, 5, 10, 1.3), tone: 1, shade: 2 },
  { shape: union(capsule([[7, 13], [7, 15]], 1.3), capsule([[12, 13], [12, 15]], 1.3)), tone: 1, shade: 2 },
  { shape: poly([2, 9], [1, 4], [4, 8]), tone: 1, shade: 2 },
  { shape: ellipse(4, 10.5, 3.5, 3), tone: 1, shade: 2, pixels: [...px(3, [4, 9], [4, 10]), ...px(0, [4, 9]), ...px(3, [1, 12], [2, 12])] },
]);

// ---------- 077 Fouletot: stable hedgehog whose crackling spines tangle the horses' manes ----------
const F = {
  feet: union(ellipse(17, 44.6, 2.6, 1.4), ellipse(25, 44.8, 2.6, 1.4), ellipse(33, 44.8, 2.6, 1.4)),
  spines: bristles(29, 37, 10, 12, 5, -195, 5),
  body: ellipse(27, 38, 12, 6.5),
  face: ellipse(17, 37, 6, 5),
  snout: poly([13, 34], [5, 38], [13, 41]),
  ear: ellipse(20, 31.5, 1.8, 1.8),
};

function fouletotFront() {
  return toRows(paint([
    { shape: F.feet, tone: 1, shade: 2 },
    { shape: F.spines, tone: 2, shade: 3, light: { tone: 1, shape: union(poly([23, 30], [19, 25], [25, 29]), poly([29, 28], [29, 22], [31, 28])) }, pixels: px(0, [18, 25], [28, 23], [38, 26], [43, 34]) },
    { shape: F.body, tone: 1, shade: 2, light: { tone: 0, shape: ellipse(24, 41, 5, 2) } },
    { shape: F.ear, tone: 1, shade: 2 },
    { shape: union(F.face, F.snout), tone: 1, shade: 2, light: { tone: 0, shape: ellipse(14, 39, 3, 1.5) }, pixels: [...px(3, [5, 38], [6, 38]), ...stamp(15, 34, ['00', '03', '33']), ...stamp(9, 40, ['333'])] },
    { pixels: [...bolt(5, 26), ...bolt(41, 21), ...spark(33, 15)] },
  ]));
}

function fouletotBack() {
  return toRows(paint([
    { shape: union(ellipse(19.5, 44.6, 3, 1.5), ellipse(28.5, 44.6, 3, 1.5)), tone: 1, shade: 2 },
    { shape: union(bristles(24, 35, 10.5, 15, 4), mirrorX(ellipse(17, 26, 2, 2))), tone: 2, shade: 3, light: { tone: 1, shape: union(poly([17, 28], [13, 24], [19, 29]), poly([23, 26], [22, 21], [25, 26])) }, pixels: px(0, [12, 26], [22, 21], [33, 23], [36, 34]) },
    { pixels: [...bolt(6, 24), ...bolt(40, 30)] },
  ]));
}

const FOULETOT_ICON = iconFrom([
  { shape: bristles(9.5, 10, 4.5, 8, 2.5, -195, 5), tone: 2, shade: 3, pixels: px(0, [5, 5], [11, 4]) },
  { shape: ellipse(9.5, 11.5, 5, 3), tone: 1, shade: 2 },
  { shape: union(ellipse(5, 11, 3, 2.6), poly([3, 9.5], [0.5, 11.5], [3, 13])), tone: 1, shade: 2, pixels: [...px(3, [4, 10], [1, 11]), ...px(0, [4, 9])] },
  { shape: union(ellipse(6, 15, 1.5, 1), ellipse(12, 15, 1.5, 1)), tone: 1, shade: 2 },
]);

export const line = [
  { id: 'veluchon', front: veluchonFront(), back: veluchonBack(), icon: VELUCHON_ICON },
  { id: 'velucorne', front: velucorneFront(), back: velucorneBack(), icon: VELUCORNE_ICON },
  { id: 'fouletot', front: fouletotFront(), back: fouletotBack(), icon: FOULETOT_ICON },
];
