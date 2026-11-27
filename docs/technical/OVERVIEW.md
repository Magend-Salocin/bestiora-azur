# Vue d'ensemble technique

## Stack

- Electron (dernière version stable) avec `contextIsolation: true`, `nodeIntegration: false`.
- JavaScript ES modules natifs dans le renderer, sans framework ni bundler.
- Rendu Canvas 2D, résolution interne 160 × 144, mise à l'échelle entière (`imageSmoothingEnabled = false`).
- Audio Web Audio API (synthèse, aucun fichier audio).
- Tests : `node --test` sur la logique pure (aucune dépendance au DOM).
- Génération d'assets : scripts Node (`pngjs`) qui produisent les atlas PNG.
- Packaging : `electron-builder`.

## Arborescence

```text
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
  gfx/sources/         Sources des sprites (tableaux de chaînes)
  data/                Données pures : types, attaques, bestioles, objets, dresseurs, textes
  data/maps/           Une carte par fichier
  overworld/           Joueur, PNJ, collisions, warps, scripts d'événements
  battle/logic/        Moteur de combat pur (aucun rendu)
  battle/ui/           Scène de combat, animations, menus de combat
  ui/                  Boîte de dialogue, menus, écrans
  audio/               Synthé 4 voies, séquenceur, pistes, effets
  save/                Format versionné, migrations et sélection de sauvegarde
  debug/               Dev uniquement : menu F1, juke-box F2, captures, sonde de perf
  state/               État global du jeu
assets/atlas/          PNG + JSON générés (versionnés)
tools/                 Scripts Node : atlas, validation, texte, icône, cartes
build/                 Icônes de l'application
tests/                 Tests node:test
docs/                  Documentation organisée par thème
```

## Principes

1. **Logique séparée du rendu.** `battle/logic`, `data`, `state`, `save` et les sources de sprites ne touchent jamais au DOM.
2. **Données déclaratives.** Cartes, dresseurs, événements et dialogues sont des objets JavaScript exportés.
3. **Scènes empilées.** `SceneManager` gère une pile de scènes avec `update(dt, input)` et `render(ctx)`.
4. **Pas fixe.** Boucle à 60 mises à jour par seconde avec accumulateur.
5. **Aléatoire injectable.** Les fonctions reçoivent un RNG pour rendre les tests reproductibles.
6. **Identifiants stables.** Les identités utilisent `snake_case` ASCII.
7. **Pas de dépendance runtime** dans le renderer.
