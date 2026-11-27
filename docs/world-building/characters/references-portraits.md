# Images de référence des portraits

Prompts pour générer une image de référence par portrait de combat. Chaque image est ensuite convertie en 48 × 48, 4 teintes (`npm run trainer-import`), puis nettoyée à la main. Le style suit la planche du lot 1 validée le 2026-11-25.

## Règles pour que la conversion fonctionne

| Règle | Raison |
|---|---|
| Un seul personnage par image, format carré. | L'outil recadre un carré par image. |
| Fond uni, vert très clair, sans décor ni ombre portée au sol. | Le fond devient transparent par détection de couleur. |
| Buste, du haut de la tête à la taille ; tête dans le tiers supérieur, un peu de marge au-dessus. | Même cadrage pour tous, rien de coupé en haut. |
| Camaïeu de vert, 4 à 5 valeurs bien séparées, aplats, pas de dégradé doux. | La conversion répartit la luminosité en 4 teintes. |
| Lumière en haut à gauche. | Charte des bestioles et des portraits. |
| Personnage tourné de trois quarts vers la gauche de l'image. | En combat, le dresseur fait face au joueur, placé à gauche. |
| Accessoire du métier tenu en main, gros et lisible. | Il doit survivre à la réduction en 48 px. |
| Aucun texte, logo ni lettrage (sauf l'ardoise de l'Écolier). | Illisible à 48 px, et pas de marque. |

Astuce : donner la planche du lot 1 comme image de style, quand l'outil le permet, et garder le même modèle et les mêmes réglages pour toute la série. Générer 4 variantes et garder celle dont la silhouette se lit le mieux en vignette.

## Prompt négatif

À ajouter à chaque image, si l'outil accepte un prompt négatif :

```
multiple characters, full body, cropped head, background scenery, gradient background, text, letters, watermark, logo, signature, frame, border, blur, soft gradients, photorealistic, 3D render, chibi, toy, plastic, extra fingers, deformed hands
```

## Prompts complets

Un bloc par image, à coller tel quel. Nom du fichier attendu : `docs/world-building/characters/references/<id>.png`.

### Lot 1 (référence déjà fournie)

Gamin, Fillette, Écolier, Campeur, Campeuse, Sonneur et Sonneuse : planche du 2026-11-25, à découper. Rien à générer.

### Lot 2 : plein air

`randonneur`

```
Retro 16-bit RPG character portrait, pixel art style, single character, bust shot from the top of the head to the waist, head in the upper third with a small margin above, three-quarter view turned toward the left of the image, looking at the viewer.
A bearded hiker in his forties, felt hat, checked shirt with rolled sleeves, rucksack straps, wooden walking staff.
Monochrome green palette (Game Boy inspired), 4 to 5 clearly separated values from very light to very dark green, flat cel shading, crisp clusters, light coming from the top left, soft dark outline only on the shadow side.
Natural human proportions, expressive face with detailed eyes, eyebrows, nose and hair, clothes with folds and seams, the work tool held in hand, large and readable.
Plain uniform very light green background, no scenery, no ground shadow, no text, no logo, no frame, square image.
```

`randonneuse`

```
Retro 16-bit RPG character portrait, pixel art style, single character, bust shot from the top of the head to the waist, head in the upper third with a small margin above, three-quarter view turned toward the left of the image, looking at the viewer.
A young woman hiker, cap, ponytail, windbreaker tied around the waist, rucksack straps, holding a folded paper map.
Monochrome green palette (Game Boy inspired), 4 to 5 clearly separated values from very light to very dark green, flat cel shading, crisp clusters, light coming from the top left, soft dark outline only on the shadow side.
Natural human proportions, expressive face with detailed eyes, eyebrows, nose and hair, clothes with folds and seams, the work tool held in hand, large and readable.
Plain uniform very light green background, no scenery, no ground shadow, no text, no logo, no frame, square image.
```

`montagnard`

```
Retro 16-bit RPG character portrait, pixel art style, single character, bust shot from the top of the head to the waist, head in the upper third with a small margin above, three-quarter view turned toward the left of the image, looking at the viewer.
A burly mountain man, thick beard, knitted wool cap, heavy wool sweater, coiled rope over the shoulder, ice axe in hand.
Monochrome green palette (Game Boy inspired), 4 to 5 clearly separated values from very light to very dark green, flat cel shading, crisp clusters, light coming from the top left, soft dark outline only on the shadow side.
Natural human proportions, expressive face with detailed eyes, eyebrows, nose and hair, clothes with folds and seams, the work tool held in hand, large and readable.
Plain uniform very light green background, no scenery, no ground shadow, no text, no logo, no frame, square image.
```

`nageur`

```
Retro 16-bit RPG character portrait, pixel art style, single character, bust shot from the top of the head to the waist, head in the upper third with a small margin above, three-quarter view turned toward the left of the image, looking at the viewer.
A young athletic swimmer, swimming cap and goggles pushed up on the forehead, sleeveless one-piece bathing suit of the 1930s, towel over the shoulder.
Monochrome green palette (Game Boy inspired), 4 to 5 clearly separated values from very light to very dark green, flat cel shading, crisp clusters, light coming from the top left, soft dark outline only on the shadow side.
Natural human proportions, expressive face with detailed eyes, eyebrows, nose and hair, clothes with folds and seams, the work tool held in hand, large and readable.
Plain uniform very light green background, no scenery, no ground shadow, no text, no logo, no frame, square image.
```

