# 09. La musique et les sons

Ce que tu vas apprendre :

- pourquoi le jeu n'a aucun fichier de musique ;
- comment fonctionne un synthétiseur à 4 voix ;
- comment on écrit une partition avec des lettres ;
- comment chaque bestiole reçoit un cri unique, inventé par un programme.

## Aucun fichier son

Le jeu ne contient aucun fichier MP3 ou WAV. Toute la musique est **jouée en direct** par un petit synthétiseur, à partir de partitions écrites en texte. C'est comme avoir un orchestre de poche qui lit les partitions pendant que tu joues.

Toutes les mélodies ont été composées pour Bestiora Azur. Aucune n'est copiée d'un autre jeu : c'est une règle du projet.

Le son utilise une fonction des navigateurs appelée **Web Audio**. Pour des raisons de sécurité, les navigateurs interdisent de faire du bruit avant que l'utilisateur ait touché quelque chose : la musique démarre donc à la première touche ou au premier clic.

## Un orchestre de 4 musiciens

Le synthétiseur imite les consoles portables des années 90. Il a exactement 4 voix, comme 4 musiciens qui ne peuvent jouer qu'une note à la fois chacun :

| Voix | Instrument | Son | Rôle habituel |
| --- | --- | --- | --- |
| 1 | onde carrée | son « bip » franc | la mélodie |
| 2 | onde carrée | son « bip » franc | l'accompagnement, les arpèges |
| 3 | table d'onde | son plus doux, rond | la basse |
| 4 | bruit | souffle, « tchk » | la batterie |

L'onde carrée peut changer de « timbre » : plus fine (12 %) elle sonne nasillarde, plus large (50 %) elle sonne pleine. La voix 3 joue une forme d'onde dessinée avec 32 petits nombres ([src/audio/waves.js](../../src/audio/waves.js)). La voix 4 fabrique du bruit, du souffle aigu au grondement grave.

Le synthétiseur est dans [src/audio/synth.js](../../src/audio/synth.js).

## Écrire une partition en lettres

Les notes s'écrivent avec la notation anglaise :

| Anglais | C | D | E | F | G | A | B |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Français | do | ré | mi | fa | sol | la | si |

Le chiffre après la lettre est l'**octave** (plus il est grand, plus c'est aigu) : `C4` est le do du milieu du piano, `C5` le do au-dessus. Après les deux-points, la **durée** : `:4` une noire, `:8` une croche, `:2` une blanche.

Voici le début de la mélodie de la Route 1, dans [src/audio/tracks/route-1.js](../../src/audio/tracks/route-1.js) :

```js
export default {
  id: 'route_1',
  tempo: 124,          // 124 noires par minute
  channels: {
    1: `P50 V12 S-3
      C5 E5 G5 E5 C6:4 G5:4 | A5 G5 E5 C5 A4:2 | ...`,
    ...
  },
};
```

Lis-le ainsi :

- `P50` : onde carrée pleine ;
- `V12` : volume 12 (sur 15) ;
- `S-3` : chaque note s'éteint doucement, comme une corde pincée ;
- `C5 E5 G5 E5` : do, mi, sol, mi, en croches (la durée par défaut) ;
- `C6:4 G5:4` : do aigu, sol, en noires ;
- `|` : barre de mesure.

Do, mi, sol : c'est un accord joyeux de do majeur, joué note par note. Le commentaire du fichier dit d'ailleurs « C major, cheerful, bouncing notes » (do majeur, joyeux, notes rebondissantes).

### Les autres symboles

| Symbole | Effet |
| --- | --- |
| `R` | un silence |
| `X3`, `X12` | un coup de bruit (voix 4) : `X0` aigu comme un charleston, `X15` grave comme une grosse caisse |
| `[ … ]x3` | répéter 3 fois |
| `@` | point de retour : quand la musique est finie, elle reprend ici |
| `H-12` | glissando : la note glisse vers le grave pendant qu'elle joue |
| `O4`, `>`, `<` | changer d'octave |

La liste complète est dans [docs/audio/AUDIO_FORMAT.md](../audio/AUDIO_FORMAT.md).

Pour ne pas tout réécrire, [src/audio/tracks/patterns.js](../../src/audio/tracks/patterns.js) fournit des morceaux prêts à l'emploi : des basses (`bass`), des arpèges (`arp`), des rythmes de batterie (`DRUMS.march`).

### De la partition au son

1. Le **lecteur de partition** ([src/audio/track-parser.js](../../src/audio/track-parser.js)) transforme le texte en une liste de notes, chacune avec son moment de départ et sa durée. Il vérifie que chaque mesure est complète et que les 4 voix ont la même longueur.
2. Le **séquenceur** ([src/audio/sequencer.js](../../src/audio/sequencer.js)) programme les notes un dixième de seconde à l'avance, comme un chef d'orchestre qui donne le départ à chaque musicien juste à temps.
3. Le **synthétiseur** produit le son.

## Le thème du jeu

