# PNJ V2 : référentiel

Source de vérité du chantier « identité régionale des villes et des PNJ » ([prompt 1](prompt-1-villes-et-pnj.md)). [base.md](base.md) reste le document de conception d'origine : ce référentiel tranche ce qu'il laisse ouvert.

Statut : lot 0 validé (correspondance des zones, 14 classes régionales, Oswin renommé Anselme). Rien n'est encore modifié dans le jeu.

## 1. Décisions

| Sujet | Décision | Raison |
|---|---|---|
| Ampleur | On réhabille l'existant : 233 PNJ, 209 dresseurs, les classes, les panneaux. Positions, scripts, drapeaux, équipes, niveaux et récompenses restent identiques. | Même principe que le Bestiaire V2 : aucun rééquilibrage. |
| Identifiants | Les identifiants des PNJ, des dresseurs, des clés de textes et des drapeaux sont conservés. Seuls les textes affichés changent. | Les sauvegardes restent compatibles. |
| Noms de lieux | Gardés. | Demande de départ : on change l'identité, pas la carte. |
| Classes régionales | Les 31 classes génériques restent, et 14 classes régionales s'y ajoutent (section 4). Une classe régionale remplace une classe générique dans sa zone, avec la même récompense de base et la même musique. | La région se lit dès le nom du dresseur (« Goémonier Yann »), sans toucher à l'équilibrage. |
| Parler régional | Selon le personnage : les anciens et les conteurs parlent un patois marqué, les jeunes et les commerçants un français standard avec une touche régionale. | Saveur forte là où elle est crédible, lisibilité partout ailleurs. |
| Lisibilité | Une réplique reste compréhensible sans glossaire : le sens se devine, ou la phrase suivante le reformule. L'accent passe par le vocabulaire et le rythme, jamais par une orthographe déformée. | Règle 4 de `base.md` : naturel et respectueux. |
| Langues et patois | Les langues régionales (breton, gallo, corse, occitan, alsacien) ne sont pas des patois et ne se mélangent pas. Brocéliande est en pays gallo, pas bretonnant. | Exactitude, et respect des locuteurs. |
| Figures de `base.md` | Clins d'œil incarnés : un humain du jeu évoque une figure (surnom, tenue, manie), sans être la figure elle-même. Deux par zone au plus. Aucune créature du Bestiaire en PNJ. | Choix du prompt 1. Cohérent avec la règle « PNJ humains » et les exclusions du Bestiaire V2. |
| Teintes | Les tenues sont décrites en contrastes (clair, moyen, sombre, encre), car le jeu n'a que 4 teintes par palette. | Elles serviront au prompt 2. |

## 2. Correspondance des zones et des régions

Validée : Hauts-de-France regroupés avec le Grand Est à Vireval, Forge-Ardente en Occitanie.

| Zone | Lieux | Région | Fil conducteur |
|---|---|---|---|
| debut | Hameau-de-Lys, Route 1 | Centre-Val de Loire | Lys, jardins et potagers, douceur ligérienne, départ paisible |
| debut | Bourg-Sablon | Pays de la Loire | Sables et tuffeau de Loire, carrières troglodytes (arène Roche), marais salants |
| bois | Route 2, Bois Murmurant, Route 3, Grotte des Cascades | Bretagne intérieure, pays gallo | Brocéliande, landes, sabots, veillées |
| port | Port-Ondine, bateau-musée, Routes 4 et 5, pension | Bretagne littorale, pays bretonnant | Phare, goémon, fest-noz, ville d'Ys |
| port | Vireval, usine Opale | Nord-Est industriel (Grand Est, Hauts-de-France) | Mines, cheminots, estaminets, géants de carnaval, saint Nicolas |
| cendrelune | Route 6, Tunnel Obscur, Cendrelune, Tour de la Mémoire, Centrale abandonnée | Normandie | Vergers, cidre, clos-masures, abbayes et pèlerins |
| bise | Route 7, Falaises de Bise, Haute-Bise | Bourgogne-Franche-Comté | La bise du Jura, fruitières, horlogers, Vouivre |
| marais | Route 8, Marais Gris | Nouvelle-Aquitaine | Marais poitevin (Venise verte), barques plates, cagouilles |
| ombrecourt | Ombrecourt, casino, QG Opale | Île-de-France | Pavés, guinguettes, catacombes, gouaille parisienne |
| mer | Routes 9 et 10, Ilots, Bibliothèque Engloutie | Corse | Îles, maquis, corailleurs, chants polyphoniques |
| forge | Forge-Ardente, Cœur de la Forge | Occitanie | Forges catalanes des Pyrénées, orpailleurs, brèche de Roland |
| givremont | Givremont, téléphériques, Grotte Boréale | Auvergne-Rhône-Alpes | Savoie, cristalliers, fromages d'alpage, veillées d'hiver |
| ligue | Col des Échos, Grotte des Échos, Citadelle d'Azur, Pic d'Azur | Provence-Alpes-Côte d'Azur | L'Azur, Camargue, santons, Arlésiennes, Guillaume d'Orange |

Le Syndicat Opale porte le nom de la Côte d'Opale. Il est donc né dans le Nord-Est industriel, à Vireval, où se trouve sa première usine. Le fil était déjà dans le jeu, on le rend explicite.

## 3. Fiches de zone

Chaque fiche donne les métiers, les tenues, les traditions, les bestioles locales à citer, les clins d'œil et le glossaire. Le glossaire suit ces conventions :
- Colonne Statut : « ✓ » pour un usage largement documenté, « à vérifier » pour un mot à confirmer avant d'écrire le lot de la zone.
- Colonne Qui le dit : « anciens » pour le parler marqué (anciens, conteurs), « tous » pour une touche courante.
- Le tableau 3.14 indique où vérifier chaque mot.

### 3.1 Hameau-de-Lys et Route 1 : Centre-Val de Loire

- **Métiers :** jardinière, maraîcher, batelier de Loire, apicultrice, meunier. La Pr Morvan y a son labo.
- **Tenues :**
  - tablier de jardinier clair, chapeau de paille ;
  - batelier en vareuse sombre et casquette plate ;
  - femmes âgées en châle uni.
- **Traditions :** potagers et jardins de châteaux, gabares sur la Loire, fêtes des moissons.
- **Bestioles à citer :** Farfadet, Poulpiquet, Faramin, Mandragot.
- **Clin d'œil :** la voisine (`voisine`) est une marraine jardinière qui cultive des citrouilles énormes et promet qu'on peut « en faire un carrosse ». C'est Cendrillon.
- **Parler :** français ligérien posé, réputé « sans accent ». La touche régionale vient du vocabulaire du fleuve et des jardins plus que du patois.

| Mot | Sens | Qui le dit | Statut |
|---|---|---|---|
| gabare | bateau plat de Loire | tous | ✓ |
| gabarier | batelier de gabare | anciens | ✓ |
| rillettes, fouace | spécialités | tous | ✓ |

### 3.2 Bourg-Sablon : Pays de la Loire

- **Métiers :** carrier de tuffeau, paludier, tisserande, maraîcher nantais.
- **Tenues :**
  - carrier en blouse claire poudrée de tuffeau, casquette ;
  - paludière en chapeau large et tablier.
- **Traditions :** maisons troglodytes, marais salants, foires aux bestioles.
- **Bestioles à citer :** Farfadet, Faramin (Poitou-Vendée, la région voisine), Mandragot.
- **Clin d'œil :** le conteur (`maison_bourg_sablon_1`, `conteur`) raconte un seigneur à la barbe bleue et à la clef tachée, « par-delà Tiffauges ». La légende est racontée, pas incarnée : la figure est trop sombre pour un PNJ.
- **Parler :** gallo et angevin chez les anciens ; touche de l'Ouest chez les autres.

| Mot | Sens | Qui le dit | Statut |
|---|---|---|---|
| ma doué | mon Dieu (exclamation) | anciens | ✓ |
| mogette | haricot blanc de Vendée | tous | ✓ |
| chouiner | pleurnicher | tous | ✓ |
| fouace | galette briochée | tous | ✓ |

