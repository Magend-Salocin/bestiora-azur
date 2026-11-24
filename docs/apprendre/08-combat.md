# 08. Le combat

Ce que tu vas apprendre :

- comment un combat est séparé en deux : l'arbitre (les règles) et le spectacle (l'écran) ;
- comment se déroule un tour ;
- comment on calcule les dégâts d'une attaque ;
- comment marchent les altérations (brûlure, sommeil…), l'intelligence des adversaires et la capture ;
- comment on gagne de l'expérience.

## L'arbitre et le spectacle

Un combat est fait de deux parties qui ne se mélangent jamais :

| Partie | Rôle | Dossier |
| --- | --- | --- |
| L'**arbitre** (la logique) | applique les règles, calcule tout, décide qui gagne | [src/battle/logic/](../../src/battle/logic/) |
| Le **spectacle** (l'interface) | montre les bestioles, les barres de vie, les animations, les textes | [src/battle/ui/](../../src/battle/ui/) |

L'arbitre ne dessine rien. À chaque tour, il reçoit l'état du combat et les choix des deux camps, et il rend :

1. le **nouvel état** du combat ;
2. une liste d'**événements**, dans l'ordre où ils se sont produits.

Par exemple, pour un tour où ton Korrigan attaque en premier :

```js
[
  { type: 'move_used', side: 0, move: 'brindille' },     // Korrigan utilise Brindille !
  { type: 'damage', side: 1, amount: 12, ... },          // l'adversaire perd 12 PV
  { type: 'effectiveness', value: 2 },                   // C'est super efficace !
  { type: 'move_used', side: 1, move: 'egratignure' },   // l'adversaire riposte
  { type: 'damage', side: 0, amount: 5, ... },
]
```

Le spectacle ([src/battle/ui/event-player.js](../../src/battle/ui/event-player.js)) lit ensuite ces événements un par un : il écrit la phrase, joue l'animation, fait descendre la barre de vie, joue le son.

C'est comme un match de foot : l'arbitre note tout sur sa feuille de match, puis le commentateur raconte le match aux spectateurs. Grâce à cette séparation, on peut faire jouer des milliers de combats à l'arbitre seul, très vite, pour vérifier les règles et l'équilibre du jeu (chapitre [11](11-outils-et-tests.md)).

`side: 0` est toujours ton camp, `side: 1` celui de l'adversaire.

## Le déroulement d'un tour

Le cœur de l'arbitre est la fonction `resolveTurn` de [src/battle/logic/engine.js](../../src/battle/logic/engine.js). Un tour se déroule ainsi :

```text
1. Les deux camps choisissent : attaque, changement de bestiole, objet, ou fuite.
2. Si quelqu'un fuit : on tente la fuite (impossible contre un dresseur).
3. On range les actions dans l'ordre (voir ci-dessous).
4. Chaque action est jouée. Après chacune, on vérifie si une bestiole est K.O.
5. Fin du tour : dégâts de brûlure et de poison, effets qui s'épuisent.
6. Une bestiole K.O. est remplacée par la suivante de l'équipe.
7. Si un camp n'a plus de bestiole debout, le combat est fini.
```

### Qui joue en premier ?

L'ordre est décidé par `orderActions`, selon ces règles, dans l'ordre :

1. Changer de bestiole ou utiliser un objet passe **toujours** avant une attaque.
2. Certaines attaques ont une **priorité** : Élan Vif (priorité 1) frappe avant les attaques normales (priorité 0), même si la bestiole est lente.
3. Sinon, la bestiole la plus **rapide** (statistique Vitesse) joue en premier. Une bestiole paralysée voit sa vitesse divisée par 4.
4. En cas d'égalité parfaite : tirage au sort.

## Le calcul des dégâts

C'est la formule la plus importante du jeu. Elle se trouve dans [src/battle/logic/damage.js](../../src/battle/logic/damage.js).

### Étape 1 : les dégâts de base

```text
base = ((2 × niveau ÷ 5 + 2) × puissance × Attaque ÷ Défense) ÷ 50 + 2
```

- Une attaque **physique** compare l'Attaque de l'attaquant à la Défense de la cible.
- Une attaque **spéciale** compare l'Attaque Spéciale à la Défense Spéciale.

### Étape 2 : les bonus et malus

On multiplie ensuite la base par plusieurs nombres :

| Multiplicateur | Valeur | Quand |
| --- | --- | --- |
| Même type (STAB) | × 1,5 | l'attaque a le même type que la bestiole qui l'utilise |
| Efficacité | × 0, × 0,25, × 0,5, × 1, × 2 ou × 4 | selon le tableau des types (chapitre [03](03-bestioles-fiche.md)) |
| Coup critique | × 1,5 | 1 chance sur 16 (1 sur 8 pour certaines attaques) |
| Brûlure | × 0,5 | l'attaquant est brûlé et l'attaque est physique |
| Protection | × 0,5 | la cible a posé un écran protecteur |
| Aléa | entre × 0,85 et × 1 | toujours, pour que deux coups ne soient pas identiques |

STAB est l'abréviation anglaise de « bonus d'attaque du même type ». Une bestiole Feu frappe plus fort avec une attaque Feu.

### Un exemple

Une bestiole Flore de niveau 10, avec 20 en Attaque, utilise une attaque Flore physique de puissance 40 contre une bestiole Eau qui a 15 en Défense.

```text
2 × 10 ÷ 5 + 2         = 6
6 × 40 × 20 ÷ 15       = 320
320 ÷ 50               = 6      (arrondi vers le bas)
6 + 2                  = 8      dégâts de base

8 × 1,5 (même type)    = 12
12 × 2 (Flore bat Eau) = 24
24 × aléa              = entre 20 et 24 PV
```

Sans le bonus de type et sans l'efficacité, l'attaque n'aurait fait que 6 à 8 PV. Bien choisir son attaque compte beaucoup.

### Les paliers de statistiques

Certaines attaques ne font pas de dégâts mais changent les statistiques pendant le combat : Mine Sévère baisse l'Attaque de l'adversaire, Bombe Torse monte l'Attaque et la Défense. Chaque statistique a un palier de −6 à +6. Le palier +1 multiplie la statistique par 1,5, le palier +2 par 2, le palier −1 la multiplie par 2/3. Changer de bestiole remet tous les paliers à zéro.

### Toucher ou rater

La précision d'une attaque (sur 100) est modifiée par les paliers de précision de l'attaquant et d'esquive de la cible. Certaines attaques ne ratent jamais (`accuracy: null`). C'est la fonction `rollHit`.

## Les effets des attaques

Chaque attaque a un **effet** : faire des dégâts simples, brûler, endormir, frapper plusieurs fois, soigner, protéger… Les effets sont rangés par famille dans [src/battle/logic/effects/](../../src/battle/logic/effects/) :

| Fichier | Famille d'effets |
| --- | --- |
| `damage.js` | dégâts spéciaux : coups multiples, dégâts fixes, attaque en deux tours, recharge |
| `stats.js` | monter ou baisser les statistiques |
| `status.js` | provoquer une altération |
| `support.js` | soin, protection, écrans, sommeil réparateur |

La liste des effets autorisés est dans [src/data/move-effects.js](../../src/data/move-effects.js). Le vérificateur refuse une attaque qui utiliserait un effet inconnu.

## Les altérations

Une bestiole peut être affectée par une **altération majeure**, une seule à la fois, qui reste après le combat :

| Altération | Code | Effet | Immunisés |
| --- | --- | --- | --- |
| Brûlure | `brl` | perd 1/8 de ses PV à chaque tour, attaque physique divisée par 2 | Feu |
| Poison | `psn` | perd 1/8 de ses PV à chaque tour | Toxique, Métal |
| Poison grave | `psn` | perd de plus en plus de PV à chaque tour | Toxique, Métal |
| Paralysie | `par` | 1 chance sur 4 de ne pas pouvoir agir, vitesse divisée par 4 | Foudre |
| Sommeil | `som` | ne peut pas agir pendant 1 à 3 tours | |
| Gel | `gel` | ne peut pas agir ; 1 chance sur 5 de dégeler à chaque tour | Givre |

Et des **effets passagers**, qui disparaissent quand la bestiole quitte le combat : la Confusion (1 chance sur 3 de se frapper soi-même), la Peur (perd son tour), le Vampirisme, le Piège (impossible de changer de bestiole).

Le code est dans [src/battle/logic/status.js](../../src/battle/logic/status.js).

## L'intelligence des adversaires

L'adversaire choisit ses actions grâce à [src/battle/logic/ai.js](../../src/battle/logic/ai.js). Il y a trois niveaux d'intelligence :

| Niveau | Qui | Comment il choisit |
| --- | --- | --- |
| `wild` | bestioles sauvages | une attaque au hasard |
| `basic` | la plupart des dresseurs | préfère les attaques super efficaces et les altérations utiles |
| `smart` | champions, Gardiens, Corvin | calcule les dégâts de chaque attaque, change de bestiole si elle est en mauvaise posture, utilise jusqu'à 2 potions sous 25 % de PV |

L'IA « maligne » estime les dégâts de chaque attaque avec la même formule que l'arbitre, en prenant un aléa moyen et sans coup critique, puis choisit la plus forte.

## La capture

Lancer une capsule sur une bestiole sauvage déclenche un calcul en deux étapes ([src/battle/logic/capture.js](../../src/battle/logic/capture.js)).

**Étape 1 : la valeur de capture `a`.** Elle est plus grande quand :

- la bestiole a peu de PV restants ;
- son espèce est facile à capturer (`catchRate` élevé dans sa fiche) ;
- la capsule est meilleure (Capsule × 1, Super Capsule × 1,5, Hyper Capsule × 2) ;
- elle est endormie ou gelée (× 2), paralysée, empoisonnée ou brûlée (× 1,5).

```text
a = (3 × PVmax − 2 × PV) × tauxEspèce × bonusCapsule ÷ (3 × PVmax) × bonusStatut
```

**Étape 2 : les 4 secousses.** La capsule tremble. Le jeu fait 4 tirages. Il faut les réussir tous les 4 pour capturer la bestiole. Plus `a` est grand, plus chaque tirage a de chances de réussir. Si `a` atteint 255, la capture est assurée. La Capsule Maîtresse, unique dans tout le jeu, capture à coup sûr.

Quelques chances réelles, calculées avec la formule du jeu et une Capsule normale :

| Bestiole | PV restants | Statut | Chance de capture |
| --- | --- | --- | --- |
| Très facile (taux 255, comme le Farfadet) | tous | aucun | 44 % |
| Très facile | la moitié | aucun | 74 % |
| Très facile | tous | endormie | 74 % |
| Difficile (taux 45, comme une 3e évolution) | tous | aucun | 12 % |
| Difficile | 10 % | aucun | 26 % |
| Difficile | 10 % | endormie | 43 % |
| Légendaire (taux 3) | 10 % | endormie | 6 % |

Conseil de dresseur : affaiblis la bestiole et endors-la avant de lancer ta capsule.

Le nombre de secousses que tu vois à l'écran (0 à 3) correspond au nombre de tirages réussis avant l'échec.

## L'expérience et les niveaux

Quand une bestiole adverse est K.O., chaque bestiole de ton équipe qui a participé au combat gagne :

- de l'**expérience**, partagée entre les participants, avec 50 % de bonus contre un dresseur ;
- des **points d'entraînement** dans une statistique.

Si l'expérience suffit, la bestiole monte de niveau : ses statistiques sont recalculées, son amitié augmente de 3, et elle apprend peut-être une nouvelle attaque. Si elle connaît déjà 4 attaques, le jeu te demande laquelle oublier.

À la fin du combat, si une bestiole a atteint son niveau d'évolution (ou assez d'amitié), la scène d'évolution se lance. Tu peux l'annuler avec B, sauf pour une évolution par pierre.

