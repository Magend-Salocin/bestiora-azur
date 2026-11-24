// Lignée du Poulpiquet (013 et 014), Normal. Fiche : docs/bestiaire-folklorique/fiches/013-poulpiquet.md
// Lutin breton velu, aux grandes oreilles rondes et à la longue queue. Tones: 0 face/belly,
// 1 fur, 2 nightcap/dark fur, 3 ink. Signature: floppy nightcap, round ears, bell, thin tail.
import { capsule, ellipse, eyes, mirrorX, paint, poly, px, rect, stamp, toRows, union } from '../creature-painter.js';

// ---------- 013 Poulpiquet ----------
const P1 = {
  tail: capsule([[29, 41], [35, 42], [39, 39], [39, 35], [37, 33]], 0.9),
  feet: union(ellipse(19.5, 44.5, 3, 1.5), ellipse(28.5, 44.5, 3, 1.5)),
  body: ellipse(24, 37.5, 7, 6.5),
  arms: union(capsule([[18.5, 35], [15, 38]], 1.5), capsule([[29.5, 35], [33, 33]], 1.5)),
  hands: union(ellipse(14.8, 38.6, 1.8, 1.6), ellipse(33.6, 32.4, 1.8, 1.6)),
  bell: union(poly([33, 34], [37, 34], [36.5, 37.5], [33.5, 37.5]), ellipse(35, 38, 2.4, 1)),
  ears: union(ellipse(14, 21, 5, 5.2), ellipse(34, 21, 5, 5.2)),
  head: ellipse(24, 27, 8, 6.8),
  cap: poly([16.5, 24], [31.5, 24], [30, 20], [27, 18], [22, 17.5], [16, 15], [12, 17], [13.5, 19], [17.5, 21]),
};

function poulpiquetFront() {
  return toRows(paint([
    { shape: P1.tail, tone: 1 },
    { shape: P1.feet, tone: 2, shade: 3 },
    { shape: P1.body, tone: 1, shade: 2, light: { tone: 0, shape: ellipse(24, 39, 4.2, 4) } },
    { shape: P1.arms, tone: 1, shade: 2 },
    { shape: P1.hands, tone: 0, shade: 1 },
    { shape: P1.bell, tone: 0, shade: 1, pixels: px(3, [35, 39], [35, 33]) },
    { shape: P1.ears, tone: 1, shade: 2, light: { tone: 0, shape: union(ellipse(14, 21.5, 2.8, 3.2), ellipse(34, 21.5, 2.8, 3.2)) } },
    { shape: P1.head, tone: 1, shade: 2, light: { tone: 0, shape: ellipse(24, 29.5, 5.5, 3.8) } },
    { shape: P1.cap, tone: 2, light: { tone: 1, shape: poly([18, 21], [23, 19], [22, 21]) }, pixels: [...stamp(16, 23, ['3333333333333333']), ...px(0, [12, 16], [13, 16]), ...px(3, [11, 16], [12, 15])] },
    { pixels: [...eyes(20, 26, 25), ...px(3, [23, 28], [24, 28]), ...stamp(21, 30, ['3.....3', '.30003.', '..333..'])] },
  ]));
}

function poulpiquetBack() {
  return toRows(paint([
    { shape: P1.feet, tone: 2, shade: 3 },
    { shape: P1.arms, tone: 1, shade: 2 },
    { shape: P1.hands, tone: 0, shade: 1 },
    { shape: P1.body, tone: 1, shade: 2, pixels: px(2, [21, 36], [26, 38], [23, 41]) },
    { shape: capsule([[24, 41], [30, 43], [36, 41], [38, 36], [36, 33]], 0.9), tone: 1 },
    { shape: P1.ears, tone: 1, shade: 2 },
    { shape: P1.head, tone: 1, shade: 2, pixels: px(2, [20, 27], [24, 26], [28, 28], [22, 31], [26, 31]) },
    { shape: union(P1.cap, ellipse(24, 23, 8, 3.5)), tone: 2, light: { tone: 1, shape: poly([18, 21], [23, 19], [22, 21]) } },
  ]));
}

// ---------- 014 Poulpifol ----------
const P2 = {
  tail: capsule([[31, 40], [38, 41], [43, 37], [43, 31], [40, 28]], 1.2),
  feet: union(ellipse(18.5, 44.6, 3.8, 1.7), ellipse(29.5, 44.6, 3.8, 1.7)),
  legs: union(capsule([[20, 38], [19, 43]], 2.2), capsule([[28, 38], [29, 43]], 2.2)),
  body: poly([16, 24], [32, 24], [34, 30], [31, 35], [33, 40], [28, 41], [24, 39.5], [20, 41], [15, 40], [17, 35], [14, 30]),
  belt: rect(16, 33, 32, 35),
  // Big hand bell, held out and rung.
  bell: union(ellipse(41.5, 29, 3.3, 3.2), poly([37.5, 30], [45.5, 30], [46.5, 35], [36.5, 35])),
  arms: union(capsule([[16, 26], [11, 30], [9, 34]], 2), capsule([[32, 26], [37, 26], [41, 24]], 2)),
  hands: union(ellipse(8.6, 35.4, 2.4, 2.2), ellipse(41.5, 24, 2.4, 2.2)),
  ears: union(ellipse(12.5, 13, 5.5, 5.8), ellipse(35.5, 13, 5.5, 5.8)),
  head: ellipse(24, 18.5, 8.5, 7),
  tuft: poly([17, 13], [18, 7], [21, 10], [23, 5], [25.5, 10], [28, 6], [29, 11], [31, 13]),
};

