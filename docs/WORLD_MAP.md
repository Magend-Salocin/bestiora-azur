# Carte du monde de Brumeval

Référence des cartes, de leurs liaisons et du verrouillage de la progression. Les prompts 10 et 11 étendent ce fichier. Les tailles sont en métatuiles (largeur × hauteur).

## Schéma de la région

Partie 1 (prompt 09) en traits pleins, partie 2 (prompt 10) en pointillés. Nord en haut.

```
                                   . . . . . . . . . . .  Givremont, Citadelle (nord-est)
                                   .
     Ombrecourt . . .            [Cendrelune]=[Tour de la Mémoire]
           .                         |   \
     Marais Gris . .            [Tunnel Obscur]  . . Route 7, Falaises de Bise . . Haute-Bise
                                     |
                                  Route 6 --g-- (Centrale abandonnée, fermée)
                                     |
            [Grotte des Cascades]  [Vireval]=[usine Opale]
               |        \            |
            Route 3  [Port-Ondine]==Route 4==Route 5
               |      (bateau-musée)  (pension)
         [Bois Murmurant]
               |
            Route 2
               |
         [Bourg-Sablon]
               |
            Route 1
               |
         [Hameau-de-Lys]
```

`|` et `==` : connexion sans transition ou entrée de bâtiment ; `--g--` : passage à Grappin.

## Cartes extérieures et liaisons (partie 1)

Les connexions exigent des bords de même taille (`docs/MAP_FORMAT.md`). Le passage d'une connexion est limité aux cases indiquées, le reste du bord est fermé par des arbres ou des falaises.

| Carte | Zone | Tileset | Taille | Liaisons |
|---|---|---|---|---|
| `hameau_de_lys` | debut | town | 20 × 18 | nord → `route_1` (colonnes 9-10) |
| `route_1` | debut | outdoor | 20 × 36 | sud → `hameau_de_lys`, nord → `bourg_sablon` (colonnes 9-10) |
| `bourg_sablon` | debut | town | 20 × 18 | sud → `route_1` (colonnes 9-10), est → `route_2` (lignes 8-9) |
| `route_2` | bois | outdoor | 32 × 18 | ouest → `bourg_sablon` (lignes 8-9) ; entrée du Bois par warp |
| `bois_murmurant` | bois | outdoor | libre | warps vers `route_2` et `route_3` |
| `route_3` | bois | town | libre | warps vers `bois_murmurant` et `grotte_des_cascades` |
| `grotte_des_cascades` | bois | cave | libre | niveau 1, échelles vers `grotte_des_cascades_2` |
| `grotte_des_cascades_2` | bois | cave | 24 × 20 | sortie en (22, 10) ↔ `port_ondine` (0, 8) ; rivale 2 avant la sortie |
| `port_ondine` | port | town | 24 × 18 | ouest : bouche de grotte en (0, 8) ; est → `route_4` (lignes 8-9) |
| `route_4` | port | town | 32 × 18 | ouest → `port_ondine`, est → `route_5` (lignes 8-9) |
| `route_5` | port | town | 32 × 18 | ouest → `route_4`, est → `vireval` (lignes 8-9) |
| `vireval` | port | town | 20 × 18 | ouest → `route_5` (lignes 8-9), nord → `route_6` (colonnes 9-10) |
| `route_6` | cendrelune | town | 20 × libre | sud → `vireval` (colonnes 9-10) ; warp vers `tunnel_obscur` |
| `tunnel_obscur` | cendrelune | cave, sombre | libre | warps vers `route_6` et `cendrelune` |
| `cendrelune` | cendrelune | town | libre | warp vers `tunnel_obscur` ; bord est réservé à la Route 7 (prompt 10) |

Les routes qui portent un bâtiment (maison, pension, usine) utilisent le tileset `town` avec `clearTile: 'grass'` : `outdoor` n'a pas les tuiles de bâtiments.

Chaque zone a son dossier `src/data/maps/<zone>/`, ses dresseurs `src/data/trainers/<zone>.js` et ses textes `src/data/texts/<zone>.js`.

## Verrous de progression

| Verrou | Où | Condition | Effet sans la condition |
|---|---|---|---|
| Sortie nord du Hameau | `hameau_de_lys` | drapeau `got_starter` | La Pr Morvan arrête le joueur et l'emmène au labo |
| Sortie est de Bourg-Sablon | `bourg_sablon` | drapeau `has_bestiary` | Un PNJ barre la route vers la Route 2 |
| Entrée de la Grotte des Cascades | `route_3` | badge Roche | Un garde refuse le passage |
| Arbustes vers Vireval | `route_5` | Machette + badge Eau | Arbustes infranchissables |
| Arène Foudre | `vireval` | drapeau `usine_opale_cleared` | Porte de l'arène sans courant |
| Tunnel Obscur | `route_6` | Lanterne + badge Foudre | Le joueur recule devant l'obscurité |
| Tour de la Mémoire | `cendrelune` | badge Flore | Le gardien de la Tour refuse l'entrée |
| Centrale abandonnée | `route_6` | Grappin + badge Flore | Corniches `g` ; porte scellée jusqu'au prompt 10 |
| Route 7 | `cendrelune` | prompt 10 | Bord est fermé |

