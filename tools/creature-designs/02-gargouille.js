// Lignées de la Gargouille (033 à 035, Roche et Terre) et du Lubin (036 et 037, Ombre et Vent).
// Fiches : docs/bestiaire-folklorique/fiches/033-gargouille.md et 036-lubin.md.
// Tones: 0 highlights, 1 stone/fur, 2 dark, 3 ink.
import { capsule, ellipse, eyes, mirrorX, paint, poly, px, rect, stamp, toRows, union } from '../creature-painter.js';

const cracks = (...points) => px(2, ...points);

// ---------- 033 Gargoulin: little crouching stone imp ----------
const G1 = {
  wings: mirrorX(poly([18, 30], [10, 24], [8, 29], [10, 33], [16, 35])),
  feet: union(ellipse(18, 44.6, 3.5, 1.6), ellipse(30, 44.6, 3.5, 1.6)),
  body: ellipse(24, 37.5, 8, 6.5),
  arms: mirrorX(capsule([[18, 36], [17, 42]], 1.8)),
  horns: mirrorX(poly([18.5, 22], [15, 15], [20.5, 20])),
  head: ellipse(24, 27, 8, 7),
  snout: ellipse(24, 30.5, 4, 2.6),
};

function gargoulinFront() {
  return toRows(paint([
    { shape: G1.wings, tone: 2, shade: 3, light: { tone: 1, shape: union(poly([10, 27], [16, 30], [11, 30]), poly([38, 27], [32, 30], [37, 30])) } },
    { shape: G1.feet, tone: 1, shade: 2, pixels: px(3, [16, 45], [18, 45], [30, 45], [32, 45]) },
    { shape: G1.body, tone: 1, shade: 2, light: { tone: 0, shape: ellipse(24, 39, 4, 3.5) }, pixels: cracks([21, 35], [22, 36], [28, 40]) },
    { shape: G1.arms, tone: 1, shade: 2 },
    { shape: G1.horns, tone: 0, shade: 1 },
    { shape: G1.head, tone: 1, shade: 2, pixels: cracks([18, 24], [19, 25], [30, 23]) },
    { shape: G1.snout, tone: 0, shade: 1, pixels: [...px(3, [22, 30], [26, 30]), ...stamp(21, 32, ['3333333', '.30.03.'])] },
    { pixels: [...eyes(19, 27, 25), ...px(3, [18, 24], [19, 23], [20, 24], [27, 24], [28, 23], [29, 24])] },
  ]));
}

function gargoulinBack() {
  return toRows(paint([
    { shape: G1.feet, tone: 1, shade: 2 },
    { shape: G1.arms, tone: 1, shade: 2 },
    { shape: G1.body, tone: 1, shade: 2, pixels: cracks([21, 35], [26, 38], [23, 41]) },
    { shape: capsule([[28, 42], [34, 43], [37, 40]], 1.3), tone: 1, shade: 2 },
    { shape: G1.horns, tone: 0, shade: 1 },
    { shape: G1.head, tone: 1, shade: 2, pixels: cracks([20, 26], [27, 24], [24, 30]) },
    { shape: G1.wings, tone: 2, shade: 3, light: { tone: 1, shape: union(poly([10, 27], [16, 30], [11, 30]), poly([38, 27], [32, 30], [37, 30])) } },
  ]));
}

// ---------- 034 Gargoulard: gargoyle perched on its plinth ----------
const G2 = {
  plinth: rect(9, 39, 39, 46),
  wings: mirrorX(poly([17, 22], [6, 12], [3, 16], [5, 22], [3, 27], [9, 30], [16, 30])),
  legs: union(capsule([[16, 33], [14, 38]], 3), capsule([[32, 33], [34, 38]], 3)),
  feet: union(ellipse(14, 38.6, 4, 1.6), ellipse(34, 38.6, 4, 1.6)),
  body: ellipse(24, 30, 9.5, 8),
  arms: mirrorX(capsule([[17, 28], [19, 35]], 2)),
  horns: mirrorX(poly([18, 15], [13, 6], [16, 7], [20, 13])),
  head: ellipse(24, 19, 8, 6.8),
  snout: ellipse(24, 23, 4.8, 3),
};

