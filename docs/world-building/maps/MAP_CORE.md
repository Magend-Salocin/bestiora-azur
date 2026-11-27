# Structure principale des cartes

Une carte est un module de `src/data/maps/` qui exporte un objet par défaut, enregistré dans `src/data/maps/index.js`. `MAPS` alimente le jeu ; `TEST_MAPS` contient les cartes dev chargées en mode debug.

Coordonnées en métatuiles 16 × 16. L'origine est en haut à gauche. L'écran affiche 10 × 9 métatuiles.

## Exemple

```js
export default {
  id: 'bourg_sablon',
  name: 'Bourg-Sablon',
  tileset: 'town',
  music: 'town_1',
  border: 'T',
  dark: false,
  league: false,
  legend: { '%': 'bridge_h' },
  layers: {
    ground: [
      'TTTTTTTTTTTTTT',
      'TT__________TT',
    ],
    collision: ['..............'],
  },
  structures: [{ type: 'halte', x: 3, y: 1, width: 4, door: 1 }],
  warps: [{ x: 4, y: 3, to: 'halte_bourg_sablon', toX: 4, toY: 7 }],
  connections: { north: 'route_2', south: 'route_1', east: null, west: null },
};
```

`npm run validate` vérifie toutes les cartes. `npm run map-preview -- <id>` exporte un aperçu dans `out/maps/<id>.png`.

## Couches et légende

`ground` est une liste de chaînes, une par ligne, toutes de même longueur. Chaque caractère est converti en id de métatuile par la légende du tileset, complétée par `legend`.

Une entrée de légende peut être un motif 2 × 2 :

```js
legend: {
  T: { pattern: [['tree_tl', 'tree_tr'], ['tree_bl', 'tree_br']] },
}
```

La tuile choisie dépend de la position dans la suite de caractères identiques.

| Tileset | Caractères |
|---|---|
| outdoor | `. , : s * T b o v < > # g ~ F S M = \|` |
| town | outdoor, plus `_` |
| indoor | `. , c r m # w t h B L P [ - ] K H U D` |
| cave | `. # U D ~ A i` |
| special | `. , l X f c ~ #` |

Les drapeaux bloquant, herbe, eau et corniche viennent des métatuiles (`assets/atlas/tiles.json`). `collision` sert aux exceptions.

## Structures

| type | Taille | Options |
|---|---|---|
| `house_a`, `house_b`, `house_c` | `width` × 3 | `width`, `door` |
| `halte`, `comptoir`, `arena`, `lab` | `width` × 3 | idem |
| `factory` | `width` × 3 | cheminée en 2e colonne |
| `tree` | 2 × 2 | - |
| `lighthouse` | 1 × 3 | porte en bas |
| `turbine` | 1 × 2 | - |