`nageuse`

```
Retro 16-bit RPG character portrait, pixel art style, single character, bust shot from the top of the head to the waist, head in the upper third with a small margin above, three-quarter view turned toward the left of the image, looking at the viewer.
A young woman swimmer, swimming cap with a strap, goggles pushed up, sleeveless one-piece bathing suit, holding a cork float board.
Monochrome green palette (Game Boy inspired), 4 to 5 clearly separated values from very light to very dark green, flat cel shading, crisp clusters, light coming from the top left, soft dark outline only on the shadow side.
Natural human proportions, expressive face with detailed eyes, eyebrows, nose and hair, clothes with folds and seams, the work tool held in hand, large and readable.
Plain uniform very light green background, no scenery, no ground shadow, no text, no logo, no frame, square image.
```

`carrier`

```
Retro 16-bit RPG character portrait, pixel art style, single character, bust shot from the top of the head to the waist, head in the upper third with a small margin above, three-quarter view turned toward the left of the image, looking at the viewer.
A quarryman of the Loire tufa caves, light work smock dusted with white stone powder, flat cap, stone chisel and mallet in hand.
Monochrome green palette (Game Boy inspired), 4 to 5 clearly separated values from very light to very dark green, flat cel shading, crisp clusters, light coming from the top left, soft dark outline only on the shadow side.
Natural human proportions, expressive face with detailed eyes, eyebrows, nose and hair, clothes with folds and seams, the work tool held in hand, large and readable.
Plain uniform very light green background, no scenery, no ground shadow, no text, no logo, no frame, square image.
```

`fruitier`

```
Retro 16-bit RPG character portrait, pixel art style, single character, bust shot from the top of the head to the waist, head in the upper third with a small margin above, three-quarter view turned toward the left of the image, looking at the viewer.
A Comté cheesemaker from the Jura, light cheesemaker's apron, wool beanie, thick scarf against the cold wind, holding a cheese iron (cheese tester).
Monochrome green palette (Game Boy inspired), 4 to 5 clearly separated values from very light to very dark green, flat cel shading, crisp clusters, light coming from the top left, soft dark outline only on the shadow side.
Natural human proportions, expressive face with detailed eyes, eyebrows, nose and hair, clothes with folds and seams, the work tool held in hand, large and readable.
Plain uniform very light green background, no scenery, no ground shadow, no text, no logo, no frame, square image.
```

`gardian`

```
Retro 16-bit RPG character portrait, pixel art style, single character, bust shot from the top of the head to the waist, head in the upper third with a small margin above, three-quarter view turned toward the left of the image, looking at the viewer.
A Camargue horse herdsman, wide-brimmed black felt hat, velvet jacket, patterned shirt, holding a long trident herding pole.
Monochrome green palette (Game Boy inspired), 4 to 5 clearly separated values from very light to very dark green, flat cel shading, crisp clusters, light coming from the top left, soft dark outline only on the shadow side.
Natural human proportions, expressive face with detailed eyes, eyebrows, nose and hair, clothes with folds and seams, the work tool held in hand, large and readable.
Plain uniform very light green background, no scenery, no ground shadow, no text, no logo, no frame, square image.
```

### Lot 3 : métiers

`pecheur`

```
Retro 16-bit RPG character portrait, pixel art style, single character, bust shot from the top of the head to the waist, head in the upper third with a small margin above, three-quarter view turned toward the left of the image, looking at the viewer.
A fisherman in his fifties, oilskin jacket, wool cap, fishing rod over the shoulder, a fish hanging from the line.
Monochrome green palette (Game Boy inspired), 4 to 5 clearly separated values from very light to very dark green, flat cel shading, crisp clusters, light coming from the top left, soft dark outline only on the shadow side.
Natural human proportions, expressive face with detailed eyes, eyebrows, nose and hair, clothes with folds and seams, the work tool held in hand, large and readable.
Plain uniform very light green background, no scenery, no ground shadow, no text, no logo, no frame, square image.
```

`marin`

```
Retro 16-bit RPG character portrait, pixel art style, single character, bust shot from the top of the head to the waist, head in the upper third with a small margin above, three-quarter view turned toward the left of the image, looking at the viewer.
A sturdy sailor, striped sailor shirt, pea coat, knit cap, coiled rope in his hands.
Monochrome green palette (Game Boy inspired), 4 to 5 clearly separated values from very light to very dark green, flat cel shading, crisp clusters, light coming from the top left, soft dark outline only on the shadow side.
Natural human proportions, expressive face with detailed eyes, eyebrows, nose and hair, clothes with folds and seams, the work tool held in hand, large and readable.
Plain uniform very light green background, no scenery, no ground shadow, no text, no logo, no frame, square image.
```

`ouvrier`

```
Retro 16-bit RPG character portrait, pixel art style, single character, bust shot from the top of the head to the waist, head in the upper third with a small margin above, three-quarter view turned toward the left of the image, looking at the viewer.
A factory worker, dark blue work overalls, cap, mustache, large wrench in hand.
Monochrome green palette (Game Boy inspired), 4 to 5 clearly separated values from very light to very dark green, flat cel shading, crisp clusters, light coming from the top left, soft dark outline only on the shadow side.
Natural human proportions, expressive face with detailed eyes, eyebrows, nose and hair, clothes with folds and seams, the work tool held in hand, large and readable.
Plain uniform very light green background, no scenery, no ground shadow, no text, no logo, no frame, square image.
```

