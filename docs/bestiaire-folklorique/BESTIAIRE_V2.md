# Bestiaire V2 : référentiel

Source de vérité unique pour la refonte des bestioles. Les fichiers de `archives/` sont des brouillons : ils servent de matière première, pas de référence.

## Décisions

| Sujet | Décision | Raison |
|---|---|---|
| Principe | Chaque emplacement 001 à 150 du jeu reçoit une créature folklorique : nouveau nom, nouvelle légende, nouveau sprite. | Les stats, attaques, évolutions, rencontres et dresseurs restent valides. Aucun rééquilibrage. |
| Numérotation | Les numéros du jeu font foi (001 à 150). Les numéros des brouillons sont abandonnés. | Les brouillons se contredisaient (090, 091, 109 à 120). |
| Nombre | 150 espèces, pas 151. La « Mite des rêves » devient le mythique 150. | Le jeu, ses tests et l'outil d'obtention comptent 150 espèces. |
| Types | Les types de l'emplacement font foi. La créature est adaptée à ses types, pas l'inverse. | Les arènes, les attaques et l'équilibrage reposent sur ces types. |
| Structure des lignées | Celle du jeu (1, 2 ou 3 formes, branches, pierres, amitié). | Les brouillons imposaient 50 lignées de 3, incompatible avec le jeu. |
| Identifiants | Les identifiants internes (`fenouillot`…) restent, seul le nom affiché change. Renommage en fin de chantier, avec migration des sauvegardes. | 570 références dans le code, les cartes, les tests et les sauvegardes. |
| Vocabulaire | « bestiole », « Bestiaire ». Le mot « Folklomon » est abandonné. | Le suffixe « -mon » évoque une franchise ([GAME_DESIGN.md](../GAME_DESIGN.md), section 1). |
| Noms | 10 caractères maximum, sans espace de préférence. Les noms longs restent dans la légende. | Limite d'affichage vérifiée par `npm run validate`. |
| Description en jeu | 6 lignes de 18 caractères, sur deux pages de bestiaire (A tourne la page). Couper de préférence entre deux phrases à la 3e ligne. | La fiche complète est dans `fiches/`, la description en jeu en est le résumé. |
| Exclusions | Pas d'humains, de saints, de chevaliers ni de personnages littéraires (Gargantua, Merlin, Viviane, Morgane retirés). | Règle des brouillons, conservée. |
| Concepts | Les images de `concepts/` inspirent l'ambiance uniquement. Elles portent des logos et un style de la franchise : rien n'est repris tel quel. | Règles d'originalité. |

## Correspondance des types des brouillons

Pour lire les fiches archivées :

| Brouillon | Jeu |
|---|---|
| Fée, Lumière, Psy | Arcane |
| Spectre, Ténèbres | Ombre |
| Air, Son | Vent |
| Plante | Flore |
| Poison | Toxique |
| Glace | Givre |
| Sol | Terre |
| Dragon | Selon l'élément de la créature (Eau, Feu, Vent, Terre) |

## Charte graphique

Établie sur les trois lignées de starters ([rendus/starters-planche.png](rendus/starters-planche.png)).

