# 05. Les personnages

Ce que tu vas apprendre :

- comment sont fabriqués les petits personnages qui marchent sur la carte ;
- comment sont fabriqués les grands portraits des dresseurs en combat ;
- comment on décrit un habitant, un dresseur, et son équipe ;
- comment un personnage bouge tout seul.

## Deux tailles de personnages

Un même personnage peut apparaître de deux façons :

| Où | Taille | Fabriqué par | Atlas |
| --- | --- | --- | --- |
| Sur la carte, quand il marche | 16 × 16 pixels | un assembleur de morceaux de texte | `characters.png` |
| En combat, en portrait | 48 × 48 pixels | la machine à dessiner du chapitre 04 | `trainers.png` |

Les deux méthodes partent d'une **fiche d'apparence** : quelques mots qui décrivent la coiffure, les couleurs des vêtements, les accessoires. Comme quand on habille un personnage dans un jeu de création d'avatar.

## Les personnages sur la carte

### Un gabarit, comme une poupée en papier

Tous les personnages de la carte partent du même gabarit : une tête, un corps et des jambes. Le gabarit est écrit avec des lettres au lieu de chiffres. Chaque lettre veut dire « ici, il y a telle partie » :

| Lettre | Partie | Couleur |
| --- | --- | --- |
| `o` | contour | toujours 3 (la plus foncée) |
| `e` | œil | toujours 3 |
| `f` | chaussure | toujours 3 |
| `s` | peau | toujours 0 (la plus claire) |
| `a` | bras | toujours 0 |
| `k` | sac à dos | toujours 2 |
| `h` | cheveux | choisie par la fiche |
| `c` | casquette, chapeau, capuche | choisie par la fiche |
| `t` | haut (t-shirt, veste) | choisie par la fiche |
| `b` | bas (pantalon, jupe) | choisie par la fiche |

Voici la tête vue de face, dans [src/gfx/sources/characters/character-parts.js](../../src/gfx/sources/characters/character-parts.js) :

```text
.....oooooo.....
...oohhhhhhoo...
..ohhhhhhhhhho..
..ohhhhhhhhhho..
..ohhsssssshho..
..ohsessssesho..
..ohsessssesho..
..osssssssssso..
...oossssssoo...
```

On reconnaît les cheveux (`h`) en haut, le visage (`s`) en bas, et les deux yeux (`e`).

### Les « patchs » : coller des morceaux par-dessus

Pour changer de coiffure ou ajouter des lunettes, on ne redessine pas tout. On colle un **patch** par-dessus le gabarit, comme un autocollant. Dans un patch, le signe `_` veut dire « garde ce qu'il y avait dessous ».

Par exemple, la coiffure `spiky` (cheveux en pointes) remplace seulement les deux premières lignes :

```text
...oo.oooo.oo...
..ohhohhhhohho..
```

Il existe 10 coiffures ou couvre-chefs (`short`, `spiky`, `long`, `ponytail`, `cap`, `hat`, `bald`, `helmet`, `hood`, `bandana`), plusieurs tenues (`dress`, `coat`, `shorts`, `swimsuit`) et des accessoires (`glasses`, `beard`, `backpack`).

### La fiche d'apparence

Chaque personnage est décrit en une ligne dans [src/gfx/sources/characters/index.js](../../src/gfx/sources/characters/index.js) :

```js
joueur:       { hair: 'cap', hairTone: 3, capTone: 2, top: 1, bottom: 2 },
professeure:  { hair: 'long', hairTone: 2, top: 0, bottom: 2, body: 'coat', extras: ['glasses'] },
vieil_homme:  { hair: 'bald', hairTone: 1, top: 2, bottom: 2 },
```

La fonction `composeCharacter` prend cette fiche et :

1. part du gabarit ;
2. colle le patch de la coiffure ;
3. colle le patch de la tenue ;
4. colle les patchs des accessoires ;
5. remplace chaque lettre par son numéro de couleur.

Résultat, de gauche à droite : la professeure (cheveux longs, blouse, lunettes), le vieil homme (chauve) et le joueur de profil en train de marcher :

```text
.....333333.....   .....333333.....   .....333333.....
...3322222233...   ...3300000033...   ...3322222233...
..322222222223..   ..300000000003..   ..322222222223..
..322222222223..   ..310000000013..   .3333333222223..
..322000000223..   ..311000000113..   ..300000033333..
..320303303023..   ..310300003013..   ..303000033333..
..320300003023..   ..310300003013..   ..303000033333..
..320000000023..   ..300000000003..   ..300000003333..
..322300003223..   ...3300000033...   ...3300000033...
..320000000023..   ...3222222223...   ....31111113....
..320000000023..   ..302222222203..   ....31110113....
..300000000003..   ..302222222203..   ....31110113....
...3000000003...   ...3222222223...   ....32222223....
...3222332223...   ...3222332223...   ...32223.3223...
...3333..3333...   ...3333..3333...   ..33333..3333...
...3333..3333...   ...3333..3333...   ..33333..3333...
```