`motard`

```
Retro 16-bit RPG character portrait, pixel art style, single character, bust shot from the top of the head to the waist, head in the upper third with a small margin above, three-quarter view turned toward the left of the image, looking at the viewer.
A biker, leather jacket, open-face helmet and goggles of the 1960s, scarf, gloves.
Monochrome green palette (Game Boy inspired), 4 to 5 clearly separated values from very light to very dark green, flat cel shading, crisp clusters, light coming from the top left, soft dark outline only on the shadow side.
Natural human proportions, expressive face with detailed eyes, eyebrows, nose and hair, clothes with folds and seams, the work tool held in hand, large and readable.
Plain uniform very light green background, no scenery, no ground shadow, no text, no logo, no frame, square image.
```

`goemonier`

```
Retro 16-bit RPG character portrait, pixel art style, single character, bust shot from the top of the head to the waist, head in the upper third with a small margin above, three-quarter view turned toward the left of the image, looking at the viewer.
An old Breton seaweed harvester, grey beard, knitted cap, light oilskin open on a striped sailor shirt, long three-pronged seaweed fork.
Monochrome green palette (Game Boy inspired), 4 to 5 clearly separated values from very light to very dark green, flat cel shading, crisp clusters, light coming from the top left, soft dark outline only on the shadow side.
Natural human proportions, expressive face with detailed eyes, eyebrows, nose and hair, clothes with folds and seams, the work tool held in hand, large and readable.
Plain uniform very light green background, no scenery, no ground shadow, no text, no logo, no frame, square image.
```

`corailleur`

```
Retro 16-bit RPG character portrait, pixel art style, single character, bust shot from the top of the head to the waist, head in the upper third with a small margin above, three-quarter view turned toward the left of the image, looking at the viewer.
A Corsican coral diver, dark corduroy jacket, wool beret (berretta), coral branch and a small net in hand.
Monochrome green palette (Game Boy inspired), 4 to 5 clearly separated values from very light to very dark green, flat cel shading, crisp clusters, light coming from the top left, soft dark outline only on the shadow side.
Natural human proportions, expressive face with detailed eyes, eyebrows, nose and hair, clothes with folds and seams, the work tool held in hand, large and readable.
Plain uniform very light green background, no scenery, no ground shadow, no text, no logo, no frame, square image.
```

`cheminot`

```
Retro 16-bit RPG character portrait, pixel art style, single character, bust shot from the top of the head to the waist, head in the upper third with a small margin above, three-quarter view turned toward the left of the image, looking at the viewer.
A railway worker from the North, railway cap, dark blue work jacket, light scarf, signal lantern in hand.
Monochrome green palette (Game Boy inspired), 4 to 5 clearly separated values from very light to very dark green, flat cel shading, crisp clusters, light coming from the top left, soft dark outline only on the shadow side.
Natural human proportions, expressive face with detailed eyes, eyebrows, nose and hair, clothes with folds and seams, the work tool held in hand, large and readable.
Plain uniform very light green background, no scenery, no ground shadow, no text, no logo, no frame, square image.
```

`mineur`

```
Retro 16-bit RPG character portrait, pixel art style, single character, bust shot from the top of the head to the waist, head in the upper third with a small margin above, three-quarter view turned toward the left of the image, looking at the viewer.
A coal miner, helmet with a lamp, dark work jacket, sooty face, pickaxe over the shoulder.
Monochrome green palette (Game Boy inspired), 4 to 5 clearly separated values from very light to very dark green, flat cel shading, crisp clusters, light coming from the top left, soft dark outline only on the shadow side.
Natural human proportions, expressive face with detailed eyes, eyebrows, nose and hair, clothes with folds and seams, the work tool held in hand, large and readable.
Plain uniform very light green background, no scenery, no ground shadow, no text, no logo, no frame, square image.
```

`forgeron`

```
Retro 16-bit RPG character portrait, pixel art style, single character, bust shot from the top of the head to the waist, head in the upper third with a small margin above, three-quarter view turned toward the left of the image, looking at the viewer.
A Catalan forge blacksmith, dark leather apron, flannel sash at the waist, beret, tongs holding a glowing horseshoe.
Monochrome green palette (Game Boy inspired), 4 to 5 clearly separated values from very light to very dark green, flat cel shading, crisp clusters, light coming from the top left, soft dark outline only on the shadow side.
Natural human proportions, expressive face with detailed eyes, eyebrows, nose and hair, clothes with folds and seams, the work tool held in hand, large and readable.
Plain uniform very light green background, no scenery, no ground shadow, no text, no logo, no frame, square image.
```

`maraichin`

```
Retro 16-bit RPG character portrait, pixel art style, single character, bust shot from the top of the head to the waist, head in the upper third with a small margin above, three-quarter view turned toward the left of the image, looking at the viewer.
A marsh boatman from the Marais poitevin, beret, waistcoat, long wooden punting pole.
Monochrome green palette (Game Boy inspired), 4 to 5 clearly separated values from very light to very dark green, flat cel shading, crisp clusters, light coming from the top left, soft dark outline only on the shadow side.
Natural human proportions, expressive face with detailed eyes, eyebrows, nose and hair, clothes with folds and seams, the work tool held in hand, large and readable.
Plain uniform very light green background, no scenery, no ground shadow, no text, no logo, no frame, square image.
```

