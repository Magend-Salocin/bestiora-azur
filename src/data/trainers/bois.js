// Trainers of the zone « bois » (prompt 09): Route 2, Bois Murmurant, Route 3, Grotte des Cascades.
import { trainer, rival } from './helpers.js';

export default [
  // Route 2 (3-7)
  trainer('gamin_bastien', 'gamin', 'Loïc', ['farfadet:4', 'poulpiquet:4']),
  trainer('fillette_lison', 'fillette', 'Maïwenn', ['faramin:5', 'farfadet:5']),
  trainer('campeur_hugo', 'campeur', 'Ronan', ['chauchet:4', 'carcolh:5', 'chauchet:5']),
  trainer('campeuse_ines', 'campeuse', 'Gwenola', ['mandragot:6', 'chauchet:7']),
  trainer('ecolier_timothee', 'ecolier', 'Tanguy', ['poulpiquet:6', 'dame_verte:6']),

  // Bois Murmurant (5-10)
  trainer('campeur_jules', 'sonneur', 'Yannick', ['carcolh:6', 'chauchet:6']),
  trainer('fillette_rose', 'fillette', 'Soizic', ['dame_verte:7', 'fadet:7']),
  trainer('campeuse_margot', 'sonneuse', 'Katell', ['mandragot:7', 'chauchet:7', 'chauchenid:8']),
  trainer('campeur_basile', 'sonneur', 'Erwan', ['carcolh:8', 'chauchenid:9']),
  trainer('campeuse_solene', 'sonneuse', 'Enora', ['fadet:8', 'dame_verte:9']),
  trainer('fillette_capucine', 'fillette', 'Rozenn', ['chauchet:9', 'fadet:10']),
  // Syndicat Opale grunts, fought from the bois_murmurant script.
  trainer('sbire_bois_1', 'sbire_opale', 'Brice', ['basilin:8', 'poulpiquet:9']),
  trainer('sbire_bois_2', 'sbire_opale_f', 'Odile', ['faramin:8', 'lubin:9', 'basilin:10']),

  // Route 3 (8-12)
  trainer('ecolier_anatole', 'ecolier', 'Goulven', ['basilin:11', 'hada:12']),
  trainer('randonneur_marcel', 'randonneur', 'Jakez', ['gargoulin:11', 'farfadet:10']),
  trainer('pecheur_gilles', 'pecheur', 'Gwénolé', ['laminak:10', 'laminak:11']),
  trainer('pecheur_armand', 'pecheur', 'Hervé', ['dracounet:11', 'laminak:12']),
  trainer('randonneuse_alix', 'randonneuse', 'Aziliz', ['fadet:10', 'dracounet:11']),
  trainer('gamin_noe', 'gamin', 'Malo', ['farfadet:9', 'faramin:9', 'chauchenid:10']),

  // Grotte des Cascades (9-14)
  trainer('randonneur_yves', 'randonneur', 'Yves', ['gargoulin:11', 'gargoulin:12']),
  trainer('montagnard_gaston', 'montagnard', 'Riwal', ['bolegan:12', 'gargoulin:12']),
  trainer('randonneuse_leonie', 'randonneuse', 'Gaïd', ['lubin:11', 'houlin:12']),
  trainer('montagnard_firmin', 'montagnard', 'Tugdual', ['gargoulin:11', 'dracounet:12', 'bolegan:13']),
  trainer('montagnard_auguste', 'montagnard', 'Paol', ['gargoulin:13', 'servan:13']),
  trainer('randonneuse_berenice', 'randonneuse', 'Bleuenn', ['lubin:13', 'houlin:13']),
  trainer('randonneur_lucien', 'randonneur', 'Herlé', ['tudgommon:12', 'bolegan:13', 'gargoulin:14']),

  // Rival 2, exit of the Grotte des Cascades. Key = the PLAYER's starter.
  rival('rival_2', {
    korrigan: ['farfadet:12', 'hada:11', 'galtza:12'],
    galtza: ['farfadet:13', 'hada:12', 'tarasquin:15'],
    tarasquin: ['farfadet:13', 'hada:12', 'korrigan:15'],
  }),
];
