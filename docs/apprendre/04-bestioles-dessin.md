# 04. Comment on dessine une bestiole

Ce que tu vas apprendre :

- pourquoi 136 bestioles sont dessinées par un programme, et 14 à la main ;
- ce qu'est une « recette de bestiole » (plan, graine, taille, accessoires, motif) ;
- comment le programme transforme des cercles et des triangles en pixel art ;
- pourquoi une bestiole et son évolution se ressemblent.

C'est le chapitre le plus important pour comprendre la conception du jeu.

## Deux façons de dessiner

Dessiner 150 bestioles, de face et de dos, à la main, pixel par pixel, prendrait des semaines. Le jeu utilise donc deux méthodes :

| Méthode | Combien | Qui | Où |
| --- | --- | --- | --- |
| Dessin à la main | 14 | Les 9 starters et leurs évolutions, les 4 légendaires, la mythique | [src/gfx/sources/creatures/](../../src/gfx/sources/creatures/) |
| Générateur | 136 | Toutes les autres | [src/gfx/creature-generator.js](../../src/gfx/creature-generator.js) |

Les bestioles les plus importantes de l'histoire ont droit à un dessin soigné. Les autres sont fabriquées par une machine à dessiner.

## Les bestioles dessinées à la main

Chaque bestiole dessinée à la main a son propre fichier, avec deux grilles de 48 × 48 caractères : `front` (de face) et `back` (de dos, vue par le joueur en combat). C'est exactement le principe de la capsule du chapitre [02](02-pixels-et-couleurs.md), en plus grand.

Voici le début du Fenouillot, dans [src/gfx/sources/creatures/fenouillot.js](../../src/gfx/sources/creatures/fenouillot.js). Tu peux reconnaître le haut de ses deux grandes oreilles :

```text
.........33..........................33.........
........31233......................33123........
.......3111123....................3111223.......
.......31111223..................31211223.......
.......311112123................311211223.......
.......3111001123..............3111001223.......
```

Le fichier [src/gfx/sources/creatures/index.js](../../src/gfx/sources/creatures/index.js) liste ces 14 bestioles. Pour elles, la fiche de [src/data/creatures.js](../../src/data/creatures.js) contient simplement `sprite: 'handmade'` (« fait main »).

## La recette d'une bestiole générée

Pour les 136 autres, la fiche contient une **recette** à la place du dessin. Celle du Pivelin, un petit oiseau des prairies :

```js
sprite: { plan: 'bird', seed: 1013, size: 1, features: [], pattern: 'light_belly' },
```

Cinq ingrédients :

| Ingrédient | Signification | Pivelin |
| --- | --- | --- |
| `plan` | La forme du corps | `bird` : un oiseau |
| `seed` | La graine, un nombre qui décide des petits détails | 1013 |
| `size` | La taille, de 1 (petit) à 3 (grand) | 1 : petit |
| `features` | Les accessoires : cornes, ailes, queue de flamme… | aucun |
| `pattern` | Le motif sur le corps | `light_belly` : ventre clair |

Avec cette seule ligne, le programme dessine le Pivelin de face et de dos. Toujours exactement le même, à chaque fois.

### Ingrédient 1 : le plan du corps

Il existe 11 plans, comme 11 gabarits de pâte à modeler :

| Plan | Forme | Nombre de bestioles |
| --- | --- | --- |
| `quadruped` | Animal à quatre pattes | 37 |
| `blob` | Boule molle, sans pattes | 21 |
| `insect` | Insecte à six pattes et antennes | 15 |
| `bird` | Oiseau avec ailes et bec | 12 |
| `golem` | Créature carrée, en pierre ou en métal | 12 |
| `ghost` | Fantôme avec un bas en dents de scie | 11 |
| `serpent` | Serpent enroulé, vu de côté | 7 |
| `biped` | Debout sur deux pattes | 6 |
| `fish` | Poisson, vu de côté | 6 |
| `plant` | Plante avec des feuilles sur la tête | 6 |
| `dragon` | Dragon avec ailes et cornes | 3 |

Chaque plan est une liste de **parties** (tête, corps, pattes, ailes…). Chaque partie est faite de formes simples : ellipses (des ronds étirés), polygones (des formes à angles), capsules (des boudins) et rectangles.

Par exemple, le plan `biped` dit, en simplifiant :

