// Lignée du Fadet (030 à 032), Flore (Arcane au stade 3). Fiche : docs/bestiaire-folklorique/fiches/030-fadet.md
// Esprit des campagnes du Poitou devenu esprit-cerf des bois. Tones: 0 glow/spots, 1 coat,
// 2 leaves/dark, 3 ink. Signature: leaf ears, glowing spots, antlers of branches.
import { capsule, ellipse, eyes, mirrorX, paint, poly, px, rect, stamp, toRows, union } from '../creature-painter.js';

const spots = (...points) => px(0, ...points);

// ---------- 030 Fadet: leaf-eared fawn spirit ----------
const D1 = {
  legs: union(capsule([[18, 37], [17.5, 44.5]], 1.3), capsule([[22, 38], [22, 44.5]], 1.3), capsule([[27, 38], [27, 44.5]], 1.3), capsule([[31, 37], [31.5, 44.5]], 1.3)),
  body: ellipse(24.5, 35, 9.5, 5.5),
  tail: poly([33, 32], [37, 30], [36, 34]),
  neck: poly([19, 33], [22, 24], [27, 24], [27, 33]),
  ears: mirrorX(poly([20, 20], [11, 15], [13, 19], [20, 23])),
  head: ellipse(24, 23, 5.5, 5),
  muzzle: ellipse(24, 26.5, 3, 2.2),
  sprout: union(capsule([[24, 18.5], [24, 15]], 0.6), poly([24, 15.5], [20, 13], [23, 16.5]), poly([24, 15.5], [28, 13], [25, 16.5])),
};

function fadetFront() {
  return toRows(paint([
    { shape: D1.legs, tone: 1, shade: 2, pixels: px(3, [17, 45], [22, 45], [27, 45], [31, 45]) },
    { shape: D1.tail, tone: 0 },
    { shape: D1.body, tone: 1, shade: 2, light: { tone: 0, shape: ellipse(24.5, 37.5, 5, 2) }, pixels: spots([19, 33], [23, 32], [28, 33], [31, 35]) },
    { shape: D1.neck, tone: 1, shade: 2 },
    { shape: D1.ears, tone: 2, light: { tone: 1, shape: union(poly([19, 20.5], [13, 16.5], [15, 19]), poly([29, 20.5], [35, 16.5], [33, 19])) } },
    { shape: D1.head, tone: 1, shade: 2 },
    { shape: D1.muzzle, tone: 0, shade: 1, pixels: px(3, [23, 27], [24, 27]) },
    { shape: D1.sprout, tone: 2, outline: false, pixels: px(1, [21, 14], [27, 14]) },
    { pixels: [...eyes(20, 26, 21), ...spots([20, 18], [28, 19])] },
  ]));
}

function fadetBack() {
  return toRows(paint([
    { shape: D1.legs, tone: 1, shade: 2 },
    { shape: D1.neck, tone: 1, shade: 2 },
    { shape: D1.body, tone: 1, shade: 2, pixels: spots([19, 33], [22, 31], [26, 32], [29, 31], [31, 34], [24, 35]) },
    { shape: D1.tail, tone: 0 },
    { shape: D1.ears, tone: 2, light: { tone: 1, shape: union(poly([19, 20.5], [13, 16.5], [15, 19]), poly([29, 20.5], [35, 16.5], [33, 19])) } },
    { shape: D1.head, tone: 1, shade: 2, pixels: spots([22, 21], [26, 22]) },
    { shape: D1.sprout, tone: 2, outline: false },
  ]));
}

// ---------- 031 Fadebois: young stag with budding antlers ----------
const D2 = {
  legs: union(capsule([[15, 34], [14, 44.5]], 1.8), capsule([[20, 35], [20, 44.5]], 1.8), capsule([[29, 35], [29, 44.5]], 1.8), capsule([[34, 34], [35, 44.5]], 1.8)),
  body: ellipse(24.5, 31, 12, 7),
  neck: poly([18, 30], [21, 19], [28, 19], [29, 30]),
  antlers: mirrorX(union(capsule([[21, 12], [18, 6], [14, 3]], 1), capsule([[18.5, 7.5], [21, 3]], 0.9), capsule([[16, 4.5], [13, 6.5]], 0.8))),
  buds: mirrorX(union(ellipse(13.5, 2.5, 1.8, 1.4), ellipse(21.5, 2.5, 1.6, 1.3), ellipse(12, 7, 1.5, 1.2))),
  ears: mirrorX(poly([19.5, 15], [10, 11], [12, 15], [19.5, 18])),
  head: ellipse(24, 17, 6, 5.5),
  muzzle: ellipse(24, 21.5, 3.4, 2.5),
};

