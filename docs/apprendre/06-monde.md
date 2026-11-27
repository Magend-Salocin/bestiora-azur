# 06. Le monde

Ce que tu vas apprendre :

- comment le décor est découpé en cases, comme un jeu de construction ;
- comment une carte entière s'écrit avec des lettres ;
- comment on pose des maisons, des portes, des habitants, des objets ;
- comment les cartes se relient entre elles ;
- comment marchent les collisions, les herbes hautes et les rencontres sauvages.

## La région de Brumeval

L'aventure se passe à Brumeval, une péninsule inventée : des marais au sud, des falaises venteuses à l'est, des montagnes enneigées au nord. Elle compte 113 cartes : villes, routes, grottes, maisons, arènes, jusqu'à la Ligue tout au nord.

Le plan général, avec l'ordre de l'aventure, est dans [docs/carte/WORLD_MAP.md](../carte/WORLD_MAP.md). La petite carte de la région affichée dans le Bestiaire est décrite dans [src/data/region.js](../../src/data/region.js).

## Des cases, comme des carreaux de mosaïque

Le décor est un quadrillage, comme une mosaïque ou un jeu de briques. Il y a deux tailles :

- la **tuile** : 8 × 8 pixels, le plus petit morceau ;
- la **métatuile** : 16 × 16 pixels, faite de 4 tuiles. C'est une **case** de la carte, celle où se tient un personnage.

```text
 ┌───────┬───────┐
 │ tuile │ tuile │      4 tuiles de 8 × 8
 ├───────┼───────┤  =   1 métatuile de 16 × 16 = 1 case de la carte
 │ tuile │ tuile │
 └───────┴───────┘
```

### Les familles de cases (tilesets)

Les cases sont rangées en 5 familles, appelées **tilesets** :

| Tileset | Pour quoi | Exemples de cases |
| --- | --- | --- |
| `outdoor` | routes et forêts | herbe, herbe haute, chemin, arbre, eau, corniche |
| `town` | villes (reprend tout `outdoor`) | sol de ville, toits, murs, portes |
| `indoor` | intérieurs | parquet, lit, table, étagère, comptoir, machine de soin |
| `cave` | grottes | sol, paroi, échelle, stalagmite, glace |
| `special` | lieux uniques | sol de la Tour, téléporteurs, lave, courants d'air |

Les dessins de ces cases sont dans [src/gfx/sources/tiles/](../../src/gfx/sources/tiles/), un fichier par famille.

### Comment une case est dessinée

Certaines cases sont écrites en chiffres, comme la capsule du chapitre [02](02-pixels-et-couleurs.md). L'eau, par exemple, est un petit motif de 8 × 8 répété :

```text
11111111
11000111
10111011
11111111
11111111
01111100
10111011
11111111
```

D'autres sont dessinées avec des formes. L'arbre est un rectangle pour le tronc et trois ellipses pour le feuillage, rendus par la machine à dessiner du chapitre [04](04-bestioles-dessin.md). Il fait 32 × 32 pixels, puis il est découpé en 4 cases (`tree_tl`, `tree_tr`, `tree_bl`, `tree_br` : haut-gauche, haut-droite, bas-gauche, bas-droite).

Des outils de [src/gfx/sources/tiles/tile-helpers.js](../../src/gfx/sources/tiles/tile-helpers.js) aident à fabriquer les cases :

