import { capsule, ellipse, paint, poly, px, rect, stamp, toRows, union } from '../creature-painter.js';
import { eyes } from './face.js';

// Fillette: a girl of eight with two ribboned braids and a fringe, dark smock dress with a round
// Peter Pan collar, a bunch of daisies held against her chest. Generic class (Hameau, Bois).

const F = {
  braids: union(capsule([[15.5, 20], [11, 24], [9.5, 29]], 2.1), capsule([[30.5, 20], [35, 24], [36.5, 29]], 2.1)),
  bows: union(poly([6.5, 29], [9.5, 31], [6.5, 33.5]), poly([12.5, 29], [9.5, 31], [12.5, 33.5]), poly([33.5, 29], [36.5, 31], [33.5, 33.5]), poly([39.5, 29], [36.5, 31], [39.5, 33.5])),
  tips: union(ellipse(9.5, 35, 1.6, 2), ellipse(36.5, 35, 1.6, 2)),
  body: poly([16, 33], [30, 33], [35, 36], [37.5, 48], [8.5, 48], [11, 36]),
  neck: rect(20.5, 27, 25.5, 32),
  collar: union(ellipse(20, 34.2, 3.4, 2.4), ellipse(26, 34.2, 3.4, 2.4)),
  stems: union(rect(21, 41, 22, 46), rect(23, 40, 24, 46), rect(25, 41, 26, 46)),
  hands: union(ellipse(20.5, 44.5, 2.8, 2.2), ellipse(25.5, 44.5, 2.8, 2.2)),
  hairBack: ellipse(23, 18.5, 8.8, 8.8),
  head: union(ellipse(23, 19.5, 7.5, 7.8), poly([16, 21], [30, 21], [28, 26], [23, 28.5], [18, 26])),
  fringe: (x, y) => ellipse(23, 17, 8.4, 7.5)(x, y) && y < 16.5 + (Math.floor(x) % 3 === 0 ? 1 : 0),
};

/** Daisy: four light petals around a mid-tone heart. */
const daisy = (x, y) => stamp(x, y, ['.3.', '303', '.3.']).map(([px0, py0, tone]) => [px0, py0, tone === 3 ? 0 : 1]);

function fillettePortrait() {
  return toRows(paint([
    { shape: F.hairBack, tone: 1, shade: 2 },
    { shape: F.tips, tone: 1, shade: 2 },
    { shape: F.braids, tone: 1, shade: 2, pixels: px(2, [13, 22], [12, 23], [10, 26], [11, 26], [33, 22], [34, 23], [35, 26], [36, 26]) },
    { shape: F.body, tone: 2, shade: 3,
      light: { tone: 1, shape: poly([11, 38], [13, 35.5], [15, 35.5], [12.5, 40]) },
      pixels: px(3, [15, 42], [15, 43], [31, 41], [31, 42], [16, 47], [30, 47]) },
    { shape: F.bows, tone: 0, shade: 1, pixels: px(3, [9, 31], [36, 31]) },
    { shape: F.neck, tone: 0, shade: 1 },
    { shape: F.collar, tone: 0, shade: 1, pixels: px(3, [23, 33], [23, 34], [23, 35]) },
    { shape: F.stems, tone: 1, outline: false },
    // Bunch of daisies.
    { pixels: [
      ...daisy(19, 37), ...daisy(22, 36), ...daisy(25, 37),
    ] },
    { shape: F.hands, tone: 0, shade: 1, pixels: px(1, [20, 44], [25, 44]) },
    { shape: F.head, tone: 0, shade: 1 },
    { shape: F.fringe, tone: 1, shade: 2, light: { tone: 0, shape: poly([16, 13], [19, 10.5], [21, 10.5], [18, 14]) } },
    {
      pixels: [
        ...eyes(19, 26, 19),
        ...px(1, [18, 23], [28, 23]),
        ...px(1, [23, 22]),
        ...stamp(21, 25, ['3...3', '.333.']),
      ],
    },
  ]));
}

export const portraits = [{ id: 'fillette', portrait: fillettePortrait() }];
