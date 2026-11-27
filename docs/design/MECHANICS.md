# Mécaniques

## Types

Normal, Feu, Eau, Flore, Foudre, Givre, Combat, Toxique, Terre, Vent, Arcane, Insecte, Roche, Ombre, Métal.

La table d'efficacité (×2, ×0,5, ×0) est définie dans `src/data/types.js` selon ces contraintes :

- chaque type a au moins 2 forces offensives et au moins 2 faiblesses défensives ;
- au plus 4 immunités au total dans la table ;
- relations intuitives (Eau > Feu, Feu > Flore, Flore > Eau, Foudre > Eau, Terre > Foudre, Givre > Vent, etc.) ;
- un test vérifie qu'aucun type n'a un solde (forces − faiblesses) supérieur à +3 ou inférieur à −3.

## Statistiques

PV, Attaque, Défense, Attaque Spéciale, Défense Spéciale, Vitesse. Chaque bestiole a des stats de base (total 250 à 600, légendaires 580 à 680), des **gènes** individuels (0 à 15 par stat, tirés à la capture) et de l'**entraînement** (points gagnés en battant des bestioles, plafonnés à 255 par stat).

```text
PV   = floor((2 × base + gène + floor(entr / 4)) × niveau / 100) + niveau + 10
Stat = floor((2 × base + gène + floor(entr / 4)) × niveau / 100) + 5
```

Niveau max : 100. Courbes d'expérience : rapide, moyenne, lente (formules dans `src/battle/logic/experience.js`).

## Dégâts

```text
base   = floor(floor(floor(2 × niveau / 5 + 2) × puissance × Att / Déf) / 50) + 2
dégâts = floor(base × STAB × efficacité × critique × aléa)
STAB = 1,5 si le type de l'attaque est celui de la bestiole ; critique = 1,5 ; aléa ∈ [0,85 ; 1]
```

Catégorie physique ou spéciale définie par attaque (pas par type). Taux de critique : 1/16, 1/8 pour les attaques à haut taux critique. Précision et esquive par paliers −6 à +6.

## Altérations

Majeures (une seule à la fois) : Brûlure, Poison, Poison grave, Paralysie, Sommeil (1 à 3 tours), Gel (20 % de dégel par tour). Volatiles : Confusion, Peur, Vampirisme, Piège. Les règles exactes sont dans le code et testées.

## Capture

```text
a = ((3 × PVmax − 2 × PV) × tauxEspèce × bonusCapsule) / (3 × PVmax) × bonusStatut
bonusStatut = 2 (sommeil, gel), 1,5 (paralysie, poison, brûlure), 1 sinon
```

4 tirages de secousse, probabilité de réussite par secousse `b = 65536 / (255 / a)^0,1875`. Si `a ≥ 255`, capture garantie.

Capsules : Capsule (×1), Super Capsule (×1,5), Hyper Capsule (×2), Capsule Maîtresse (capture garantie, 1 seul exemplaire dans le jeu).

## Équipe et stockage

Équipe de 6. Stockage illimité organisé en 12 boîtes de 30 accessibles depuis les terminaux des Haltes. Si l'équipe est pleine, la capture part dans le stockage.

## Évolution

Par niveau, par objet (Pierre Solaire, Pierre Marine, Pierre Orage, Pierre Lunaire, Pierre Braise) ou par amitié (valeur 0-255, augmentée en marchant et en combattant). Annulable avec Z sauf pour les objets.

## Divers

- Rencontres sauvages : chaque tuile d'herbe ou de grotte a une probabilité de rencontre par pas définie par zone (≈ 8 %). Table de rencontres pondérée par zone, jour et nuit non gérés.
- Dresseurs : champ de vision en ligne droite (1 à 5 cases), « ! » au-dessus de la tête, le dresseur s'approche, dialogue, combat. Une fois battu, il ne combat plus.
- Argent : gagné contre les dresseurs (récompense = niveau max × base de la classe), perdu de moitié en cas de défaite, retour à la dernière Halte.
- Répulsif, Corde de sortie, potions, soins de statut, objets tenus non gérés (simplicité).
- Pension : une bestiole gagne de l'XP pendant que le joueur marche. Pas de reproduction.
- Échanges : uniquement avec des PNJ (échanges scriptés).