### Marcher dans 4 directions avec seulement 3 dessins

Chaque personnage a 3 directions (bas, haut, gauche) et 2 images par direction (debout, en train de marcher). Soit 6 petits dessins.

Et vers la droite ? Pas besoin de dessin : le jeu retourne l'image « gauche » comme dans un miroir. De la même façon, pour marcher vers le haut ou le bas, il utilise une seule image de pas et la retourne un pas sur deux, pour que les jambes alternent. Le code est la fonction `animationFrame` de [src/overworld/actor.js](../../src/overworld/actor.js).

Le joueur a deux variantes : `joueur` ou `joueuse` selon le choix fait au début, et `joueur_bouee` quand il nage sur l'eau avec sa Bouée.

## Les portraits de combat

En combat, l'adversaire apparaît en grand (48 × 48), et toi de dos. Ces portraits sont fabriqués avec la même machine à dessiner que les bestioles ([src/gfx/shape-renderer.js](../../src/gfx/shape-renderer.js)) : des ellipses pour la tête, un polygone pour les épaules, etc.

La fiche d'un portrait, dans [src/gfx/sources/trainers/index.js](../../src/gfx/sources/trainers/index.js), a plus de choix :

```js
professeure: { hair: 'long', hairTone: 2, top: 1, outfit: 'coat', extras: ['glasses', 'lashes'], expression: 'smile' },
```

| Ingrédient | Choix possibles |
| --- | --- |
| `build` (carrure) | `adult` (adulte), `kid` (enfant), `large` (costaud) |
| `hair` | `short`, `long`, `spiky`, `bald`, `bun` (chignon), `ponytail`, `curly` (bouclés) |
| `outfit` (tenue) | `shirt`, `coat`, `jacket`, `swim`, `uniform`, `robe` |
| `hat` | `cap`, `hat`, `helmet`, `hood`, `bandana`, `beanie` (bonnet) |
| `extras` | `glasses`, `beard`, `mustache`, `backpack`, `scarf`, `lashes` (cils) |
| `expression` | `smile` (sourire), `neutral`, `smirk` (sourire en coin), `stern` (sévère) |

L'expression change les sourcils et la bouche, posés comme des tampons. Voici le portrait de la professeure Morvan :

```text
...................3333333333...................
.................33322222223333.................
...............332222222222222333...............
..............32222222222222222233..............
.............3222222222222222222233.............
............322222222222222222222333............
............322221111222222222222233............
............322211111222222222222233............
...........32222211112222222222222333...........
...........32222222222222222222222333...........
...........32232222222222222232222333...........
..........3322333322222222333323223333..........
..........3322333333333333333333223333..........
..........3322333333333333333333223333..........
..........3322333033333333333313223333..........
..........3322333033300000033313222333..........
..........3322333333300000033333222333..........
..........3222333000000000000013222333..........
..........3222333000000020000013222333..........
..........3222333000000020000013222333..........
..........3222333000000000000113222333..........
..........3223333000030000301113223333..........
..........3333333100003333111113333333..........
...........33333231111111111113233333...........
...........33333333311111111333333333...........
........33333333333333333333333333333333........
.......3000000000311113123111130000000113.......
.......3000000000311113123111130000000113.......
.......3000000000131113123111300000000113.......
       (la blouse blanche continue en dessous)
```

Tu vois les cheveux longs (2) qui encadrent le visage, les lunettes (le rectangle de 3 autour des yeux), le nez (deux pixels de 2) et le sourire. En bas, la blouse blanche (0).

Il y a un portrait par **classe** de dresseurs (Gamin, Pêcheur, Scientifique…) et un portrait unique pour chaque personnage de l'histoire : la rivale, la professeure, les 8 champions, les 4 Gardiens de la Ligue et Corvin, le chef du Syndicat Opale. Le joueur vu de dos est fait par `buildBackPortrait`.

Le code complet est dans [src/gfx/sources/trainers/portrait-builder.js](../../src/gfx/sources/trainers/portrait-builder.js).

## Placer un habitant sur la carte

L'apparence ne suffit pas : il faut dire où l'habitant se trouve et ce qu'il dit. Cela se fait dans le fichier de la carte (chapitre [06](06-monde.md)) :

```js
npcs: [
  { id: 'guide', sprite: 'vieil_homme', x: 12, y: 29, facing: 'left', movement: 'static', script: 'guide' },
],
```

