# Déploiement web : vue d'ensemble

Bestiora Azur peut être joué sur PC, dans un navigateur mobile ou hors ligne sur iPhone. La version web reste réservée aux testeurs munis d'une clé liée à leur appareil.

```text
PC organisateur                         GitHub                    iPhone testeur
----------------                         ------                    --------------
npm run key -- init
  clé privée -> fichier local
  clé publique -> src/data/access-public-key.js
git push ------------------------------> Actions Pages
                                          build-web -> _site/
                                          GitHub Pages ------------> Safari / écran d'accueil

    identifiant <- envoyé par message <- écran « Test en cours »
npm run key -- new XXXX-XXXX "Prénom"
  clé envoyée --------------------------------------------------------> clé collée dans le jeu
```

## Utilisation au quotidien

| Besoin | Action |
|---|---|
| Jouer sur PC | `npm start` |
| Tester sur iPhone sur le même Wi-Fi | `npm run web`, puis ouvrir l'adresse affichée dans Safari |
| Publier une nouvelle version | `git push` sur `main` |
| Donner l'accès | `npm run key -- new XXXX-XXXX "Prénom"` |
| Revoir les clés | `npm run key -- list` |
| Retirer l'accès | `npm run key -- revoke "Prénom"`, puis commit et push |
| Repartir de zéro sur un appareil | Écran titre > TOUT EFFACER |

Installer sur iPhone : Safari > adresse du site > Partager > « Sur l'écran d'accueil ». Demander l'identifiant depuis l'icône, pas depuis Safari : les données sont séparées.
