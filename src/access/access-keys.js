// Activation keys of the web version (pure). Only hashes are published: a key cannot be read
// back from this file. Keys are created and revoked with `npm run key` (tools/access-key.js).
// This only keeps casual visitors out: the files of a static site stay downloadable.
import { sha256 } from './sha256.js';
import { ACCESS_KEY_HASHES } from '../data/access-keys.js';

/** Hash prefix, so the hashes are specific to this game. */
const SALT = 'bestiora-azur:';

/** Key typed by a player: case, spaces and dashes do not matter. */
export const normalizeKey = (key) => String(key).toUpperCase().replace(/[^A-Z0-9]/g, '');

export const hashKey = (key) => sha256(`${SALT}${normalizeKey(key)}`);

export function isValidKey(key, hashes = ACCESS_KEY_HASHES) {
  if (normalizeKey(key).length === 0) return false;
  const hash = hashKey(key);
  return hashes.some((entry) => entry.hash === hash);
}