| Outil | Rôle |
| --- | --- |
| `quad` | assemble 4 tuiles de 8 × 8 en une case |
| `tileRows` | répète un petit motif pour remplir une case |
| `overlay` | pose un dessin par-dessus un autre (un rocher sur de l'herbe) |
| `shiftRows` | décale un dessin de quelques pixels, pour faire une animation |
| `flipX` | retourne un dessin comme dans un miroir |

### Des cases qui bougent

L'eau et les herbes hautes ondulent. Pour ça, la case a deux images : la deuxième est la première décalée de 1 ou 2 pixels (`shiftRows`). Le jeu alterne entre les deux.

### Ce que chaque case sait faire

Chaque case porte des **drapeaux** qui disent comment elle se comporte :

```js
metatile('tall_grass', [...], { grass: true }),          // des bestioles s'y cachent
metatile('tree_tl', TREE.tl, { solid: true }),           // on ne peut pas traverser
metatile('shrub', SHRUB, { solid: true, cuttable: true }), // bloque, mais la Machette la coupe
metatile('boulder', ..., { solid: true, pushable: true }), // les Gants de force le poussent
metatile('ledge_down', LEDGE_DOWN, { ledge: 'down' }),   // corniche : on saute vers le bas
metatile('water', WATER_FRAMES, { water: true }),        // il faut la Bouée
```

| Drapeau | Effet |
| --- | --- |
| `solid` | bloque le passage |
| `grass` | herbe haute : rencontres sauvages |
| `water` | eau : on ne passe qu'en nageant |
| `ledge` | corniche : on peut sauter par-dessus, dans un seul sens |
| `cuttable` | se coupe avec la Machette |
| `pushable` | se pousse avec les Gants de force |
| `climbable` | s'escalade avec le Grappin |
| `door` | porte |
| `counter` | comptoir : on parle à la personne derrière |
| `slippery` | glace : on glisse jusqu'à toucher un obstacle |
| `current` | courant d'air : il te pousse |

## Écrire une carte avec des lettres

Voici l'idée la plus astucieuse du monde : chaque carte est dessinée avec des caractères, une ligne par rangée de cases. Chaque caractère représente une case.

Voici Hameau-de-Lys, le village de départ, dans [src/data/maps/debut/hameau-de-lys.js](../../src/data/maps/debut/hameau-de-lys.js) :

```text
FTTTTTTTT::TTTTTTTTF
FTTTTTTTT::TTTTTTTTF
TT_______::_______TT
TT_______::_______TT
TT_______::_______TT
TT_____M_::_____M_TT
TT__::::::::::::__TT
TT______S::_______TT
TT_______::_______TT
TT_______::_______TT
TT_~~~~__::_______TT
TT_~~~~__::_______TT
TT_~~~~__:::::S___TT
TT______*_**_*____TT
TT_**_____________TT
TT________________TT
TTTTTTTTTTTTTTTTTTTT
TTTTTTTTTTTTTTTTTTTT
```

Avec la **légende**, tout devient clair :

| Caractère | Case |
| --- | --- |
| `T` | arbre |
| `F` | barrière |
| `_` | sol de ville |
| `:` | chemin |
| `~` | eau (la mare) |
| `*` | fleurs |
| `S` | panneau |
| `M` | boîte aux lettres |

On voit la forêt tout autour, le chemin qui monte vers le nord, la mare à gauche, et les deux boîtes aux lettres devant les deux maisons.

Les légendes de chaque famille sont dans [src/overworld/map-loader.js](../../src/overworld/map-loader.js) (`DEFAULT_LEGENDS`). Une carte peut ajouter ses propres caractères avec `legend`.

### Le truc des arbres

Un arbre occupe 2 × 2 cases. Pourtant, on écrit juste `T`. Comment le jeu sait-il quel quart d'arbre mettre ?

La légende de `T` est un **motif** :

```js
T: { pattern: [['tree_tl', 'tree_tr'], ['tree_bl', 'tree_br']] }
```

Le jeu regarde où commence le groupe de `T` voisins, puis compte : le premier `T` reçoit le haut-gauche, le deuxième le haut-droite, et ainsi de suite. Écrire `TT` sur deux lignes donne un arbre complet ; un carré de 4 × 4 `T` donne 4 arbres. Le même truc sert aux tables (2 × 2), aux lits et aux étagères (1 × 2).

### Les bâtiments

Dessiner une maison lettre par lettre serait pénible. On la pose donc d'un coup avec `structures` :

```js
structures: [
  { type: 'house_a', x: 3, y: 3, width: 4, door: 1 },   // la maison du joueur
  { type: 'house_b', x: 12, y: 3, width: 4, door: 1 },  // la maison de la rivale
  { type: 'lab', x: 11, y: 9, width: 6, door: 2 },      // le labo de la professeure
],
```

Une structure fait 3 rangées : le haut du toit, le toit, le mur. `width` donne la largeur, `door` la colonne de la porte. Les Haltes (centres de soin), Comptoirs (boutiques), arènes et labos ont en plus un emblème au milieu du toit. Il existe aussi des usines, des phares, des éoliennes.

## Tout ce qu'on pose sur une carte

Une carte n'est pas qu'un décor. Le fichier contient aussi tout ce qui s'y passe :

```js
export default {
  id: 'route_1',
  name: 'Route 1',
  tileset: 'outdoor',
  music: 'route_1',
  layers: { ground: [...] },             // le décor en lettres
  structures: [...],                     // les bâtiments
  encounters: {...},                     // les bestioles sauvages
  warps: [...],                          // les portes et escaliers
  npcs: [...],                           // les habitants
  trainers: [...],                       // les dresseurs
  signs: [...],                          // les panneaux
  items: [...],                          // les objets à ramasser
  hiddenItems: [...],                    // les objets cachés
  triggers: [...],                       // les cases piégées qui lancent un événement
  connections: { north: 'bourg_sablon', south: 'hameau_de_lys', east: null, west: null },
  scripts: {...},                        // les petites histoires de cette carte
};
```

Le format complet est dans [docs/carte/MAP_FORMAT.md](../carte/MAP_FORMAT.md). Voici les éléments principaux.

### Les portes (warps)

Un **warp** est une case magique : quand tu marches dessus, tu es transporté sur une autre carte.

```js
warps: [
  { x: 4, y: 5, to: 'maison_joueur_1f', toX: 3, toY: 7 },
],
```

« Si le joueur arrive sur la case (4, 5), l'emmener dans la maison du joueur, rez-de-chaussée, case (3, 7). » La case (4, 5) est justement la porte de la maison `house_a` posée en (3, 3) : colonne 3 + 1 = 4, rangée 3 + 2 = 5.

### Les objets

```js
items: [{ x: 16, y: 10, item: 'capsule', flag: 'item_route_1_2' }],
hiddenItems: [{ x: 17, y: 22, item: 'sel_eveil', flag: 'hidden_route_1_1' }],
```

Un objet visible est une capsule posée par terre. Un objet caché est invisible : il faut appuyer sur A face à la bonne case. Le `flag` (drapeau) retient qu'il a été ramassé, pour qu'il ne revienne pas.

### Les cases piégées (triggers)

Un **trigger** est une zone invisible qui lance un événement quand tu marches dedans. À Hameau-de-Lys, si tu essaies de partir vers le nord sans bestiole, la professeure accourt pour t'arrêter : c'est un trigger posé sur la sortie. Le chapitre [07](07-histoire-scripts.md) explique ces événements.

## Relier les cartes

Il y a deux façons de passer d'une carte à l'autre.

**Les connexions**, pour l'extérieur : la Route 1 est collée au nord de Hameau-de-Lys. Pas d'écran noir : la carte voisine est déjà visible au bord de l'écran, et on passe de l'une à l'autre en marchant. Pour que ça marche, les deux cartes doivent se citer mutuellement (`north` d'un côté, `south` de l'autre) et avoir des bords de même taille.

**Les warps**, pour les portes, escaliers et entrées de grottes : un fondu au noir, puis on apparaît dans l'autre carte.

Le jeu garde en mémoire la carte actuelle et ses voisines ([src/overworld/world.js](../../src/overworld/world.js)). Quand tu franchis un bord, la voisine devient la carte actuelle, et tes coordonnées sont recalculées.

### La caméra

L'écran montre 10 × 9 cases. La caméra suit le joueur, qui reste au centre. Mais elle s'arrête au bord d'une carte sans voisine, pour ne pas montrer de vide. Une petite pièce plus petite que l'écran est centrée. C'est la fonction `computeCamera`.

## De la carte en lettres à la carte du jeu

Au moment d'entrer sur une carte, [src/overworld/map-loader.js](../../src/overworld/map-loader.js) la prépare (fonction `buildMap`) :

1. il choisit la légende de la famille de cases, plus les ajouts de la carte ;
2. il traduit chaque caractère en nom de case (`T` devient `tree_tl`, `tree_tr`…) ;
3. il pose les bâtiments par-dessus ;
4. il lit les exceptions de collision (une case normalement bloquante qu'on veut rendre praticable, ou l'inverse) ;
5. il fournit des petites fonctions pratiques : « quelle case en (x, y) ? », « est-ce dans la carte ? ».

Si un caractère est inconnu, le chargement échoue tout de suite avec un message clair. Le vérificateur `npm run validate` attrape ces erreurs avant même de lancer le jeu.

## Marcher : peut-on aller sur cette case ?

Chaque fois que tu appuies sur une flèche, le jeu demande à [src/overworld/collision.js](../../src/overworld/collision.js) ce qui va se passer. La réponse est l'une de quatre :

| Réponse | Quand |
| --- | --- |
| `walk` (marcher) | la case est libre |
| `jump` (sauter) | c'est une corniche dans le bon sens : on atterrit 2 cases plus loin |
| `edge` (bord) | on sort de la carte : le jeu cherche la carte voisine |
| `blocked` (bloqué) | arbre, mur, eau sans Bouée, corniche à l'envers, ou quelqu'un sur la case |

Le joueur avance d'une case à la fois, en glissant de pixel en pixel. Avec les Chaussures, en gardant B enfoncé, il va deux fois plus vite.

## Après chaque pas

Quand le joueur arrive sur une nouvelle case, le jeu vérifie dans l'ordre ([src/overworld/overworld-scene.js](../../src/overworld/overworld-scene.js), fonction `onPlayerArrived`) :

1. Est-ce que je suis sorti de la carte ? Passer à la voisine.
2. Est-ce une porte (warp) ? Changer de carte.
3. Est-ce une case piégée (trigger) ? Lancer l'événement.
4. Est-ce de la glace ou un courant d'air ? Continuer à glisser.
5. Est-ce qu'un dresseur me voit ? Il vient me défier.
6. Est-ce de l'herbe haute, une grotte ou de l'eau ? Tirer au sort une rencontre sauvage.

## Les rencontres sauvages

Chaque carte peut avoir une table de rencontres :

```js
encounters: {
  rate: 10,   // 10 % de chances à chaque pas dans l'herbe haute
  grass: [
    { creature: 'farfadet',    minLevel: 2, maxLevel: 4, weight: 35 },
    { creature: 'poulpiquet', minLevel: 2, maxLevel: 4, weight: 35 },
    { creature: 'chauchet', minLevel: 2, maxLevel: 3, weight: 20 },
    { creature: 'faramin',   minLevel: 4, maxLevel: 4, weight: 5 },
    { creature: 'mandragot',   minLevel: 4, maxLevel: 4, weight: 5 },
  ],
},
```

Le tirage se fait en deux temps ([src/overworld/encounters.js](../../src/overworld/encounters.js)) :

1. Lancer un dé à 100 faces. Si le résultat est sous `rate` (10), une bestiole surgit.
2. Choisir laquelle avec les **poids** (`weight`). Imagine un sac de 100 billes : 35 billes Farfadet, 35 Poulpiquet, 20 Chauchet, 5 Faramin, 5 Mandragot. On en tire une. Le Farfadet sort souvent, le Mandragot rarement.
3. Tirer son niveau entre `minLevel` et `maxLevel`.

Il y a trois tables possibles : `grass` (herbe haute), `water` (en nageant) et `cave` (partout dans une grotte). Si un Répulsif est actif, les bestioles plus faibles que ta première bestiole ne viennent pas.

## Les objets de terrain : les clés de l'aventure

Certains obstacles bloquent le chemin tant que tu n'as pas le bon objet et le bon badge d'arène. C'est ce qui force l'ordre de l'aventure. Les règles sont dans [src/data/field-abilities.js](../../src/data/field-abilities.js) :

| Action | Obstacle | Objet | Badge nécessaire |
| --- | --- | --- | --- |
| Couper | arbuste | Machette | Eau |
| Éclairer | grotte sombre | Lanterne | Foudre |
| Escalader | corniche marquée | Grappin | Flore |
| Nager | eau | Bouée | Vent |
| Pousser | rocher | Gants de force | Vent |
| Voler | (voyage rapide vers une ville visitée) | Cerf-volant | Ombre |

Si tu essaies sans l'objet ou sans le badge, un message t'explique ce qui manque. Un arbuste coupé repousse quand tu reviens sur la carte.

Dans une grotte sombre (`dark: true`), sans Lanterne, tu ne vois qu'un petit cercle autour de toi.

## Le dessin du monde

À chaque image, [src/overworld/world-renderer.js](../../src/overworld/world-renderer.js) dessine, dans l'ordre :

1. les cases visibles, y compris celles des cartes voisines ;
2. les objets et les personnages, triés de haut en bas pour qu'ils se cachent correctement ;
3. le bas des herbes hautes par-dessus les pieds, pour qu'on ait l'air d'être dedans ;
4. le « ! » des dresseurs ;
5. l'obscurité des grottes sombres.

Les personnages sont dessinés 4 pixels plus haut que leur case, pour qu'ils aient l'air posés sur le sol.

## Où sont rangées les cartes

Les cartes sont rangées par zone, un dossier par zone, dans [src/data/maps/](../../src/data/maps/) :

| Dossier | Zone |
| --- | --- |
| `debut` | Hameau-de-Lys, Route 1, Bourg-Sablon |
| `bois` | Route 2, Bois Murmurant, Route 3, Grotte des Cascades |
| `port` | Port-Ondine, Routes 4 et 5, Vireval, usine Opale |
| `cendrelune` | Route 6, Tunnel Obscur, Cendrelune, Tour de la Mémoire |
| `bise` | Route 7, Falaises de Bise, Haute-Bise |
| `marais` | Route 8, Marais Gris |
| `ombrecourt` | Ombrecourt, casino, QG du Syndicat Opale |
| `mer` | Routes maritimes, Îlots, Bibliothèque Engloutie |
| `forge` | Forge-Ardente, Cœur de la Forge |
| `givremont` | Givremont |
| `centrale` | Centrale abandonnée |
| `ligue` | Col des Échos, Citadelle d'Azur, salles de la Ligue |
| `postjeu` | Pic d'Azur, Grotte Boréale |
| `test` | cartes de test, seulement en mode développeur |

Chaque dossier a un `index.js` qui liste ses cartes, et [src/data/maps/index.js](../../src/data/maps/index.js) les rassemble toutes. On y trouve aussi le point de départ d'une nouvelle partie : la chambre du joueur, à l'étage de sa maison.

Pour voir une carte en image sans lancer le jeu : `npm run map-preview -- route_1` crée `out/maps/route_1.png`.

## Petit défi

Sur du papier quadrillé, dessine ta propre petite carte de 10 × 9 cases avec la légende ci-dessus : une mare, un chemin, des arbres, de l'herbe haute. Puis écris-la en lettres, une ligne par rangée. Vérifie que toutes tes lignes ont le même nombre de caractères : c'est obligatoire.

## À retenir

- Le décor est fait de cases de 16 × 16, rangées en 5 familles.
- Chaque case porte des drapeaux : bloquante, herbe, eau, corniche…
- Une carte s'écrit en lettres, une ligne par rangée ; une légende traduit chaque lettre.
- Les bâtiments, portes, habitants, objets et rencontres sont décrits dans le même fichier.
- Les cartes se relient par connexions (sans transition) ou par warps (portes).
- Les rencontres sauvages : un dé pour savoir si, un sac de billes pondéré pour savoir qui.
- Les objets de terrain et les badges imposent l'ordre de l'aventure.
