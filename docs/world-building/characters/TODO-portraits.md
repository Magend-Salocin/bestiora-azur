# Portraits de combat : reste à faire

Suivi du prompt 2 en v3 (portraits 48 × 48 convertis depuis une image de référence). Méthode : [prompt-2-portraits.md](../../prompts/phase-2/prompt-2-portraits.md), section « Production d'un portrait ». Prompts : [references-portraits.md](references-portraits.md).

Chaque portrait passe par trois étapes :

| Étape | Qui | Résultat |
|---|---|---|
| Référence | Nicolas | Image générée avec le prompt du portrait, déposée dans `docs/world-building/characters/references/` : une image par portrait, une bande verticale ou une grille (lot 1 : `lot-1-vert.png`, lot 2 : `lot-2.png`). |
| Conversion | Claude | `npm run trainer-import`, retouches, `npm run trainer-design`, atlas, planche et captures. |
| Branchement | Claude | Classe ou dresseur qui affiche le portrait (`src/data/trainer-classes.js`, `src/data/trainers/`). Seulement pour les nouveaux cadres. |

Valeurs : « fait », « à faire », « — » (étape inutile).

## Avant de générer

- [ ] Valider les quatre lignes des Gardiens de la Ligue (Aldebert, Ségolène, Florimond, Mathilde) dans `references-portraits.md` : leurs provinces ne sont pas fixées dans `PNJ_V2.md`.

## Lot 0 : pilotes à refaire en v3

| Id | Personnage | Référence | Conversion | Branchement |
|---|---|---|---|---|
| `goemonier` | Goémonier | à faire | à faire | fait |
| `brune` | Brune, championne Feu | à faire | à faire | fait |

## Lot 1 : classes jeunes et génériques

| Id | Personnage | Référence | Conversion | Branchement |
|---|---|---|---|---|
| `gamin` | Gamin | fait | fait | — |
| `fillette` | Fillette | fait | fait | — |
| `ecolier` | Écolier | fait | fait | — |
| `campeur` | Campeur | fait | fait | — |
| `campeuse` | Campeuse | fait | fait | — |
| `sonneur` | Sonneur | fait | fait | fait |
| `sonneuse` | Sonneuse | fait | fait | fait |

## Lot 2 : plein air

| Id | Personnage | Référence | Conversion | Branchement |
|---|---|---|---|---|
| `randonneur` | Randonneur | fait | fait | — |
| `randonneuse` | Randonneuse | fait | fait | — |
| `montagnard` | Montagnard | fait | fait | — |
| `nageur` | Nageur | fait | fait | — |
| `nageuse` | Nageuse | fait | fait | — |
| `carrier` | Carrier (Bourg-Sablon) | fait | fait | fait |
| `fruitier` | Fruitier (Haute-Bise) | fait | fait | fait |
| `gardian` | Gardian (Col des Échos) | fait | fait | fait |

## Lot 3 : métiers

| Id | Personnage | Référence | Conversion | Branchement |
|---|---|---|---|---|
| `pecheur` | Pêcheur | à faire | à faire | — |
| `marin` | Marin | à faire | à faire | — |
| `ouvrier` | Ouvrier | à faire | à faire | — |
| `motard` | Motard | à faire | à faire | — |
| `corailleur` | Corailleur (Corse) | à faire | à faire | à faire |
| `cheminot` | Cheminot (Vireval) | à faire | à faire | à faire |
| `mineur` | Mineur (Tunnel Obscur) | à faire | à faire | à faire |
| `forgeron` | Forgeron (Forge-Ardente) | à faire | à faire | à faire |
| `maraichin` | Maraîchin (Marais Gris) | à faire | à faire | à faire |
| `maraichine` | Maraîchine (Marais Gris) | à faire | à faire | à faire |
| `horloger` | Horloger (Haute-Bise) | à faire | à faire | à faire |

Le Goémonier, qui appartient à ce lot, est suivi au lot 0.

## Lot 4 : ville et savoir

| Id | Personnage | Référence | Conversion | Branchement |
|---|---|---|---|---|
| `scientifique` | Scientifique | à faire | à faire | — |
| `chercheuse` | Chercheuse | à faire | à faire | — |
| `gentleman` | Gentleman | à faire | à faire | — |
| `dame` | Dame | à faire | à faire | — |
| `mystique` | Mystique | à faire | à faire | — |
| `danseuse` | Danseuse | à faire | à faire | — |
| `dresseur` | Dresseur | à faire | à faire | — |
| `dresseuse` | Dresseuse | à faire | à faire | — |
| `jardinier` | Jardinier (arène Flore) | à faire | à faire | à faire |
| `jardiniere` | Jardinière (arène Flore) | à faire | à faire | à faire |
| `cataphile` | Cataphile (Ombrecourt) | à faire | à faire | à faire |
| `miquelot` | Miquelot (Tour de la Mémoire) | à faire | à faire | à faire |

## Lot 5 : Syndicat Opale et intrigue

| Id | Personnage | Référence | Conversion | Branchement |
|---|---|---|---|---|
| `sbire_opale` | Sbire Opale | à faire | à faire | — |
| `sbire_opale_f` | Sbire Opale (femme) | à faire | à faire | — |
| `lieutenant_opale` | Lieutenant | à faire | à faire | à faire |
| `corvin` | Corvin, fondateur | à faire | à faire | — |
| `rival` | La rivale | à faire | à faire | — |
| `professeure` | Pr Morvan | à faire | à faire | — |

## Lot 6 : champions et Gardiens

| Id | Personnage | Référence | Conversion | Branchement |
|---|---|---|---|---|
| `garance` | Garance, Roche | à faire | à faire | — |
| `mael` | Maël, Eau | à faire | à faire | — |
| `selene` | Sélène, Foudre | à faire | à faire | — |
| `aubin` | Aubin, Flore | à faire | à faire | — |
| `ysolde` | Ysolde, Vent | à faire | à faire | — |
| `lazare` | Lazare, Ombre | à faire | à faire | — |
| `oswin` | Anselme, Arcane | à faire | à faire | — |
| `gardien_1` | Aldebert, Métal | à faire | à faire | — |
| `gardien_2` | Ségolène, Combat | à faire | à faire | — |
| `gardien_3` | Florimond, Givre | à faire | à faire | — |
| `gardien_4` | Mathilde, Terre | à faire | à faire | — |

Brune, qui appartient à ce lot, est suivie au lot 0.

## Lot 7 : vues de dos et finitions

| Id | Personnage | Référence | Conversion | Branchement |
|---|---|---|---|---|
| `joueur` | Joueur, de dos | à faire | à faire | — |
| `joueuse` | Joueuse, de dos | à faire | à faire | — |

- [ ] Vérifier en combat la position des vues de dos en 48 px (bas de l'emplacement du joueur).
- [ ] Retirer `src/gfx/sources/trainers/portrait-builder.js`, `PORTRAIT_CONFIGS` et `BACK_CONFIGS` une fois tous les portraits convertis.
- [ ] N'accepter que des portraits de 48 px dans l'export et les tests.
- [ ] Planche complète de tous les portraits : aucune paire ne doit se confondre en silhouette.
- [ ] Mettre à jour `docs/learning/05-personnages.md`, section « Les portraits de combat » (méthode par référence, 48 × 48).
- [ ] Mettre à jour le commentaire des classes régionales dans `src/data/trainer-classes.js` (« portraits borrowed… »).

## Lot 8 (optionnel, à confirmer)

- [ ] Sprites de carte 16 × 16 (`src/gfx/sources/characters/`) aux couleurs et accessoires des nouvelles tenues.
