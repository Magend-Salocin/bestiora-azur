# 12. Où se trouve quoi

Ce chapitre est un plan. Sers-t'en pour retrouver un fichier quand tu sais ce que tu cherches.

## « Je veux changer… »

| Je veux changer… | Je vais dans… | Puis je lance… |
| --- | --- | --- |
| les statistiques, le type ou les attaques d'une bestiole | [src/data/creatures.js](../../src/data/creatures.js) | `npm run validate` |
| le dessin d'une bestiole | son module dans [tools/creature-designs/](../../tools/creature-designs/) | `npm run creature-design -- <module>`, `npm run planche`, `npm run atlas` |
| les formes du peintre de bestioles (ellipse, capsule, calques) | [tools/creature-painter.js](../../tools/creature-painter.js) | `npm run creature-design -- <module>` |
| une attaque | [src/data/moves.js](../../src/data/moves.js) | `npm run validate` |
| le tableau des types | [src/data/types.js](../../src/data/types.js) | `npm test` |
| un objet | [src/data/items.js](../../src/data/items.js) | `npm run validate` |
| l'apparence d'un personnage sur la carte | [src/gfx/sources/characters/index.js](../../src/gfx/sources/characters/index.js) | `npm run atlas` |
| le portrait d'un dresseur en combat | [src/gfx/sources/trainers/index.js](../../src/gfx/sources/trainers/index.js) | `npm run atlas` |
| l'équipe d'un dresseur | [src/data/trainers/](../../src/data/trainers/) (un fichier par zone) | `npm run validate`, `npm run balance` |
| l'argent ou la musique d'une classe de dresseurs | [src/data/trainer-classes.js](../../src/data/trainer-classes.js) | `npm run validate` |
| une carte (décor, portes, habitants, rencontres) | [src/data/maps/](../../src/data/maps/) (un dossier par zone) | `npm run validate`, `npm run map-preview -- <id>` |
| le dessin d'une case du décor | [src/gfx/sources/tiles/](../../src/gfx/sources/tiles/) | `npm run atlas` |
| les lettres d'une carte (la légende) | `DEFAULT_LEGENDS` dans [src/overworld/map-loader.js](../../src/overworld/map-loader.js) | `npm run validate` |
| un dialogue | [src/data/texts/](../../src/data/texts/) (un fichier par zone) | `npm run validate` |
| un événement de l'histoire | les `scripts` de la carte, ou [src/data/scripts.js](../../src/data/scripts.js) | `npm run validate` |
| ce qu'il faut pour couper, nager, escalader | [src/data/field-abilities.js](../../src/data/field-abilities.js) | `npm test` |
| une musique | [src/audio/tracks/](../../src/audio/tracks/) | `npm run validate` |
| un effet sonore | [src/audio/sfx.js](../../src/audio/sfx.js) | `npm run validate` |
| la musique des combats | [src/data/music.js](../../src/data/music.js) | `npm run validate` |
| les couleurs des palettes | [src/gfx/palette.js](../../src/gfx/palette.js) | `npm run dev` |
| les touches par défaut | [src/engine/input.js](../../src/engine/input.js) | `npm run dev` |
| le point de départ d'une nouvelle partie | `GAME_START` dans [src/data/maps/index.js](../../src/data/maps/index.js) | `npm run dev -- --newgame` |
| la carte de la région dans le Bestiaire | [src/data/region.js](../../src/data/region.js) | `npm run dev` |

Après tout changement : `npm test` et `npm run validate`.

## Le plan complet

### `src/engine/` : la salle des machines

| Fichier | Rôle |
| --- | --- |
| [constants.js](../../src/engine/constants.js) | les grandes constantes : taille de l'écran, des cases, 60 images par seconde |
| [loop.js](../../src/engine/loop.js) | la boucle : 60 mises à jour par seconde, pause hors focus |
| [renderer.js](../../src/engine/renderer.js) | l'écran de 160 × 144, agrandi sans flou |
| [input.js](../../src/engine/input.js) | clavier, manette, boutons virtuels, répétition des touches |
| [scene-manager.js](../../src/engine/scene-manager.js) | la pile de scènes et les fondus |
| [rng.js](../../src/engine/rng.js) | la machine à hasard avec graine |
| [timer.js](../../src/engine/timer.js), [tween.js](../../src/engine/tween.js) | minuteries et mouvements progressifs (une barre de vie qui descend en douceur) |

### `src/gfx/` : l'atelier de dessin

