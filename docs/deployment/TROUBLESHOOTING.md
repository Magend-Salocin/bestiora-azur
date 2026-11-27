# Dépannage du déploiement

## Problèmes courants

| Symptôme | Cause | Solution |
|---|---|---|
| Écran noir sur iPhone | `ResizeObserver.observe(...)` incompatible avec Safari | Repli sur `observe(canvas)` avec `devicePixelRatio` |
| Site en 404 | GitHub Pages désactivé | Settings > Pages > GitHub Actions, puis relancer le workflow |
| `EADDRINUSE` | Le port 8080 est occupé | Arrêter l'autre serveur ou utiliser `npm run web -- --port 8081` |
| Electron se comporte comme Node | `ELECTRON_RUN_AS_NODE` est défini | Retirer la variable avant de lancer Electron |
| RECHARGER échoue dans Electron | `will-navigate` bloque le rechargement | Recharger depuis `webContents.reload()` via IPC |
| Manifest ou worker bloqué | CSP trop restrictive | Ajouter `manifest-src 'self'; worker-src 'self'` |
| Pas de hors ligne avec `npm run web` | HTTP local non considéré comme HTTPS | Le hors ligne est réservé au site publié |
| Clé refusée | Identifiant lu dans Safari mais clé collée depuis l'icône, ou l'inverse | Tout faire depuis l'icône et copier-coller la clé |

## TOUT EFFACER

Double confirmation, puis `clearAllData()` :

- efface `localStorage` et `sessionStorage` ;
- efface les caches et désinscrit le service worker ;
- dans Electron, efface les sauvegardes, options et données de session ;
- redémarre le jeu.

## Transposer dans un autre jeu

1. Vérifier que le jeu peut tourner dans une page web. Les appels Electron doivent être optionnels.
2. Copier `src/access/`, `src/sw.js`, `src/ui/touch-controls.js`, `tools/access-key.js`, `tools/build-web.js`, `tools/pages-index.html`, `tools/web-server.js`, le workflow Pages et les styles nécessaires.
3. Adapter le texte signé, les dossiers construits, les clés de stockage et le préfixe du cache.
4. Démarrer avec `registerOfflineMode()` puis `requireAccessKey().then(boot)`.
5. Ajouter les balises iPhone, le manifeste et la CSP.
6. Ajouter `*.local.json`, `*.local.pem` et `_site/` au `.gitignore`.
7. Initialiser une nouvelle paire de clés propre au nouveau jeu.
8. Tester sur iPhone en réseau local, puis sur le site publié en clé et hors ligne.

## Dépôt public

- Ne publier aucun contenu d'autrui.
- Garder les documents privés hors du dépôt.
- Sauvegarder avant tout retrait historique avec `git filter-repo`.
- Activer une adresse e-mail masquée sur GitHub.
- Préciser projet personnel, non commercial et tous droits réservés.
