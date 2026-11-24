// Tests of the world, part 3 (prompt 11): Col des Échos, League, end of the game and post-game.
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';
import { CREATURES } from '../src/data/creatures.js';
import { MAPS } from '../src/data/maps/index.js';
import { SCRIPTS } from '../src/data/scripts.js';
import { CREDITS_AUTHOR } from '../src/data/texts/credits.js';
import { STARTERS } from '../src/data/trainers/helpers.js';
import { TRAINERS_BY_ID, trainerParty } from '../src/data/trainers.js';
import { hasGlyph } from '../src/gfx/font.js';
import { evaluateTile } from '../src/overworld/collision.js';
import { buildMap } from '../src/overworld/map-loader.js';
import { createScriptRunner } from '../src/overworld/script-runner.js';
import { createGameState, hasFlag, recordHallOfFame } from '../src/state/game-state.js';
import { creditLines, creditPlaces } from '../src/ui/ending-screens.js';
import { checkObtainability, computeObtainable } from '../tools/validators/obtainability.js';

const TILESETS = JSON.parse(readFileSync(new URL('../assets/atlas/tiles.json', import.meta.url), 'utf8')).meta.tilesets;
const NEW_MAPS = [
  'col_des_echos', 'grotte_des_echos', 'citadelle_azur', 'halte_citadelle', 'comptoir_citadelle', 'ligue_salle_1', 'ligue_salle_2',
  'ligue_salle_3', 'ligue_salle_4', 'ligue_maitre', 'salle_honneur', 'pic_d_azur', 'grotte_boreale',
];
const DIRS = { up: [0, -1], down: [0, 1], left: [-1, 0], right: [1, 0] };
const CHAMPIONS = ['garance', 'mael', 'selene', 'aubin', 'ysolde', 'lazare', 'brune', 'oswin'];
const GUARDIANS = ['gardien_metal', 'gardienne_combat', 'gardien_givre', 'gardienne_terre'];

/** Tiles reachable on foot from `start`; `grapple` lets the player climb grapple ledges. */
function reachable(mapId, start, { grapple = false } = {}) {
  const map = buildMap(MAPS[mapId], TILESETS);
  const seen = new Set([`${start[0]},${start[1]}`]);
  const queue = [start];
  while (queue.length) {
    const [x, y] = queue.shift();
    for (const [direction, [dx, dy]] of Object.entries(DIRS)) {
      const [nx, ny] = [x + dx, y + dy];
      if (!map.inBounds(nx, ny)) continue;
      let target = null;
      if (map.metatileAt(nx, ny).climbable) {
        if (grapple && evaluateTile(map, nx + dx, ny + dy, direction).type === 'walk') target = [nx + dx, ny + dy];
      } else {
        const result = evaluateTile(map, nx, ny, direction);
        if (result.type === 'walk') target = [nx, ny];
        else if (result.type === 'jump') target = [result.x, result.y];
      }
      if (target && !seen.has(`${target[0]},${target[1]}`)) {
        seen.add(`${target[0]},${target[1]}`);
        queue.push(target);
      }
    }
  }
  return seen;
}

/** Fake overworld for the script runner: records calls, answers questions from a list. */
function fakeContext({ answers = [], outcomes = [], day = '2026-11-20' } = {}) {
  const log = [];
  const ctx = {
    state: createGameState(),
    log,
    today: () => day,
    say: async (text) => { log.push(`say:${text}`); },
    ask: async (text) => { log.push(`ask:${text}`); return answers.shift(); },
    battle: async (trainer) => { log.push(`battle:${trainer}`); return outcomes.shift() ?? 'win'; },
    blackout: async () => { log.push('blackout'); },
    warp: async (map) => { log.push(`warp:${map}`); },
    openMenu: async (menu) => { log.push(`menu:${menu}`); },
    autosave: async () => { log.push('autosave'); },
    getScript: (name) => SCRIPTS[name],
    fade: async () => {},
    healParty: () => log.push('heal'),
    playSfx: () => {},
  };
  return ctx;
}

const levels = (party) => party.map((member) => member.level);

test('toutes les cartes de la partie 3 existent', () => {
  for (const id of NEW_MAPS) assert.ok(MAPS[id], id);
});

test('Givremont mène au Col des Échos, la Citadelle au Pic d’Azur (connexions réciproques)', () => {
  assert.equal(MAPS.givremont.connections.north, 'col_des_echos');
  assert.equal(MAPS.col_des_echos.connections.south, 'givremont');
  assert.equal(MAPS.citadelle_azur.connections.east, 'pic_d_azur');
  assert.equal(MAPS.pic_d_azur.connections.west, 'citadelle_azur');
  assert.ok(!MAPS.givremont.npcs.some((npc) => npc.id.startsWith('garde_col')), 'les gardes du col sont retirés');
});