## Badges

| Badge | Champion | Arène | Effet |
|---|---|---|---|
| Roche | Garance | Bourg-Sablon, plaques qui écartent des rochers | Ouvre la Grotte des Cascades (garde de la Route 3) |
| Eau | Maël | Port-Ondine, dalles glissantes entre des bassins | Machette utilisable (couper) |
| Foudre | Sélène | Vireval, interrupteurs au sol qui coupent des barrières | Lanterne utilisable (éclairer) |
| Flore | Aubin | Cendrelune, labyrinthe de haies à couper | Grappin utilisable, entrée de la Tour de la Mémoire |

Les bestioles reçues par échange obéissent toujours (non géré, par simplicité).

## Objets de terrain (partie 1)

| Objet | Obtention | Badge requis |
|---|---|---|
| Machette | PNJ de la Route 5, après le badge Eau | Eau |
| Lanterne | Ingénieure de Vireval, après le badge Foudre | Foudre |
| Grappin | Sommet de la Tour de la Mémoire, après le lieutenant | Flore |

## Scénario (partie 1)

| Drapeau | Posé quand |
|---|---|
| `got_starter`, `starter_<espèce>` | Le joueur choisit sa bestiole au labo |
| `rival_1_done` | Après le 1er combat contre le rival (victoire ou défaite) |
| `parcel_received` | Le vendeur du Comptoir de Bourg-Sablon remet le Colis Morvan |
| `has_bestiary` | La Pr Morvan remet le Bestiaire et 5 capsules, le rival part devant |
| `bois_syndicat_vaincu` | Les sbires du Bois Murmurant sont battus |
| `usine_opale_cleared` | Le responsable de l'usine Opale de Vireval est battu |
| `tour_memoire_liberee` | Le lieutenant de la Tour est battu, Corvin apparaît puis part |

## Intérieurs et donjons (partie 1)

| Lieu | Cartes |
|---|---|
| Hameau-de-Lys | `maison_joueur_1f`, `maison_joueur_2f`, `maison_rival`, `labo_morvan` |
| Bourg-Sablon | `halte_bourg_sablon`, `comptoir_bourg_sablon`, `maison_bourg_sablon_1`, `maison_bourg_sablon_2`, `arene_roche` |
| Route 3 | `maison_route_3` (soin gratuit) |
| Port-Ondine | `halte_port_ondine`, `comptoir_port_ondine`, `maison_port_ondine_1`, `maison_port_ondine_2`, `bateau_musee`, `arene_eau` |
| Routes 4 et 5 | `pension_route_4`, `maison_route_5` (Machette, échange) |
| Vireval | `halte_vireval`, `comptoir_vireval`, `maison_vireval_1`, `maison_vireval_2`, `arene_foudre`, `usine_opale_1`, `usine_opale_2` |
| Cendrelune | `halte_cendrelune`, `comptoir_cendrelune`, `maison_cendrelune_1`, `maison_cendrelune_2` (échange), `arene_flore`, `tour_memoire_1` à `tour_memoire_5` |

La Tour n'a pas d'escalier : ses étages sont reliés par des dalles `X` (téléporteurs du tileset `special`).

## Monde, partie 2 (prompt 10)

### Cartes extérieures et liaisons