| Fichier | Rôle |
| --- | --- |
| [palette.js](../../src/gfx/palette.js) | les 6 palettes et les fondus |
| [sprite-utils.js](../../src/gfx/sprite-utils.js) | lire et écrire un dessin en chiffres |
| [shape-renderer.js](../../src/gfx/shape-renderer.js) | la machine à dessiner des tuiles et des portraits : formes vers pixels, ombre, reflet, contours |
| [atlas.js](../../src/gfx/atlas.js) | charger les atlas et les colorier avec la palette |
| [draw.js](../../src/gfx/draw.js) | poser un dessin ou une case à l'écran |
| [font.js](../../src/gfx/font.js), [font-glyphs.js](../../src/gfx/font-glyphs.js) | la police de 8 × 8 avec accents |
| [bitmap.js](../../src/gfx/bitmap.js) | petites aides pour les images |
| `sources/creatures/` | les 150 bestioles dessinées à la main : face, dos et icône, un fichier par espèce |
| `sources/characters/` | les personnages de la carte (gabarit et patchs) et les objets posés au sol |
| `sources/trainers/` | les portraits de combat |
| `sources/tiles/` | les cases du décor, une famille par fichier |
| `sources/ui/` | les cadres de fenêtres et les icônes |

### `src/data/` : la bibliothèque

| Fichier ou dossier | Contenu |
| --- | --- |
| [creatures.js](../../src/data/creatures.js) | les 150 fiches de bestioles |
| [moves.js](../../src/data/moves.js), [move-effects.js](../../src/data/move-effects.js) | les 166 attaques et la liste de leurs effets |
| [types.js](../../src/data/types.js) | les 15 types et le tableau d'efficacité |
| [formulas.js](../../src/data/formulas.js) | les formules des statistiques et de l'expérience |
| [items.js](../../src/data/items.js) | les 45 objets |
| [field-abilities.js](../../src/data/field-abilities.js) | objets de terrain et badges nécessaires |
| [trainer-classes.js](../../src/data/trainer-classes.js) | les 31 classes de dresseurs |
| [trainers.js](../../src/data/trainers.js), `trainers/` | les dresseurs, rangés par zone |
| `maps/` | les 113 cartes, rangées par zone |
| `texts/` | tous les textes du jeu, rangés par zone |
| [scripts.js](../../src/data/scripts.js) | les scripts communs (Haltes, revanches) |
| [music.js](../../src/data/music.js) | quelle musique pour quel combat |
| [region.js](../../src/data/region.js) | la carte de la région pour le Bestiaire |

### `src/overworld/` : l'exploration

| Fichier | Rôle |
| --- | --- |
| [overworld-scene.js](../../src/overworld/overworld-scene.js) | la scène d'exploration : touches, pas, portes, dresseurs, rencontres, interactions |
| [map-loader.js](../../src/overworld/map-loader.js) | traduit une carte en lettres en carte du jeu |
| [world.js](../../src/overworld/world.js) | la carte actuelle et ses voisines, la caméra |
| [world-renderer.js](../../src/overworld/world-renderer.js) | dessine le monde |
| [collision.js](../../src/overworld/collision.js) | peut-on aller sur cette case ? la vue des dresseurs |
| [actor.js](../../src/overworld/actor.js) | un personnage qui se déplace et s'anime |
| [npc.js](../../src/overworld/npc.js) | le cerveau des habitants |
| [encounters.js](../../src/overworld/encounters.js) | les rencontres sauvages |
| [script-runner.js](../../src/overworld/script-runner.js) | le lecteur de scripts |
| [directions.js](../../src/overworld/directions.js) | haut, bas, gauche, droite |
| [hooks.js](../../src/overworld/hooks.js) | les prises où se branchent le combat, les menus et le son |

### `src/battle/` : l'arène

| Fichier | Rôle |
| --- | --- |
| `logic/engine.js` | l'arbitre : un tour de combat |
| `logic/battle-state.js` | l'état d'un combat : équipes, paliers, effets passagers |
| `logic/creature.js` | créer une bestiole, recalculer ses statistiques, la faire évoluer |
| `logic/damage.js` | dégâts, critiques, précision, vitesse |
| `logic/status.js` | altérations et effets passagers |
| `logic/effects/` | les effets des attaques, par famille |
| `logic/ai.js` | l'intelligence des adversaires |
| `logic/capture.js` | la capture |
| `logic/experience.js` | expérience, niveaux, nouvelles attaques, évolutions |
| `logic/items.js` | les objets utilisés en combat |
| `ui/battle-setup.js` | branche le combat sur l'exploration |
| `ui/battle-scene.js` | l'écran et les menus de combat |
| `ui/event-player.js` | raconte les événements de l'arbitre |
| `ui/battle-hud.js` | barres de vie, noms, niveaux |
| `ui/move-animations.js` | animations des attaques |
| `ui/bag-screen.js` | le sac en combat |

### Les autres dossiers de `src/`

