# Architecture technique

## Stack

- Electron (dernière version stable) avec `contextIsolation: true`, `nodeIntegration: false`.
- JavaScript ES modules natifs dans le renderer, sans framework ni bundler.
- Rendu Canvas 2D, résolution interne 160 × 144, mise à l'échelle entière (`imageSmoothingEnabled = false`).
- Audio Web Audio API (synthèse, aucun fichier audio).
- Tests : `node --test` sur la logique pure (aucune dépendance au DOM).
- Génération d'assets : scripts Node (`pngjs`) qui produisent les atlas PNG.
- Packaging : `electron-builder`.

## Arborescence

```
electron/
  main.js              Fenêtre, menu, IPC sauvegarde, options et journal d'erreurs
  save-store.js        Fichiers de sauvegarde : écriture atomique, copie de secours
  dev-tasks.js         Dev uniquement : captures du README, mesure de performance
  preload.js           API exposée : window.bestiora.save / load / logError / saveOptions…
src/
  index.html
  main.js              Point d'entrée renderer
  engine/              Boucle, entrées, rendu, gestionnaire de scènes, timers, tweens
  gfx/                 Palette, police, chargement d'atlas, dessin de sprites
  gfx/sources/         Sources des sprites (tableaux de chaînes), générateur de bestioles
  data/                Données pures : types, attaques, bestioles, objets, dresseurs, textes
  data/maps/           Une carte par fichier
  overworld/           Joueur, PNJ, collisions, warps, scripts d'événements
  battle/logic/        Moteur de combat pur (aucun rendu)
  battle/ui/           Scène de combat, animations, menus de combat
  ui/                  Boîte de dialogue, menus, écrans (équipe, sac, Bestiaire, stockage…)
  audio/               Synthé 4 voies, séquenceur, pistes, effets
  save/                Format versionné, migrations, choix de la copie (pur) ; envoi au processus principal
  debug/               Dev uniquement (import dynamique, absent du paquet) : menu F1, captures, sonde de perf
  state/               État global du jeu (équipe, sac, drapeaux, position)
assets/atlas/          PNG + JSON générés (versionnés)
tools/                 Scripts Node : build-atlas, validate-data, check-text-fit, build-icon, map-preview…
build/                 Icônes de l'application (générées par npm run icon)
tests/                 Tests node:test
docs/                  GAME_DESIGN.md, ARCHITECTURE.md, PROGRESS.md
```

## Principes

1. **Logique séparée du rendu.** `battle/logic`, `data`, `state`, `save` et le générateur de sprites ne touchent jamais au DOM. Ils sont testables sous Node.
2. **Données déclaratives.** Cartes, dresseurs, événements et dialogues sont des objets JS exportés, pas du code. Un script `tools/validate-data.js` vérifie toutes les références croisées (attaque inconnue, carte cible de warp manquante, texte manquant…).
3. **Scènes empilées.** `SceneManager` gère une pile : `update(dt, input)` et `render(ctx)` sur la scène du haut, `render` des scènes inférieures si la scène du haut est transparente (dialogue par-dessus la carte).
4. **Pas fixe.** Boucle à 60 mises à jour par seconde (accumulateur), rendu à chaque frame.
5. **Aléatoire injectable.** Toute fonction aléatoire reçoit un RNG (`createRng(seed)`), ce qui rend les tests et les combats reproductibles.
6. **Identifiants stables.** Toute entité de données a un `id` en `snake_case` ASCII (`fenouillot`, `jet_de_braise`, `route_1`). Les textes affichés sont séparés.
7. **Pas de dépendance runtime** dans le renderer. Dépendances de dev autorisées : `electron`, `electron-builder`, `pngjs`.

## Conventions de code

- Noms en anglais pour le code (`createCreature`, `applyDamage`), textes du jeu en français.
- Fonctions courtes et nommées explicitement ; un module = une responsabilité.
- Pas de classes inutiles : objets simples + fonctions, classes seulement pour les scènes.
- Constantes en `UPPER_SNAKE_CASE` dans `src/engine/constants.js`.
- Pas de `console.log` laissé hors du module `debug`.

## Formats clés

### Sprite source

```js
export const NPC_GIRL = {
  width: 16, height: 16,
  frames: {
    down_0: [
      '.....3333.......',
      // 16 lignes de 16 caractères : '0'-'3' = index palette, '.' = transparent
    ],
  },
};
```

### Carte

