import { test } from 'node:test';
import assert from 'node:assert/strict';
import { outlineLightEdges, quantize, removeIsolated } from '../tools/import-portrait.js';

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
