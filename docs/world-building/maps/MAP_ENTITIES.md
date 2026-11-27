# Entités des cartes

## Warps

`warps` relient une position à une autre carte :

```js
{ x: 4, y: 3, to: 'halte_bourg_sablon', toX: 4, toY: 7 }
```

Le joueur garde son orientation et fait un pas s'il le peut. Les cases de départ et d'arrivée doivent être praticables.

## PNJ

`npcs` accepte :

- `movement: 'static'`
- `movement: 'look'`
- `movement: 'wander'`
- `movement: 'path'`

`script` peut être le nom d'un script ou une liste de commandes. `showIf` affiche l'entité si le drapeau est posé ; `hideIf` l'affiche si le drapeau est absent.

## Dresseurs

`trainers` référence un dresseur de `src/data/trainers.js`. Le champ `sight` vaut de 1 à 5 cases. Une fois battu, le drapeau `trainer_<id>` est posé et le PNJ utilise son texte `after`.

## Panneaux, objets et déclencheurs

- `signs` affiche un identifiant de texte avec A.
- `items` décrit un objet visible et ramassé une fois via un drapeau.
- `hiddenItems` décrit un objet trouvé avec A face à la case.
- `triggers` décrit un rectangle déclenché en entrant dedans.
- `once: true` pose un drapeau et empêche une nouvelle activation.