```js
export default {
  id: 'bourg_sablon',
  name: 'Bourg-Sablon',
  width: 20, height: 18,          // en métatuiles 16×16
  tileset: 'town',
  music: 'town_1',
  layers: { ground: [...], collision: [...] },  // tableaux width*height
  encounters: null,               // ou { rate, grass: [...], water: [...] }
  warps: [{ x, y, to: 'halte_bourg_sablon', toX, toY }],
  npcs: [{ id, sprite, x, y, facing, movement: 'static'|'wander'|'look', script }],
  trainers: [{ id, sprite, x, y, facing, sight, trainer: 'gamin_leo' }],
  signs: [{ x, y, text: 'sign_bourg_sablon' }],
  items: [{ x, y, item: 'potion', flag: 'item_bourg_sablon_1' }],
  triggers: [{ x, y, w, h, script, once: true }],
  connections: { north: 'route_2', south: null, east: null, west: null },
};
```

### Script d'événement

Liste de commandes interprétée par `src/overworld/script-runner.js` :

```js
[
  { cmd: 'say', text: 'prof_intro_1' },
  { cmd: 'move', actor: 'prof', path: ['up', 'up'] },
  { cmd: 'if_flag', flag: 'has_starter', then: [...], else: [...] },
  { cmd: 'battle', trainer: 'rival_1' },
  { cmd: 'give_item', item: 'machette' },
  { cmd: 'set_flag', flag: 'route_5_machette' },
]
```

### Sauvegarde

JSON versionné (`SAVE_VERSION` = 2, `src/save/save-format.js`) :

```js
{
  version: 2, savedAt: '2026-11-20T10:00:00.000Z',
  player, rival, party, storage, bag, money, badges, flags, bestiary, position, playTime,
  daycare, visitedTowns, escapePoint, lastHalte, repelSteps, daily, hallOfFame,
  options,   // copie des options, utilisée seulement si options.json manque
}
```

- Le renderer sérialise (`serializeSave`) et envoie le texte par IPC ; `electron/save-store.js` écrit `userData/save.json` via un fichier temporaire, `fsync` puis renommage. Avant chaque écriture, l'ancien `save.json` devient `save.bak.json`, sauf s'il est illisible.
- Au chargement, le processus principal renvoie le texte brut des deux fichiers ; `chooseSave` prend le principal, sinon la copie (message sur l'écran titre), sinon signale les deux comme illisibles.
- Migrations : `migrations[n]` transforme une sauvegarde de version n en version n + 1. Version 1 = l'ancienne sauvegarde provisoire du navigateur (état brut sans version), importée une fois depuis `localStorage`.
- Les champs absents d'une ancienne sauvegarde prennent les valeurs par défaut de `createGameState`.
- Pas de sauvegarde dans les cartes `league: true`. Le temps de jeu n'avance que fenêtre active (la boucle est en pause hors focus).

## Commandes npm

| Commande | Rôle |
|---|---|
| `npm start` | Lance le jeu |
| `npm run dev` | Lance avec DevTools et menu debug |
| `npm test` | Tests unitaires |
| `npm run atlas` | Régénère `assets/atlas/*.png` et `*.json` |
| `npm run validate` | Valide les données |
| `npm run dist` | Construit les installeurs de la plateforme courante (`dist/`) |
| `npm run icon` | Régénère `build/icon.png`, `.ico`, `.icns` depuis le sprite d'Azurel |
| `npm run screenshots` | Régénère `docs/screenshots/` (jeu lancé en mode capture) |
| `npm run perf` | Mesure images/s et temps de calcul sur une carte dense et en combat |
| `npm run check-text` | Vérifie seul que les textes tiennent dans leur fenêtre (inclus dans `validate`) |

## Menu debug (`npm run dev` uniquement)

Le mode dev exige `--dev` et un jeu non empaqueté (`!app.isPackaged`) : le jeu installé n'a ni DevTools ni menu debug, et `src/debug/` n'est pas dans le paquet.

Options dev : `--newgame` (écran titre au lieu de la carte de test), `--simulate-save-crash` (le processus est tué entre l'écriture du fichier temporaire et le renommage), `--capture=<dossier>` et `--perf` (utilisés par `npm run screenshots` et `npm run perf`).

Touche `F1` : téléportation vers une carte, ajout de bestiole, mode marche à travers les murs, désactivation des rencontres, mise à niveau de l'équipe, réglage des drapeaux. Indispensable pour tester les étapes tardives.

## Erreurs

Toute exception non rattrapée (boucle, promesse) est écrite dans `userData/logs/AAAA-MM-JJ.log` et remplace le jeu par un écran d'erreur (`src/ui/error-scene.js`, sans atlas) : RECHARGER relance le jeu sur l'écran titre (CONTINUER reprend la dernière sauvegarde), QUITTER ferme la fenêtre.
