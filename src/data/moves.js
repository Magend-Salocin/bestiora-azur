// All moves. `power: 0` = damage computed by the effect (fixed, level, half HP, OHKO, counter).
// `accuracy: null` = never misses. `effectChance: null` = the effect always applies.
// `exclusiveTo` lists the only species allowed to learn the move (legendary signatures).

function move(id, name, type, category, power, accuracy, pp, description, options = {}) {
  return {
    id,
    name,
    type,
    category,
    power,
    accuracy,
    pp,
    priority: options.priority ?? 0,
    effect: options.effect ?? 'damage',
    effectChance: options.chance ?? null,
    effectParams: options.params ?? null,
    highCrit: options.highCrit ?? false,
    description,
    ...(options.exclusiveTo ? { exclusiveTo: options.exclusiveTo } : {}),
    ...(options.learnable === false ? { learnable: false } : {}),
  };
}

const P = 'physical';
const S = 'special';
const X = 'status';

const stats = (values) => ({ stats: values });

export const MOVES = [
  // Normal
  move('egratignure', 'Ruade', 'normal', P, 40, 100, 35, 'Une ruade sèche d’âne rétif.'),
  move('elan_vif', 'Prime-Saut', 'normal', P, 40, 100, 30, 'D’un bond, frappe en premier.', { priority: 1 }),
  move('tambourin', 'Rigodon', 'normal', P, 15, 85, 20, 'Danse un rigodon : 2 à 5 coups.', { effect: 'multi_hit', params: { min: 2, max: 5 } }),
  move('frappe_nette', 'Battage', 'normal', P, 0, 90, 20, 'Bat comme le blé : toujours 40 PV.', { effect: 'fixed_damage', params: { amount: 40 } }),
  move('pietinement', 'Foulage', 'normal', P, 70, 100, 20, 'Foule la cible. Peut l’apeurer.', { effect: 'flinch', chance: 30 }),
  move('assaut', 'Charivari', 'normal', P, 80, 100, 15, 'Charge en plein charivari.'),
  move('rongement', 'Métayage', 'normal', P, 0, 90, 10, 'Prend la moitié des PV restants.', { effect: 'half_hp_damage' }),
  move('percee', 'Fourche', 'normal', P, 90, 85, 15, 'Coup de fourche. Critique+.', { highCrit: true }),
  move('frenesie', 'Ribote', 'normal', P, 120, 100, 10, 'Fête 2 ou 3 tours, puis confusion.', { effect: 'rampage', params: { turns: [2, 3] } }),
  move('onde_brute', 'Huchée', 'normal', S, 120, 90, 5, 'Cri perçant. Repos forcé après.', { effect: 'recharge' }),
  move('implosion', 'Flambée', 'normal', P, 200, 100, 5, 'Énorme coup, puis tombe K.O.', { effect: 'self_destruct' }),
  move('mine_severe', 'Mauvais œil', 'normal', X, 0, 100, 40, 'Mauvais œil : baisse l’Attaque.', { effect: 'target_stat_down', params: stats({ atk: -1 }) }),
  move('regard_dur', 'Toise', 'normal', X, 0, 100, 30, 'Toise la cible. Baisse la Défense.', { effect: 'target_stat_down', params: stats({ def: -1 }) }),
  move('bombe_torse', 'Garbure', 'normal', X, 0, null, 20, 'Monte l’Attaque et la Défense.', { effect: 'self_stat_up', params: stats({ atk: 1, def: 1 }) }),
  move('point_focal', 'Affût', 'normal', X, 0, null, 30, 'Se met à l’affût : plus de critiques.', { effect: 'crit_up' }),
  move('pansement', 'Rebouteux', 'normal', X, 0, null, 10, 'Soigne la moitié de ses PV max.', { effect: 'heal_half' }),
  move('sieste', 'Méridienne', 'normal', X, 0, null, 10, 'Dort 2 tours et soigne ses PV.', { effect: 'rest' }),
  move('repli', 'Contrevent', 'normal', X, 0, null, 10, 'Volets clos : protège ce tour.', { effect: 'protect', priority: 4 }),
  move('baroud', 'Va-Tout', 'normal', P, 50, null, 1, 'Dernier recours. Blesse le lanceur.', { effect: 'struggle', learnable: false }),

  // Feu
  move('escarbille', 'Tison', 'feu', S, 40, 100, 25, 'Tison ardent. Peut brûler.', { effect: 'burn', chance: 10 }),
  move('morsardente', 'Goule de Feu', 'feu', P, 60, 95, 20, 'Morsure brûlante. Peut brûler.', { effect: 'burn', chance: 10 }),
  move('torche', 'Brandon', 'feu', P, 70, 100, 15, 'Frappe avec un brandon en feu.'),
  move('cerceau_feu', 'Ronde du Feu', 'feu', S, 35, 85, 15, 'Ronde de feu : piège la cible.', { effect: 'trap', params: { turns: [2, 5] } }),
  move('boule_braise', 'Four Banal', 'feu', S, 75, 100, 15, 'Feu du four. Peut brûler.', { effect: 'burn', chance: 10 }),
  move('coulee_lave', 'Puy Ardent', 'feu', S, 95, 100, 10, 'Lave d’un puy. Peut brûler.', { effect: 'burn', chance: 10 }),
  move('pyroclaste', 'Saint-Jean', 'feu', S, 110, 85, 5, 'Grand bûcher. Brûle souvent.', { effect: 'burn', chance: 30 }),
  move('ruee_brasier', 'Abrivado', 'feu', P, 120, 100, 10, 'Charge en flammes. Recul de 1/3.', { effect: 'recoil', params: { fraction: 1 / 3 } }),
  move('braise_lente', 'Couvre-Feu', 'feu', X, 0, 85, 15, 'Braises qui brûlent la cible.', { effect: 'burn' }),
  move('ardeur', 'Soufflet', 'feu', X, 0, null, 20, 'Attise sa flamme : A.Spé et Vit. +', { effect: 'self_stat_up', params: stats({ spa: 1, spe: 1 }) }),

  // Eau
  move('giclee', 'Lavoir', 'eau', S, 40, 100, 25, 'Eau du lavoir sur la cible.'),
  move('nageoire', 'Battoir', 'eau', P, 60, 100, 20, 'Frappe comme un battoir mouillé.'),
  move('remous', 'Gour', 'eau', S, 35, 85, 15, 'Un gour profond piège la cible.', { effect: 'trap', params: { turns: [2, 5] } }),
  move('embrun', 'Crachin', 'eau', S, 65, 100, 20, 'Crachin breton. Peut aveugler.', { effect: 'target_stat_down', chance: 30, params: stats({ acc: -1 }) }),
  move('abysse', 'Ville d’Ys', 'eau', P, 80, 100, 10, 'Sombre au tour 1, surgit au tour 2.', { effect: 'charge_turn', params: { semiInvulnerable: 'underwater' } }),
  move('deferlante', 'Mascaret', 'eau', P, 90, 100, 15, 'Fond sur la cible en mascaret.'),
  move('lame_de_fond', 'Grande Marée', 'eau', S, 90, 100, 10, 'Marée d’équinoxe sur la cible.'),
  move('grand_ressac', 'Grande Crue', 'eau', S, 120, 80, 5, 'Une crue énorme qui emporte tout.'),
  move('voile_marin', 'Mer d’Huile', 'eau', X, 0, null, 20, 'Réduit les dégâts spéciaux 5 tours.', { effect: 'screen', params: { category: 'special', turns: 5 } }),
  move('source_vive', 'Jouvence', 'eau', X, 0, null, 10, 'Soigne la moitié de ses PV max.', { effect: 'heal_half' }),

  // Flore
  move('brindille', 'Coudrier', 'flore', P, 45, 100, 25, 'Cingle d’un coup de coudrier.'),
  move('seve_volee', 'Gemmage', 'flore', S, 40, 100, 20, 'Saigne la sève de la cible : soigne.', { effect: 'drain', params: { fraction: 1 / 2 } }),
  move('fouet_ronce', 'Roncier', 'flore', P, 65, 100, 20, 'Frappe avec un roncier épineux.'),
  move('averse_verte', 'Jonchée', 'flore', S, 60, 100, 20, 'Feuilles coupantes en jonchée.'),
  move('pompe_seve', 'Mandragore', 'flore', S, 75, 100, 10, 'Racine qui boit la vie : soigne.', { effect: 'drain', params: { fraction: 1 / 2 } }),
  move('rondin', 'Arbre de Mai', 'flore', P, 85, 95, 15, 'Abat le mai. Peut apeurer.', { effect: 'flinch', chance: 10 }),
  move('fauchage', 'Fenaison', 'flore', P, 90, 100, 15, 'Fauche net. Critique fréquent.', { highCrit: true }),
  move('germination', 'Herbe d’Or', 'flore', S, 120, 100, 10, 'Pousse au tour 1, éclate au tour 2.', { effect: 'charge_turn', params: { semiInvulnerable: null } }),
  move('pollen_tiede', 'Tilleul', 'flore', X, 0, 75, 15, 'Fleurs de tilleul qui endorment.', { effect: 'sleep' }),
  move('spore_raide', 'Ergot', 'flore', X, 0, 75, 30, 'Un ergot de seigle qui paralyse.', { effect: 'paralyze' }),
  move('germe_voleur', 'Gui', 'flore', X, 0, 90, 10, 'Gui qui vole des PV par tour.', { effect: 'leech' }),

  // Foudre
  move('picotement', 'Crin Tressé', 'foudre', S, 40, 100, 30, 'Crins chargés. Peut paralyser.', { effect: 'paralyze', chance: 10 }),
  move('arc_volt', 'Saint-Elme', 'foudre', S, 60, 100, 20, 'Feu de Saint-Elme sur la cible.'),
  move('crepitement', 'Chapelet', 'foudre', S, 20, 100, 20, 'Grains chargés : touche 2 à 5 fois.', { effect: 'multi_hit', params: { min: 2, max: 5 } }),
  move('paume_volt', 'Main d’Orage', 'foudre', P, 65, 100, 20, 'Main d’orage. Peut paralyser.', { effect: 'paralyze', chance: 20 }),
  move('court_jus', 'Céraunie', 'foudre', P, 80, 100, 15, 'Frappe d’une hache tombée de l’orage.'),
  move('foudroiement', 'Orage d’Été', 'foudre', S, 90, 100, 15, 'Foudre d’été. Peut paralyser.', { effect: 'paralyze', chance: 10 }),
  move('orage_sec', 'Feu du Ciel', 'foudre', S, 110, 70, 5, 'Foudre sèche. Paralyse souvent.', { effect: 'paralyze', chance: 30 }),
  move('ruee_ionique', 'Cavalcade', 'foudre', P, 120, 100, 10, 'Charge d’orage. Recul de 1/3.', { effect: 'recoil', params: { fraction: 1 / 3 } }),
  move('engourdir', 'Torpille', 'foudre', X, 0, 90, 20, 'Choc de torpille qui paralyse.', { effect: 'paralyze' }),
  move('survolteur', 'Chevauchée', 'foudre', X, 0, null, 30, 'Galope toute la nuit : Vitesse ++', { effect: 'self_stat_up', params: stats({ spe: 2 }) }),

  // Givre
  move('frisson', 'Onglée', 'givre', S, 40, 100, 30, 'Froid aux doigts. Peut ralentir.', { effect: 'target_stat_down', chance: 10, params: stats({ spe: -1 }) }),
  move('glissade', 'Luge', 'givre', P, 40, 100, 30, 'Dévale en luge et frappe en premier.', { priority: 1 }),
  move('gresil', 'Frimas', 'givre', S, 55, 100, 20, 'Un frimas mordant. Peut geler.', { effect: 'freeze', chance: 10 }),
  move('glacons', 'Chandelles', 'givre', P, 25, 100, 20, '2 à 5 chandelles de glace.', { effect: 'multi_hit', params: { min: 2, max: 5 } }),
  move('bise_glacee', 'Bise Noire', 'givre', S, 60, 95, 15, 'Bise du Jura. Baisse la Vitesse.', { effect: 'target_stat_down', params: stats({ spe: -1 }) }),
  move('gelure', 'Engelure', 'givre', P, 65, 100, 20, 'Morsure de froid. Peut geler.', { effect: 'freeze', chance: 10 }),
  move('gel_profond', 'Lune Rousse', 'givre', S, 90, 100, 10, 'Gel d’avril. Peut geler.', { effect: 'freeze', chance: 10 }),
  move('coulee_neige', 'Congère', 'givre', P, 90, 90, 10, 'Ensevelit la cible sous une congère.'),
  move('grand_froid', 'Grand Hiver', 'givre', S, 115, 70, 5, 'Froid de 1709. Gèle souvent.', { effect: 'freeze', chance: 30 }),
  move('mur_de_givre', 'Névé', 'givre', X, 0, null, 20, 'Réduit les dégâts physiques 5 tours.', { effect: 'screen', params: { category: 'physical', turns: 5 } }),

  // Combat
  move('taloche', 'Savate', 'combat', P, 40, 100, 35, 'Un vif coup de pied de savate.'),
  move('double', 'Une-Deux', 'combat', P, 35, 90, 20, 'Deux coups de poing à la suite.', { effect: 'multi_hit', params: { min: 2, max: 2 } }),
  move('manchette', 'Bourrade', 'combat', P, 60, 100, 20, 'Bourrade sèche. Peut apeurer.', { effect: 'flinch', chance: 20 }),
  move('contre_coup', 'Parade', 'combat', P, 0, 100, 20, 'Renvoie 2 fois les coups physiques.', { effect: 'counter', priority: -5 }),
  move('onde_vitale', 'Pelote', 'combat', S, 80, 100, 15, 'Lance une pelote de toute sa force.'),
  move('uppercut', 'Croche-Pied', 'combat', P, 85, 90, 15, 'Fait trébucher. Critique fréquent.', { highCrit: true }),
  move('genouillade', 'Soule', 'combat', P, 90, 100, 10, 'Charge de soule. Recul de 1/4.', { effect: 'recoil', params: { fraction: 1 / 4 } }),
  move('coup_decisif', 'Gouren', 'combat', P, 120, 100, 5, 'Lutte totale. Baisse sa défense.', { effect: 'self_stat_down', params: stats({ def: -1, spd: -1 }) }),
  move('prise_fatale', 'Lamm', 'combat', P, 0, 30, 5, 'Lamm imparable : K.O. direct.', { effect: 'ohko' }),
  move('gonflette', 'Lève-Pierre', 'combat', X, 0, null, 20, 'Monte beaucoup l’Attaque.', { effect: 'self_stat_up', params: stats({ atk: 2 }) }),

  // Toxique
  move('aiguillon', 'Épine Velue', 'toxique', P, 40, 100, 35, 'Piquant velu. Peut empoisonner.', { effect: 'poison', chance: 30 }),
  move('crachat', 'Bave Crapaud', 'toxique', S, 45, 100, 25, 'Bave de crapaud. Peut empoisonner.', { effect: 'poison', chance: 10 }),
  move('pluie_dards', 'Herse', 'toxique', P, 25, 95, 20, 'Herse : 2 à 5 pointes de venin.', { effect: 'multi_hit', params: { min: 2, max: 5 } }),
  move('morsure_fiel', 'Vipère', 'toxique', P, 65, 100, 20, 'Morsure de vipère. Peut intoxiquer.', { effect: 'bad_poison', chance: 20 }),
  move('miasme', 'Haleine', 'toxique', S, 65, 100, 20, 'Souffle fétide. Peut empoisonner.', { effect: 'poison', chance: 30 }),
  move('epine_fiel', 'Orties', 'toxique', P, 80, 100, 15, 'Fouette d’orties. Peut empoisonner.', { effect: 'poison', chance: 30 }),
  move('vase_fetide', 'Bourbier', 'toxique', S, 90, 100, 10, 'Vase de bourbier. Peut empoisonner.', { effect: 'poison', chance: 30 }),
  move('maree_noire', 'Chaudron', 'toxique', S, 120, 80, 5, 'Chaudron renversé. Peut empoisonner.', { effect: 'poison', chance: 30 }),
  move('toxine', 'Philtre', 'toxique', X, 0, 90, 10, 'Empoisonne la cible gravement.', { effect: 'bad_poison' }),
  move('poudre_fiel', 'Aconit', 'toxique', X, 0, 75, 35, 'Poudre d’aconit qui empoisonne.', { effect: 'poison' }),

  // Terre
  move('motte', 'Glèbe', 'terre', P, 40, 100, 30, 'Lance une glèbe de terre dure.'),
  move('gadoue', 'Fange', 'terre', S, 50, 100, 20, 'Fange aux yeux. Peut aveugler.', { effect: 'target_stat_down', chance: 30, params: stats({ acc: -1 }) }),
  move('pelletee', 'Labour', 'terre', P, 65, 100, 20, 'Retourne la terre sur la cible.'),
  move('terrier', 'Taupinière', 'terre', P, 80, 100, 10, 'Creuse au tour 1, surgit au tour 2.', { effect: 'charge_turn', params: { semiInvulnerable: 'underground' } }),
  move('gronde_sol', 'Rumeur', 'terre', S, 90, 100, 10, 'Le sol gronde. Baisse la D.Spé.', { effect: 'target_stat_down', chance: 10, params: stats({ spd: -1 }) }),
  move('sol_fendu', 'Sape', 'terre', P, 100, 100, 10, 'Sape le sol sous la cible.'),
  move('coulee_boue', 'Fondrière', 'terre', S, 120, 85, 5, 'Boue profonde. Peut aveugler.', { effect: 'target_stat_down', chance: 30, params: stats({ acc: -1 }) }),
  move('faille', 'Gouffre', 'terre', P, 0, 30, 5, 'Ouvre un gouffre : K.O. direct.', { effect: 'ohko' }),
  move('poudroiement', 'Poussière', 'terre', X, 0, 100, 15, 'Poussière : baisse la Précision.', { effect: 'target_stat_down', params: stats({ acc: -1 }) }),
  move('terre_battue', 'Pisé', 'terre', X, 0, null, 20, 'Se tasse comme du pisé : Défense ++', { effect: 'self_stat_up', params: stats({ def: 2 }) }),

  // Vent
  move('souffle', 'Autan', 'vent', S, 40, 100, 35, 'Un coup d’autan sur la cible.'),
  move('battement', 'Battue', 'vent', P, 60, 100, 25, 'Frappe de grands coups d’ailes.'),
  move('tournevent', 'Tramontane', 'vent', S, 65, 100, 20, 'Vent qui rend fou. Rend confus.', { effect: 'confuse', chance: 20 }),
  move('bec_taille', 'Bec Crochu', 'vent', P, 70, 100, 20, 'Bec acéré. Critique fréquent.', { highCrit: true }),
  move('cisaille', 'Mistral', 'vent', S, 75, 95, 15, 'Mistral tranchant. Critique fréquent.', { highCrit: true }),
  move('envolee', 'Balai', 'vent', P, 90, 95, 15, 'S’envole, puis pique au tour 2.', { effect: 'charge_turn', params: { semiInvulnerable: 'air' } }),
  move('typhon', 'Mesnie', 'vent', S, 110, 70, 5, 'Chasse folle. Peut rendre confus.', { effect: 'confuse', chance: 30 }),
  move('rase_mottes', 'Chasse Artus', 'vent', P, 120, 100, 10, 'Fond du ciel. Recul de 1/3.', { effect: 'recoil', params: { fraction: 1 / 3 } }),
  move('grand_air', 'Grand Ménage', 'vent', X, 0, null, 30, 'Balaie tous les bonus et malus.', { effect: 'haze' }),
  move('portance', 'Aile Légère', 'vent', X, 0, null, 30, 'Plume au vent : Vitesse ++', { effect: 'self_stat_up', params: stats({ spe: 2 }) }),

  // Arcane
  move('lueur', 'Lueur', 'arcane', S, 40, 100, 30, 'Une lueur étrange frappe la cible.'),
  move('coup_runique', 'Coup Runique', 'arcane', P, 60, 100, 25, 'Frappe d’une patte runique.'),
  move('onde_mentale', 'Onde Mentale', 'arcane', S, 0, 100, 15, 'Inflige autant de PV que son niveau.', { effect: 'level_damage' }),
  move('eclat_astral', 'Éclat Astral', 'arcane', S, 70, null, 20, 'Éclats d’étoiles. Ne rate jamais.'),
  move('prisme', 'Prisme', 'arcane', S, 80, 100, 15, 'Rayon irisé. Peut baisser D.Spé.', { effect: 'target_stat_down', chance: 10, params: stats({ spd: -1 }) }),
  move('lame_astrale', 'Lame Astrale', 'arcane', P, 90, 100, 10, 'Lame de lumière. Critique fréquent.', { highCrit: true }),
  move('songe_avide', 'Songe Avide', 'arcane', S, 100, 100, 15, 'Dévore les rêves d’un dormeur.', { effect: 'dream_drain' }),
  move('arcanum', 'Arcanum', 'arcane', S, 120, 90, 5, 'Sort majeur. Baisse son A.Spé.', { effect: 'self_stat_down', params: stats({ spa: -2 }) }),
  move('songe_lourd', 'Songe Lourd', 'arcane', X, 0, 70, 15, 'Plonge la cible dans le sommeil.', { effect: 'sleep' }),
  move('clairvoyance', 'Clairvoyance', 'arcane', X, 0, null, 20, 'Monte l’Att. Spé. et la Déf. Spé.', { effect: 'self_stat_up', params: stats({ spa: 1, spd: 1 }) }),

  // Insecte
  move('mandibule', 'Tenaille', 'insecte', P, 40, 100, 35, 'Pince avec ses mandibules.'),
  move('piquant', 'Guêpier', 'insecte', P, 25, 95, 20, 'Pique la cible 2 à 5 fois.', { effect: 'multi_hit', params: { min: 2, max: 5 } }),
  move('vrombir', 'Hanneton', 'insecte', S, 60, 100, 20, 'Vol de hanneton. Baisse la D.Spé.', { effect: 'target_stat_down', chance: 10, params: stats({ spd: -1 }) }),
  move('butinage', 'Miellée', 'insecte', S, 60, 100, 15, 'Butine l’énergie et se soigne.', { effect: 'drain', params: { fraction: 1 / 2 } }),
  move('elytres', 'Cétoine', 'insecte', P, 75, 100, 15, 'Fonce, élytres en avant.'),
  move('nuee_ailee', 'Ruche', 'insecte', S, 80, 100, 15, 'Toute une ruche fond sur la cible.'),
  move('pince_seche', 'Lucane', 'insecte', P, 90, 95, 10, 'Pince de lucane. Critique fréquent.', { highCrit: true }),
  move('grouillement', 'Vermine', 'insecte', P, 120, 85, 5, 'La vermine déferle sur la cible.'),
  move('fil_gluant', 'Filandre', 'insecte', X, 0, 95, 40, 'Filandre : Vitesse très baissée.', { effect: 'target_stat_down', params: stats({ spe: -2 }) }),
  move('chitine', 'Cocon', 'insecte', X, 0, null, 20, 'Se fait un cocon : Défense ++', { effect: 'self_stat_up', params: stats({ def: 2 }) }),

  // Roche
  move('gravillons', 'Caillasse', 'roche', P, 40, 100, 30, 'Jette une poignée de caillasse.'),
  move('ricochet', 'Palet', 'roche', P, 25, 90, 15, 'Lance 2 à 5 palets.', { effect: 'multi_hit', params: { min: 2, max: 5 } }),
  move('galet_lance', 'Fronde', 'roche', P, 60, 95, 20, 'Un galet lancé à la fronde.'),
  move('gemme_vive', 'Grenat', 'roche', S, 70, 100, 20, 'Un grenat lance un éclat de lumière.'),
  move('silex', 'Biface', 'roche', P, 75, 95, 15, 'Biface tranchant. Critique fréquent.', { highCrit: true }),
  move('chute_roc', 'Dolmen', 'roche', P, 85, 90, 10, 'Le dolmen tombe. Peut apeurer.', { effect: 'flinch', chance: 30 }),
  move('quartz_vif', 'Géode', 'roche', S, 90, 100, 10, 'Rayon de quartz d’une géode.'),
  move('front_de_roc', 'Menhir', 'roche', P, 120, 80, 5, 'Charge en menhir. Recul de 1/3.', { effect: 'recoil', params: { fraction: 1 / 3 } }),
  move('rempart', 'Granit', 'roche', X, 0, null, 20, 'Monte la Défense et la Déf. Spé.', { effect: 'self_stat_up', params: stats({ def: 1, spd: 1 }) }),
  move('polissage', 'Pierre Folle', 'roche', X, 0, null, 20, 'Pierre qui court : Vitesse ++', { effect: 'self_stat_up', params: stats({ spe: 2 }) }),

  // Ombre
  move('pas_furtif', 'Pas Furtif', 'ombre', P, 40, 100, 30, 'Surgit de l’ombre et frappe en 1er.', { priority: 1 }),
  move('hantise', 'Hantise', 'ombre', S, 60, 100, 20, 'Une apparition. Rend confus.', { effect: 'confuse', chance: 20 }),
  move('traitrise', 'Traîtrise', 'ombre', P, 70, 100, 15, 'Frappe dans le dos. Critique+.', { highCrit: true }),
  move('ponction', 'Ponction', 'ombre', S, 75, 100, 10, 'Ponctionne la vie de la cible.', { effect: 'drain', params: { fraction: 1 / 2 } }),
  move('gueule_noire', 'Gueule Noire', 'ombre', P, 80, 100, 15, 'Morsure sombre. Peut apeurer.', { effect: 'flinch', chance: 20 }),
  move('encre_nuit', 'Encre Nuit', 'ombre', S, 80, 100, 15, 'Encre noire. Peut baisser la Préc.', { effect: 'target_stat_down', chance: 20, params: stats({ acc: -1 }) }),
  move('revenance', 'Revenance', 'ombre', S, 90, 100, 10, 'Un esprit frappe. Baisse la D.Spé.', { effect: 'target_stat_down', chance: 20, params: stats({ spd: -1 }) }),
  move('neant', 'Néant', 'ombre', S, 120, 85, 5, 'Plonge la cible dans le néant.'),
  move('effroi', 'Effroi', 'ombre', X, 0, 100, 20, 'Terrifie : Attaque très baissée.', { effect: 'target_stat_down', params: stats({ atk: -2 }) }),
  move('penombre', 'Pénombre', 'ombre', X, 0, null, 20, 'Se cache : monte l’Esquive.', { effect: 'self_stat_up', params: stats({ eva: 1 }) }),

  // Métal
  move('pointe_fer', 'Pointe Fer', 'metal', P, 40, 100, 30, 'Pique avec une pointe de fer.'),
  move('rivetage', 'Rivetage', 'metal', P, 25, 90, 20, 'Plante 2 à 5 rivets.', { effect: 'multi_hit', params: { min: 2, max: 5 } }),
  move('gant_de_fer', 'Gant de Fer', 'metal', P, 60, 100, 20, 'Un coup de poing ganté de fer.'),
  move('gong', 'Gong', 'metal', S, 70, 100, 15, 'Son de gong. Peut rendre confus.', { effect: 'confuse', chance: 20 }),
  move('taillade', 'Taillade', 'metal', P, 75, 95, 15, 'Lame de métal. Critique fréquent.', { highCrit: true }),
  move('chrome_vif', 'Chrome Vif', 'metal', S, 90, 100, 10, 'Éclat de chrome. Baisse la D.Spé.', { effect: 'target_stat_down', chance: 10, params: stats({ spd: -1 }) }),
  move('enclume', 'Enclume', 'metal', P, 95, 90, 10, 'Tombe comme une enclume. Apeure.', { effect: 'flinch', chance: 20 }),
  move('pilon', 'Pilon', 'metal', P, 120, 85, 5, 'Écrase la cible. Baisse sa Vitesse.', { effect: 'self_stat_down', params: stats({ spe: -1 }) }),
  move('blindage', 'Blindage', 'metal', X, 0, null, 20, 'Monte beaucoup la Défense.', { effect: 'self_stat_up', params: stats({ def: 2 }) }),
  move('rouille', 'Rouille', 'metal', X, 0, 90, 20, 'Rouille : Défense très baissée.', { effect: 'target_stat_down', params: stats({ def: -2 }) }),

  // Signatures des légendaires et du mythique
  move('ciel_dazur', 'Ciel d’Azur', 'vent', S, 110, 100, 5, 'Le ciel souffle. Monte l’A.Spé.', { effect: 'self_stat_up', chance: 20, params: stats({ spa: 1 }), exclusiveTo: ['vouivre'] }),
  move('aube_bleue', 'Aube Bleue', 'arcane', S, 100, 100, 5, 'L’aube draine la vie de la cible.', { effect: 'drain', params: { fraction: 1 / 2 }, exclusiveTo: ['vouivre'] }),
  move('glacier_roc', 'Glacier Roc', 'givre', P, 110, 90, 5, 'Bloc de glacier. Peut geler.', { effect: 'freeze', chance: 20, exclusiveTo: ['gaussier'] }),
  move('coeur_ardent', 'Cœur Ardent', 'feu', S, 110, 90, 5, 'Feu du volcan. Brûle souvent.', { effect: 'burn', chance: 30, exclusiveTo: ['draguignan'] }),
  move('fulgurance', 'Fulgurance', 'foudre', S, 110, 95, 5, 'Éclair fulgurant. Peut paralyser.', { effect: 'paralyze', chance: 20, exclusiveTo: ['veneur'] }),
  move('mille_eclats', 'Mille Éclats', 'arcane', S, 100, null, 5, 'Brûle, gèle ou paralyse parfois.', { effect: 'tri_status', chance: 20, exclusiveTo: ['mitreve'] }),
];

export const MOVES_BY_ID = Object.fromEntries(MOVES.map((entry) => [entry.id, entry]));
