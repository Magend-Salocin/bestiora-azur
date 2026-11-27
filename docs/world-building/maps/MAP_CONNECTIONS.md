# Connexions entre cartes

`connections` relie des cartes extérieures sans écran de transition. La carte voisine est visible en bordure et le défilement est continu.

```js
connections: {
  north: 'route_2',
  south: 'route_1',
  east: null,
  west: null,
}
```

## Règles

- Toute connexion doit être réciproque : `a.south = 'b'` impose `b.north = 'a'`.
- Les bords reliés doivent avoir la même taille.
- Les passages sont limités avec des arbres ou des falaises.
- Le nord-sud utilise la même largeur.
- L'est-ouest utilise la même hauteur.
