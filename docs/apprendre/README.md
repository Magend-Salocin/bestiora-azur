# Comprendre le code de Bestiora Azur

Cette documentation explique comment le jeu est fabriqué, partie par partie. Elle est écrite pour des élèves de CM2 : chaque chapitre commence par une explication simple, avec des comparaisons de la vie de tous les jours, puis montre le vrai code et dit dans quel fichier il se trouve.

Tu n'as pas besoin de savoir programmer pour lire les premières parties de chaque chapitre. Les extraits de code et les liens vers les fichiers sont pour ceux qui veulent aller plus loin.

## Par où commencer

Lis les chapitres dans l'ordre la première fois. Ensuite, sers-toi du chapitre 12 comme d'un plan pour retrouver un fichier.

| # | Chapitre | Ce que tu vas découvrir |
| --- | --- | --- |
| 01 | [Vue d'ensemble](01-vue-ensemble.md) | Comment le jeu a été fabriqué, comment il est rangé, comment il « respire » 60 fois par seconde |
| 02 | [Pixels et couleurs](02-pixels-et-couleurs.md) | L'écran minuscule, les 4 couleurs, les dessins écrits avec des chiffres, les atlas |
| 03 | [La fiche d'une bestiole](03-bestioles-fiche.md) | Ce qu'on sait d'une bestiole : types, statistiques, niveaux, gènes, évolutions |
| 04 | [Comment on dessine une bestiole](04-bestioles-dessin.md) | Les 150 bestioles dessinées à la main, avec des formes peintes en calques |
| 05 | [Les personnages](05-personnages.md) | Le joueur, les habitants, les dresseurs : petits sprites et grands portraits |
| 06 | [Le monde](06-monde.md) | Les tuiles, les cartes écrites en texte, les routes, les maisons, les herbes hautes |
| 07 | [L'histoire et les événements](07-histoire-scripts.md) | Les scripts, les drapeaux, les dialogues, l'ordre de l'aventure |
| 08 | [Le combat](08-combat.md) | Qui attaque en premier, le calcul des dégâts, les types, la capture, l'expérience |
| 09 | [La musique et les sons](09-musique-et-sons.md) | Un synthétiseur à 4 voix, des partitions en texte, des cris inventés |
| 10 | [Sauvegarde, menus et commandes](10-sauvegarde-menus.md) | Ce que le jeu retient, les menus, le clavier et la manette, la version web |
| 11 | [Les outils et les tests](11-outils-et-tests.md) | Les robots qui vérifient le jeu, le menu secret des développeurs |
| 12 | [Où se trouve quoi](12-ou-se-trouve-quoi.md) | Le plan complet des dossiers, « je veux changer X, je vais dans Y », le lexique |

## Comment lire les exemples

Le code du jeu est écrit en JavaScript. Les noms dans le code sont en anglais (`createCreature` veut dire « créer une bestiole »), les textes du jeu sont en français. Quand un mot anglais apparaît, il est traduit à côté.

Les liens vers les fichiers s'ouvrent directement dans l'éditeur. Par exemple : [src/data/creatures.js](../../src/data/creatures.js) contient les 150 bestioles.

## Les autres documents

Ce dossier ne remplace pas les documents de référence, plus techniques :

- [docs/GAME_DESIGN.md](../GAME_DESIGN.md) : les règles du jeu et tout son contenu.
- [docs/ARCHITECTURE.md](../ARCHITECTURE.md) : l'organisation du code, pour les développeurs.
- [docs/MAP_FORMAT.md](../MAP_FORMAT.md) : le format exact des cartes.
- [docs/AUDIO_FORMAT.md](../AUDIO_FORMAT.md) : le format exact des musiques.
- [docs/WORLD_MAP.md](../WORLD_MAP.md) : toutes les cartes et leurs liaisons.
- [docs/BESTIAIRE.md](../BESTIAIRE.md) : la liste des 150 bestioles.
