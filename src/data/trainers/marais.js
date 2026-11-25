// Trainers of the zone « marais » (prompt 10).
import { trainer, rival } from './helpers.js';

export default [
  trainer('campeur_leon', 'campeur', 'Arnaud', ['bayard:33', 'hellequet:33', 'graoulet:34']),
  trainer('randonneuse_aurelie', 'randonneuse', 'Aliénor', ['cabridor:33', 'farfator:34']),
  trainer('scientifique_hector', 'scientifique', 'Bertrand', ['galipotin:34', 'magou:34', 'follaclair:34']),
  trainer('marin_fulbert', 'marin', 'Fulbert', ['lavandiere:34', 'graoulard:35']),
  trainer('dresseuse_joelle', 'dresseuse', 'Mariette', ['margolys:34', 'hadelys:34', 'truffandor:35']),
  trainer('ouvrier_marius', 'ouvrier', 'Peyo', ['gobelinet:34', 'velucorne:35', 'servarmure:35']),
  trainer('mystique_philomene', 'mystique', 'Radegonde', ['blancome:34', 'croquefrou:35', 'revenant:35']),
  trainer('pecheur_odilon', 'maraichin', 'Odilon', ['laminea:34', 'graoulard:36']),
  trainer('pecheur_baltazar', 'maraichin', 'Aimeric', ['magou:35', 'lavandiere:35', 'graoulard:36']),
  trainer('nageur_corentin', 'maraichin', 'Jean-Pierre', ['morgavague:35', 'coulobron:35'], { moneyBase: 25 }),
  trainer('nageuse_elodie', 'maraichine', 'Nadine', ['morgavague:35', 'goemonroc:36'], { moneyBase: 25 }),
  trainer('campeuse_adele', 'campeuse', 'Lucette', ['galipotin:36', 'mandragoul:36', 'graoulet:35']),
  trainer('chercheuse_viviane', 'chercheuse', 'Solange', ['galipote:38', 'lavandame:38']),
  trainer('randonneur_prosper', 'randonneur', 'Prosper', ['louvar:35', 'cabridor:35', 'dame_noire:35']),
];
