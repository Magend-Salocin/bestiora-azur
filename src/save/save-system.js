// Renderer side of the save: sends the serialized save to the main process (atomic file write)
// and reads it back. Without the Electron bridge (tests in a browser), uses localStorage.
import { getOptions } from '../state/options.js';
import { chooseSave, serializeSave } from './save-format.js';

/** Key of the interim save (before prompt 12), still imported once as a version 1 save. */
const LEGACY_STORAGE_KEY = 'bestiora-save';

function readLegacySave() {
  try {
    return localStorage.getItem(LEGACY_STORAGE_KEY);
  } catch {
    return null;
  }
}

/** Writes the game. Resolves true on success. */
export async function writeGameSave(state) {
  const json = serializeSave(state, { options: getOptions() });
  try {
    if (window.bestiora?.save) return (await window.bestiora.save(json)).ok === true;
    localStorage.setItem(LEGACY_STORAGE_KEY, json);
    return true;
  } catch {
    return false;
  }
}

/** Reads the save: { status: 'none' | 'ok' | 'backup' | 'corrupt', save?, error? } (see chooseSave). */
export async function readGameSave() {
  let files = { main: null, backup: null };
  try {
    if (window.bestiora?.load) files = (await window.bestiora.load()) ?? files;
  } catch {
    // Treated as no save file; the legacy save may still exist.
  }
  if (files.main === null && files.backup === null) files = { main: readLegacySave(), backup: null };
  return chooseSave(files);
}
