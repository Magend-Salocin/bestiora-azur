// Obtainability: every species can be had in a single playthrough, whatever the starter, by
// capture (wild tables, scripted wild battles), gift, NPC trade or evolution.
// Scripts are walked with the starter known: `if_flag starter_<x>` follows the matching branch.
import { STARTERS } from '../../src/data/trainers/helpers.js';

export const LEGENDARIES = ['volcarde', 'fulgorine', 'glacerne', 'azurel'];
export const MYTHICAL = 'mirelle';
/** Flags that gate a source behind a late condition (reported, not blocking). */
const CONDITION_FLAGS = ['bestiary_149', 'bestiary_150'];

function scriptsOf(map, globalScripts) {
  const lists = [];
  const gatedNames = new Set();
  for (const entry of [...(map.npcs ?? []), ...(map.triggers ?? [])]) {
    const condition = CONDITION_FLAGS.includes(entry.showIf) ? entry.showIf : null;
    if (Array.isArray(entry.script)) lists.push({ commands: entry.script, condition });
    else if (typeof entry.script === 'string' && condition) {
      gatedNames.add(entry.script);
      lists.push({ commands: map.scripts?.[entry.script] ?? globalScripts[entry.script], condition });
    }
  }
  for (const [name, commands] of Object.entries(map.scripts ?? {})) if (!gatedNames.has(name)) lists.push({ commands, condition: null });
  return lists;
}

/** Calls visit(command, condition) on every command reachable for this starter. */
function walk(commands, starter, condition, visit) {
  for (const command of commands ?? []) {
    visit(command, condition);
    const starterFlag = command.cmd === 'if_flag' && command.flag.startsWith('starter_') ? command.flag.slice(8) : null;
    const gate = command.cmd === 'if_flag' && CONDITION_FLAGS.includes(command.flag) ? command.flag : null;
    for (const [key, value] of Object.entries(command)) {
      if (!Array.isArray(value) || key === 'path') continue;
      if (starterFlag && key === 'then' && starterFlag !== starter) continue;
      if (starterFlag && key === 'else' && starterFlag === starter) continue;
      walk(value, starter, key === 'then' && gate ? gate : condition, visit);
    }
  }
}

/** Sources found in maps and scripts for one starter. */
export function collectSources(maps, globalScripts, starter) {
  const wild = new Map(); // species -> condition (null = always)
  const trades = []; // { wanted, offer }
  const items = new Set();
  const addWild = (species, condition = null) => {
    if (!wild.has(species) || (wild.get(species) && !condition)) wild.set(species, condition);
  };
  addWild(starter);
  for (const map of Object.values(maps)) {
    for (const [kind, table] of Object.entries(map.encounters ?? {})) {
      if (Array.isArray(table)) table.forEach((slot) => addWild(slot.creature));
      else if (kind !== 'rate') throw new Error(`table de rencontres inattendue ${map.id}.${kind}`);
    }
    [...(map.items ?? []), ...(map.hiddenItems ?? [])].forEach((entry) => items.add(entry.item));
    for (const { commands, condition } of scriptsOf(map, globalScripts)) {
      walk(commands, starter, condition, (command, gate) => {
        if (command.cmd === 'wild_battle' || command.cmd === 'give_creature') addWild(command.creature, gate);
        if (command.cmd === 'trade') trades.push({ wanted: command.wanted, offer: command.offer.creature });
        if (command.cmd === 'give_item') items.add(command.item);
        if (command.cmd === 'open_menu' && command.menu === 'shop') (command.params?.stock ?? []).forEach((entry) => items.add(entry.item));
      });
    }
  }
  return { wild, trades, items };
}

/** { obtainable: Map(species -> how), missing: [ids] } for one starter. */
export function computeObtainable(maps, globalScripts, creatures, starter) {
  const { wild, trades, items } = collectSources(maps, globalScripts, starter);
  const byId = Object.fromEntries(creatures.map((creature) => [creature.id, creature]));
  const obtainable = new Map();
  for (const [species, condition] of wild) obtainable.set(species, condition ? `capture (${condition})` : 'capture');
  let changed = true;
  while (changed) {
    changed = false;
    const add = (species, how) => {
      if (obtainable.has(species) || !byId[species]) return;
      obtainable.set(species, how);
      changed = true;
    };
    for (const species of [...obtainable.keys()]) {
      const evolutions = [byId[species]?.evolution ?? []].flat();
      for (const evolution of evolutions) {
        if (evolution.method === 'item' && !items.has(evolution.value)) continue;
        add(evolution.to, `évolution de ${species}`);
      }
    }
    for (const trade of trades) if (obtainable.has(trade.wanted)) add(trade.offer, `échange contre ${trade.wanted}`);
  }
  const missing = creatures.map((creature) => creature.id).filter((id) => !obtainable.has(id));
  return { obtainable, missing };
}

/** Checker for npm run validate: the 150 species are obtainable for each of the 3 starters. */
export function checkObtainability(maps, globalScripts, creatures) {
  const errors = [];
  for (const starter of STARTERS) {
    const { obtainable, missing } = computeObtainable(maps, globalScripts, creatures, starter);
    if (missing.length) errors.push(`starter ${starter} : ${missing.length} espèce(s) impossible(s) à obtenir : ${missing.join(', ')}`);
    for (const [species, how] of obtainable) {
      if (how.includes('(') && species !== MYTHICAL) errors.push(`starter ${starter} : ${species} n’est obtenable que sous condition (${how})`);
    }
  }
  return errors;
}
