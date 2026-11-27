# Mode debug et erreurs

## Menu debug

Le mode dev exige `--dev` et un jeu non empaqueté (`!app.isPackaged`). Le jeu installé n'a ni DevTools ni menu debug.

Options disponibles :

- `--newgame` : écran titre au lieu de la carte de test.
- `--simulate-save-crash` : tue le processus pendant la sauvegarde.
- `--capture=<dossier>` : capture automatique.
- `--perf` : mesure des performances.

`F1` permet la téléportation, l'ajout de bestiole, le mode marche à travers les murs, la désactivation des rencontres, le niveau de l'équipe et le réglage des drapeaux.

## Gestion des erreurs

Toute exception non rattrapée est écrite dans `userData/logs/AAAA-MM-JJ.log` puis remplacée par l'écran d'erreur `src/ui/error-scene.js`.

- RECHARGER : relance sur l'écran titre.
- CONTINUER : reprend la dernière sauvegarde.
- QUITTER : ferme la fenêtre.
