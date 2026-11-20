import { test } from 'node:test';
import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';
import { createCreature } from '../src/battle/logic/creature.js';
import { createRng } from '../src/engine/rng.js';
import {
  SAVE_VERSION, SaveError, chooseSave, formatPlayTime, migrateSave, parseSave, serializeSave, summarizeSave,
} from '../src/save/save-format.js';
import { addCreature, addItem, createGameState, markDaily, recordHallOfFame } from '../src/state/game-state.js';
import { DEFAULT_OPTIONS } from '../src/state/options.js';
import { storeCreature } from '../src/state/storage.js';

const require = createRequire(import.meta.url);
const { BACKUP_FILE, MAIN_FILE, readSave, writeSave } = require('../electron/save-store.js');
const STORE_PATH = path.join(path.dirname(fileURLToPath(import.meta.url)), '..', 'electron', 'save-store.js');

/** A state using every saved field. */
function completeState() {
  const rng = createRng(7);
  const state = createGameState({ player: { name: 'Lou', gender: 'girl' }, rival: { name: 'Nora' } });
  for (const [species, level] of [['fenouillot', 36], ['pivelin', 20], ['azurel', 70]]) addCreature(state, createCreature(species, level, rng));
  state.party[0].nickname = 'Fenou';
  state.party[1].status = 'poison';
  storeCreature(state.storage, createCreature('pivelin', 4, rng));
  state.storage.boxes[3].name = 'Favoris';
  state.daycare = { creature: createCreature('pivelin', 12, rng), levelAtDeposit: 10 };
  addItem(state, 'potion', 12);
  addItem(state, 'capsule', 30);
  state.money = 123456;
  state.badges = ['roche', 'eau'];
  state.flags = { has_bestiary: true, starter_fenouillot: true };
  state.bestiary.seen.braisille = true;
  state.position = { map: 'cendrelune', x: 12, y: 8, facing: 'left' };
  state.playTime = 3723.5;
  state.visitedTowns = ['bourg_sablon', 'cendrelune'];
  state.escapePoint = { map: 'route_3', x: 4, y: 5, facing: 'down' };
  state.lastHalte = { map: 'halte_cendrelune', x: 4, y: 6, facing: 'down' };
  state.repelSteps = 42;
  markDaily(state, 'revanche_garance', '2026-11-20');
  recordHallOfFame(state, '2026-11-20');
  return state;
}

const tempDirectory = () => fs.mkdtempSync(path.join(os.tmpdir(), 'bestiora-save-'));

// ---- Format ------------------------------------------------------------------------

test('save format: a complete state survives the round trip unchanged', () => {
  const state = completeState();
  const options = { ...DEFAULT_OPTIONS, palette: 'nuit', textSpeed: 'fast' };
  const json = serializeSave(state, { options, now: new Date('2026-11-20T10:00:00Z') });
  const loaded = parseSave(json);
  assert.deepEqual(loaded.state, state);
  assert.deepEqual(loaded.options, options);
  assert.equal(loaded.savedAt, '2026-11-20T10:00:00.000Z');
  assert.equal(JSON.parse(json).version, SAVE_VERSION);
  assert.equal(serializeSave(loaded.state, { options, now: new Date('2026-11-20T10:00:00Z') }), json);
});

test('save format: a version 1 save (interim browser save) is migrated', () => {
  const v1 = { ...completeState() }; // the whole state as JSON, no version, no options
  delete v1.daily;
  delete v1.hallOfFame;
  const loaded = parseSave(JSON.stringify(v1));
  assert.equal(loaded.state.player.name, 'Lou');
  assert.equal(loaded.state.party.length, 3);
  assert.deepEqual(loaded.state.daily, {}, 'fields added after v1 get their defaults');
  assert.deepEqual(loaded.state.hallOfFame, []);
  assert.equal(loaded.options, null);
  assert.equal(migrateSave({ version: 1 }).version, SAVE_VERSION);
});

test('save format: unreadable, incomplete or too recent saves are rejected', () => {
  assert.throws(() => parseSave('{"version":2,"play'), (error) => error instanceof SaveError && error.code === 'corrupt');
  assert.throws(() => parseSave('[]'), (error) => error.code === 'corrupt');
  assert.throws(() => parseSave('{"version":2}'), (error) => error.code === 'invalid');
  assert.throws(() => parseSave(JSON.stringify({ version: SAVE_VERSION + 1 })), (error) => error.code === 'too_recent');
});

test('save format: the backup is used when the main file is broken', () => {
  const good = serializeSave(completeState());
  assert.deepEqual(chooseSave({ main: null, backup: null }), { status: 'none' });
  assert.equal(chooseSave({ main: good, backup: null }).status, 'ok');
  assert.equal(chooseSave({ main: good.slice(0, 50), backup: good }).status, 'backup');
  assert.equal(chooseSave({ main: null, backup: good }).status, 'backup');
  const corrupt = chooseSave({ main: '{', backup: 'nope' });
  assert.equal(corrupt.status, 'corrupt');
  assert.ok(corrupt.error instanceof SaveError);
});

test('save format: summary of the SAUVER window', () => {
  assert.deepEqual(summarizeSave(completeState()), { name: 'Lou', badges: 2, caught: 3, playTime: '1:02' });
  assert.equal(formatPlayTime(0), '0:00');
  assert.equal(formatPlayTime(100 * 3600 + 59), '100:00');
});

// ---- Files (main process) ------------------------------------------------------------

test('save files: each write keeps the previous save as backup', () => {
  const directory = tempDirectory();
  assert.deepEqual(readSave(directory), { main: null, backup: null });
  writeSave(directory, '{"n":1}');
  writeSave(directory, '{"n":2}');
  assert.deepEqual(readSave(directory), { main: '{"n":2}', backup: '{"n":1}' });
  assert.throws(() => writeSave(directory, 'not json'));
  assert.equal(readSave(directory).main, '{"n":2}');
  assert.equal(fs.existsSync(path.join(directory, `${MAIN_FILE}.tmp`)), false);
});

test('save files: a broken main file never replaces a good backup', () => {
  const directory = tempDirectory();
  writeSave(directory, '{"n":1}');
  writeSave(directory, '{"n":2}');
  fs.writeFileSync(path.join(directory, MAIN_FILE), '{"n":', 'utf8');
  writeSave(directory, '{"n":3}');
  assert.deepEqual(readSave(directory), { main: '{"n":3}', backup: '{"n":1}' });
});

test('save files: a process killed during the write leaves a loadable save', () => {
  const directory = tempDirectory();
  const first = serializeSave(completeState());
  writeSave(directory, first);
  const second = serializeSave({ ...completeState(), money: 1 });
  // The child writes save.json.tmp, then is killed before the rename.
  const child = spawnSync(process.execPath, ['-e', `
    const { writeSave } = require(${JSON.stringify(STORE_PATH)});
    writeSave(${JSON.stringify(directory)}, process.argv[1], { beforeRename: () => process.kill(process.pid, 'SIGKILL') });
  `, second]);
  assert.notEqual(child.status, 0);
  assert.ok(fs.existsSync(path.join(directory, `${MAIN_FILE}.tmp`)));
  const result = chooseSave(readSave(directory));
  assert.equal(result.status, 'ok');
  assert.equal(result.save.state.money, 123456, 'the previous save is intact');
  assert.equal(fs.readFileSync(path.join(directory, BACKUP_FILE), 'utf8'), first);
  // The next save succeeds despite the leftover temporary file.
  writeSave(directory, second);
  assert.equal(chooseSave(readSave(directory)).save.state.money, 1);
});
