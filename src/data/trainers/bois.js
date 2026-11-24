// Trainers of the zone « bois » (prompt 09): Route 2, Bois Murmurant, Route 3, Grotte des Cascades.
import { trainer, rival } from './helpers.js';

export default [
  // Route 2 (3-7)
  trainer('gamin_bastien', 'gamin', 'Bastien', ['farfadet:4', 'poulpiquet:4']),
  trainer('fillette_lison', 'fillette', 'Lison', ['faramin:5', 'farfadet:5']),
  trainer('campeur_hugo', 'campeur', 'Hugo', ['chauchet:4', 'carcolh:5', 'chauchet:5']),
  trainer('campeuse_ines', 'campeuse', 'Inès', ['mandragot:6', 'chauchet:7']),
  trainer('ecolier_timothee', 'ecolier', 'Timothée', ['poulpiquet:6', 'dame_verte:6']),

  // Bois Murmurant (5-10)
  trainer('campeur_jules', 'campeur', 'Jules', ['carcolh:6', 'chauchet:6']),
  trainer('fillette_rose', 'fillette', 'Rose', ['dame_verte:7', 'fadet:7']),
  trainer('campeuse_margot', 'campeuse', 'Margot', ['mandragot:7', 'chauchet:7', 'chauchenid:8']),
  trainer('campeur_basile', 'campeur', 'Basile', ['carcolh:8', 'chauchenid:9']),
  trainer('campeuse_solene', 'campeuse', 'Solène', ['fadet:8', 'dame_verte:9']),
  trainer('fillette_capucine', 'fillette', 'Capucine', ['chauchet:9', 'fadet:10']),
  // Syndicat Opale grunts, fought from the bois_murmurant script.
  trainer('sbire_bois_1', 'sbire_opale', 'Brice', ['basilin:8', 'poulpiquet:9']),
  trainer('sbire_bois_2', 'sbire_opale_f', 'Odile', ['faramin:8', 'lubin:9', 'basilin:10']),

  // Route 3 (8-12)
  trainer('ecolier_anatole', 'ecolier', 'Anatole', ['basilin:11', 'hada:12']),
  trainer('randonneur_marcel', 'randonneur', 'Marcel', ['gargoulin:11', 'farfadet:10']),
  trainer('pecheur_gilles', 'pecheur', 'Gilles', ['laminak:10', 'laminak:11']),
  trainer('pecheur_armand', 'pecheur', 'Armand', ['dracounet:11', 'laminak:12']),
  trainer('randonneuse_alix', 'randonneuse', 'Alix', ['fadet:10', 'dracounet:11']),
  trainer('gamin_noe', 'gamin', 'Noé', ['farfadet:9', 'faramin:9', 'chauchenid:10']),

  // Grotte des Cascades (9-14)
  trainer('randonneur_yves', 'randonneur', 'Yves', ['gargoulin:11', 'gargoulin:12']),
  trainer('montagnard_gaston', 'montagnard', 'Gaston', ['bolegan:12', 'gargoulin:12']),
  trainer('randonneuse_leonie', 'randonneuse', 'Léonie', ['lubin:11', 'houlin:12']),
  trainer('montagnard_firmin', 'montagnard', 'Firmin', ['gargoulin:11', 'dracounet:12', 'bolegan:13']),
  trainer('montagnard_auguste', 'montagnard', 'Auguste', ['gargoulin:13', 'servan:13']),
  trainer('randonneuse_berenice', 'randonneuse', 'Bérénice', ['lubin:13', 'houlin:13']),
  trainer('randonneur_lucien', 'randonneur', 'Lucien', ['tudgommon:12', 'bolegan:13', 'gargoulin:14']),

  // Rival 2, exit of the Grotte des Cascades. Key = the PLAYER's starter.
  rival('rival_2', {
    korrigan: ['farfadet:12', 'hada:11', 'galtza:12'],
    galtza: ['farfadet:13', 'hada:12', 'tarasquin:15'],
    tarasquin: ['farfadet:13', 'hada:12', 'korrigan:15'],
  }),
];