```js
{ role: 'limb', ... shapes: deux jambes en forme de boudin },
{ role: 'limb', ... shapes: deux pieds en forme d'ellipse },
{ role: 'body', ... shapes: une grosse ellipse pour le ventre },
{ role: 'limb', ... shapes: deux bras },
{ role: 'head', ... shapes: une ellipse pour la tête },
```

Chaque partie a un numéro `z` : la profondeur. Plus le `z` est grand, plus la partie est devant. La tête (z = 5) passe devant le corps (z = 3), qui passe devant les jambes (z = 1). Comme des feuilles de papier découpées et superposées.

Beaucoup de formes sont dessinées une seule fois, pour le côté gauche, puis copiées en miroir pour le côté droit (`mirror`). La bestiole est donc symétrique, comme un papillon. Sauf le serpent et le poisson, vus de profil.

### Ingrédient 2 : la graine

La graine (`seed`) est le secret qui rend chaque bestiole différente. On la donne à la machine à hasard du chapitre [01](01-vue-ensemble.md), qui en tire les **traits** de la bestiole :

```js
function drawTraits(seed) {
  const rng = createRng(seed);
  return {
    headScale: 0.9 + rng.next() * 0.25,   // tête un peu plus petite ou plus grosse
    bodyWidth: 0.85 + rng.next() * 0.3,   // corps plus fin ou plus large
    limbLength: 0.9 + rng.next() * 0.2,   // pattes plus courtes ou plus longues
    eyeStyle: pick(['small', 'round', 'round', 'angry', 'sleepy', 'big']),
    eyeSpacing: 0.25 + rng.next() * 0.2,  // yeux rapprochés ou écartés
    mouth: pick(['none', 'line', 'smile', 'open']),
    darkBody: rng.next() < 0.2,           // 1 chance sur 5 d'avoir un corps foncé
    ...
  };
}
```

(`rng.next()` donne un nombre au hasard entre 0 et 1.)

Les yeux sont de petits tampons dessinés à l'avance. Le style `round` est écrit deux fois dans la liste : il sort donc deux fois plus souvent que les autres.

```text
small   round   big     angry   sleepy
 03      .33    .33.    3..     333
 33      303    3033    .33
         333    3333    333
                .33.
```

Le hasard ne fait pas que la graine : le programme mélange la graine avec le nom du plan. Ainsi, un oiseau et un serpent qui auraient la même graine n'auraient pas le même visage.

Voici deux boules (`blob`) identiques sauf la graine. La première a des yeux « en colère », la seconde de grands yeux ronds, un corps plus large et une bouche différente :

```text
graine 1                                          graine 2
.....................333333.....................  .....................333333.....................
...................3311111233...................  ..................333111112333..................
.................33111111111233.................  ................3311111111111233................
................3111111111111123................  ...............311111111111111123...............
...............311100011111111123...............  ..............31110001111111111123..............
...............311100011111111123...............  .............3111000001111111111123.............
..............31111001111111111223..............  ............311111003111111031111223............
.............3311113331111333112233.............  ............311111133111111331111223............
............323111111111111111122323............  ............311111111111111111111223............
............323111111111111111122323............  ............311111111111111111111223............
...........31131111111111111112223223...........  ...........33111111111111111111122233...........
...........32232111111111111122223223...........  ...........33211111111111111111222233...........
...........32223211111111111222232223...........  ...........32321111111111111112222323...........
............333332111111111222233333............  ............333211111111111122222333............
.................32211112222223.................  ...............322221111222222223...............
..................322222222223..................  ................3322222222222233................
...................3332222333...................  ..................333322223333..................
......................3333......................  ......................3333......................
```

### Ingrédient 3 : la taille, et le secret des évolutions

La taille va de 1 à 3. Elle sert à agrandir le dessin : à la taille 1, la bestiole est dessinée à environ 62 % de sa taille maximale, à la taille 2 à 80 %, à la taille 3 à 98 %.

Voici le secret le plus malin du générateur : **une lignée garde la même graine**. Seules la taille et les accessoires changent.

```js
// Pivelin, 1er stade
sprite: { plan: 'bird', seed: 1013, size: 1, features: [],        pattern: 'light_belly' },
// Grivelin, 2e stade
sprite: { plan: 'bird', seed: 1013, size: 2, features: ['crest'], pattern: 'light_belly' },
// Aquilard, 3e stade
sprite: { plan: 'bird', seed: 1013, size: 3, features: ['crest'], pattern: 'light_belly' },
```

