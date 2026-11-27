# Prompt 3 : attaques ancrées dans le folklore

Indépendant des prompts 1 et 2 : peut être lancé à tout moment.

## Objectif

Renommer et réécrire les 166 attaques pour qu'elles évoquent le folklore des bestioles V2 et des régions françaises. On change uniquement les noms, les descriptions et les animations des types.

## Décisions

| Sujet | Décision |
|---|---|
| Périmètre | Nom, description et animation de type. Puissance, précision, PP, priorité, effet, chance d'effet, catégorie, type, apprentissages et équipes des dresseurs restent identiques. Aucun rééquilibrage. |
| Identifiants | Les `id` des attaques sont conservés : ils sont référencés par les apprentissages, les dresseurs, les objets et les sauvegardes. |
| Attaques exclusives | Les attaques réservées aux légendaires (`exclusiveTo`) portent le nom de leur légende (Vouivre, Draguignan, Gaussier, Veneur, Mitrêve). |
| Source du thème | Le type donne la famille de motifs. Les bestioles qui apprennent l'attaque précisent le motif. |

## Sources

- `src/data/moves.js` : les attaques, sous la forme `move(id, name, type, category, power, accuracy, pp, description, options)`.
- `src/data/creatures.js` : apprentissages, pour savoir qui apprend quoi.
- [BESTIAIRE_V2.md](../../world-building/creatures/BESTIAIRE_V2.md) et `sheets/` : légendes et régions des bestioles.
- `src/battle/ui/move-animations.js` : une animation par type (`TYPE_ANIMATIONS`).
- `tools/validators/texts.js` : limites d'affichage ; `tools/forbidden-words.js` : mots interdits.

## Pistes de motifs par type

Ce sont des pistes à vérifier et compléter au lot 0, pas une liste figée.

| Type | Motifs |
|---|---|
| Normal | Vie rurale : sabots, fourche, battage, veillée, charivari |
| Feu | Feux de la Saint-Jean, forge, braise de l'âtre, Lébérou, Grand'Goule |
| Eau | Marées, lavoirs, sirènes de la Garonne, Mélusine, Tarasque du Rhône |
| Flore | Gui, lande, bruyère, mandragore, Dames vertes |
| Foudre | Feu Saint-Elme, orages des moissons, feux follets |
| Givre | Barbegazi, glaciers, veillées d'hiver, Dahu |
| Combat | Gouren (lutte bretonne), savate, joutes, lancer de pierre basque |
| Toxique | Philtres, marais, Graoully, Galipote |
| Terre | Menhirs, dolmens, Lou Carcolh, éboulements |
| Vent | Mistral, tramontane, bise, Mesnie Hellequin, Serpent volant |
| Arcane | Fées, korrigans, cercles de pierres, Mitrêve |
| Insecte | Essaims, chenilles des landes, Babau, Câme-Cruse |
| Roche | Gargouilles, tuffeau, granit, Koril |
| Ombre | Ankou, lavandières de nuit, Bag noz, Moine bourru |
| Métal | Cloches, servants des mines, Gobelin, cheval Mallet |

## Règles

- Les noms font 12 caractères au plus, espaces compris. Les descriptions tiennent sur 2 lignes de 18 caractères.
- Aucun nom d'attaque d'une franchise existante, même traduit. Les noms écartés pour cette raison s'ajoutent à `forbidden-words.js`.
- Le nom décrit ce que fait l'effet. Une attaque qui baisse la précision ne s'appelle pas comme un coup de poing.
- Pas de doublon de nom avec une bestiole, un objet, une classe ou un lieu.
- Les motifs restent attestés. Une invention du jeu est assumée comme telle dans la table de référence.

## Livrable de référence : `docs/world-building/creatures/ATTAQUES_V2.md`

Créé au lot 0. Pour chaque attaque, une ligne :

| id | Ancien nom | Nouveau nom | Type | Effet | Motif | Statut |
|---|---|---|---|---|---|---|

- Effet : rappel de l'effet, sans le modifier.
- Statut : F (folklore attesté), A (archétype traditionnel) ou J (création du jeu).

## Déroulé par lots

Avant chaque lot, présenter la table du lot et attendre mon feu vert ; après, faire un commit et un retour.

| Lot | Contenu |
|---|---|
| 0 | `ATTAQUES_V2.md` complet : les 166 nouveaux noms et motifs, à valider en une fois pour éviter les doublons entre types. Aucun code. |
| 1 | Normal, Combat et Vent. |
| 2 | Feu, Eau et Flore. |
| 3 | Foudre, Givre et Toxique. |
| 4 | Terre, Roche et Insecte. |
| 5 | Arcane, Ombre, Métal et les attaques exclusives. |
| 6 | Textes qui citent des attaques (`src/data/texts/`), tests qui comparent des noms, puis captures du menu des attaques en combat. |
| 7 (optionnel, à confirmer) | Animations de type retravaillées dans `move-animations.js` (lame de faux pour Ombre, éclat de menhir pour Roche…), mêmes durées. |

Chaque lot se termine par `npm run validate`, `npm run check-text` et `npm test`.
