// Service worker of the web version (HTTPS only, see registerOfflineMode in src/main.js): keeps
// every file of the game on the device so it starts without a network once loaded.
// precache-manifest.js is written by tools/build-web.js: self.PRECACHE = { version, files }.
/* global self, caches, importScripts */
importScripts('precache-manifest.js');

const { version, files } = self.PRECACHE;
const CACHE_NAME = `bestiora-${version}`;

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(files.map((file) => new URL(file, self.location).href)))
      .then(() => self.skipWaiting()),
  );
});

// A new version replaces the previous one: old caches are deleted.
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((names) => Promise.all(names.filter((name) => name.startsWith('bestiora-') && name !== CACHE_NAME).map((name) => caches.delete(name))))
      .then(() => self.clients.claim()),
  );
});

// Cache first (works offline), network for anything not cached.
self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;
  event.respondWith(caches.match(event.request, { ignoreSearch: true }).then((cached) => cached ?? fetch(event.request)));
});