`maraichine`

```
Retro 16-bit RPG character portrait, pixel art style, single character, bust shot from the top of the head to the waist, head in the upper third with a small margin above, three-quarter view turned toward the left of the image, looking at the viewer.
A young woman eel fisher from the marshes, headscarf, waistcoat, wicker eel trap in her arms.
Monochrome green palette (Game Boy inspired), 4 to 5 clearly separated values from very light to very dark green, flat cel shading, crisp clusters, light coming from the top left, soft dark outline only on the shadow side.
Natural human proportions, expressive face with detailed eyes, eyebrows, nose and hair, clothes with folds and seams, the work tool held in hand, large and readable.
Plain uniform very light green background, no scenery, no ground shadow, no text, no logo, no frame, square image.
```

`horloger`

```
Retro 16-bit RPG character portrait, pixel art style, single character, bust shot from the top of the head to the waist, head in the upper third with a small margin above, three-quarter view turned toward the left of the image, looking at the viewer.
A Jura watchmaker, magnifying loupe screwed in one eye, waistcoat, sleeve garters, a pocket watch open in his hand.
Monochrome green palette (Game Boy inspired), 4 to 5 clearly separated values from very light to very dark green, flat cel shading, crisp clusters, light coming from the top left, soft dark outline only on the shadow side.
Natural human proportions, expressive face with detailed eyes, eyebrows, nose and hair, clothes with folds and seams, the work tool held in hand, large and readable.
Plain uniform very light green background, no scenery, no ground shadow, no text, no logo, no frame, square image.
```

### Lot 4 : ville et savoir

`scientifique`

```
Retro 16-bit RPG character portrait, pixel art style, single character, bust shot from the top of the head to the waist, head in the upper third with a small margin above, three-quarter view turned toward the left of the image, looking at the viewer.
A scientist, round glasses, lab coat over a tie, test tube held up to the light.
Monochrome green palette (Game Boy inspired), 4 to 5 clearly separated values from very light to very dark green, flat cel shading, crisp clusters, light coming from the top left, soft dark outline only on the shadow side.
Natural human proportions, expressive face with detailed eyes, eyebrows, nose and hair, clothes with folds and seams, the work tool held in hand, large and readable.
Plain uniform very light green background, no scenery, no ground shadow, no text, no logo, no frame, square image.
```

`chercheuse`

```
Retro 16-bit RPG character portrait, pixel art style, single character, bust shot from the top of the head to the waist, head in the upper third with a small margin above, three-quarter view turned toward the left of the image, looking at the viewer.
A woman researcher, hair in a bun, glasses, lab coat, notebook and pencil.
Monochrome green palette (Game Boy inspired), 4 to 5 clearly separated values from very light to very dark green, flat cel shading, crisp clusters, light coming from the top left, soft dark outline only on the shadow side.
Natural human proportions, expressive face with detailed eyes, eyebrows, nose and hair, clothes with folds and seams, the work tool held in hand, large and readable.
Plain uniform very light green background, no scenery, no ground shadow, no text, no logo, no frame, square image.
```

`gentleman`

```
Retro 16-bit RPG character portrait, pixel art style, single character, bust shot from the top of the head to the waist, head in the upper third with a small margin above, three-quarter view turned toward the left of the image, looking at the viewer.
An elegant older gentleman, top hat, mustache, three-piece suit, cane with a silver knob.
Monochrome green palette (Game Boy inspired), 4 to 5 clearly separated values from very light to very dark green, flat cel shading, crisp clusters, light coming from the top left, soft dark outline only on the shadow side.
Natural human proportions, expressive face with detailed eyes, eyebrows, nose and hair, clothes with folds and seams, the work tool held in hand, large and readable.
Plain uniform very light green background, no scenery, no ground shadow, no text, no logo, no frame, square image.
```

`dame`

```
Retro 16-bit RPG character portrait, pixel art style, single character, bust shot from the top of the head to the waist, head in the upper third with a small margin above, three-quarter view turned toward the left of the image, looking at the viewer.
An elegant lady, hat with a ribbon, high-collared dress, gloves, folded fan.
Monochrome green palette (Game Boy inspired), 4 to 5 clearly separated values from very light to very dark green, flat cel shading, crisp clusters, light coming from the top left, soft dark outline only on the shadow side.
Natural human proportions, expressive face with detailed eyes, eyebrows, nose and hair, clothes with folds and seams, the work tool held in hand, large and readable.
Plain uniform very light green background, no scenery, no ground shadow, no text, no logo, no frame, square image.
```

`mystique`

```
Retro 16-bit RPG character portrait, pixel art style, single character, bust shot from the top of the head to the waist, head in the upper third with a small margin above, three-quarter view turned toward the left of the image, looking at the viewer.
A mysterious fortune teller, hooded cloak, long hair, glass ball in her hands.
Monochrome green palette (Game Boy inspired), 4 to 5 clearly separated values from very light to very dark green, flat cel shading, crisp clusters, light coming from the top left, soft dark outline only on the shadow side.
Natural human proportions, expressive face with detailed eyes, eyebrows, nose and hair, clothes with folds and seams, the work tool held in hand, large and readable.
Plain uniform very light green background, no scenery, no ground shadow, no text, no logo, no frame, square image.
```

