import { ellipse, poly } from '../../shape-renderer.js';
import { metatile, overlay, shapeRows, shiftRows, tileRows } from './tile-helpers.js';

const MEMORY_FLOOR = tileRows([
  '22222222',
  '21111112',
  '21222212',
  '21211212',
  '21211212',
  '21222212',
  '21111112',
  '22222222',
]);

const MEMORY_FLOOR_ALT = tileRows([
  '11111111',
  '12222221',
  '12111121',
  '12122121',
  '12122121',
  '12111121',
  '12222221',
  '11111111',
]);

const LAB_FLOOR = tileRows(['11111112', '11111112', '11111112', '11111112', '11111112', '11111112', '11111112', '22222222']);

function teleporter(glow) {
  return overlay(LAB_FLOOR, shapeRows(16, 16, [
    { z: 0, tone: 2, shapes: [ellipse(8, 8, 7, 6.5)] },
    { z: 1, tone: glow ? 0 : 1, shade: false, shapes: [ellipse(8, 8, 4.5, 4)] },
    { z: 2, tone: glow ? 1 : 0, shade: false, shapes: [ellipse(8, 8, 2, 1.8)] },
  ]));
}

/**
 * Teleporter with a symbol in its centre (circle, triangle, square, diamond): the teleporters of
 * the Arcane arena are told apart by their symbol.
 */
const SYMBOLS = {
  circle: ['..333..', '.3...3.', '3.....3', '3.....3', '3.....3', '.3...3.', '..333..'],
  triangle: ['...3...', '...3...', '..333..', '..333..', '.33333.', '.33333.', '3333333'],
  square: ['3333333', '3333333', '3333333', '3333333', '3333333', '3333333', '3333333'],
  diamond: ['...3...', '..333..', '.33333.', '3333333', '.33333.', '..333..', '...3...'],
};

/** Dark disc with a light symbol that pulses between two tones. */
function symbolTeleporter(symbol, glow) {
  const disc = overlay(LAB_FLOOR, shapeRows(16, 16, [{ z: 0, tone: 3, shade: false, shapes: [ellipse(8, 8, 7, 6.5)] }]));
  const glyph = SYMBOLS[symbol].map((row) => row.replaceAll('3', glow ? '0' : '1'));
  return overlay(disc, glyph, 4, 4);
}

/**
 * Air current: chevrons that slide in the push direction (the player is carried along it).
 * Pixel (x, y) is lit when it lies on a chevron line; `phase` animates the 2 frames.
 */
function windRows(direction, phase) {
  const rows = [];
  for (let y = 0; y < 16; y += 1) {
    let row = '';
    for (let x = 0; x < 16; x += 1) {
      const along = { up: y, down: 15 - y, left: x, right: 15 - x }[direction];
      const across = direction === 'up' || direction === 'down' ? x : y;
      const spread = Math.round(Math.abs(across - 7.5));
      const lit = (along - spread + phase + 16) % 8 < 2;
      row += lit ? '2' : (x + y) % 4 === 0 ? '0' : '1';
    }
    rows.push(row);
  }
  return rows;
}

const LEAGUE_FLOOR = tileRows([
  '00000000',
  '01111110',
  '01000010',
  '01011010',
  '01011010',
  '01000010',
  '01111110',
  '00000000',
]);

const LEAGUE_CARPET = [
  '3222222222222223',
  '3211111111111123',
  '3211111111111123',
  '3211121111211123',
  '3211222112221123',
  '3211121111211123',
  '3211111111111123',
  '3211111111111123',
  '3211111111111123',
  '3211111111111123',
  '3211121111211123',
  '3211222112221123',
  '3211121111211123',
  '3211111111111123',
  '3211111111111123',
  '3222222222222223',
];

const LAVA = tileRows(['22222222', '21122222', '10012222', '21122212', '22222101', '22212212', '22101222', '22212222']);

const CRYSTAL_PILLAR = shapeRows(16, 16, [
  { tone: 0, shapes: [poly([5, 15], [4, 5], [8, 0.5], [12, 5], [11, 15])], overlays: [{ shapes: [poly([8, 1], [10, 5], [9.5, 14], [8, 15])], tone: 1 }] },
]);

export default {
  id: 'special',
  metatiles: [
    metatile('memory_floor', MEMORY_FLOOR),
    metatile('memory_floor_alt', MEMORY_FLOOR_ALT),
    metatile('lab_floor', LAB_FLOOR),
    metatile('teleporter', [teleporter(false), teleporter(true)], { door: true }),
    ...Object.keys(SYMBOLS).map((symbol) => metatile(`teleporter_${symbol}`, [symbolTeleporter(symbol, false), symbolTeleporter(symbol, true)], { door: true })),
    ...['up', 'down', 'left', 'right'].map((direction) => metatile(`wind_${direction}`, [windRows(direction, 0), windRows(direction, 4)], { current: direction })),
    metatile('league_floor', LEAGUE_FLOOR),
    metatile('league_carpet', LEAGUE_CARPET),
    metatile('lava', [LAVA, shiftRows(LAVA, 1, 1)], { solid: true }),
    metatile('crystal_pillar', overlay(LEAGUE_FLOOR, CRYSTAL_PILLAR), { solid: true }),
  ],
};