function fadeboisFront() {
  return toRows(paint([
    { shape: D2.legs, tone: 1, shade: 2, pixels: px(3, [14, 45], [20, 45], [29, 45], [35, 45]) },
    { shape: D2.body, tone: 1, shade: 2, light: { tone: 0, shape: ellipse(24.5, 34.5, 7, 2.5) }, pixels: spots([16, 28], [20, 27], [29, 27], [33, 28], [36, 31]) },
    { shape: D2.neck, tone: 1, shade: 2, light: { tone: 0, shape: poly([22, 26], [26, 26], [25, 30], [23, 30]) } },
    { shape: D2.antlers, tone: 2, outline: true },
    { shape: D2.buds, tone: 1, outline: false, pixels: px(0, [13, 2], [34, 2]) },
    { shape: D2.ears, tone: 2, light: { tone: 1, shape: union(poly([18.5, 15], [12, 12], [14, 14.5]), poly([29.5, 15], [36, 12], [34, 14.5])) } },
    { shape: D2.head, tone: 1, shade: 2 },
    { shape: D2.muzzle, tone: 0, shade: 1, pixels: px(3, [23, 22], [24, 22]) },
    { pixels: [...eyes(20, 26, 15), ...spots([21, 12], [27, 12])] },
  ]));
}

function fadeboisBack() {
  return toRows(paint([
    { shape: D2.legs, tone: 1, shade: 2 },
    { shape: D2.neck, tone: 1, shade: 2 },
    { shape: D2.body, tone: 1, shade: 2, pixels: spots([16, 28], [20, 26], [24, 28], [28, 26], [33, 28], [24, 32], [18, 32], [30, 32]) },
    { shape: poly([35, 27], [38, 25], [37, 29]), tone: 0 },
    { shape: D2.antlers, tone: 2 },
    { shape: D2.buds, tone: 1, outline: false },
    { shape: D2.ears, tone: 2 },
    { shape: D2.head, tone: 1, shade: 2 },
  ]));
}

// ---------- 032 Fadéon: great forest spirit ----------
const D3 = {
  legs: union(capsule([[13, 33], [11.5, 45]], 2.2), capsule([[19, 34], [19, 45]], 2.2), capsule([[30, 34], [30, 45]], 2.2), capsule([[36, 33], [37.5, 45]], 2.2)),
  body: ellipse(24.5, 30, 14, 8),
  mane: poly([16, 30], [15, 24], [18, 21], [16, 16], [20, 17], [21, 13], [27, 13], [28, 17], [32, 16], [30, 21], [33, 24], [32, 30], [24, 33]),
  antlers: mirrorX(union(
    capsule([[21, 9], [17, 4], [11, 1]], 1.1), capsule([[17, 4.5], [14, 8], [9, 9]], 1), capsule([[14, 2.5], [12, 0]], 0.9),
    capsule([[11, 9], [6, 6], [2, 7]], 0.9), capsule([[19, 6], [21, 1]], 0.9),
  )),
  leaves: mirrorX(union(ellipse(10, 0.8, 2, 1.2), ellipse(3, 6.5, 2, 1.2), ellipse(8, 9.5, 1.8, 1.2), ellipse(21.5, 0.5, 1.4, 1.2))),
  ears: mirrorX(poly([19.5, 12], [11, 10], [13, 13], [19.5, 15])),
  head: ellipse(24, 14, 5.8, 5.4),
  muzzle: ellipse(24, 18.5, 3.2, 2.4),
};