- Sprite 48 × 48, 4 teintes, sol à la ligne 46, axe vertical au centre.
- Taille selon le stade : stade 1 compact (corps d'environ 30 px, accessoires en plus), stade 2 plus haut et plus large, stade final occupe presque tout le cadre.
- Contour d'encre (teinte 3) d'un pixel autour de la silhouette et entre les parties qui se chevauchent.
- Lumière venant du haut à gauche : ombre d'un pixel en bas et à droite de chaque volume, reflet clair en haut à gauche.
- Teintes : 0 pour la peau et les zones claires, 1 pour les tons moyens, 2 pour les masses sombres (vêtements, pelage, écailles), 3 pour l'encre et les ombres profondes.
- Visage lisible : yeux de 2 × 3 pixels avec un reflet, bouche nettement séparée des autres masses.
- Lignée cohérente : 2 ou 3 éléments signature conservés à chaque stade (Korrigan : chapeau pointu à pointe recourbée, oreilles en pointe, barbe de mousse).
- Vue de dos : même silhouette et mêmes éléments signature que la face.
- Icône d'équipe propre à chaque espèce : 16 × 16, tête et élément signature ; la seconde image (rebond) est générée.

## Production d'une espèce

1. Rédiger la fiche dans `fiches/` (modèle : [fiches/001-korrigan.md](fiches/001-korrigan.md)).
2. Dessiner face, dos et icône dans `src/gfx/sources/creatures/<id>.js`, puis l'ajouter à `index.js`.
3. Mettre à jour l'espèce dans `src/data/creatures.js` (nom, catégorie, taille, poids, description) et passer `sprite` à `'handmade'`.
4. `npm run atlas`, `npm run validate`, `npm test`.
5. `npm run screenshots -- --preview <id>` : captures dans `rendus/<id>/` (starter, bestiaire, équipe, combat de face et de dos).

## Correspondance des 150 emplacements

Statut : F = figure du folklore attestée, A = archétype traditionnel, J = création du jeu. « À vérifier » = origine à confirmer dans les sources avant de figer.

| N° | Actuel | V2 | Types | Inspiration | Région | Statut |
|---:|---|---|---|---|---|---|
| 001 | Fenouillot > Fenouvert > Sylvenard | Korrigan > Korrigard > Korriroi | Flore | Korrigan | Bretagne | F, J, J (fait) |
| 004 | Braisille > Fournaise > Pyrogrue | Galtza > Galtzabras > Galtzagor | Feu | Galtzagorri | Pays basque | F, J, J (fait) |
| 007 | Flaquin > Ondéclat > Marévor | Tarasquin > Taraskor > Tarasque | Eau | Tarasque | Provence (Tarascon) | J, J, F (fait) |
| 010 | Pivelin > Grivelin > Aquilard | Farfadet > Farfandole > Farfator | Normal, Vent | Farfadet | Poitou, Vendée | A, J, J |
| 013 | Musaraille > Musarogne | Poulpiquet > Poulpifol | Normal | Poulpiquet | Bretagne | A, J |
| 015 | Feuillarve > Nymphot > Phalénoir | Chauchet > Chauchenid > Chauchemor | Insecte (Ombre au stade 3) | Chauche-vieille, esprit qui pèse sur les dormeurs | Languedoc, Provence | F, J, J |
| 018 | Bousiot > Bousigor | Carcolh > Carcolosse | Insecte, Terre | Lou Carcolh, escargot géant | Gascogne | F, J |
| 020 | Morillon > Morillard | Mandragot > Mandragoul | Toxique, Flore | Mandragot, mandragore familière | Provence | F, J |
| 022 | Glandor | Dame verte | Flore | Dames vertes des forêts | Franche-Comté | F |
| 023 | Venimot > Venimorde | Basilin > Basilic | Toxique | Basilic | Bestiaire médiéval | J, F |
| 025 | Lumignon > Lumidanse > Lumirande | Hada > Hadalune > Hadélys | Arcane (Vent au stade 3) | Hadas, fées | Pyrénées | F, J, J |
| 028 | Noisetin > Noiseclat | Faramin > Faramine | Normal | Bête faramine, bête qu'on chasse sans jamais la voir | Poitou, Vendée | J, F |
| 030 | Faonille > Cerfeuil > Cervoral | Fadet > Fadebois > Fadéon | Flore (Arcane au stade 3) | Fadet | Poitou, Vendée | A, J, J |
| 033 | Caillotin > Bloquetin > Menhirgon | Gargoulin > Gargoulard > Gargouille | Roche, Terre | Gargouille | Rouen | J, J, F |
| 036 | Noctule > Noctulard | Lubin > Lubinou | Ombre, Vent | Lubin | Normandie | F, J |
| 038 | Salamoue > Salamarde > Salamassif | Dracounet > Dracorive > Dracrhodan | Terre, Eau | Drac du Rhône | Provence (Beaucaire) | J, J, F |
| 041 | Fouisseron | Bolégan | Terre | Petit peuple souterrain | Bretagne | F, à vérifier |
| 042 | Quartzelle > Quartzard | Houlin > Houlécrin | Roche, Arcane | Fions, fées des houles (grottes marines) | Haute-Bretagne | F, J |
| 044 | Grenaillon > Lingotard > Fonderion | Servan > Servarmure > Servargent | Métal (Combat au stade 3) | Servan, gardien des richesses | Savoie | F, J, J |
| 047 | Goujonet > Goujarde > Brochemor | Laminak > Laminéa > Laminara | Eau | Laminak | Pays basque | F, J, J |
| 050 | Crabouille > Crabastion | Tudgommon > Goémonroc | Eau, Roche | Tud-gommon, peuple du goémon | Bretagne (Léon) | F, J |
| 052 | Ombrelle > Ombrellor | Morgann > Morgavague | Eau, Toxique | Marie-Morgane | Bretagne | F, J |
| 054 | Anguilet > Anguistral > Fulmarène | Coulobrin > Coulobron > Coulobre | Eau, Foudre | Coulobre, serpent des tempêtes | Provence (Sorgue) | J, J, F |
| 057 | Lapugil > Lapugilat | Lougarou > Louvar | Combat | Loup-garou | France | A, J |
| 059 | Toisonnet > Nimbelaine | Truffandec > Truffandor | Normal, Vent | Esprit du foyer | Béarn | F, à vérifier ; J |
| 061 | Hurlegroin | Warabouc | Combat | Bouc métamorphe | Lorraine, à vérifier | F |
| 062 | Pétalune > Corolline | Margot > Margolys | Flore, Arcane | Margot la fée | Haute-Bretagne | F, J |
| 064 | Lampyrin > Lampyrex | Follet > Follumine | Insecte, Foudre | Feu follet | France | A, J |
| 066 | Bovaillon | Gonfaron | Normal | Âne de Gonfaron, l'âne qui vole | Provence (Var) | F |
| 067 | Cocolet > Cocomarin / Cocorage | Fullettu > Fullemarin / Fulletonne | Normal > Eau / Foudre | Fullettu | Corse | F, J, J |
| 070 | Fumeron > Fumelard > Cendrador | Lébérou > Lébérouge > Lébérombre | Feu (Ombre au stade 3) | Lébérou | Périgord | F, J, J |
| 073 | Boulonnet > Boulonnier | Gobelinet > Gobelin | Métal, Foudre | Gobelin | Normandie | J, A |
| 075 | Crassou > Crassolard | Veluchon > Velucorne | Toxique | La Velue | La Ferté-Bernard | J, J |
| 077 | Piquevolt | Fouletot | Foudre | Fouletot, lutin des écuries | Franche-Comté | F |
| 078 | Ampoulin > Ampoulard > Ampérion | Follaton > Follaclair > Follorage | Foudre (Métal au stade 3) | Follaton | Savoie | F, J, J |
| 081 | Sombrelin > Sombrecor | Croquemine > Croquefrou | Ombre | Croquemitaine | France | J, J |
| 083 | Stalactor | Dame noire | Roche, Ombre | Dames noires des grottes | À vérifier | F |
| 084 | Lombrin > Lombrigant | Lycastre > Lycastron | Terre | Lycastre | Provence, à vérifier | F, J |
| 086 | Filandrin > Filandrix | Câmecru > Câmecruse | Insecte, Ombre | Câme-Cruse | À vérifier | F, J |
| 088 | Fusiblet > Fusiblard | Moinillon > Moinbourru | Foudre, Ombre | Moine bourru | Paris | J, F |
| 090 | Brumelin > Brumoire > Brumaître | Blanchin > Blancôme > Blancélune | Ombre, Arcane | Dame blanche | France | J, J, J |
| 093 | Cierget > Lustrombre | Ankoulet > Ankou | Ombre, Feu | Ankou et sa lanterne | Bretagne | J, F |
| 095 | Glasnuit | Revenant | Ombre | Revenant | France | A |
| 096 | Dionelle > Dionavore | Bugulin > Bugul Noz | Flore | Bugul Noz | Bretagne (Vannetais) | J, F |
| 098 | Ronceroc | Roncefée | Flore, Roche | Fée des ronces | France | J |
| 099 | Butinet > Butinelle | Jetin > Jetinelle | Insecte, Vent | Jetins, petit peuple des côtes | Haute-Bretagne | F, J |
| 101 | Cabrelin > Bouquetor > Cabrecime | Cabrillon > Cabridor > Cabro d'Or | Combat (Roche au stade 3) | Cabro d'Or, chèvre d'or | Provence (Baux) | J, J, F |
| 104 | Volplanin > Volplaneur | Serpvolin > Serpvolant | Vent | Serpent volant | Provence | J, F |
| 106 | Éolithe | Koril | Roche, Vent | Korils, danseurs des menhirs | Bretagne | F |
| 107 | Givrelet > Givrailes | Barbegel > Barbegazi | Givre (Vent au stade 2) | Barbegazi, nain des glaciers | Savoie | J, F |
| 109 | Frimousson > Frimours > Frimastoc | Vosgoup > Vosgar > Vosgarde | Givre (Combat au stade 3) | Bête des Vosges | Vosges | J, J, J |
| 112 | Nuageot > Cumulard | Hellequet > Hellequin | Vent | Mesnie Hellequin, chasse des nuées | Normandie | J, F |
| 114 | Girouette | Bayard | Vent, Métal | Cheval Bayard | Ardennes | F |
| 115 | Fangelet > Fangeur > Fangeroi | Graoulet > Graoulard > Graoully | Toxique, Eau | Graoully | Metz | J, J, F |
| 118 | Patineau > Patinoir | Lavandière > Lavandâme | Insecte, Eau | Lavandières de nuit | Bretagne, Berry | F, J |
| 120 | Silurbe | Magou | Terre, Eau | Poisson moustachu des crues | À vérifier | F |
| 121 | Pestelet > Pestorne | Galipotin > Galipote | Toxique, Ombre | Galipote | Saintonge | J, F |
| 123 | Chafouin > Chafourbe | Matagri > Matagot | Ombre | Matagot, chat sorcier | Provence, Gascogne | J, F |
| 125 | Miroitin > Miroitage | Sotrin > Sotrémage | Arcane, Métal | Sotré | Lorraine | J, J |
| 127 | Nocturbe | Birette | Arcane, Ombre | Birette | Normandie, à vérifier | F |
| 128 | Chipotard | Drapet | Normal, Ombre | Drapet, esprit domestique chapardeur | À vérifier | F |
| 129 | Raielle > Raieciel | Sirénéa > Sirénor | Eau, Vent | Sirène de la Garonne | Aquitaine | J, J |
| 131 | Grimoule > Grimoulix | Mélusineau > Mélusine | Eau, Arcane | Mélusine | Poitou (Lusignan) | J, F |
| 133 | Octobras | Nainmarin | Eau, Combat | Nain de mer | Bretagne | A |
| 134 | Épavard | Bagnoz | Ombre, Eau | Bag noz, bateau des noyés | Bretagne | F |
| 135 | Albavent | Goélâme | Vent, Normal | Âmes des noyés en oiseaux de mer | Bretagne | A |
| 136 | Tisonnet > Tisonnard | Goulinet > Grangoule | Feu, Roche | Grand'Goule | Poitiers | J, F |
| 138 | Pyrobélier | Taurnoir | Feu | Taureau noir | France | A |
| 139 | Enclumor | Mallet | Métal, Feu | Cheval Mallet | Poitou, Vendée | F |
| 140 | Scorielle > Scoriarque | Babauet > Babau | Feu, Insecte | Babau | Languedoc (Nîmes) | J, F |
| 142 | Cristelan > Cristarche | Alicornet > Alicorne | Givre, Arcane | Alicorne d'Avignon | Provence, à vérifier | J, F |
| 144 | Névéon | Dahu | Givre | Dahu | Alpes, Jura | F |
| 145 | Stoïcor | Gévaudan | Combat, Arcane | Bête du Gévaudan | Lozère | F |
| 146 | Azurel (légendaire) | Vouivre | Vent, Arcane | Vouivre | Franche-Comté | F |
| 147 | Glacerne (légendaire) | Gaussier | Givre, Roche | Lion de pierre du mont Gaussier | Provence (Alpilles) | F |
| 148 | Volcarde (légendaire) | Draguignan | Feu, Terre | Dragon de Draguignan | Var | F |
| 149 | Fulgorine (légendaire) | Veneur | Foudre, Vent | Grand Veneur | Fontainebleau | F |
| 150 | Mirelle (mythique) | Mitrêve | Arcane | Mite des rêves | Création | J |

Les noms ont été vérifiés pour la longueur. Ils seront contrôlés par `npm run validate` (mots interdits, doublons) au moment de leur intégration.

## Points ouverts

- Origines marquées « à vérifier » : à confirmer dans Sébillot, Tembouret ou Joisten avant de figer.
- Les créatures des brouillons qui ne figurent pas dans la table (Garache, Dauna d'Aygua, Poulpimancien, Chasse-galerie, etc.) restent en réserve dans `archives/`.
