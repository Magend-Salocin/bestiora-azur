# 01. Vue d'ensemble

Ce que tu vas apprendre :

- comment le jeu a été fabriqué ;
- comment ses fichiers sont rangés ;
- comment il fonctionne, 60 fois par seconde ;
- pourquoi les dessins, la logique et les données sont séparés.

## Un jeu fabriqué étape par étape

Bestiora Azur est un jeu d'aventure où l'on capture des créatures, les **bestioles**, et où on les fait combattre. Tout est inventé : les bestioles, la région de Brumeval, les personnages, les musiques.

Le code a été écrit par une intelligence artificielle (Claude), guidée par 13 « recettes » écrites à l'avance, rangées dans le dossier [prompts/](../prompts/phase-1/). Comme pour construire une maison, chaque recette s'appuie sur la précédente :

| Étape | Recette | Ce qui a été construit |
| --- | --- | --- |
| 1 | [01-socle-electron.md](../prompts/phase-1/01-socle-electron.md) | La fenêtre du jeu, la boucle, le clavier |
| 2 | [02-graphismes-atlas.md](../prompts/phase-1/02-graphismes-atlas.md) | Les dessins : tuiles, personnages, bestioles |
| 3 | [03-donnees-jeu.md](../prompts/phase-1/03-donnees-jeu.md) | Les fiches des 150 bestioles, attaques, objets |
| 4 | [04-moteur-carte.md](../prompts/phase-1/04-moteur-carte.md) | Se déplacer sur une carte |
| 5 | [05-logique-combat.md](../prompts/phase-1/05-logique-combat.md) | Les règles du combat |
| 6 | [06-interface-combat.md](../prompts/phase-1/06-interface-combat.md) | L'écran de combat |
| 7 | [07-menus-systemes.md](../prompts/phase-1/07-menus-systemes.md) | Les menus, le sac, l'équipe |
| 8 | [08-audio.md](../prompts/phase-1/08-audio.md) | La musique et les sons |
| 9 à 11 | [09](../prompts/phase-1/09-monde-partie-1.md), [10](../prompts/phase-1/10-monde-partie-2.md), [11](../prompts/phase-1/11-ligue-post-jeu.md) | Tout le monde, de la première maison jusqu'à la Ligue |
| 12 | [12-sauvegarde-finition.md](../prompts/phase-1/12-sauvegarde-finition.md) | La sauvegarde et les finitions |
| 13 | [13-recette.md](../prompts/phase-1/13-recette.md) | Les vérifications finales |

Après chaque étape, une note a été ajoutée dans [docs/progress/PROGRESS.md](../progress/PROGRESS.md), le journal de bord du chantier.

## Le rangement : une maison avec des pièces

Imagine le projet comme une maison. Chaque pièce a un rôle, et on ne range pas les casseroles dans la salle de bain.

```text
pokemon_blue/
  src/            le jeu lui-même
    engine/       la salle des machines : boucle, clavier, écran
    gfx/          l'atelier de dessin
    data/         la bibliothèque : bestioles, attaques, cartes, textes
    overworld/    l'exploration : marcher, parler, entrer dans une maison
    battle/       l'arène : règles du combat (logic) et écran de combat (ui)
    ui/           les menus et les boîtes de dialogue
    audio/        la salle de musique
    state/        le carnet du joueur : équipe, sac, badges
    save/         le coffre-fort : la sauvegarde
  assets/atlas/   les grandes planches d'images fabriquées par les outils
  tools/          la boîte à outils des développeurs
  tests/          les contrôles automatiques
  electron/       l'emballage qui transforme le jeu en programme pour ordinateur
  docs/           les documents
```

Le chapitre [12](12-ou-se-trouve-quoi.md) détaille chaque fichier.

## Trois grandes idées

### 1. Les données ne sont pas du code

Une bestiole, une carte ou un dialogue ne sont pas « programmés ». Ce sont des fiches remplies, comme des fiches de bibliothèque. Par exemple, la Route 1 est décrite par un dessin en lettres (voir chapitre [06](06-monde.md)), et le Korrigan par une fiche avec son nom, son type, ses forces (chapitre [03](03-bestioles-fiche.md)).

Avantage : pour ajouter une bestiole ou une maison, on remplit une fiche, on ne touche pas au moteur.

