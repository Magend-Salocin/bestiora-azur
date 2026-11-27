# Phase 2 : état d'avancement

État consolidé au 27 novembre 2026. Les documents référents restent la source de vérité pour le détail.

| Prompt | Statut | Livrable | Reste |
|---|---|---|---|
| 1. Villes et PNJ | Livrable validé | [PNJ_V2.md](../../world-building/characters/PNJ_V2.md) | Relecture finale et mise à jour des références de production |
| 2. Portraits | En cours | [TODO-portraits.md](../../world-building/characters/TODO-portraits.md) | Lots régionaux, vues de dos et retrait de l'ancien générateur |
| 3. Attaques | Fait | [ATTAQUES_V2.md](../../world-building/creatures/ATTAQUES_V2.md) | Lot 7 optionnel : animations retravaillées |
| 4. Musiques | En cours | [AUDIO_STATUS.md](../../world-building/audio/AUDIO_STATUS.md) | 17 pistes prévues puis nettoyage |

## Prérequis communs

1. Lire [GAME_DESIGN.md](../../design/GAME_DESIGN.md).
2. Lire [ARCHITECTURE.md](../../technical/ARCHITECTURE.md).
3. Lire [PROGRESS.md](../../progress/PROGRESS.md).
4. Vérifier `npm run validate`, `npm run check-docs` et `npm test`.

## Ordre d'exécution

1. Prompt 1 : figer régions, classes et textes.
2. Prompt 2 : produire les portraits à partir des tenues du prompt 1.
3. Prompt 3 : ancrer les noms d'attaques dans les régions du prompt 1.
4. Prompt 4 : composer les musiques à partir des identités du prompt 1.

Les prompts 3 et 4 peuvent être réalisés indépendamment après le lot 0 du prompt 1.

## Fin de chaque lot

- Présenter le lot avant modification du code.
- Exécuter `npm run validate`.
- Exécuter `npm run check-text` lorsque des textes ou descriptions changent.
- Exécuter `npm test`.
- Exécuter `npm run check-docs` après tout déplacement ou lien nouveau.
- Mettre à jour les fichiers de statut concernés.
- Mettre à jour [PROGRESS.md](../../progress/PROGRESS.md).
- Faire un commit atomique avec un message décrivant le lot.
