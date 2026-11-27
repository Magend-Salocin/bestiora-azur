# 07. L'histoire et les événements

Ce que tu vas apprendre :

- comment le jeu se souvient de ce que tu as déjà fait (les drapeaux) ;
- comment on écrit une scène de l'histoire sans programmer (les scripts) ;
- où sont rangés tous les dialogues ;
- comment l'aventure garde le bon ordre.

## Les drapeaux : la mémoire de l'aventure

Comment le jeu sait-il que tu as déjà choisi ton starter, battu tel dresseur ou ramassé telle potion ? Avec des **drapeaux** (flags).

Un drapeau est comme une case à cocher dans un grand carnet. Il a un nom, et il est soit levé (coché), soit baissé (pas coché) :

```text
[x] got_starter            tu as reçu ta première bestiole
[x] rival_1_done           tu as fait le premier combat contre la rivale
[x] item_route_1_2         tu as ramassé la capsule de la Route 1
[ ] has_bestiary           tu n'as pas encore le Bestiaire
[ ] trainer_garance        tu n'as pas encore battu la championne Garance
```

Les drapeaux sont rangés dans l'état du jeu ([src/state/game-state.js](../../src/state/game-state.js)), et donc sauvegardés avec ta partie.

Beaucoup de choses posent des drapeaux automatiquement : un objet ramassé, un dresseur battu (`trainer_<son id>`), une case piégée déjà déclenchée. Les scripts peuvent aussi en lever ou en baisser.

Deux drapeaux sont spéciaux : ils sont calculés au lieu d'être cochés. `bestiary_149` est levé quand tu as capturé 149 espèces différentes. C'est lui qui fait apparaître la mythique Mitrêve.

## Les scripts : des recettes de scène

Un **script** est une liste d'ordres, lus un par un, comme une recette de cuisine ou une pièce de théâtre. Chaque ordre est une petite fiche `{ cmd: ..., ... }` (cmd veut dire « commande »).

Voici le script de l'infirmière des Haltes, dans [src/data/scripts.js](../../src/data/scripts.js) :

```js
halte_heal: [
  {
    cmd: 'ask', text: 'halte_welcome',          // pose une question (oui / non)
    yes: [                                       // si tu réponds oui :
      { cmd: 'say', text: 'halte_wait' },        //   « Un instant… »
      { cmd: 'play_sfx', sfx: 'jingle_heal' },   //   la petite musique de soin
      { cmd: 'fade', direction: 'out', color: 'white' },  // l'écran devient blanc
      { cmd: 'heal_party' },                     //   toute l'équipe est soignée
      { cmd: 'wait', seconds: 0.4 },
      { cmd: 'fade', direction: 'in' },          //   l'écran revient
      { cmd: 'set_respawn' },                    //   si tu perds, tu reviendras ici
      { cmd: 'say', text: 'halte_done' },
    ],
    no: [{ cmd: 'say', text: 'halte_no' }],      // si tu réponds non
  },
],
```

Pas besoin d'être programmeur pour lire ou écrire ça : c'est une suite d'actions dans l'ordre.

### Les commandes principales

| Commande | Ce qu'elle fait |
| --- | --- |
| `say` | affiche un texte dans la boîte de dialogue |
| `ask` | pose une question, puis suit la branche `yes` ou `no` |
| `move` | fait marcher un personnage (ou le joueur) sur un trajet |
| `face` | tourne un personnage vers une direction, ou vers le joueur |
| `wait` | attend quelques secondes |
| `set_flag`, `clear_flag` | lève ou baisse un drapeau |
| `if_flag` | si le drapeau est levé, fait `then`, sinon fait `else` |
| `if_item`, `if_badge` | pareil, avec un objet du sac ou un badge |
| `give_item`, `take_item` | donne ou reprend un objet |
| `give_creature` | donne une bestiole |
| `give_money`, `give_badge` | donne de l'argent ou un badge |
| `heal_party` | soigne toute l'équipe |
| `battle` | lance un combat contre un dresseur |
| `wild_battle` | lance un combat contre une bestiole sauvage (les légendaires) |
| `warp` | téléporte le joueur sur une autre carte |
| `show_actor`, `hide_actor` | fait apparaître ou disparaître un personnage |
| `play_music`, `play_sfx` | change la musique, joue un son |
| `fade`, `shake_screen` | fondu au noir ou au blanc, tremblement de l'écran |
| `open_menu` | ouvre la boutique, le stockage, la pension, les crédits… |
| `choose_starter` | ouvre le choix de la première bestiole |
| `call` | lance un autre script par son nom |
| `end` | arrête le script |

