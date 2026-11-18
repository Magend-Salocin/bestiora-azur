// Trainers of the zone « forge » (prompt 10).
import { trainer, rival } from './helpers.js';

export default [
  trainer('ouvrier_tiburce', 'ouvrier', 'Tiburce', ['tisonnet:42', 'enclumor:43']),
  trainer('randonneur_isidore', 'randonneur', 'Isidore', ['pyrobelier:43', 'cendrador:42']),
  trainer('gamin_eliott', 'gamin', 'Éliott', ['scorielle:42', 'tisonnet:42']),
  trainer('mystique_calixte', 'mystique', 'Calixte', ['brumoire:43', 'enclumor:44']),
  trainer('forgeron_balthazar', 'ouvrier', 'Balthazar', ['enclumor:44', 'tisonnet:43']),
  trainer('ouvrier_leandre', 'ouvrier', 'Léandre', ['pyrobelier:44', 'scorielle:43']),
  trainer('chercheuse_mireille', 'chercheuse', 'Mireille', ['scoriarque:44', 'tisonnet:44']),
  trainer('dresseur_sylvain', 'randonneur', 'Sylvain', ['tisonnard:45', 'cendrador:43']),
  trainer('brune', 'champion', 'Brune', ['scorielle:37', 'tisonnet:39', 'pyrobelier:40', 'tisonnard:42'], { portrait: 'portrait/brune', ai: 'smart', last: true }),
  trainer('sbire_coeur_matthias', 'sbire_opale', 'Matthias', ['fusiblard:42', 'crassolard:42', 'pestorne:43']),
  trainer('sbire_coeur_inaya', 'sbire_opale_f', 'Inaya', ['enclumor:43', 'sombrecor:42']),
  trainer('sbire_coeur_stanislas', 'sbire_opale', 'Stanislas', ['lustrombre:43', 'brumoire:42']),
  trainer('sbire_coeur_odile', 'sbire_opale_f', 'Odile', ['pestorne:43', 'amperion:43']),
  trainer('sbire_coeur_ruben', 'sbire_opale', 'Ruben', ['fusiblard:44', 'enclumor:43']),
  trainer('lieutenant_aubane', 'lieutenant_opale', 'Aubane', ['crassolard:44', 'amperion:44', 'pestorne:44', 'enclumor:44']),
  trainer('ouvrier_coeur_anatole', 'ouvrier', 'Anatole', ['enclumor:43', 'tisonnet:43']),
  trainer('chercheuse_coeur_ines', 'chercheuse', 'Inès', ['pestorne:44', 'lustrombre:44']),
  trainer('corvin_forge', 'fondateur_opale', 'Corvin', ['crassolard:38', 'fusiblard:39', 'amperion:42', 'enclumor:42', 'brumaitre:44'], { portrait: 'portrait/corvin', ai: 'smart', last: true }),
];
