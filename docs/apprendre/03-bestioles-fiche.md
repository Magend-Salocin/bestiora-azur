# 03. La fiche d'une bestiole

Ce que tu vas apprendre :

- ce que le jeu sait sur chaque espèce de bestiole ;
- la différence entre une espèce et une bestiole précise ;
- comment on calcule ses forces (statistiques) ;
- comment elle gagne des niveaux, apprend des attaques et évolue.

## Une espèce, plein de bestioles

Il faut d'abord distinguer deux choses :

- l'**espèce**, c'est le modèle : « le Korrigan ». Il y en a 150.
- la **bestiole**, c'est un individu précis : « le Korrigan de Elio, niveau 12, surnommé Pipou ».

C'est comme « le chat » (l'espèce) et « Minou, le chat de ta voisine » (un individu). Tous les chats se ressemblent, mais chacun a son caractère.

## La fiche d'une espèce

Les 150 fiches sont dans [src/data/creatures.js](../../src/data/creatures.js). Voici celle du Korrigan, le petit lutin breton de départ, avec des explications :

```js
{
  id: 'korrigan',          // nom technique, sans accent ni espace
  number: 1,                 // numéro dans le Bestiaire
  name: 'Korrigan',        // nom affiché dans le jeu
  types: ['flore'],          // un ou deux types
  baseStats: { hp: 42, atk: 61, def: 37, spa: 55, spd: 41, spe: 82 },
  growth: 'medium',          // vitesse pour monter de niveau
  catchRate: 190,            // facile (255) ou difficile (3) à capturer
  baseExp: 81,               // expérience gagnée quand on le bat
  trainingYield: { stat: 'spe', points: 1 },  // ce qu'il fait progresser chez le vainqueur
  evolution: { to: 'korrigard', method: 'level', value: 16 },
  learnset: [[1, 'seve_volee'], [1, 'spore_raide'], [4, 'egratignure'], [5, 'brindille'], ...],
  category: 'Bestiole Renard',
  height: 0.4,               // en mètres
  weight: 5.8,               // en kilos
  description: 'Ses oreilles de feuilles captent le moindre bruit.',
  habitat: 'foret',
  minLevel: 5,               // niveau le plus bas où on peut la rencontrer
  sprite: 'handmade',        // dessinée à la main (voir chapitre 04)
}
```

La dernière ligne, `sprite`, dit comment dessiner la bestiole. C'est le sujet du chapitre suivant.

## Les 15 types

Chaque bestiole a un ou deux **types** : Normal, Feu, Eau, Flore, Foudre, Givre, Combat, Toxique, Terre, Vent, Arcane, Insecte, Roche, Ombre, Métal.

Les types fonctionnent comme pierre-feuille-ciseaux : l'Eau éteint le Feu, le Feu brûle la Flore, la Flore boit l'Eau. Une attaque peut être :

| Résultat | Multiplicateur | Exemple |
| --- | --- | --- |
| Super efficace | × 2 | Eau contre Feu |
| Normal | × 1 | Eau contre Normal |
| Peu efficace | × 0,5 | Feu contre Eau |
| Sans effet | × 0 | Normal contre Ombre |

Si la bestiole a deux types, on multiplie les deux résultats. Une attaque super efficace contre ses deux types fait donc × 4.

Tout le tableau est dans [src/data/types.js](../../src/data/types.js), avec un petit commentaire pour justifier chaque relation :

```js
normal: {
  strong: ['insecte', 'arcane'],   // Normal frappe fort ces types
  weak:   ['roche', 'metal'],      // ces types encaissent bien Normal
  none:   ['ombre'],               // Normal traverse Ombre sans la toucher
},
```

Un test vérifie qu'aucun type n'est beaucoup plus fort que les autres.

## Les 6 statistiques

Les statistiques sont les forces et faiblesses d'une bestiole :

| Code | Nom | À quoi ça sert |
| --- | --- | --- |
| `hp` | PV (points de vie) | Combien de coups elle encaisse avant d'être K.O. |
| `atk` | Attaque | Force des attaques physiques (morsure, charge) |
| `def` | Défense | Résistance aux attaques physiques |
| `spa` | Attaque Spéciale | Force des attaques spéciales (flammes, éclairs) |
| `spd` | Défense Spéciale | Résistance aux attaques spéciales |
| `spe` | Vitesse | Qui attaque en premier |

Les `baseStats` de la fiche sont les forces de l'espèce. Le Korrigan a une Vitesse de base de 82 : il est rapide. Sa Défense de 37 est faible : il est fragile.

## Ce qui rend chaque bestiole unique

Deux Korrigan du même niveau n'ont pas exactement les mêmes statistiques, grâce à deux choses.

**Les gènes.** À la naissance (en fait, au moment où elle apparaît dans le jeu), chaque bestiole tire au hasard un nombre de 0 à 15 pour chaque statistique. C'est son talent naturel. Un Korrigan avec 15 en Vitesse sera un peu plus rapide qu'un autre avec 2.

**L'entraînement.** Chaque fois qu'elle bat une bestiole, elle gagne des points d'entraînement dans une statistique (celle indiquée par `trainingYield` de la bestiole vaincue). C'est comme faire du sport : on progresse. Le maximum est 255 points par statistique.

## Le calcul des statistiques

Voici la vraie formule, dans [src/data/formulas.js](../../src/data/formulas.js) :

```text
Statistique = (2 × base + gène + entraînement ÷ 4) × niveau ÷ 100 + 5
PV          = (2 × base + gène + entraînement ÷ 4) × niveau ÷ 100 + niveau + 10
```

(Toutes les divisions sont arrondies vers le bas.)

