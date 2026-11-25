// Trainers of the zone « port » (prompt 09): Port-Ondine, Routes 4 and 5, Vireval, usine Opale.
import { trainer } from './helpers.js';

export default [
  // Port-Ondine and bateau-musée (13-18)
  trainer('pecheur_gaston', 'goemonier', 'Gaston', ['laminak:14', 'laminak:15', 'tudgommon:16']),
  trainer('marin_yves', 'marin', 'Yves', ['tudgommon:16', 'lougarou:16']),
  trainer('marin_hugo', 'marin', 'Hugo', ['coulobrin:15', 'dracounet:16', 'laminak:17']),

  // Arène Eau
  trainer('nageur_theo', 'nageur', 'Théo', ['laminak:16', 'morgann:17']),
  trainer('pecheur_rene', 'goemonier', 'René', ['tudgommon:17', 'laminea:18']),
  trainer('mael', 'champion', 'Maël', ['laminak:17', 'tudgommon:18', 'morgann:18', 'laminea:20'], {
    portrait: 'portrait/mael', ai: 'smart', last: true,
  }),

  // Route 4 (14-18)
  trainer('nageur_bastien', 'nageur', 'Bastien', ['laminak:15', 'morgann:16']),
  trainer('nageuse_clara', 'nageuse', 'Clara', ['morgann:16', 'tudgommon:17']),
  trainer('pecheur_marcel', 'goemonier', 'Marcel', ['laminak:14', 'laminak:15', 'laminea:18']),
  trainer('pecheur_alain', 'goemonier', 'Alain', ['tudgommon:16', 'coulobrin:17']),
  trainer('dresseuse_ines', 'dresseuse', 'Inès', ['truffandec:16', 'farfandole:17']),
  trainer('campeuse_julie', 'campeuse', 'Julie', ['chauchenid:14', 'chauchemor:16']),
  trainer('randonneur_gilles', 'randonneur', 'Gilles', ['gargoulin:15', 'dracounet:16', 'lougarou:16']),

  // Route 5 (15-20)
  trainer('campeur_noe', 'campeur', 'Noé', ['follet:16', 'margelle:17']),
  trainer('campeuse_maya', 'campeuse', 'Maya', ['fadet:17', 'margelle:18']),
  trainer('randonneur_paul', 'randonneur', 'Paul', ['warabouc:18', 'gonfaron:18']),
  trainer('dresseuse_eva', 'dresseuse', 'Éva', ['fullettu:18', 'truffandec:18', 'farfandole:19']),
  trainer('ecolier_lucas', 'ecolier', 'Lucas', ['follet:16', 'fullettu:17']),
  trainer('motard_kevin', 'motard', 'Kévin', ['leberou:18', 'poulpifol:20']),
  trainer('gentleman_hippolyte', 'gentleman', 'Hippolyte', ['gonfaron:19', 'farfandole:20']),

  // Usine Opale (19-24)
  trainer('sbire_usine_1', 'sbire_opale', 'Sbire', ['veluchon:20', 'lubin:19']),
  trainer('sbire_usine_2', 'sbire_opale_f', 'Sbire', ['croquemine:20', 'basilin:20']),
  trainer('scientifique_ohmer', 'scientifique', 'Ohmer', ['gobelinet:21', 'fouletot:21']),
  trainer('sbire_usine_3', 'sbire_opale', 'Sbire', ['veluchon:21', 'basilic:22', 'lubinou:22']),
  trainer('chercheuse_adele', 'chercheuse', 'Adèle', ['follaton:22', 'gobelinet:22']),
  trainer('sbire_usine_4', 'sbire_opale_f', 'Sbire', ['poulpifol:22', 'croquemine:23']),
  trainer('lieutenant_brisac', 'lieutenant_opale', 'Brisac', ['basilic:22', 'lubinou:23', 'veluchon:24']),

  // Arène Foudre (21-25)
  trainer('ouvrier_remi', 'cheminot', 'Rémi', ['follaton:22', 'follet:22', 'gobelinet:23']),
  trainer('scientifique_gaspard', 'scientifique', 'Gaspard', ['gobelinet:22', 'fouletot:23']),
  trainer('chercheuse_lea', 'chercheuse', 'Léa', ['follumine:24', 'follaton:25']),
  trainer('selene', 'championne', 'Sélène', ['fouletot:22', 'follumine:23', 'follaton:24', 'follaclair:26'], {
    portrait: 'portrait/selene', ai: 'smart', last: true,
  }),
];