function gargoulardFront() {
  return toRows(paint([
    { shape: G2.plinth, tone: 1, shade: 2, light: { tone: 0, shape: rect(9, 39, 39, 40) }, pixels: [...stamp(9, 42, ['333333333333333333333333333333']), ...px(2, [15, 44], [30, 41], [23, 44])] },
    { shape: G2.wings, tone: 2, shade: 3, light: { tone: 1, shape: union(poly([5, 15], [15, 24], [6, 20]), poly([43, 15], [33, 24], [42, 20])) }, pixels: px(3, [5, 24], [7, 27], [43, 24], [41, 27]) },
    { shape: G2.legs, tone: 1, shade: 2 },
    { shape: G2.feet, tone: 1, shade: 2, pixels: px(3, [11, 39], [13, 39], [35, 39], [37, 39]) },
    { shape: G2.body, tone: 1, shade: 2, light: { tone: 0, shape: ellipse(24, 32, 5, 4.5) }, pixels: cracks([19, 27], [20, 28], [29, 33], [30, 34]) },
    { shape: G2.arms, tone: 1, shade: 2 },
    { shape: G2.horns, tone: 0, shade: 1 },
    { shape: G2.head, tone: 1, shade: 2, pixels: cracks([18, 16], [19, 17], [30, 15]) },
    { shape: G2.snout, tone: 0, shade: 1, pixels: [...px(3, [21, 22], [27, 22]), ...stamp(20, 24, ['333333333', '303333303', '.3333333.'])] },
    { pixels: [...eyes(19, 27, 17), ...px(3, [18, 16], [19, 15], [20, 15], [21, 16], [26, 16], [27, 15], [28, 15], [29, 16])] },
  ]));
}

function gargoulardBack() {
  return toRows(paint([
    { shape: G2.plinth, tone: 1, shade: 2, light: { tone: 0, shape: rect(9, 39, 39, 40) }, pixels: stamp(9, 42, ['333333333333333333333333333333']) },
    { shape: G2.legs, tone: 1, shade: 2 },
    { shape: G2.feet, tone: 1, shade: 2 },
    { shape: G2.body, tone: 1, shade: 2, pixels: cracks([20, 28], [28, 30], [24, 34]) },
    { shape: capsule([[26, 37], [33, 38], [38, 35]], 1.6), tone: 1, shade: 2 },
    { shape: G2.horns, tone: 0, shade: 1 },
    { shape: G2.head, tone: 1, shade: 2, pixels: cracks([21, 18], [27, 16]) },
    { shape: G2.wings, tone: 2, shade: 3, light: { tone: 1, shape: union(poly([5, 15], [15, 24], [6, 20]), poly([43, 15], [33, 24], [42, 20])) } },
  ]));
}

// ---------- 035 Gargouille: the dragon of Rouen, in stone ----------
const G3 = {
  wings: mirrorX(poly([17, 20], [8, 6], [2, 2], [0.5, 9], [3, 12], [0.5, 17], [4, 20], [1, 26], [7, 28], [5, 33], [12, 33], [17, 29])),
  tail: capsule([[30, 41], [38, 43], [44, 40], [46, 34]], 2),
  tailTip: poly([44, 35], [47, 30], [47.5, 36]),
  legs: union(capsule([[16, 34], [13, 44]], 3.4), capsule([[32, 34], [35, 44]], 3.4)),
  feet: union(ellipse(12.5, 44.6, 4.4, 1.6), ellipse(35.5, 44.6, 4.4, 1.6)),
  body: ellipse(24, 31, 10, 9.5),
  neck: poly([19, 26], [21, 15], [27, 15], [29, 26]),
  horns: mirrorX(poly([19, 10], [14, 2], [17, 2.5], [21, 8])),
  head: ellipse(24, 12.5, 7, 6),
  jaw: poly([17.5, 14], [30.5, 14], [28.5, 21], [19.5, 21]),
};

