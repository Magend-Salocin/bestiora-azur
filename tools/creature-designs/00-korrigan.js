import { sprites as korrigan } from './00-korrigan-base.js';
import { capsule, ellipse, mirrorX, paint, poly, px, rect, stamp, toRows, union } from '../creature-painter.js';

// Shared face pieces: glinting eyes and the curled pointed hat.
const eyes = (lx, rx, y) => [
  ...px(3, [lx, y], [lx + 1, y], [lx, y + 1], [lx + 1, y + 1], [lx, y + 2], [lx + 1, y + 2]),
  ...px(3, [rx, y], [rx + 1, y], [rx, y + 1], [rx + 1, y + 1], [rx, y + 2], [rx + 1, y + 2]),
  ...px(0, [lx + 1, y], [rx + 1, y]),
];

// ---------- 002 Korrigard: stone guardian ----------
const KG = {
  legs: union(rect(16, 37, 21, 43), rect(27, 37, 32, 43)),
  boots: union(ellipse(18, 44.2, 5.6, 2.4), ellipse(30, 44.2, 5.6, 2.4)),
  body: ellipse(24, 32.5, 11, 8.5),
  arms: mirrorX(capsule([[15, 27], [11, 32], [10, 36]], 3)),
  fists: union(ellipse(9.5, 37.5, 3.6, 3.2), ellipse(38.5, 37.5, 3.6, 3.2)),
  pauldrons: union(ellipse(13, 26.5, 5.5, 4), ellipse(35, 26.5, 5.5, 4)),
  ears: mirrorX(poly([17, 18.5], [5, 13], [8.5, 18.5], [17, 23.5])),
  head: ellipse(24, 20.5, 8, 6.8),
  beard: poly([15.5, 20.5], [17, 27], [19, 32], [21.5, 31], [24, 35.5], [26.5, 31], [29, 32], [31, 27], [32.5, 20.5], [29.5, 26.5], [18.5, 26.5]),
  brim: ellipse(24, 14.6, 11.5, 2.3),
  cone: poly([15.5, 14.5], [32.5, 14.5], [31, 8.5], [31.5, 4.5], [35.5, 2], [37.5, 3], [35.5, 3.6], [33.5, 6], [27.5, 3.5], [22, 5.5], [17.5, 10]),
};

function korrigardFront() {
  return toRows(paint([
    { shape: KG.legs, tone: 1 },
    { shape: KG.boots, tone: 2, shade: 3, light: { tone: 1, shape: union(rect(13, 43, 17, 44), rect(25, 43, 29, 44)) } },
    { shape: KG.body, tone: 1, shade: 2, pixels: [...px(3, [16, 36], [17, 36], [18, 36], [19, 36], [20, 36], [21, 36], [26, 36], [27, 36], [28, 36], [29, 36], [30, 36], [31, 36]), ...stamp(22, 35, ['3333', '3003', '3333'])] },
    { shape: KG.arms, tone: 1, shade: 2 },
    // Granite gauntlets and pauldrons, cracked and mossy.
    { shape: KG.fists, tone: 0, shade: 1, pixels: px(2, [8, 37], [9, 38], [39, 36], [38, 37], [7, 36], [40, 38]) },
    { shape: KG.pauldrons, tone: 0, shade: 1, pixels: [...px(2, [11, 26], [12, 27], [36, 26], [35, 27], [14, 28], [33, 28]), ...px(1, [10, 24], [12, 23], [36, 23], [38, 24])] },
    { shape: KG.ears, tone: 1, shade: 2, pixels: px(0, [10, 16], [11, 17], [12, 18], [37, 16], [36, 17], [35, 18]) },
    { shape: KG.head, tone: 0, shade: 1 },
    { shape: KG.beard, tone: 1, shade: 2, pixels: px(2, [19, 29], [23, 30], [27, 29], [21, 32], [26, 32], [24, 33]) },
    { shape: union(KG.brim, KG.cone), tone: 2,
      light: { tone: 1, shape: union(poly([18.5, 11], [23, 5.5], [24, 6], [20, 12]), rect(13, 14, 19, 15)) },
      // Stone band with a carved rune.
      pixels: [...stamp(17, 12, ['00000000000000', '01111111111110']), ...px(3, [23, 12], [24, 12], [23, 13], [24, 13]), ...px(3, [31, 9], [32, 11], [30, 12])] },
    {
      pixels: [
        ...eyes(19, 27, 19),
        ...px(3, [18, 18], [19, 18], [20, 18], [27, 18], [28, 18], [29, 18]),
        ...px(1, [23, 22], [24, 22]),
        ...px(3, [21, 24], [22, 24], [23, 24], [24, 24], [25, 24], [26, 24]),
      ],
    },
  ]));
}