La liste complète, avec les champs de chaque commande, est dans [docs/world-building/maps/MAP_FORMAT.md](../world-building/maps/MAP_FORMAT.md).

### Le lecteur de scripts

Les scripts sont lus par [src/overworld/script-runner.js](../../src/overworld/script-runner.js). Pour chaque commande, il cherche la fonction correspondante dans une grande table et l'exécute, puis passe à la suivante :

```js
const handlers = {
  say: (c) => ctx.say(c.text),
  set_flag: (c) => setFlag(state, c.flag),
  if_flag: (c) => runList(hasFlag(state, c.flag) ? c.then : c.else),
  give_badge: (c) => { addBadge(state, c.badge); ctx.playSfx('jingle_badge'); },
  ...
};
```

Le lecteur attend la fin de chaque action avant de passer à la suivante : il attend que tu aies fermé la boîte de dialogue, que le personnage ait fini de marcher, que le combat soit terminé. En JavaScript, cette attente s'écrit avec `await`.

Si tu perds un combat lancé par un script, le script s'arrête, ton équipe est soignée et tu te réveilles à la dernière Halte visitée (c'est le `blackout`). Certains combats, comme le tout premier contre la rivale, continuent même si tu perds (`onLose: 'continue'`).

## Où sont écrits les scripts

Un script peut se trouver à trois endroits :

- **directement sur un habitant**, pour une phrase simple :
  ```js
  { id: 'voisine', sprite: 'vieille_dame', ..., script: [{ cmd: 'say', text: 'hameau_voisine' }] },
  ```
- **dans la partie `scripts` de la carte**, quand il est long ou utilisé plusieurs fois ;
- **dans [src/data/scripts.js](../../src/data/scripts.js)**, pour ceux qui servent partout : le soin des Haltes, les revanches contre les champions.

## Exemple : le début de l'aventure

Suivons les premières minutes du jeu pour voir les scripts et les drapeaux à l'œuvre.

1. Tu te réveilles dans ta chambre, en haut de ta maison. C'est le point `GAME_START` de [src/data/maps/index.js](../../src/data/maps/index.js).
2. Tu descends, Maman te parle. Tu sors dans Hameau-de-Lys.
3. Tu essaies de partir vers le nord. Une case piégée (trigger) se déclenche sur la sortie :

```js
{
  cmd: 'if_flag', flag: 'got_starter',          // as-tu déjà une bestiole ?
  else: [                                        // non :
    { cmd: 'say', text: 'hameau_morvan_stop' },  //   « Attends ! Ne va pas plus loin ! »
    { cmd: 'face', actor: 'player', direction: 'down' },
    { cmd: 'set_flag', flag: 'hameau_morvan_visible' },
    { cmd: 'show_actor', actor: 'morvan' },      //   la professeure apparaît
    { cmd: 'move', actor: 'morvan', path: ['up', 'up', 'up', 'up', 'up'] },  // elle accourt
    { cmd: 'say', text: 'hameau_morvan_danger' },
    { cmd: 'fade', direction: 'out' },
    { cmd: 'warp', map: 'labo_morvan', x: 4, y: 12, facing: 'up' },  // direction le labo
    ...STARTER_EVENT,                            //   la scène du choix du starter
  ],
},
```

4. Au labo, la scène `STARTER_EVENT` ([src/data/maps/debut/labo-morvan.js](../../src/data/maps/debut/labo-morvan.js)) te fait choisir ta bestiole (`choose_starter`), lève le drapeau `got_starter`, puis lance le premier combat contre la rivale.
5. Maintenant, si tu repasses sur la sortie nord, le script voit que `got_starter` est levé : il ne fait rien. Tu peux partir sur la Route 1.

Un seul drapeau a suffi à changer le comportement du village.

## Les textes

Les scripts ne contiennent jamais directement les phrases. Ils contiennent un identifiant (`hameau_morvan_danger`), et les phrases sont rangées à part dans [src/data/texts/](../../src/data/texts/), un fichier par zone :

```js
// src/data/texts/debut.js
hameau_morvan_stop: 'Attends ! Ne va pas plus loin !',
hameau_morvan_danger: 'Pr Morvan : Ouf, juste à temps !\fDes bestioles sauvages vivent dans les herbes hautes.\f...',
maison_rival_soeur_debut: 'Salut, {PLAYER} ! {RIVAL} est partie au labo à l’aube.\f...',
```