| Champ | Signification |
| --- | --- |
| `sprite` | quelle fiche d'apparence utiliser |
| `x`, `y` | sa case sur la carte |
| `facing` | dans quelle direction il regarde |
| `movement` | comment il bouge (voir ci-dessous) |
| `script` | ce qui se passe quand tu lui parles (chapitre [07](07-histoire-scripts.md)) |
| `showIf`, `hideIf` | n'apparaît que si un drapeau est posé, ou absent |

### Comment un habitant bouge tout seul

Le « cerveau » des habitants est dans [src/overworld/npc.js](../../src/overworld/npc.js). Il y a 4 comportements :

| `movement` | Comportement |
| --- | --- |
| `static` | ne bouge jamais |
| `look` | reste sur place, mais tourne la tête au hasard toutes les 1,5 à 3,5 secondes |
| `wander` | se promène au hasard, sans s'éloigner de plus de `radius` cases de sa maison |
| `path` | suit un trajet en boucle, par exemple `['left', 'right']` |

Les habitants ne bougent pas pendant un dialogue ou une cinématique, et ne marchent jamais sur une case occupée.

## Les dresseurs

Un dresseur est un habitant qui veut se battre. Il a trois morceaux de description.

**1. Sa place sur la carte**, dans le fichier de la carte :

```js
trainers: [
  { id: 'gamin_theo', sprite: 'gamin', x: 5, y: 22, facing: 'left', sight: 3, trainer: 'route_1_gamin_theo' },
],
```

`sight` est sa vue : il te repère en ligne droite jusqu'à 3 cases devant lui, si rien ne bloque son regard. Un « ! » apparaît au-dessus de sa tête, il s'approche, parle, et le combat commence. Une fois battu, il ne combat plus jamais : le jeu pose le drapeau `trainer_route_1_gamin_theo`.

**2. Son équipe**, dans [src/data/trainers/](../../src/data/trainers/), un fichier par zone. Grâce à une petite fonction d'aide, une ligne suffit :

```js
trainer('route_1_gamin_theo', 'gamin', 'Théo', ['pivelin:3']),
//       identifiant          classe   nom     équipe : un Pivelin niveau 3

trainer('garance', 'championne', 'Garance', ['caillotin:10', 'bousiot:10', 'quartzelle:10', 'caillotin:12'], {
  ai: 'smart', last: true, portrait: 'portrait/garance',
}),
```

La championne Garance a une IA « maligne » (chapitre [08](08-combat.md)) et une phrase spéciale avant d'envoyer sa dernière bestiole (`last: true`).

Les textes du dresseur sont trouvés automatiquement à partir de son identifiant : `route_1_gamin_theo_intro` (avant le combat), `_defeat` (quand il perd), `_after` (quand tu lui reparles).

**3. Sa classe**, dans [src/data/trainer-classes.js](../../src/data/trainer-classes.js). La classe donne le titre affiché (« Gamin Théo »), le portrait, la musique quand il te repère, et l'argent gagné :

```text
argent gagné = niveau le plus haut de son équipe × base de la classe
```

Un Gamin (base 15) avec un Pivelin niveau 3 donne 45 pièces. Un Gentleman (base 70) rapporte beaucoup plus.

### La rivale et son starter

La rivale choisit toujours le starter qui a l'avantage sur le tien. Son équipe est donc décrite trois fois, une pour chaque starter que tu as pu choisir :

```js
rival('rival_1', {
  fenouillot: [{ creature: 'braisille', level: 6, ... }],  // tu as pris Flore, elle prend Feu
  braisille:  [{ creature: 'flaquin',   level: 3, ... }],  // tu as pris Feu, elle prend Eau
  flaquin:    [{ creature: 'fenouillot', level: 6, ... }], // tu as pris Eau, elle prend Flore
}),
```

Elle revient 7 fois dans l'aventure, avec une équipe de plus en plus grande.

## Petit défi

Dans [src/gfx/sources/characters/index.js](../../src/gfx/sources/characters/index.js), choisis un habitant et invente-lui une nouvelle apparence en changeant `hair`, `top` ou `extras`. Lance `npm run atlas` puis `npm run dev` pour voir le résultat. Les noms possibles sont dans les tableaux ci-dessus.

## À retenir

- Les petits personnages sont un gabarit en lettres, recouvert de patchs (coiffure, tenue, accessoires).
- La droite est le miroir de la gauche ; 6 petits dessins suffisent pour marcher partout.
- Les portraits de combat sont faits de formes, par la même machine que les bestioles.
- Un dresseur = une place sur la carte, une équipe, une classe.
- La rivale prend toujours le starter qui bat le tien.
