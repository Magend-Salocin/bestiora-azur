import { capsule, ellipse, minus, paint, poly, px, rect, stamp, toRows, union } from '../creature-painter.js';

// Brune, Championne Feu de Forge-Ardente (Occitanie): a broad smith of the Catalan forges,
// beret, thick braid, linen shirt with rolled sleeves, dark leather apron over a taillole
// (flannel sash), sledgehammer resting on her shoulder. Docs: docs/Pnj/PNJ_V2.md, section 3.11.

const B = {
  body: poly([12, 29], [30, 29], [38, 31], [43.5, 37], [45.5, 48], [1.5, 48], [3.5, 37], [7, 31]),
  sash: rect(0, 42, 48, 45.5),
  apron: poly([14.5, 31], [28.5, 31], [31.5, 48], [11.5, 48]),
  straps: union(capsule([[15.5, 31.5], [17.5, 25.5]], 0.9), capsule([[27.5, 31.5], [25.5, 25.5]], 0.9)),
  neck: rect(17, 22, 26, 30),
  braid: capsule([[14, 24], [11, 30], [10.5, 36], [11.5, 40]], 2.4),
  hair: union(ellipse(21.5, 15.5, 8.6, 8.5), poly([13, 15], [30, 15], [30.5, 23], [27.5, 21], [15.5, 21], [12.5, 23])),
  head: union(ellipse(21.5, 17, 7, 7.5), poly([15, 18], [28, 18], [26.5, 23.5], [21.5, 26], [16.5, 23.5])),
  beret: union(ellipse(20, 9.3, 10.2, 3.6), ellipse(21.5, 8, 7.5, 3.2)),
  sleeve: capsule([[35.5, 31], [39, 39.5]], 4.2),
  forearm: capsule([[40.5, 45.5], [35.5, 39.5]], 2.7),
  fist: ellipse(34.6, 38.2, 3.2, 3),
  handle: capsule([[34.5, 40], [38.9, 17]], 1.2),
  hammerHead: poly([33, 10], [44.5, 6.5], [46.5, 13], [35, 16.5]),
};

/** 2 × 3 eye with its glint, left column x, rows 17 to 19. */
const eyePixels = (x) => [...px(3, [x, 17], [x, 18], [x + 1, 18], [x, 19], [x + 1, 19]), ...px(0, [x + 1, 17])];

function brunePortrait() {
  return toRows(paint([
    { shape: B.braid, tone: 2, shade: 3,
      pixels: [...px(3, [11, 28], [12, 28], [10, 32], [11, 32], [10, 36], [11, 36]), ...px(1, [13, 26], [12, 30], [11, 34], [11, 38])] },
    // Grey linen shirt, so that the bare arms stand out.
    { shape: minus(B.body, B.braid), tone: 1, shade: 2,
      light: { tone: 0, shape: poly([5, 36], [8, 31.5], [10, 31.5], [6.5, 37]) },
      pixels: px(2, [7, 35], [8, 36], [6, 39], [33, 41], [42, 39], [43, 40], [5, 40]) },
    { shape: (x, y) => B.body(x, y) && B.sash(x, y), tone: 2, shade: 3,
      pixels: [...px(3, [2, 43], [3, 43], [4, 43], [5, 43], [6, 43], [7, 43], [8, 43], [9, 43], [10, 43], [11, 43], [32, 43], [33, 43], [34, 43], [35, 43], [36, 43], [37, 43], [38, 43], [39, 43], [40, 43], [41, 43], [42, 43], [43, 43], [44, 43])] },
    { shape: B.apron, tone: 2, shade: 3,
      light: { tone: 1, shape: rect(15, 31, 16, 40) },
      // Riveted pocket and scorch marks.
      pixels: [...stamp(17, 37, ['33333333', '3......3', '3......3']), ...px(1, [18, 33], [26, 34], [24, 45]), ...px(3, [20, 40], [22, 39])] },
    { shape: B.straps, tone: 2, shade: 3 },
    { shape: B.neck, tone: 0, shade: 1, pixels: px(1, [20, 26], [21, 26], [22, 26]) },
    { shape: B.hammerHead, tone: 2, shade: 3,
      light: { tone: 1, shape: poly([33, 10], [44.5, 6.5], [44.8, 7.6], [33.3, 11.1]) },
      pixels: px(3, [38, 9], [38, 10], [39, 13], [39, 14]) },
    { shape: B.sleeve, tone: 1, shade: 2, light: { tone: 0, shape: poly([32, 31], [35, 29], [36, 30], [33, 33]) } },
    { shape: B.forearm, tone: 0, shade: 1,
      // Rolled cuff at the elbow.
      pixels: px(1, [38, 42], [39, 43]) },
    { shape: B.handle, tone: 1, shade: 2 },
    { shape: B.fist, tone: 0, shade: 1, pixels: px(1, [33, 37], [34, 37], [33, 39], [34, 39]) },
    { shape: B.hair, tone: 2, shade: 3,
      light: { tone: 1, shape: poly([14, 13], [16, 11], [17, 12], [15, 16]) },
      pixels: [...px(3, [15, 18], [28, 18], [14, 21], [29, 21]), ...px(1, [29, 14], [29, 15], [30, 17], [30, 18])] },
    { shape: B.head, tone: 0, shade: 1 },
    { shape: B.beret, tone: 2, shade: 3,
      light: { tone: 1, shape: poly([12, 8.5], [16, 6], [18, 6], [14, 9]) },
      // Little stalk on top (the cabilhou).
      pixels: px(3, [21, 3], [21, 4]) },
    {
      pixels: [
        // Confident look: one brow raised, lashes, soot on the cheek, half smile.
        ...px(3, [16, 15], [17, 15], [18, 15], [25, 14], [26, 14], [27, 14], [16, 17], [27, 17]),
        ...eyePixels(17), ...eyePixels(25),
        ...px(1, [21, 19], [21, 20], [22, 21]),
        ...px(1, [16, 21], [17, 22], [26, 21]),
        ...stamp(19, 23, ['3...33', '.3333.']),
      ],
    },
  ]));
}

export const portraits = [{ id: 'brune', portrait: brunePortrait() }];