function gargouilleFront() {
  return toRows(paint([
    { shape: G3.wings, tone: 2, shade: 3, light: { tone: 1, shape: union(poly([3, 5], [15, 20], [4, 12]), poly([45, 5], [33, 20], [44, 12]), poly([3, 22], [14, 27], [5, 26]), poly([45, 22], [34, 27], [43, 26])) },
      pixels: px(3, [3, 14], [4, 20], [7, 30], [45, 14], [44, 20], [41, 30]) },
    { shape: G3.tail, tone: 1, shade: 2 },
    { shape: G3.tailTip, tone: 2 },
    { shape: G3.legs, tone: 1, shade: 2, pixels: cracks([14, 38], [34, 39]) },
    { shape: G3.feet, tone: 1, shade: 2, pixels: px(3, [9, 45], [12, 45], [15, 45], [33, 45], [36, 45], [39, 45]) },
    { shape: G3.body, tone: 1, shade: 2, light: { tone: 0, shape: ellipse(24, 33, 5.5, 6) },
      pixels: [...stamp(20, 29, ['33333333', '........', '33333333', '........', '33333333']), ...cracks([16, 27], [17, 28], [31, 33])] },
    { shape: G3.neck, tone: 1, shade: 2 },
    { shape: G3.horns, tone: 0, shade: 1 },
    { shape: G3.head, tone: 1, shade: 2, pixels: cracks([19, 9], [29, 8]) },
    // Gaping spout mouth.
    { shape: G3.jaw, tone: 3, pixels: [...stamp(18, 14, ['0303030303030']), ...stamp(20, 20, ['03030303'])] },
    { pixels: [...stamp(19, 10, ['33333..33333']), ...px(0, [20, 11], [21, 11], [27, 11], [28, 11]), ...px(3, [20, 12], [21, 12], [27, 12], [28, 12])] },
  ]));
}

function gargouilleBack() {
  return toRows(paint([
    { shape: G3.legs, tone: 1, shade: 2 },
    { shape: G3.feet, tone: 1, shade: 2 },
    { shape: G3.body, tone: 1, shade: 2, pixels: cracks([18, 28], [29, 31], [24, 36]) },
    { shape: capsule([[24, 39], [32, 43], [40, 43], [45, 38]], 2), tone: 1, shade: 2 },
    { shape: poly([43, 39], [47, 34], [47.5, 40]), tone: 2 },
    { shape: G3.neck, tone: 1, shade: 2 },
    { shape: G3.horns, tone: 0, shade: 1 },
    { shape: G3.head, tone: 1, shade: 2, pixels: cracks([21, 10], [27, 12]) },
    { shape: G3.wings, tone: 2, shade: 3, light: { tone: 1, shape: union(poly([3, 5], [15, 20], [4, 12]), poly([45, 5], [33, 20], [44, 12]), poly([3, 22], [14, 27], [5, 26]), poly([45, 22], [34, 27], [43, 26])) } },
  ]));
}

// ---------- 036 Lubin: bat-eared night wolf cub ----------
const L1 = {
  wings: mirrorX(poly([18, 31], [9, 26], [4, 28], [6, 32], [4, 36], [10, 36], [17, 36])),
  body: ellipse(24, 35, 7, 6),
  feet: union(ellipse(20.5, 41, 2.5, 1.6), ellipse(27.5, 41, 2.5, 1.6)),
  ears: mirrorX(poly([18, 22], [12, 10], [21, 18])),
  head: ellipse(24, 25.5, 7.5, 6.5),
  muzzle: ellipse(24, 29, 3.6, 2.6),
};

