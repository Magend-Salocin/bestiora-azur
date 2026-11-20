// Save files on disk (main process): save.json, its backup save.bak.json, atomic writes.
// Only raw text goes through here; parsing, migration and the choice of file are in
// src/save/save-format.js (renderer).
const fs = require('node:fs');
const path = require('node:path');

const MAIN_FILE = 'save.json';
const BACKUP_FILE = 'save.bak.json';

function readText(file) {
  try {
    return fs.readFileSync(file, 'utf8');
  } catch (error) {
    if (error.code === 'ENOENT') return null;
    throw error;
  }
}

function isJson(text) {
  try {
    JSON.parse(text);
    return true;
  } catch {
    return false;
  }
}

/** Writes `text` to `file` through a temporary file: the target is either the old or the new content. */
function writeAtomic(file, text, { beforeRename } = {}) {
  const temporary = `${file}.tmp`;
  const handle = fs.openSync(temporary, 'w');
  try {
    fs.writeSync(handle, text, null, 'utf8');
    fs.fsyncSync(handle);
  } finally {
    fs.closeSync(handle);
  }
  beforeRename?.();
  fs.renameSync(temporary, file);
}

/**
 * Writes a save. The current save.json becomes save.bak.json first, unless it is unreadable
 * (a good backup is never replaced by a broken file). `beforeRename` exists for crash tests.
 */
function writeSave(directory, json, { beforeRename } = {}) {
  if (!isJson(json)) throw new Error('Save content is not JSON');
  fs.mkdirSync(directory, { recursive: true });
  const main = path.join(directory, MAIN_FILE);
  const current = readText(main);
  if (current !== null && isJson(current)) writeAtomic(path.join(directory, BACKUP_FILE), current);
  writeAtomic(main, json, { beforeRename });
}

/** Raw texts of both files, null when a file does not exist. */
function readSave(directory) {
  return {
    main: readText(path.join(directory, MAIN_FILE)),
    backup: readText(path.join(directory, BACKUP_FILE)),
  };
}

module.exports = { MAIN_FILE, BACKUP_FILE, writeSave, readSave, writeAtomic };
