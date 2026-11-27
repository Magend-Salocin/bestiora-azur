# Formats techniques

## Sprite source

```js
export const NPC_GIRL = {
  width: 16,
  height: 16,
  frames: {
    down_0: [
      '.....3333.......',
      // 16 lignes de 16 caractères : '0'-'3' = index palette, '.' = transparent
    ],
  },
};
```

## Carte

```js
export default {
  id: 'bourg_sablon',
  name: 'Bourg-Sablon',
  width: 20,
  height: 18,
  tileset: 'town',
  music: 'town_1',
  layers: { ground: [], collision: [] },
  encounters: null,
  warps: [{ x, y, to: 'halte_bourg_sablon', toX, toY }],
  npcs: [{ id, sprite, x, y, facing, movement: 'static', script }],
  trainers: [{ id, sprite, x, y, facing, sight, trainer: 'gamin_leo' }],
  signs: [{ x, y, text: 'sign_bourg_sablon' }],
  items: [{ x, y, item: 'potion', flag: 'item_bourg_sablon_1' }],
  triggers: [{ x, y, w, h, script, once: true }],
  connections: { north: 'route_2', south: null, east: null, west: null },
};
```

## Script d'événement

Liste de commandes interprétée par `src/overworld/script-runner.js` :

```js
[
  { cmd: 'say', text: 'prof_intro_1' },
  { cmd: 'move', actor: 'prof', path: ['up', 'up'] },
  { cmd: 'if_flag', flag: 'has_starter', then: [], else: [] },
  { cmd: 'battle', trainer: 'rival_1' },
  { cmd: 'give_item', item: 'machette' },
  { cmd: 'set_flag', flag: 'route_5_machette' },
]
```
