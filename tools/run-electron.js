// Runs the game with Electron from a Node script (dev tasks: screenshots, perf).
import { spawnSync } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import electronPath from 'electron';

export const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

/** Returns the spawnSync result. Output goes to the terminal unless `capture` is set. */
export function runElectron(args, { capture = false, timeout = 120000 } = {}) {
  // Launched from an editor terminal, ELECTRON_RUN_AS_NODE would start Electron as plain Node.
  const env = { ...process.env };
  delete env.ELECTRON_RUN_AS_NODE;
  return spawnSync(electronPath, ['.', ...args], {
    cwd: ROOT, env, timeout, encoding: 'utf8', stdio: capture ? ['ignore', 'pipe', 'inherit'] : 'inherit',
  });
}
