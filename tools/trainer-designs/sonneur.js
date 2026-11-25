import { capsule, ellipse, paint, poly, px, rect, stamp, toRows, union } from '../creature-painter.js';
import { hline } from './face.js';

// Sonneur (Bois Murmurant, pays gallo): a young bombarde player in the round felt hat with velvet
// ribbons, white shirt and dark embroidered waistcoat, eyes shut on a long note.
// Docs: docs/Pnj/PNJ_V2.md, section 3.3.

const S = {
  ribbons: union(capsule([[33, 12], [35.5, 18], [37, 26]], 0.9), capsule([[31, 13], [32.5, 19], [33.5, 28]], 0.9)),
  reed: rect(22.5, 22, 24, 28),
  body: poly([14.5, 31.5], [31.5, 31.5], [37, 34], [40, 48], [6, 48], [9, 34]),
  shirt: poly([18.5, 31], [27.5, 31], [26, 48], [20, 48]),
  collar: union(poly([17.5, 30], [23, 31.5], [20, 34.5]), poly([28.5, 30], [23, 31.5], [26, 34.5])),
  neck: rect(20, 25, 26, 32),
  // Bombarde: conical wooden pipe held straight down from the lips to a flared bell.
  bombarde: union(capsule([[23, 23.5], [23, 34]], 1.1), capsule([[23, 33], [23, 39]], 1.7)),
  bell: ellipse(23, 41, 3.4, 2),
  hands: union(ellipse(22.6, 29.6, 2.7, 2.2), ellipse(23.4, 35.4, 2.7, 2.2)),
  sleeves: union(capsule([[10.5, 42], [16, 35], [20.5, 30.5]], 2.8), capsule([[35.5, 43], [30, 38], [26, 35.8]], 2.8)),
  ears: union(ellipse(15.6, 18.5, 1.8, 2.4), ellipse(30.4, 18.5, 1.8, 2.4)),
  head: union(ellipse(23, 17.5, 7.2, 7.6), poly([16, 19], [30, 19], [28.5, 24], [23, 26.5], [17.5, 24])),
  cheeks: union(ellipse(19.5, 22, 2.2, 1.8), ellipse(26.5, 22, 2.2, 1.8)),
  hair: union(poly([15.5, 12.5], [16.5, 17.5], [18.5, 13]), poly([30.5, 12.5], [29.5, 17.5], [27.5, 13])),
  crown: poly([17, 12], [17.5, 7], [19, 6], [27, 6], [28.5, 7], [29, 12]),
  brim: ellipse(23, 12.2, 13.2, 2.5),
};

function sonneurPortrait() {
  return toRows(paint([
    // Velvet ribbons falling from the hat, down to the shoulder.
    { shape: S.ribbons, tone: 3, outline: false },
    { shape: S.body, tone: 2, shade: 3,
      light: { tone: 1, shape: poly([9.5, 36], [12, 33], [14, 33], [11, 39]) },
      // Embroidered bands along the waistcoat edges.
      pixels: [...px(0, [17, 35], [17, 38], [17, 41], [17, 44], [17, 47], [29, 35], [29, 38], [29, 41], [29, 44], [29, 47]),
        ...px(1, [16, 36], [16, 39], [16, 42], [16, 45], [30, 36], [30, 39], [30, 42], [30, 45])] },
    { shape: S.shirt, tone: 0, shade: 1, pixels: px(3, [23, 36], [23, 40], [23, 44]) },
    { shape: S.neck, tone: 0, shade: 1 },
    { shape: S.collar, tone: 0, shade: 1 },
    { shape: S.sleeves, tone: 0, shade: 1 },
    { shape: S.bombarde, tone: 2, light: { tone: 1, shape: rect(22, 23, 23, 40) }, pixels: px(3, [22, 32], [23, 32], [22, 38], [23, 38], [24, 38]) },
    { shape: S.bell, tone: 2, shade: 3, light: { tone: 1, shape: rect(20, 40, 23, 41) } },
    { shape: S.hands, tone: 0, shade: 1, pixels: px(1, [21, 30], [22, 30], [23, 30], [22, 36], [23, 36], [24, 36]) },
    { shape: S.ears, tone: 0, shade: 1 },
    { shape: S.head, tone: 0, shade: 1 },
    { shape: S.cheeks, tone: 0, outline: false, pixels: px(1, [18, 23], [21, 23], [25, 23], [28, 23]) },
    { shape: S.hair, tone: 2, shade: 3 },
    { shape: S.reed, tone: 2, outline: false, pixels: px(3, [22, 23], [24, 23], [22, 24], [24, 24]) },
    { shape: S.brim, tone: 2, shade: 3, light: { tone: 1, shape: rect(10, 10.5, 18, 11.5) } },
    { shape: S.crown, tone: 2, shade: 3, light: { tone: 1, shape: poly([18.5, 10], [19, 7.5], [20.5, 7], [20, 10]) },
      // Velvet band with its silver buckle.
      pixels: [...hline(3, 17, 28, 10), ...hline(3, 17, 28, 11), ...stamp(21, 9, ['3333', '3003', '3333'])] },
    {
      pixels: [
        // Eyes shut on the note, brows lifted, lips on the reed.
        ...hline(3, 18, 20, 15), ...hline(3, 26, 28, 15),
        ...stamp(18, 17, ['3..3', '.33.']), ...stamp(25, 17, ['3..3', '.33.']),
        ...px(1, [23, 19], [23, 20]),
      ],
    },
  ]));
}

export const portraits = [{ id: 'sonneur', portrait: sonneurPortrait() }];
