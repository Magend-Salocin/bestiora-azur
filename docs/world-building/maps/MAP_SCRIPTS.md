# Scripts de carte

Les scripts sont des listes de commandes interprétées par `src/overworld/script-runner.js`.

```js
[
  { cmd: 'say', text: 'prof_intro_1' },
  { cmd: 'move', actor: 'prof', path: ['up', 'up'] },
  { cmd: 'if_flag', flag: 'has_starter', then: [], else: [] },
  { cmd: 'battle', trainer: 'rival_1' },
]
```

Les textes utilisent des identifiants de `src/data/texts/`, les variables `{PLAYER}`, `{RIVAL}`, `{CREATURE}`, `{ITEM}`, `{NUMBER}` et `\f` pour changer de page.

## Commandes principales

| Commande | Champs |
|---|---|
| `say` | `text` |
| `ask` | `text`, `yes`, `no` |
| `move` | `actor`, `path`, `async` |
| `wait_moves` | attend les `move` asynchrones |
| `face` | `actor`, `direction` |
| `wait` | `seconds` |
| `set_flag`, `clear_flag` | `flag` |
| `if_flag`, `if_item`, `if_badge` | condition, `then`, `else` |
| `give_item`, `take_item` | `item`, `count`, `silent` |
| `give_creature` | `creature`, `level` |
| `give_money`, `give_badge` | `amount` / `badge` |
| `heal_party` | - |
| `battle` | `trainer`, `onLose` |
| `wild_battle` | `creature`, `level` |
| `warp` | `map`, `x`, `y`, `facing` |
| `show_actor`, `hide_actor` | `actor` |
| `play_music`, `play_sfx` | `track` / `sfx` |
| `fade` | `direction`, `color` |
| `shake_screen` | `seconds` |
| `open_menu` | `menu` |
| `set_rival_name`, `choose_starter` | - |
| `if_daily`, `set_daily` | `key`, `then`, `else` |
| `autosave` | sauvegarde la partie |
| `end` | arrête le script |

Une défaite en `blackout` soigne l'équipe et ramène à la dernière Halte.
