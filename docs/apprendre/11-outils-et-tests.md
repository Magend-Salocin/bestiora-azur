# 11. Les outils et les tests

Ce que tu vas apprendre :

- ce qu'est un test automatique, et pourquoi le jeu en a 252 ;
- comment un robot vérifie toutes les données du jeu avant même de le lancer ;
- comment on vérifie que le jeu est équilibré, ni trop facile ni trop dur ;
- le menu secret des développeurs.

## Pourquoi des robots vérificateurs ?

Le jeu contient 150 bestioles, 166 attaques, 248 dresseurs, 113 cartes et des milliers de phrases. Une seule faute de frappe (`'farfadit'` au lieu de `'farfadet'`) pourrait faire planter le jeu au milieu de l'aventure. Personne ne peut tout relire à la main à chaque changement.

Alors on a écrit des programmes qui vérifient les autres programmes. Il y en a deux sortes : les **tests**, qui vérifient que le code fait ce qu'il doit faire, et les **validateurs**, qui vérifient que les données sont correctes.

## Les tests : `npm test`

Un test est une petite question à laquelle on connaît déjà la réponse. On la pose au programme, et on vérifie qu'il répond juste.

Exemple tiré de [tests/formulas.test.js](../../tests/formulas.test.js) :

```js
test('HP formula, hand-computed', () => {
  // (2 × 45 + 0 + 0) × 5 ÷ 100 = 4,5 → 4 ; 4 + 5 + 10 = 19
  assert.equal(computeHp(45, 0, 0, 5), 19);
});
```

« Calcule les PV d'une bestiole de base 45, niveau 5, sans gène ni entraînement. J'ai fait le calcul à la main : ça doit donner 19. » Si un jour quelqu'un modifie la formule par erreur, ce test devient rouge.

Les tests sont dans le dossier [tests/](../../tests/), un fichier par sujet :

| Fichier | Ce qu'il vérifie |
| --- | --- |
| `formulas.test.js` | les formules des statistiques et de l'expérience |
| `types.test.js` | le tableau des types est équilibré |
| `battle-damage.test.js` | le calcul des dégâts, les critiques, la précision |
| `battle-effects.test.js` | chaque effet d'attaque (sommeil, poison, coups multiples…) |
| `battle-flow.test.js` | le déroulement des combats, la capture, l'expérience |
| `sprite-sources.test.js` | les dessins : chaque bestiole a une face, un dos et une icône aux bonnes tailles |
| `rng.test.js` | la machine à hasard : même graine, mêmes tirages |
| `overworld.test.js` | les collisions, les corniches, les rencontres |
| `script-runner.test.js` | le lecteur de scripts |
| `save.test.js` | la sauvegarde, les migrations, la copie de secours |
| `world.test.js`, `world-part2.test.js`, `world-part3.test.js` | l'aventure : starters, rivale, champions, objets de terrain |
| `text-fit.test.js` | les textes tiennent dans leur fenêtre |

Les 242 tests passent en un peu plus d'une seconde. Ils n'ont pas besoin d'ouvrir le jeu, parce que la logique est séparée du dessin (chapitre [01](01-vue-ensemble.md)), et que le hasard est contrôlé par une graine.

## La validation : `npm run validate`

Le validateur ([tools/validate-data.js](../../tools/validate-data.js)) relit toutes les données du jeu et cherche les erreurs. Il est découpé en vérificateurs spécialisés, dans [tools/validators/](../../tools/validators/) :

| Vérificateur | Exemples de ce qu'il attrape |
| --- | --- |
| Identifiants | deux bestioles avec le même `id`, un `id` avec un accent |
| Types | un type inconnu |
| Attaques | un effet d'attaque inconnu, une précision impossible |
| Bestioles | une attaque apprise qui n'existe pas, une bestiole sans dessin |
| Évolutions | une évolution vers une espèce inconnue, une boucle d'évolution |
| Objets | un objet sans prix, un effet inconnu |
| Textes | un texte manquant, un mot interdit |
| Textes dans leur fenêtre | une phrase trop longue pour la boîte de dialogue |
| Dresseurs | un dresseur avec une bestiole inconnue |
| Cartes | un caractère inconnu dans la légende, une porte qui mène nulle part, une connexion non réciproque |
| Drapeaux | un drapeau qu'on teste mais que rien ne lève jamais |
| Audio | une mesure incomplète, des voix de longueurs différentes, le thème du jeu absent |
| Obtention | une bestiole impossible à obtenir dans une partie |

Le résultat ressemble à ça :

```text
OK  Identifiants
OK  Types
OK  Attaques
OK  Bestioles
OK  Évolutions
OK  Objets
OK  Classes de dresseurs
OK  Textes
OK  Textes de dialogue
OK  Textes dans leur fenêtre
OK  Dresseurs
OK  Scripts globaux
OK  Cartes
OK  Drapeaux
OK  Audio
OK  Obtention des 150 espèces

150 bestioles, 166 attaques, 45 objets, 31 classes de dresseurs : données valides
```

S'il trouve une erreur, la ligne commence par `ERR`, suivie du message qui dit quoi corriger et où.

### Le vérificateur « Obtention »