### 3.3 Bois Murmurant, Routes 2 et 3, Grotte des Cascades : Bretagne intérieure, pays gallo

- **Métiers :** sabotier, sonneur de bombarde, bûcheronne, charbonnier, conteuse de veillée.
- **Tenues :**
  - sabots, gilet sombre brodé, chapeau rond à rubans pour les sonneurs ;
  - capuchon de laine pour les bûcherons.
- **Traditions :** Brocéliande et sa fontaine, veillées, contes de la forêt.
- **Bestioles à citer :** Dame verte, Hada, Fadet, Laminak, Houlin, Bolégan, Tudgommon, Gargoulin.
- **Clin d'œil :** le randonneur de la maison de repos (`maison_route_3`, `randonneur_repos`) est un jeune homme naïf venu « de son pays de Galles » chercher « un vase qui brille » dans la forêt. C'est Perceval.
- **Parler :** gallo, langue romane de Haute-Bretagne. Pas de breton dans cette zone.

| Mot | Sens | Qui le dit | Statut |
|---|---|---|---|
| bonjou | bonjour (gallo) | anciens | à vérifier |
| ma doué | mon Dieu | anciens | ✓ |
| ribin | chemin creux (breton passé en français de Bretagne) | tous | à vérifier |
| veillée | soirée de contes | tous | ✓ |

### 3.4 Port-Ondine, Routes 4 et 5 : Bretagne littorale

- **Métiers :** goémonier, gardien de phare, pêcheuse, ramendeuse de filets, conteur.
- **Tenues :**
  - ciré clair et bottes, marinière rayée ;
  - anciennes en coiffe haute (bigoudène) et tablier sombre ;
  - kabig, le manteau à capuche, pour les marins.
- **Traditions :** fest-noz, pardons, gwerz (complaintes chantées), la ville d'Ys engloutie, le Bag noz.
- **Bestioles à citer :** Tudgommon, Morgann, Coulobrin, Laminak, Bagnoz, Goélâme, Jetin.
- **Clin d'œil :** l'apprenti marin (`maison_port_ondine_2`, `apprenti`) ne hisse jamais que deux voiles : une blanche pour le retour heureux, une noire pour le reste. C'est Tristan.
- **Parler :** breton chez les anciens, français de Bretagne pour les autres.

| Mot | Sens | Qui le dit | Statut |
|---|---|---|---|
| Demat | bonjour | tous | ✓ |
| Degemer mat | bienvenue | tous | ✓ |
| Kenavo | au revoir | tous | ✓ |
| Trugarez | merci | anciens | ✓ |
| Yec'hed mat | à ta santé | anciens | ✓ |
| Dalc'h mat | tiens bon | anciens | ✓ |
| fest-noz | fête de nuit dansée | tous | ✓ |
| gwerz | complainte chantée | anciens | ✓ |

### 3.5 Vireval et usine Opale : Nord-Est industriel

- **Métiers :** mineur, cheminot, verrier, ingénieure, tenancière d'estaminet.
- **Tenues :**
  - bleu de travail sombre, casque à lampe ;
  - casquette de cheminot ;
  - écharpe claire.
