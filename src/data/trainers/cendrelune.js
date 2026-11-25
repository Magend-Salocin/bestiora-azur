// Trainers of the zone « cendrelune » (prompt 09).
import { trainer, rival } from './helpers.js';

export default [
  // Route 6 (20-24)
  trainer('randonneur_gaspard', 'randonneur', 'Guillaume', ['truffandec:21', 'gargoulin:21', 'poulpifol:22']),
  trainer('campeuse_ninon', 'campeuse', 'Emma', ['chauchemor:21', 'dame_verte:21', 'fadebois:22']),
  trainer('motard_tristan', 'motard', 'Onfroy', ['veluchon:22', 'leberouge:23']),
  trainer('scientifique_basile', 'scientifique', 'Thibault', ['fouletot:22', 'follaton:22', 'gobelinet:23']),
  trainer('dresseuse_margaux', 'dresseuse', 'Héloïse', ['farfandole:22', 'hadalune:22', 'warabouc:23']),
  trainer('campeur_eloi', 'campeur', 'Richard', ['follet:22', 'mandragot:22', 'carcolosse:23']),
  trainer('randonneuse_capucine', 'randonneuse', 'Aelis', ['bolegan:22', 'dracounet:23', 'lycastre:24']),

  // Tunnel Obscur (22-26)
  trainer('montagnard_gilles', 'mineur', 'Robert', ['gargoulin:23', 'gargoulard:25'], { moneyBase: 35 }),
  trainer('ouvrier_firmin', 'mineur', 'Firmin', ['servan:24', 'gobelinet:24', 'veluchon:25']),
  trainer('mystique_ophelie', 'mystique', 'Gunnor', ['croquemine:24', 'chauchemor:24', 'hadalune:26']),
  trainer('montagnard_hector', 'mineur', 'Raoul', ['lycastre:24', 'dame_noire:24', 'gargoulin:25'], { moneyBase: 35 }),
  trainer('ouvrier_lucien', 'mineur', 'Gautier', ['bolegan:25', 'lycastre:26']),

  // Arène Flore (26-31)
  trainer('dame_hortense', 'jardiniere', 'Hortense', ['margelle:27', 'dame_verte:27', 'bugulin:28']),
  trainer('gentleman_achille', 'jardinier', 'Rollon', ['fadebois:28', 'mandragoul:28']),
  trainer('campeuse_lison', 'campeuse', 'Bertrade', ['jetin:27', 'mandragoul:27', 'dame_verte:28']),
  trainer('aubin', 'champion', 'Aubin', ['bugulin:28', 'fadebois:29', 'mandragoul:29', 'roncefee:30'], {
    portrait: 'portrait/aubin', ai: 'smart', last: true,
  }),

  // Tour de la Mémoire (26-32)
  rival('rival_3', {
    korrigan: ['farfandole:27', 'laminea:26', 'hadalune:26', 'galtzabras:29'],
    galtza: ['farfandole:27', 'hada:26', 'fadet:26', 'taraskor:27'],
    tarasquin: ['farfandole:27', 'laminea:26', 'hadalune:27', 'korrigard:31'],
  }),
  trainer('mystique_amandine', 'mystique', 'Ermengarde', ['blanchin:27', 'croquemine:27']),
  trainer('sbire_tour_rufin', 'sbire_opale', 'Rufin', ['veluchon:27', 'lubinou:28']),
  trainer('mystique_sidonie', 'mystique', 'Sibylle', ['ankoulet:28', 'revenant:28']),
  trainer('sbire_tour_josette', 'sbire_opale_f', 'Josette', ['basilic:28', 'croquemine:28', 'poulpifol:28']),
  trainer('mystique_ernest', 'miquelot', 'Michel', ['hadalune:28', 'blanchin:29']),
  trainer('mystique_berenice', 'mystique', 'Odeline', ['hadalune:29', 'blanchin:29', 'revenant:30']),
  trainer('sbire_tour_anatole', 'sbire_opale', 'Anatole', ['basilic:30', 'lubinou:30']),
  trainer('mystique_honore', 'miquelot', 'Aubert', ['croquemine:29', 'chauchemor:29', 'ankoulet:30']),
  trainer('lieutenant_gerfaut', 'lieutenant_opale', 'Gerfaut', ['lubinou:29', 'basilic:30', 'camecruse:31', 'croquefrou:32']),
];
