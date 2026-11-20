# Bestiora Azur

RPG original de capture de créatures en pixel art 4 teintes (160 × 144), pour Windows, macOS et Linux. On y parcourt la péninsule de Brumeval, on capture et entraîne 150 bestioles, on affronte 8 champions d'arène puis la Ligue. Tout est original : créatures, cartes, textes et musiques composées pour le jeu, synthétisées en temps réel.

| Écran titre | Ville | Menu | Combat |
|---|---|---|---|
| ![Écran titre](docs/screenshots/title.png) | ![Cendrelune](docs/screenshots/town.png) | ![Menu START](docs/screenshots/menu.png) | ![Combat sauvage](docs/screenshots/battle.png) |

## Installation

Les installeurs sont produits par `npm run dist` dans `dist/` :

| Plateforme | Fichier |
|---|---|
| Windows | `Bestiora Azur-Setup-1.0.0.exe` (installeur) ou `Bestiora Azur-1.0.0-portable.exe` (sans installation) |
| macOS | `Bestiora Azur-1.0.0.dmg` |
| Linux | `Bestiora Azur-1.0.0.AppImage` |

Les installeurs ne sont pas signés : Windows SmartScreen et macOS Gatekeeper demandent une confirmation au premier lancement.

## Commandes

Prérequis : Node.js 20 ou plus récent, puis `npm install`.

| Commande | Rôle |
|---|---|
| `npm start` | Lance le jeu |
| `npm run dev` | Lance avec DevTools et menu debug (`F1`) ; `npm run dev -- --newgame` part de l'écran titre |
| `npm test` | Tests unitaires |
| `npm run validate` | Valide les données (références, textes dans leur fenêtre, 150 espèces obtenables) |
| `npm run atlas` | Régénère les atlas PNG depuis les sources |
| `npm run icon` | Régénère l'icône (`build/icon.png`, `.ico`, `.icns`) |
| `npm run screenshots` | Régénère les captures de ce README |
| `npm run perf` | Mesure les images par seconde sur une carte dense et en combat |
| `npm run balance` | Équilibrage des combats importants |
| `npm run dist` | Construit les installeurs de la plateforme courante |

`npm run dist` ne construit que la plateforme sur laquelle il tourne : le `.dmg` se construit sur macOS, l'AppImage sur Linux ou macOS.

## Contrôles

| Action | Clavier | Manette |
|---|---|---|
| Se déplacer | Flèches | Croix ou stick gauche |
| Valider (A) | `X` | Bouton bas (A / Croix) |
| Annuler, courir (B) | `Z` (`W` sur AZERTY) | Bouton droit (B / Rond) |
| Menu (START) | `Entrée` | Start |
| SELECT | `Shift` droit | Select |
| Changer de palette | SELECT + START | SELECT + START |
| Plein écran | `F11` | |

Les touches et les boutons de manette se remappent dans OPTIONS (TOUCHES, MANETTE). Les options proposent aussi le texte instantané, la palette Contraste (contraste maximal) et la réduction des flashs (les clignotements de combat deviennent un léger décalage).

## Jouer sur iPhone (ou tablette)

Le jeu tourne aussi dans le navigateur, avec des contrôles tactiles (croix, A, B, START, SELECT).

1. Sur le PC : `npm run web`. Le terminal affiche les adresses du PC sur le réseau, par exemple `http://192.168.1.94:8080/`. Au premier lancement, autoriser Node.js dans le pare-feu Windows (réseau privé).
2. Sur l'iPhone, connecté au même Wi-Fi : ouvrir cette adresse dans Safari.
3. Partager, puis « Sur l'écran d'accueil » : le jeu s'ouvre ensuite en plein écran depuis son icône.

Les contrôles tactiles apparaissent seuls sur un écran tactile. L'option TACTILE (AUTO, OUI, NON) les force ou les masque. La sauvegarde est stockée dans le navigateur de l'iPhone, séparément de celle du PC. Le PC doit être allumé, avec `npm run web` lancé, au moment d'ouvrir le jeu.

### Clés d'activation (test privé)

La version web demande une clé avant de lancer le jeu ; la version PC n'en demande pas.

```powershell
npm run key -- new "Prénom"      # crée une clé, à envoyer à la personne
npm run key -- list              # clés créées sur ce PC
npm run key -- revoke "Prénom"   # révoque une clé
```

Commit et push ensuite pour appliquer le changement au site. Seuls les hachages sont publiés (`src/data/access-keys.js`). Les noms et les clés restent dans `access-keys.local.json`, non versionné : le garder en lieu sûr. Une clé révoquée cesse de fonctionner au lancement suivant. Cette protection écarte les visiteurs de passage, mais un site statique reste téléchargeable par quelqu'un de déterminé.

## Sauvegardes

La partie se sauvegarde depuis le menu START (SAUVER), sauf dans la Ligue une fois la porte franchie. Les fichiers sont dans le dossier de données de l'application :

| Plateforme | Dossier |
|---|---|
| Windows | `%APPDATA%\Bestiora Azur\` |
| macOS | `~/Library/Application Support/Bestiora Azur/` |
| Linux | `~/.config/Bestiora Azur/` |

- `save.json` : la sauvegarde, en JSON versionné (format dans [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md)).
- `save.bak.json` : la sauvegarde précédente. Elle est chargée automatiquement si `save.json` est illisible.
- `options.json` : les options, indépendantes de la partie.
- `logs/` : un journal par jour des erreurs rencontrées.

Chaque écriture passe par un fichier temporaire renommé ensuite : un arrêt brutal pendant la sauvegarde laisse toujours la sauvegarde précédente intacte.

## Retoucher les graphismes

Les sprites sont décrits en texte dans `src/gfx/sources/` et assemblés en atlas PNG dans `assets/atlas/` par `npm run atlas`. Pour retoucher un atlas directement :

1. Ouvrir `assets/atlas/<atlas>.png` (`tiles`, `characters`, `trainers`, `creatures` ou `ui`) dans un éditeur de pixel art.
2. Dessiner uniquement avec les 4 gris de référence, du plus clair au plus foncé : `#ffffff`, `#aaaaaa`, `#555555`, `#000000`, plus la transparence. Le jeu les remplace par la palette choisie.
3. Ne pas déplacer les images : leurs positions sont dans `assets/atlas/<atlas>.json`.
4. Relancer le jeu pour voir la retouche.

`npm run atlas` réécrit les PNG depuis les sources et efface donc les retouches. `npm run atlas -- --keep-edited` conserve les PNG modifiés à la main depuis le dernier build.

## Documentation

- [docs/GAME_DESIGN.md](docs/GAME_DESIGN.md) : univers, mécaniques, contenu.
- [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) : organisation du code et formats.
- [docs/PROGRESS.md](docs/PROGRESS.md) : journal de développement.

## Licence

À définir : aucune licence n'est encore choisie pour le code.