| Dossier | Contenu |
| --- | --- |
| `ui/` | menus, boîte de dialogue, écrans (chapitre [10](10-sauvegarde-menus.md)) |
| `audio/` | synthétiseur, séquenceur, musiques, effets, cris (chapitre [09](09-musique-et-sons.md)) |
| `state/` | l'état du jeu et ses outils (chapitre [10](10-sauvegarde-menus.md)) |
| `save/` | format de sauvegarde, migrations, choix de la copie de secours |
| `access/` | clés d'activation de la version en ligne |
| `debug/` | le menu F1, seulement en mode développeur |
| [main.js](../../src/main.js) | le point de départ du jeu |
| [index.html](../../src/index.html), [styles.css](../../src/styles.css) | la page qui contient l'écran du jeu |
| [sw.js](../../src/sw.js), [manifest.webmanifest](../../src/manifest.webmanifest) | le mode hors ligne et l'icône sur téléphone |

### Hors de `src/`

| Dossier | Contenu |
| --- | --- |
| [electron/](../../electron/) | la fenêtre du programme, les fichiers de sauvegarde, le journal d'erreurs |
| [assets/atlas/](../../assets/atlas/) | les 5 atlas fabriqués par `npm run atlas` |
| [tools/](../../tools/) | les outils des développeurs (chapitre [11](11-outils-et-tests.md)) |
| [tests/](../../tests/) | les 252 tests |
| [build/](../../build/) | les icônes du programme |
| [prompts/](../../prompts/) | les 13 recettes qui ont servi à construire le jeu |
| [docs/](../) | les documents, dont ce dossier |

## Le chemin d'une bestiole, de la fiche à l'écran

Pour relier tous les chapitres, suivons une bestiole sauvage, le Farfadet, depuis sa fiche jusqu'à l'écran de combat :

```text
1. FICHE        src/data/creatures.js            id, types, statistiques, description
                        │
2. DESSIN       tools/creature-designs/          formes peintes en calques, exportées en grilles
                src/gfx/sources/creatures/       par npm run creature-design, puis collées
                npm run atlas                    dans assets/atlas/creatures.png
                        │
3. CARTE        src/data/maps/debut/route-1.js   « Farfadet, niveaux 2 à 4, poids 35 »
                        │
4. PAS          src/overworld/encounters.js      le joueur marche dans l'herbe : un dé décide
                        │
5. CRÉATION     src/battle/logic/creature.js     un Farfadet niveau 3 avec ses propres gènes
                        │
6. COMBAT       src/battle/logic/engine.js       l'arbitre calcule chaque tour
                src/battle/ui/event-player.js    le spectacle le raconte, le cri est joué
                        │
7. CAPTURE      src/battle/logic/capture.js      4 secousses réussies
                        │
8. SAUVEGARDE   src/save/save-format.js          le Farfadet est écrit dans save.json
```

## Lexique

| Mot | Sens |
| --- | --- |
| Atlas | grande image qui rassemble beaucoup de petits dessins, avec un sommaire en JSON |
| Bestiole | une créature du jeu |
| Commit | enregistrement d'une étape du travail dans l'historique du projet (git) |
| Déterministe | qui donne toujours le même résultat avec les mêmes données de départ |
| Drapeau (flag) | case à cocher qui retient un fait de l'aventure |
| Electron | outil qui transforme une page web en programme pour ordinateur |
| Événement (event) | dans un combat, une chose qui s'est produite et qu'il faut raconter |
| Graine (seed) | nombre de départ de la machine à hasard |
| JSON | façon standard d'écrire des données en texte |
| Légende | correspondance entre une lettre d'une carte et une case du décor |
| Lignée | famille de bestioles qui évoluent les unes dans les autres |
| Métatuile | case de 16 × 16 pixels faite de 4 tuiles |
| Palette | les 4 vraies couleurs utilisées pour les numéros 0 à 3 |
| Patch | morceau de dessin collé par-dessus un gabarit |
| Pixel | le plus petit point de l'écran |
| Scène | un écran du jeu (titre, carte, combat, menu), posé sur une pile |
| Script | liste d'ordres qui raconte une scène de l'histoire |
| Sprite | petit dessin d'un personnage, d'une bestiole ou d'un objet |
| STAB | bonus × 1,5 quand une bestiole utilise une attaque de son type |
| Test | petit programme qui vérifie qu'un autre programme donne la bonne réponse |
| Tileset | famille de cases du décor (extérieur, ville, intérieur, grotte, spécial) |
| Trigger | case piégée qui lance un événement quand on marche dessus |
| Tuile | morceau de décor de 8 × 8 pixels |
| Warp | case qui téléporte sur une autre carte (porte, escalier) |