function lubinFront() {
  return toRows(paint([
    { shape: L1.wings, tone: 2, shade: 3, light: { tone: 1, shape: union(poly([6, 29], [15, 32], [8, 32]), poly([42, 29], [33, 32], [40, 32])) }, pixels: px(3, [7, 34], [10, 35], [41, 34], [38, 35]) },
    { shape: L1.feet, tone: 2 },
    { shape: L1.body, tone: 2, shade: 3, light: { tone: 1, shape: ellipse(24, 36, 3.5, 3.5) } },
    { shape: L1.ears, tone: 2, shade: 3, light: { tone: 1, shape: union(poly([17, 20], [14, 13], [19, 18]), poly([31, 20], [34, 13], [29, 18])) } },
    { shape: L1.head, tone: 2, shade: 3, light: { tone: 1, shape: ellipse(24, 27, 5, 3.5) } },
    { shape: L1.muzzle, tone: 1, shade: 2, pixels: [...px(3, [23, 28], [24, 28]), ...stamp(22, 30, ['3..3', '0330'])] },
    // Glowing eyes in the dark fur.
    { pixels: [...stamp(19, 23, ['000..000', '030..030'])] },
  ]));
}

function lubinBack() {
  return toRows(paint([
    { shape: L1.feet, tone: 2 },
    { shape: L1.body, tone: 2, shade: 3 },
    { shape: L1.ears, tone: 2, shade: 3 },
    { shape: L1.head, tone: 2, shade: 3, pixels: px(1, [21, 23], [26, 22], [24, 27]) },
    { shape: L1.wings, tone: 2, shade: 3, light: { tone: 1, shape: union(poly([6, 29], [15, 32], [8, 32]), poly([42, 29], [33, 32], [40, 32])) } },
    { shape: poly([24, 38], [26, 43], [23, 44]), tone: 2 },
  ]));
}

// ---------- 037 Lubinou: wolf of the cemetery winds ----------
const L2 = {
  wings: mirrorX(poly([17, 22], [6, 10], [1, 12], [3, 18], [0.5, 23], [5, 27], [2, 32], [9, 33], [8, 38], [15, 36], [18, 31])),
  legs: union(capsule([[19, 37], [18, 44]], 2), capsule([[29, 37], [30, 44]], 2)),
  feet: union(ellipse(17.5, 44.8, 3, 1.4), ellipse(30.5, 44.8, 3, 1.4)),
  body: ellipse(24, 31, 8.5, 8),
  ruff: poly([15, 27], [14, 21], [18, 23], [20, 19], [24, 22], [28, 19], [30, 23], [34, 21], [33, 27], [24, 31]),
  ears: mirrorX(poly([18.5, 12], [13, 1], [21.5, 9])),
  head: ellipse(24, 15, 7, 6),
  muzzle: poly([20, 16], [28, 16], [27, 22], [21, 22]),
};

function lubinouFront() {
  return toRows(paint([
    { shape: L2.wings, tone: 2, shade: 3, light: { tone: 1, shape: union(poly([3, 14], [15, 23], [4, 20]), poly([45, 14], [33, 23], [44, 20]), poly([4, 29], [14, 31], [7, 32]), poly([44, 29], [34, 31], [41, 32])) },
      pixels: px(3, [3, 22], [6, 30], [45, 22], [42, 30]) },
    { shape: L2.legs, tone: 2, shade: 3 },
    { shape: L2.feet, tone: 2, pixels: px(0, [15, 45], [17, 46], [31, 46], [33, 45]) },
    { shape: L2.body, tone: 2, shade: 3, light: { tone: 1, shape: ellipse(24, 33, 5, 5) } },
    { shape: L2.ruff, tone: 1, shade: 2, pixels: px(0, [17, 24], [24, 26], [31, 24]) },
    { shape: L2.ears, tone: 2, shade: 3, light: { tone: 1, shape: union(poly([18, 10], [15, 3], [20, 8]), poly([30, 10], [33, 3], [28, 8])) } },
    { shape: L2.head, tone: 2, shade: 3 },
    { shape: L2.muzzle, tone: 1, shade: 2, pixels: [...stamp(22, 16, ['3333']), ...stamp(20, 19, ['33333333', '30.0.003', '.333333.'])] },
    { pixels: stamp(19, 13, ['000..000', '030..030']) },
  ]));
}

