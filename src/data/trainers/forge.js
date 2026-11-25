// Trainers of the zone « forge » (prompt 10).
import { trainer, rival } from './helpers.js';

export default [
  trainer('ouvrier_tiburce', 'forgeron', 'Bernat', ['goulinet:42', 'mallet:43']),
  trainer('randonneur_isidore', 'randonneur', 'Ramon', ['taurnoir:43', 'leberombre:42']),
  trainer('gamin_eliott', 'gamin', 'Pau', ['babauet:42', 'goulinet:42']),
  trainer('mystique_calixte', 'mystique', 'Esclarmonde', ['blancome:43', 'mallet:44']),
  trainer('forgeron_balthazar', 'forgeron', 'Joan', ['mallet:44', 'goulinet:43']),
  trainer('ouvrier_leandre', 'forgeron', 'Arnau', ['taurnoir:44', 'babauet:43']),
  trainer('chercheuse_mireille', 'chercheuse', 'Marieta', ['babau:44', 'goulinet:44']),
  trainer('dresseur_sylvain', 'forgeron', 'Guilhem', ['grangoule:45', 'leberombre:43']),
  trainer('brune', 'championne', 'Brune', ['babauet:37', 'goulinet:39', 'taurnoir:40', 'grangoule:42'], { portrait: 'portrait/brune', ai: 'smart', last: true }),
  trainer('sbire_coeur_matthias', 'sbire_opale', 'Matthias', ['moinbourru:42', 'velucorne:42', 'galipote:43']),
  trainer('sbire_coeur_inaya', 'sbire_opale_f', 'Inaya', ['mallet:43', 'croquefrou:42']),
  trainer('sbire_coeur_stanislas', 'sbire_opale', 'Stanislas', ['ankou:43', 'blancome:42']),
  trainer('sbire_coeur_odile', 'sbire_opale_f', 'Azalaïs', ['galipote:43', 'follorage:43']),
  trainer('sbire_coeur_ruben', 'sbire_opale', 'Ruben', ['moinbourru:44', 'mallet:43']),
  trainer('lieutenant_aubane', 'lieutenant_opale', 'Aubane', ['velucorne:44', 'follorage:44', 'galipote:44', 'mallet:44']),
  trainer('ouvrier_coeur_anatole', 'ouvrier', 'Pèire', ['mallet:43', 'goulinet:43']),
  trainer('chercheuse_coeur_ines', 'chercheuse', 'Joana', ['galipote:44', 'ankou:44']),
  trainer('corvin_forge', 'fondateur_opale', 'Corvin', ['velucorne:38', 'moinbourru:39', 'follorage:42', 'mallet:42', 'blancelune:44'], { portrait: 'portrait/corvin', ai: 'smart', last: true }),
];
