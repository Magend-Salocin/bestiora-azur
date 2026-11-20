// Trainers of the zone « ligue » (prompt 11).
import { trainer, rival } from './helpers.js';

export default [
  trainer('montagnard_valentin', 'montagnard', 'Valentin', ['menhirgon:47', 'cabrecime:47', 'salamassif:48']),
  trainer('randonneuse_clothilde', 'campeuse', 'Clothilde', ['givrailes:47', 'frimours:48', 'cristelan:48']),
  trainer('dresseur_eliacin', 'randonneur', 'Éliacin', ['neveon:48', 'stoicor:48']),
  trainer('mystique_selma', 'mystique', 'Selma', ['cristelan:48', 'miroitage:49', 'brumaitre:49']),
  trainer('gentleman_augustin', 'gentleman', 'Augustin', ['enclumor:48', 'amperion:48', 'miroitage:49']),
  trainer('scientifique_thaddee', 'scientifique', 'Thaddée', ['cabrecime:49', 'salamassif:49', 'cristarche:50']),
  trainer('dame_clementine', 'dame', 'Clémentine', ['cervoral:49', 'dionavore:49', 'petalune:50']),
  trainer('dresseuse_ysaure', 'dresseuse', 'Ysaure', ['frimastoc:50', 'stoicor:50', 'neveon:50']),
  trainer('randonneur_barthelemy', 'randonneur', 'Barthélemy', ['menhirgon:50', 'salamassif:50', 'crabastion:50']),
  trainer('campeuse_zephirine', 'campeuse', 'Zéphirine', ['cumulard:50', 'albavent:51', 'volplaneur:50']),
  trainer('ouvrier_lazlo', 'ouvrier', 'Lazlo', ['enclumor:50', 'lingotard:50', 'amperion:51']),
  trainer('chercheuse_aurelie', 'chercheuse', 'Aurélie', ['cristelan:51', 'neveon:51', 'givrailes:50']),
  trainer('mystique_ephrem', 'mystique', 'Éphrem', ['brumaitre:51', 'nocturbe:50', 'glasnuit:50']),
  trainer('montagnard_ptolemee', 'montagnard', 'Ptolémée', ['cabrecime:52', 'stoicor:52', 'menhirgon:51']),
  trainer('gentleman_sigismond', 'gentleman', 'Sigismond', ['miroitage:52', 'amperion:52', 'cristarche:52']),
  trainer('dresseuse_lucienne', 'dresseuse', 'Lucienne', ['fangeroi:52', 'salamassif:52', 'brumaitre:52']),
  trainer('gardien_metal', 'gardien', 'Aldebert', ['boulonnier:54', 'miroitage:55', 'amperion:56', 'enclumor:57', 'fonderion:57'], { ai: 'smart', last: true }),
  trainer('gardienne_combat', 'gardienne', 'Ségolène', ['fonderion:53', 'octobras:52', 'stoicor:52', 'cabrecime:53', 'frimastoc:53'], { ai: 'smart', last: true }),
  trainer('gardien_givre', 'gardien', 'Florimond', ['frimastoc:58', 'frimours:58', 'stoicor:58', 'neveon:58', 'cristarche:58'], { ai: 'smart', last: true }),
  trainer('gardienne_terre', 'gardienne', 'Mathilde', ['crassolard:53', 'pestorne:54', 'fangeroi:55', 'salamassif:56', 'menhirgon:58'], { ai: 'smart', last: true }),
  rival('rival_6', {
    fenouillot: ['brumaitre:45', 'stoicor:46', 'cabrecime:46', 'pyrogrue:48'],
    braisille: ['brumaitre:45', 'stoicor:46', 'cabrecime:46', 'marevor:48'],
    flaquin: ['brumaitre:45', 'stoicor:46', 'cabrecime:46', 'sylvenard:48'],
  }),
  rival('rival_maitre', {
    fenouillot: ['miroitage:58', 'quartzard:58', 'scoriarque:58', 'volplaneur:58', 'enclumor:58', 'pyrogrue:60'],
    braisille: ['miroitage:58', 'quartzard:58', 'scoriarque:58', 'volplaneur:58', 'enclumor:58', 'marevor:60'],
    flaquin: ['brumaitre:59', 'scoriarque:59', 'stoicor:59', 'volplaneur:59', 'cristarche:59', 'sylvenard:62'],
  }, { ai: 'smart', last: true }),
  rival('rival_maitre_plus', {
    fenouillot: ['brumaitre:70', 'cristarche:71', 'stoicor:71', 'volplaneur:70', 'raieciel:72', 'pyrogrue:72'],
    braisille: ['miroitage:70', 'cabrecime:71', 'amperion:71', 'cumulard:70', 'brumaitre:72', 'marevor:72'],
    flaquin: ['brumaitre:70', 'scoriarque:71', 'stoicor:71', 'volplaneur:70', 'cristarche:72', 'sylvenard:72'],
  }, { ai: 'smart', last: true }),
  trainer('gardien_metal_plus', 'gardien', 'Aldebert', ['boulonnier:67', 'miroitage:67', 'amperion:68', 'enclumor:69', 'fonderion:70'], { ai: 'smart', last: true }),
  trainer('gardienne_combat_plus', 'gardienne', 'Ségolène', ['bouquetor:69', 'octobras:70', 'stoicor:71', 'cabrecime:72', 'frimastoc:72'], { ai: 'smart', last: true }),
  trainer('gardien_givre_plus', 'gardien', 'Florimond', ['frimastoc:72', 'frimours:72', 'stoicor:72', 'neveon:72', 'cristarche:72'], { ai: 'smart', last: true }),
  trainer('gardienne_terre_plus', 'gardienne', 'Mathilde', ['crassolard:65', 'venimorde:65', 'ombrellor:65', 'salamassif:65', 'menhirgon:65'], { ai: 'smart', last: true }),
];
