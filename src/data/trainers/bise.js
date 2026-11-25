// Trainers of the zone « bise » (prompt 10).
import { trainer, rival } from './helpers.js';

export default [
  trainer('randonneur_ulysse', 'randonneur', 'Claude', ['cabrillon:28', 'serpvolin:29', 'louvar:30']),
  trainer('campeur_baptiste', 'campeur', 'Désiré', ['koril:29', 'truffandor:29', 'jetinelle:30']),
  trainer('montagnard_lothaire', 'fruitier', 'Lothaire', ['gargoulard:29', 'cabrillon:30', 'koril:31']),
  trainer('dresseuse_perrine', 'dresseuse', 'Philiberte', ['margolys:30', 'hadelys:30', 'truffandor:31']),
  trainer('motard_cyprien', 'motard', 'Bénigne', ['leberouge:30', 'gobelin:31', 'velucorne:31']),
  trainer('randonneuse_zelie', 'randonneuse', 'Bernadette', ['serpvolin:30', 'cabridor:32']),
  trainer('campeuse_romane', 'campeuse', 'Colette', ['jetinelle:31', 'hellequet:32', 'serpvolin:31']),
  trainer('gentleman_aurelien', 'gentleman', 'Gustave', ['bayard:33', 'farfator:33']),
  trainer('montagnard_ferdinand', 'fruitier', 'Ferdinand', ['cabridor:32', 'koril:32', 'cabrillon:31']),
  trainer('dame_clemence', 'dame', 'Clémence', ['margolys:32', 'hadelys:33']),
  trainer('scientifique_octave', 'horloger', 'Octave', ['follaclair:31', 'follumine:32', 'fouletot:31']),
  trainer('randonneur_leandre', 'randonneur', 'Jules', ['louvar:32', 'cabridor:33', 'farfator:33']),
  trainer('mystique_agathe', 'mystique', 'Agathe', ['blancome:32', 'lubinou:32', 'croquefrou:33']),
  trainer('motard_ambroise', 'motard', 'Abel', ['velucorne:32', 'leberouge:33']),
  trainer('danseuse_mirabelle', 'danseuse', 'Mirabelle', ['jetinelle:33', 'hadelys:33', 'koril:34']),
  trainer('gamin_oscar', 'gamin', 'Félicien', ['serpvolin:31', 'hellequet:32']),
  trainer('randonneur_hugues', 'randonneur', 'Hugues', ['farfator:34', 'bayard:34']),
  trainer('ecolier_basile', 'ecolier', 'Vivant', ['hellequet:32', 'serpvolin:33', 'jetinelle:33']),
  trainer('ysolde', 'championne', 'Ysolde', ['serpvolin:31', 'jetinelle:32', 'bayard:34', 'serpvolant:36'], { portrait: 'portrait/ysolde', ai: 'smart', last: true }),
  rival('rival_4', {
    korrigan: ['farfator:28', 'laminea:28', 'hadelys:29', 'galtzabras:32'],
    galtza: ['farfator:28', 'hada:28', 'fadebois:29', 'taraskor:32'],
    tarasquin: ['farfator:28', 'laminea:28', 'hadelys:29', 'korrigard:32'],
  }),
];
