# Carte du monde de Brumeval

Référence des cartes, de leurs liaisons et du verrouillage de la progression. Les prompts 10 et 11 étendent ce fichier. Les tailles sont en métatuiles (largeur × hauteur).

## Schéma de la région

Partie 1 (prompt 09) en traits pleins, partie 2 (prompt 10) en pointillés. La partie 3 (prompt 11) part du nord de Givremont (voir plus bas). Nord en haut.

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

Le nord de `givremont` (colonnes 10-11) mène au Col des Échos (partie 3). La porte de la Centrale (`route_6`, 15, 15) est un warp.

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
| `arene_arcane` | Arcane | téléporteurs à symboles (`o a q d`) : le bon symbole de chaque salle mène plus loin, les autres ramènent au hall ; devinettes données par les dresseurs | Anselme (50, identifiant `oswin`) |

### Verrous de progression (partie 2)

- Route 7 : `tour_memoire_liberee`. Port d'Ombrecourt : `qg_opale_cleared`. Fonderie : badge Feu. Téléphérique : badge Feu. Col des Échos : 8 badges (partie 3).
- Cerf-volant : ingénieur libéré au bureau du Syndicat (badge Ombre pour l'utiliser). Bouée : pêcheur du Marais Gris. Gants de Force : ancien de Haute-Bise après le badge Vent.
- Clé Sous-Sol : donnée par Lazare. Pierre Braise : Brune.
- Récompenses de champions : Hyper Capsules (Ysolde), Clé Sous-Sol + Ranimants Max (Lazare), Pierre Braise + Ranimants Max (Brune), Hyper Capsules + Potions Totales (Anselme).

### Scénario (partie 2)

1. Rivale 4 sur les Falaises (`rival_4_done`) ; arène Vent (badge `vent`, Gants de Force) ; Marais Gris (Bouée) ; Ombrecourt.
2. Lazare (badge `ombre`, Clé Sous-Sol) ; casino ; QG Opale ; rivale 5 au niveau 2 (`rival_5_done`) ; Corvin, première fois (`corvin_parti`) ; Cerf-volant et `qg_opale_cleared`.
3. Routes 9 et 10, Ilots, Bibliothèque ; Forge-Ardente, Brune (badge `feu`) ; Cœur de la Forge : Corvin, dernier combat (`corvin_forge_done`) puis `syndicat_dissous` ; Volcarde.
4. Téléphérique, Givremont, Anselme (badge `arcane`).
5. Optionnel : Centrale abandonnée (Fulgorine), Bibliothèque Engloutie (Mirelle).
- Après `syndicat_dissous` : les sbires des anciennes cartes disparaissent (`hideIf`), des PNJ réagissent à Hameau-de-Lys, Bourg-Sablon, Port-Ondine, Vireval et Cendrelune (`showIf`).

### Légendaires

| Créature | Lieu | Niveau | Drapeaux |
|---|---|---|---|
| Volcarde | Cœur de la Forge (derrière le bassin, Bouée) | 50 | `volcarde_ko` (réapparaît quand `ligue_terminee` est posé), `volcarde_capturee` |
| Fulgorine | Centrale abandonnée | 50 | `fulgorine_ko` (idem), `fulgorine_capturee` |
| Mirelle | Bibliothèque Engloutie, visible si `bestiary_149` | 50 | `mirelle_gone` (rencontre unique) |

Commande `wild_battle` : `legendary: true` (musique `battle_final`, fuite impossible), branches `won` et `caught`.

### Échanges et espèces

Deux échanges PNJ (Haute-Bise : Volplanin ; Ombrecourt : Fangelet) offrent les deux starters que le joueur n'a pas choisis (niveau 15), sinon le Bestiaire à 149 serait impossible. 58 nouvelles espèces capturables (129 au total dans les rencontres) ; Fonderion, Frimastoc, Fangeroi, Azurel et Glacerne arrivent en partie 3.

## Monde, partie 3 (prompt 11) : Ligue et post-jeu

```
   [Pic d'Azur] (Azurel 70, après la Ligue)
        |
   [Citadelle d'Azur] -- porte de la Ligue : salles 1 à 4, Salle du Maître, Salle d'honneur
        |
   [Grotte des Échos] (Machette, Gants, Bouée, Grappin, Lanterne)
        |
   [Col des Échos] (8 gardes, un par badge)
        |
   [Givremont] --g-- [Grotte Boréale] (Glacerne 60)
```

### Cartes et liaisons

| Carte | Taille | Liaisons |
|---|---|---|
| `col_des_echos` | 24×40 | sud → `givremont` (colonnes 10-11) ; 8 portes gardées (rangées 34 à 6), une par badge dans l'ordre des arènes ; nord → `grotte_des_echos` |
| `grotte_des_echos` | 24×30 | combine les 5 objets de terrain ; nord → `citadelle_azur` |
| `citadelle_azur` | 24×22 | Halte, Comptoir (meilleur stock), rivale 6 sur le chemin, porte de la Ligue (16, 5), est → `pic_d_azur` (porte fermée tant que `ligue_terminee` manque) |
| `ligue_salle_1` à `ligue_salle_4`, `ligue_maitre` | 14×12, 14×14 | un warp vers la salle suivante seulement, `league: true` (pas de Fil d'Ariane) |
| `salle_honneur` | 10×10 | scène de fin, sans sortie |
| `pic_d_azur` | 28×22 | ouest → `citadelle_azur` ; Azurel au sommet |
| `grotte_boreale` | 22×30 | entrée à Givremont (21, 15), derrière une corniche à Grappin ; glace glissante (11 coups minimum, aucune position sans retour) |

### Ligue

- Entrer (oui à la question de la porte) efface `ligue_g1` à `ligue_g4`, `ligue_maitre_vaincu` et `ligue_morvan_visible` : chaque passage recommence à la salle 1. Pas de Halte, la défaite ramène à la dernière Halte (celle de la Citadelle).
- Gardiens : Aldebert (Métal), Ségolène (Combat), Florimond (Givre), Mathilde (Terre et Toxique), 5 bestioles de 52 à 58, IA `smart`. Maître de la Ligue : la rivale, 6 bestioles de 58 à 62 selon le starter du joueur, son starter final en dernier.
- Première victoire : la Pr Morvan donne la Capsule Maîtresse (seul exemplaire du jeu).
- Après `ligue_terminee`, la Ligue rejouée utilise `*_plus` et `rival_maitre_plus` (65 à 72).
- Fin (script `fin` de `ligue_maitre`) : efface `azurel_ko`, `glacerne_ko`, `volcarde_ko`, `fulgorine_ko` (les légendaires mis K.O. reviennent), Salle d'honneur (`open_menu hall_of_fame`, équipe enregistrée dans `state.hallOfFame`). Première fois : `ligue_terminee`, crédits (`open_menu credits`), « FIN », retour dans la chambre, sauvegarde automatique, Maman (`fin_maman_vue`). Ensuite : retour devant la Citadelle.

### Post-jeu

| Contenu | Condition | Drapeaux |
|---|---|---|
| Azurel (niveau 70), sommet du Pic d'Azur | `ligue_terminee` | `azurel_ko`, `azurel_capturee` |
| Glacerne (niveau 60), fond de la Grotte Boréale | Grappin | `glacerne_ko`, `glacerne_capturee` |
| Revanche des 8 champions (`<id>_revanche`, 60 à 66) | `ligue_terminee`, une par jour réel | `state.daily.revanche_<id>` (date locale, posée seulement si le joueur gagne) |
| Diplôme du Bestiaire (Pr Morvan) | `bestiary_150` (drapeau calculé) | `diplome_recu` |

### Espèces

Fonderion et Fangeroi au Pic d'Azur, Frimastoc au Col, au Pic et dans la Grotte Boréale. `tools/check-obtainability.js` (et le contrôle « Obtention des 150 espèces » de `npm run validate`) prouve pour chaque starter que les 150 espèces sont obtenables : 140 par capture (dont Mirelle, sous `bestiary_149`), 8 par évolution, 2 par échange.

## Identité régionale

Chaque zone s'inspire d'une région de France : PNJ, dialogues, prénoms et classes de dresseurs. Le détail (glossaires, clins d'œil, classes) est dans [docs/Pnj/PNJ_V2.md](Pnj/PNJ_V2.md), qui fait foi.

| Zone | Lieux | Région |
|---|---|---|
| debut | Hameau-de-Lys, Route 1 | Centre-Val de Loire |
| debut | Bourg-Sablon | Pays de la Loire |
| bois | Route 2, Bois Murmurant, Route 3, Grotte des Cascades | Bretagne intérieure (pays gallo) |
| port | Port-Ondine, Routes 4 et 5 | Bretagne littorale |
| port | Vireval, usine Opale | Nord-Est industriel |
| cendrelune | Route 6, Tunnel Obscur, Cendrelune, Tour de la Mémoire, Centrale | Normandie |
| bise | Route 7, Falaises de Bise, Haute-Bise | Bourgogne-Franche-Comté |
| marais | Route 8, Marais Gris | Nouvelle-Aquitaine |
| ombrecourt | Ombrecourt, casino, QG Opale | Île-de-France |
| mer | Routes 9 et 10, Ilots, Bibliothèque Engloutie | Corse |
| forge | Forge-Ardente, Cœur de la Forge | Occitanie |
| givremont | Givremont, téléphériques, Grotte Boréale | Auvergne-Rhône-Alpes |
| ligue | Col et Grotte des Échos, Citadelle d'Azur, Pic d'Azur | Provence-Alpes-Côte d'Azur |

Le champion Arcane s'affiche « Anselme » ; ses identifiants (`oswin`, `oswin_revanche`, textes `oswin_*`, sprite) restent inchangés.
