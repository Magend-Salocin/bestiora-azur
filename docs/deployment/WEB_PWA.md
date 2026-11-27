# Hébergement web et PWA

## Serveur local

`tools/web-server.js` sert `src/`, `assets/` et l'icône sur toutes les interfaces réseau. Il refuse les chemins hors de ces dossiers.

Utilisation : `npm run web`, puis ouvrir l'adresse locale affichée dans Safari.

Limites :

- HTTP local, sans clé d'activation ;
- pas de mode hors ligne ;
- le PC doit rester allumé.

## Publication GitHub Pages

| Élément | Rôle |
|---|---|
| `.github/workflows/pages.yml` | Déploie à chaque push sur `main` |
| `tools/build-web.js` | Construit `_site/`, prépare les fichiers hors ligne |
| `tools/pages-index.html` | Page racine et redirection |

Réglage unique : GitHub > Settings > Pages > Source : **GitHub Actions**.

## Contrôles tactiles

| Fichier | Rôle |
|---|---|
| `src/ui/touch-controls.js` | Croix, A, B, START et SELECT |
| `src/engine/input.js` | Branche les boutons virtuels sur le système d'entrée |
| `src/styles.css` | Présentation portrait, paysage et marges iPhone |
| `src/index.html` | `viewport`, icône iPhone et balises PWA |

L'option TACTILE propose AUTO, OUI ou NON.

## Mode hors ligne

| Élément | Rôle |
|---|---|
| `src/sw.js` | Cache les fichiers et sert le cache d'abord |
| `src/precache-manifest.js` | Liste et empreinte générées par `build-web.js` |
| `src/main.js` | Enregistre le service worker en contexte sécurisé |

Une nouvelle version est téléchargée au lancement suivant avec réseau, puis utilisée au lancement suivant. Safari refuse le service worker en HTTP hors `localhost`.
