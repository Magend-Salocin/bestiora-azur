import { capsule, ellipse, mirrorX, paint, poly, px, rect, stamp, toRows, union } from '../creature-painter.js';

// Tarasque line (Provence): amphibious turtle-dragon. Tones: 0 belly/muzzle/spikes, 1 skin,
// 2 shell, 3 ink. Signature: domed shell with pale spikes, short horns, round muzzle, spiked tail.
const eyes = (lx, rx, y) => [
  ...px(3, [lx, y], [lx + 1, y], [lx, y + 1], [lx + 1, y + 1], [lx, y + 2], [lx + 1, y + 2]),
  ...px(3, [rx, y], [rx + 1, y], [rx, y + 1], [rx + 1, y + 1], [rx, y + 2], [rx + 1, y + 2]),
  ...px(0, [lx + 1, y], [rx + 1, y]),
];

/** Shell plates: a light rim and hexagon-like seams. */
const shellSeams = (cx, cy, rx) => px(3, ...Array.from({ length: 5 }, (_, i) => [Math.round(cx - rx * 0.6 + i * rx * 0.3), cy]));

// ---------- 007 Tarasquin ----------
const T1 = {
  tail: capsule([[33, 41], [39, 40], [42, 36]], 2),
  tailSpikes: union(poly([38, 38.5], [39.5, 35.5], [40.5, 38.5]), poly([41, 35.5], [43.5, 33], [43, 36.5])),
  shell: ellipse(24, 32, 13.5, 9.5),
  spikes: union(poly([14, 26], [14.5, 20], [18, 24]), poly([21.5, 24], [24, 17], [26.5, 24]), poly([30, 24], [33.5, 20], [34, 26])),
  legs: union(ellipse(14.5, 42, 4, 3.4), ellipse(33.5, 42, 4, 3.4)),
  head: ellipse(24, 35.5, 7.5, 6),
  muzzle: ellipse(24, 38.6, 4.8, 2.6),
  horns: mirrorX(poly([19, 31], [17, 27], [21, 30])),
};

function tarasquinFront() {
  return toRows(paint([
    { shape: T1.tail, tone: 1, shade: 2 },
    { shape: T1.tailSpikes, tone: 0 },
    { shape: T1.spikes, tone: 0, shade: 1 },
    { shape: T1.shell, tone: 2, shade: 3, light: { tone: 1, shape: poly([12, 31], [17, 26], [19, 27], [14, 33]) },
      pixels: [...px(3, [16, 30], [17, 29], [31, 30], [30, 29], [13, 35], [34, 35]), ...px(1, [33, 28], [35, 31])] },
    { shape: T1.legs, tone: 1, shade: 2, pixels: px(0, [12, 44], [14, 44], [16, 44], [32, 44], [34, 44], [36, 44]) },
    { shape: T1.horns, tone: 0, shade: 1 },
    { shape: T1.head, tone: 1, shade: 2 },
    { shape: T1.muzzle, tone: 0, shade: 1, pixels: px(3, [22, 38], [26, 38]) },
    {
      pixels: [
        ...eyes(20, 26, 32),
        ...px(3, [21, 40], [22, 41], [23, 41], [24, 41], [25, 41], [26, 41], [27, 40]),
      ],
    },
  ]));
}

function tarasquinBack() {
  return toRows(paint([
    { shape: T1.legs, tone: 1, shade: 2 },
    { shape: union(ellipse(24, 28, 5.5, 4.5), T1.horns), tone: 1, shade: 2 },
    { shape: capsule([[24, 40], [28, 43], [34, 44]], 2), tone: 1, shade: 2 },
    { shape: poly([28, 42], [29.5, 39.5], [31, 42.5]), tone: 0 },
    { shape: ellipse(24, 35, 13.5, 9.5), tone: 2, shade: 3, light: { tone: 1, shape: union(ellipse(24, 35, 6, 4.5), poly([12, 33], [16, 28], [18, 29], [14, 35])) },
      pixels: [...px(3, [18, 35], [30, 35], [24, 31], [24, 39], [20, 30], [28, 30]), ...stamp(19, 33, ['3.........3'])] },
    { shape: union(poly([16, 30], [17, 25], [20, 29]), poly([22, 28], [24, 22.5], [26, 28]), poly([28, 29], [31, 25], [32, 30])), tone: 0, shade: 1 },
  ]));
}

// ---------- 008 Taraskor ----------
const T2 = {
  tail: capsule([[34, 40], [41, 39.5], [44.5, 34], [44.5, 29]], 2.4),
  tailSpikes: union(poly([39, 38], [41, 34.5], [42, 38]), poly([43, 33], [46.5, 30.5], [46, 34.5]), poly([43, 29.5], [44.5, 25.5], [46, 29.5])),
  shell: ellipse(24, 29, 17, 11),
  spikes: union(poly([10, 25], [10.5, 18.5], [14, 23]), poly([16, 20.5], [18, 13.5], [20.5, 19.5]), poly([22, 19], [24, 11.5], [26, 19]), poly([27.5, 19.5], [30, 13.5], [32, 20.5]), poly([34, 23], [37.5, 18.5], [38, 25])),
  legs: union(capsule([[14, 36], [12, 42]], 4), capsule([[34, 36], [36, 42]], 4)),
  head: ellipse(24, 30, 9.5, 7.5),
  jaw: poly([16.5, 33], [31.5, 33], [29.5, 39.5], [18.5, 39.5]),
  horns: mirrorX(poly([17.5, 25], [13, 18.5], [15, 18], [20, 23.5])),
};

