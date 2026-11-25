import { capsule, ellipse, paint, poly, px, rect, stamp, toRows, union } from '../creature-painter.js';

// Goémonier (Port-Ondine, Routes 4 et 5, Bretagne littorale): an old seaweed harvester in a
// light oilskin open on a striped marinière, knitted cap, short grey beard, leaning on his
// long seaweed fork. Docs: docs/Pnj/PNJ_V2.md, section 3.4.

const G = {
  // Fork: long ash shaft on the right, iron head of three curved tines above the shoulder.
  shaft: rect(38, 11, 40, 48),
  ferrule: rect(37, 9, 41, 12),
  coat: poly([13, 29], [31, 29], [36.5, 31.5], [40.5, 37], [42.5, 48], [3, 48], [5.5, 36], [8.5, 31.5]),
  shirt: poly([18.5, 29.5], [26.5, 29.5], [28.5, 48], [16.5, 48]),
  collar: union(poly([14, 27.5], [19, 26.5], [21, 31], [17.5, 36], [13.5, 31]), poly([30.5, 27.5], [25.5, 26.5], [23.5, 31], [27, 36], [31, 31])),
  sleeve: capsule([[33.5, 32], [37, 35.5], [38, 36.5]], 3.6),
  hand: ellipse(38.8, 34.3, 3.1, 2.8),
  neck: rect(19, 23, 26, 29),
  ears: union(ellipse(15.3, 18.5, 1.8, 2.6), ellipse(29.7, 18.5, 1.8, 2.6)),
  head: union(ellipse(22.5, 18, 7.2, 8), poly([15.5, 19], [29.5, 19], [27.5, 25], [24.5, 27], [20.5, 27], [17.5, 25])),
  beard: poly([15.6, 20], [17, 24.5], [20, 27.5], [22.5, 28.5], [25, 27.5], [28, 24.5], [29.4, 20], [27.5, 22.5], [25, 23], [22.5, 22], [20, 23], [17.5, 22.5]),
  cap: (x, y) => (ellipse(22.5, 10, 8, 6)(x, y) && y < 12.5) || rect(14.5, 9.5, 30.5, 12.5)(x, y),
  capFold: rect(14.5, 10, 30.5, 12.5),
};

/** Horizontal stripes of the marinière: one dark row every three. */
const stripes = (x, y) => G.shirt(x, y) && Math.floor(y) % 3 === 0 && y > 30;

function goemonierPortrait() {
  return toRows(paint([
    { shape: G.coat, tone: 0, shade: 1,
      // Oilskin folds and the pocket flap.
      pixels: [
        ...px(1, [9, 36], [9, 37], [10, 38], [8, 41], [8, 42], [7, 45], [14, 34], [14, 35], [13, 40], [13, 41], [12, 46]),
        ...px(1, [33, 38], [34, 41], [34, 42], [35, 46], [30, 36], [30, 37]),
        ...stamp(7, 43, ['3333333', '3111113']),
        ...stamp(30, 43, ['333333', '311113']),
      ] },
    { shape: G.shirt, tone: 0 },
    { shape: stripes, tone: 2, outline: false },
    { shape: G.collar, tone: 0, shade: 1, pixels: px(1, [15, 30], [16, 32], [29, 30], [28, 32]) },
    { shape: G.neck, tone: 0, shade: 1, pixels: px(1, [22, 27], [23, 27]) },
    { shape: G.shaft, tone: 2, light: { tone: 1, shape: rect(38, 11, 39, 48) }, pixels: px(3, [39, 20], [39, 27], [39, 44]) },
    // Iron head: three thin tines curving forward.
    { shape: G.ferrule, tone: 2,
      pixels: [
        ...stamp(33, 1, [
          '3.....3.....3',
          '3.....3.....3',
          '3.....3.....3',
          '3.....3.....3',
          '.3....3....3.',
          '.3....3....3.',
          '..3...3...3..',
          '..333333333..',
        ]),
      ] },
    { shape: G.sleeve, tone: 0, shade: 1, pixels: px(1, [34, 34], [35, 35]) },
    { shape: G.hand, tone: 0, shade: 1, pixels: px(3, [37, 33], [37, 34], [37, 35], [36, 34]) },
    { shape: G.ears, tone: 0, shade: 1, pixels: px(1, [15, 18], [30, 18]) },
    { shape: G.head, tone: 0, shade: 1 },
    { shape: G.beard, tone: 1, shade: 2,
      pixels: [...px(2, [18, 23], [21, 25], [24, 25], [27, 23], [22, 27], [19, 22]), ...px(0, [20, 23], [25, 24])] },
    { shape: G.cap, tone: 2, shade: 3,
      light: { tone: 1, shape: poly([16, 8], [19, 5], [21, 4.5], [18, 8.5]) } },
    { shape: G.capFold, tone: 1, outline: false,
      pixels: [...px(2, [16, 10], [16, 11], [19, 10], [19, 11], [22, 10], [22, 11], [25, 10], [25, 11], [28, 10], [28, 11])] },
    {
      pixels: [
        // Squinting eyes under heavy brows, crow's feet, broad nose, mustache over a thin mouth.
        ...stamp(17, 15, ['333.', '....', '.30.', '.33.']),
        ...stamp(24, 15, ['.333', '....', '.30.', '.33.']),
        ...px(1, [16, 19], [29, 19]),
        ...px(1, [22, 19], [22, 20], [23, 21]),
        ...px(3, [21, 21], [24, 21]),
        ...px(1, [18, 20], [27, 20]),
        ...stamp(19, 22, ['3111113', '.33333.']),
      ],
    },
  ]));
}

export const portraits = [{ id: 'goemonier', portrait: goemonierPortrait() }];
