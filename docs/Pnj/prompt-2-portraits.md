# Prompt 2 : portraits de combat dessinés

Prérequis : prompt 1 terminé. Les tenues, couleurs et classes de `docs/Pnj/PNJ_V2.md` font foi.

## Objectif

Remplacer les portraits de combat assemblés par des portraits dessinés à la main, du même niveau que les bestioles V2. Chaque classe de dresseur et chaque personnage principal doit être reconnaissable à sa silhouette, à son métier et à sa région.

## Constat

`src/gfx/sources/trainers/portrait-builder.js` compose chaque portrait à partir de pièces génériques : 3 corpulences, 7 coiffures, 6 tenues, 6 chapeaux, quelques accessoires. Tous partagent la même tête ovale et le même buste trapézoïdal, d'où l'effet « Playmobil ». Les 39 portraits (`PORTRAIT_CONFIGS`) et les 2 vues de dos du joueur (`BACK_CONFIGS`) en sortent.

## Décisions

| Sujet | Décision |
|---|---|
| Méthode | Depuis la v3 (2026-11-25) : une image de référence par portrait ([references-portraits.md](references-portraits.md)), convertie par `npm run trainer-import` en base modifiable `tools/trainer-designs/<id>.js`, retouchée à la main si besoin, puis exportée. Les pilotes du lot 0, dessinés aux formes de `tools/creature-painter.js`, seront refaits ainsi. Le générateur de pièces est retiré à la fin. |
| Charte | 64 × 64 et 4 teintes (48 × 48 accepté pendant la transition), lumière en haut à gauche, visage lisible. Les 4 teintes d'une planche de références sont communes à tous ses portraits. |
| Cadrage | Buste, de la tête à la taille, avec les mains quand elles tiennent l'outil du métier (filet, lanterne, houlette, marteau). |
| Variété | Formes de tête, âges, carrures et postures différents d'une classe à l'autre. Asymétrie autorisée (tête penchée, épaule relevée). Les plis des vêtements et les textures des cheveux sont dessinés. |
| Identifiants | Les cadres d'atlas `portrait/<id>` et `back/<id>` gardent leur nom : `trainer-classes.js` et les dresseurs n'ont pas à changer. |

## Production d'un portrait

1. Générer l'image de référence avec le prompt du portrait ([references-portraits.md](references-portraits.md)) et la déposer dans `docs/Pnj/references/`.
2. `npm run trainer-import -- docs/Pnj/references/<image> --id <id> [--panel i/n [--grid CxR]]` : écrit `tools/trainer-designs/<id>.js` (`--force` pour écraser une base existante, retouches comprises). `--panel i/n` seul lit une bande verticale ; avec `--grid 4x2`, une grille lue dans l'ordre de lecture (carré plus large que la case pour garder les mains, cases voisines effacées).
3. Retoucher les lignes du module si besoin (pixels isolés, yeux, mains), puis `npm run trainer-design -- tools/trainer-designs/<id>.js` et ajouter le portrait à `HAND_DRAWN_PORTRAITS` à sa première exportation.
4. `npm run atlas`, `npm run validate`, `npm test`.
5. Ajouter le portrait à une planche `docs/Pnj/rendus/planche-portraits-<lot>.png`.
6. Prendre des captures en combat : apparition du dresseur, et `trainer_defeated` à la fin du combat.

## Déroulé par lots

Avant chaque lot, présenter les portraits prévus et attendre mon feu vert ; après, faire un commit et un retour avec la planche.

| Lot | Contenu |
|---|---|
| 0 | Outils (dossier de designs, export, planche) et 2 portraits pilotes à valider avant la suite : un dresseur courant (Pêcheur de Bretagne littorale) et un champion. |
| 1 | Classes jeunes et génériques (Gamin, Fillette, Écolier, Campeur, Campeuse). |
| 2 | Classes de plein air (Randonneur, Randonneuse, Montagnard, Nageur, Nageuse). |
| 3 | Classes de métier régional (Pêcheur, Marin, Ouvrier, Motard et leurs noms du prompt 1). |
| 4 | Classes de ville et de savoir (Scientifique, Chercheuse, Gentleman, Dame, Mystique, Danseuse, Dresseur, Dresseuse). |
| 5 | Syndicat Opale (sbires, lieutenant, Corvin) et personnages principaux (rivale, Pr Morvan). |
| 6 | Les 8 champions et les 4 Gardiens de la Ligue. |
| 7 | Vues de dos du joueur et de la joueuse, retrait de `portrait-builder.js`, documentation. |
| 8 (optionnel, à confirmer) | Sprites de carte 16 × 16 (`src/gfx/sources/characters/`) aux couleurs et accessoires des nouvelles tenues. |

## Lot 0 : outils et pilotes (fait)

### Outils

| Étape | Commande | Résultat |
|---|---|---|
| Dessin | `tools/trainer-designs/<id>.js` | Exporte `portraits: [{ id, portrait }]` et, au lot 7, `backs: [{ id, back }]`. Formes de `tools/creature-painter.js`. |
| Export | `npm run trainer-design -- tools/trainer-designs/<id>.js` | Écrit `src/gfx/sources/trainers/<id>.js`. Ajouter le portrait à `HAND_DRAWN_PORTRAITS` dans `trainers/index.js` à sa première exportation. |
| Atlas | `npm run atlas` | Le portrait dessiné remplace celui de `PORTRAIT_CONFIGS` sous le même cadre `portrait/<id>`. |
| Planche | `npm run planche -- --portraits <lot> <id> [...]` | `docs/Pnj/rendus/planche-portraits-<lot>.png` : une ligne par portrait, dans les 6 palettes. `back/<id>` pour une vue de dos. |
| Captures | `npm run screenshots -- --trainer <dresseur ou portrait>` | `docs/Pnj/rendus/<portrait>/` : `trainer-intro.png` (apparition) et `trainer-defeated.png` (fin du combat). Un identifiant de portrait prend le premier dresseur qui l'affiche. |