function fadeonFront() {
  return toRows(paint([
    { shape: D3.legs, tone: 1, shade: 2, pixels: px(3, [11, 46], [19, 46], [30, 46], [38, 46]) },
    { shape: D3.body, tone: 1, shade: 2, light: { tone: 0, shape: ellipse(24.5, 34, 8, 2.5) }, pixels: spots([13, 27], [37, 27], [12, 31], [38, 31]) },
    // Mane of leaves and moss around the neck.
    { shape: D3.mane, tone: 2, shade: 3, light: { tone: 1, shape: union(poly([17, 24], [19, 20], [20, 28]), poly([31, 24], [29, 20], [28, 28])) }, pixels: px(0, [18, 27], [30, 27], [24, 30]) },
    { shape: D3.antlers, tone: 2 },
    { shape: D3.leaves, tone: 1, outline: false, pixels: px(0, [10, 0], [38, 0]) },
    { shape: D3.ears, tone: 2, light: { tone: 1, shape: union(poly([18.5, 12.5], [13, 11], [14.5, 12.5]), poly([29.5, 12.5], [35, 11], [33.5, 12.5])) } },
    { shape: D3.head, tone: 1, shade: 2 },
    { shape: D3.muzzle, tone: 0, shade: 1, pixels: px(3, [23, 19], [24, 19]) },
    { pixels: [...eyes(20, 26, 12), ...spots([24, 9], [21, 10], [27, 10])] },
  ]));
}

function fadeonBack() {
  return toRows(paint([
    { shape: D3.legs, tone: 1, shade: 2 },
    { shape: D3.body, tone: 1, shade: 2, pixels: spots([13, 27], [18, 25], [24, 27], [30, 25], [35, 27], [20, 31], [28, 31]) },
    { shape: poly([37, 26], [41, 23], [40, 28]), tone: 0 },
    { shape: D3.mane, tone: 2, shade: 3, light: { tone: 1, shape: union(rect(23.5, 14, 24.5, 31), poly([17, 24], [19, 20], [20, 28]), poly([31, 24], [29, 20], [28, 28])) } },
    { shape: D3.antlers, tone: 2 },
    { shape: D3.leaves, tone: 1, outline: false },
    { shape: D3.ears, tone: 2 },
    { shape: D3.head, tone: 1, shade: 2 },
  ]));
}

const FADET_ICON = [
  '.......3.3......',
  '......32323.....',
  '33.....333....33',
  '3223..31113..3223',
  '.32233111113322 3.',
  '..33311111113 3.',
  '....31301031 3..',
  '....31111113....',
  '.....310013.....',
  '......3113......',
  '...3333113333...',
  '..311101110113..',
  '..311111111113..',
  '...3133333313...',
  '...3.3.33.3.3...',
  '...3.3....3.3...',
].map((row) => row.replace(/ /g, '').slice(0, 16).padEnd(16, '.'));

const FADEBOIS_ICON = [
  '.3.3.......3.3..',
  '.3.3.3...3.3.3..',
  '..333.....333...',
  '...3.......3....',
  '33..3.333.3...33',
  '3223.31113..3223',
  '.3223111113322 3.',
  '..33313013133...',
  '....31111113....',
  '.....310013.....',
  '..33333113333...',
  '.31110111101113.',
  '.31111111111113.',
  '..3133333333133.',
  '..3.3......3.3..',
  '..3.3......3.3..',
].map((row) => row.replace(/ /g, '').slice(0, 16).padEnd(16, '.'));

const FADEON_ICON = [
  '3.3.3.....3.3.3.',
  '.3.3.3...3.3.3..',
  '..33.3...3.33...',
  '...33.333.33....',
  '33...31113...33.',
  '3223.31013.3223.',
  '.3223313133223..',
  '..33222322233...',
  '..32221001222 3.',
  '.3222233332222 3',
  '.311122222211113',
  '3111111111111113',
  '3111111111111113',
  '.31133333333113.',
  '.33.3......3.33.',
  '.33.3......3.33.',
].map((row) => row.replace(/ /g, '').slice(0, 16).padEnd(16, '.'));

export const line = [
  { id: 'faonille', front: fadetFront(), back: fadetBack(), icon: FADET_ICON },
  { id: 'cerfeuil', front: fadeboisFront(), back: fadeboisBack(), icon: FADEBOIS_ICON },
  { id: 'cervoral', front: fadeonFront(), back: fadeonBack(), icon: FADEON_ICON },
];