function korrigardBack() {
  return toRows(paint([
    { shape: KG.legs, tone: 1 },
    { shape: KG.boots, tone: 2, shade: 3 },
    { shape: KG.arms, tone: 1, shade: 2 },
    { shape: KG.fists, tone: 0, shade: 1, pixels: px(2, [8, 37], [39, 36]) },
    { shape: KG.ears, tone: 1, shade: 2 },
    { shape: KG.head, tone: 2, shade: 3, pixels: px(1, [19, 17], [23, 19], [27, 17], [21, 22], [26, 22]) },
    // Bark cloak and a granite back plate.
    { shape: union(poly([14, 25], [34, 25], [37, 40], [33, 41], [30, 39.5], [27, 41], [24, 39.5], [21, 41], [18, 39.5], [15, 41], [11, 40]), ellipse(24, 32, 11, 8)), tone: 2, shade: 3,
      light: { tone: 1, shape: union(rect(23.5, 26, 24.5, 39), poly([16, 28], [19, 28], [15, 38]), poly([32, 28], [29, 28], [33, 38])) } },
    { shape: KG.pauldrons, tone: 0, shade: 1, pixels: px(2, [11, 26], [36, 26], [14, 28], [33, 28]) },
    { shape: union(KG.brim, KG.cone), tone: 2, shade: 3,
      light: { tone: 1, shape: union(poly([18.5, 11], [23, 5.5], [24, 6], [20, 12]), rect(13, 14, 20, 15)) },
      pixels: stamp(17, 12, ['00000000000000', '01111111111110']) },
  ]));
}

// ---------- 003 Korriroi: king of the mounds ----------
const KR = {
  cloak: poly([15, 23], [33, 23], [40, 33], [44, 41], [44.5, 45.5], [41, 44.5], [38, 46], [34, 44.5], [14, 44.5], [10, 46], [7, 44.5], [3.5, 45.5], [4, 41], [8, 33]),
  robe: poly([18.5, 27], [29.5, 27], [33, 45], [15, 45]),
  boots: union(ellipse(18, 45.6, 4.2, 1.8), ellipse(30, 45.6, 4.2, 1.8)),
  staff: union(rect(40, 13, 42, 45), poly([38.5, 13.5], [43.5, 13.5], [42.5, 7], [41, 4.5], [39.5, 7])),
  hand: ellipse(40.8, 28, 2.6, 2.4),
  ears: mirrorX(poly([16.5, 15.5], [3, 8.5], [6.5, 15], [16.5, 20.5])),
  head: ellipse(24, 17.5, 7.8, 6.3),
  beard: poly([15.5, 17.5], [17, 25], [18.5, 33], [20.5, 39], [22.5, 37.5], [24, 43], [25.5, 37.5], [27.5, 39], [29.5, 33], [31, 25], [32.5, 17.5], [29.5, 22.5], [18.5, 22.5]),
  brim: ellipse(24, 11.8, 12, 2.3),
  cone: poly([16, 11.5], [32, 11.5], [30.5, 6.5], [31, 2.5], [34.5, 0.5], [36.5, 1.5], [34.5, 2], [33, 4.5], [27.5, 2], [22, 3.5], [18, 7.5]),
  crown: union(rect(14, 9.5, 16.5, 12), rect(18.5, 8.5, 21, 12), rect(22.8, 7.5, 25.2, 12), rect(27, 8.5, 29.5, 12), rect(31.5, 9.5, 34, 12)),
};