function poulpifolFront() {
  return toRows(paint([
    { shape: P2.tail, tone: 1, pixels: px(2, [42, 30], [41, 29], [43, 32]) },
    { shape: P2.legs, tone: 1, shade: 2 },
    { shape: P2.feet, tone: 2, shade: 3, pixels: px(0, [15, 45], [17, 46], [31, 46], [33, 45]) },
    { shape: P2.body, tone: 1, shade: 2, light: { tone: 0, shape: ellipse(24, 29, 5, 4.5) }, pixels: px(2, [16, 29], [32, 29], [18, 38], [30, 38]) },
    { shape: P2.belt, tone: 2, outline: false, pixels: [...stamp(16, 33, ['3333333333333333', '3333333333333333']), ...stamp(22, 32, ['3333', '3003', '3333'])] },
    { shape: P2.arms, tone: 1, shade: 2 },
    { shape: P2.bell, tone: 0, shade: 1, light: { tone: 1, shape: rect(35, 25, 46, 26) },
      pixels: [...px(3, [41, 36], [42, 36], [41, 37], [42, 37]), ...px(3, [46, 26], [47, 25], [47, 30], [36, 27], [35, 26]), ...px(1, [39, 28], [39, 29])] },
    { shape: P2.hands, tone: 1, shade: 2, pixels: px(0, [7, 36], [9, 37]) },
    { shape: P2.ears, tone: 1, shade: 2, light: { tone: 0, shape: union(ellipse(12.5, 13.5, 3.2, 3.6), ellipse(35.5, 13.5, 3.2, 3.6)) }, pixels: px(3, [10, 9], [38, 9]) },
    { shape: P2.tuft, tone: 2, light: { tone: 1, shape: poly([21, 10], [23, 6], [24, 10]) } },
    { shape: P2.head, tone: 1, shade: 2, light: { tone: 0, shape: ellipse(24, 21, 6, 4) } },
    { pixels: [...eyes(19, 27, 16), ...px(3, [18, 15], [19, 14], [20, 15], [27, 15], [28, 14], [29, 15]), ...px(3, [23, 19], [24, 19]), ...stamp(19, 21, ['3.......3', '.3303033.', '..33333..'])] },
  ]));
}

function poulpifolBack() {
  return toRows(paint([
    { shape: P2.legs, tone: 1, shade: 2 },
    { shape: P2.feet, tone: 2, shade: 3 },
    { shape: P2.arms, tone: 1, shade: 2 },
    { shape: P2.hands, tone: 1, shade: 2 },
    { shape: P2.bell, tone: 0, shade: 1, pixels: px(3, [41, 36], [42, 36]) },
    { shape: P2.body, tone: 1, shade: 2, pixels: px(2, [19, 27], [24, 26], [29, 27], [21, 31], [27, 31], [19, 38], [29, 38]) },
    { shape: P2.belt, tone: 2, outline: false, pixels: stamp(16, 33, ['3333333333333333', '3333333333333333']) },
    { shape: capsule([[24, 39], [31, 42], [38, 41], [42, 36], [41, 30]], 1.2), tone: 1 },
    { shape: P2.ears, tone: 1, shade: 2 },
    { shape: P2.tuft, tone: 2 },
    { shape: P2.head, tone: 1, shade: 2, pixels: px(2, [19, 16], [23, 15], [27, 16], [21, 20], [26, 21], [24, 23]) },
  ]));
}

const POULPIQUET_ICON = [
  '................',
  '..33.........33.',
  '.3003..333..3003',
  '.3003.32223.3003',
  '..3333222222333.',
  '...33333333333..',
  '...31303330313..',
  '...31303330313..',
  '...31000110013..',
  '....310333013...',
  '.....3311133.3..',
  '....311000113.3.',
  '....310000013.3.',
  '.....3111113.3..',
  '....323..323....',
  '....333..333....',
];

const POULPIFOL_ICON = [
  '......3.3.3.....',
  '.33..3232323.33.',
  '3003.32222223003',
  '3003.311111113003',
  '.3333111111133 3.',
  '...313033303113.',
  '...311113311113.',
  '...310303030013.',
  '....3133333133..',
  '..33311000113 33',
  '.31113333333 3113',
  '.3113100030 13113',
  '..3331110001133.',
  '....311333113...',
  '...3223...3223..',
  '...3333...3333..',
].map((row) => row.replace(/ /g, '').slice(0, 16).padEnd(16, '.'));

export const line = [
  { id: 'poulpiquet', front: poulpiquetFront(), back: poulpiquetBack(), icon: POULPIQUET_ICON },
  { id: 'poulpifol', front: poulpifolFront(), back: poulpifolBack(), icon: POULPIFOL_ICON },
];
