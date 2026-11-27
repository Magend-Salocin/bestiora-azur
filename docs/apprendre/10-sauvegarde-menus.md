# 10. Sauvegarde, menus et commandes

Ce que tu vas apprendre :

- ce que le jeu doit retenir de ta partie ;
- comment la sauvegarde est protégée contre les accidents ;
- comment sont faits les menus et la boîte de dialogue ;
- comment le jeu comprend le clavier, la manette et l'écran tactile ;
- la différence entre la version ordinateur et la version navigateur.

## Le carnet du joueur : l'état du jeu

Tout ce qui change pendant ta partie est rangé dans un seul objet, l'**état du jeu**, créé par `createGameState` dans [src/state/game-state.js](../../src/state/game-state.js) :

```js
{
  player: { name: 'Elio', gender: 'boy' },   // ton nom
  rival: { name: 'Nora' },                   // le nom de la rivale
  party: [],                                 // ton équipe (6 au maximum)
  storage: {...},                            // les bestioles rangées dans les boîtes
  bag: {},                                   // ton sac : { potion: 3, capsule: 10, ... }
  money: 3000,                               // ton argent
  badges: [],                                // tes badges d'arène
  flags: {},                                 // tous les drapeaux (chapitre 07)
  bestiary: { seen: {}, caught: {} },        // bestioles vues et capturées
  position: { map, x, y, facing },           // où tu te trouves
  playTime: 0,                               // temps de jeu en secondes
  daycare: null,                             // la bestiole laissée à la pension
  ...
}
```

C'est le carnet de bord de ton aventure. Tous les autres fichiers du dossier [src/state/](../../src/state/) sont de petits outils pour le modifier proprement :

| Fichier | Rôle |
| --- | --- |
| `game-state.js` | créer l'état, gérer les drapeaux, le sac, l'argent, les badges, l'équipe |
| `storage.js` | le stockage : 12 boîtes de 30 bestioles, consultables dans les Haltes |
| `shop.js` | acheter et vendre dans les Comptoirs |
| `daycare.js` | la pension : la bestiole gagne de l'expérience pendant que tu marches |
| `trade.js` | les échanges avec certains habitants |
| `field-items.js` | utiliser un objet hors combat (potion, pierre, répulsif…) |
| `options.js` | les options : volumes, palette, vitesse du texte, touches |

Ces fichiers ne dessinent rien : ils sont « purs », donc faciles à tester.

## La sauvegarde

### Quoi et où