test('la Grotte Boréale s’ouvre depuis Givremont avec le Grappin seulement', () => {
  const entrance = MAPS.givremont.warps.find((warp) => warp.to === 'grotte_boreale');
  assert.ok(entrance);
  const start = [MAPS.givremont.flyPoint.x, MAPS.givremont.flyPoint.y];
  assert.equal(reachable('givremont', start).has(`${entrance.x},${entrance.y}`), false);
  assert.equal(reachable('givremont', start, { grapple: true }).has(`${entrance.x},${entrance.y}`), true);
  const back = MAPS.grotte_boreale.warps.find((warp) => warp.to === 'givremont');
  assert.deepEqual([back.toX, back.toY], [entrance.x, entrance.y]);
});

test('la Ligue est à sens unique et sans Fil d’Ariane', () => {
  for (const id of ['ligue_salle_1', 'ligue_salle_2', 'ligue_salle_3', 'ligue_salle_4', 'ligue_maitre', 'salle_honneur']) {
    assert.equal(MAPS[id].league, true, id);
    for (const warp of MAPS[id].warps ?? []) assert.ok(/^ligue_(salle_\d|maitre)$/.test(warp.to), `${id} → ${warp.to}`);
  }
  assert.equal(MAPS.ligue_maitre.warps.length, 0);
});

test('Gardiens : 5 bestioles de niveau 52 à 58, IA smart ; Maître : 6 bestioles de 58 à 62 par starter', () => {
  for (const id of GUARDIANS) {
    const trainer = TRAINERS_BY_ID[id];
    assert.equal(trainer.party.length, 5, id);
    assert.ok(levels(trainer.party).every((level) => level >= 52 && level <= 58), id);
    assert.equal(trainer.ai ?? 'smart', 'smart', id);
  }
  const master = TRAINERS_BY_ID.rival_maitre;
  assert.equal(master.ai, 'smart');
  for (const starter of STARTERS) {
    const party = trainerParty(master, starter);
    assert.equal(party.length, 6, starter);
    assert.ok(levels(party).every((level) => level >= 58 && level <= 62), starter);
  }
});

test('revanches : champions de 60 à 66, Ligue rejouée de 65 à 72', () => {
  for (const id of CHAMPIONS) {
    const trainer = TRAINERS_BY_ID[`${id}_revanche`];
    assert.ok(levels(trainer.party).every((level) => level >= 60 && level <= 66), id);
  }
  for (const id of [...GUARDIANS.map((guardian) => `${guardian}_plus`), 'rival_maitre_plus']) {
    for (const starter of STARTERS) {
      assert.ok(levels(trainerParty(TRAINERS_BY_ID[id], starter)).every((level) => level >= 65 && level <= 72), `${id} ${starter}`);
    }
  }
});

test('chaque arène propose la revanche de son champion', () => {
  const arenas = Object.values(MAPS).filter((map) => /^arene_/.test(map.id));
  const called = new Set(arenas.flatMap((map) => JSON.stringify(map.scripts).match(/revanche_[a-z]+/g) ?? []));
  for (const id of CHAMPIONS) assert.ok(called.has(`revanche_${id}`), id);
});

test('revanche : rien avant la Ligue, puis une seule par jour, comptée seulement si gagnée', async () => {
  const before = fakeContext();
  await createScriptRunner(before).run(SCRIPTS.revanche_garance);
  assert.deepEqual(before.log, ['say:garance_after']);

  const lost = fakeContext({ answers: [true], outcomes: ['lose'] });
  lost.state.flags.ligue_terminee = true;
  await createScriptRunner(lost).run(SCRIPTS.revanche_garance);
  assert.ok(lost.log.includes('blackout'));
  assert.deepEqual(lost.state.daily, {});

  const won = fakeContext({ answers: [true] });
  won.state.flags.ligue_terminee = true;
  await createScriptRunner(won).run(SCRIPTS.revanche_garance);
  assert.ok(won.log.includes('battle:garance_revanche'));
  assert.equal(won.state.daily.revanche_garance, '2026-11-20');
  won.log.length = 0;
  await createScriptRunner(won).run(SCRIPTS.revanche_garance);
  assert.ok(won.log.includes('say:revanche_deja'));

  won.today = () => '2026-11-21';
  won.log.length = 0;
  await createScriptRunner(won).run(SCRIPTS.revanche_garance);
  assert.ok(won.log.includes('ask:revanche_ask'));
});

