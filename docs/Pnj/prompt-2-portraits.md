# Prompt 2 : portraits de combat dessinés

Prérequis : prompt 1 terminé. Les tenues, couleurs et classes de `docs/Pnj/PNJ_V2.md` font foi.

## Objectif

Remplacer les portraits de combat assemblés par des portraits dessinés à la main, du même niveau que les bestioles V2. Chaque classe de dresseur et chaque personnage principal doit être reconnaissable à sa silhouette, à son métier et à sa région.

## Constat

`src/gfx/sources/trainers/portrait-builder.js` compose chaque portrait à partir de pièces génériques : 3 corpulences, 7 coiffures, 6 tenues, 6 chapeaux, quelques accessoires. Tous partagent la même tête ovale et le même buste trapézoïdal, d'où l'effet « Playmobil ». Les 39 portraits (`PORTRAIT_CONFIGS`) et les 2 vues de dos du joueur (`BACK_CONFIGS`) en sortent.

## Décisions

| Sujet | Décision |
|---|---|
| Méthode | Un module de dessin par portrait, sur le modèle des bestioles : `tools/trainer-designs/<id>.js` dessiné avec les formes de `tools/creature-painter.js`, exporté en source de sprite. Le générateur de pièces est retiré à la fin, comme celui des bestioles au lot 12. |
| Charte | Celle des bestioles (section « Charte graphique » de `BESTIAIRE_V2.md`) : 48 × 48, 4 teintes, contour d'encre d'un pixel, lumière en haut à gauche, visage lisible. |
| Cadrage | Buste, de la tête à la taille, avec les mains quand elles tiennent l'outil du métier (filet, lanterne, houlette, marteau). |
| Variété | Formes de tête, âges, carrures et postures différents d'une classe à l'autre. Asymétrie autorisée (tête penchée, épaule relevée). Les plis des vêtements et les textures des cheveux sont dessinés. |
| Identifiants | Les cadres d'atlas `portrait/<id>` et `back/<id>` gardent leur nom : `trainer-classes.js` et les dresseurs n'ont pas à changer. |

## Production d'un portrait

1. Relire la fiche de la tenue dans `PNJ_V2.md` : métier, région, couleurs, accessoire signature.
2. Dessiner le module `tools/trainer-designs/<id>.js`.
3. L'exporter : étendre `npm run creature-design` aux portraits, ou ajouter un script frère. Le choix se fait au lot 0.
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

## Contrôles

- Une planche de tous les portraits côte à côte : aucune paire ne doit se confondre en silhouette.
- Portraits lisibles avec les 6 palettes du jeu, dont Contraste.
- Les portraits glissent bien à l'entrée et à la sortie du combat (`battle-scene.js`) et ne débordent pas du cadre de 48 × 48.
- Rien ne reprend un design de franchise existante. Les concepts ne servent que d'ambiance.