Le code est dans [src/battle/logic/experience.js](../../src/battle/logic/experience.js).

## Gagner ou perdre

| Résultat | Conséquence |
| --- | --- |
| Victoire contre un dresseur | tu gagnes de l'argent (niveau max de son équipe × base de sa classe), il ne combat plus |
| Victoire contre une bestiole sauvage | expérience seulement |
| Capture | la bestiole rejoint ton équipe, ou le stockage si l'équipe a déjà 6 bestioles |
| Fuite | possible seulement contre une bestiole sauvage (pas contre un légendaire) |
| Défaite | tu perds la moitié de ton argent et tu te réveilles à la dernière Halte, équipe soignée |

## Le spectacle

L'interface de combat est dans [src/battle/ui/](../../src/battle/ui/) :

| Fichier | Rôle |
| --- | --- |
| `battle-setup.js` | branche le combat sur l'exploration : crée l'équipe adverse, lance la transition, puis les évolutions |
| `battle-scene.js` | la scène de combat : menus COMBAT / SAC / ÉQUIPE / FUITE, choix des attaques |
| `battle-hud.js` | les barres de vie, les noms, les niveaux |
| `event-player.js` | joue les événements de l'arbitre un par un |
| `move-animations.js` | les animations d'attaque, une par type (flammes, gouttes, éclairs…) |
| `bag-screen.js` | le sac pendant le combat |

