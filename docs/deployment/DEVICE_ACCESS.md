# Clés d'accès liées aux appareils

Principe : l'organisateur signe l'identifiant de l'appareil avec une clé privée. Le jeu vérifie cette signature avec une clé publique. Sans la clé privée, personne ne peut fabriquer une clé valide.

## Fichiers

| Fichier | Rôle |
|---|---|
| `src/access/access-keys.js` | Identifiant et vérification ECDSA P-256 / SHA-256 |
| `src/access/access-gate.js` | Écran d'identifiant, clé et mémorisation |
| `src/data/access-public-key.js` | Clé publique publiée |
| `src/data/revoked-devices.js` | Identifiants révoqués publiés |
| `tools/access-key.js` | Commandes `init`, `new`, `list` et `revoke` |
| `access-private-key.local.pem` | Clé privée locale, jamais versionnée |
| `access-devices.local.json` | Liste locale des appareils et clés |

## Commandes

```powershell
npm run key -- init
npm run key -- new XXXX-XXXX "Prénom"
npm run key -- list
npm run key -- revoke "Prénom"
```

Après une révocation, publier le changement avec un commit puis un push. La révocation s'applique après mise à jour du cache hors ligne.

## Règles de l'écran

- Pas d'écran de clé dans Electron.
- Pas d'écran de clé sur HTTP local.
- La clé collée est nettoyée des espaces et retours à la ligne.
- La clé est sensible à la casse.

## Limites

- TOUT EFFACER ou effacer les données Safari change l'identifiant.
- Une nouvelle clé est alors nécessaire.
- Quelqu'un de déterminé peut retirer le contrôle en créant sa propre copie.
