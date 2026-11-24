# 02. Pixels et couleurs

Ce que tu vas apprendre :

- pourquoi l'écran du jeu est si petit ;
- comment on dessine avec seulement 4 couleurs ;
- comment un dessin peut être écrit avec des chiffres ;
- ce qu'est un atlas, et comment changer toutes les couleurs d'un coup.

## Un écran de 160 sur 144

L'écran du jeu ne fait que 160 points de large et 144 points de haut. Chaque point s'appelle un **pixel**. C'est tout petit : une photo de téléphone en a des millions.

Le jeu dessine d'abord sur cette petite feuille, puis l'agrandit pour remplir ta fenêtre, en multipliant par un nombre entier (×3, ×4, ×5…). Chaque pixel devient un carré bien net, sans flou. C'est le style des consoles portables des années 90.

Dans le code : [src/engine/renderer.js](../../src/engine/renderer.js) et les tailles dans [src/engine/constants.js](../../src/engine/constants.js).

```js
export const SCREEN_WIDTH = 160;
export const SCREEN_HEIGHT = 144;
export const TILE = 8;       // une petite tuile fait 8 × 8 pixels
export const METATILE = 16;  // une case de la carte fait 16 × 16 pixels
```

L'écran montre donc 10 cases de large et 9 cases de haut.

## Seulement 4 couleurs

Tout le jeu est dessiné avec 4 teintes, numérotées de 0 à 3 :

| Numéro | Rôle | Couleur de base |
| --- | --- | --- |
| 0 | Le plus clair (fond, reflets) | vert très pâle |
| 1 | Clair | vert clair |
| 2 | Foncé (ombres) | vert foncé |
| 3 | Le plus foncé (contours) | presque noir |

Et un cinquième signe, le point `.`, qui veut dire « transparent » : on voit ce qu'il y a derrière.

L'astuce : les dessins ne contiennent jamais de vraies couleurs, seulement des numéros. Une **palette** dit quelle couleur mettre pour chaque numéro. Change la palette, et tout le jeu change de couleur d'un coup, comme si on mettait des lunettes teintées.

Le joueur peut choisir entre 6 palettes : Classique, Azur, Sépia, Gris, Nuit et Contraste (pour mieux voir). Raccourci : SELECT + START.

Dans le code : [src/gfx/palette.js](../../src/gfx/palette.js).

```js
{ id: 'classique', name: 'Classique', colors: ['#e8f0d8', '#a8c090', '#587860', '#203028'] },
{ id: 'azur',      name: 'Azur',      colors: ['#e0f0f8', '#88b8d8', '#3a6890', '#102038'] },
```

### Les fondus au noir

Pour faire un fondu au noir entre deux écrans, le jeu ne mélange pas de couleurs. Il décale les numéros : le 0 devient 1, le 1 devient 2, et ainsi de suite, en 3 étapes, jusqu'à ce que tout soit noir. L'écran garde donc toujours ses 4 teintes. C'est la fonction `getColor` avec le « niveau de fondu ».

## Dessiner avec des chiffres

Comment écrire un dessin dans un fichier texte ? On fait comme un coloriage magique : une grille où chaque case contient un numéro de couleur.