Faisons le calcul pour la Vitesse d'un Korrigan de niveau 10, avec un gène de 8 et aucun entraînement :

```text
2 × 82 + 8 + 0 = 172
172 × 10 ÷ 100 = 17,2   →  17
17 + 5 = 22
```

Sa Vitesse est 22. Au niveau 50, le même calcul donne 91. Plus le niveau monte, plus la base et les gènes comptent.

## Monter de niveau

Pour passer au niveau suivant, une bestiole doit accumuler des points d'**expérience** (XP) en combattant. Il existe 3 vitesses de progression, le champ `growth` :

| Vitesse | XP totale pour le niveau n | XP pour le niveau 50 |
| --- | --- | --- |
| `fast` (rapide) | 4 × n³ ÷ 5 | 100 000 |
| `medium` (moyenne) | n³ | 125 000 |
| `slow` (lente) | 5 × n³ ÷ 4 | 156 250 |

n³ veut dire n × n × n. Le niveau maximum est 100.

L'expérience gagnée en battant une bestiole dépend de son `baseExp` et de son niveau, avec un bonus de 50 % contre un dresseur. Si plusieurs bestioles de l'équipe ont participé, elles se la partagent. Le code est dans [src/battle/logic/experience.js](../../src/battle/logic/experience.js).

## Apprendre des attaques

Le `learnset` est la liste des attaques et du niveau où elles sont apprises : `[13, 'bombe_torse']` veut dire « apprend Bombe Torse au niveau 13 ».

Une bestiole connaît au plus 4 attaques. Quand elle en apprend une cinquième, le jeu te demande laquelle oublier. Quand une bestiole apparaît, elle connaît les 4 dernières attaques de sa liste jusqu'à son niveau.

Les 166 attaques sont dans [src/data/moves.js](../../src/data/moves.js) :

```js
move('elan_vif', 'Élan Vif', 'normal', P, 40, 100, 30, 'Si vif qu’il frappe en premier.', { priority: 1 }),
//   id          nom          type    catégorie puissance précision PP  description              option
```

- **P** (physique) utilise l'Attaque, **S** (spéciale) l'Attaque Spéciale, **X** (statut) ne fait pas de dégâts mais change quelque chose (endormir, baisser la Défense…).
- La **précision** est la chance de toucher, sur 100.
- Les **PP** sont le nombre de fois qu'on peut l'utiliser avant de se reposer dans une Halte.

## Évoluer

En grandissant, certaines bestioles se transforment en une nouvelle espèce. Le champ `evolution` dit comment :

| Méthode | Exemple dans la fiche | Signification |
| --- | --- | --- |
| Niveau | `{ to: 'korrigard', method: 'level', value: 16 }` | Au niveau 16, Korrigan devient Korrigard |
| Objet | `{ to: 'hadelys', method: 'item', value: 'pierre_lunaire' }` | En lui donnant une Pierre Lunaire |
| Amitié | `{ to: 'truffandor', method: 'friendship', value: 220 }` | Quand il t'aime assez (220 sur 255) |

L'amitié commence à 70 et monte quand on marche et qu'on gagne des niveaux. Une famille de bestioles qui évoluent les unes dans les autres s'appelle une **lignée** : Korrigan → Korrigard → Korriroi.

Quand une bestiole évolue, elle garde son surnom, ses attaques et son niveau. Seules ses statistiques sont recalculées avec les bases de la nouvelle espèce.

## De la fiche à la bestiole

La fonction qui fabrique une bestiole précise est `createCreature`, dans [src/battle/logic/creature.js](../../src/battle/logic/creature.js) :

```js
const pipou = createCreature('korrigan', 12, rng);
```

Elle :

1. lit la fiche de l'espèce ;
2. tire les 6 gènes au hasard (de 0 à 15) ;
3. met l'entraînement à 0 ;
4. calcule l'expérience correspondant au niveau 12 ;
5. choisit les 4 attaques connues ;
6. calcule les statistiques et remplit les PV.

Le résultat est un simple objet, facile à sauvegarder :

```js
{
  uid: 'fenouillot-k3x9a',   // identifiant unique
  species: 'korrigan',
  nickname: null,            // pas de surnom
  level: 12,
  genes: { hp: 7, atk: 12, def: 3, spa: 15, spd: 0, spe: 9 },
  training: { hp: 0, atk: 0, def: 0, spa: 0, spd: 0, spe: 0 },
  stats: { hp: 32, atk: 21, ... },
  hp: 32,
  moves: [{ id: 'egratignure', pp: 35, maxPp: 35 }, ...],
  status: null,              // pas brûlée, pas endormie
  friendship: 70,
}
```

## Les objets

Les 45 objets (potions, capsules, pierres d'évolution, objets de terrain) sont dans [src/data/items.js](../../src/data/items.js). Chacun a une poche (`items`, `capsules`, `key` pour les objets importants), un prix et un effet choisi dans une liste fermée (`heal_hp`, `catch`, `evolve`…).

## Petit défi

Ouvre [docs/BESTIAIRE.md](../BESTIAIRE.md). Trouve une bestiole qui évolue avec une pierre, puis retrouve sa fiche dans [src/data/creatures.js](../../src/data/creatures.js) en cherchant son `id`. Calcule ses PV au niveau 20 avec un gène de 10 et sans entraînement.

## À retenir

- Une espèce est un modèle ; une bestiole est un individu créé à partir de ce modèle.
- Les statistiques viennent de la base de l'espèce, des gènes (talent) et de l'entraînement (travail).
- Les types fonctionnent comme pierre-feuille-ciseaux, avec un tableau de multiplicateurs.
- Les attaques s'apprennent par niveau, au plus 4 à la fois.
- On évolue par niveau, par objet ou par amitié.
