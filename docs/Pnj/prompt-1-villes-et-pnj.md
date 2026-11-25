# Prompt 1 : identité régionale des villes et des PNJ

## Objectif

Donner à chaque zone de Brumeval l'identité d'une région française, puis réhabiller tous les PNJ et dresseurs existants : métiers, tenues, noms, classes de dresseurs, dialogues et panneaux. Le monde doit se lire comme le Bestiaire V2 : du folklore français local, région par région.

## Décisions déjà prises

| Sujet | Décision |
|---|---|
| Ampleur | On réhabille l'existant : 233 PNJ, 209 dresseurs, 31 classes, les panneaux. Positions, scripts, drapeaux, équipes, niveaux et récompenses restent identiques. Pas de nouveaux PNJ ni de quêtes. |
| Noms de lieux | Gardés (Hameau-de-Lys, Port-Ondine…). C'est l'identité des lieux qui change, pas leur nom. |
| Parler régional | Selon le personnage : les anciens et les conteurs parlent un patois marqué, les jeunes et les commerçants un français standard avec une touche régionale (un mot, une tournure). Toujours compréhensible par le contexte. |
| Figures de `base.md` | Quelques clins d'œil incarnés : des humains du monde du jeu qui évoquent une figure (une conteuse au capuchon rouge, un vieux chevalier errant, un marchand rusé surnommé « le Renard »). Jamais la figure elle-même, jamais une créature du Bestiaire en PNJ. 1 ou 2 par zone au plus. |
| Identifiants | Les identifiants internes (PNJ, dresseurs, classes, clés de textes, drapeaux) sont conservés : les sauvegardes restent compatibles. Seuls les textes affichés changent. |

## Sources à lire avant de commencer

- [base.md](base.md) : régions, métiers, catégories, fiche standard et règles de cohérence (section 7). La seconde moitié (151 figures) sert seulement de réservoir pour les clins d'œil.
- [BESTIAIRE_V2.md](../bestiaire-folklorique/BESTIAIRE_V2.md) : région de chaque bestiole. Les PNJ d'une zone parlent des bestioles qu'on y rencontre.
- [WORLD_MAP.md](../WORLD_MAP.md) : cartes, zones, champions, scénario.
- [GAME_DESIGN.md](../GAME_DESIGN.md) : ton du jeu, vocabulaire (« bestiole »).
- Code :
  - `src/data/texts/<zone>.js` : dialogues ; `\f` change de page, `\n` change de ligne.
  - `src/data/maps/` : les PNJ et dresseurs de chaque carte.
  - `src/data/trainer-classes.js` et `src/data/trainers.js`.

## Correspondance zones et régions (proposition à valider au lot 0)

| Zone | Lieux | Région |
|---|---|---|
| debut | Hameau-de-Lys | Centre-Val de Loire |
| debut | Bourg-Sablon | Pays de la Loire |
| bois | Route 2, Bois Murmurant, Route 3, Grotte des Cascades | Bretagne intérieure (Brocéliande) |
| port | Port-Ondine, Routes 4 et 5 | Bretagne littorale |
| port | Vireval, usine Opale | Grand Est et Hauts-de-France (Nord-Est industriel) |
| cendrelune | Route 6, Tunnel Obscur, Cendrelune, Tour de la Mémoire | Normandie |
| bise | Route 7, Falaises de Bise, Haute-Bise | Bourgogne-Franche-Comté |
| marais | Route 8, Marais Gris | Nouvelle-Aquitaine (Marais poitevin) |
| ombrecourt | Ombrecourt, casino, QG Opale | Île-de-France |
| mer | Routes 9 et 10, Ilots | Corse |
| forge | Forge-Ardente, Cœur de la Forge | Occitanie (forges des Pyrénées) |
| givremont | Givremont, Col des Échos, Grotte Boréale | Auvergne-Rhône-Alpes |
| ligue | Citadelle d'Azur, Pic d'Azur | Provence-Alpes-Côte d'Azur |

## Livrable de référence : `docs/Pnj/PNJ_V2.md`

Le lot 0 le crée, sur le modèle de `BESTIAIRE_V2.md`. Il contient :

1. Les décisions ci-dessus, et toute décision prise en cours de route.
2. La correspondance zones et régions validée.
3. Une fiche par zone :
   - métiers ;
   - tenues et couleurs (elles serviront au prompt 2) ;
   - traditions et fêtes évoquées ;
   - bestioles locales à citer ;
   - clins d'œil retenus ;
   - un glossaire du parler régional : mot, sens, région, source.
4. La table des 31 classes de dresseurs : ancien nom, nouveau nom (12 caractères maximum), tenue, zones où on la croise. Certaines classes restent génériques (Gamin, Fillette) ; d'autres deviennent régionales (Pêcheur → Goémonier en Bretagne, Ouvrier → Mineur dans le Nord-Est).
5. Les champions, la Pr Morvan, la rivale, Corvin et le Syndicat Opale. On propose un ancrage régional, et un nouveau nom seulement si l'actuel détonne dans sa région. Chaque changement de nom de personnage principal est validé avec moi.

## Règles d'écriture

- Langues régionales (breton, basque, corse, occitan, alsacien) et patois sont distincts. On ne mélange pas, et on n'invente pas de faux mots régionaux : chaque mot du glossaire a une source.
- Pas de caricature ni de moquerie (règle 4 de `base.md`). L'accent se montre par le vocabulaire et le rythme, pas par l'orthographe déformée.
- Une réplique régionale reste lisible sans le glossaire : le sens se devine, ou une seconde phrase le reformule.
- Les légendes sont racontées par les humains. Les créatures restent dans le Bestiaire (règle 5).
- Les accords de genre suivent les règles du Bestiaire (« une Tarasque »). Le vocabulaire reste « bestiole », jamais un mot de franchise.
- Contraintes d'affichage :
  - 18 caractères par ligne ;
  - noms de classe de 12 caractères maximum ;
  - mots interdits contrôlés par `npm run validate` ;
  - mise en page contrôlée par `npm run check-text`.

## Déroulé par lots

Chaque lot se termine par `npm run validate`, `npm run check-text`, `npm test` et des captures des dialogues clés. Avant chaque lot, présenter son contenu et attendre mon feu vert ; après, faire un commit et un retour.

| Lot | Contenu |
|---|---|
| 0 | `PNJ_V2.md` : correspondance, fiches de zone, glossaires, table des classes, personnages principaux. Aucun code. |
| 1 | Classes de dresseurs : noms dans `trainer-classes.js`, noms des dresseurs dans `trainers.js`. |
| 2 | Zone debut (Hameau-de-Lys, Bourg-Sablon, Route 1). |
| 3 | Zones bois et port. |
| 4 | Zones cendrelune et bise. |
| 5 | Zones marais et ombrecourt. |
| 6 | Zones mer, forge et givremont. |
| 7 | Ligue, post-jeu, réactions après `syndicat_dissous` (`reactions.js`), textes communs. |
| 8 | Relecture d'ensemble : cohérence des noms, répétitions, mise à jour de `WORLD_MAP.md` et `PROGRESS.md`. |

## Hors périmètre

- Portraits de combat et sprites de carte : prompt 2, à partir des tenues de `PNJ_V2.md`.
- Attaques : prompt 3.
- Nouvelles quêtes, nouveaux PNJ, cartes modifiées.
