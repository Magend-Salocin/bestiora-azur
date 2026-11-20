// npm run web: serves the game on the local network so a phone on the same Wi-Fi can play it
// in its browser (touch controls appear on touch screens). Only src/, assets/ and the icon are
// served. Usage: npm run web [-- --port 8080]
import fs from 'node:fs';
import http from 'node:http';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const PUBLIC_DIRS = ['src', 'assets'];
const ALIASES = { '/src/icon.png': 'build/icon.png' };
const ENTRY = '/src/index.html';
const portIndex = process.argv.indexOf('--port');
const PORT = portIndex > 0 ? Number(process.argv[portIndex + 1]) : 8080;

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.webmanifest': 'application/manifest+json; charset=utf-8',
  '.png': 'image/png',
};

/** Absolute file for a URL path, or null when it is outside the public folders. */
export function resolvePublicFile(urlPath) {
  const decoded = decodeURIComponent(urlPath);
  const relative = ALIASES[decoded] ?? decoded.replace(/^\/+/, '');
  const file = path.resolve(ROOT, relative);
  const allowed = PUBLIC_DIRS.some((dir) => file.startsWith(path.join(ROOT, dir) + path.sep)) || Object.values(ALIASES).some((alias) => file === path.join(ROOT, alias));
  return allowed ? file : null;
}

function handle(request, response) {
  const { pathname } = new URL(request.url, 'http://localhost');
  if (pathname === '/') {
    response.writeHead(302, { Location: ENTRY });
    response.end();
    return;
  }
  const file = resolvePublicFile(pathname);
  const type = file && MIME_TYPES[path.extname(file)];
  if (!type || !fs.existsSync(file) || !fs.statSync(file).isFile()) {
    response.writeHead(404);
    response.end('Introuvable');
    return;
  }
  // No cache: a reload on the phone always gets the latest version of the game.
  response.writeHead(200, { 'Content-Type': type, 'Cache-Control': 'no-cache' });
  fs.createReadStream(file).pipe(response);
}

function localAddresses() {
  return Object.values(os.networkInterfaces()).flat().filter((entry) => entry && entry.family === 'IPv4' && !entry.internal).map((entry) => entry.address);
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const server = http.createServer(handle);
  server.on('error', (error) => {
    if (error.code !== 'EADDRINUSE') throw error;
    process.stderr.write(`Le port ${PORT} est déjà pris (un autre npm run web tourne ?). Arrêter l’autre ou lancer : npm run web -- --port 8081\n`);
    process.exit(1);
  });
  server.listen(PORT, '0.0.0.0', () => {
    process.stdout.write('Bestiora Azur est servi sur le réseau local. Sur l’iPhone (même Wi-Fi), ouvrir dans Safari :\n');
    for (const address of localAddresses()) process.stdout.write(`  http://${address}:${PORT}/\n`);
    process.stdout.write('Puis Partager > « Sur l’écran d’accueil » pour le plein écran. Ctrl+C pour arrêter.\n');
  });
}