- **Traditions :** géants de carnaval, Saint-Nicolas, cités ouvrières, sidérurgie lorraine.
- **Bestioles à citer :** Gobelinet, Fouletot, Follaton, Veluchon, Graoulet (le Graoully de Metz).
- **Clin d'œil :** le professeur (`maison_vireval_2`, `professeur`) porte une longue houppelande noire. Les enfants l'appellent « le Père Fouettard », mais il ne fouette que les mauvaises réponses. Tradition lorraine de la Saint-Nicolas.
- **Parler :** picard (ch'ti) côté mine et estaminet ; touches lorraines et alsaciennes côté usine.

| Mot | Sens | Qui le dit | Statut |
|---|---|---|---|
| biloute | mon petit gars (affectueux) | anciens | ✓ |
| quinquin | petit enfant | anciens | ✓ |
| drache | grosse averse | tous | ✓ |
| estaminet | café populaire | tous | ✓ |
| Hopla ! | allez, hop ! | tous | ✓ |
| ou bien ? | n'est-ce pas ? (fin de phrase) | tous | ✓ |

### 3.6 Cendrelune, Route 6, Tunnel Obscur, Tour de la Mémoire, Centrale : Normandie

- **Métiers :** pomiculteur, jardinière de serre, sœur hospitalière, pèlerin, maraîcher.
- **Tenues :**
  - blaude (blouse ample) claire, casquette ;
  - coiffe de dentelle pour les anciennes ;
  - pèlerins en cape à coquille.
- **Traditions :** vergers et cidre, clos-masures, abbayes, pèlerinage au Mont.
- **Bestioles à citer :** Lubin, Gargoulin (la Gargouille de Rouen), Blanchin, Ankoulet, Revenant, Bugulin, Hellequet.
- **Clin d'œil :** la dame recueillie au pied de la Tour (`tour_memoire_1`, `recueillie`) est toute de blanc vêtue et ne parle que de l'abbaye de Mortemer. C'est la Dame blanche.
- **Parler :** normand, avec un « p'têt ben » prudent.

| Mot | Sens | Qui le dit | Statut |
|---|---|---|---|
| Boujou | bonjour ou au revoir | tous | ✓ |
| P'têt ben qu'oui, p'têt ben qu'non | réponse prudente | anciens | ✓ |
| ma fé | ma foi | anciens | ✓ |
| mucher | cacher | anciens | ✓ |
| goule | bouche | anciens | ✓ |
| bère | cidre | anciens | ✓ |
| teurgoule | riz au lait à la cannelle | tous | ✓ |

### 3.7 Haute-Bise, Route 7, Falaises de Bise : Bourgogne-Franche-Comté

- **Métiers :** fruitier (fromager du Comté), horloger, schlitteur, vigneronne, guide des falaises.
- **Tenues :**
  - tablier de fromager clair, bonnet ;
  - horloger avec loupe vissée à l'œil ;
  - écharpe épaisse contre la bise.
- **Traditions :** fruitières coopératives, horlogerie du Haut-Doubs, Vouivre et son escarboucle, cancoillotte.
- **Bestioles à citer :** Cabrillon, Serpvolin, Koril, Hellequet, Bayard, la Vouivre (racontée).
- **Clin d'œil :** le collectionneur d'échanges (`maison_haute_bise_2`, `collectionneur`) se fait appeler « maître Renart ». Il est trop poli pour être honnête, mais l'échange qu'il propose est juste.
- **Parler :** franc-comtois.

| Mot | Sens | Qui le dit | Statut |
|---|---|---|---|
| ça me ferait mal | ça m'étonnerait | tous | ✓ |
| y (« je vais y faire ») | le, ça | tous | ✓ |
| beuiller | regarder | anciens | à vérifier |
| cheni | désordre, poussière | anciens | ✓ |
| la bise | vent froid du nord-est | tous | ✓ |

### 3.8 Marais Gris, Route 8 : Nouvelle-Aquitaine

- **Métiers :** batelier maraîchin, pêcheuse d'anguilles, vannière, éleveur de baudets.
- **Tenues :**
  - béret, gilet ;
  - pigouille (perche de batelier) ;
  - coiffe charentaise (quichenotte) pour les anciennes.
- **Traditions :** Venise verte, barques plates, Mélusine de Lusignan, mogettes et cagouilles.
- **Bestioles à citer :** Galipotin et Galipote (Saintonge), Lavandière, Magou, Graoulet, Mélusine (racontée).
- **Clin d'œil :** la fillette de la cabane (`maison_marais_gris`, `fillette`) porte un capuchon rouge et traverse le marais pour porter une galette à sa mère-grand. Elle se méfie « des loups et des loups-garous ». C'est le Petit Chaperon rouge.
- **Parler :** poitevin-saintongeais ; gascon chez quelques voyageurs.

| Mot | Sens | Qui le dit | Statut |
|---|---|---|---|
| drôle, drôlesse | garçon, fille | tous | ✓ |
| cagouille | escargot | tous | ✓ |
| pigouille | perche du batelier | anciens | ✓ |
| plate | barque du marais | tous | ✓ |
| faire chabrot | verser du vin dans sa soupe (Périgord) | anciens | ✓ |
| Adishatz | salut, adieu (gascon) | voyageurs | ✓ |

### 3.9 Ombrecourt, casino, QG Opale : Île-de-France

- **Métiers :** titi des pavés, cataphile, croupier, chanteuse de guinguette, bouquiniste.
- **Tenues :**
  - casquette gavroche, foulard noué ;
  - canotier, gilet sombre ;
  - lampe frontale pour les cataphiles.
- **Traditions :** guinguettes des bords de Marne, catacombes, Moine bourru des nuits de l'Avent.
- **Bestioles à citer :** Matagri, Drapet, Birette, Moinillon, Sotrin, Ankou.
- **Clins d'œil :**
  - la « chatte » (`maison_ombrecourt_1`) est une gamine en bottes de cuir trop grandes, rusée comme un chat. C'est le Chat botté.
  - le noctambule (`ombrecourt`, `noctambule`) jure que tout le quartier appartient à « Monsieur le marquis ». C'est Carabas.
- **Parler :** gouaille parisienne ; argot ancien, sans vulgarité.

| Mot | Sens | Qui le dit | Statut |
|---|---|---|---|
| môme | enfant | tous | ✓ |
| bath | beau, chic | anciens | ✓ |
| le zinc | le comptoir du bistrot | anciens | ✓ |
| guinguette | bal populaire en bord de rivière | tous | ✓ |
| gouailleur | moqueur, à la parole facile | tous | ✓ |

### 3.10 Routes 9 et 10, Ilots, Bibliothèque Engloutie : Corse

- **Métiers :** corailleur, berger d'île, chanteuse de paghjella, gardienne de tour génoise, pêcheur de langoustes.
- **Tenues :**
  - velours côtelé sombre, berretta (bonnet) ;
  - châle noir pour les anciennes ;
  - bâton de berger.
- **Traditions :** chants polyphoniques, tours génoises, maquis, mazzeri (rêveurs de chasse nocturne, figure humaine attestée).
- **Bestioles à citer :** Fullettu (corse), Sirénéa, Nainmarin, Goélâme, Bagnoz, Mélusineau.
- **Clin d'œil :** l'hôtesse de la maison de repos (`maison_ilots`, `hotesse`) « rêve la mer » chaque nuit et dit au joueur où il trouvera des bestioles. C'est une mazzera, montrée avec douceur : pas de présages de mort.
- **Parler :** corse.

| Mot | Sens | Qui le dit | Statut |
|---|---|---|---|
| Bonghjornu | bonjour | tous | ✓ |
| Iè | oui | tous | ✓ |
| Avà | maintenant | anciens | ✓ |
| Aiò ! | allez ! | tous | ✓ |
| Pace e salute | paix et santé (vœu) | anciens | ✓ |
| macchja | maquis | anciens | ✓ |
| missiavu | grand-père | anciens | à vérifier |

### 3.11 Forge-Ardente, Cœur de la Forge : Occitanie

- **Métiers :** forgeron de forge catalane, orpailleuse de l'Ariège, berger transhumant, charbonnière.
- **Tenues :**
  - tablier de cuir sombre ;
  - taillole (ceinture de flanelle) ;
  - béret.
- **Traditions :** forges catalanes, orpaillage, transhumance, brèche de Roland.
- **Bestioles à citer :** Babauet et Babau (Nîmes), Goulinet, Taurnoir, Mallet, Lébérou.
- **Clin d'œil :** le vieux forgeron (`forge_ardente`, `forgeron_vieux`) affirme que son aïeul a reforgé l'épée qui fendit la montagne en deux. C'est Roland et la brèche de Roland.
- **Parler :** occitan (languedocien), avec quelques tournures du Midi.

| Mot | Sens | Qui le dit | Statut |
|---|---|---|---|
| Adieu | bonjour (salutation du Midi) | tous | ✓ |
| Boudu ! | eh bien ! | tous | ✓ |
| Macarel ! | juron (registre familier) | anciens | ✓ |
| pitchoun | petit, enfant | tous | ✓ |
| le cagnard | soleil écrasant | tous | ✓ |
| farga | forge (catalan, occitan) | anciens | à vérifier |

### 3.12 Givremont, téléphériques, Grotte Boréale : Auvergne-Rhône-Alpes

- **Métiers :** cristallier, guide de haute montagne, fromagère d'alpage, moniteur de ski, gardienne de refuge.
- **Tenues :**
  - pull à motifs, bonnet à pompon ;
  - piolet et corde pour les cristalliers ;
  - tablier de fromager.
- **Traditions :** alpages, veillées d'hiver, la vogue (fête de village), Barbegazi et Dahu racontés.
- **Bestioles à citer :** Barbegel et Barbegazi (Savoie), Vosgoup, Dahu, Cabro d'Or, Gévaudan.
- **Clin d'œil :** le vieil homme (`maison_givremont_1`, `vieil_homme`) est un géant bon vivant qui finit une fondue pour douze à lui seul et prétend qu'une dent de la montagne porte son nom. C'est Gargantua.
- **Parler :** savoyard et lyonnais.

| Mot | Sens | Qui le dit | Statut |
|---|---|---|---|
| Adieu | bonjour (Savoie) | tous | ✓ |
| y (« je vais y faire ») | le, ça | tous | ✓ |
| gone | enfant (Lyon) | tous | ✓ |
| la vogue | fête de village | tous | ✓ |
| cheni | désordre | anciens | ✓ |

### 3.13 Col et Grotte des Échos, Citadelle d'Azur, Pic d'Azur : Provence-Alpes-Côte d'Azur

- **Métiers :** gardian de Camargue, santonnière, lavandiculteur, tambourinaire, savonnier.
- **Tenues :**
  - chapeau de gardian à bord large, veste de velours ;
  - costume d'Arlésienne (fichu, coiffe à ruban) ;
  - panier de lavande.
- **Traditions :** santons, farandole, galéjades, Tarasque de Tarascon, Guillaume d'Orange.
- **Bestioles à citer :** Tarasque, Cabro d'Or, Alicorne, Gaussier, Draguignan.
- **Clin d'œil :** le guide de la Citadelle (`citadelle_azur`, `guide_citadelle`) est un vieux chevalier errant au nez cabossé qui se présente comme « Guillaume, du côté d'Orange ». C'est Guillaume au court nez.
- **Parler :** provençal.

| Mot | Sens | Qui le dit | Statut |
|---|---|---|---|
| Peuchère ! | le pauvre ! (compassion) | tous | ✓ |
| Fan de chichourle ! | exclamation de surprise | anciens | ✓ |
| Boulégan ! | bougeons ! | tous | ✓ |
| galéjade | histoire exagérée | tous | ✓ |
| Adessias | au revoir | anciens | ✓ |
| Ô bonne mère ! | exclamation (Marseille) | tous | ✓ |

### 3.14 Où vérifier les mots marqués « à vérifier »

| Langue ou variété | Ouvrages |
|---|---|
| Français régional | Pierre Rézeau, *Dictionnaire des régionalismes de France* (2001) ; Wiktionnaire. |
| Breton | Francis Favereau, *Dictionnaire du breton contemporain*. |
| Gallo | Bertègn Galèzz, ressources de l'Institut du Galo. |
| Corse | Dictionnaires de l'ADECEC, banque de données INFCOR. |
| Occitan | Louis Alibert, *Dictionnaire occitan-français* ; dictionnaires du Congrès permanent de la lenga occitana. |

## 4. Classes de dresseurs

### 4.1 Classes génériques conservées

Ces classes restent sous leur nom actuel, car elles fonctionnent partout :
- Gamin, Fillette, Écolier ;
- Randonneur, Randonneuse, Campeur, Campeuse ;
- Nageur, Nageuse, Marin, Motard ;
- Scientifique, Chercheuse, Dresseur, Dresseuse ;
- Gentleman, Dame, Mystique, Danseuse.

Pêcheur, Ouvrier et Montagnard restent aussi en dehors des zones où une classe régionale les remplace.

Les classes de l'intrigue gardent leur nom : Sbire Opale, Lieutenant, Fondateur, Champion, Championne, Gardien, Gardienne, et la rivale (nom seul).

### 4.2 Classes régionales (validées)

Chacune reprend la récompense de base et la musique de la classe qu'elle remplace. Les dresseurs concernés changent de classe, mais pas d'identifiant ni d'équipe.

| Zone | Classe (masculin / féminin) | Remplace | Dresseurs concernés |
|---|---|---|---|
| Bourg-Sablon | Carrier / Carrière | Montagnard, Randonneur | arène Roche (Basile, Gaspard, Inès) |
| Bois | Sonneur / Sonneuse | Campeur, Campeuse | Bois Murmurant (Jules, Margot, Basile, Solène) |
| Port-Ondine, Routes 4 et 5 | Goémonier / Goémonière | Pêcheur | Gaston, René, Marcel, Alain |
| Vireval | Cheminot / Cheminote | Ouvrier | Rémi (arène Foudre) |
| Tunnel Obscur | Mineur / Mineure | Ouvrier, Montagnard | Firmin, Lucien, Gilles, Hector |
| Tour de la Mémoire | Miquelot / Miquelotte (pèlerin du Mont) | Mystique | Amandine, Sidonie, Ernest, Bérénice, Honoré |
| Arène Flore | Jardinier / Jardinière | Dame, Gentleman | Hortense, Achille |
| Haute-Bise, Falaises | Horloger / Horlogère | Scientifique | Octave |
| Haute-Bise, Falaises | Fruitier / Fruitière | Montagnard | Lothaire, Ferdinand |
| Marais Gris | Maraîchin / Maraîchine | Pêcheur, Nageur, Nageuse | Odilon, Baltazar, Corentin, Élodie |
| Ombrecourt | Cataphile (épicène) | Dresseur | Ludovic, Barnabé |
| Routes 9 et 10, Ilots | Corailleur / Corailleuse | Pêcheur | Léopold, Gontran, Anselme, Tancrède |
| Forge-Ardente | Forgeron / Forgeronne | Ouvrier | Tiburce, Balthazar, Léandre |
| Col des Échos, Citadelle | Gardian / Gardiane | Montagnard, Randonneur | Valentin, Éliacin |

Tous les noms font 12 caractères au plus. Décision du lot 1 : pas de féminin douteux (« Carrière », « Miquelotte », « Mineure »). Une dresseuse sans féminin attesté garde sa classe générique.

Ces 14 classes ajoutent 14 portraits au prompt 2, en plus des féminins qui partagent une silhouette.

### 4.3 Anomalies relevées, à corriger au lot 1

| Dresseur | Classe actuelle | Correction proposée |
|---|---|---|
| `nageuse_maelle`, `nageuse_pomme`, `nageuse_ysaline`, `nageuse_oriane` | Nageur | Nageuse |
| `randonneuse_clothilde`, `randonneuse_ottilie` | Campeuse | Randonneuse |
| `dresseur_eliacin`, `dresseur_sylvain`, `dresseur_aldric`, `dresseur_wolfram` | Randonneur | Dresseur, ou la classe régionale de la zone |
| `forgeron_balthazar` | Ouvrier | Forgeron |
| `archimage_gaspard` | Mystique | à garder ; l'identifiant seul est trompeur |

## 5. Noms des dresseurs

Les prénoms changent zone par zone, au lot de la zone, en piochant dans ces réserves. On garde un prénom actuel quand il est déjà régional (Maël, Nolwenn, Gwenaëlle, Corentin).

| Région | Prénoms masculins | Prénoms féminins |
|---|---|---|
| Centre-Val de Loire | Gatien, Martin, Florent | Agnès, Jeanne, Solange |
| Pays de la Loire | Mathurin, Aimé, Clément | Perrine, Anne, Mélanie |
| Bretagne | Yann, Erwan, Gwenaël, Loïc, Tanguy | Nolwenn, Gwenola, Annaïg, Maïwenn, Soizic |
| Nord-Est | Gaston, Florimond, Hubert, Joseph | Thérèse, Odile, Marthe, Germaine |
| Normandie | Guillaume, Rollon, Onfroy, Thibault | Mathilde, Emma, Adèle, Héloïse |
| Bourgogne-Franche-Comté | Claude, Désiré, Hippolyte, Lothaire | Clémence, Bernadette, Philiberte |
| Nouvelle-Aquitaine | Bertrand, Jean-Pierre, Peyo | Aliénor, Mariette, Nadine |
| Île-de-France | Gavroche, Victor, Lucien, Ludovic | Colombe, Ginette, Mimi, Paulette |
| Corse | Ghjuvanni, Petru, Orsu, Santu | Ghjulia, Maria, Letizia, Saveria |
| Occitanie | Bernat, Ramon, Pèire, Joan | Esclarmonde, Marieta, Joana |
| Auvergne-Rhône-Alpes | Hilaire, Gratien, Maurice, Joseph | Bernadette, Suzon, Héloïse |
| Provence-Alpes-Côte d'Azur | Marius, Frédéri, Titin | Fanny, Mireille, Magali, Vincènte |

Marius et Fanny sont des prénoms provençaux courants. On les garde comme prénoms, sans reprendre les personnages de Pagnol.

## 6. Personnages principaux

Aucun renommage n'est appliqué sans accord explicite, au cas par cas.

| Personnage | Rôle | Ancrage proposé | Nom |
|---|---|---|---|
| Pr Morvan | Professeure, Bestiaire | Le Morvan est un massif bourguignon : elle vient d'ailleurs et a choisi les jardins de Loire pour son labo. | Garder |
| La rivale | Rivale, Maîtresse de la Ligue | Voisine du Hameau, même région que le joueur. | Nom choisi par le joueur, inchangé |
| Corvin | Fondateur du Syndicat Opale | Ancien maître de forges du Nord-Est. Le Syndicat naît à Vireval (Côte d'Opale) et rêve d'industrialiser les terres à légendes. | Garder |
| Lieutenants Brisac, Gerfaut, Sorel, Aubane | Sbires gradés | Recrutés dans les régions qu'ils occupent. | Garder |
| Garance | Championne Roche, Bourg-Sablon | Carrière de tuffeau ; la garance est une plante tinctoriale de l'Ouest. | Garder |
| Maël | Champion Eau, Port-Ondine | Goémonier ; prénom breton. | Garder |
| Sélène | Championne Foudre, Vireval | Ingénieure des cités ouvrières. | Garder |
| Aubin | Champion Flore, Cendrelune | Pomiculteur, serres et vergers normands. | Garder |
| Ysolde | Championne Vent, Haute-Bise | Gardienne des crêtes du Jura, voix de la bise. Prénom arthurien (Iseut) : clin d'œil discret. | Garder |
| Lazare | Champion Ombre, Ombrecourt | Cataphile ; Saint-Lazare, gare et quartier de Paris. | Garder |
| Brune | Championne Feu, Forge-Ardente | Forgeronne de forge catalane. | Garder |
| Anselme (ex-Oswin) | Champion Arcane, Givremont | Cristallier savoyard ; saint Anselme d'Aoste. | Renommé Anselme (validé). Seul le nom affiché change : l'identifiant `oswin` est conservé. Le Pêcheur Anselme de la Route 10 change de prénom au lot 6 pour éviter le doublon. |
| Aldebert, Ségolène, Florimond, Mathilde | Gardiens de la Ligue | Quatre provinces réunies à la Citadelle. | Garder |

## 7. PNJ récurrents

Ces rôles reviennent dans chaque ville : on les décline par région, sans changer leur fonction.

| Rôle | Principe |
|---|---|
| Infirmière de la Halte | Même phrase d'accueil partout. Une seule touche régionale, à l'arrivée (« Demat ! », « Boujou ! », « Bonghjornu ! »). |
| Vendeur du Comptoir | Français standard et une spécialité locale citée (« Fouace fraîche ? Non, juste des Capsules. »). |
| Conteur ou ancien de chaque ville | Parler marqué. Il raconte la légende de la bestiole emblématique de la zone. |
| Réactions après `syndicat_dissous` | Chaque ville réagit avec son expression (« Ma doué, enfin ! », « Peuchère, ils sont partis ? »). |

## 8. Plan des lots

| Lot | Contenu | État |
|---|---|---|
| 0 | Ce référentiel | Validé |
| 1 | Classes : 17 classes ajoutées (14 régionales et 3 féminins), 46 dresseurs reclassés, anomalies de la section 4.3 corrigées, récompenses inchangées | Fait |
| 2 | Zone debut (Hameau-de-Lys, Route 1, Bourg-Sablon) | Fait |
| 3 | Zones bois et port | Fait |
| 4 | Zones cendrelune (avec la Centrale) et bise | Fait |
| 5 | Zones marais et ombrecourt | Fait |
| 6 | Zones mer, forge et givremont | Fait |
| 7 | Ligue, post-jeu, réactions, textes communs | Fait |
| 8 | Relecture, `WORLD_MAP.md`, `PROGRESS.md` | À faire |

## 8 bis. Lot 1 : contenu (fait)

### Principe

- 17 classes ajoutées dans `trainer-classes.js` : les 14 classes régionales, plus 3 féminins (Sonneuse, Jardinière, Maraîchine). « Carrière » et « Miquelotte » sont écartés (décision du lot 1) : Inès reste Randonneuse, Amandine, Sidonie et Bérénice restent Mystiques. Les autres classes n'ont que des dresseurs masculins.
- Portrait provisoire : chaque nouvelle classe reprend le portrait de la classe qu'elle remplace, jusqu'au prompt 2.
- Récompenses identiques : quand la récompense de base de la nouvelle classe diffère de l'ancienne, le dresseur reçoit un champ `moneyBase` qui garde l'ancienne valeur. `battle-setup.js` lit `trainer.moneyBase` avant celle de la classe (une ligne de code).
- Seul le champ `class` des dresseurs change. Identifiants, noms, équipes et drapeaux restent identiques ; les prénoms changent aux lots de zone.

### Nouvelles classes

| Classe | Base | Portrait provisoire |
|---|---:|---|
| Carrier | 35 | montagnard |
| Sonneur / Sonneuse | 20 | campeur / campeuse |
| Goémonier | 35 | pecheur |
| Cheminot | 30 | ouvrier |
| Mineur | 30 | ouvrier |
| Miquelot | 40 | mystique |
| Jardinier / Jardinière | 70 | gentleman / dame |
| Horloger | 50 | scientifique |
| Fruitier | 35 | montagnard |
| Maraîchin / Maraîchine | 35 | pecheur / nageuse |
| Cataphile | 40 | dresseur |
| Corailleur | 35 | pecheur |
| Forgeron | 30 | ouvrier |
| Gardian | 35 | montagnard |

### Dresseurs reclassés

| Dresseurs | Avant | Après | Récompense gardée par `moneyBase` |
|---|---|---|---|
| Basile, Gaspard (arène Roche) | Randonneur, Montagnard | Carrier | Basile : 30 |
| Jules, Basile (Bois Murmurant) | Campeur | Sonneur | non |
| Margot, Solène (Bois Murmurant) | Campeuse | Sonneuse | non |
| Gaston, René, Marcel, Alain | Pêcheur | Goémonier | non |
| Rémi (arène Foudre) | Ouvrier | Cheminot | non |
| Firmin, Lucien, Gilles, Hector (Tunnel Obscur) | Ouvrier, Montagnard | Mineur | Gilles, Hector : 35 |
| Ernest, Honoré (Tour) | Mystique | Miquelot | non |
| Achille, Hortense (arène Flore) | Gentleman, Dame | Jardinier, Jardinière | non |
| Octave (Falaises) | Scientifique | Horloger | non |
| Lothaire, Ferdinand | Montagnard | Fruitier | non |
| Odilon, Baltazar, Corentin | Pêcheur, Nageur | Maraîchin | Corentin : 25 |
| Élodie | Nageuse | Maraîchine | 25 |
| Ludovic, Barnabé | Dresseur | Cataphile | non |
| Léopold, Gontran, Anselme, Tancrède | Pêcheur | Corailleur | non |
| Tiburce, Balthazar, Léandre, Sylvain (forge) | Ouvrier, Randonneur | Forgeron | non |
| Valentin, Éliacin (Col des Échos) | Montagnard, Randonneur | Gardian | Éliacin : 30 |

### Anomalies corrigées

| Dresseurs | Avant | Après | Récompense gardée |
|---|---|---|---|
| Maëlle, Pomme, Ysaline, Oriane | Nageur | Nageuse | non (même base) |
| Clothilde, Ottilie | Campeuse | Randonneuse | 20 |
| Aldric, Wolfram | Randonneur | Dresseur | 30 |

### Contrôles

`npm run validate`, `npm run check-text`, `npm test`, puis une capture de l'intro d'un combat par nouvelle classe (nom de classe affiché).

## 8 ter. Lot 2 : contenu (fait)

Zone debut, 102 textes de `src/data/texts/debut.js`, 6 prénoms de dresseurs dans `src/data/trainers/debut.js`. Les clés, scripts et drapeaux ne changent pas.

### Principes

- **Textes de l'intrigue** (Maman, Pr Morvan, rivale, labo, premier combat) : même contenu, même déroulé. Seulement une touche locale, comme les jardins et la Loire.
- **Textes de tutoriel** (capture, Haltes, terminal, dalles de l'arène) : la même information, reformulée dans la voix du personnage.
- **Hameau-de-Lys et Route 1**, en Centre-Val de Loire :
  - les lys et les potagers ;
  - le pêcheur devient batelier de gabare ;
  - la voisine devient la marraine jardinière aux citrouilles (clin d'œil à Cendrillon).
- **Bourg-Sablon**, en Pays de la Loire :
  - le tuffeau, les maisons troglodytes et les marais salants ;
  - les anciens (garde, dame, vieux de la Halte, conteur) parlent de façon marquée (« Ma doué ») ;
  - le conteur raconte le seigneur à la barbe bleue de Tiffauges, et garde en seconde page l'annonce de la bestiole du Pic d'Azur.
- **Arène Roche :**
  - les Carriers taillent le tuffeau ;
  - Garance est carrière de métier ;
  - la Pierre Lunaire vient toujours de sa carrière.

### Prénoms

| Dresseur | Avant | Après |
|---|---|---|
| Route 1, Gamin | Théo | Gatien |
| Route 1, Fillette | Lise | Agnès |
| Route 1, Écolier | Marius | Florent |
| Arène Roche, Carrier | Basile | Mathurin |
| Arène Roche, Carrier | Gaspard | Aimé |
| Arène Roche, Randonneuse | Inès | Perrine |

### Exemples de répliques

| PNJ | Proposition |
|---|---|
| Voisine (Hameau) | « Ma citrouille grossit à vue d'œil. Avec un coup de baguette, on en ferait un carrosse ! » |
| Batelier (Hameau) | « Ma gabare reste à quai aujourd'hui. Les bestioles de la mare se cachent. » |
| Garde (Bourg-Sablon) | « Ma doué, petit ! Sans Bestiaire, tu vas te perdre dans le Bois Murmurant. » |
| Conteur (Bourg-Sablon) | « Par-delà Tiffauges vivait un seigneur à la barbe bleue. Une clef tachée, une porte interdite… La suite à la prochaine veillée ! » |
| Carrier Aimé | « Trente ans à tailler le tuffeau. Toi, tu ne passeras pas ! » |

### Contrôles

`npm run validate`, `npm run check-text` et `npm test`, puis captures de quelques dialogues (voisine, conteur, Garance).

## 8 quater. Lot 3 : contenu (fait)

Zones bois et port : 97 textes de `bois.js`, 166 de `port.js`, 46 prénoms de dresseurs. Les clés, scripts et drapeaux ne changent pas. Trois régions sont concernées : la Bretagne intérieure (gallo), la Bretagne littorale (breton) et le Nord-Est industriel (Vireval).

### Principes

- **Bretagne intérieure** (Routes 2 et 3, Bois Murmurant, Grotte des Cascades) :
  - forêt de contes, sabotiers, sonneurs, veillées, lait ribot ;
  - les anciens parlent gallo, sans un mot de breton ;
  - clin d'œil : Perceval, le randonneur naïf de la maison de repos.
- **Bretagne littorale** (Port-Ondine, bateau-musée, Routes 4 et 5, pension) :
  - phare, goémon, fest-noz, ville d'Ys ;
  - les anciens glissent des mots bretons, les autres un « Kenavo » ou un « Demat » ;
  - clin d'œil : Tristan, l'apprenti aux voiles blanche et noire ;
  - Maël, goémonier, mène l'arène Eau.
- **Vireval et usine Opale** :
  - mine, cheminots, estaminet, drache ;
  - les anciens parlent ch'ti (« biloute »), l'usine a des touches lorraines (« Hopla ! ») ;
  - clin d'œil : le professeur que les enfants surnomment « le Père Fouettard » ;
  - Sélène est ingénieure des cités ouvrières.
  - Le Syndicat Opale y est né : les habitants s'en souviennent.
- On n'emploie que les mots marqués ✓ dans les glossaires. Les mots « à vérifier » (bonjou, ribin) attendent une confirmation et ne sont pas utilisés.
- Textes de l'intrigue (rivale 2, Syndicat au Bois, usine, Lanterne) et de tutoriel (pension, échanges, Machette) : même contenu, voix régionale.

### Prénoms

| Lieu | Changements |
|---|---|
| Route 2 | Bastien → Loïc, Lison → Maïwenn, Hugo → Ronan, Inès → Gwenola, Timothée → Tanguy |
| Bois Murmurant | Jules → Yannick, Rose → Soizic, Margot → Katell, Basile → Erwan, Solène → Enora, Capucine → Rozenn (sbires Brice et Odile inchangés) |
| Route 3 | Anatole → Goulven, Marcel → Jakez, Gilles → Gwénolé, Armand → Hervé, Alix → Aziliz, Noé → Malo |
| Grotte des Cascades | Yves (inchangé), Gaston → Riwal, Léonie → Gaïd, Firmin → Tugdual, Auguste → Paol, Bérénice → Bleuenn, Lucien → Herlé |
| Port-Ondine, bateau-musée, arène Eau | Gaston → Youenn, Yves → Job, Hugo → Glenn, Théo → Kilian, René → Fañch |
| Route 4 | Bastien → Iwan, Clara → Klervi, Marcel → Mikael, Alain (inchangé), Inès → Gwenn, Julie → Maëlys, Gilles → Pêr |
| Route 5 | Noé → Brendan, Maya → Anaëlle, Paul → Pol, Éva → Azenor, Lucas → Eliaz, Kévin (inchangé), Hippolyte → Armel |
| Vireval, usine Opale | Adèle → Thérèse, Rémi → Hubert, Gaspard → Joseph, Léa → Marthe (Ohmer, Brisac, Sélène et les sbires inchangés) |

### Exemples de répliques

| PNJ | Proposition |
|---|---|
| Hôtesse, maison de repos (Route 3) | « Entre donc, mon gars. Ici, on se repose comme à la veillée : un bol de lait ribot et une histoire de la forêt. » |
| Randonneur au repos (Perceval) | « Je viens de loin chercher un vase qui brille. On dit qu'il dort dans ce bois. Tu l'as vu, toi ? » |
| Gardien du phare | « Demat ! Mon phare veille sur le port depuis deux siècles. Dalc'h mat, qu'on se dit les nuits de brume : tiens bon. » |
| Apprenti marin (Tristan) | « Voile blanche si tout va bien, voile noire sinon. Pour l'instant, c'est toujours la blanche ! » |
| Contremaître (Vireval) | « Eh, biloute ! Avec cette drache, l'usine tourne à vide. Le Syndicat avale tout le courant. » |
| Professeur (Vireval) | « Les gamins m'appellent le Père Fouettard. Je ne fouette que les mauvaises réponses. Hopla, au travail ! » |

### Contrôles

`npm run validate`, `npm run check-text` et `npm test`, puis captures de quelques dialogues (phare, Perceval, contremaître).

## 8 quinquies. Lot 4 : contenu (fait)

Zones cendrelune (avec la Centrale) et bise :
- textes : 134 de `cendrelune.js`, 100 de `bise.js`, 16 de `centrale.js` ;
- 38 prénoms de dresseurs.

Les clés, scripts et drapeaux ne changent pas. Deux régions sont concernées : la Normandie et la Bourgogne-Franche-Comté.

### Principes

- **Normandie** (Route 6, Tunnel Obscur, Cendrelune, Tour de la Mémoire, Centrale abandonnée) :
  - vergers, cidre (« bère »), teurgoule, clos-masures, serres, abbayes et pèlerins du Mont ;
  - les anciens parlent normand (« Boujou », « Ma fé », « P'têt ben qu'oui, p'têt ben qu'non »).
  - Le Tunnel Obscur devient une ancienne mine de fer, où travaillent les mineurs.
  - Clin d'œil : la Dame blanche, la dame recueillie au pied de la Tour.
  - Aubin est pomiculteur et serriste.
- **Bourgogne-Franche-Comté** (Route 7, Falaises de Bise, Haute-Bise, téléphérique) :
  - la bise du Jura, les fruitières, les horlogers, la cancoillotte ;
  - la Vouivre et son escarboucle, racontées par les anciens ;
  - les anciens parlent franc-comtois (« ça me ferait mal », « y » pour « le », « cheni »).
  - Clin d'œil : « maître Renart », le collectionneur d'échanges.
  - Ysolde garde les crêtes, voix de la bise.
- On n'emploie que les mots marqués ✓. « Beuiller » attend une confirmation.
- Les textes de l'intrigue gardent leur contenu, avec une voix régionale. Ils concernent la Tour, Corvin et Gerfaut, la rivale 3 et 4, le Grappin, les Gants de Force et le téléphérique.

### Prénoms

| Lieu | Changements |
|---|---|
| Route 6 | Gaspard → Guillaume, Ninon → Emma, Tristan → Onfroy (Tristan reste à l'apprenti de Port-Ondine), Basile → Thibault, Margaux → Héloïse, Éloi → Richard, Capucine → Aelis |
| Tunnel Obscur | Gilles → Robert, Firmin (inchangé), Ophélie → Gunnor, Hector → Raoul, Lucien → Gautier |
| Arène Flore | Hortense (inchangée), Achille → Rollon, Lison → Bertrade |
| Tour de la Mémoire | Amandine → Ermengarde, Sidonie → Sibylle, Bérénice → Odeline, Miquelot Ernest → Michel, Miquelot Honoré → Aubert (saint Aubert, fondateur du Mont) ; sbires et Gerfaut inchangés |
| Centrale abandonnée | Gédéon, Baptistin, Léopoldine, Germain inchangés |
| Route 7 | Ulysse → Claude, Baptiste → Désiré, Lothaire (inchangé), Perrine → Philiberte, Cyprien → Bénigne, Zélie → Bernadette |
| Falaises de Bise | Romane → Colette, Aurélien → Gustave, Ferdinand, Clémence, Octave et Agathe inchangés, Léandre → Jules, Ambroise → Abel |
| Arène Vent | Mirabelle et Hugues inchangés, Oscar → Félicien, Basile → Vivant |

### Exemples de répliques

| PNJ | Proposition |
|---|---|
| Dame recueillie (Tour) | « Je viens de l'abbaye de Mortemer, toute de blanc vêtue. Ma fé, on me croit fantôme. Je prie seulement pour ceux de la Tour. » |
| Jardinier (Cendrelune) | « Boujou ! Mes pommiers donnent la meilleure bère du pays. P'têt ben qu'oui, p'têt ben qu'non : goûte, et tu diras. » |
| Miquelot Aubert | « Je monte la Tour comme on monte au Mont : pas à pas, et en surveillant la marée. » |
| Ancien (Haute-Bise) | « La bise souffle depuis toujours. Ça me ferait mal qu'elle s'arrête ! La Vouivre, elle, dort sous la crête avec son escarboucle. » |
| Collectionneur (maître Renart) | « On m'appelle maître Renart. Trop poli pour être honnête, qu'ils disent. Mais mes échanges sont justes, foi de collectionneur. » |
| Fruitier Lothaire | « Je monte le lait à la fruitière tous les matins. Un combat, c'est plus vite fait qu'une meule de fromage ! » |

### Contrôles

`npm run validate`, `npm run check-text` et `npm test`, puis captures de quelques dialogues (Dame blanche, ancien de Haute-Bise, maître Renart).

## 8 sexies. Lot 5 : contenu (fait)

Zones marais et ombrecourt :
- textes : 55 de `marais.js`, 120 de `ombrecourt.js` ;
- 21 prénoms de dresseurs.

Les clés, scripts et drapeaux ne changent pas. Deux régions sont concernées : la Nouvelle-Aquitaine et l'Île-de-France.

### Principes

- **Nouvelle-Aquitaine** (Route 8, Marais Gris) :
  - Venise verte, plates et pigouilles, cagouilles et mojhettes, Mélusine de Lusignan ;
  - la Galipote rôde la nuit ;
  - les anciens parlent poitevin-saintongeais (« drôle », « cagouille ») ; un voyageur gascon salue d'un « Adishatz ».
  - Clin d'œil : le Petit Chaperon rouge, la fillette de la cabane.
  - Le pêcheur qui donne la Bouée devient batelier maraîchin.
- **Île-de-France** (Ombrecourt, casino, QG Opale) :
  - pavés, guinguettes, catacombes, bouquinistes, Moine bourru ;
  - gouaille parisienne et argot ancien sans vulgarité (« môme », « bath », « le zinc »).
  - Clins d'œil : le Chat botté (la « chatte » de la maison 1) et le marquis de Carabas (le noctambule).
  - Lazare, cataphile, connaît chaque galerie sous la ville.
- On n'emploie que les mots marqués ✓.
- Les textes de l'intrigue gardent leur contenu, avec une voix régionale. Ils concernent la Bouée, Lazare et la Clé Sous-Sol, le casino, le QG Opale, la rivale 5, Corvin, le Cerf-volant et le port.

### Prénoms

| Lieu | Changements |
|---|---|
| Route 8 | Léon → Arnaud, Aurélie → Aliénor, Hector → Bertrand, Fulbert (inchangé), Joëlle → Mariette, Marius → Peyo, Philomène → Radegonde |
| Marais Gris | Odilon et Prosper inchangés, Baltazar → Aimeric, Corentin → Jean-Pierre, Élodie → Nadine, Adèle → Lucette, Viviane → Solange (Viviane évoquait la fée sans le vouloir) |
| Ombrecourt, casino | Colombe et Ludovic inchangés, Romuald → Victor, Valentin → Lucien (un Gardian Valentin existe au Col des Échos), Victoire → Ginette |
| Arène Ombre | Barnabé inchangé, Céleste → Paulette, Morgane → Mimi (Morgane évoquait la fée sans le vouloir) |
| QG Opale | sbires, Sorel et Corvin inchangés |

### Exemples de répliques

| PNJ | Proposition |
|---|---|
| Fillette de la cabane (Chaperon rouge) | « Je porte une galette à ma mère-grand, de l'autre côté du marais. Les loups, je m'en méfie. Les loups-garous, encore plus ! » |
| Batelier de la cabane | « Avec ma plate et ma pigouille, je passe partout dans le marais. Pour toi, drôle, ce sera la Bouée. » |
| Vieil homme du Marais Gris | « Les cagouilles sortent après la pluie, et les Galipotes après minuit. Ferme bien ta porte, drôle ! » |
| Noctambule (Carabas) | « Tout ce quartier appartient à Monsieur le marquis ! Les pavés, les lanternes, même la lune. Enfin, c'est ce qu'il dit. » |
| La « chatte » (Chat botté) | « Avec mes bottes, je cours sur les toits. Et je trouve toujours de quoi faire la fortune de mon maître. Miaou… pardon. » |
| Gamin d'Ombrecourt | « T'es pas d'ici, toi ! T'as une bath bestiole, mais t'as pas la gouaille. » |

### Contrôles

`npm run validate`, `npm run check-text` et `npm test`, puis captures de quelques dialogues (fillette au capuchon rouge, noctambule, gamin).

## 8 septies. Lot 6 : contenu (fait)

Zones mer, forge et givremont :
- textes : 76 de `mer.js`, 85 de `forge.js`, 45 de `givremont.js` ;
- 33 prénoms de dresseurs ;
- le nom affiché d'Anselme (ex-Oswin).

Les clés, scripts et drapeaux ne changent pas. Trois régions sont concernées : la Corse, l'Occitanie et l'Auvergne-Rhône-Alpes.

### Principes

- **Corse** (Routes 9 et 10, Ilots, Bibliothèque Engloutie) :
  - îles, maquis, corailleurs, tours génoises, chants polyphoniques ;
  - les anciens glissent des mots corses (« Bonghjornu », « Pace e salute », « avà », « Aiò ! »).
  - Clin d'œil : l'hôtesse de la maison de repos est une mazzera qui « rêve la mer », montrée avec douceur.
- **Occitanie** (Forge-Ardente, Cœur de la Forge) :
  - forges catalanes, orpailleurs, transhumance, brèche de Roland ;
  - les anciens parlent avec les tournures du Midi (« Adieu », « Boudu », « pitchoun », « le cagnard »).
  - Clin d'œil : Roland, le vieux forgeron.
  - Brune est forgeronne de forge catalane.
- **Auvergne-Rhône-Alpes** (Givremont, téléphérique) :
  - cristalliers, alpages, veillées d'hiver, la vogue, Barbegazi et Dahu racontés ;
  - les anciens parlent savoyard et lyonnais (« Adieu », « y », « gone »).
  - Clin d'œil : Gargantua, le vieil homme de la maison 1.
  - Anselme est cristallier.
- On n'emploie que les mots marqués ✓. « Missiavu » et « farga » attendent une confirmation.
- Les textes de l'intrigue gardent leur contenu, avec une voix régionale. Ils concernent Mitrêve, la Pierre Braise, Corvin au Cœur de la Forge, la dissolution du Syndicat et Draguignan.

### Corrections

- `brune` est de classe `champion` : elle s'affiche « Champion Brune ». Elle passe en `championne`, avec la même récompense et la même musique.
- `oswin` s'affiche désormais « Anselme » partout : son combat d'arène, sa revanche d'après-Ligue (`oswin_revanche`, textes de `postjeu.js`) et le générique (`credits.js`). L'identifiant ne change pas. La documentation (`WORLD_MAP.md`) suivra au lot 8.

### Prénoms

| Lieu | Changements |
|---|---|
| Route 9 | Gaspard → Ghjuvanni, Maëlle → Ghjulia, Octave → Petru, Léopold → Orsu, Pomme → Saveria, Titouan → Santu, Gontran → Pasquale |
| Route 10 | Ysaline → Lucia, Ptolémée → Lisandru, Baudouin → Anghjulu, Anselme → Ghjacumu, Oriane → Vannina, Casimir → Matteu, Léonie → Catalina |
| Ilots | Fabrice → Paulu, Hippolyte → Dumenicu, Tancrède → Carlu, Nolwenn → Letizia |
| Bibliothèque Engloutie | Mortimer et Ophélie inchangés (érudits venus d'ailleurs) |
| Forge-Ardente, arène Feu | Tiburce → Bernat, Isidore → Ramon, Éliott → Pau, Calixte → Esclarmonde, Balthazar → Joan, Léandre → Arnau, Mireille → Marieta, Sylvain → Guilhem |
| Cœur de la Forge | Anatole → Pèire, Inès → Joana (sbires, Aubane et Corvin inchangés) |
| Givremont, arène Arcane | Hilaire et Théodule inchangés, Gwenaëlle → Suzon, Balthus → Gratien, Alizée → Marguerite, Sybille → Fanchon, Gaspard → Maurice |

### Exemples de répliques

| PNJ | Proposition |
|---|---|
| Hôtesse des Ilots (mazzera) | « Bonghjornu. Chaque nuit, je rêve la mer. Cette nuit, j'ai vu des bestioles danser près des récifs de l'est. Va voir, avà. » |
| Gardien des Ilots | « Pace e salute, voyageur. Cette tour génoise guette la mer depuis des siècles. » |
| Vieux forgeron (Roland) | « Adieu, pitchoun ! Mon aïeul a reforgé l'épée qui fendit la montagne en deux. La brèche est encore là-haut. » |
| Gamin de la forge | « Boudu, quel cagnard près de la fonderie ! » |
| Vieil homme de Givremont (Gargantua) | « Une fondue pour douze ? Je la finis seul, gone ! Là-haut, une dent de la montagne porte mon nom. Enfin, presque. » |
| Anselme | « Je suis Anselme. J'ai passé ma vie à chercher des cristaux dans la glace. Mes bestioles en ont l'éclat. » |

### Contrôles

`npm run validate`, `npm run check-text` et `npm test`, puis captures de quelques dialogues (mazzera, vieux forgeron, Gargantua) et de l'intro du combat contre Anselme.

Ajout en cours de lot : la police du jeu reçoit le caractère « ò » (o accent grave), nécessaire au corse et à l'occitan (« Aiò ! »).

## 8 octies. Lot 7 : contenu (fait)

Ligue, post-jeu, réactions et textes communs :
- `ligue.js` (147 textes) : Col des Échos, Grotte des Échos, Citadelle d'Azur ;
- `postjeu.js` (94 textes) : Pic d'Azur, Grotte Boréale, revanches des champions ;
- `reactions.js` (5 textes) : réactions des premières villes après la dissolution du Syndicat ;
- `common.js` (19 textes) : messages système ;
- 13 prénoms de dresseurs.

Les clés, scripts et drapeaux ne changent pas.

### Principes

- **Provence-Alpes-Côte d'Azur** (Col et Grotte des Échos, Citadelle, Pic d'Azur) :
  - gardians, santons, lavande, farandole, galéjades, Tarasque ;
  - les anciens glissent du provençal (« Peuchère », « Fan de chichourle », « Boulégan », « Adessias », « Ô bonne mère »).
  - Clin d'œil : le guide de la Citadelle (`citadelle_guide`) est Guillaume au court nez. Il se présente comme « Guillaume, du côté d'Orange », vieux chevalier au nez cabossé. Les consignes de la Ligue (quatre Gardiens, porte qui se referme, pas de soin) restent intactes.
  - Le Col est la porte de la Ligue : on y croise des dresseurs de toute la région. Seuls ceux qui « sont d'ici » prennent un prénom provençal ; gentlemen, scientifiques et chercheuses gardent le leur.
- **Grotte Boréale** (zone postjeu, mais en Auvergne-Rhône-Alpes) : l'ermite parle savoyard, comme Givremont.
- **Textes inchangés sur le fond** : gardes du Col (formule officielle identique pour les huit badges, seule la phrase d'accord prend une touche provençale), Gardiens de la Ligue, rivale et Maître, Pr Morvan, Maman, Salle d'honneur, fin. Ce sont les scènes de l'intrigue : la rivale vient du Hameau comme le joueur et ne parle pas patois.
- **Revanches des champions** : chaque champion garde ses quatre répliques, avec une signature de sa région dans l'intro (« Demat ! » pour Maël, « Adieu, pitchoun ! » pour Brune, « Boujou ! » pour Aubin…). Les répliques génériques `revanche_*` (« Champion : … ») restent neutres, car elles servent à tous.
- **Réactions** (`reactions.js`) : chaque ville réagit avec un mot de son glossaire (section 7).
- **Textes communs** (`common.js`) : messages système (objets, capacités de terrain, Répulsif). Ils restent en français standard, sans changement.
- On n'emploie que les mots marqués ✓.

### Prénoms

| Lieu | Changements |
|---|---|
| Col des Échos | Valentin → Marius, Clothilde → Magali, Éliacin → Frédéri, Selma → Vincènte, Clémentine → Fanny, Ysaure → Mireille ; Augustin et Thaddée inchangés |
| Grotte des Échos | Barthélemy → Titin, Zéphirine → Estelle, Éphrem → Calendal ; Lazlo, Aurélie et Ptolémée inchangés |
| Citadelle d'Azur | Sigismond et Lucienne inchangés (candidats venus de tout Brumeval) |
| Pic d'Azur | Hildebert (« je suis né ici ») → Batistin ; les autres inchangés (dresseurs d'élite venus d'ailleurs) |
| Grotte Boréale | Günther → Séraphin, Bérénice → Toinette, Edmée → Philomène ; Osmond, Isaure et Wolfram inchangés |

Ajouts aux réserves de la section 5 : Batistin, Calendal, Estelle (Provence) ; Séraphin, Toinette, Philomène (Auvergne-Rhône-Alpes). Calendal est le héros d'un poème de Mistral (*Calendau*) ; Estelle rappelle la Santo Estello, fête annuelle du Félibrige.

### Exemples de répliques

| PNJ | Proposition |
|---|---|
| Guide de la Citadelle (Guillaume au court nez) | « Je suis Guillaume, du côté d'Orange. Ce nez, je l'ai laissé dans une vieille bataille. La Ligue d'Azur : quatre Gardiens, puis le Maître… » |
| Ancienne de la Citadelle | « Fan de chichourle ! Tu as le même regard que les meilleurs. Et ça, ce n'est pas une galéjade. » |
| Garde du Col, accord | « Le badge Roche, c'est bon. Passe, et boulégan : la route est longue. » |
| Gardian Marius | « Ici, on garde les taureaux à cheval. Toi, je vais te garder un moment ! » |
| Guide du Pic d'Azur | « Peuchère, tu veux voir Vouivre ? Elle ne se laisse approcher que par qui a vaincu la Ligue. » |
| Ermite de la Grotte Boréale | « Adieu ! Gaussier dort au fond, derrière la glace. On y glisse, on y glisse… » |
| Revanche de Maël | « Maël : Demat ! Une revanche ? Cette fois, la marée est pour moi. » |
| Réaction de Port-Ondine | « Kenavo, le Syndicat ! Les bateaux filent de nouveau vers Ombrecourt. » |
| Réaction de Vireval | « L'usine Opale tourne pour les ouvriers, maintenant. On a fêté ça à l'estaminet, ou bien ? » |

### Contrôles

`npm run validate`, `npm run check-text` et `npm test`, puis captures du guide de la Citadelle, de l'ermite de la Grotte Boréale, d'une revanche et d'une réaction.

Ajout en cours de lot : la police du jeu reçoit le caractère « Ô » (capitale courte, comme É et À), nécessaire à « Ô bonne mère ! ».

## 9. Points ouverts

1. Confirmer les mots « à vérifier » dans les ouvrages du tableau 3.14 avant le lot de chaque zone.
