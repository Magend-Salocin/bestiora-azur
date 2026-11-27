# Conventions de code

- Noms en anglais pour le code (`createCreature`, `applyDamage`) ; textes du jeu en français.
- Fonctions courtes et nommées explicitement ; un module = une responsabilité.
- Pas de classes inutiles : objets simples + fonctions, classes seulement pour les scènes.
- Constantes en `UPPER_SNAKE_CASE` dans `src/engine/constants.js`.
- Pas de `console.log` laissé hors du module `debug`.
- Toute entité de données possède un `id` stable en `snake_case` ASCII.
- Le JavaScript utilise les ES modules natifs, sans framework ni bundler.
