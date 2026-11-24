// Lignée du Carcolh (018 et 019), Insecte et Terre. Fiche : docs/bestiaire-folklorique/fiches/018-carcolh.md
// Lou Carcolh, escargot géant des Landes aux tentacules velus. Tones: 0 eyes/slime glint,
// 1 foot, 2 shell, 3 ink. Signature: spiral shell, eye stalks, hairy tentacles.
import { capsule, ellipse, eyes, mirrorX, paint, poly, px, rect, stamp, toRows, union } from '../creature-painter.js';

/** Spiral seam drawn as ink pixels inside a shell centred on (cx, cy). */
function spiral(cx, cy, radius) {
  const pixels = [];
  for (let t = 0; t < 4.2 * Math.PI; t += 0.08) {
    const r = radius * (1 - t / (4.6 * Math.PI));
    pixels.push([Math.round(cx + Math.cos(t) * r), Math.round(cy + Math.sin(t) * r), 3]);
  }
  return pixels;
}

// ---------- 018 Carcolh ----------
const K1 = {
  foot: poly([9, 44.5], [12, 39], [30, 38], [40, 36], [43, 40], [41, 44.5]),
  shell: ellipse(22, 31, 10.5, 9.5),
  neck: poly([31, 39], [33, 31], [38, 28], [41, 31], [41, 39]),
  stalks: union(capsule([[35, 29], [33, 22]], 1), capsule([[39, 29], [41, 22]], 1)),
  eyeballs: union(ellipse(33, 21, 2.2, 2.2), ellipse(41, 21, 2.2, 2.2)),
};

function carcolhFront() {
  return toRows(paint([
    { shape: K1.foot, tone: 1, shade: 2, light: { tone: 0, shape: rect(14, 40, 28, 41) } },
    { shape: K1.stalks, tone: 1 },
    { shape: K1.neck, tone: 1, shade: 2, pixels: [...stamp(35, 33, ['3...3', '.333.']), ...px(2, [34, 36], [37, 37], [40, 36])] },
    { shape: K1.eyeballs, tone: 0, pixels: px(3, [33, 21], [33, 22], [41, 21], [41, 22]) },
    { shape: K1.shell, tone: 2, shade: 3, light: { tone: 1, shape: poly([13, 27], [17, 23], [19, 24], [15, 29]) }, pixels: spiral(22, 31, 8.5) },
  ]));
}

function carcolhBack() {
  return toRows(paint([
    { shape: K1.foot, tone: 1, shade: 2 },
    { shape: union(K1.stalks, K1.eyeballs), tone: 1 },
    { shape: ellipse(24, 30, 11.5, 10.5), tone: 2, shade: 3, light: { tone: 1, shape: poly([15, 26], [19, 22], [21, 23], [17, 28]) }, pixels: spiral(24, 30, 9.5) },
  ]));
}

// ---------- 019 Carcolosse ----------
const K2 = {
  foot: poly([2, 46], [5, 39], [26, 37], [37, 33], [46, 36], [46.5, 46]),
  tentacles: union(capsule([[38, 26], [44, 22], [46, 16]], 1.2), capsule([[35, 26], [33, 20], [35, 14]], 1.2), capsule([[42, 28], [47, 27]], 1)),
  head: poly([30, 41], [32, 28], [38, 24], [45, 27], [46.5, 36], [44, 42]),
  shell: ellipse(18, 25, 16, 15),
  spikes: union(poly([7, 15], [3, 7], [10, 11]), poly([15, 10.5], [14, 2.5], [19, 9.5]), poly([25, 11], [28, 3.5], [29, 13]), poly([3, 27], [-1, 23], [3, 22])),
};

function carcolosseFront() {
  return toRows(paint([
    { shape: K2.foot, tone: 1, shade: 2, light: { tone: 0, shape: rect(6, 40, 30, 41) }, pixels: px(2, [10, 43], [16, 44], [22, 43], [28, 44]) },
    { shape: K2.tentacles, tone: 1, pixels: px(3, [45, 19], [44, 21], [34, 17], [35, 15], [46, 27]) },
    { shape: K2.head, tone: 1, shade: 2,
      pixels: [...eyes(35, 41, 29), ...px(1, [34, 28], [42, 28]),
        // Wide maw with teeth.
        ...stamp(33, 35, ['33333333333', '30303030303', '.333333333.'])] },
    { shape: K2.spikes, tone: 0, shade: 1 },
    { shape: K2.shell, tone: 2, shade: 3, light: { tone: 1, shape: poly([5, 20], [11, 13], [13, 14], [7, 23]) }, pixels: spiral(18, 25, 13) },
  ]));
}

function carcolosseBack() {
  return toRows(paint([
    { shape: K2.foot, tone: 1, shade: 2 },
    { shape: union(K2.tentacles, ellipse(40, 30, 5, 4)), tone: 1, shade: 2 },
    { shape: union(K2.spikes, poly([33, 14], [38, 8], [36, 16])), tone: 0, shade: 1 },
    { shape: ellipse(22, 27, 17, 16), tone: 2, shade: 3, light: { tone: 1, shape: poly([8, 22], [14, 14], [16, 15], [10, 25]) }, pixels: spiral(22, 27, 14) },
  ]));
}

const CARCOLH_ICON = [
  '................',
  '..........3..3..',
  '.........303303.',
  '..........3..3..',
  '....3333..3..3..',
  '...322223.3113..',
  '..32233322311113',
  '..32321323311313',
  '..32322323311113',
  '..3232332331333.',
  '..3223222231113.',
  '...3322223311 3.',
  '.3311333331111 3',
  '3100000000000 13',
  '.33333333333333.',
  '................',
].map((row) => row.replace(/ /g, '').slice(0, 16).padEnd(16, '.'));

const CARCOLOSSE_ICON = [
  '..3...3......3..',
  '.303.303..3.313.',
  '.33333333.313.3.',
  '3222222223.313..',
  '322333332233113.',
  '3232111322311113',
  '3232323322313313',
  '3232333232311113',
  '3232222232303033',
  '3223333322333333',
  '.3222222233111 3',
  '.33333333311113.',
  '3111111111111113',
  '3000000000000003',
  '.33333333333333.',
  '................',
].map((row) => row.replace(/ /g, '').slice(0, 16).padEnd(16, '.'));

export const line = [
  { id: 'carcolh', front: carcolhFront(), back: carcolhBack(), icon: CARCOLH_ICON },
  { id: 'carcolosse', front: carcolosseFront(), back: carcolosseBack(), icon: CARCOLOSSE_ICON },
];