Voici une capsule (l'objet qui sert à capturer les bestioles), tirée de [src/gfx/sources/characters/index.js](../../src/gfx/sources/characters/index.js). Le dessin fait 16 × 16 ; les lignes vides du bas sont coupées ici :

```text
................
................
................
................
.....333333.....
....30000003....
...3000000003...
...3000330003...
...3333003333...
...3222332223...
...3222222223...
....32222223....
.....333333.....
................
```

Les `3` font le contour, les `0` le haut blanc, les `2` le bas foncé. Plisse les yeux : tu vois la capsule.

Chaque dessin de ce genre s'appelle un **sprite**. Les outils de [src/gfx/sprite-utils.js](../../src/gfx/sprite-utils.js) transforment ces lignes de texte en tableau de nombres (`parseSprite`) et inversement (`spriteToRows`).

Tous les dessins du jeu ne sont pas tapés à la main, case par case. Beaucoup sont calculés à partir de formes (cercles, triangles), comme on le verra aux chapitres [04](04-bestioles-dessin.md) et [05](05-personnages.md). Mais à la fin, tout devient une grille de numéros de 0 à 3.

## Les atlas : des planches d'autocollants

Charger des milliers de petits dessins un par un serait lent. On les colle donc tous sur quelques grandes images, comme une planche d'autocollants. Ces planches s'appellent des **atlas**.

Il y en a 5, dans [assets/atlas/](../../assets/atlas/) :

| Atlas | Contenu |
| --- | --- |
| `tiles.png` | les cases des cartes (herbe, eau, murs, toits…) |
| `characters.png` | les personnages qui marchent sur la carte |
| `trainers.png` | les grands portraits des dresseurs en combat |
| `creatures.png` | les 150 bestioles, de face et de dos |
| `ui.png` | les cadres des menus, les icônes de types |

À côté de chaque image, un fichier `.json` est le « sommaire » de la planche : il dit où se trouve chaque autocollant (position, taille).

### Comment les atlas sont fabriqués

Les atlas ne sont pas dessinés dans un logiciel. Ils sont fabriqués par un programme, [tools/build-atlas.js](../../tools/build-atlas.js), lancé avec la commande `npm run atlas` :

```text
 sources en texte          programmes de         atlas
 (src/gfx/sources/)  ───▶  formes          ───▶  assets/atlas/*.png
                           (tuiles,              assets/atlas/*.json
                           portraits)
```

1. Il lit tous les dessins sources. Les bestioles y sont déjà sous forme de grilles (chapitre [04](04-bestioles-dessin.md)) ; certaines tuiles et les portraits des dresseurs sont calculés à partir de formes à ce moment-là.
2. Il range les dessins sur une grande planche, sans qu'ils se chevauchent ([tools/atlas-packer.js](../../tools/atlas-packer.js)).
3. Il écrit chaque numéro sous forme de gris : 0 = blanc, 1 = gris clair, 2 = gris foncé, 3 = noir.

Les PNG sont donc en noir et blanc. On peut même les retoucher à la main dans un logiciel de dessin, à condition de n'utiliser que ces 4 gris (le README principal explique comment).

### Comment le jeu les utilise

Au démarrage, [src/gfx/atlas.js](../../src/gfx/atlas.js) charge les 5 planches, et retransforme chaque gris en numéro de 0 à 3. Quand il faut dessiner, il colorie la planche avec la palette choisie et garde le résultat en mémoire. Changer de palette demande seulement de recolorier.

Les fonctions qui posent un dessin sur l'écran sont dans [src/gfx/draw.js](../../src/gfx/draw.js).

## La police d'écriture

Les lettres aussi sont des petits dessins de 8 × 8 pixels, accents compris (é, è, à, ç…). Elles sont décrites dans [src/gfx/font-glyphs.js](../../src/gfx/font-glyphs.js) et dessinées par [src/gfx/font.js](../../src/gfx/font.js). Un outil vérifie que chaque texte du jeu tient dans sa fenêtre (chapitre [11](11-outils-et-tests.md)).

## Petit défi

Ouvre [src/gfx/sources/characters/index.js](../../src/gfx/sources/characters/index.js) et cherche le dessin `rocher`. Essaie de le recopier sur du papier quadrillé, en coloriant chaque chiffre avec un crayon différent.

## À retenir

- L'écran fait 160 × 144 pixels, agrandi sans flou.
- Les dessins ne contiennent que des numéros de 0 à 3 ; la palette choisit les vraies couleurs.
- Un sprite peut s'écrire comme une grille de chiffres.
- Les dessins sont rassemblés sur 5 atlas, fabriqués par `npm run atlas`.