function korriroiFront() {
  return toRows(paint([
    // Leaf cloak sprouting ferns, over a bark robe.
    { shape: KR.cloak, tone: 2, shade: 3,
      light: { tone: 1, shape: union(poly([8, 36], [11, 31], [12, 42]), poly([40, 36], [37, 31], [36, 42])) },
      pixels: px(3, [9, 38], [10, 36], [11, 39], [38, 36], [39, 38], [37, 39]) },
    { shape: KR.robe, tone: 1, shade: 2 },
    { shape: KR.boots, tone: 2, shade: 3 },
    { shape: KR.staff, tone: 2, light: { tone: 0, shape: poly([39.5, 12.5], [41, 6], [41.5, 12.5]) }, pixels: px(3, [40, 20], [41, 24], [40, 34]) },
    { shape: KR.hand, tone: 0, shade: 1 },
    { shape: KR.ears, tone: 1, shade: 2, pixels: px(0, [8, 12], [9, 13], [10, 14], [39, 12], [38, 13], [37, 14]) },
    { shape: KR.head, tone: 0, shade: 1 },
    { shape: KR.beard, tone: 1, shade: 2, pixels: px(2, [19, 26], [23, 28], [27, 26], [21, 31], [26, 31], [24, 34], [22, 36], [25, 38], [20, 29], [28, 30]) },
    { shape: union(KR.brim, KR.cone), tone: 2, light: { tone: 1, shape: union(poly([19, 8], [23, 3.5], [24, 4], [20.5, 9]), rect(12, 11, 18, 12)) } },
    // Crown of small standing stones.
    { shape: KR.crown, tone: 0, shade: 1, pixels: px(2, [15, 10], [19, 9], [23, 8], [27, 9], [32, 10]) },
    {
      pixels: [
        ...eyes(19, 27, 16),
        ...px(3, [18, 15], [19, 15], [20, 15], [27, 15], [28, 15], [29, 15]),
        ...px(1, [23, 19], [24, 19]),
        ...px(3, [22, 21], [23, 21], [24, 21], [25, 21]),
      ],
    },
  ]));
}

function korriroiBack() {
  return toRows(paint([
    { shape: KR.boots, tone: 2, shade: 3 },
    { shape: KR.staff, tone: 2, light: { tone: 0, shape: poly([39.5, 12.5], [41, 6], [41.5, 12.5]) } },
    { shape: KR.ears, tone: 1, shade: 2 },
    { shape: KR.head, tone: 2, shade: 3, pixels: px(1, [19, 14], [23, 16], [27, 14], [21, 19], [26, 19]) },
    { shape: KR.cloak, tone: 2, shade: 3,
      light: { tone: 1, shape: union(rect(23.5, 23, 24.5, 44), poly([14, 28], [17, 27], [11, 42]), poly([34, 28], [31, 27], [37, 42])) },
      pixels: px(3, [18, 32], [19, 35], [18, 38], [30, 32], [29, 35], [30, 38]) },
    { shape: KR.hand, tone: 0, shade: 1 },
    { shape: mirrorX(poly([15, 20], [16.5, 26], [19, 23])), tone: 1, shade: 2 },
    { shape: union(KR.brim, KR.cone), tone: 2, shade: 3, light: { tone: 1, shape: union(poly([19, 8], [23, 3.5], [24, 4], [20.5, 9]), rect(12, 11, 19, 12)) } },
    { shape: KR.crown, tone: 0, shade: 1 },
  ]));
}

const KORRIGARD_ICON = [
  '..........333...',
  '........332223..',
  '.......32222233.',
  '.....33222222...',
  '....30000000003.',
  '.3..3333333333.3',
  '3133000000000331',
  '.31303000030313.',
  '..330000000033..',
  '.30033333333003.',
  '3000311111130003',
  '3000311111130003',
  '.333221111223333',
  '..3222233222223.',
  '..3222233222223.',
  '...3333..33333..',
];

const KORRIROI_ICON = [
  '..3.3..3..3.3...',
  '.30303030303033.',
  '.3000000000003..',
  '3133333333333313',
  '3113000000003113',
  '.31303000030313.',
  '..330000000033..',
  '...3001111003...',
  '..3231111111323.',
  '.32223111113222.',
  '.32223111113222.',
  '322222311132222.',
  '322222231322222.',
  '3222222232222223',
  '3222222222222223',
  '.33333333333333.',
];

export const line = [
  { id: 'fenouillot', front: korrigan.front, back: korrigan.back, icon: korrigan.icon },
  { id: 'fenouvert', front: korrigardFront(), back: korrigardBack(), icon: KORRIGARD_ICON },
  { id: 'sylvenard', front: korriroiFront(), back: korriroiBack(), icon: KORRIROI_ICON },
];
