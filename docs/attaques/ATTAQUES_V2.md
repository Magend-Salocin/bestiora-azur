# Attaques V2 : noms ancrés dans le folklore

Table de référence du [prompt 3](../Pnj/prompt-3-attaques.md). Seuls le nom et la description changent : identifiant, type, catégorie, puissance, précision, PP, priorité, effet et apprentissages restent ceux de `src/data/moves.js`.

Statut : F (folklore attesté), A (archétype traditionnel), J (création du jeu). Répartition : 35 F, 107 A, 24 J.

Les descriptions en jeu sont dans `src/data/moves.js`. Elles tiennent sur 2 lignes de 18 caractères (`npm run validate`).

## Règles de nommage

- 12 caractères au plus. Le nom décrit l'effet : une attaque qui aveugle évoque la vue (Crachin, Fange, Suaire), une attaque qui protège évoque un abri (Contrevent, Névé).
- Aucun doublon avec une bestiole, un objet, une classe de dresseur ou un lieu. Les attaques exclusives des légendaires évoquent leur légende sans reprendre le nom de l'espèce seul.
- Noms écartés parce qu'ils existent dans une franchise et ajoutés à `tools/forbidden-words.js` : Riposte, Abîme, Roue de Feu, Brouillard, Bourdon, Dévorêve, Gonflette, Repli, Essaim. Avalanche et Fléau sont aussi écartés comme noms d'attaque, mais restent des mots courants des textes (description de Barbegazi, catégorie « Bestiole Fléau ») : ils ne sont pas ajoutés à la liste.
- Anciens noms repris d'une franchise et remplacés : Repli, Gonflette.

## Table