Un script frère a été préféré à une extension de `npm run creature-design`, lié aux espèces et aux trois vues face, dos, icône.

### Pilotes

| Portrait | Cadre | Choix |
|---|---|---|
| Goémonier (Pêcheur de Bretagne littorale) | `portrait/goemonier`, nouveau | Les pêcheurs de Port-Ondine sont goémoniers depuis le prompt 1. Ancien au bonnet, barbe grise, ciré clair ouvert sur une marinière, fourche à goémon. Le `pecheur` générique reste pour les autres zones. |
| Brune | `portrait/brune` | Région, sexe et carrure opposés au goémonier. Béret, tresse, chemise grise aux manches retroussées, tablier de cuir, taillole, masse sur l'épaule. |

Planche : [rendus/planche-portraits-0.png](rendus/planche-portraits-0.png).

Repères de dessin tirés des pilotes :
- tête de 14 à 15 px de large, sommet du crâne vers la ligne 10, menton vers la ligne 27 ;
- un couvre-chef s'arrête au-dessus des sourcils, avec une ligne de peau entre son contour et les sourcils ;
- la peau en teinte 0, les vêtements qui la touchent en teinte 1 ou 2, sinon les bras se perdent dans le buste ;
- l'outil du métier sur un côté, assez grand pour se lire à l'échelle 1 (fourche verticale, masse en diagonale).

### Classes régionales et Lieutenant

Décision : chaque classe régionale du prompt 1 reçoit son propre portrait, ainsi que le Lieutenant (qui emprunte celui du sbire). Les féminins attestés (Sonneuse, Jardinière, Maraîchine) ont le leur. Répartition :

| Lot | Classes génériques | Classes régionales ajoutées |
|---|---|---|
| 1 | Gamin, Fillette, Écolier, Campeur, Campeuse | Sonneur, Sonneuse |
| 2 | Randonneur, Randonneuse, Montagnard, Nageur, Nageuse | Carrier, Fruitier, Gardian |
| 3 | Pêcheur, Marin, Ouvrier, Motard | Goémonier (fait au lot 0), Corailleur, Cheminot, Mineur, Forgeron, Maraîchin, Maraîchine, Horloger |
| 4 | Scientifique, Chercheuse, Gentleman, Dame, Mystique, Danseuse, Dresseur, Dresseuse | Jardinier, Jardinière, Cataphile, Miquelot |
| 5 | Sbires, Corvin, rivale, Pr Morvan | Lieutenant |
| 6 | Champions et Gardiens | Brune faite au lot 0 |

## Lot 1 : classes jeunes et génériques (fait, v3)

Planche : [rendus/planche-portraits-1.png](rendus/planche-portraits-1.png). Référence : [references/lot-1.png](references/lot-1.png), une bande de 7 portraits.

Historique : une v1 dessinée aux formes (têtes trop grosses, aspect jouet), puis des prototypes v2 dessinés au pixel (Gamin, Campeur) abandonnés au profit de la v3, convertie depuis la référence.

| Portrait | Silhouette et accessoire signature |
|---|---|
| Gamin | Casquette, bretelles, lance-pierre levé. |
| Fillette | Nattes à rubans, col Claudine, pâquerettes. |
| Écolier | Épi, cravate, ardoise « 2+2= ». |
| Campeur | Bob, foulard, sac et couverture roulée, bâton. |
| Campeuse | Bandeau, queue de cheval, gilet à poches, lanterne. |
| Sonneur | Chapeau rond à boucle et rubans, bombarde jouée les yeux fermés. Cadre `portrait/sonneur`. |
| Sonneuse | Coiffe de dentelle, biniou sur l'épaule. Cadre `portrait/sonneuse`. |

Conversion (`tools/import-portrait.js`) :
- découpe des panneaux d'une bande sur ses traits de séparation, carré centré ;
- réduction par moyenne, fond rendu transparent seulement s'il touche le bord (une joue claire reste opaque) ;
- 4 teintes par regroupement des luminosités de toute la bande, pixels isolés retirés ;
- pixels clairs du bord de silhouette passés en teinte 1 (côté lumière) ou 2 (côté ombre), sinon ils se fondent dans le fond du combat.

Combat : un portrait de 64 px garde le bord droit de l'emplacement adverse et le haut de l'écran ; une vue de dos de 64 px garde le bas de l'emplacement du joueur (`portraitPosition` dans `battle-hud.js`). À la défaite du dresseur, le cadre de PV du joueur s'efface : le combat est fini, et le portrait le recouvrirait.

## Contrôles

- Une planche de tous les portraits côte à côte : aucune paire ne doit se confondre en silhouette.
- Portraits lisibles avec les 6 palettes du jeu, dont Contraste.
- Les portraits glissent bien à l'entrée et à la sortie du combat (`battle-scene.js`) et ne débordent pas du cadre de 48 × 48.
- Rien ne reprend un design de franchise existante. Les concepts ne servent que d'ambiance.
