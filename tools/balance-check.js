// npm run balance [-- --runs 200 --seed 1 --only garance]
// Simulates each champion and rival battle against an "expected player" team (starter + 2 captures
// of the zones visited before, at the typical level) and prints the player's win rate.
// Targets: champions 55-75 %, rivals 60-80 %, champion rematches 55-75 %. The League is simulated as
// one run (4 Guardians then the Master, no Halte) with an expected team of 6 at level 55: between
// rooms the player heals and revives with items bought at the Citadelle, but PP are never restored
// (no Halte, Elixirs not modelled). Target 45-65 % of full runs won.
// Exit code 1 when a battle is out of its target.
import { CREATURES_BY_ID } from '../src/data/creatures.js';
import { TRAINERS_BY_ID, trainerParty } from '../src/data/trainers.js';
import { TRAINER_CLASSES_BY_ID } from '../src/data/trainer-classes.js';
import { chooseAction, chooseReplacement } from '../src/battle/logic/ai.js';
import { createCreature } from '../src/battle/logic/creature.js';
import { answerLearnMove, chooseSwitch, createBattle, currentPending, resolveTurn } from '../src/battle/logic/engine.js';
import { pathToFileURL } from 'node:url';
import { createRng } from '../src/engine/rng.js';

const STARTERS = ['fenouillot', 'braisille', 'flaquin'];
const REMATCHES = ['garance', 'mael', 'selene', 'aubin', 'ysolde', 'lazare', 'brune', 'oswin'].map((id) => `${id}_revanche`);
/** Expected team for the League: starter 55 and 5 captures of the late zones. */
const LEAGUE_TEAM = ['girouette:54', 'brumaitre:54', 'cabrecime:54', 'amperion:54', 'salamassif:54'];
const LEAGUE_OPPONENTS = ['gardien_metal', 'gardienne_combat', 'gardien_givre', 'gardienne_terre', 'rival_maitre'];
/** Champion rematches: the League team, a few levels later. */
const POST_GAME_CAPTURES = ['girouette:59', 'brumaitre:59', 'cabrecime:59', 'amperion:59', 'salamassif:59'];
const MAX_TURNS = 200;
const TARGETS = { champion: [55, 75], rival: [60, 80], ligue: [45, 65] };

/**
 * Expected player team before each battle: starter level and the captures of the zones
 * already crossed ('espèce:niveau', evolved by level automatically).
 */
export const MATCHUPS = [
  { trainer: 'rival_1', starterLevel: 5, captures: [], playerAi: 'basic' },
  { trainer: 'garance', starterLevel: 12, captures: ['pivelin:10', 'morillon:10'] },
  { trainer: 'rival_2', starterLevel: 14, captures: ['pivelin:12', 'faonille:12'] },
  { trainer: 'mael', starterLevel: 20, captures: ['grivelin:18', 'faonille:17'] },
  { trainer: 'selene', starterLevel: 25, captures: ['fouisseron:23', 'lapugil:23'] },
  { trainer: 'aubin', starterLevel: 30, captures: ['fumelard:28', 'noctulard:28'] },
  { trainer: 'rival_3', starterLevel: 29, captures: ['fumelard:27', 'noctulard:27'] },
  { trainer: 'rival_4', starterLevel: 34, captures: ['volplanin:31', 'noctulard:31'] },
  { trainer: 'ysolde', starterLevel: 36, captures: ['girouette:33', 'nuageot:33'] },
  { trainer: 'rival_5', starterLevel: 41, captures: ['fumelard:39', 'noctulard:39'] },
  { trainer: 'lazare', starterLevel: 40, captures: ['sombrecor:37', 'fumelard:37'] },
  { trainer: 'corvin_qg', starterLevel: 42, captures: ['chafourbe:40', 'lustrombre:40'] },
  { trainer: 'brune', starterLevel: 44, captures: ['girouette:42', 'sombrecor:42'] },
  { trainer: 'corvin_forge', starterLevel: 46, captures: ['fusiblard:44', 'lustrombre:44'] },
  { trainer: 'oswin', starterLevel: 49, captures: ['miroitage:47', 'brumaitre:47'] },
  { trainer: 'rival_6', starterLevel: 50, captures: ['brumaitre:48', 'cabrecime:48'] },
  ...LEAGUE_OPPONENTS.map((trainer) => ({ trainer, starterLevel: 55, captures: LEAGUE_TEAM, category: 'salle' })),
  ...REMATCHES.map((trainer) => ({ trainer, starterLevel: 60, captures: POST_GAME_CAPTURES })),
];

export const LEAGUE_RUN = {
  trainers: LEAGUE_OPPONENTS,
  starterLevel: 55,
  captures: LEAGUE_TEAM,
};

function parseArgs(argv) {
  const args = { runs: 200, seed: 1, only: null };
  for (let i = 0; i < argv.length; i += 2) args[argv[i].replace(/^--/, '')] = argv[i + 1];
  return { runs: Number(args.runs), seed: Number(args.seed), only: args.only };
}

/** Species reached by level-up evolutions at `level`. */
export function speciesAtLevel(speciesId, level) {
  let current = speciesId;
  for (;;) {
    const evolutions = [CREATURES_BY_ID[current].evolution ?? []].flat();
    const next = evolutions.find((evolution) => evolution.method === 'level' && evolution.value <= level);
    if (!next) return current;
    current = next.to;
  }
}