function taraskorFront() {
  return toRows(paint([
    { shape: T2.tail, tone: 1, shade: 2 },
    { shape: T2.tailSpikes, tone: 0, shade: 1 },
    { shape: T2.spikes, tone: 0, shade: 1 },
    { shape: T2.shell, tone: 2, shade: 3, light: { tone: 1, shape: poly([8, 27], [13, 21], [15, 22], [10, 29]) },
      pixels: px(3, [11, 30], [12, 29], [13, 28], [36, 30], [35, 29], [34, 28], [9, 33], [39, 33], [15, 24], [33, 24]) },
    { shape: T2.legs, tone: 1, shade: 2, pixels: px(0, [9, 44], [11, 45], [13, 45], [35, 45], [37, 45], [39, 44]) },
    { shape: T2.horns, tone: 0, shade: 1 },
    { shape: T2.head, tone: 1, shade: 2 },
    { shape: T2.jaw, tone: 0, shade: 1 },
    {
      pixels: [
        ...eyes(19, 27, 27),
        ...px(3, [18, 26], [19, 26], [20, 27], [29, 26], [28, 26], [27, 27]),
        ...px(3, [22, 32], [26, 32]),
        // Open mouth with fangs.
        ...stamp(19, 34, ['3333333333', '3033333303', '.33333333.']),
      ],
    },
  ]));
}

function taraskorBack() {
  return toRows(paint([
    { shape: T2.legs, tone: 1, shade: 2 },
    { shape: union(ellipse(24, 22, 6.5, 5), T2.horns), tone: 1, shade: 2 },
    { shape: capsule([[24, 40], [30, 43.5], [38, 44], [43, 41]], 2.4), tone: 1, shade: 2 },
    { shape: union(poly([31, 42], [33, 38.5], [35, 42.5]), poly([38, 42], [40.5, 38.5], [41.5, 42])), tone: 0 },
    { shape: ellipse(24, 32, 17.5, 11.5), tone: 2, shade: 3, light: { tone: 1, shape: union(ellipse(24, 32, 8, 5.5), poly([8, 30], [13, 24], [15, 25], [10, 32])) },
      pixels: [...px(3, [16, 32], [32, 32], [24, 27], [24, 37], [18, 27], [30, 27], [18, 37], [30, 37])] },
    { shape: union(poly([10, 28], [10.5, 21.5], [14, 26]), poly([16, 23.5], [18, 16.5], [20.5, 22.5]), poly([22, 22], [24, 14.5], [26, 22]), poly([27.5, 22.5], [30, 16.5], [32, 23.5]), poly([34, 26], [37.5, 21.5], [38, 28])), tone: 0, shade: 1 },
  ]));
}

// ---------- 009 Tarasque ----------
const T3 = {
  tail: capsule([[36, 38], [42, 36], [45.5, 30], [45.5, 24]], 2.6),
  tailSpikes: union(poly([40, 35], [42.5, 31.5], [43, 35.5]), poly([44, 29], [47.5, 27], [46.5, 31]), poly([44, 24.5], [45.5, 20], [47, 24.5])),
  shell: ellipse(24, 24, 20, 12),
  spikes: union(poly([5, 22], [3.5, 15.5], [8.5, 19]), poly([10, 16], [10.5, 8.5], [14.5, 13.5]), poly([16.5, 12.5], [18.5, 4.5], [21, 12]), poly([22.2, 11.5], [24, 2.5], [25.8, 11.5]), poly([27, 12], [29.5, 4.5], [31.5, 12.5]), poly([33.5, 13.5], [37.5, 8.5], [38, 16]), poly([39.5, 19], [44.5, 15.5], [43, 22])),
  legs: union(capsule([[11, 32], [8.5, 42]], 4.6), capsule([[37, 32], [39.5, 42]], 4.6), capsule([[17, 37], [16.5, 42.5]], 3.2), capsule([[31, 37], [31.5, 42.5]], 3.2)),
  mane: poly([12, 26], [11, 20], [14.5, 21.5], [14.5, 15.5], [18.5, 18.5], [20.5, 13.5], [24, 17.5], [27.5, 13.5], [29.5, 18.5], [33.5, 15.5], [33.5, 21.5], [37, 20], [36, 26], [38, 30.5], [33.5, 31], [33, 35], [24, 37], [15, 35], [14.5, 31], [10, 30.5]),
  head: ellipse(24, 28, 9, 7.5),
  muzzle: poly([17, 30.5], [31, 30.5], [29.5, 38.5], [18.5, 38.5]),
  horns: mirrorX(poly([17, 23], [11, 19], [8.5, 12.5], [11, 13], [13.5, 17.5], [19, 20.5])),
};

