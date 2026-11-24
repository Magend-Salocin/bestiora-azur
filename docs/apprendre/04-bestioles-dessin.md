# 04. Comment on dessine une bestiole

Ce que tu vas apprendre :

- comment est faite l'image d'une bestiole (une grille de 48 × 48 caractères) ;
- comment on la dessine avec des formes simples plutôt que pixel par pixel ;
- comment le dessin passe d'un fichier de travail jusqu'au jeu ;
- comment vérifier son dessin avant de jouer.

C'est le chapitre le plus important pour comprendre comment le jeu a été illustré.

## Une bestiole, c'est trois grilles

Les 150 bestioles sont toutes dessinées à la main. Chacune a son propre fichier dans [src/gfx/sources/creatures/](../../src/gfx/sources/creatures/), qui porte son identifiant : [fullettu.js](../../src/gfx/sources/creatures/fullettu.js), [dame_noire.js](../../src/gfx/sources/creatures/dame_noire.js)…

Ce fichier contient trois grilles de caractères, sur le principe de la capsule du chapitre [02](02-pixels-et-couleurs.md) :

| Grille | Taille | Où on la voit |
| --- | --- | --- |
| `front` | 48 × 48 | de face : l'adversaire en combat, le Bestiaire |
| `back` | 48 × 48 | de dos : ta propre bestiole en combat |
| `icon` | 16 × 16 | la petite icône animée de l'écran d'équipe |

