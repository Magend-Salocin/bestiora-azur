import { capsule, ellipse, paint, poly, px, rect, stamp, toRows, union } from '../creature-painter.js';
import { eyes, hline, vline } from './face.js';

// Gamin: a village rascal of eight, flat cap askew, freckles and a gap-toothed grin, shirt with
// braces, slingshot raised in his fist. Generic class (Hameau, Bois, Haute-Bise, Forge-Ardente).

const K = {
  body: poly([15, 33], [31, 33], [36, 36], [38.5, 48], [7.5, 48], [10, 36]),
  collar: union(poly([18, 32], [23, 33], [20, 37]), poly([28, 32], [23, 33], [26, 37])),
  neck: rect(20, 28, 26, 34),
  sleeve: capsule([[12.5, 38], [8.5, 30]], 3.4),
  hand: ellipse(7.8, 26.5, 2.9, 2.7),
  ears: union(ellipse(15.2, 21, 1.8, 2.4), ellipse(30.8, 21, 1.8, 2.4)),
  head: union(ellipse(23, 19.5, 7.8, 8), poly([16, 21], [30, 21], [28, 26], [23, 28.5], [18, 26])),
  hair: union(poly([15, 14], [17, 18.5], [18.5, 15]), poly([31, 14], [29, 18.5], [27.5, 15]), poly([19, 14], [21, 16], [23, 14], [25, 16.5], [27, 14])),
  cap: (x, y) => ellipse(22, 11.5, 8.8, 5.6)(x, y) && y < 14.5,
  visor: ellipse(30.5, 14, 6.5, 1.8),
};

function gaminPortrait() {
  return toRows(paint([
    { shape: K.body, tone: 0, shade: 1,
      pixels: [
        // Braces with their buttons, and a patch on the shirt.
        ...vline(2, 17, 34, 47), ...vline(2, 18, 34, 47), ...vline(2, 28, 34, 47), ...vline(2, 29, 34, 47),
        ...px(3, [17, 41], [29, 41]),
        ...stamp(31, 42, ['3333', '3113', '3113', '3333']),
        ...px(1, [12, 42], [13, 44], [34, 39]),
      ] },
    { shape: K.neck, tone: 0, shade: 1 },
    { shape: K.collar, tone: 0, shade: 1 },
    // Slingshot: thin wooden fork, the elastic stretched between its tips.
    { pixels: [
      ...stamp(2, 12, [
        '33.......33',
        '.3.......3.',
        '.3.......3.',
        '.322222223.',
        '..3.....3..',
        '...3...3...',
        '....3.3....',
        '.....3.....',
        '.....3.....',
        '.....3.....',
        '.....3.....',
        '.....3.....',
      ]),
    ] },
    { shape: K.sleeve, tone: 0, shade: 1 },
    { shape: K.hand, tone: 0, shade: 1, pixels: px(1, [6, 27], [7, 27], [8, 27], [9, 28]) },
    { shape: K.ears, tone: 0, shade: 1 },
    { shape: K.head, tone: 0, shade: 1 },
    { shape: K.hair, tone: 1, shade: 2 },
    { shape: K.cap, tone: 2, shade: 3,
      light: { tone: 1, shape: poly([15, 11], [18, 7.5], [20, 7], [17, 11.5]) },
      pixels: [...px(3, [22, 6], [22, 7]), ...px(1, [21, 6])] },
    { shape: K.visor, tone: 2, shade: 3 },
    {
      pixels: [
        // Raised brows, freckles, grin with a missing tooth.
        ...hline(3, 18, 20, 16), ...hline(3, 26, 28, 16),
        ...eyes(19, 26, 18),
        ...px(1, [17, 22], [19, 23], [18, 24], [28, 22], [29, 23], [27, 24]),
        ...px(1, [23, 21], [23, 22]),
        ...stamp(19, 24, ['3333333', '.30003.', '..333..']),
        ...px(3, [23, 25]),
      ],
    },
  ]));
}

export const portraits = [{ id: 'gamin', portrait: gaminPortrait() }];