function tarasqueFront() {
  return toRows(paint([
    { shape: T3.tail, tone: 1, shade: 2 },
    { shape: T3.tailSpikes, tone: 0, shade: 1 },
    { shape: T3.spikes, tone: 0, shade: 1 },
    { shape: T3.shell, tone: 2, shade: 3, light: { tone: 1, shape: poly([5, 23], [11, 15], [13, 16], [7, 25]) },
      pixels: px(3, [9, 26], [10, 25], [11, 24], [39, 26], [38, 25], [37, 24], [6, 28], [42, 28], [15, 17], [33, 17], [24, 14], [24, 15]) },
    { shape: T3.legs, tone: 1, shade: 2, pixels: px(0, [5, 45], [7, 46], [9, 46], [11, 45], [37, 45], [39, 46], [41, 46], [43, 45], [15, 45], [17, 45], [31, 45], [33, 45]) },
    // Lion mane framing a bull-horned head.
    { shape: T3.mane, tone: 2, shade: 3, pixels: px(1, [14, 24], [16, 20], [20, 17], [28, 17], [32, 20], [34, 24], [13, 29], [35, 29]) },
    { shape: T3.horns, tone: 0, shade: 1 },
    { shape: T3.head, tone: 1, shade: 2 },
    { shape: T3.muzzle, tone: 0, shade: 1 },
    {
      pixels: [
        ...eyes(19, 27, 25),
        ...px(3, [18, 24], [19, 23], [20, 24], [21, 25], [30, 24], [29, 23], [28, 24], [27, 25]),
        ...px(3, [22, 31], [26, 31]),
        ...stamp(18, 33, ['333333333333', '303333333303', '.3333333333.', '..33333333..']),
      ],
    },
  ]));
}

function tarasqueBack() {
  return toRows(paint([
    { shape: T3.legs, tone: 1, shade: 2 },
    { shape: union(T3.horns, ellipse(24, 17, 7, 5)), tone: 1, shade: 2 },
    { shape: capsule([[24, 36], [32, 41], [40, 41.5], [45, 38]], 2.6), tone: 1, shade: 2 },
    { shape: union(poly([31, 39], [33, 35.5], [35, 39.5]), poly([38.5, 39.5], [41, 35.5], [42, 39.5])), tone: 0 },
    { shape: ellipse(24, 28, 20.5, 13), tone: 2, shade: 3, light: { tone: 1, shape: union(ellipse(24, 28, 9, 6.5), poly([5, 27], [11, 19], [13, 20], [7, 29])) },
      pixels: px(3, [15, 28], [33, 28], [24, 22], [24, 34], [17, 22], [31, 22], [17, 34], [31, 34], [8, 30], [40, 30]) },
    { shape: union(poly([5, 26], [3.5, 19.5], [8.5, 23]), poly([10, 20], [10.5, 12.5], [14.5, 17.5]), poly([16.5, 16.5], [18.5, 8.5], [21, 16]), poly([22.2, 15.5], [24, 6.5], [25.8, 15.5]), poly([27, 16], [29.5, 8.5], [31.5, 16.5]), poly([33.5, 17.5], [37.5, 12.5], [38, 20]), poly([39.5, 23], [44.5, 19.5], [43, 26])), tone: 0, shade: 1 },
  ]));
}

const TARASQUIN_ICON = [
  '................',
  '................',
  '.....3..3..3....',
  '....30330303....',
  '..3322222222233.',
  '.32223333333223.',
  '.3223111111132233',
  '32230311303123.3',
  '3223133113313203',
  '3223100000013233',
  '.32310333301323.',
  '.33331000013333.',
  '.3113.3333.3113.',
  '.3003......3003.',
  '..33........33..',
  '................',
].map((row) => row.slice(0, 16));

const TARASKOR_ICON = [
  '......3.3.......',
  '...3.30303.3....',
  '..3033000303033.',
  '.32222222222223.',
  '322233333333222.',
  '3223311111133223',
  '3330303113030333',
  '.3313311133133..',
  '..31000000013...',
  '..30333333303...',
  '..33030330303...',
  '.3113333333113..',
  '.31113....31113.',
  '.3000......3003.',
  '..333......333..',
  '................',
];

const TARASQUE_ICON = [
  '..3.3..3..3.3...',
  '.30303033030303.',
  '3222222222222223',
  '3223333333333223',
  '3332222222223333',
  '3323111111132333',
  '3231303113031323',
  '3231333113331323',
  '.32310000001323.',
  '.3230333333032 3',
  '.3223033330322 3',
  '.31332333323313.',
  '311133222233111 3',
  '3000013333310003',
  '.3333......3333.',
  '................',
].map((row) => row.replace(/ /g, '').slice(0, 16).padEnd(16, '.'));

export const line = [
  { id: 'flaquin', front: tarasquinFront(), back: tarasquinBack(), icon: TARASQUIN_ICON },
  { id: 'ondeclat', front: taraskorFront(), back: taraskorBack(), icon: TARASKOR_ICON },
  { id: 'marevor', front: tarasqueFront(), back: tarasqueBack(), icon: TARASQUE_ICON },
];
