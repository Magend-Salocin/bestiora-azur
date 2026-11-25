import { test } from 'node:test';
import assert from 'node:assert/strict';
import { createRng } from '../src/engine/rng.js';
import { Ambience, bannerLines } from '../src/overworld/ambience.js';

const TREE = { id: 'tree_tl', wind: true, frames: 2 };
const GRASS = { id: 'tall_grass', grass: true, frames: 2 };
const GROUND = { id: 'grass', frames: 1 };

/** 20 × 20 map: a tree at (2, 2), water from row 10 down, ground elsewhere. */
function fakeMap(tileset = 'outdoor') {
  return {
    tileset,
    metatileAt: (x, y) => {
      if (x < 0 || y < 0 || x >= 20 || y >= 20) return null;
      if (x === 2 && y === 2) return TREE;
      if (y >= 10) return { id: 'water', water: true, frames: 2 };
      return GROUND;
    },
  };
}

const world = (map, extra = {}) => ({
  map, camera: { x: 0, y: 0 }, actors: [], busy: false, reduceFlashes: false, ...extra,
});

test('trees keep their still frame without wind, whatever the clock', () => {
  const ambience = new Ambience(createRng(1));
  assert.equal(ambience.tileStep(TREE, 2, 2, 5), 0);
  assert.equal(ambience.tileStep(GROUND, 0, 0, 5), 5);
});

test('a gust leans the trees and the grass inside its band only', () => {
  const ambience = new Ambience(createRng(1));
  ambience.gust = { from: 0, start: 0 };
  ambience.time = 48 / 120; // front at x = 48: the band covers x 8 to 48
  assert.equal(ambience.tileStep(TREE, 2, 2, 0), 1); // tree center x = 48
  assert.equal(ambience.tileStep(GRASS, 1, 0, 0), 1); // x = 24
  assert.equal(ambience.tileStep(GRASS, 5, 0, 0), 0); // x = 88, not reached yet
});

test('a rustling tree alternates its frames until the rustle ends', () => {
  const ambience = new Ambience(createRng(1));
  ambience.rustles.set('2,2', 0.5);
  const frames = [0.0, 0.13, 0.26, 0.39].map((time) => {
    ambience.time = time;
    return ambience.tileStep({ id: 'tree_br', wind: true }, 3, 3, 0);
  });
  assert.deepEqual(new Set(frames), new Set([0, 1]));
  ambience.time = 0.6;
  assert.equal(ambience.tileStep(TREE, 2, 2, 0), 0);
});

test('the ambience lives on outdoor maps: birds, leaves and water life appear', () => {
  const ambience = new Ambience(createRng(3));
  const map = fakeMap();
  const seen = new Set();
  for (let frame = 0; frame < 60 * 60; frame += 1) {
    ambience.update(1 / 60, world(map, { camera: { x: 0, y: 40 } }));
    ambience.effects.forEach((effect) => seen.add(effect.kind));
  }
  for (const kind of ['bird', 'leaf', 'fish', 'glint', 'dragonfly']) assert.ok(seen.has(kind), kind);
  assert.ok(ambience.effects.length <= 60);
});

test('no sky life indoors, no glints with reduced flashes', () => {
  const ambience = new Ambience(createRng(3));
  const seen = new Set();
  for (let frame = 0; frame < 60 * 30; frame += 1) {
    ambience.update(1 / 60, world(fakeMap('cave'), { reduceFlashes: true }));
    ambience.effects.forEach((effect) => seen.add(effect.kind));
  }
  assert.ok(!seen.has('bird') && !seen.has('leaf') && !seen.has('glint'));
  assert.ok(seen.has('drip'));
});

test('idle NPCs on screen get mood bubbles, which vanish while the game is busy', () => {
  const ambience = new Ambience(createRng(5));
  const npc = { x: 3, y: 3, visible: true, movement: null };
  const trainer = { x: 4, y: 3, visible: true, movement: null, trainerId: 'x' };
  for (let frame = 0; frame < 60 * 10; frame += 1) ambience.update(1 / 60, world(fakeMap(), { actors: [npc, trainer] }));
  assert.ok(!ambience.bubbles.has(trainer));
  ambience.bubbles.set(npc, { icon: 'dots', age: 0 });
  ambience.update(1 / 60, world(fakeMap(), { actors: [npc], busy: true }));
  assert.equal(ambience.bubbles.size, 0);
});

test('long place names are split in two lines near the middle', () => {
  assert.deepEqual(bannerLines('Cendrelune'), ['Cendrelune']);
  assert.deepEqual(bannerLines('Arène de Forge-Ardente'), ['Arène de', 'Forge-Ardente']);
  assert.deepEqual(bannerLines('Tour de la Mémoire 2F'), ['Tour de la', 'Mémoire 2F']);
});
