// Trainers of the zone « ombrecourt » (prompt 10).
import { trainer, rival } from './helpers.js';

export default [
  trainer('danseuse_colombe', 'danseuse', 'Colombe', ['chafouin:36', 'miroitin:37', 'nocturbe:38']),
  trainer('gentleman_romuald', 'gentleman', 'Romuald', ['chipotard:37', 'chafourbe:38']),
  trainer('dresseur_ludovic', 'dresseur', 'Ludovic', ['fusiblard:36', 'lustrombre:37', 'noctulard:36']),
  trainer('gentleman_valentin', 'gentleman', 'Valentin', ['miroitage:40', 'chipotard:38']),
  trainer('dame_victoire', 'dame', 'Victoire', ['lustrombre:38', 'miroitin:38', 'chafourbe:39']),
  trainer('mystique_celeste', 'mystique', 'Céleste', ['sombrecor:36', 'brumoire:37', 'glasnuit:37']),
  trainer('dresseur_barnabe', 'dresseur', 'Barnabé', ['stalactor:37', 'filandrix:37', 'chafouin:37']),
  trainer('chercheuse_morgane', 'chercheuse', 'Morgane', ['nocturbe:38', 'lustrombre:38']),
  trainer('lazare', 'champion', 'Lazare', ['noctulard:33', 'filandrix:34', 'lustrombre:36', 'chafourbe:38']),
  trainer('sbire_qg_alban', 'sbire_opale', 'Alban', ['crassolard:37', 'boulonnier:37']),
  trainer('sbire_qg_roxane', 'sbire_opale_f', 'Roxane', ['pestelet:37', 'fusiblet:36']),
  trainer('sbire_qg_felix', 'sbire_opale', 'Félix', ['venimorde:37', 'sombrecor:37', 'noctulard:38']),
  trainer('sbire_qg_nadege', 'sbire_opale_f', 'Nadège', ['filandrix:37', 'crassolard:38']),
  trainer('sbire_qg_thibault', 'sbire_opale', 'Thibault', ['boulonnier:38', 'fusiblard:37']),
  trainer('sbire_qg_gaelle', 'sbire_opale_f', 'Gaëlle', ['pestelet:38', 'lustrombre:38']),
  trainer('sbire_qg_ysmeria', 'sbire_opale_f', 'Ysméria', ['crassolard:38', 'fusiblard:38', 'pestelet:39']),
  trainer('sbire_qg_clovis', 'sbire_opale', 'Clovis', ['sombrecor:38', 'boulonnier:38', 'noctulard:39']),
  trainer('sbire_qg_perrine', 'sbire_opale_f', 'Perrine', ['venimorde:38', 'filandrix:38', 'lustrombre:39']),
  trainer('sbire_qg_donatien', 'sbire_opale', 'Donatien', ['fusiblard:39', 'crassolard:39']),
  trainer('sbire_qg_lena', 'sbire_opale_f', 'Léna', ['pestorne:39', 'lustrombre:39']),
  trainer('sbire_qg_ulrich', 'sbire_opale', 'Ulrich', ['boulonnier:39', 'sombrecor:39', 'fusiblard:40']),
  trainer('lieutenant_sorel', 'lieutenant_opale', 'Sorel', ['crassolard:40', 'pestorne:40', 'fusiblard:41', 'lustrombre:41']),
  trainer('corvin_qg', 'fondateur_opale', 'Corvin', ['crassolard:34', 'fusiblard:36', 'sombrecor:36', 'amperion:40']),
  rival('rival_5', {
    fenouillot: ['aquilard:31', 'lumirande:32', 'brochemor:33', 'pyrogrue:35'],
    braisille: ['aquilard:31', 'lumirande:32', 'brochemor:33', 'marevor:35'],
    flaquin: ['aquilard:31', 'lumirande:32', 'brochemor:33', 'sylvenard:35'],
  }),
];
