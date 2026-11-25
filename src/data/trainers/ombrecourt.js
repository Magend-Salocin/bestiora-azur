// Trainers of the zone « ombrecourt » (prompt 10).
import { trainer, rival } from './helpers.js';

export default [
  trainer('danseuse_colombe', 'danseuse', 'Colombe', ['matagri:36', 'sotrin:37', 'birette:38']),
  trainer('gentleman_romuald', 'gentleman', 'Romuald', ['drapet:37', 'matagot:38']),
  trainer('dresseur_ludovic', 'cataphile', 'Ludovic', ['moinbourru:36', 'ankou:37', 'lubinou:36']),
  trainer('gentleman_valentin', 'gentleman', 'Valentin', ['sotremage:40', 'drapet:38']),
  trainer('dame_victoire', 'dame', 'Victoire', ['ankou:38', 'sotrin:38', 'matagot:39']),
  trainer('mystique_celeste', 'mystique', 'Céleste', ['croquefrou:36', 'blancome:37', 'revenant:37']),
  trainer('dresseur_barnabe', 'cataphile', 'Barnabé', ['dame_noire:37', 'camecruse:37', 'matagri:37']),
  trainer('chercheuse_morgane', 'chercheuse', 'Morgane', ['birette:38', 'ankou:38']),
  trainer('lazare', 'champion', 'Lazare', ['lubinou:33', 'camecruse:34', 'ankou:36', 'matagot:38']),
  trainer('sbire_qg_alban', 'sbire_opale', 'Alban', ['velucorne:37', 'gobelin:37']),
  trainer('sbire_qg_roxane', 'sbire_opale_f', 'Roxane', ['galipotin:37', 'moinillon:36']),
  trainer('sbire_qg_felix', 'sbire_opale', 'Félix', ['basilic:37', 'croquefrou:37', 'lubinou:38']),
  trainer('sbire_qg_nadege', 'sbire_opale_f', 'Nadège', ['camecruse:37', 'velucorne:38']),
  trainer('sbire_qg_thibault', 'sbire_opale', 'Thibault', ['gobelin:38', 'moinbourru:37']),
  trainer('sbire_qg_gaelle', 'sbire_opale_f', 'Gaëlle', ['galipotin:38', 'ankou:38']),
  trainer('sbire_qg_ysmeria', 'sbire_opale_f', 'Ysméria', ['velucorne:38', 'moinbourru:38', 'galipotin:39']),
  trainer('sbire_qg_clovis', 'sbire_opale', 'Clovis', ['croquefrou:38', 'gobelin:38', 'lubinou:39']),
  trainer('sbire_qg_perrine', 'sbire_opale_f', 'Perrine', ['basilic:38', 'camecruse:38', 'ankou:39']),
  trainer('sbire_qg_donatien', 'sbire_opale', 'Donatien', ['moinbourru:39', 'velucorne:39']),
  trainer('sbire_qg_lena', 'sbire_opale_f', 'Léna', ['galipote:39', 'ankou:39']),
  trainer('sbire_qg_ulrich', 'sbire_opale', 'Ulrich', ['gobelin:39', 'croquefrou:39', 'moinbourru:40']),
  trainer('lieutenant_sorel', 'lieutenant_opale', 'Sorel', ['velucorne:40', 'galipote:40', 'moinbourru:41', 'ankou:41']),
  trainer('corvin_qg', 'fondateur_opale', 'Corvin', ['velucorne:34', 'moinbourru:36', 'croquefrou:36', 'follorage:40']),
  rival('rival_5', {
    korrigan: ['farfator:31', 'hadelys:32', 'laminara:33', 'galtzagor:35'],
    galtza: ['farfator:31', 'hadelys:32', 'laminara:33', 'tarasque:35'],
    tarasquin: ['farfator:31', 'hadelys:32', 'laminara:33', 'korriroi:35'],
  }),
];