C'est le plus malin. Il prouve, rien qu'en lisant les données, qu'on peut obtenir les 150 bestioles en une seule partie, quel que soit le starter choisi. Il regarde les rencontres sauvages, les évolutions, les échanges, les cadeaux et les légendaires ([tools/check-obtainability.js](../../tools/check-obtainability.js)).

### Les mots interdits

Bestiora Azur est un jeu original. Un vérificateur s'assure qu'aucun nom d'un jeu existant ne s'est glissé dans les textes : la liste est dans [tools/forbidden-words.js](../../tools/forbidden-words.js).

## L'équilibrage : est-ce trop dur ?

Un champion d'arène ne doit être ni trop facile, ni impossible. Pour le vérifier sans jouer des centaines d'heures, deux outils font combattre l'arbitre du chapitre [08](08-combat.md) tout seul :

- `npm run simulate` fait combattre deux équipes contrôlées par l'IA, et affiche le combat tour par tour. Avec la même graine, on obtient toujours le même combat ([tools/simulate-battle.js](../../tools/simulate-battle.js)).
- `npm run balance` simule chaque combat important des centaines de fois, avec une équipe « typique » de joueur à ce moment de l'aventure, et calcule le pourcentage de victoires ([tools/balance-check.js](../../tools/balance-check.js)).

Les objectifs :

| Combat | Le joueur doit gagner |
| --- | --- |
| Champions d'arène | 55 à 75 % des fois |
| Rivale | 60 à 80 % des fois |
| La Ligue entière (5 combats sans soin à la Halte) | 45 à 65 % des fois |

Si un combat sort de ces limites, l'outil le signale, et on ajuste les niveaux ou les équipes.

## Les autres outils

Dans [tools/](../../tools/) :

| Commande | Outil | Rôle |
| --- | --- | --- |
| `npm run atlas` | `build-atlas.js` | fabrique les 5 atlas (chapitres [02](02-pixels-et-couleurs.md) et [04](04-bestioles-dessin.md)) |
| `npm run creature-design -- <module>` | `export-creature-design.js` | écrit les dessins d'une famille de bestioles à partir de son module (chapitre [04](04-bestioles-dessin.md)) |
| `npm run planche -- 067-069` | `creature-sheet.js` | dessine une planche des bestioles choisies (face, dos, icône), pour vérifier les dessins |
| `npm run map-preview -- route_1` | `map-preview.js` | dessine une carte en image, sans lancer le jeu |
| `npm run bestiary` | `export-bestiary-md.js` | réécrit [docs/BESTIAIRE.md](../BESTIAIRE.md) à partir des fiches |
| `npm run check-text` | `check-text-fit.js` | vérifie seulement que les textes tiennent dans leur fenêtre |
| `npm run icon` | `build-icon.js` | fabrique l'icône du jeu à partir du dessin de la Vouivre |
| `npm run screenshots` | `capture-screenshots.js` | prend les captures d'écran du README |
| `npm run perf` | `run-perf.js` | mesure si le jeu tient bien 60 images par seconde |
| `npm run web` | `web-server.js` | sert le jeu sur le réseau de la maison, pour y jouer sur téléphone |
| `npm run build-web` | `build-web.js` | prépare la version en ligne |
| `npm run key` | `access-key.js` | fabrique les clés d'activation de la version en ligne |
| `npm run dist` | (electron-builder) | fabrique l'installeur du jeu |

## Le menu secret des développeurs

Quand le jeu est lancé avec `npm run dev`, la touche **F1** ouvre un menu réservé aux développeurs ([src/debug/debug-menu.js](../../src/debug/debug-menu.js)). Il permet de :

- se téléporter sur n'importe quelle carte ;
- lancer un combat contre n'importe quelle bestiole ou une équipe au hasard ;
- recevoir une équipe de test, soigner l'équipe ;
- obtenir le badge suivant avec son objet de terrain ;
- écouter toutes les musiques, tous les effets et tous les cris ;
- regarder les atlas.

C'est indispensable pour tester la fin du jeu sans rejouer 20 heures d'aventure. En mode développeur, le jeu démarre directement sur une petite carte de test ; `npm run dev -- --newgame` démarre sur l'écran titre.

Ce menu n'existe pas dans le jeu installé : le dossier [src/debug/](../../src/debug/) n'est pas inclus dans le paquet.

## La règle d'or

Après chaque modification, avant d'enregistrer son travail (« commit »), un développeur lance :

```text
npm test
npm run validate
```

Si tout est vert, il lance le jeu (`npm run dev`) pour voir le changement de ses propres yeux. C'est la règle suivie à chacune des 13 étapes de construction du jeu (chapitre [01](01-vue-ensemble.md)).

## À retenir

- Un test pose une question dont on connaît la réponse ; 252 tests vérifient le code en une seconde.
- Le validateur relit toutes les données et attrape les fautes avant qu'elles fassent planter le jeu.
- Des simulations de combats vérifient que le jeu n'est ni trop facile, ni trop dur.
- F1, en mode développeur, ouvre un menu pour se téléporter, combattre, écouter les sons.
- Avant d'enregistrer : `npm test` et `npm run validate` doivent être verts.
