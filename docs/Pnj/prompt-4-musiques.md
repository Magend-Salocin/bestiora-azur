# Prompt 4 : musiques régionales

Indépendant des prompts 2 et 3. S'appuie sur les régions du prompt 1 ([PNJ_V2.md](PNJ_V2.md), section 2).

## Objectif

Donner à chaque région sa couleur musicale. Aujourd'hui, 10 musiques de carte servent pour toutes les cartes : `town_1` et `town_2` pour toutes les villes et arènes, `route_2` pour presque toutes les routes, `hometown` pour les 26 maisons. On compose de nouvelles pistes inspirées des formes musicales traditionnelles de chaque région, dans le format chiptune du jeu.

## Décisions

| Sujet | Décision |
|---|---|
| Originalité | Toutes les mélodies sont composées pour le jeu ([GAME_DESIGN.md](../GAME_DESIGN.md), section 1). On ne transcrit jamais un air existant, même traditionnel ou du domaine public. On reprend seulement la forme : mesure, rythme de danse, mode, carrure des phrases, timbre imité. |
| Format | Celui de [AUDIO_FORMAT.md](../AUDIO_FORMAT.md) : 4 voies (2 carrés, table d'onde, bruit), un module par piste dans `src/audio/tracks/`, enregistré dans `tracks/index.js`. `patterns.js` fournit basses, arpèges et batteries. |
| Pistes conservées | `title`, `intro_professor`, `hometown` (Hameau-de-Lys), `ending`, les jingles et les rencontres. Les autres restent comme repli et peuvent être réattribuées. |
| Motif du jeu | Les pistes de `MOTIF_TRACKS` gardent le motif sur la voie 1 (contrôlé par `npm run validate`). Les nouvelles pistes peuvent le citer, sans obligation. |
| Identifiants | Une nouvelle piste a un nouvel id (`town_port_ondine`, `route_bretagne`…). Les cartes changent seulement leur champ `music`. Les sauvegardes ne stockent pas la musique. |
| Écoute | Claude ne peut pas écouter. Chaque lot se termine par une écoute de Nicolas dans le menu F1 (`npm run dev`), avec la liste des pistes à juger. |

## Sources

- `src/audio/tracks/` : pistes existantes, `patterns.js`, `index.js` (`THEMES`, `MAP_TRACKS`, `BATTLE_TRACKS`, `MOTIF_TRACKS`).
- `src/data/music.js` : musiques de rencontre, de combat et de victoire.
- `src/data/maps/<zone>/` : champ `music` de chaque carte.
- `tools/validators/audio.js` : durée minimale (30 s pour une carte, 45 s pour un combat), voies de même longueur et même bouclage.
- [PNJ_V2.md](PNJ_V2.md) : fiches de zone, fil conducteur de chaque région.

## Pistes à créer

Piste de départ, à vérifier et compléter au lot 0. Les formes citées sont des danses et des genres attestés ; la mélodie reste inventée.

| Id proposé | Cartes | Région | Forme et couleur |
|---|---|---|---|
| `town_sablon` | Bourg-Sablon | Pays de la Loire | Ronde de Loire, 2/4 léger, mode majeur |
| `forest` (retouche) et `route_bretagne` | Bois Murmurant, Routes 2 et 3 | Bretagne intérieure | An dro, 4/4 en boucle courte, phrases de 8 temps |
| `town_port_ondine` | Port-Ondine, bateau-musée | Bretagne littorale | Fest-noz : couple bombarde (carré aigu) et biniou (carré, bourdon de la table d'onde), kan ha diskan en question-réponse entre voies 1 et 2 |
| `route_littoral` | Routes 4 et 5 | Bretagne littorale | Gavotte, phrases asymétriques, ressac au bruit |
| `town_vireval` | Vireval | Nord-Est industriel | Marche de géants de carnaval, carillon en arpèges |
| `factory` | Usine Opale, Centrale abandonnée | Nord-Est industriel | Ostinato mécanique, bruit métallique (`N7`) |
| `town_cendrelune` | Cendrelune | Normandie | Ronde de verger, 6/8, mode mixolydien |
| `town_haute_bise` | Haute-Bise | Bourgogne-Franche-Comté | Branle, tic-tac d'horloger à la voie de bruit |
| `route_bise` | Route 7, Falaises de Bise | Bourgogne-Franche-Comté | Bourrée à 2 temps, souffle de bise (glissandos) |
| `marsh` | Route 8, Marais Gris | Nouvelle-Aquitaine | Maraîchine lente, barque qui tangue (6/8 balancé) |
| `town_ombrecourt` | Ombrecourt, casino | Île-de-France | Valse musette 3/4, accordéon imité (carré 25 % et vibrato) |
| `catacombs` | QG Opale | Île-de-France | Pas feutrés, mode phrygien |
| `sea_corse` | Routes 9 et 10, Ilots | Corse | Paghjella : trois voix tenues, deux carrés et table d'onde en tierces et quintes |
| `sunken_library` | Bibliothèque Engloutie | Corse | Lent, échos à la voie 2 décalée d'une croche |
| `town_forge` | Forge-Ardente | Occitanie | Sardane pyrénéenne (cobla), enclume au bruit |
| `volcano` | Cœur de la Forge | Occitanie | Ostinato grave, grondement `X14` |
| `town_givremont` | Givremont | Auvergne-Rhône-Alpes | Bourrée auvergnate 3/8, cabrette imitée |
| `ice_cave` | Grotte Boréale, téléphériques | Auvergne-Rhône-Alpes | Notes isolées, table d'onde douce, beaucoup de silence |
| `route_ligue` | Col et Grotte des Échos | Provence | Farandole, galoubet (carré 12,5 % aigu) et tambourin (bruit) |
| `league` | Citadelle d'Azur, salles de la Ligue (aujourd'hui `memory_tower`), Pic d'Azur | Provence | Marche solennelle, cite le motif du jeu |
| `gym` | Toutes les arènes | (commune) | Thème d'arène commun, distinct des villes |
| `house` | Maisons (26 cartes) | (commune) | Intérieur calme et court, pour ne plus rejouer `hometown` |
| `battle_legendary` | Combats légendaires | (commune) | Combat, 45 s minimum, plus lent et plus grave que `battle_final` |
| `battle_gardien` | Gardiens de la Ligue | (commune) | Combat, entre `battle_leader` et `battle_final` |

## Règles

- Chaque piste de carte dure au moins 30 s avant de boucler, chaque combat au moins 45 s. La boucle se raccorde sans coupure.
- Volume et densité proches des pistes existantes : pas de voie de bruit continue sur une carte, la musique ne doit pas fatiguer après 10 minutes.
- Une ville se distingue de sa route par le tempo et l'instrumentation, mais garde le même mode, pour que la région s'entende.
- Aucune piste n'imite un thème de jeu existant, même transposé.
- La table de référence indique pour chaque piste la forme d'origine et si elle est attestée (F), traditionnelle au sens large (A) ou inventée (J), comme au prompt 3.

## Livrable de référence : `docs/audio/MUSIQUES_V2.md`

Créé au lot 0. Une ligne par piste :

| Id | Cartes | Région | Forme | Mesure, tempo | Mode | Timbres | Statut |
|---|---|---|---|---|---|---|---|

## Déroulé par lots

Avant chaque lot, présenter les pistes prévues et attendre mon feu vert ; après, faire un commit, un retour et la liste d'écoute.

| Lot | Contenu |
|---|---|
| 0 | `MUSIQUES_V2.md` complet : pistes, cartes concernées, formes et modes. Aucun code. |
| 1 | Communes : `gym`, `house`. Elles changent le plus de cartes. |
| 2 | Début et Bretagne : `town_sablon`, `route_bretagne`, `town_port_ondine`, `route_littoral`, retouche de `forest`. |
| 3 | Nord-Est, Normandie et Bourgogne : `town_vireval`, `factory`, `town_cendrelune`, `town_haute_bise`, `route_bise`. |
| 4 | Marais, Île-de-France et Corse : `marsh`, `town_ombrecourt`, `catacombs`, `sea_corse`, `sunken_library`. |
| 5 | Occitanie, Alpes et Provence : `town_forge`, `volcano`, `town_givremont`, `ice_cave`, `route_ligue`, `league`. |
| 6 | Combats : `battle_legendary`, `battle_gardien`, branchement dans `src/data/music.js` et les dresseurs concernés. |
| 7 | Nettoyage : pistes devenues inutiles retirées, `docs/GAME_DESIGN.md` (nombre de pistes), `docs/AUDIO_FORMAT.md` si le format évolue. |

Chaque lot se termine par `npm run validate` et `npm test`, puis l'écoute dans le menu F1.