Le jeu a un petit motif musical, sa « signature » : ré, la, sol, si, la. On l'entend au début de l'écran titre, plus lentement dans le village de départ, et au début et à la fin de la musique de fin. Le vérificateur contrôle qu'il est bien présent dans ces morceaux.

## Quelle musique, quand ?

Il y a 20 morceaux, dans [src/audio/tracks/](../../src/audio/tracks/) : écran titre, village, routes, villes, Halte, grotte, forêt, Tour de la Mémoire, Syndicat Opale, combats (sauvage, dresseur, champion, rivale, final), victoires, fin.

Chaque carte choisit sa musique avec son champ `music`. Pour les combats, [src/data/music.js](../../src/data/music.js) décide :

```js
export const BATTLE_MUSIC = {
  trainer: 'battle_trainer',   // dresseur ordinaire
  villain: 'battle_trainer',   // sbire du Syndicat
  rival: 'battle_rival',       // la rivale
  leader: 'battle_leader',     // champion d'arène
};
```

Quand un combat commence, le jeu retient où en était la musique de la carte. Après le combat, elle reprend exactement à cet endroit.

## Les jingles et les effets sonores

Les **jingles** sont de petites fanfares : objet reçu, badge gagné, capture réussie, équipe soignée, montée de niveau, évolution. Pendant un jingle, la musique se met en pause, puis reprend.

Les **effets sonores** (une trentaine) sont dans [src/audio/sfx.js](../../src/audio/sfx.js), écrits avec la même notation :

```js
sfx('cursor',  { 1: 'P50 V9 S-1 C6:32' }),                    // le curseur bouge : un bip très court
sfx('bump',    { 1: 'P25 V12 S-2 C3:16', 4: 'V8 S-2 X12:16' }), // on se cogne : un son grave et un « boum »
sfx('jump',    { 1: 'P50 V11 S-1 H12 C5:8' }),                 // saut de corniche : une note qui monte
```

Un effet « emprunte » seulement les voix dont il a besoin. Pendant qu'il joue, la musique se tait sur ces voix-là et continue sur les autres.

## Les cris des bestioles

Chaque bestiole pousse un cri quand elle entre en combat. 150 cris enregistrés, ce serait beaucoup. Comme pour les dessins (chapitre [04](04-bestioles-dessin.md)), ils sont **inventés par un programme** : [src/audio/cries.js](../../src/audio/cries.js).

Un cri est fait de 2 ou 3 petits « bips » qui glissent vers le haut ou le bas, plus un coup de bruit. Trois règles le rendent logique :

| Caractéristique | Dépend de | Effet |
| --- | --- | --- |
| Hauteur | le poids de la bestiole | plus elle est lourde, plus elle crie grave |
| Durée | la somme de ses statistiques | une bestiole puissante crie plus longtemps (0,3 à 0,8 seconde) |
| Forme | sa lignée | une évolution crie comme sa forme de base, en un peu plus grave |

Le secret de la troisième règle : la graine du hasard est le nom de la **première forme** de la lignée. Korrigan, Korrigard et Korriroi ont donc la même « mélodie » de cri. Seul le coup de bruit dépend de l'espèce elle-même, pour que deux formes d'une lignée ne soient jamais identiques.

```js
const { root } = lineRoot(speciesId);          // la première forme de la lignée
const rng = createRng(hashString(root));       // même graine pour toute la famille
const pitch = 86 - Math.log2(weight + 1) * 4.5 - stage * 2;  // lourd = grave, évolué = un peu plus grave
```

## Les volumes

Dans les options, MUSIQUE et EFFETS vont de 0 à 10. À 0, le son est vraiment coupé. Quand la fenêtre du jeu perd le focus, le son se met en pause.

Le chef de tout ça est [src/audio/audio-system.js](../../src/audio/audio-system.js) : il démarre la musique, gère les jingles, les effets, les cris et les volumes.

## Petit défi

Écris une petite mélodie de 2 mesures avec la notation du jeu, par exemple `C5 D5 E5 C5 C5 D5 E5 C5 | E5 F5 G5:4 E5 F5 G5:4`. Reconnais-tu cette comptine ? Avec un adulte, tu peux la tester en remplaçant temporairement la voix 1 d'un jingle dans [src/audio/tracks/jingles.js](../../src/audio/tracks/jingles.js), puis en lançant `npm run validate` pour vérifier que la partition est correcte. Si les autres voix du jingle n'ont pas la même longueur que ta mélodie, le vérificateur te le dira, avec la longueur de chaque voix : à toi d'ajuster.

## À retenir

- La musique est jouée en direct par un synthétiseur, sans aucun fichier son.
- 4 voix : deux ondes carrées, une table d'onde, un bruit.
- Les partitions s'écrivent en lettres : note, octave, durée.
- Les effets sonores empruntent des voix ; les jingles mettent la musique en pause.
- Les cris sont inventés à partir du poids, de la puissance et de la lignée de chaque bestiole.
