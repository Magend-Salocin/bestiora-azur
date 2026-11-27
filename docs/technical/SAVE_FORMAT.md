# Format de sauvegarde

JSON versionné (`SAVE_VERSION = 2`, `src/save/save-format.js`) :

```js
{
  version: 2,
  savedAt: '2026-11-20T10:00:00.000Z',
  player,
  rival,
  party,
  storage,
  bag,
  money,
  badges,
  flags,
  bestiary,
  position,
  playTime,
  daycare,
  visitedTowns,
  escapePoint,
  lastHalte,
  repelSteps,
  daily,
  hallOfFame,
  options,
}
```

- Le renderer sérialise (`serializeSave`) et envoie le texte par IPC.
- `electron/save-store.js` écrit `userData/save.json` via un fichier temporaire, `fsync`, puis renommage.
- Avant chaque écriture, l'ancien `save.json` devient `save.bak.json`.
- Au chargement, le processus principal renvoie les fichiers principal et de secours.
- Les migrations transforment une sauvegarde de version `n` en version `n + 1`.
- Les champs absents prennent les valeurs par défaut de `createGameState`.
- Pas de sauvegarde dans les cartes `league: true`.
- Le temps de jeu n'avance que lorsque la fenêtre est active.
