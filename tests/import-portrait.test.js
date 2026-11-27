import { test } from 'node:test';
import assert from 'node:assert/strict';
import { figureColumns, gridCell, outlineLightEdges, quantize, removeIsolated, removeStrayIslands } from '../tools/import-portrait.js';

const cells = (rows) => rows.map((row) => [...row]);
const text = (grid) => grid.map((row) => row.join(''));

test('quantize maps the darkest luminance to tone 3 and the background to "."', () => {
  const grid = [[null, 10, 90], [160, 240, null]];
  assert.deepEqual(text(quantize(grid)), ['.32', '10.']);
});

test('removeIsolated replaces a lone pixel by the tone of its neighbours', () => {
  assert.deepEqual(text(removeIsolated(cells(['222', '232', '222']))), ['222', '222', '222']);
  assert.deepEqual(text(removeIsolated(cells(['212', '232', '202']))), ['212', '232', '202']);
});

test('outlineLightEdges darkens light pixels on the silhouette edge, softer on the lit side', () => {
  assert.deepEqual(text(outlineLightEdges(cells(['....', '.00.', '.00.', '....']))), ['....', '.12.', '.22.', '....']);
  assert.deepEqual(text(outlineLightEdges(cells(['333', '303', '333']))), ['333', '303', '333']);
});

test('removeStrayIslands clears the small islands away from the figure', () => {
  const grid = cells(['2.....', '2..33.', '...33.', '...33.', '...33.', '......']);
  assert.deepEqual(text(removeStrayIslands(grid, 0.5)), ['......', '...33.', '...33.', '...33.', '...33.', '......']);
});

test('gridCell: square from the top of the figure, the neighbouring cell filled with background', () => {
  // Two cells of 10 × 30 px: a dark bust x 2-7, y 10-29 in cell 1; the neighbour starts at x 10.
  const width = 20;
  const height = 30;
  const data = Buffer.alloc(width * height * 4, 255);
  for (let y = 0; y < height; y += 1) {
    for (let x = 0; x < width; x += 1) {
      if ((x >= 2 && x < 8 && y >= 10) || (x >= 10 && x < 14)) data.set([0, 0, 0, 255], (y * width + x) * 4);
    }
  }
  const cell = gridCell({ width, height, data }, { index: 1, count: 2, columns: 2 });
  const darkColumns = new Set();
  for (let y = 0; y < cell.height; y += 1) {
    for (let x = 0; x < cell.width; x += 1) if (cell.data[(y * cell.width + x) * 4] === 0) darkColumns.add(x);
  }
  assert.equal(cell.width, 14); // 1.4 × the cell width, wider than the cell
  assert.equal(cell.height, 14);
  assert.equal(cell.data[(3 * 14 + 7) * 4], 0, 'the bust starts 3 px below the top');
  assert.deepEqual([...darkColumns].sort((a, b) => a - b), [4, 5, 6, 7, 8, 9], 'the neighbour is background');
});

test('figureColumns cuts an uneven row at the valleys between the figures', () => {
  // Three figures on a 30 px row: x 1-6, 9-19 (wide), 22-28; x 20-21 is a thin touching bridge.
  const figure = (x) => (x >= 1 && x < 7) || (x >= 9 && x < 20) || (x >= 22 && x < 29);
  const isFigure = (x, y) => figure(x) || ((x === 20 || x === 21) && y === 0);
  assert.deepEqual(figureColumns(30, 0, 10, 3, isFigure), [[1, 7], [7, 20], [20, 29]]);
});