Les textes de combat (« C'est super efficace ! ») sont dans [src/data/texts/battle-fr.js](../../src/data/texts/battle-fr.js).

L'option « réduction des flashs » remplace les clignotements de combat par un léger décalage, pour les joueurs sensibles aux lumières qui clignotent.

## Petit défi

Avec la formule de l'exemple, calcule les dégâts de base d'une bestiole de niveau 20, avec 40 en Attaque, qui utilise une attaque de puissance 80 sur une cible qui a 30 en Défense. Puis ajoute le bonus de type (× 1,5) et l'efficacité (× 2).

(Réponse : (2 × 20 ÷ 5 + 2) = 10 ; 10 × 80 × 40 ÷ 30 = 1 066 ; 1 066 ÷ 50 = 21 ; 21 + 2 = 23 ; 23 × 1,5 × 2 = 69 PV, avant l'aléa.)

## À retenir

- L'arbitre calcule, le spectacle raconte ; ils communiquent par une liste d'événements.
- Ordre du tour : changements et objets, puis priorité des attaques, puis vitesse.
- Dégâts = base × même type × efficacité × critique × aléa.
- Une seule altération majeure à la fois ; certains types y sont immunisés.
- Capture : peu de PV, une bonne capsule et le sommeil augmentent les chances.
- L'expérience fait monter de niveau, apprendre des attaques et évoluer.