function playerTeam(matchup, starter, rng) {
  const specs = [`${starter}:${matchup.starterLevel}`, ...matchup.captures];
  return specs.map((spec) => {
    const [species, level] = spec.split(':');
    return createCreature(speciesAtLevel(species, Number(level)), Number(level), rng);
  });
}

/** One battle; returns the final battle state (player party in state.sides[0].party). */
function battle(trainer, starter, playerParty, matchup, rng) {
  const enemyParty = trainerParty(trainer, starter).map((member) => createCreature(member.creature, member.level, rng, { moves: member.moves }));
  let state = createBattle({
    kind: 'trainer',
    playerParty,
    enemyParty,
    trainer: { id: trainer.id, class: trainer.class, name: trainer.name, moneyBase: 0, ai: trainer.ai },
  });
  while (!state.outcome && state.turn < MAX_TURNS) {
    const pending = currentPending(state);
    if (pending?.type === 'need_switch') state = chooseSwitch(state, chooseReplacement(state, 0)).state;
    else if (pending?.type === 'learn_move') state = answerLearnMove(state, null).state;
    else state = resolveTurn(state, chooseAction(state, 0, rng, matchup.playerAi ?? 'smart'), chooseAction(state, 1, rng), rng).state;
  }
  return state;
}

/** One battle; returns true when the player wins. */
export function simulate(trainer, starter, matchup, rng) {
  return battle(trainer, starter, playerTeam(matchup, starter, rng), matchup, rng).outcome === 'win';
}

/** Whole League run; returns the number of battles won before the first loss (5 = champion). */
export function simulateLeague(starter, rng) {
  let party = playerTeam(LEAGUE_RUN, starter, rng);
  let won = 0;
  for (const id of LEAGUE_RUN.trainers) {
    const state = battle(TRAINERS_BY_ID[id], starter, party, LEAGUE_RUN, rng);
    if (state.outcome !== 'win') break;
    won += 1;
    party = useItemsBetweenRooms(state.sides[0].party);
  }
  return won;
}

/** Items between rooms: every creature revived and healed, status cured; PP stay as they are. */
function useItemsBetweenRooms(party) {
  for (const creature of party) {
    creature.status = null;
    creature.hp = creature.stats.hp;
  }
  return party;
}

function runLeague({ runs, seed }) {
  const rng = createRng(seed);
  const reached = STARTERS.map((starter) => {
    const counts = Array(LEAGUE_RUN.trainers.length + 1).fill(0);
    for (let i = 0; i < runs; i += 1) counts[simulateLeague(starter, rng)] += 1;
    return counts;
  });
  const rates = reached.map((counts) => Math.round((counts.at(-1) * 100) / runs));
  const average = Math.round(rates.reduce((sum, rate) => sum + rate, 0) / rates.length);
  const [low, high] = TARGETS.ligue;
  const ok = average >= low && average <= high;
  const detail = STARTERS.map((starter, index) => `${starter} ${String(rates[index]).padStart(3)} %`).join('  ');
  console.log(`${ok ? 'OK ' : 'KO '} ${'ligue'.padEnd(8)} ${'Ligue complète'.padEnd(20)} ${String(average).padStart(3)} % (cible ${low}-${high})  ${detail}`);
  // Where runs stop: share of runs beaten by each opponent, all starters together.
  const stops = LEAGUE_RUN.trainers.map((id, index) => {
    const lost = reached.reduce((sum, counts) => sum + counts[index], 0);
    return `${id} ${Math.round((lost * 100) / (runs * STARTERS.length))} %`;
  });
  console.log(`    défaites : ${stops.join(', ')}`);
  return ok ? 0 : 1;
}

function category(trainer) {
  return trainer.class === 'rival' ? 'rival' : 'champion';
}

function run({ runs, seed, only }) {
  let failures = 0;
  for (const matchup of MATCHUPS) {
    if (only && matchup.trainer !== only) continue;
    const trainer = TRAINERS_BY_ID[matchup.trainer];
    if (!trainer) {
      console.log(`${matchup.trainer.padEnd(10)} absent de src/data/trainers.js`);
      continue;
    }
    const rng = createRng(seed);
    const rates = STARTERS.map((starter) => {
      let wins = 0;
      for (let i = 0; i < runs; i += 1) if (simulate(trainer, starter, matchup, rng)) wins += 1;
      return Math.round((wins * 100) / runs);
    });
    const average = Math.round(rates.reduce((sum, rate) => sum + rate, 0) / rates.length);
    const target = TARGETS[matchup.category ?? category(trainer)];
    const [low, high] = target ?? [0, 100];
    const ok = average >= low && average <= high;
    if (!ok) failures += 1;
    const name = `${TRAINER_CLASSES_BY_ID[trainer.class]?.name ?? ''} ${trainer.name || 'Rivale'}`.trim();
    const detail = STARTERS.map((starter, index) => `${starter} ${String(rates[index]).padStart(3)} %`).join('  ');
    console.log(`${ok ? 'OK ' : 'KO '} ${matchup.trainer.padEnd(8)} ${name.padEnd(20)} ${String(average).padStart(3)} % ${target ? `(cible ${low}-${high})` : '(seul, sans cible)'}  ${detail}`);
  }
  return failures;
}

if (import.meta.url === pathToFileURL(process.argv[1]).href) {
  const args = parseArgs(process.argv.slice(2));
  const failures = run(args) + (!args.only || args.only === 'ligue' ? runLeague(args) : 0);
  process.exitCode = failures > 0 ? 1 : 0;
}