Même graine, donc mêmes proportions, mêmes yeux, même bouche : on reconnaît la famille. En grandissant, l'oiseau gagne une crête. Compare le petit Pivelin et le grand Aquilard :

```text
Pivelin (taille 1)                                Aquilard (taille 3, avec crête)
.......................33.......................  ......................3..3......................
....................33312333....................  .....................333333.....................
...................3111111123...................  .....................333333.....................
..................311011111123..................  ....................33222333....................
...........3.....31100011111223.....3...........  ...................3332223333...................
..........3233...31111111111223...3323..........  ...................3222222333...................
..........31123..31103111103223..31223..........  ...................3333333233...................
..........311123.31133111133223.311123..........  ...................3333333333...................
..........3111123311111111122233111223..........  ..................331111111233..................
.........321111123211221111222311112223.........  .................33111111111233.................
..........3111111231111332222311112223..........  ................3111111111111123................
..........3211111232223113222311112223..........  ...............311110111111111123...............
...........31111223332233223331112223...........  ...............311100011111111123...............
...........32111223103333331231122223...........  .....333......31111000111111111223......333.....
............321123111000001122322223............  ....31123.....31111111111111111223.....31223....
.............3222311100000012232223.............  ....311123....31111133111113311223....311223....
..............33231110000001223233..............  ....3111123...31111303111130311223...3111123....
................3311000000012233................  ....311111233.31111333111133311223.331111123....
.................32100000001223.................  ...311111111233111111111111111222331111111223...
..................311000001223..................  ...311111111123211111111111111222311111112223...
..................321000011223..................  ...321111111112311112222111112223111111112223...
...................3221111223...................  ....3111111111132111123333112222311111112223....
....................32222223....................  ....3211111111123211131111322223111111112223....
....................33333333....................  .....31111111122232222311322223111111112223.....
....................33333333....................  .....32111111122313322233222332311111112223.....
.....................33..33.....................  ......311111112311103333333311223111112223......
                                                  (et encore 18 lignes plus bas)
```

Quand les yeux deviennent trop petits pour être lisibles (petite taille), le programme choisit automatiquement un tampon d'yeux plus simple.

### Ingrédient 4 : les accessoires

Les `features` sont des morceaux ajoutés au plan, placés par rapport à la tête ou au corps :

| Accessoire | Dessin |
| --- | --- |
| `horns` | deux cornes sur la tête |
| `long_ears` | deux longues oreilles, avec l'intérieur plus clair |
| `crest` | une crête en pointes sur le crâne |
| `wings` | deux ailes sur les côtés du corps |
| `tail_flame` | une flamme derrière le corps |
| `tail_leaf` | des feuilles derrière le corps |
| `tail_fin` | des nageoires |
| `tail_spikes` | des piquants dans le dos |
| `shell` | une carapace sous le corps |
| `antennae` | deux antennes avec une boule au bout |
| `crystals` | des cristaux sur les épaules et la tête |
| `cloud` | un petit nuage sous les pieds |
| `fangs` | deux crocs sous la bouche |
| `shadow` | le corps devient foncé |

Certains plans ont des accessoires automatiques : l'insecte a toujours des antennes, le dragon toujours des cornes.

Si un accessoire fait dépasser le dessin du cadre de 48 × 48, le programme rétrécit un peu la bestiole (de 7 % à chaque essai) jusqu'à ce qu'elle tienne entièrement.

### Ingrédient 5 : le motif

Le motif (`pattern`) est peint seulement sur le corps :

| Motif | Effet |
| --- | --- |
| `plain` | uni |
| `stripes` | rayures horizontales plus foncées |
| `spots` | 2 à 4 taches, placées selon la graine |
| `light_belly` | ventre plus clair (seulement de face) |

## Des formes aux pixels : la machine à dessiner

Une fois toutes les parties assemblées, il reste à transformer des formes mathématiques en une grille de 48 × 48 pixels. C'est le travail de [src/gfx/shape-renderer.js](../../src/gfx/shape-renderer.js), la machine à dessiner du jeu. Elle sert aussi pour les portraits des dresseurs (chapitre [05](05-personnages.md)) et certaines tuiles du décor.