`danseuse`

```
Retro 16-bit RPG character portrait, pixel art style, single character, bust shot from the top of the head to the waist, head in the upper third with a small margin above, three-quarter view turned toward the left of the image, looking at the viewer.
A folk dancer, flowing skirt, shawl, flower in her hair, arms raised mid-step.
Monochrome green palette (Game Boy inspired), 4 to 5 clearly separated values from very light to very dark green, flat cel shading, crisp clusters, light coming from the top left, soft dark outline only on the shadow side.
Natural human proportions, expressive face with detailed eyes, eyebrows, nose and hair, clothes with folds and seams, the work tool held in hand, large and readable.
Plain uniform very light green background, no scenery, no ground shadow, no text, no logo, no frame, square image.
```

`dresseur`

```
Retro 16-bit RPG character portrait, pixel art style, single character, bust shot from the top of the head to the waist, head in the upper third with a small margin above, three-quarter view turned toward the left of the image, looking at the viewer.
A confident young creature trainer, spiky hair, travel jacket, capture capsule held up in one hand.
Monochrome green palette (Game Boy inspired), 4 to 5 clearly separated values from very light to very dark green, flat cel shading, crisp clusters, light coming from the top left, soft dark outline only on the shadow side.
Natural human proportions, expressive face with detailed eyes, eyebrows, nose and hair, clothes with folds and seams, the work tool held in hand, large and readable.
Plain uniform very light green background, no scenery, no ground shadow, no text, no logo, no frame, square image.
```

`dresseuse`

```
Retro 16-bit RPG character portrait, pixel art style, single character, bust shot from the top of the head to the waist, head in the upper third with a small margin above, three-quarter view turned toward the left of the image, looking at the viewer.
A confident young woman trainer, long hair, travel jacket, capture capsule held up in one hand.
Monochrome green palette (Game Boy inspired), 4 to 5 clearly separated values from very light to very dark green, flat cel shading, crisp clusters, light coming from the top left, soft dark outline only on the shadow side.
Natural human proportions, expressive face with detailed eyes, eyebrows, nose and hair, clothes with folds and seams, the work tool held in hand, large and readable.
Plain uniform very light green background, no scenery, no ground shadow, no text, no logo, no frame, square image.
```

`jardinier`

```
Retro 16-bit RPG character portrait, pixel art style, single character, bust shot from the top of the head to the waist, head in the upper third with a small margin above, three-quarter view turned toward the left of the image, looking at the viewer.
A Norman greenhouse gardener, light smock, straw hat, pruning shears and an apple branch.
Monochrome green palette (Game Boy inspired), 4 to 5 clearly separated values from very light to very dark green, flat cel shading, crisp clusters, light coming from the top left, soft dark outline only on the shadow side.
Natural human proportions, expressive face with detailed eyes, eyebrows, nose and hair, clothes with folds and seams, the work tool held in hand, large and readable.
Plain uniform very light green background, no scenery, no ground shadow, no text, no logo, no frame, square image.
```

`jardiniere`

```
Retro 16-bit RPG character portrait, pixel art style, single character, bust shot from the top of the head to the waist, head in the upper third with a small margin above, three-quarter view turned toward the left of the image, looking at the viewer.
A woman greenhouse gardener, straw hat, apron, watering can in hand.
Monochrome green palette (Game Boy inspired), 4 to 5 clearly separated values from very light to very dark green, flat cel shading, crisp clusters, light coming from the top left, soft dark outline only on the shadow side.
Natural human proportions, expressive face with detailed eyes, eyebrows, nose and hair, clothes with folds and seams, the work tool held in hand, large and readable.
Plain uniform very light green background, no scenery, no ground shadow, no text, no logo, no frame, square image.
```

`cataphile`

```
Retro 16-bit RPG character portrait, pixel art style, single character, bust shot from the top of the head to the waist, head in the upper third with a small margin above, three-quarter view turned toward the left of the image, looking at the viewer.
A Paris catacomb explorer, headlamp on the forehead, worn jacket, rope and an old map.
Monochrome green palette (Game Boy inspired), 4 to 5 clearly separated values from very light to very dark green, flat cel shading, crisp clusters, light coming from the top left, soft dark outline only on the shadow side.
Natural human proportions, expressive face with detailed eyes, eyebrows, nose and hair, clothes with folds and seams, the work tool held in hand, large and readable.
Plain uniform very light green background, no scenery, no ground shadow, no text, no logo, no frame, square image.
```

`miquelot`

```
Retro 16-bit RPG character portrait, pixel art style, single character, bust shot from the top of the head to the waist, head in the upper third with a small margin above, three-quarter view turned toward the left of the image, looking at the viewer.
A medieval-style pilgrim of Mont Saint-Michel, hooded cape with a scallop shell badge, pilgrim's staff.
Monochrome green palette (Game Boy inspired), 4 to 5 clearly separated values from very light to very dark green, flat cel shading, crisp clusters, light coming from the top left, soft dark outline only on the shadow side.
Natural human proportions, expressive face with detailed eyes, eyebrows, nose and hair, clothes with folds and seams, the work tool held in hand, large and readable.
Plain uniform very light green background, no scenery, no ground shadow, no text, no logo, no frame, square image.
```

