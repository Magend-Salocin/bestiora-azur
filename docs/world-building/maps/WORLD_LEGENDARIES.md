# Espèces, légendaires et identité régionale

## Légendaires

| Créature | Lieu | Niveau | Drapeaux |
|---|---|---|---|
| Volcarde | Cœur de la Forge | 50 | `volcarde_ko`, `volcarde_capturee` |
| Fulgorine | Centrale abandonnée | 50 | `fulgorine_ko`, `fulgorine_capturee` |
| Mirelle | Bibliothèque Engloutie | 50 | `mirelle_gone` |
| Azurel | Pic d'Azur | 70 | `azurel_ko`, `azurel_capturee` |
| Glacerne | Grotte Boréale | 60 | `glacerne_ko`, `glacerne_capturee` |

Les combats légendaires utilisent `wild_battle` avec fuite impossible.

## Échanges et espèces

Deux échanges PNJ offrent les starters non choisis. Fonderion et Fangeroi apparaissent au Pic d'Azur, Frimastoc au Col, au Pic et dans la Grotte Boréale.

## Obtention des 150 espèces

L'obtention complète est vérifiée par `tools/check-obtainability.js` et la validation `npm run validate` :

- 140 espèces sont obtenables par capture ;
- 8 espèces sont obtenables par évolution ;
- 2 espèces sont obtenables par échange PNJ ;
- Mirelle est la seule espèce mythique et apparaît après `bestiary_149` ;
- les légendaires ne sont pas placés dans les tables normales de rencontres.

## Identité régionale

| Zone | Lieux | Région |
|---|---|---|
| debut | Hameau-de-Lys, Bourg-Sablon | Centre-Val de Loire, Pays de la Loire |
| bois | Bois Murmurant, Routes 2-3 | Bretagne intérieure |
| port | Port-Ondine, Vireval | Bretagne littorale, Nord-Est industriel |
| cendrelune | Cendrelune, Tour, Centrale | Normandie |
| bise | Falaises de Bise, Haute-Bise | Bourgogne-Franche-Comté |
| marais | Marais Gris | Nouvelle-Aquitaine |
| ombrecourt | Ombrecourt, QG Opale | Île-de-France |
| mer | Routes 9-10, Îlots | Corse |
| forge | Forge-Ardente | Occitanie |
| givremont | Givremont | Auvergne-Rhône-Alpes |
| ligue | Col, Citadelle, Pic d'Azur | Provence-Alpes-Côte d'Azur |