Elle travaille en 7 étapes, comme un illustrateur :

```text
 1. Découper   2. Empiler    3. Motifs   4. Ombre      5. Reflet     6. Contours   7. Visage
  les formes    par z                     en bas à      en haut à      noirs          (tampons)
                                          droite        gauche
```

1. **Découper.** Pour chaque pixel, la machine regarde si son centre est à l'intérieur de la forme. Si oui, le pixel appartient à la partie. C'est comme poser un emporte-pièce sur une grille.
2. **Empiler.** Les parties sont posées de la plus lointaine (petit `z`) à la plus proche. Une partie de devant recouvre celle de derrière.
3. **Motifs.** Les rayures, taches ou ventre clair sont peints, mais seulement sur les pixels qui appartiennent encore au corps.
4. **Ombre.** La lumière vient d'en haut à gauche. Le bord en bas à droite de chaque partie devient d'une teinte plus foncée.
5. **Reflet.** Sur les grosses parties (tête, corps), une petite tache plus claire est ajoutée en haut à gauche, comme un reflet sur une bille.
6. **Contours.** Un trait de couleur 3 (la plus foncée) entoure la silhouette. Un trait est aussi tracé là où une partie de devant touche une partie de derrière : c'est ce qui sépare la tête du corps.
7. **Visage.** Enfin, les yeux, la bouche et les crocs sont posés comme des tampons encreurs.

### De face et de dos

La même recette donne aussi la vue de dos, utilisée pour ta propre bestiole en combat. Pour le dos :

- pas de visage (on voit l'arrière de la tête) ;
- les parties marquées `frontOnly` (museau, bec) disparaissent ;
- certaines parties changent de profondeur : les ailes, derrière le corps vues de face, passent devant vues de dos ;
- pas de reflet, et une ombre un peu plus épaisse.

## Pourquoi c'est malin

- **Déterministe.** La même recette donne toujours exactement le même dessin. On peut donc régénérer les 136 bestioles quand on veut, sans rien perdre.
- **Économique.** Une ligne de recette remplace deux grilles de 2 304 pixels.
- **Cohérent.** Toutes les bestioles ont le même style : contours d'un pixel, ombre en bas à droite, reflet en haut à gauche.
- **Familles reconnaissables.** Une lignée partage sa graine.

## Quand le dessin est-il fait ?

Le jeu ne dessine pas les bestioles pendant que tu joues. Le générateur est lancé une seule fois, par la commande `npm run atlas` ([tools/build-atlas.js](../../tools/build-atlas.js)) :

```js
for (const creature of creatures) {
  if (HAND_DRAWN_CREATURES[creature.id]) continue;   // les 14 faites main sont lues à part
  sprites[`${creature.id}/front`] = generateCreatureSprite(creature.sprite, 'front');
  sprites[`${creature.id}/back`]  = generateCreatureSprite(creature.sprite, 'back');
}
```

Le résultat est collé dans l'atlas [assets/atlas/creatures.png](../../assets/atlas/creatures.png). Le jeu n'a plus qu'à découper le bon morceau.

Le cri de chaque bestiole est lui aussi inventé par un programme, sur le même principe : voir le chapitre [09](09-musique-et-sons.md).

## Petit défi

Avec un adulte, et une copie du projet que tu as le droit de modifier :

1. Dans [src/data/creatures.js](../../src/data/creatures.js), trouve le Pivelin (`id: 'pivelin'`).
2. Change sa graine `1013` en `1014`.
3. Lance `npm run atlas`, puis `npm run dev`.
4. Regarde le Pivelin dans le Bestiaire. Que remarques-tu ? Et ses évolutions, ont-elles changé ?

(Réponse : seul le Pivelin change, puisque Grivelin et Aquilard gardent la graine 1013. La famille n'est plus cohérente. Remets 1013 après l'essai.)

## À retenir

- 14 bestioles sont dessinées à la main, 136 par un générateur.
- Une recette = un plan de corps, une graine, une taille, des accessoires et un motif.
- La graine décide des proportions, des yeux et de la bouche ; une lignée garde la même graine.
- La machine à dessiner découpe des formes, les empile, ajoute motifs, ombre, reflet, contours et visage.
- Tout est calculé à l'avance par `npm run atlas`, puis rangé dans un atlas.