Sauvegarder, c'est écrire l'état du jeu dans un fichier, au format **JSON** (une façon standard d'écrire des données en texte). Le fichier s'appelle `save.json`. Sur Windows, il est dans `%APPDATA%\Bestiora Azur\`.

Le fichier commence par un numéro de **version** :

```js
{ "version": 2, "savedAt": "2026-11-20T10:00:00.000Z", "player": {...}, "party": [...], ... }
```

Si un jour le format change, le jeu saura transformer une vieille sauvegarde en nouvelle, étape par étape. Ces transformations s'appellent des **migrations** ([src/save/save-format.js](../../src/save/save-format.js)).

### Protégée contre les accidents

Que se passe-t-il si l'ordinateur s'éteint pile pendant la sauvegarde ? Le fichier pourrait être à moitié écrit, donc illisible. Pour éviter ça, le jeu fait comme un élève prudent qui recopie son devoir au propre :

1. il écrit d'abord la nouvelle sauvegarde dans un **brouillon** (un fichier temporaire) ;
2. il range l'ancienne sauvegarde en **copie de secours** (`save.bak.json`) ;
3. quand le brouillon est complet, il le renomme en `save.json`. Renommer est instantané : ça ne peut pas être interrompu à moitié.

Au chargement, si `save.json` est illisible, le jeu prend la copie de secours et te prévient sur l'écran titre. Ce mécanisme est dans [electron/save-store.js](../../electron/save-store.js).

On ne peut pas sauvegarder dans la Ligue, une fois la porte franchie : il faut gagner les 5 combats d'affilée.

### Deux mondes qui se parlent

Pour des raisons de sécurité, le jeu (qui tourne comme une page web) n'a pas le droit d'écrire directement sur le disque. Il passe par un messager, [electron/preload.js](../../electron/preload.js), qui transmet à la partie « programme » d'Electron ([electron/main.js](../../electron/main.js)) :

```text
 le jeu (page web)                    le programme Electron
 ─────────────────                    ─────────────────────
 window.bestiora.save(json)  ──────▶  écrit save.json sur le disque
 window.bestiora.load()      ──────▶  lit save.json et save.bak.json
```

Dans un navigateur, sans Electron, la sauvegarde est rangée dans la mémoire du navigateur (`localStorage`).

## Les menus

Les menus sont dans [src/ui/](../../src/ui/). Chaque écran est son propre fichier :

| Fichier | Écran |
| --- | --- |
| `title-scene.js` | l'écran titre : CONTINUER, NOUVELLE PARTIE, OPTIONS, TOUT EFFACER |
| `intro-scene.js` | l'introduction de la professeure, le choix du nom |
| `name-entry.js` | le clavier à l'écran pour écrire un nom |
| `starter-choice.js` | le choix de la première bestiole |
| `start-menu.js` | le menu START : BESTIAIRE, BESTIOLES, SAC, ton nom, SAUVER, OPTIONS |
| `party-screen.js`, `party-menu.js` | ton équipe |
| `summary-screen.js` | la fiche détaillée d'une bestiole |
| `bag-menu.js` | le sac |
| `bestiary-screen.js` | le Bestiaire, avec la carte de la région |
| `storage-menu.js` | le stockage des Haltes |
| `shop-menu.js` | la boutique des Comptoirs |
| `trainer-card.js` | ta carte de dresseur, avec tes badges |
| `options-screen.js` | les options |
| `evolution-scene.js` | l'animation d'évolution |
| `ending-screens.js` | le Panthéon, les crédits et le diplôme |
| `error-scene.js` | l'écran affiché si le jeu plante |

### Des pièces réutilisables

Les menus partagent des pièces communes, comme des briques de construction :

- [src/ui/window-frame.js](../../src/ui/window-frame.js) dessine le cadre d'une fenêtre ;
- [src/ui/components/list-menu.js](../../src/ui/components/list-menu.js) est une liste où on déplace une flèche avec les touches ;
- [src/ui/dialog-box.js](../../src/ui/dialog-box.js) est la boîte de dialogue du bas de l'écran ;
- [src/ui/text-layout.js](../../src/ui/text-layout.js) coupe un texte trop long en lignes, aux espaces.

### La boîte de dialogue

La boîte de dialogue affiche le texte lettre par lettre, comme une machine à écrire. Quand la boîte est pleine, une petite flèche clignote : appuie sur A pour continuer. Le signe `\f` dans les textes force une nouvelle page (chapitre [07](07-histoire-scripts.md)). L'option « texte instantané » affiche tout d'un coup.

Comme le dialogue est une scène « transparente » posée sur la carte (chapitre [01](01-vue-ensemble.md)), on continue de voir le monde derrière.

## Le clavier, la manette et l'écran tactile

Le jeu ne pense pas en « touches du clavier ». Il pense en **boutons de console** : haut, bas, gauche, droite, A, B, START, SELECT. Le fichier [src/engine/input.js](../../src/engine/input.js) traduit :

| Bouton | Clavier | Manette |
| --- | --- | --- |
| Directions | flèches | croix ou stick gauche |
| A (valider) | X | bouton du bas |
| B (annuler, courir) | Z (ou W sur un clavier AZERTY) | bouton de droite |
| START (menu) | Entrée | Start |
| SELECT | Maj droite | Select |

Avantage : le reste du jeu demande simplement « est-ce que A vient d'être appuyé ? » (`input.justPressed('a')`), sans se soucier de ce que tu utilises. Les touches se changent dans les options.

Une astuce : sur un clavier AZERTY, la touche marquée Z est à l'endroit où un clavier QWERTY a le W. Le jeu accepte donc les deux, pour que « Z = annuler » marche partout.

Quand tu restes appuyé sur une flèche dans un menu, le curseur attend 0,3 seconde, puis avance tout seul toutes les 0,08 seconde.

### Les boutons tactiles

Sur un téléphone ou une tablette, [src/ui/touch-controls.js](../../src/ui/touch-controls.js) affiche une croix et des boutons A, B, START, SELECT autour de l'écran. Ils « appuient » sur les mêmes boutons virtuels que le clavier. L'option TACTILE permet de les afficher toujours, jamais, ou seulement sur écran tactile (AUTO).

## Ordinateur ou navigateur

| | Version ordinateur | Version navigateur |
| --- | --- | --- |
| Comment | programme installé, grâce à Electron | page web, par exemple sur iPhone |
| Sauvegarde | fichiers sur le disque, avec copie de secours | mémoire du navigateur |
| Hors ligne | toujours | après une première ouverture en ligne |
| Clé d'activation | non | oui, pour la version en ligne |

La version en ligne est gardée sur l'appareil par un petit programme, le **service worker** ([src/sw.js](../../src/sw.js)), qui permet de jouer sans réseau. Elle demande une clé d'activation liée à l'appareil, pour la réserver à quelques testeurs ([src/access/](../../src/access/)). Les détails sont dans [docs/deploiement/WEB_DEPLOIEMENT.md](../deploiement/WEB_DEPLOIEMENT.md) et le [README](../../README.md) principal.

## Les erreurs

Si le jeu rencontre une erreur qu'il ne sait pas gérer, il ne se fige pas. Il écrit l'erreur dans un journal (un fichier par jour dans le dossier `logs/`) et affiche un écran d'erreur avec deux choix : RECHARGER ou QUITTER. Ta dernière sauvegarde est intacte.

## À retenir

- Toute ta partie tient dans un seul objet, l'état du jeu.
- La sauvegarde passe par un brouillon puis un renommage, avec une copie de secours.
- Le jeu ne peut pas écrire sur le disque lui-même : il demande à Electron.
- Les menus sont des scènes faites de pièces communes (cadre, liste, boîte de dialogue).
- Le jeu pense en boutons de console, traduits depuis le clavier, la manette ou le tactile.
