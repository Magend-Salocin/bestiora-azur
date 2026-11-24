import { ellipse, mirrorX, paint, poly, px, rect, toRows, union } from '../creature-painter.js';

// Korrigan. Tones: 0 face/hands, 1 beard/tunic/ears, 2 hat/cape/boots, 3 ink.
// Shared silhouette pieces, so the front and back views keep the same proportions.
const CAPE = poly([15, 29], [33, 29], [37, 36], [38, 41], [35, 40], [33, 42], [30, 40.5], [27, 42], [24, 40.5], [21, 42], [18, 40.5], [15, 42], [13, 40], [10, 41], [11, 36]);
const LEGS = union(rect(18, 38, 22, 43), rect(26, 38, 30, 43));
const BOOTS = union(ellipse(18.5, 44.2, 4.6, 2.3), ellipse(29.5, 44.2, 4.6, 2.3));
const EARS = mirrorX(poly([17.5, 21.5], [7.5, 17.5], [10, 21], [17.5, 26.5]));
const HEAD = ellipse(24, 23, 8.2, 7.2);
const BRIM = ellipse(24, 16.8, 10.5, 2.2);
const CONE = poly([16.5, 16.5], [31.5, 16.5], [29.5, 10.5], [30, 6.5], [33.5, 4], [35.5, 5], [33.5, 5.5], [32, 8], [27, 6], [22.5, 8], [18.5, 12]);
const HANDS = union(ellipse(12.8, 37.6, 2.3, 2), ellipse(35.2, 37.6, 2.3, 2));
const ARMS = mirrorX(poly([17.5, 31], [13, 34], [12, 37], [15, 37.5], [18.5, 34]));

function front() {
  return toRows(paint([
    { shape: CAPE, tone: 2, shade: 3 },
    { shape: LEGS, tone: 1 },
    { shape: BOOTS, tone: 2, shade: 3, light: { tone: 1, shape: union(rect(15, 43, 18, 44), rect(27, 43, 30, 44)) } },
    { shape: ellipse(24, 34.5, 7.5, 6), tone: 1, shade: 2,
      pixels: [...px(3, [18, 36], [19, 36], [20, 36], [21, 36], [22, 36], [25, 36], [26, 36], [27, 36], [28, 36], [29, 36]), ...px(0, [23, 36], [24, 36])] },
    { shape: ARMS, tone: 2 },
    { shape: HANDS, tone: 0, shade: 1 },
    // Charmed pebble in the left hand, with two sparkles.
    { shape: ellipse(36.6, 35.3, 2, 1.8), tone: 1, shade: 2, pixels: [...px(0, [36, 34]), ...px(2, [40, 31], [39, 32], [40, 32], [41, 32], [40, 33], [38, 29])] },
    { shape: EARS, tone: 1, shade: 2, pixels: px(0, [12, 20], [13, 21], [14, 21], [35, 20], [34, 21], [33, 21]) },
    { shape: HEAD, tone: 0, shade: 1 },
    // Mossy beard under the grin.
    { shape: poly([16, 23.5], [17.5, 28.5], [19.5, 32.5], [22, 31.5], [24, 34], [26, 31.5], [28.5, 32.5], [30.5, 28.5], [32, 23.5], [29.5, 29.5], [18.5, 29.5]), tone: 1, shade: 2,
      pixels: px(2, [20, 31], [24, 32], [28, 31]) },
    { shape: union(BRIM, CONE), tone: 2,
      light: { tone: 1, shape: union(poly([19.5, 13], [23.5, 8.5], [24.5, 9], [21, 14]), rect(15, 16, 20, 17)) },
      pixels: px(3, [29, 15], [30, 15], [31, 16], [30, 14], [29, 11], [29, 12], [30, 13]) },
    // Leaf pinned on the hat band.
    { shape: poly([25, 14.5], [27.5, 12], [30, 12.5], [28, 15.5]), tone: 1, pixels: px(2, [27, 14], [28, 13]) },
    // Eyes with glints, nose, open grin.
    {
      pixels: [
        ...px(3, [19, 21], [20, 21], [19, 22], [20, 22], [19, 23], [20, 23], [27, 21], [28, 21], [27, 22], [28, 22], [27, 23], [28, 23]),
        ...px(0, [20, 21], [28, 21]),
        ...px(1, [23, 24], [24, 24]),
        ...px(3, [20, 25], [28, 25], [21, 26], [22, 26], [23, 26], [24, 26], [25, 26], [26, 26], [27, 26]),
        ...px(0, [22, 27], [23, 27], [24, 27], [25, 27], [26, 27]),
      ],
    },
  ]));
}

function back() {
  return toRows(paint([
    { shape: LEGS, tone: 1 },
    { shape: BOOTS, tone: 2, shade: 3 },
    { shape: HANDS, tone: 0, shade: 1 },
    { shape: EARS, tone: 1, shade: 2 },
    { shape: HEAD, tone: 2, shade: 3, pixels: px(1, [19, 19], [22, 20], [26, 19], [29, 21], [20, 23], [24, 22], [28, 24], [22, 26], [26, 26]) },
    // The cape covers the whole back: leaf blades with dark veins.
    { shape: union(CAPE, poly([16, 27], [32, 27], [34, 31], [14, 31])), tone: 2, shade: 3,
      light: { tone: 1, shape: union(rect(23.5, 29, 24.5, 40), poly([16, 31], [19, 31], [15, 39]), poly([32, 31], [29, 31], [33, 39])) },
      pixels: px(3, [20, 33], [21, 35], [20, 37], [28, 33], [27, 35], [28, 37]) },
    // Beard tufts peeking out on both sides of the head.
    { shape: mirrorX(poly([15.5, 25], [17.5, 29], [19.5, 27])), tone: 1, shade: 2 },
    { shape: union(BRIM, CONE), tone: 2, shade: 3,
      light: { tone: 1, shape: union(poly([19.5, 13], [24, 8], [25, 8.5], [21, 14.5]), rect(15, 16, 22, 17)) } },
  ]));
}

// Party icon (16 × 16), drawn by hand.
const ICON = [
  '.........333....',
  '.......332223...',
  '......322233....',
  '.....3222223....',
  '...3322222233...',
  '..322111222223..',
  '.33333333333333.',
  '3113000000003113',
  '.31303000030313.',
  '..330000000033..',
  '...3003333003...',
  '...3311111133...',
  '..322311113223..',
  '..322231132223..',
  '...3223333223...',
  '....333..333....',
];

export const sprites = { front: front(), back: back(), icon: ICON };