Deux règles d'écriture :

- `\f` veut dire « nouvelle page » : la boîte de dialogue attend que tu appuies sur A avant de continuer ;
- les mots entre accolades sont remplacés au moment de l'affichage : `{PLAYER}` par ton nom, `{RIVAL}` par celui de la rivale, `{CREATURE}`, `{ITEM}`, `{NUMBER}`.

Pourquoi séparer les textes ? Pour pouvoir les relire et les corriger tous au même endroit, vérifier qu'aucun n'est trop long pour sa fenêtre, et pourquoi pas un jour traduire le jeu.

Un outil vérifie que chaque texte tient dans sa boîte de dialogue, et un autre qu'aucun mot interdit (nom d'un autre jeu existant) ne s'est glissé dedans. Voir le chapitre [11](11-outils-et-tests.md).

## Comment l'aventure garde le bon ordre

L'histoire suit un ordre précis : 8 arènes, puis la Ligue. Plusieurs mécanismes empêchent de sauter des étapes :

| Mécanisme | Exemple |
| --- | --- |
| Un habitant bloque le passage tant qu'un drapeau n'est pas levé | un garde sur la route qui part après un événement (`hideIf`) |
| Un obstacle demande un objet de terrain et un badge | l'arbuste demande la Machette et le badge Eau (chapitre [06](06-monde.md)) |
| Une case piégée ramène en arrière | la professeure qui t'arrête si tu n'as pas de bestiole |
| Un contrôle des badges | au Col des Échos, il faut les 8 badges pour atteindre la Ligue |

Les niveaux des dresseurs et des bestioles sauvages augmentent aussi au fil de la route (de 2 sur la Route 1 à plus de 60 à la Ligue). Le tableau complet est dans [docs/design/WORLD_PROGRESSION.md](../design/WORLD_PROGRESSION.md).

## Les grandes étapes de l'histoire

Pour t'y retrouver dans les fichiers, voici l'aventure en résumé, avec le dossier de cartes correspondant :

| Étape | Lieu | Dossier |
| --- | --- | --- |
| Départ, choix du starter, 1er combat contre la rivale | Hameau-de-Lys | `debut` |
| Arène 1 (Roche), championne Garance | Bourg-Sablon | `debut` |
| Le Bois Murmurant et la Grotte des Cascades | Routes 2 et 3 | `bois` |
| Arène 2 (Eau) et arène 3 (Foudre), l'usine du Syndicat Opale | Port-Ondine, Vireval | `port` |
| Arène 4 (Flore), la Tour de la Mémoire | Cendrelune | `cendrelune` |
| Arène 5 (Vent) | Haute-Bise | `bise` |
| La Bouée | Marais Gris | `marais` |
| Arène 6 (Ombre), le QG secret du Syndicat | Ombrecourt | `ombrecourt` |
| Les routes maritimes, la Bibliothèque Engloutie | la mer | `mer` |
| Arène 7 (Feu), le combat contre Corvin et Draguignan | Forge-Ardente | `forge` |
| Arène 8 (Arcane) | Givremont | `givremont` |
| 4 Gardiens, puis le Maître (la rivale) | Citadelle d'Azur | `ligue` |
| Après la victoire : Vouivre et Gaussier | Pic d'Azur, Grotte Boréale | `postjeu` |

Chaque zone a trois fichiers frères : ses cartes (`src/data/maps/<zone>/`), ses dresseurs (`src/data/trainers/<zone>.js`) et ses textes (`src/data/texts/<zone>.js`).

## Petit défi

Écris sur papier un script pour un habitant qui te donne une Potion la première fois que tu lui parles, puis dit « Bonne route ! » les fois suivantes. Indice : il te faut `if_flag`, `give_item`, `set_flag` et `say`. Compare ensuite avec le script `guide` de [src/data/maps/debut/route-1.js](../../src/data/maps/debut/route-1.js), qui fait presque la même chose.

## À retenir

- Les drapeaux sont des cases à cocher qui retiennent ce que tu as fait.
- Un script est une liste d'ordres, lus un par un, qui raconte une scène.
- `if_flag` permet à une même scène de se dérouler différemment selon ce que tu as déjà fait.
- Les phrases sont rangées à part, par zone, et appelées par leur identifiant.
- Objets de terrain, badges, habitants qui bloquent et cases piégées gardent l'histoire dans le bon ordre.