test('fin de la Ligue : Salle d’honneur, crédits, puis sauvegarde à la maison seulement', async () => {
  const ctx = fakeContext();
  ctx.getScript = (name) => MAPS.ligue_maitre.scripts[name];
  ctx.state.flags.volcarde_ko = true;
  await createScriptRunner(ctx).run(MAPS.ligue_maitre.scripts.fin);
  const order = ctx.log.filter((entry) => /^(warp|menu|autosave)/.test(entry));
  assert.deepEqual(order, ['warp:salle_honneur', 'menu:hall_of_fame', 'menu:credits', 'warp:maison_joueur_2f', 'autosave']);
  assert.equal(hasFlag(ctx.state, 'ligue_terminee'), true);
  assert.equal(hasFlag(ctx.state, 'volcarde_ko'), false, 'Volcarde revient après la Ligue');

  const replay = fakeContext();
  replay.getScript = ctx.getScript;
  replay.state.flags.ligue_terminee = true;
  await createScriptRunner(replay).run(MAPS.ligue_maitre.scripts.fin);
  assert.ok(!replay.log.includes('menu:credits'));
  assert.equal(replay.log.filter((entry) => entry.startsWith('warp')).at(-1), 'warp:citadelle_azur');
});

test('entrer dans la Ligue remet à zéro les salles et la cinématique du Maître', () => {
  const cleared = MAPS.citadelle_azur.scripts.entrer_ligue[1].yes.filter((command) => command.cmd === 'clear_flag').map((command) => command.flag);
  for (const flag of ['ligue_g1', 'ligue_g2', 'ligue_g3', 'ligue_g4', 'ligue_maitre_vaincu', 'ligue_morvan_visible']) assert.ok(cleared.includes(flag), flag);
});

test('la Salle d’honneur enregistre l’équipe', () => {
  const state = createGameState({ party: [{ species: 'galtzagor', nickname: null, level: 58 }, { species: 'blancelune', nickname: 'Ombre', level: 55 }] });
  const entry = recordHallOfFame(state, '2026-11-20');
  assert.deepEqual(entry.team, [{ species: 'galtzagor', name: null, level: 58 }, { species: 'blancelune', name: 'Ombre', level: 55 }]);
  assert.equal(state.hallOfFame.length, 1);
});

test('crédits : auteur générique, noms des sauvegardes, caractères affichables, lieux visités', () => {
  const state = createGameState({ visitedTowns: ['hameau_de_lys', 'givremont'] });
  const lines = creditLines(state);
  assert.ok(lines.includes(CREDITS_AUTHOR));
  assert.ok(lines.includes(state.rival.name));
  for (const line of lines) {
    assert.ok(Array.from(line).length <= 18, line);
    for (const character of line) assert.ok(character === ' ' || hasGlyph(character), `« ${character} » dans « ${line} »`);
  }
  assert.deepEqual(creditPlaces(state), ['hameau_de_lys', 'givremont']);
  assert.ok(creditPlaces(createGameState()).length > 0);
});

test('diplôme : drapeau calculé bestiary_150 et script de la Pr Morvan', () => {
  const state = createGameState();
  for (const creature of CREATURES.slice(0, 149)) state.bestiary.caught[creature.id] = true;
  assert.equal(hasFlag(state, 'bestiary_150'), false);
  state.bestiary.caught[CREATURES[149].id] = true;
  assert.equal(hasFlag(state, 'bestiary_150'), true);
  assert.ok(JSON.stringify(MAPS.labo_morvan.scripts.professeure).includes('"menu":"diploma"'));
});

test('les 150 espèces sont obtenables pour chaque starter, et l’outil détecte un manque', () => {
  assert.deepEqual(checkObtainability(MAPS, SCRIPTS, CREATURES), []);
  const without = Object.fromEntries(Object.entries(MAPS).map(([id, map]) => [id, id === 'grotte_boreale' ? { ...map, scripts: {} } : map]));
  const { missing } = computeObtainable(without, SCRIPTS, CREATURES, 'galtza');
  assert.deepEqual(missing, ['gaussier']);
});

test('les légendaires du post-jeu : Azurel niveau 70, Glacerne niveau 60', () => {
  const battles = {};
  const walk = (value) => {
    if (Array.isArray(value)) value.forEach(walk);
    else if (value && typeof value === 'object') {
      if (value.cmd === 'wild_battle') battles[value.creature] = value;
      Object.values(value).forEach(walk);
    }
  };
  walk([MAPS.pic_d_azur, MAPS.grotte_boreale]);
  assert.equal(battles.vouivre.level, 70);
  assert.equal(battles.gaussier.level, 60);
  assert.ok(battles.vouivre.legendary && battles.gaussier.legendary);
});