### 2. La logique ne dessine pas

Le calcul des dégâts d'une attaque n'a pas besoin de savoir à quoi ressemble l'écran. Les règles (dossiers `battle/logic`, `data`, `state`, `save`) sont donc écrites à part du dessin. Grâce à ça, on peut les tester avec des robots, sans même ouvrir le jeu (chapitre [11](11-outils-et-tests.md)).

### 3. Le hasard est contrôlé

Le jeu utilise beaucoup de hasard : rencontres dans les herbes, coups critiques, capture. Mais ce hasard vient d'une machine à nombres qu'on démarre avec une **graine** (un nombre de départ). Même graine, mêmes tirages. C'est comme un jeu de cartes qu'on mélangerait toujours de la même façon si on part du même paquet.

Dans le code, c'est [src/engine/rng.js](../../src/engine/rng.js) (RNG veut dire « générateur de nombres aléatoires ») :

```js
const rng = createRng(1013);   // la graine
rng.int(1, 6);                 // un dé à 6 faces
rng.chance(0.1);               // vrai 1 fois sur 10
rng.weighted([...]);           // tirage où certains choix ont plus de chances
```

Cette idée est très importante pour le dessin des bestioles (chapitre [04](04-bestioles-dessin.md)).

## Le cœur du jeu bat 60 fois par seconde

Un jeu vidéo, c'est comme un dessin animé : une suite d'images qui changent très vite. À chaque battement, le jeu fait deux choses :

1. **Mettre à jour** (update) : lire les touches, avancer le joueur d'un petit pas, faire tourner l'horloge.
2. **Dessiner** (render) : peindre la nouvelle image à l'écran.

Le jeu fait exactement 60 mises à jour par seconde, même si l'ordinateur est lent ou rapide. C'est la boucle de [src/engine/loop.js](../../src/engine/loop.js). Si la fenêtre perd le focus, la boucle se met en pause : le temps de jeu n'avance plus.

```text
  ┌───────────────┐      ┌───────────────┐
  │ lire touches  │ ───▶ │ mettre à jour │ ───▶ dessiner ───▶ (recommencer 1/60 s plus tard)
  └───────────────┘      └───────────────┘
```

## Les scènes, une pile d'assiettes

Le jeu est découpé en **scènes** : écran titre, exploration, combat, menu, dialogue. Elles sont empilées comme des assiettes. Seule l'assiette du dessus reçoit les touches du clavier.

```text
  [ boîte de dialogue ]   ← reçoit les touches
  [ carte du monde    ]   ← reste visible derrière (la boîte est « transparente »)
```

Quand tu parles à un habitant, une scène « dialogue » est posée sur la scène « carte ». Quand le dialogue se termine, on la retire et la carte reprend. Le gestionnaire de pile est [src/engine/scene-manager.js](../../src/engine/scene-manager.js). Il sait aussi faire les fondus au noir entre deux scènes.

## Le démarrage du jeu

Le point d'entrée est [src/main.js](../../src/main.js). Au lancement, il :

1. prépare l'écran, le clavier et le son ;
2. affiche une scène de chargement ;
3. charge les options et les 5 planches d'images (les atlas) ;
4. branche le combat et les menus sur l'exploration ;
5. affiche l'écran titre (ou, en mode développeur, une carte de test).

Choisir NOUVELLE PARTIE lance l'introduction de la professeure, puis place le joueur dans sa chambre. CONTINUER relit la sauvegarde.

## Ordinateur et navigateur

Le même jeu tourne de deux façons :

- comme un programme d'ordinateur, grâce à **Electron** (dossier [electron/](../../electron/)), qui ouvre une fenêtre et écrit les sauvegardes sur le disque ;
- dans un navigateur, par exemple sur un iPhone, avec des boutons tactiles à l'écran.

Le chapitre [10](10-sauvegarde-menus.md) explique la différence.

## À retenir

- Le projet est rangé par rôle : moteur, dessin, données, exploration, combat, menus, son.
- Les bestioles, cartes et dialogues sont des fiches de données.
- Les règles sont séparées du dessin, ce qui permet de les tester.
- Le hasard part d'une graine : même graine, même résultat.
- Le jeu se met à jour 60 fois par seconde et empile des scènes.
