// Save file format (pure, no DOM): versioned JSON, migrations, choice between the main file and
// its backup. The main process only writes and reads raw text (electron/save-store.js).
import { createGameState } from '../state/game-state.js';
import { normalizeOptions } from '../state/options.js';

export const SAVE_VERSION = 2;

/** Game state keys written in the save, at the top level next to version, savedAt and options. */
export const SAVED_STATE_KEYS = [
  'player', 'rival', 'party', 'storage', 'bag', 'money', 'badges', 'flags', 'bestiary', 'position',
  'playTime', 'daycare', 'visitedTowns', 'escapePoint', 'lastHalte', 'repelSteps', 'daily', 'hallOfFame',
];

export class SaveError extends Error {
  constructor(code, message) {
    super(message);
    this.code = code;
  }
}

/**
 * migrations[n] turns a version n save into a version n + 1 save.
 * Version 1: the interim browser-storage save (game state dumped as is, no version, no options).
 */
export const migrations = {
  1: (save) => ({ ...save, version: 2, savedAt: save.savedAt ?? null, options: save.options ?? null }),
};

/** Brings a parsed save object to SAVE_VERSION. A save without a version is a version 1 save. */
export function migrateSave(raw) {
  let save = { ...raw, version: raw.version ?? 1 };
  if (!Number.isInteger(save.version) || save.version < 1) throw new SaveError('invalid', `Version de sauvegarde invalide : ${raw.version}`);
  if (save.version > SAVE_VERSION) throw new SaveError('too_recent', `Sauvegarde d'une version plus récente (${save.version})`);
  while (save.version < SAVE_VERSION) {
    const migrate = migrations[save.version];
    if (!migrate) throw new SaveError('invalid', `Migration manquante depuis la version ${save.version}`);
    save = migrate(save);
  }
  return save;
}

export function serializeSave(state, { options = null, now = new Date() } = {}) {
  const save = { version: SAVE_VERSION, savedAt: now.toISOString() };
  for (const key of SAVED_STATE_KEYS) save[key] = state[key];
  save.options = options;
  return JSON.stringify(save);
}

function checkShape(save) {
  const valid =
    save.player && typeof save.player.name === 'string' &&
    Array.isArray(save.party) &&
    save.storage && Array.isArray(save.storage.boxes) &&
    save.flags && typeof save.flags === 'object' &&
    save.bestiary && save.bestiary.caught &&
    save.position && typeof save.position.map === 'string';
  if (!valid) throw new SaveError('invalid', 'Sauvegarde incomplète');
}

/** Parses save text. Returns { state, options, savedAt }; throws SaveError when unreadable. */
export function parseSave(json) {
  let raw;
  try {
    raw = JSON.parse(json);
  } catch {
    throw new SaveError('corrupt', 'Sauvegarde illisible');
  }
  if (!raw || typeof raw !== 'object' || Array.isArray(raw)) throw new SaveError('corrupt', 'Sauvegarde illisible');
  const save = migrateSave(raw);
  checkShape(save);
  const values = Object.fromEntries(SAVED_STATE_KEYS.filter((key) => save[key] !== undefined).map((key) => [key, save[key]]));
  return {
    state: createGameState(values),
    options: save.options ? normalizeOptions(save.options) : null,
    savedAt: save.savedAt,
  };
}

/**
 * Picks the save to load from the raw texts of save.json and save.bak.json.
 * Returns { status: 'none' } (no save), { status: 'ok' | 'backup', save } or
 * { status: 'corrupt', error } when neither file can be read.
 */
export function chooseSave({ main = null, backup = null } = {}) {
  if (main === null && backup === null) return { status: 'none' };
  let error = null;
  for (const [status, text] of [['ok', main], ['backup', backup]]) {
    if (text === null) continue;
    try {
      return { status, save: parseSave(text) };
    } catch (caught) {
      error ??= caught;
    }
  }
  return { status: 'corrupt', error };
}

/** What the SAUVER window shows: player name, badges, caught species, play time. */
export function summarizeSave(state) {
  return {
    name: state.player.name,
    badges: state.badges.length,
    caught: Object.values(state.bestiary.caught).filter(Boolean).length,
    playTime: formatPlayTime(state.playTime),
  };
}

/** Seconds to "H:MM" (hours unbounded). */
export function formatPlayTime(seconds) {
  const minutes = Math.floor(Math.max(0, seconds) / 60);
  return `${Math.floor(minutes / 60)}:${String(minutes % 60).padStart(2, '0')}`;
}
