import { capsule, ellipse, paint, poly, px, rect, stamp, toRows, union } from '../creature-painter.js';
import { eyes, hline } from './face.js';

// Campeuse: a teenage camper with a headband and a ponytail swinging to the side, sleeveless
// pocketed vest over a shirt with rolled sleeves, a storm lantern hanging from her hand.
// Generic class (Bois, Port-Ondine, Cendrelune, Haute-Bise, Marais Gris, Givremont…).

const L = {
  ponytail: capsule([[30, 13], [35, 15], [37.5, 20], [37, 25]], 2.3),
  body: poly([15, 31.5], [31, 31.5], [36.5, 34], [39.5, 48], [6.5, 48], [9.5, 34]),
  vest: union(poly([9.5, 34], [15, 31.5], [19.5, 31.5], [21, 48], [6.5, 48]), poly([36.5, 34], [31, 31.5], [26.5, 31.5], [25, 48], [39.5, 48])),
  neck: rect(20, 25, 26, 32),
  sleeve: capsule([[12.5, 37], [14, 34.5]], 3.4),
  forearm: capsule([[14.5, 34], [10.5, 30.5]], 2.3),
  hand: ellipse(9.5, 29.6, 2.6, 2.3),
  lanternGlass: rect(5.5, 34, 13.5, 41),
  lanternCap: poly([4.5, 34], [6.5, 31], [12.5, 31], [14.5, 34]),
  lanternBase: rect(4.5, 41, 14.5, 43.5),
  ears: union(ellipse(15.6, 18.5, 1.8, 2.4), ellipse(30.4, 18.5, 1.8, 2.4)),
  head: union(ellipse(23, 17.5, 7.2, 7.6), poly([16, 19], [30, 19], [28.5, 24], [23, 26.5], [17.5, 24])),
  hair: union((x, y) => ellipse(23, 15.5, 8.4, 8.2)(x, y) && y < 13.5, poly([15, 13], [15.8, 18], [17.5, 13.5]), poly([31, 13], [30.2, 18], [28.5, 13.5])),
  band: (x, y) => ellipse(23, 15.5, 8.6, 8.4)(x, y) && y >= 11.5 && y < 13.5,
};

function campeusePortrait() {
  return toRows(paint([
    { shape: L.ponytail, tone: 2, shade: 3, pixels: px(1, [34, 15], [36, 18], [37, 21]) },
    { shape: L.body, tone: 0, shade: 1 },
    { shape: L.vest, tone: 2, shade: 3,
      light: { tone: 1, shape: poly([10, 36], [12, 33.5], [13.5, 33.5], [11, 39]) },
      // Patch pockets with their flaps.
      pixels: [...stamp(12, 39, ['33333', '31113', '3...3', '33333']), ...stamp(29, 39, ['33333', '31113', '3...3', '33333'])] },
    { shape: L.neck, tone: 0, shade: 1, pixels: px(1, [22, 30], [23, 31], [24, 30]) },
    { shape: L.sleeve, tone: 0, shade: 1 },
    { shape: L.forearm, tone: 0, shade: 1 },
    // Lantern hanging from her fist, light glowing behind the glass.
    { shape: L.lanternCap, tone: 2, shade: 3 },
    { shape: L.lanternGlass, tone: 0, light: { tone: 1, shape: ellipse(9.5, 38, 1.6, 2.4) },
      pixels: [...px(3, [9, 35], [9, 41]), ...px(2, [9, 37], [9, 38]), ...px(1, [6, 35], [6, 36])] },
    { shape: L.lanternBase, tone: 2, shade: 3 },
    { shape: L.hand, tone: 0, shade: 1, pixels: px(1, [8, 30], [9, 30], [10, 30]) },
    { shape: L.ears, tone: 0, shade: 1 },
    { shape: L.head, tone: 0, shade: 1 },
    { shape: L.hair, tone: 2, shade: 3, light: { tone: 1, shape: poly([17, 9], [20, 7], [22, 7], [18.5, 10]) } },
    { shape: L.band, tone: 1, shade: 2, pixels: px(2, [17, 12], [23, 12], [29, 12]) },
    {
      pixels: [
        // Bright open smile.
        ...hline(3, 18, 20, 14), ...hline(3, 26, 28, 14),
        ...eyes(19, 26, 16),
        ...px(1, [23, 19], [23, 20]),
        ...stamp(20, 22, ['333333', '.3003.', '..33..']),
        ...px(1, [18, 21], [28, 21]),
      ],
    },
  ]));
}

export const portraits = [{ id: 'campeuse', portrait: campeusePortrait() }];