function lubinouBack() {
  return toRows(paint([
    { shape: L2.legs, tone: 2, shade: 3 },
    { shape: L2.feet, tone: 2 },
    { shape: L2.body, tone: 2, shade: 3 },
    { shape: poly([24, 36], [30, 44], [25, 46], [22, 40]), tone: 2, shade: 3 },
    { shape: L2.ruff, tone: 1, shade: 2 },
    { shape: L2.ears, tone: 2, shade: 3 },
    { shape: L2.head, tone: 2, shade: 3, pixels: px(1, [21, 13], [26, 12], [24, 17]) },
    { shape: L2.wings, tone: 2, shade: 3, light: { tone: 1, shape: union(poly([3, 14], [15, 23], [4, 20]), poly([45, 14], [33, 23], [44, 20])) } },
  ]));
}

const GARGOULIN_ICON = [
  '................',
  '...3.......3....',
  '..303.....303...',
  '...33333333 3...',
  '...31111111 3...',
  '.33313031301333.',
  '3223311111133223',
  '3222330000332223',
  '.3223333333 3223',
  '..33310303013 3.',
  '...31111111113..',
  '...31110001113..',
  '...31311111313..',
  '...31333333313..',
  '..3113....3113..',
  '..3333....3333..',
].map((row) => row.replace(/ /g, '').slice(0, 16).padEnd(16, '.'));

const GARGOULARD_ICON = [
  '..3.........3...',
  '.303.......303..',
  '33.33333333.33..',
  '322311111113223.',
  '3222130313012223',
  '32223111111 3222 3',
  '.322300000032223',
  '..33303333303 3.',
  '...31111111113..',
  '..3111100011113.',
  '..311311111311 3',
  '..3133333333313.',
  '3333333333333333',
  '3000000000000003',
  '3111111111111113',
  '3333333333333333',
].map((row) => row.replace(/ /g, '').slice(0, 16).padEnd(16, '.'));

const GARGOUILLE_ICON = [
  '3..3.......3..3.',
  '23.303...303.32.',
  '223.3333333.322.',
  '2223311111133222',
  '.22313031303122 3',
  '.223333333333223',
  '..3303030303033.',
  '..3333333333333.',
  '...31111111113..',
  '..3110333330113.',
  '..3110333330113.',
  '..3111111111113.',
  '.3113.....31113.',
  '.3113......3113 3',
  '.3333......3333.',
  '................',
].map((row) => row.replace(/ /g, '').slice(0, 16).padEnd(16, '.'));

const LUBIN_ICON = [
  '................',
  '...3.......3....',
  '..323.....323...',
  '..3223333322 3..',
  '..32222222222 3.',
  '..32003220032...',
  '..32032222302 3.',
  '...3221111223...',
  '33..32133123..33',
  '3223322112233223',
  '322223222223222 3',
  '.32223222223223.',
  '..3332222222333.',
  '.....3222223....',
  '.....3.333.3....',
  '................',
].map((row) => row.replace(/ /g, '').slice(0, 16).padEnd(16, '.'));

const LUBINOU_ICON = [
  '...3.......3....',
  '..323.....323...',
  '3.3223333322 3.3',
  '23322222222 23 32',
  '2232003220032232',
  '2232032222302232',
  '.223221111223223',
  '.2233333333332 3.',
  '..3330.0.0 33..',
  '...3311111133...',
  '..311101110113..',
  '..322222222223..',
  '..32222222222 3.',
  '...3223333223...',
  '..3223....3223..',
  '..3333....3333..',
].map((row) => row.replace(/ /g, '').slice(0, 16).padEnd(16, '.'));

export const line = [
  { id: 'gargoulin', front: gargoulinFront(), back: gargoulinBack(), icon: GARGOULIN_ICON },
  { id: 'gargoulard', front: gargoulardFront(), back: gargoulardBack(), icon: GARGOULARD_ICON },
  { id: 'gargouille', front: gargouilleFront(), back: gargouilleBack(), icon: GARGOUILLE_ICON },
  { id: 'lubin', front: lubinFront(), back: lubinBack(), icon: LUBIN_ICON },
  { id: 'lubinou', front: lubinouFront(), back: lubinouBack(), icon: LUBINOU_ICON },
];
