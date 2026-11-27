# Monde : partie 1

## Cartes extérieures

| Carte | Zone | Taille | Liaisons principales |
|---|---|---|---|
| `hameau_de_lys` | debut | 20 × 18 | nord → `route_1` |
| `route_1` | debut | 20 × 36 | vers Hameau-de-Lys et Bourg-Sablon |
| `bourg_sablon` | debut | 20 × 18 | route 1 au sud, route 2 à l'est |
| `route_2` | bois | 32 × 18 | ouest → Bourg-Sablon |
| `bois_murmurant` | bois | libre | warps vers routes 2 et 3 |
| `route_3` | bois | libre | vers le Bois et la Grotte |
| `grotte_des_cascades` | bois | cave | niveau 1 |
| `grotte_des_cascades_2` | bois | 24 × 20 | sortie vers Port-Ondine |
| `port_ondine` | port | 24 × 18 | routes 4 à l'est |
| `route_4` | port | 32 × 18 | vers Port-Ondine et Route 5 |
| `route_5` | port | 32 × 18 | vers Route 4 et Vireval |
| `vireval` | port | 20 × 18 | route 6 au nord |
| `route_6` | cendrelune | 20 × libre | tunnel obscur |
| `tunnel_obscur` | cendrelune | libre | vers Route 6 et Cendrelune |
| `cendrelune` | cendrelune | libre | Tour de la Mémoire et Route 7 |

## Verrous

| Verrou | Condition | Effet |
|---|---|---|
| Sortie nord du Hameau | `got_starter` | Pr Morvan arrête le joueur sans starter |
| Sortie est de Bourg-Sablon | `has_bestiary` | un PNJ barre la route |
| Grotte des Cascades | badge Roche | le garde refuse le passage |
| Arbustes vers Vireval | Machette + badge Eau | arbustes infranchissables |
| Arène Foudre | `usine_opale_cleared` | porte sans courant |
| Tunnel Obscur | Lanterne + badge Foudre | joueur reculé dans l'obscurité |
| Tour de la Mémoire | badge Flore | gardien refusant l'entrée |

## Badges

| Badge | Champion | Zone | Effet |
|---|---|---|---|
| Roche | Garance | Bourg-Sablon | ouvre la Grotte |
| Eau | Maël | Port-Ondine | Machette |
| Foudre | Sélène | Vireval | Lanterne |
| Flore | Aubin | Cendrelune | Grappin |

## Objets

- Machette : Route 5, après le badge Eau.
- Lanterne : Vireval, après le badge Foudre.
- Grappin : Tour de la Mémoire, après le lieutenant.

## Scénario

Les drapeaux principaux sont `got_starter`, `starter_<espèce>`, `rival_1_done`, `parcel_received`, `has_bestiary`, `bois_syndicat_vaincu`, `usine_opale_cleared` et `tour_memoire_liberee`.
