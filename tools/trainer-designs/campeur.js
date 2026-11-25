import { capsule, ellipse, paint, poly, px, rect, stamp, toRows, union } from '../creature-painter.js';
import { eyes, hline, vline } from './face.js';

// Campeur: a teenage camper in a bucket hat, knotted neckerchief, blanket roll strapped on top
// of his rucksack, hand on a walking stick. Generic class (Bois, Port-Ondine, Cendrelune,
// Haute-Bise, Marais Gris).

const C = {
  // Rucksack rising behind the left shoulder, a blanket roll strapped on top.
  bag: union(ellipse(10.5, 28, 6, 6.5), rect(4.5, 28, 16.5, 34)),
  flap: (x, y) => ellipse(10.5, 26.5, 6.2, 5)(x, y) && y < 27.5,
  bedroll: capsule([[4.5, 20.5], [15.5, 20.5]], 2.4),
  body: poly([14.5, 31.5], [31.5, 31.5], [37, 34], [40, 48], [6, 48], [9, 34]),
  straps: union(rect(14, 32, 16.5, 48), rect(29.5, 32, 32, 48)),
  neck: rect(19.5, 25, 26.5, 32),
  scarf: poly([16.5, 30], [29.5, 30], [26.5, 34], [23, 40], [19.5, 34]),
  knot: ellipse(23, 33, 2.2, 1.8),
  stick: rect(40, 18, 42, 48),
  sleeve: capsule([[34.5, 33], [38.5, 40]], 3.6),
  hand: ellipse(40.6, 40.5, 2.8, 2.6),
  ears: union(ellipse(15.6, 18.5, 1.8, 2.4), ellipse(30.4, 18.5, 1.8, 2.4)),
  head: union(ellipse(23, 17.5, 7.2, 7.5), poly([16, 19], [30, 19], [28.5, 24], [23, 26.5], [17.5, 24])),
  hair: union(poly([15.5, 13], [17, 17.5], [18.5, 14]), poly([30.5, 13], [29, 17.5], [27.5, 14])),
  hat: union(poly([16.5, 13], [17.5, 7.5], [19.5, 6], [26.5, 6], [28.5, 7.5], [29.5, 13]), poly([11.5, 15.5], [15.5, 11.5], [30.5, 11.5], [34.5, 15.5], [30, 14.5], [16, 14.5])),
};

function campeurPortrait() {
  return toRows(paint([
    { shape: C.bag, tone: 1, shade: 2, pixels: px(2, [7, 31], [8, 32]) },
    { shape: C.flap, tone: 2, shade: 3, pixels: px(1, [10, 27], [11, 27]) },
    { shape: C.bedroll, tone: 1, shade: 2,
      light: { tone: 0, shape: rect(3, 18, 17, 19) },
      pixels: [...vline(3, 7, 18, 22), ...vline(3, 13, 18, 22), ...px(2, [3, 20])] },
    { shape: C.body, tone: 0, shade: 1,
      pixels: [...px(1, [10, 40], [11, 43], [35, 38], [36, 42]), ...stamp(19, 42, ['33333', '31113', '33333'])] },
    { shape: C.straps, tone: 2, shade: 3, pixels: px(1, [15, 40], [30, 40]) },
    { shape: C.neck, tone: 0, shade: 1 },
    { shape: C.scarf, tone: 2, shade: 3, light: { tone: 1, shape: poly([18, 31], [21, 31], [20.5, 33.5]) } },
    { shape: C.knot, tone: 1, shade: 2 },
    { shape: C.stick, tone: 1, shade: 2, pixels: [...px(3, [41, 24], [40, 30], [41, 46]), ...px(2, [40, 18], [41, 18])] },
    { shape: C.sleeve, tone: 0, shade: 1 },
    { shape: C.hand, tone: 0, shade: 1, pixels: px(1, [39, 40], [39, 41], [39, 42]) },
    { shape: C.ears, tone: 0, shade: 1 },
    { shape: C.head, tone: 0, shade: 1 },
    { shape: C.hair, tone: 3 },
    { shape: C.hat, tone: 1, shade: 2,
      light: { tone: 0, shape: poly([18, 10], [19, 7], [21, 7], [19.5, 10]) },
      // Stitched band around the crown, stitching rows on the brim.
      pixels: [...hline(2, 17, 29, 11), ...px(3, [19, 11], [23, 11], [27, 11]), ...px(2, [15, 13], [18, 13], [28, 13], [31, 13])] },
    {
      pixels: [
        // Confident half smile, one eyebrow cocked.
        ...hline(3, 18, 20, 15), ...hline(3, 26, 28, 14),
        ...eyes(19, 26, 16),
        ...px(1, [23, 19], [23, 20]),
        ...stamp(20, 22, ['3....3', '.3333.']),
        ...px(1, [18, 21], [28, 21]),
      ],
    },
  ]));
}

export const portraits = [{ id: 'campeur', portrait: campeurPortrait() }];