Chaque caractère est un pixel : `0` le plus clair, `1` et `2` les teintes du milieu, `3` le plus foncé (l'encre), et `.` pour la transparence. Voici le milieu du Fullettu, un lutin corse caché dans une bogue de châtaigne. Tu peux repérer ses yeux (`00` sur `03`) et sa bouche (`30003`) :

```text
...........32222223100111001232222233...........
...........33322223103111031232222333...........
............332222311111111123222333............
.............3222232111111112322233.............
............322222232130003232222233............
............333222223223332322222333............
```

Les règles de style sont les mêmes pour toutes les bestioles :

- un contour d'un pixel en couleur `3` autour de la silhouette ;
- la lumière vient d'en haut à gauche : le bord en bas à droite de chaque partie est plus foncé ;
- les pieds posent sur la ligne 46 de la grille, pour que toutes les bestioles soient au même niveau dans l'arène.

## Dessiner avec des formes

Taper 2 304 caractères à la main pour chaque vue serait long, et la moindre correction obligerait à tout retaper. Le jeu utilise donc un petit outil, le peintre de formes : [tools/creature-painter.js](../../tools/creature-painter.js). On lui décrit des formes simples, et il remplit la grille.

| Forme | Ce qu'elle dessine | Exemple |
| --- | --- | --- |
| `ellipse(cx, cy, rx, ry)` | un rond étiré, de centre (cx, cy) | une tête, un ventre, un pied |
| `poly([x, y], [x, y], …)` | une forme à angles, point par point | une corne, une oreille, une flamme |
| `capsule([[x, y], …], r)` | un boudin qui suit un chemin, d'épaisseur r | une queue, un bras, une patte |
| `rect(x0, y0, x1, y1)` | un rectangle | une lanterne, un socle |
| `union(a, b, …)` | plusieurs formes réunies en une | deux pieds |
| `minus(a, b)` | la forme a, trouée par la forme b | une bogue ouverte |
| `mirrorX(forme)` | la forme et son reflet de l'autre côté | deux oreilles symétriques |

Les coordonnées sont des pixels : x de 0 (à gauche) à 47 (à droite), y de 0 (en haut) à 47 (en bas).

### Les calques

Une bestiole est une liste de **calques**, peints dans l'ordre, du plus lointain au plus proche, comme des feuilles de papier découpées et posées les unes sur les autres. La fonction `paint` reçoit cette liste. Chaque calque peut avoir :

| Champ | Rôle |
| --- | --- |
| `shape` | la forme du calque |
| `tone` | sa couleur principale, de 0 à 3 |
| `shade` | la couleur du bord en bas à droite (l'ombre) |
| `light` | une petite zone plus claire, `{ tone, shape }`, souvent en haut à gauche (le reflet) |
| `outline` | `false` pour ne pas tracer de contour (le contour est tracé par défaut) |
| `pixels` | des pixels posés un par un à la fin : yeux, bouche, étincelles |

Le contour de chaque calque est tracé juste avant lui, autour de sa forme. Quand une tête est posée sur un corps, son contour passe donc sur le corps : c'est ce trait qui sépare la tête du reste.

### Un exemple réel : le Fullettu

Voici, un peu raccourci, le dessin de face du Fullettu, dans [tools/creature-designs/05-fullettu.js](../../tools/creature-designs/05-fullettu.js) :

```js
const C1 = {
  feet: union(ellipse(19.5, 44.6, 3, 1.5), ellipse(28.5, 44.6, 3, 1.5)), // deux pieds sur la ligne 46
  husk: husk(24, 34, 10, 16),               // la bogue : un rond hérissé de 16 piquants
  opening: ellipse(24, 34, 6.5, 5),         // le trou sombre dans la bogue
  face: ellipse(24, 35, 5.5, 4),            // le visage du lutin
  horns: mirrorX(poly([20, 31], [19, 27], [22, 30])), // deux petites cornes
};

function fullettuFront() {
  return toRows(paint([
    { shape: C1.feet, tone: 1, shade: 2 },
    { shape: C1.husk, tone: 2, shade: 3, light: { tone: 1, shape: ellipse(18, 28, 3, 2) } },
    { shape: C1.opening, tone: 3, outline: false },
    { shape: C1.horns, tone: 1, outline: false },
    { shape: C1.face, tone: 1, shade: 2, pixels: [
      ...stamp(20, 33, ['00...00', '03...03']), // les yeux
      ...stamp(22, 37, ['30003', '.333.']),     // le sourire
    ] },
  ]));
}
```

Lis les calques dans l'ordre : d'abord les pieds, puis la bogue qui les recouvre en partie, puis le trou noir, les cornes, et enfin le visage avec ses yeux et sa bouche. `stamp` est un tampon encreur : une mini-grille de caractères posée à un endroit précis. `toRows` transforme le résultat en lignes de texte, comme celles qu'on a vues plus haut.

`husk` n'est pas une forme du peintre : c'est une petite fonction écrite dans ce module, qui fabrique un polygone en étoile. Chaque module peut ainsi se créer ses propres formes.

Une astuce : la couleur `0` est aussi la couleur du fond de l'écran. Une forme peinte seulement en `0` disparaît, il ne reste que son contour. On peint donc plutôt en `1`, avec un reflet (`light`) en `0` au centre.

### La vue de dos et l'icône

La vue de dos est une deuxième fonction, avec les mêmes formes : pas de visage, le dos de la tête, et parfois des parties qui passent devant (une queue, des ailes).

L'icône de 16 × 16 est peinte avec la même fonction `paint`, dans le coin en haut à gauche de la grille, puis découpée par `iconFrom`. Le jeu fabrique tout seul sa deuxième image, décalée d'un pixel vers le haut : c'est ce qui fait sautiller les icônes dans l'écran d'équipe.

## Du module de dessin au jeu

Les fichiers de travail sont rangés dans [tools/creature-designs/](../../tools/creature-designs/), un module par famille de bestioles. Chaque module se termine par une liste `line` qui donne, pour chaque espèce, son identifiant et ses trois grilles :

```js
export const line = [
  { id: 'fullettu', front: fullettuFront(), back: fullettuBack(), icon: FULLETTU_ICON },
  { id: 'fullemarin', front: fullemarinFront(), back: fullemarinBack(), icon: FULLEMARIN_ICON },
  { id: 'fulletonne', front: fulletonneFront(), back: fulletonneBack(), icon: FULLETONNE_ICON },
];
```

Ensuite, quatre étapes :

1. `npm run creature-design -- tools/creature-designs/05-fullettu.js` vérifie les trois grilles (bonnes tailles, seulement `0` à `3` et `.`) et écrit les fichiers `src/gfx/sources/creatures/<id>.js` ([tools/export-creature-design.js](../../tools/export-creature-design.js)).
2. Pour une nouvelle espèce, on l'ajoute dans [src/gfx/sources/creatures/index.js](../../src/gfx/sources/creatures/index.js), la liste de tous les dessins.
3. `npm run atlas` ([tools/build-atlas.js](../../tools/build-atlas.js)) colle toutes les vues dans [assets/atlas/creatures.png](../../assets/atlas/creatures.png), et les icônes dans l'atlas de l'interface.
4. Le jeu n'a plus qu'à découper le bon morceau de l'atlas, avec le nom `<id>/front` ou `<id>/back`.

Le jeu ne dessine donc rien pendant que tu joues : tout est préparé à l'avance.

## Vérifier son dessin

Avant de lancer le jeu, on regarde le résultat sur une planche : `npm run planche -- 067-069` ([tools/creature-sheet.js](../../tools/creature-sheet.js)) crée une image avec, pour chaque espèce, la face, le dos et l'icône, agrandis trois fois. Les planches de tout le bestiaire sont rangées dans [docs/bestiaire-folklorique/rendus/](../../docs/bestiaire-folklorique/rendus/).

Deux gardiens surveillent aussi les dessins :

- `npm run validate` refuse une espèce qui n'a pas de dessin ;
- `npm test` vérifie que chaque espèce a bien une face, un dos différent de la face, et une icône, aux bonnes tailles.

Le cri de chaque bestiole, lui, est inventé par un programme : voir le chapitre [09](09-musique-et-sons.md).

## Petit défi

Avec un adulte, et une copie du projet que tu as le droit de modifier :

1. Ouvre [tools/creature-designs/05-fullettu.js](../../tools/creature-designs/05-fullettu.js) et trouve la ligne `horns` du Fullettu.
2. Agrandis ses cornes : remplace `[19, 27]` par `[18, 23]`. Le sommet de la corne monte de 4 pixels et s'écarte d'un pixel.
3. Lance `npm run creature-design -- tools/creature-designs/05-fullettu.js`, puis `npm run planche -- 067-069`.
4. Ouvre la planche `planche-067-069.png` dans [docs/bestiaire-folklorique/rendus/](../../docs/bestiaire-folklorique/rendus/). Les deux cornes ont-elles changé, ou une seule ? Pourquoi ?

(Réponse : les deux, parce que la corne est dessinée une fois puis copiée en miroir par `mirrorX`. Pour revenir en arrière, remets `[19, 27]` et relance les deux commandes.)

Deuxième essai : dans le calque `husk`, change `tone: 2` en `tone: 1`. La bogue devient plus claire, mais regarde bien le reflet : il est en `1` lui aussi, et ne se voit plus. C'est pour ça que chaque partie a besoin d'au moins deux teintes.

## À retenir

- Les 150 bestioles sont dessinées à la main : une face, un dos et une icône par espèce.
- On ne tape pas les pixels un par un : on décrit des formes (ellipses, polygones, boudins), peintes en calques par le peintre de formes.
- Chaque calque a une couleur, une ombre en bas à droite, parfois un reflet en haut à gauche, et un contour d'encre.
- Le chemin d'un dessin : module de dessin, `npm run creature-design`, `index.js`, `npm run atlas`.
- On vérifie avec `npm run planche` avant de lancer le jeu.
