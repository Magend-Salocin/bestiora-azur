# Statut des musiques régionales

État au 27 novembre 2026. Ce document suit le chantier décrit dans
[`prompts-v2/prompt-4-musiques.md`](../../prompts/phase-2/prompt-4-musiques.md).

## Résumé

- 7 nouvelles pistes sont composées et branchées : `town_port_ondine`,
  `town_ombrecourt`, `town_givremont`, `route_ligue`, `sea_corse`, `gym` et
  `house`.
- 17 pistes prévues restent à composer.
- La retouche régionale de `forest` reste à faire.
- Les données audio et les tests passent : `npm run validate` et `npm test`
  (259 tests, aucun échec).
- Le dernier commit audio vérifié est `df34c31`, présent sur `origin/main`.

## Prochaines étapes

Le prompt demande de présenter chaque lot et d'attendre l'accord avant de le
commencer. Après chaque lot : brancher les pistes, lancer validation et tests,
puis fournir la liste d'écoute pour le juke-box F2.

| Ordre | Lot | Travail restant |
|---|---|---|
| 1 | Lot 0 — référence | Créer `docs/world-building/audio/MUSIQUES_V2.md` : une ligne par piste avec cartes, région, forme, mesure/tempo, mode, timbres et statut. Aucun changement de code. |
| 2 | Lot 2 — début et Bretagne | Créer `town_sablon` (Bourg-Sablon), `route_bretagne` (Routes 2 et 3), `route_littoral` (Routes 4 et 5) ; retoucher `forest` pour le Bois Murmurant. `town_port_ondine` est déjà fait. |
| 3 | Lot 3 — Nord-Est, Normandie, Bourgogne | Créer `town_vireval`, `factory`, `town_cendrelune`, `town_haute_bise` et `route_bise`. |
| 4 | Lot 4 — Marais, Île-de-France, Corse | Créer `marsh`, `catacombs` et `sunken_library`. `town_ombrecourt` et `sea_corse` sont déjà faits. |
| 5 | Lot 5 — Occitanie, Alpes, Provence | Créer `town_forge`, `volcano`, `ice_cave` et `league`. `town_givremont` et `route_ligue` sont déjà faits. |
| 6 | Lot 6 — combats | Créer `battle_legendary` et `battle_gardien`, puis les brancher aux combats concernés. |
| 7 | Lot 7 — nettoyage | Retirer les pistes devenues inutiles ; mettre à jour le nombre de pistes dans `docs/design/GAME_DESIGN.md` et `docs/world-building/audio/AUDIO_FORMAT.md` si nécessaire. |

Le lot 1 (`gym`, `house`) est déjà réalisé.

## Affectations à compléter

- `route_ligue` est sur le Col des Échos ; la Grotte des Échos utilise encore
  `cave`.
- `league` doit remplacer les thèmes génériques dans la Citadelle d'Azur, les
  salles de la Ligue et le Pic d'Azur.
- Les arènes Feu, Arcane et Ombre gardent respectivement `opal_syndicate` et
  `memory_tower`, alors que la décision du prompt prévoit `gym` dans toutes les
  arènes.
- Les combats légendaires utilisent actuellement `battle_final` ; les Gardiens
  utilisent `battle_leader`.
- 28 cartes référencent `house`, contre les 26 annoncées dans le prompt.
- La piste `forest` est aussi utilisée par le Marais Gris. Après la création de
  `marsh`, vérifier que la retouche bretonne de `forest` ne change pas
  involontairement l'identité musicale du marais.

## Pistes existantes prévues pour remplacement

| Piste actuelle | Utilisation à réviser |
|---|---|
| `town_1` | Bourg-Sablon, Vireval, Citadelle d'Azur et cartes de test |
| `town_2` | Cendrelune, Haute-Bise, Forge-Ardente |
| `route_2` | Routes 2 à 8 et Pic d'Azur |
| `forest` | Bois Murmurant et Marais Gris |
| `opal_syndicate` | Usines Opale, QG Opale, Centrale et arène Feu |
| `cave` | Donjons, Cœur de la Forge et Grotte des Échos |
| `memory_tower` | Tour de la Mémoire, Bibliothèque Engloutie, salles de la Ligue et arènes Arcane/Ombre |

Les autres affectations de `memory_tower`, `cave` ou `hometown` sont à
conserver si elles ne sont pas explicitement remplacées par le plan régional.