### Lot 5 : Syndicat Opale et intrigue

`sbire_opale`

```
Retro 16-bit RPG character portrait, pixel art style, single character, bust shot from the top of the head to the waist, head in the upper third with a small margin above, three-quarter view turned toward the left of the image, looking at the viewer.
A henchman of an industrial syndicate, grey jumpsuit, helmet, plain diamond-shaped badge without any letter, arms crossed.
Monochrome green palette (Game Boy inspired), 4 to 5 clearly separated values from very light to very dark green, flat cel shading, crisp clusters, light coming from the top left, soft dark outline only on the shadow side.
Natural human proportions, expressive face with detailed eyes, eyebrows, nose and hair, clothes with folds and seams, the work tool held in hand, large and readable.
Plain uniform very light green background, no scenery, no ground shadow, no text, no logo, no frame, square image.
```

`sbire_opale_f`

```
Retro 16-bit RPG character portrait, pixel art style, single character, bust shot from the top of the head to the waist, head in the upper third with a small margin above, three-quarter view turned toward the left of the image, looking at the viewer.
A woman henchman of an industrial syndicate, grey jumpsuit, helmet, ponytail, plain diamond-shaped badge, hand on the hip.
Monochrome green palette (Game Boy inspired), 4 to 5 clearly separated values from very light to very dark green, flat cel shading, crisp clusters, light coming from the top left, soft dark outline only on the shadow side.
Natural human proportions, expressive face with detailed eyes, eyebrows, nose and hair, clothes with folds and seams, the work tool held in hand, large and readable.
Plain uniform very light green background, no scenery, no ground shadow, no text, no logo, no frame, square image.
```

`lieutenant_opale`

```
Retro 16-bit RPG character portrait, pixel art style, single character, bust shot from the top of the head to the waist, head in the upper third with a small margin above, three-quarter view turned toward the left of the image, looking at the viewer.
An officer of an industrial syndicate, grey uniform with shoulder boards, cap with a visor, plain diamond-shaped badge, gloved hands.
Monochrome green palette (Game Boy inspired), 4 to 5 clearly separated values from very light to very dark green, flat cel shading, crisp clusters, light coming from the top left, soft dark outline only on the shadow side.
Natural human proportions, expressive face with detailed eyes, eyebrows, nose and hair, clothes with folds and seams, the work tool held in hand, large and readable.
Plain uniform very light green background, no scenery, no ground shadow, no text, no logo, no frame, square image.
```

`corvin`

```
Retro 16-bit RPG character portrait, pixel art style, single character, bust shot from the top of the head to the waist, head in the upper third with a small margin above, three-quarter view turned toward the left of the image, looking at the viewer.
A stern ironworks owner in his sixties, short grey beard, long dark coat, light scarf, gloved hand on a cane.
Monochrome green palette (Game Boy inspired), 4 to 5 clearly separated values from very light to very dark green, flat cel shading, crisp clusters, light coming from the top left, soft dark outline only on the shadow side.
Natural human proportions, expressive face with detailed eyes, eyebrows, nose and hair, clothes with folds and seams, the work tool held in hand, large and readable.
Plain uniform very light green background, no scenery, no ground shadow, no text, no logo, no frame, square image.
```

`rival`

```
Retro 16-bit RPG character portrait, pixel art style, single character, bust shot from the top of the head to the waist, head in the upper third with a small margin above, three-quarter view turned toward the left of the image, looking at the viewer.
A lively teenage girl, the player's neighbor and rival, short messy hair, travel jacket, confident smirk, capture capsule spinning on a finger.
Monochrome green palette (Game Boy inspired), 4 to 5 clearly separated values from very light to very dark green, flat cel shading, crisp clusters, light coming from the top left, soft dark outline only on the shadow side.
Natural human proportions, expressive face with detailed eyes, eyebrows, nose and hair, clothes with folds and seams, the work tool held in hand, large and readable.
Plain uniform very light green background, no scenery, no ground shadow, no text, no logo, no frame, square image.
```

`professeure`

```
Retro 16-bit RPG character portrait, pixel art style, single character, bust shot from the top of the head to the waist, head in the upper third with a small margin above, three-quarter view turned toward the left of the image, looking at the viewer.
A woman botanist professor, long hair, round glasses, lab coat over a gardening apron, a potted plant in her hands.
Monochrome green palette (Game Boy inspired), 4 to 5 clearly separated values from very light to very dark green, flat cel shading, crisp clusters, light coming from the top left, soft dark outline only on the shadow side.
Natural human proportions, expressive face with detailed eyes, eyebrows, nose and hair, clothes with folds and seams, the work tool held in hand, large and readable.
Plain uniform very light green background, no scenery, no ground shadow, no text, no logo, no frame, square image.
```

### Lot 6 : champions et Gardiens

`garance`

