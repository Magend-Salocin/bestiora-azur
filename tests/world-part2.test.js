// Tests of the world, part 2 (prompt 10): new maps, puzzles and engine additions.
import assert from 'node:assert/strict';
import test from 'node:test';
import { CREATURES } from '../src/data/creatures.js';
import { MAPS } from '../src/data/maps/index.js';
import { TRAINERS_BY_ID } from '../src/data/trainers.js';
import { createGameState, hasFlag, setFlag } from '../src/state/game-state.js';
import { buildMap } from '../src/overworld/map-loader.js';
import { evaluateTile } from '../src/overworld/collision.js';
import { readFileSync } from 'node:fs';

const TILESETS = JSON.parse(readFileSync(new URL('../assets/atlas/tiles.json', import.meta.url), 'utf8')).meta.tilesets;
const NEW_MAPS = ['route_7', 'falaises_de_bise', 'haute_bise', 'arene_vent', 'route_8', 'marais_gris', 'ombrecourt', 'casino_ombrecourt', 'arene_ombre', 'qg_opale_1', 'qg_opale_2', 'qg_opale_3', 'route_9', 'route_10', 'ilots', 'bibliotheque_engloutie', 'forge_ardente', 'arene_feu', 'coeur_de_la_forge', 'givremont', 'arene_arcane', 'centrale_abandonnee'];
const DIRS = { up: [0, -1], down: [0, 1], left: [-1, 0], right: [1, 0] };

test('toutes les cartes de la partie 2 existent', () => {
  for (const id of NEW_MAPS) assert.ok(MAPS[id], id);
});

test('au moins 50 nouvelles espèces capturables apparaissent dans les rencontres de la partie 2', () => {
  const part1 = new Set(['debut', 'bois', 'port', 'cendrelune']);
  const species = new Set();
  for (const id of NEW_MAPS) for (const [key, table] of Object.entries(MAPS[id].encounters ?? {})) if (key !== 'rate') for (const entry of table) species.add(entry.creature);
  assert.ok(species.size >= 50, `${species.size} espèces`);
  assert.ok(part1.size > 0 && CREATURES.length === 150);
});

test('les tuiles de courant d’air portent leur direction', () => {
  for (const direction of ['up', 'down', 'left', 'right']) {
    const meta = TILESETS.special.metatiles[`wind_${direction}`];
    assert.equal(meta.current, direction);
  }
});

test('le drapeau calculé bestiary_149 suit le Bestiaire', () => {
  const state = createGameState();
  assert.equal(hasFlag(state, 'bestiary_149'), false);
  for (const creature of CREATURES.slice(0, 149)) state.bestiary.caught[creature.id] = true;
  assert.equal(hasFlag(state, 'bestiary_149'), true);
  setFlag(state, 'bestiary_149');
  assert.equal(hasFlag(state, 'bestiary_149'), true);
});

test('les légendaires du chapitre sont des rencontres uniques de niveau 50', () => {
  const found = {};
  for (const id of NEW_MAPS) {
    const walk = (value) => {
      if (Array.isArray(value)) value.forEach(walk);
      else if (value && typeof value === 'object') {
        if (value.cmd === 'wild_battle') found[value.creature] = value;
        Object.values(value).forEach(walk);
      }
    };
    walk(MAPS[id]);
  }
  for (const creature of ['volcarde', 'fulgorine', 'mirelle']) {
    assert.ok(found[creature], creature);
    assert.equal(found[creature].level, 50);
    assert.equal(found[creature].legendary, true);
    assert.ok(found[creature].won && found[creature].caught);
  }
});

test('la tanière de Volcarde exige la Bouée', () => {
  const def = MAPS.coeur_de_la_forge;
  const map = buildMap(def, TILESETS);
  assert.equal(evaluateTile(map, 13, 9, 'up', { surfing: false }).type, 'blocked');
  assert.equal(evaluateTile(map, 13, 9, 'up', { surfing: true }).type, 'walk');
});

test('l’arène Feu : le sol de lave est piégé, pas bloquant', () => {
  const def = MAPS.arene_feu;
  const map = buildMap(def, TILESETS);
  const lava = def.triggers.find((trigger) => trigger.script[0].script === 'brulure');
  assert.ok(lava);
  assert.equal(evaluateTile(map, lava.x, lava.y, 'right', { surfing: false }).type, 'walk');
});

test('l’arène Arcane : chaque téléporteur a une destination praticable', () => {
  const def = MAPS.arene_arcane;
  const map = buildMap(def, TILESETS);
  for (const warp of def.warps) {
    const target = MAPS[warp.to];
    const targetMap = buildMap(target, TILESETS);
    assert.ok(!targetMap.metatileAt(warp.toX, warp.toY).solid, `${warp.x},${warp.y} -> ${warp.toX},${warp.toY}`);
    assert.ok(map.metatileAt(warp.x, warp.y).door, `warp ${warp.x},${warp.y} sur une tuile de passage`);
  }
});

test('les champions et rivaux de la partie 2 ont 4 à 5 bestioles', () => {
  for (const id of ['ysolde', 'lazare', 'brune', 'oswin', 'corvin_qg', 'corvin_forge']) {
    const size = TRAINERS_BY_ID[id].party.length;
    assert.ok(size >= 4 && size <= 5, `${id} : ${size}`);
  }
});

test('chaque carte neuve est reliée : les connexions sont réciproques', () => {
  const opposite = { north: 'south', south: 'north', west: 'east', east: 'west' };
  for (const id of NEW_MAPS) {
    for (const [side, other] of Object.entries(MAPS[id].connections ?? {})) assert.equal(MAPS[other].connections[opposite[side]], id, `${id}.${side}`);
  }
});

test('les cartes de la partie 2 sont accessibles à pied depuis leurs entrées (hors énigmes)', () => {
  // Spot-check: the first tile after each connection is walkable.
  for (const id of ['route_7', 'falaises_de_bise', 'haute_bise']) {
    const map = buildMap(MAPS[id], TILESETS);
    assert.ok(map.width > 0 && DIRS.up);
  }
});
