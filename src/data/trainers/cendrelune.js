// Trainers of the zone « cendrelune » (prompt 09).
import { trainer, rival } from './helpers.js';

export default [
  // Route 6 (20-24)
  trainer('randonneur_gaspard', 'randonneur', 'Gaspard', ['truffandec:21', 'gargoulin:21', 'poulpifol:22']),
  trainer('campeuse_ninon', 'campeuse', 'Ninon', ['chauchemor:21', 'dame_verte:21', 'fadebois:22']),
  trainer('motard_tristan', 'motard', 'Tristan', ['veluchon:22', 'leberouge:23']),
  trainer('scientifique_basile', 'scientifique', 'Basile', ['fouletot:22', 'follaton:22', 'gobelinet:23']),
  trainer('dresseuse_margaux', 'dresseuse', 'Margaux', ['farfandole:22', 'hadalune:22', 'warabouc:23']),
  trainer('campeur_eloi', 'campeur', 'Éloi', ['follet:22', 'mandragot:22', 'carcolosse:23']),
  trainer('randonneuse_capucine', 'randonneuse', 'Capucine', ['bolegan:22', 'dracounet:23', 'lycastre:24']),

  // Tunnel Obscur (22-26)
  trainer('montagnard_gilles', 'montagnard', 'Gilles', ['gargoulin:23', 'gargoulard:25']),
  trainer('ouvrier_firmin', 'ouvrier', 'Firmin', ['servan:24', 'gobelinet:24', 'veluchon:25']),
  trainer('mystique_ophelie', 'mystique', 'Ophélie', ['croquemine:24', 'chauchemor:24', 'hadalune:26']),
  trainer('montagnard_hector', 'montagnard', 'Hector', ['lycastre:24', 'dame_noire:24', 'gargoulin:25']),
  trainer('ouvrier_lucien', 'ouvrier', 'Lucien', ['bolegan:25', 'lycastre:26']),

  // Arène Flore (26-31)
  trainer('dame_hortense', 'dame', 'Hortense', ['margelle:27', 'dame_verte:27', 'bugulin:28']),
  trainer('gentleman_achille', 'gentleman', 'Achille', ['fadebois:28', 'mandragoul:28']),
  trainer('campeuse_lison', 'campeuse', 'Lison', ['jetin:27', 'mandragoul:27', 'dame_verte:28']),
  trainer('aubin', 'champion', 'Aubin', ['bugulin:28', 'fadebois:29', 'mandragoul:29', 'roncefee:30'], {
    portrait: 'portrait/aubin', ai: 'smart', last: true,
  }),

  // Tour de la Mémoire (26-32)
  rival('rival_3', {
    korrigan: ['farfandole:27', 'laminea:26', 'hadalune:26', 'galtzabras:29'],
    galtza: ['farfandole:27', 'hada:26', 'fadet:26', 'taraskor:27'],
    tarasquin: ['farfandole:27', 'laminea:26', 'hadalune:27', 'korrigard:31'],
  }),
  trainer('mystique_amandine', 'mystique', 'Amandine', ['blanchin:27', 'croquemine:27']),
  trainer('sbire_tour_rufin', 'sbire_opale', 'Rufin', ['veluchon:27', 'lubinou:28']),
  trainer('mystique_sidonie', 'mystique', 'Sidonie', ['ankoulet:28', 'revenant:28']),
  trainer('sbire_tour_josette', 'sbire_opale_f', 'Josette', ['basilic:28', 'croquemine:28', 'poulpifol:28']),
  trainer('mystique_ernest', 'mystique', 'Ernest', ['hadalune:28', 'blanchin:29']),
  trainer('mystique_berenice', 'mystique', 'Bérénice', ['hadalune:29', 'blanchin:29', 'revenant:30']),
  trainer('sbire_tour_anatole', 'sbire_opale', 'Anatole', ['basilic:30', 'lubinou:30']),
  trainer('mystique_honore', 'mystique', 'Honoré', ['croquemine:29', 'chauchemor:29', 'ankoulet:30']),
  trainer('lieutenant_gerfaut', 'lieutenant_opale', 'Gerfaut', ['lubinou:29', 'basilic:30', 'camecruse:31', 'croquefrou:32']),
];