| Carte | Taille | Liaisons |
|---|---|---|
| `cendrelune` | 24×22 | est (rangée 10) → `route_7` ; l'ouvrier des éboulis disparaît avec `tour_memoire_liberee` |
| `route_7` | 32×22 | ouest rangée 10 ; est rangées 4-5 → `falaises_de_bise` |
| `falaises_de_bise` | 32×22 | est rangées 14-15 → `haute_bise` ; corniches à Grappin, rivale 4 |
| `haute_bise` | 24×22 | sud colonnes 10-11 → `route_8` ; téléphérique vers Givremont |
| `route_8` | 24×34 | sud colonnes 12-13 → `marais_gris` ; salle à rocher (Gants de Force) |
| `marais_gris` | 24×40 | sud colonnes 10-11 → `ombrecourt` ; rivière à traverser avec la Bouée |
| `ombrecourt` | 24×22 | est rangées 14-15 → `route_9` (port fermé par un déclencheur tant que `qg_opale_cleared` n'est pas posé) |
| `route_9`, `route_10` | 32×22 | mer (Bouée) ; `route_9` est rangées 6-7 → `route_10` ouest ; `route_10` est rangées 14-15 → `ilots` |
| `ilots` | 28×22 | est rangées 10-11 → `forge_ardente` |
| `forge_ardente` | 24×22 | ouest rangées 10-11 ; la Fonderie (11, 16) mène au Cœur de la Forge |
| `givremont` | 24×22 | aucune connexion de bord : téléphérique depuis `haute_bise` (badge Feu) |

**Pour le prompt 11** : le nord de `givremont` (colonnes 10-11, rangées 0-2) est réservé au Col des Échos ; deux gardes (`garde_col_g`, `garde_col_d`) le barrent et sont à retirer ou à cacher. La porte de la Centrale (`route_6`, 15, 15) est maintenant un warp.

### Intérieurs et donjons

- Villes : Halte, Comptoir et 3 à 4 maisons chacune (`halte_*`, `comptoir_*`, `maison_*`), plus `telepherique_haute_bise` et `telepherique_givremont`.
- Ombrecourt : `casino_ombrecourt` (escalier secret gardé, la Clé Sous-Sol donnée par Lazare l'ouvre), `qg_opale_1` à `qg_opale_3` (téléporteurs `X` ; le 3 est le bureau de Corvin).
- `bibliotheque_engloutie` (Ilots), `coeur_de_la_forge` (cave, bassin à franchir avec la Bouée), `centrale_abandonnee` (cave sombre, Lanterne optionnelle).

### Arènes et énigmes

| Arène | Badge | Énigme | Champion (plafond) |
|---|---|---|---|
| `arene_vent` | Vent | courants d'air qui poussent le joueur (tuiles `^ v < >`), énigme générée et vérifiée par simulation : 14 coups minimum, aucune position sans retour | Ysolde (36) |
| `arene_ombre` | Ombre | salle toujours sombre (`dark: 'always'`), 4 braseros à allumer (chacun éclaire un disque), barrière levée au 4e | Lazare (40) |
| `arene_feu` | Feu | sol de lave praticable mais piégé (déclencheurs qui renvoient à l'entrée), chemin de dalles de pierre | Brune (45) |
| `arene_arcane` | Arcane | téléporteurs à symboles (`o a q d`) : le bon symbole de chaque salle mène plus loin, les autres ramènent au hall ; devinettes données par les dresseurs | Oswin (50) |

### Verrous de progression (partie 2)

- Route 7 : `tour_memoire_liberee`. Port d'Ombrecourt : `qg_opale_cleared`. Fonderie : badge Feu. Téléphérique : badge Feu. Col des Échos : prompt 11.
- Cerf-volant : ingénieur libéré au bureau du Syndicat (badge Ombre pour l'utiliser). Bouée : pêcheur du Marais Gris. Gants de Force : ancien de Haute-Bise après le badge Vent.
- Clé Sous-Sol : donnée par Lazare. Pierre Braise : Brune.
- Récompenses de champions : Hyper Capsules (Ysolde), Clé Sous-Sol + Ranimants Max (Lazare), Pierre Braise + Ranimants Max (Brune), Hyper Capsules + Potions Totales (Oswin).

### Scénario (partie 2)

1. Rivale 4 sur les Falaises (`rival_4_done`) ; arène Vent (badge `vent`, Gants de Force) ; Marais Gris (Bouée) ; Ombrecourt.
2. Lazare (badge `ombre`, Clé Sous-Sol) ; casino ; QG Opale ; rivale 5 au niveau 2 (`rival_5_done`) ; Corvin, première fois (`corvin_parti`) ; Cerf-volant et `qg_opale_cleared`.
3. Routes 9 et 10, Ilots, Bibliothèque ; Forge-Ardente, Brune (badge `feu`) ; Cœur de la Forge : Corvin, dernier combat (`corvin_forge_done`) puis `syndicat_dissous` ; Volcarde.
4. Téléphérique, Givremont, Oswin (badge `arcane`).
5. Optionnel : Centrale abandonnée (Fulgorine), Bibliothèque Engloutie (Mirelle).
- Après `syndicat_dissous` : les sbires des anciennes cartes disparaissent (`hideIf`), des PNJ réagissent à Hameau-de-Lys, Bourg-Sablon, Port-Ondine, Vireval et Cendrelune (`showIf`).

### Légendaires

| Créature | Lieu | Niveau | Drapeaux |
|---|---|---|---|
| Volcarde | Cœur de la Forge (derrière le bassin, Bouée) | 50 | `volcarde_ko` (réapparaît quand `ligue_terminee` est posé), `volcarde_capturee` |
| Fulgorine | Centrale abandonnée | 50 | `fulgorine_ko` (idem), `fulgorine_capturee` |
| Mirelle | Bibliothèque Engloutie, visible si `bestiary_149` | 50 | `mirelle_gone` (rencontre unique) |

Commande `wild_battle` : `legendary: true` (musique `battle_final`, fuite impossible), branches `won` et `caught`. `ligue_terminee` est posé par le prompt 11.

### Échanges et espèces

Deux échanges PNJ (Haute-Bise : Volplanin ; Ombrecourt : Fangelet) offrent les deux starters que le joueur n'a pas choisis (niveau 15), sinon le Bestiaire à 149 serait impossible. 58 nouvelles espèces capturables (129 au total dans les rencontres) ; restent à placer au prompt 11 : Fonderion, Frimastoc, Fangeroi, Azurel, Glacerne (les évolutions par pierre Cocomarin et Cocorage s'obtiennent avec les pierres).