| id | Ancien nom | Nouveau nom | Type | Effet | Motif | Statut |
|---|---|---|---|---|---|---|
| `egratignure` | Égratignure | Ruade | Normal | Phys. 40 | Ruade des bêtes de ferme, âne de Gonfaron | A |
| `elan_vif` | Élan Vif | Prime-Saut | Normal | Phys. 40, prioritaire | Expression « de prime saut » | J |
| `tambourin` | Tambourin | Rigodon | Normal | Phys. 15, 2 à 5 coups | Rigodon, danse du Dauphiné | A |
| `frappe_nette` | Frappe Nette | Battage | Normal | Phys. —, 40 PV fixes | Battage du blé au fléau | A |
| `pietinement` | Piétinement | Foulage | Normal | Phys. 70, apeure (30 %) | Foulage du raisin aux vendanges | A |
| `assaut` | Assaut | Charivari | Normal | Phys. 80 | Charivari, cortège bruyant des villages | A |
| `rongement` | Rongement | Métayage | Normal | Phys. —, moitié des PV restants | Métayage : la moitié de la récolte au maître | A |
| `percee` | Percée | Fourche | Normal | Phys. 90, critique + | Fourche des foins | A |
| `frenesie` | Frénésie | Ribote | Normal | Phys. 120, 2 ou 3 tours puis confusion | Ribote, fête trop arrosée | A |
| `onde_brute` | Onde Brute | Huchée | Normal | Spé. 120, repos au tour suivant | Huchée, appel crié d’une vallée à l’autre | A |
| `implosion` | Implosion | Flambée | Normal | Phys. 200, lanceur K.O. | Expression « feu de paille » | J |
| `mine_severe` | Mine Sévère | Mauvais Œil | Normal | Statut, cible Att. -1 | Mauvais œil des croyances rurales | F |
| `regard_dur` | Regard Dur | Toise | Normal | Statut, cible Déf. -1 | Regard qui toise | J |
| `bombe_torse` | Bombe Torse | Garbure | Normal | Statut, lanceur Att. +1, Déf. +1 | Garbure, soupe béarnaise du Truffandec | A |
| `point_focal` | Point Focal | Affût | Normal | Statut, critiques + | Affût du chasseur | A |
| `pansement` | Pansement | Rebouteux | Normal | Statut, soigne 1/2 PV | Rebouteux des campagnes | A |
| `sieste` | Sieste | Méridienne | Normal | Statut, dort 2 tours, soin total | Méridienne, sieste du Midi | A |
| `repli` | Repli | Contrevent | Normal | Statut, protection, prioritaire | Contrevents fermés contre l’orage | A |
| `baroud` | Baroud | Va-Tout | Normal | Phys. 50, dernier recours, recul, ne rate pas | Jouer son va-tout | J |
| `escarbille` | Escarbille | Tison | Feu | Spé. 40, brûlure (10 %) | Braise de l’âtre, veillée | A |
| `morsardente` | Morsardente | Goule de Feu | Feu | Phys. 60, brûlure (10 %) | Grand’Goule de Poitiers (« goule » : gueule) | F |
| `torche` | Torche | Brandon | Feu | Phys. 70 | Dimanche des Brandons | F |
| `cerceau_feu` | Cerceau Feu | Ronde du Feu | Feu | Spé. 35, piège 2 à 5 tours | Rondes autour des feux de la Saint-Jean | F |
| `boule_braise` | Boule Braise | Four Banal | Feu | Spé. 75, brûlure (10 %) | Four banal des villages | A |
| `coulee_lave` | Coulée Lave | Puy Ardent | Feu | Spé. 95, brûlure (10 %) | Volcans d’Auvergne, Draguignan | J |
| `pyroclaste` | Pyroclaste | Saint-Jean | Feu | Spé. 110, brûlure (30 %) | Feux de la Saint-Jean | F |
| `ruee_brasier` | Ruée Brasier | Abrivado | Feu | Phys. 120, recul 1/3 | Abrivado, lâcher de taureaux camarguais (Taurnoir) | A |
| `braise_lente` | Braise Lente | Couvre-Feu | Feu | Statut, brûlure | Couvre-feu : braises couvertes pour la nuit | A |
| `ardeur` | Ardeur | Soufflet | Feu | Statut, lanceur A.Spé +1, Vit. +1 | Soufflet de forge et de cheminée | A |
| `giclee` | Giclée | Lavoir | Eau | Spé. 40 | Lavoirs, lavandières | A |
| `nageoire` | Nageoire | Battoir | Eau | Phys. 60 | Battoir des lavandières | A |
| `remous` | Remous | Gour | Eau | Spé. 35, piège 2 à 5 tours | Gour, trou d’eau profond (occitan), Sorgue de la Coulobre | A |
| `embrun` | Embrun | Crachin | Eau | Spé. 65, cible Préc. -1 (30 %) | Crachin des côtes bretonnes | A |
| `abysse` | Abysse | Ville d’Ys | Eau | Phys. 80, charge 1 tour | Ville d’Ys engloutie | F |
| `deferlante` | Déferlante | Mascaret | Eau | Phys. 90 | Mascaret de la Garonne et de la Dordogne | A |
| `lame_de_fond` | Lame de Fond | Grande Marée | Eau | Spé. 90 | Grandes marées d’équinoxe | A |
| `grand_ressac` | Grand Ressac | Grande Crue | Eau | Spé. 120 | Crues du Rhône, Tarasque | A |
| `voile_marin` | Voile Marin | Mer d’Huile | Eau | Statut, écran spécial 5 tours | Expression « mer d’huile » | J |
| `source_vive` | Source Vive | Jouvence | Eau | Statut, soigne 1/2 PV | Fontaine de Jouvence | A |
| `brindille` | Brindille | Coudrier | Flore | Phys. 45 | Baguette de coudrier des sourciers | A |
| `seve_volee` | Sève Volée | Gemmage | Flore | Spé. 40, draine 1/2 | Gemmage des pins des Landes | A |
| `fouet_ronce` | Fouet Ronce | Roncier | Flore | Phys. 65 | Ronciers des haies | A |
| `averse_verte` | Averse Verte | Jonchée | Flore | Spé. 60 | Jonchées de feuillage des fêtes | A |
| `pompe_seve` | Pompe Sève | Mandragore | Flore | Spé. 75, draine 1/2 | Mandragore, Mandragot | A |
| `rondin` | Rondin | Arbre de Mai | Flore | Phys. 85, apeure (10 %) | Arbre de mai planté au 1er mai | F |
| `fauchage` | Fauchage | Fenaison | Flore | Phys. 90, critique + | Fenaison | A |
| `germination` | Germination | Herbe d’Or | Flore | Spé. 120, charge 1 tour | Herbe d’or des Bretons, cueillie à l’aube | F |
| `pollen_tiede` | Pollen Tiède | Tilleul | Flore | Statut, sommeil | Tisane de tilleul du soir | A |
| `spore_raide` | Spore Raide | Ergot | Flore | Statut, paralysie | Ergot de seigle, mal des ardents | F |
| `germe_voleur` | Germe Voleur | Gui | Flore | Statut, vole des PV chaque tour | Gui des druides, plante parasite | F |
| `picotement` | Picotement | Crin Tressé | Foudre | Spé. 40, paralysie (10 %) | Fouletot qui tresse les crins des chevaux | F |
| `arc_volt` | Arc Volt | Saint-Elme | Foudre | Spé. 60 | Feu de Saint-Elme | F |
| `crepitement` | Crépitement | Chapelet | Foudre | Spé. 20, 2 à 5 coups | Chapelet du Moine bourru | A |
| `paume_volt` | Paume Volt | Main d’Orage | Foudre | Phys. 65, paralysie (20 %) | Gobelin farceur, orage | J |
| `court_jus` | Court-Jus | Céraunie | Foudre | Phys. 80 | Céraunies, haches de pierre crues tombées avec la foudre | F |
| `foudroiement` | Foudroiement | Orage d’Été | Foudre | Spé. 90, paralysie (10 %) | Orages des moissons | A |
| `orage_sec` | Orage Sec | Feu du Ciel | Foudre | Spé. 110, paralysie (30 %) | Foudre, « feu du ciel » | A |
| `ruee_ionique` | Ruée Ionique | Cavalcade | Foudre | Phys. 120, recul 1/3 | Chevauchées nocturnes, Veneur | J |
| `engourdir` | Engourdir | Torpille | Foudre | Statut, paralysie | Raie torpille des pêcheurs | A |
| `survolteur` | Survolteur | Chevauchée | Foudre | Statut, lanceur Vit. +2 | Fouletot qui monte les chevaux la nuit | F |
| `frisson` | Frisson | Onglée | Givre | Spé. 40, cible Vit. -1 (10 %) | Onglée des veillées d’hiver | A |
| `glissade` | Glissade | Luge | Givre | Phys. 40, prioritaire | Barbegazi qui glisse sur ses grands pieds | A |
| `gresil` | Grésil | Frimas | Givre | Spé. 55, gel (10 %) | Frimas d’hiver | A |
| `glacons` | Glaçons | Chandelles | Givre | Phys. 25, 2 à 5 coups | Chandelles de glace des toits | A |
| `bise_glacee` | Bise Glacée | Bise Noire | Givre | Spé. 60, cible Vit. -1 | Bise noire de Bourgogne et du Jura | A |
| `gelure` | Gelure | Engelure | Givre | Phys. 65, gel (10 %) | Engelures d’hiver | A |
| `gel_profond` | Gel Profond | Lune Rousse | Givre | Spé. 90, gel (10 %) | Lune rousse d’avril qui gèle les bourgeons | F |
| `coulee_neige` | Coulée Neige | Congère | Givre | Phys. 90 | Congères des cols | A |
| `grand_froid` | Grand Froid | Grand Hiver | Givre | Spé. 115, gel (30 %) | Grand hiver de 1709 | F |
| `mur_de_givre` | Mur de Givre | Névé | Givre | Statut, écran physique 5 tours | Névés des glaciers, Barbegazi | A |
| `taloche` | Taloche | Savate | Combat | Phys. 40 | Savate, boxe française | A |
| `double` | Doublé | Une-Deux | Combat | Phys. 35, 2 à 2 coups | Enchaînement de boxe française | A |
| `manchette` | Manchette | Bourrade | Combat | Phys. 60, apeure (20 %) | Bourrade de foire | J |
| `contre_coup` | Contre-Coup | Parade | Combat | Phys. —, renvoie 2× les coups physiques | Parade d’escrime et de savate | A |
| `onde_vitale` | Onde Vitale | Pelote | Combat | Spé. 80 | Pelote basque | A |
| `uppercut` | Uppercut | Croche-Pied | Combat | Phys. 85, critique + | Crocs-en-jambe du gouren | A |
| `genouillade` | Genouillade | Soule | Combat | Phys. 90, recul 1/4 | Soule, jeu de balle normand et breton | F |
| `coup_decisif` | Coup Décisif | Gouren | Combat | Phys. 120, lanceur Déf. -1, D.Spé -1 | Gouren, lutte bretonne | F |
| `prise_fatale` | Prise Fatale | Lamm | Combat | Phys. —, K.O. direct | Lamm, chute sur le dos qui gagne au gouren | F |
| `gonflette` | Gonflette | Lève-Pierre | Combat | Statut, lanceur Att. +2 | Harri-jasotzaile, lever de pierre basque | F |
| `aiguillon` | Aiguillon | Épine Velue | Toxique | Phys. 40, poison (30 %) | La Velue et ses piquants empoisonnés | F |
| `crachat` | Crachat | Bave Crapaud | Toxique | Spé. 45, poison (10 %) | Crapauds des sorcières | A |
| `pluie_dards` | Pluie Dards | Herse | Toxique | Phys. 25, 2 à 5 coups | Herse des champs | J |
| `morsure_fiel` | Morsure Fiel | Vipère | Toxique | Phys. 65, poison grave (20 %) | Vipères des haies | A |
| `miasme` | Miasme | Haleine | Toxique | Spé. 65, poison (30 %) | Souffle empoisonné du Graoully de Metz | F |
| `epine_fiel` | Épine Fiel | Orties | Toxique | Phys. 80, poison (30 %) | Orties des fossés | A |
| `vase_fetide` | Vase Fétide | Bourbier | Toxique | Spé. 90, poison (30 %) | Marais, bourbiers | A |
| `maree_noire` | Marée Noire | Chaudron | Toxique | Spé. 120, poison (30 %) | Chaudron des sorcières, Galipote | A |
| `toxine` | Toxine | Philtre | Toxique | Statut, poison grave | Philtres des sorcières | A |
| `poudre_fiel` | Poudre Fiel | Aconit | Toxique | Statut, poison | Aconit, plante des sorcières | A |
| `motte` | Motte | Glèbe | Terre | Phys. 40 | Glèbe des champs | A |
| `gadoue` | Gadoue | Fange | Terre | Spé. 50, cible Préc. -1 (30 %) | Fange des chemins | A |
| `pelletee` | Pelletée | Labour | Terre | Phys. 65 | Labours | A |
| `terrier` | Terrier | Taupinière | Terre | Phys. 80, charge 1 tour | Taupinières, petit peuple souterrain | A |
| `gronde_sol` | Grondesol | Rumeur | Terre | Spé. 90, cible D.Spé -1 (10 %) | Grondements souterrains | J |
| `sol_fendu` | Sol Fendu | Sape | Terre | Phys. 100 | Sape des mineurs | A |
| `coulee_boue` | Coulée Boue | Fondrière | Terre | Spé. 120, cible Préc. -1 (30 %) | Fondrières des chemins creux | A |
| `faille` | Faille | Gouffre | Terre | Phys. —, K.O. direct | Gouffre de Padirac, ouvert par le diable selon la légende | F |
| `poudroiement` | Poudroiement | Poussière | Terre | Statut, cible Préc. -1 | Poussière des chemins | J |
| `terre_battue` | Terre Battue | Pisé | Terre | Statut, lanceur Déf. +2 | Pisé, terre crue des maisons | A |
| `souffle` | Souffle | Autan | Vent | Spé. 40 | Vent d’autan | A |
| `battement` | Battement | Battue | Vent | Phys. 60 | Battue de chasse | A |
| `tournevent` | Tournevent | Tramontane | Vent | Spé. 65, confusion (20 %) | Tramontane, vent réputé rendre fou | F |
| `bec_taille` | Bec Taillé | Bec Crochu | Vent | Phys. 70, critique + | Rapaces des falaises | J |
| `cisaille` | Cisaille | Mistral | Vent | Spé. 75, critique + | Mistral | A |
| `envolee` | Envolée | Balai | Vent | Phys. 90, charge 1 tour | Vol des sorcières au sabbat | A |
| `typhon` | Typhon | Mesnie | Vent | Spé. 110, confusion (30 %) | Mesnie Hellequin, chasse des nuées | F |
| `rase_mottes` | Rase-Mottes | Chasse Artus | Vent | Phys. 120, recul 1/3 | Chasse Artus, chasse fantôme du Poitou et de Bretagne | F |
| `grand_air` | Grand Air | Grand Ménage | Vent | Statut, annule bonus et malus | Grand ménage de printemps | J |
| `portance` | Portance | Aile Légère | Vent | Statut, lanceur Vit. +2 | Vol léger des fées | J |
| `lueur` | Lueur | Feu Fadet | Arcane | Spé. 40 | Lueurs des fadets | A |
| `coup_runique` | Coup Runique | Ogham | Arcane | Phys. 60 | Ogham, écriture celte | A |
| `onde_mentale` | Onde Mentale | Sortilège | Arcane | Spé. —, dégâts = niveau | Sortilèges des fées | A |
| `eclat_astral` | Éclat Astral | Bonne Étoile | Arcane | Spé. 70, ne rate pas | Croyance en la bonne étoile | A |
| `prisme` | Prisme | Arc-en-Ciel | Arcane | Spé. 80, cible D.Spé -1 (10 %) | Arc-en-ciel, « écharpe d’Iris » | A |
| `lame_astrale` | Lame Astrale | Serpe d’Or | Arcane | Phys. 90, critique + | Serpe d’or des druides cueillant le gui | F |
| `songe_avide` | Songe Avide | Mange-Songe | Arcane | Spé. 100, draine un dormeur | Esprits qui pèsent sur les dormeurs | J |
| `arcanum` | Arcanum | Grimoire | Arcane | Spé. 120, lanceur A.Spé -2 | Grand Grimoire, Petit Albert | A |
| `songe_lourd` | Songe Lourd | Fais Dodo | Arcane | Statut, sommeil | Berceuse « Fais dodo, Colas » | A |
| `clairvoyance` | Clairvoyance | Seconde Vue | Arcane | Statut, lanceur A.Spé +1, D.Spé +1 | Seconde vue des devins bretons | A |
| `mandibule` | Mandibule | Tenaille | Insecte | Phys. 40 | Perce-oreille des jardins | A |
| `piquant` | Piquant | Guêpier | Insecte | Phys. 25, 2 à 5 coups | Guêpiers | A |
| `vrombir` | Vrombir | Hanneton | Insecte | Spé. 60, cible D.Spé -1 (10 %) | Hannetons de mai | A |
| `butinage` | Butinage | Miellée | Insecte | Spé. 60, draine 1/2 | Miellée des ruches | A |
| `elytres` | Élytres | Cétoine | Insecte | Phys. 75 | Cétoine dorée des roses | A |
| `nuee_ailee` | Nuée Ailée | Ruche | Insecte | Spé. 80 | Ruches, essaims | A |
| `pince_seche` | Pince Sèche | Lucane | Insecte | Phys. 90, critique + | Lucane cerf-volant des chênes | A |
| `grouillement` | Grouillement | Vermine | Insecte | Phys. 120 | Vermine des greniers, Câme-Cruse | A |
| `fil_gluant` | Fil Gluant | Filandre | Insecte | Statut, cible Vit. -2 | Filandres, « fils de la Vierge » | A |
| `chitine` | Chitine | Cocon | Insecte | Statut, lanceur Déf. +2 | Cocons des chenilles des landes | A |
| `gravillons` | Gravillons | Caillasse | Roche | Phys. 40 | Caillasse des chemins | A |
| `ricochet` | Ricochet | Palet | Roche | Phys. 25, 2 à 5 coups | Jeu de palets breton et vendéen | A |
| `galet_lance` | Galet Lancé | Fronde | Roche | Phys. 60 | Fronde des bergers | A |
| `gemme_vive` | Gemme Vive | Grenat | Roche | Spé. 70 | Grottes des fions, cristaux | J |
| `silex` | Silex | Biface | Roche | Phys. 75, critique + | Bifaces de silex | A |
| `chute_roc` | Chute Roc | Dolmen | Roche | Phys. 85, apeure (30 %) | Dolmens | A |
| `quartz_vif` | Quartz Vif | Géode | Roche | Spé. 90 | Géodes des grottes | J |
| `front_de_roc` | Front de Roc | Menhir | Roche | Phys. 120, recul 1/3 | Menhirs, danse des Korils | A |
| `rempart` | Rempart | Granit | Roche | Statut, lanceur Déf. +1, D.Spé +1 | Granit breton | A |
| `polissage` | Polissage | Pierre Folle | Roche | Statut, lanceur Vit. +2 | Menhirs qui vont boire la nuit de Noël | F |
| `pas_furtif` | Pas Furtif | Pas de Loup | Ombre | Phys. 40, prioritaire | Expression « à pas de loup » | J |
| `hantise` | Hantise | Dame Blanche | Ombre | Spé. 60, confusion (20 %) | Dames blanches qui égarent les voyageurs | F |
| `traitrise` | Traîtrise | Coup Fourré | Ombre | Phys. 70, critique + | Coup fourré | J |
| `ponction` | Ponction | Saignée | Ombre | Spé. 75, draine 1/2 | Saignée des anciens médecins | A |
| `gueule_noire` | Gueule Noire | Croque-Nuit | Ombre | Phys. 80, apeure (20 %) | Croque-mitaine | A |
| `encre_nuit` | Encre Nuit | Suaire | Ombre | Spé. 80, cible Préc. -1 (20 %) | Lavandières de nuit qui lavent les suaires | F |
| `revenance` | Revenance | Glas | Ombre | Spé. 90, cible D.Spé -1 (20 %) | Glas des morts | A |
| `neant` | Néant | Faux d’Ankou | Ombre | Spé. 120 | Faux de l’Ankou | F |
| `effroi` | Effroi | Peur Bleue | Ombre | Statut, cible Att. -2 | Expression « peur bleue » | J |
| `penombre` | Pénombre | Crépuscule | Ombre | Statut, lanceur Esq. +1 | Heure entre chien et loup | A |
| `pointe_fer` | Pointe Fer | Fer à Cheval | Métal | Phys. 40 | Fer à cheval porte-bonheur, Bayard et Mallet | A |
| `rivetage` | Rivetage | Ferrage | Métal | Phys. 25, 2 à 5 coups | Ferrage des chevaux | A |
| `gant_de_fer` | Gant de Fer | Gantelet | Métal | Phys. 60 | Gantelets des armures | J |
| `gong` | Gong | Tocsin | Métal | Spé. 70, confusion (20 %) | Tocsin des clochers | A |
| `taillade` | Taillade | Coutelas | Métal | Phys. 75, critique + | Coutellerie | J |
| `chrome_vif` | Chrome Vif | Argent Vif | Métal | Spé. 90, cible D.Spé -1 (10 %) | Vif-argent des alchimistes, richesses du Servan | A |
| `enclume` | Enclume | Martinet | Métal | Phys. 95, apeure (20 %) | Martinets de forge | A |
| `pilon` | Pilon | Cloche | Métal | Phys. 120, lanceur Vit. -1 | Cloches des églises | A |
| `blindage` | Blindage | Haubert | Métal | Statut, lanceur Déf. +2 | Haubert de mailles | A |
| `rouille` | Rouille | Vert-de-Gris | Métal | Statut, cible Déf. -2 | Vert-de-gris du cuivre | A |
| `ciel_dazur` | Ciel d’Azur | Aile Vouivre | Vent | Spé. 110, lanceur A.Spé +1 (20 %), exclusive : vouivre | Vouivre, serpent ailé de Franche-Comté | F |
| `aube_bleue` | Aube Bleue | Escarboucle | Arcane | Spé. 100, draine 1/2, exclusive : vouivre | Escarboucle au front de la vouivre | F |
| `glacier_roc` | Glacier Roc | Roc Gaussier | Givre | Phys. 110, gel (20 %), exclusive : gaussier | Lion de pierre du mont Gaussier (à vérifier) | A |
| `coeur_ardent` | Cœur Ardent | Drac du Var | Feu | Spé. 110, brûlure (30 %), exclusive : draguignan | Dragon de Draguignan, drac provençal | F |
| `fulgurance` | Fulgurance | Grand Veneur | Foudre | Spé. 110, paralysie (20 %), exclusive : veneur | Grand Veneur de Fontainebleau | F |
| `mille_eclats` | Mille Éclats | Mille Songes | Arcane | Spé. 100, brûlure, gel ou paralysie (20 %), ne rate pas, exclusive : mitreve | Mitrêve, mite des rêves | J |
