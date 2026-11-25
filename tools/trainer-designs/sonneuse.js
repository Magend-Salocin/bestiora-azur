import { capsule, ellipse, paint, poly, px, rect, stamp, toRows, union } from '../creature-painter.js';
import { eye, hline } from './face.js';

// Sonneuse (Bois Murmurant, pays gallo): a young biniou player in a small white lace coiffe,
// embroidered waistcoat, the velvet bag under her arm, a drone rising over her shoulder and the
// blowpipe at her lips. Docs: docs/Pnj/PNJ_V2.md, section 3.3.

const N = {
  drone: union(capsule([[10, 31], [6, 13]], 1.1), ellipse(5.7, 11.5, 2.2, 1.6)),
  body: poly([15, 31.5], [31, 31.5], [36.5, 34], [39.5, 48], [6.5, 48], [9.5, 34]),
  shirt: poly([19, 31], [27, 31], [26, 48], [20, 48]),
  collar: union(poly([18, 30], [23, 31.5], [20.5, 34.5]), poly([28, 30], [23, 31.5], [25.5, 34.5])),
  neck: rect(20, 25, 26, 32),
  bag: ellipse(11.5, 37.5, 7, 5.5),
  blowpipe: capsule([[15, 33], [21.5, 24.5]], 1),
  chanter: capsule([[16, 41], [18.5, 48]], 1.2),
  sleeve: capsule([[13.5, 33], [15.5, 38.5]], 3),
  hand: ellipse(16.5, 41.8, 2.5, 2.2),
  hairBack: ellipse(23, 16.5, 8.4, 8.6),
  head: union(ellipse(23, 17.5, 7.2, 7.6), poly([16, 19], [30, 19], [28.5, 24], [23, 26.5], [17.5, 24])),
  cheeks: union(ellipse(19.5, 22, 2.2, 1.8), ellipse(26.5, 22, 2.2, 1.8)),
  hair: (x, y) => ellipse(23, 16, 8.2, 8)(x, y) && y < 14.5 - (Math.abs(x - 23) < 1 ? 1.5 : 0),
  // Small lace coiffe on the crown.
  coiffe: union(ellipse(23, 8.5, 6.5, 4), rect(16.5, 8.5, 29.5, 11)),
};

function sonneusePortrait() {
  return toRows(paint([
    { shape: N.drone, tone: 2, light: { tone: 1, shape: rect(5, 10, 6.5, 30) }, pixels: px(3, [7, 18], [8, 18], [8, 24], [9, 24]) },
    { shape: N.hairBack, tone: 2, shade: 3 },
    { shape: N.body, tone: 2, shade: 3,
      light: { tone: 1, shape: poly([31, 34], [33, 33.5], [35, 35], [33, 38]) },
      // Embroidered bands along the waistcoat edges.
      pixels: [...px(0, [18, 36], [18, 39], [18, 42], [18, 45], [28, 36], [28, 39], [28, 42], [28, 45]),
        ...px(1, [17, 37], [17, 40], [17, 43], [29, 37], [29, 40], [29, 43])] },
    { shape: N.shirt, tone: 0, shade: 1 },
    { shape: N.neck, tone: 0, shade: 1 },
    { shape: N.collar, tone: 0, shade: 1 },
    // Velvet bag with its fringe.
    { shape: N.bag, tone: 1, shade: 2, light: { tone: 0, shape: poly([6, 36], [8, 33.5], [10, 33], [7, 37.5]) },
      pixels: px(2, [6, 42], [8, 43], [10, 43], [12, 43], [14, 43], [16, 42], [9, 38], [12, 39], [14, 37]) },
    { shape: N.blowpipe, tone: 2, light: { tone: 1, shape: poly([14, 32], [20.5, 24], [21, 24.5], [14.5, 32.5]) } },
    { shape: N.chanter, tone: 2, pixels: px(3, [17, 45], [18, 45]) },
    { shape: N.sleeve, tone: 0, shade: 1 },
    { shape: N.hand, tone: 0, shade: 1, pixels: px(1, [16, 42], [17, 42]) },
    { shape: N.head, tone: 0, shade: 1 },
    { shape: N.cheeks, tone: 0, outline: false, pixels: px(1, [18, 23], [25, 23], [28, 23]) },
    { shape: N.hair, tone: 2, shade: 3, light: { tone: 1, shape: poly([17, 13], [19, 11.5], [20, 12], [18, 14]) } },
    { shape: N.coiffe, tone: 0, shade: 1,
      // Lace edge along the brim.
      pixels: [...px(1, [20, 7], [23, 6], [26, 7]), ...px(3, [17, 11], [19, 11], [21, 11], [23, 11], [25, 11], [27, 11], [29, 11]), ...px(1, [18, 10], [22, 10], [24, 10], [28, 10])] },
    {
      pixels: [
        // Eyes on the side, toward the dancers; lips on the blowpipe.
        ...hline(3, 18, 20, 15), ...hline(3, 25, 27, 15),
        ...eye(18, 17), ...eye(25, 17),
        ...px(0, [18, 17], [25, 17]), ...px(3, [19, 17], [26, 17]),
        ...px(1, [23, 19], [23, 20]),
        ...px(3, [21, 23], [22, 23], [21, 24]),
      ],
    },
  ]));
}

export const portraits = [{ id: 'sonneuse', portrait: sonneusePortrait() }];