```
Retro 16-bit RPG character portrait, pixel art style, single character, bust shot from the top of the head to the waist, head in the upper third with a small margin above, three-quarter view turned toward the left of the image, looking at the viewer.
Rock gym leader, a woman quarry worker of the Loire tufa caves, light smock dusted with stone, bandana, stone hammer on the shoulder.
Monochrome green palette (Game Boy inspired), 4 to 5 clearly separated values from very light to very dark green, flat cel shading, crisp clusters, light coming from the top left, soft dark outline only on the shadow side.
Natural human proportions, expressive face with detailed eyes, eyebrows, nose and hair, clothes with folds and seams, the work tool held in hand, large and readable.
Plain uniform very light green background, no scenery, no ground shadow, no text, no logo, no frame, square image.
```

`mael`

```
Retro 16-bit RPG character portrait, pixel art style, single character, bust shot from the top of the head to the waist, head in the upper third with a small margin above, three-quarter view turned toward the left of the image, looking at the viewer.
Water gym leader, a young Breton seaweed harvester, strong build, striped sailor shirt, rolled trousers, seaweed fork.
Monochrome green palette (Game Boy inspired), 4 to 5 clearly separated values from very light to very dark green, flat cel shading, crisp clusters, light coming from the top left, soft dark outline only on the shadow side.
Natural human proportions, expressive face with detailed eyes, eyebrows, nose and hair, clothes with folds and seams, the work tool held in hand, large and readable.
Plain uniform very light green background, no scenery, no ground shadow, no text, no logo, no frame, square image.
```

`selene`

```
Retro 16-bit RPG character portrait, pixel art style, single character, bust shot from the top of the head to the waist, head in the upper third with a small margin above, three-quarter view turned toward the left of the image, looking at the viewer.
Electric gym leader, a woman engineer of a northern industrial town, ponytail, glasses, work jacket, large wrench crackling with sparks.
Monochrome green palette (Game Boy inspired), 4 to 5 clearly separated values from very light to very dark green, flat cel shading, crisp clusters, light coming from the top left, soft dark outline only on the shadow side.
Natural human proportions, expressive face with detailed eyes, eyebrows, nose and hair, clothes with folds and seams, the work tool held in hand, large and readable.
Plain uniform very light green background, no scenery, no ground shadow, no text, no logo, no frame, square image.
```

`aubin`

```
Retro 16-bit RPG character portrait, pixel art style, single character, bust shot from the top of the head to the waist, head in the upper third with a small margin above, three-quarter view turned toward the left of the image, looking at the viewer.
Grass gym leader, a Norman apple grower, smock, cap, basket of apples.
Monochrome green palette (Game Boy inspired), 4 to 5 clearly separated values from very light to very dark green, flat cel shading, crisp clusters, light coming from the top left, soft dark outline only on the shadow side.
Natural human proportions, expressive face with detailed eyes, eyebrows, nose and hair, clothes with folds and seams, the work tool held in hand, large and readable.
Plain uniform very light green background, no scenery, no ground shadow, no text, no logo, no frame, square image.
```

`ysolde`

```
Retro 16-bit RPG character portrait, pixel art style, single character, bust shot from the top of the head to the waist, head in the upper third with a small margin above, three-quarter view turned toward the left of the image, looking at the viewer.
Wind gym leader, a woman guardian of the Jura ridges, long hair blown by the wind, thick scarf and shawl flying.
Monochrome green palette (Game Boy inspired), 4 to 5 clearly separated values from very light to very dark green, flat cel shading, crisp clusters, light coming from the top left, soft dark outline only on the shadow side.
Natural human proportions, expressive face with detailed eyes, eyebrows, nose and hair, clothes with folds and seams, the work tool held in hand, large and readable.
Plain uniform very light green background, no scenery, no ground shadow, no text, no logo, no frame, square image.
```

`lazare`

```
Retro 16-bit RPG character portrait, pixel art style, single character, bust shot from the top of the head to the waist, head in the upper third with a small margin above, three-quarter view turned toward the left of the image, looking at the viewer.
Shadow gym leader, a Paris catacomb explorer, hooded dark coat, pale face, old lantern.
Monochrome green palette (Game Boy inspired), 4 to 5 clearly separated values from very light to very dark green, flat cel shading, crisp clusters, light coming from the top left, soft dark outline only on the shadow side.
Natural human proportions, expressive face with detailed eyes, eyebrows, nose and hair, clothes with folds and seams, the work tool held in hand, large and readable.
Plain uniform very light green background, no scenery, no ground shadow, no text, no logo, no frame, square image.
```

`brune`

```
Retro 16-bit RPG character portrait, pixel art style, single character, bust shot from the top of the head to the waist, head in the upper third with a small margin above, three-quarter view turned toward the left of the image, looking at the viewer.
Fire gym leader, a broad woman blacksmith of a Catalan forge, beret, braid, rolled sleeves, leather apron, flannel sash, sledgehammer on the shoulder.
Monochrome green palette (Game Boy inspired), 4 to 5 clearly separated values from very light to very dark green, flat cel shading, crisp clusters, light coming from the top left, soft dark outline only on the shadow side.
Natural human proportions, expressive face with detailed eyes, eyebrows, nose and hair, clothes with folds and seams, the work tool held in hand, large and readable.
Plain uniform very light green background, no scenery, no ground shadow, no text, no logo, no frame, square image.
```

`oswin`

