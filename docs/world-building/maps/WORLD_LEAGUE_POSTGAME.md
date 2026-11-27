# Ligue et post-jeu

## Cartes

| Carte | Taille | Liaison |
|---|---|---|
| `col_des_echos` | 24 × 40 | Givremont → Grotte des Échos |
| `grotte_des_echos` | 24 × 30 | combine les objets de terrain |
| `citadelle_azur` | 24 × 22 | porte de la Ligue |
| `ligue_salle_1` à `ligue_salle_4` | 14 × 12 | salles en série |
| `ligue_maitre` | 14 × 14 | combat final |
| `salle_honneur` | 10 × 10 | scène de fin |
| `pic_d_azur` | 28 × 22 | Azurel |
| `grotte_boreale` | 22 × 30 | Glacerne |

## Ligue

- Entrer efface les drapeaux des Gardiens et recommence à la salle 1.
- Pas de Halte entre les combats.
- Gardiens : Aldebert, Ségolène, Florimond et Mathilde.
- Maître : la rivale, avec six bestioles selon le starter du joueur.
- Première victoire : Capsule Maîtresse.
- Après victoire : rejouable avec les équipes `*_plus`.

## Post-jeu

| Contenu | Condition |
|---|---|
| Azurel | `ligue_terminee` |
| Glacerne | Grappin |
| Revanches des 8 champions | `ligue_terminee`, une par jour réel |
| Diplôme du Bestiaire | `bestiary_150` |

Après la fin, les légendaires mis K.O. réapparaissent. La Salle d'honneur ouvre les crédits et retourne dans la chambre du joueur.
