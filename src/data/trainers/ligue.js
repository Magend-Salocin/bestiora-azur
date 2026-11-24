// Trainers of the zone « ligue » (prompt 11).
import { trainer, rival } from './helpers.js';

export default [
  trainer('montagnard_valentin', 'montagnard', 'Valentin', ['gargouille:47', 'cabro_dor:47', 'dracrhodan:48']),
  trainer('randonneuse_clothilde', 'campeuse', 'Clothilde', ['barbegazi:47', 'vosgar:48', 'alicornet:48']),
  trainer('dresseur_eliacin', 'randonneur', 'Éliacin', ['dahu:48', 'gevaudan:48']),
  trainer('mystique_selma', 'mystique', 'Selma', ['alicornet:48', 'sotremage:49', 'blancelune:49']),
  trainer('gentleman_augustin', 'gentleman', 'Augustin', ['mallet:48', 'follorage:48', 'sotremage:49']),
  trainer('scientifique_thaddee', 'scientifique', 'Thaddée', ['cabro_dor:49', 'dracrhodan:49', 'alicorne:50']),
  trainer('dame_clementine', 'dame', 'Clémentine', ['fadeon:49', 'bugul_noz:49', 'margelle:50']),
  trainer('dresseuse_ysaure', 'dresseuse', 'Ysaure', ['vosgarde:50', 'gevaudan:50', 'dahu:50']),
  trainer('randonneur_barthelemy', 'randonneur', 'Barthélemy', ['gargouille:50', 'dracrhodan:50', 'goemonroc:50']),
  trainer('campeuse_zephirine', 'campeuse', 'Zéphirine', ['hellequin:50', 'goelame:51', 'serpvolant:50']),
  trainer('ouvrier_lazlo', 'ouvrier', 'Lazlo', ['mallet:50', 'servarmure:50', 'follorage:51']),
  trainer('chercheuse_aurelie', 'chercheuse', 'Aurélie', ['alicornet:51', 'dahu:51', 'barbegazi:50']),
  trainer('mystique_ephrem', 'mystique', 'Éphrem', ['blancelune:51', 'birette:50', 'revenant:50']),
  trainer('montagnard_ptolemee', 'montagnard', 'Ptolémée', ['cabro_dor:52', 'gevaudan:52', 'gargouille:51']),
  trainer('gentleman_sigismond', 'gentleman', 'Sigismond', ['sotremage:52', 'follorage:52', 'alicorne:52']),
  trainer('dresseuse_lucienne', 'dresseuse', 'Lucienne', ['graoully:52', 'dracrhodan:52', 'blancelune:52']),
  trainer('gardien_metal', 'gardien', 'Aldebert', ['gobelin:54', 'sotremage:55', 'follorage:56', 'mallet:57', 'servargent:57'], { ai: 'smart', last: true }),
  trainer('gardienne_combat', 'gardienne', 'Ségolène', ['servargent:53', 'nainmarin:52', 'gevaudan:52', 'cabro_dor:53', 'vosgarde:53'], { ai: 'smart', last: true }),
  trainer('gardien_givre', 'gardien', 'Florimond', ['vosgarde:58', 'vosgar:58', 'gevaudan:58', 'dahu:58', 'alicorne:58'], { ai: 'smart', last: true }),
  trainer('gardienne_terre', 'gardienne', 'Mathilde', ['velucorne:53', 'galipote:54', 'graoully:55', 'dracrhodan:56', 'gargouille:58'], { ai: 'smart', last: true }),
  rival('rival_6', {
    korrigan: ['blancelune:45', 'gevaudan:46', 'cabro_dor:46', 'galtzagor:48'],
    galtza: ['blancelune:45', 'gevaudan:46', 'cabro_dor:46', 'tarasque:48'],
    tarasquin: ['blancelune:45', 'gevaudan:46', 'cabro_dor:46', 'korriroi:48'],
  }),
  rival('rival_maitre', {
    korrigan: ['sotremage:58', 'houlecrin:58', 'babau:58', 'serpvolant:58', 'mallet:58', 'galtzagor:60'],
    galtza: ['sotremage:58', 'houlecrin:58', 'babau:58', 'serpvolant:58', 'mallet:58', 'tarasque:60'],
    tarasquin: ['blancelune:59', 'babau:59', 'gevaudan:59', 'serpvolant:59', 'alicorne:59', 'korriroi:62'],
  }, { ai: 'smart', last: true }),
  rival('rival_maitre_plus', {
    korrigan: ['blancelune:70', 'alicorne:71', 'gevaudan:71', 'serpvolant:70', 'sirenor:72', 'galtzagor:72'],
    galtza: ['sotremage:70', 'cabro_dor:71', 'follorage:71', 'hellequin:70', 'blancelune:72', 'tarasque:72'],
    tarasquin: ['blancelune:70', 'babau:71', 'gevaudan:71', 'serpvolant:70', 'alicorne:72', 'korriroi:72'],
  }, { ai: 'smart', last: true }),
  trainer('gardien_metal_plus', 'gardien', 'Aldebert', ['gobelin:67', 'sotremage:67', 'follorage:68', 'mallet:69', 'servargent:70'], { ai: 'smart', last: true }),
  trainer('gardienne_combat_plus', 'gardienne', 'Ségolène', ['cabridor:69', 'nainmarin:70', 'gevaudan:71', 'cabro_dor:72', 'vosgarde:72'], { ai: 'smart', last: true }),
  trainer('gardien_givre_plus', 'gardien', 'Florimond', ['vosgarde:72', 'vosgar:72', 'gevaudan:72', 'dahu:72', 'alicorne:72'], { ai: 'smart', last: true }),
  trainer('gardienne_terre_plus', 'gardienne', 'Mathilde', ['velucorne:65', 'basilic:65', 'morgavague:65', 'dracrhodan:65', 'gargouille:65'], { ai: 'smart', last: true }),
];