```
Retro 16-bit RPG character portrait, pixel art style, single character, bust shot from the top of the head to the waist, head in the upper third with a small margin above, three-quarter view turned toward the left of the image, looking at the viewer.
Arcane gym leader Anselme, a Savoy crystal hunter, wool sweater with patterns, pompom hat, large crystal in his hand.
Monochrome green palette (Game Boy inspired), 4 to 5 clearly separated values from very light to very dark green, flat cel shading, crisp clusters, light coming from the top left, soft dark outline only on the shadow side.
Natural human proportions, expressive face with detailed eyes, eyebrows, nose and hair, clothes with folds and seams, the work tool held in hand, large and readable.
Plain uniform very light green background, no scenery, no ground shadow, no text, no logo, no frame, square image.
```

`gardien_1`

```
Retro 16-bit RPG character portrait, pixel art style, single character, bust shot from the top of the head to the waist, head in the upper third with a small margin above, three-quarter view turned toward the left of the image, looking at the viewer.
Steel League guardian Aldebert, an armored-looking older man, high-collared coat with metal buttons, stern face.
Monochrome green palette (Game Boy inspired), 4 to 5 clearly separated values from very light to very dark green, flat cel shading, crisp clusters, light coming from the top left, soft dark outline only on the shadow side.
Natural human proportions, expressive face with detailed eyes, eyebrows, nose and hair, clothes with folds and seams, the work tool held in hand, large and readable.
Plain uniform very light green background, no scenery, no ground shadow, no text, no logo, no frame, square image.
```

`gardien_2`

```
Retro 16-bit RPG character portrait, pixel art style, single character, bust shot from the top of the head to the waist, head in the upper third with a small margin above, three-quarter view turned toward the left of the image, looking at the viewer.
Fighting League guardian Ségolène, an athletic woman, short hair, sleeveless tunic, wrapped forearms, fighting stance.
Monochrome green palette (Game Boy inspired), 4 to 5 clearly separated values from very light to very dark green, flat cel shading, crisp clusters, light coming from the top left, soft dark outline only on the shadow side.
Natural human proportions, expressive face with detailed eyes, eyebrows, nose and hair, clothes with folds and seams, the work tool held in hand, large and readable.
Plain uniform very light green background, no scenery, no ground shadow, no text, no logo, no frame, square image.
```

`gardien_3`

```
Retro 16-bit RPG character portrait, pixel art style, single character, bust shot from the top of the head to the waist, head in the upper third with a small margin above, three-quarter view turned toward the left of the image, looking at the viewer.
Ice League guardian Florimond, a tall man with a white beard, fur-lined mountain coat, frosty breath.
Monochrome green palette (Game Boy inspired), 4 to 5 clearly separated values from very light to very dark green, flat cel shading, crisp clusters, light coming from the top left, soft dark outline only on the shadow side.
Natural human proportions, expressive face with detailed eyes, eyebrows, nose and hair, clothes with folds and seams, the work tool held in hand, large and readable.
Plain uniform very light green background, no scenery, no ground shadow, no text, no logo, no frame, square image.
```

`gardien_4`

```
Retro 16-bit RPG character portrait, pixel art style, single character, bust shot from the top of the head to the waist, head in the upper third with a small margin above, three-quarter view turned toward the left of the image, looking at the viewer.
Ground League guardian Mathilde, an older woman, hooded earth-colored cloak, walking staff of gnarled wood.
Monochrome green palette (Game Boy inspired), 4 to 5 clearly separated values from very light to very dark green, flat cel shading, crisp clusters, light coming from the top left, soft dark outline only on the shadow side.
Natural human proportions, expressive face with detailed eyes, eyebrows, nose and hair, clothes with folds and seams, the work tool held in hand, large and readable.
Plain uniform very light green background, no scenery, no ground shadow, no text, no logo, no frame, square image.
```

Les provinces des quatre Gardiens ne sont pas fixées dans `PNJ_V2.md` : les lignes ci-dessus partent de leur type. À valider avant de générer.

### Lot 7 : vues de dos

`joueur`

```
Retro 16-bit RPG character seen from behind, bust shot from the top of the head to the waist, three-quarter back view turned toward the right of the image.
A teenage boy, cap, short hair, travel jacket, small rucksack.
Monochrome green palette (Game Boy inspired), 4 to 5 clearly separated values from very light to very dark green, flat cel shading, crisp clusters, light coming from the top left, soft dark outline only on the shadow side.
Natural human proportions, detailed hair, clothes with folds and seams.
Plain uniform very light green background, no scenery, no ground shadow, no text, no logo, no frame, square image.
```

`joueuse`

```
Retro 16-bit RPG character seen from behind, bust shot from the top of the head to the waist, three-quarter back view turned toward the right of the image.
A teenage girl, sun hat, long hair, travel jacket, small rucksack.
Monochrome green palette (Game Boy inspired), 4 to 5 clearly separated values from very light to very dark green, flat cel shading, crisp clusters, light coming from the top left, soft dark outline only on the shadow side.
Natural human proportions, detailed hair, clothes with folds and seams.
Plain uniform very light green background, no scenery, no ground shadow, no text, no logo, no frame, square image.
```

## Contrôle d'une image avant import

- Le personnage se reconnaît en vignette de 48 px.
- Le fond est uni d'un bord à l'autre.
- L'accessoire est entier et ne sort pas du cadre.
- Mains correctes : cinq doigts, aucune main en trop.
