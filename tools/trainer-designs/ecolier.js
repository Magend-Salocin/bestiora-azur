import { capsule, ellipse, paint, poly, px, rect, stamp, toRows, union } from '../creature-painter.js';
import { eyes, hline } from './face.js';

// Écolier: a serious schoolboy with a side parting and a cowlick, grey school smock buttoned to
// the neck, satchel strap across the chest, showing his slate with chalk sums.
// Generic class (Hameau, Bois, Port-Ondine, Haute-Bise).

const E = {
  body: poly([15.5, 32.5], [30.5, 32.5], [35.5, 35.5], [38, 48], [8, 48], [10.5, 35.5]),
  strap: capsule([[13, 34], [33, 47]], 1.2),
  neck: rect(20, 27, 26, 33),
  collar: poly([18, 31.5], [28, 31.5], [27, 34.5], [23, 33.5], [19, 34.5]),
  slate: rect(13.5, 37.5, 32.5, 48),
  board: rect(15.5, 39.5, 30.5, 48),
  hands: union(ellipse(13.8, 39.5, 2.7, 2.7), ellipse(32.2, 39.5, 2.7, 2.7)),
  ears: union(ellipse(15, 20.5, 2, 2.6), ellipse(31, 20.5, 2, 2.6)),
  head: union(ellipse(23, 19, 7.6, 7.8), poly([16, 20.5], [30, 20.5], [28, 25.5], [23, 28], [18, 25.5])),
  // Short hair parted on the left, a tuft standing up at the crown.
  hair: union(
    (x, y) => ellipse(23, 17, 8.4, 7.6)(x, y) && y < 15 - (x > 19 ? 0 : 1.5) + (x > 28 ? 1.5 : 0),
    poly([24, 10.5], [25, 7.5], [27, 7], [26.5, 10.5]),
  ),
};

function ecolierPortrait() {
  return toRows(paint([
    { shape: E.body, tone: 1, shade: 2,
      light: { tone: 0, shape: poly([11, 37], [13, 34], [15, 34], [12.5, 39]) },
      // Buttons down the front and smock folds.
      pixels: [...px(3, [23, 35], [23, 38]), ...px(2, [11, 42], [12, 44], [35, 41], [34, 44])] },
    { shape: E.strap, tone: 2, shade: 3 },
    { shape: E.neck, tone: 0, shade: 1 },
    { shape: E.collar, tone: 0, shade: 1 },
    { shape: E.slate, tone: 1, shade: 2 },
    { shape: E.board, tone: 3, outline: false,
      // Chalk sums: « 2 + 2 = 4 ».
      pixels: [
        ...stamp(17, 41, [
          '00..........0.0',
          '..0..0......000',
          '.0..000.000...0',
          '00...0........0',
        ]),
        ...stamp(25, 42, ['000']),
        ...hline(0, 17, 22, 46),
      ] },
    { shape: E.hands, tone: 0, shade: 1, pixels: px(1, [12, 40], [13, 41], [33, 40], [32, 41]) },
    { shape: E.ears, tone: 0, shade: 1, pixels: px(1, [15, 20], [31, 20]) },
    { shape: E.head, tone: 0, shade: 1 },
    { shape: E.hair, tone: 2, shade: 3, light: { tone: 1, shape: poly([20, 12.5], [23, 10], [25, 10], [21.5, 13]) },
      pixels: px(3, [19, 13], [19, 12]) },
    {
      pixels: [
        // Earnest look, a chalk smudge on the cheek, small pursed mouth.
        ...hline(3, 18, 20, 16), ...hline(3, 26, 28, 16),
        ...eyes(19, 26, 18),
        ...px(1, [23, 21], [23, 22]),
        ...px(1, [27, 23], [28, 23]),
        ...hline(3, 22, 24, 25),
      ],
    },
  ]));
}

export const portraits = [{ id: 'ecolier', portrait: ecolierPortrait() }];
