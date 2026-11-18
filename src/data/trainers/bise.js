// Trainers of the zone « bise » (prompt 10).
import { trainer, rival } from './helpers.js';

export default [
  trainer('randonneur_ulysse', 'randonneur', 'Ulysse', ['cabrelin:28', 'volplanin:29', 'lapugilat:30']),
  trainer('campeur_baptiste', 'campeur', 'Baptiste', ['eolithe:29', 'nimbelaine:29', 'butinelle:30']),
  trainer('montagnard_lothaire', 'montagnard', 'Lothaire', ['bloquetin:29', 'cabrelin:30', 'eolithe:31']),
  trainer('dresseuse_perrine', 'dresseuse', 'Perrine', ['corolline:30', 'lumirande:30', 'nimbelaine:31']),
  trainer('motard_cyprien', 'motard', 'Cyprien', ['fumelard:30', 'boulonnier:31', 'crassolard:31']),
  trainer('randonneuse_zelie', 'randonneuse', 'Zélie', ['volplanin:30', 'bouquetor:32']),
  trainer('campeuse_romane', 'campeuse', 'Romane', ['butinelle:31', 'nuageot:32', 'volplanin:31']),
  trainer('gentleman_aurelien', 'gentleman', 'Aurélien', ['girouette:33', 'aquilard:33']),
  trainer('montagnard_ferdinand', 'montagnard', 'Ferdinand', ['bouquetor:32', 'eolithe:32', 'cabrelin:31']),
  trainer('dame_clemence', 'dame', 'Clémence', ['corolline:32', 'lumirande:33']),
  trainer('scientifique_octave', 'scientifique', 'Octave', ['ampoulard:31', 'lampyrex:32', 'piquevolt:31']),
  trainer('randonneur_leandre', 'randonneur', 'Léandre', ['lapugilat:32', 'bouquetor:33', 'aquilard:33']),
  trainer('mystique_agathe', 'mystique', 'Agathe', ['brumoire:32', 'noctulard:32', 'sombrecor:33']),
  trainer('motard_ambroise', 'motard', 'Ambroise', ['crassolard:32', 'fumelard:33']),
  trainer('danseuse_mirabelle', 'danseuse', 'Mirabelle', ['butinelle:33', 'lumirande:33', 'eolithe:34']),
  trainer('gamin_oscar', 'gamin', 'Oscar', ['volplanin:31', 'nuageot:32']),
  trainer('randonneur_hugues', 'randonneur', 'Hugues', ['aquilard:34', 'girouette:34']),
  trainer('ecolier_basile', 'ecolier', 'Basile', ['nuageot:32', 'volplanin:33', 'butinelle:33']),
  trainer('ysolde', 'championne', 'Ysolde', ['volplanin:31', 'butinelle:32', 'girouette:34', 'volplaneur:36'], { portrait: 'portrait/ysolde', ai: 'smart', last: true }),
  rival('rival_4', {
    fenouillot: ['aquilard:28', 'goujarde:28', 'lumirande:29', 'fournaise:32'],
    braisille: ['aquilard:28', 'lumignon:28', 'cerfeuil:29', 'ondeclat:32'],
    flaquin: ['aquilard:28', 'goujarde:28', 'lumirande:29', 'fenouvert:32'],
  }),
];
