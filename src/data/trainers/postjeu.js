// Trainers of the zone « postjeu » (prompt 11).
import { trainer, rival } from './helpers.js';

export default [
  trainer('randonneur_amaury', 'randonneur', 'Amaury', ['serpvolant:60', 'hellequin:60', 'goelame:61']),
  trainer('montagnard_hildebert', 'montagnard', 'Hildebert', ['cabro_dor:60', 'gevaudan:61', 'gargouille:60']),
  trainer('mystique_mahaut', 'mystique', 'Mahaut', ['sotremage:61', 'blancelune:61', 'alicorne:62']),
  trainer('randonneuse_ottilie', 'campeuse', 'Ottilie', ['vosgarde:61', 'dahu:61', 'barbegazi:60']),
  trainer('scientifique_gwendal', 'scientifique', 'Gwendal', ['follorage:61', 'coulobre:62', 'sirenor:61']),
  trainer('dresseur_aldric', 'randonneur', 'Aldric', ['gevaudan:62', 'alicorne:62', 'dracrhodan:61']),
  trainer('randonneur_osmond', 'randonneur', 'Osmond', ['barbegazi:55', 'vosgar:55', 'alicornet:56']),
  trainer('campeuse_berenice', 'campeuse', 'Bérénice', ['dahu:56', 'vosgarde:56', 'revenant:55']),
  trainer('chercheuse_isaure', 'chercheuse', 'Isaure', ['alicorne:57', 'alicornet:56', 'sotremage:56']),
  trainer('montagnard_gunther', 'montagnard', 'Günther', ['gargouille:56', 'cabro_dor:57', 'gevaudan:57']),
  trainer('mystique_edmee', 'mystique', 'Edmée', ['dahu:57', 'blancelune:57', 'alicorne:58']),
  trainer('dresseur_wolfram', 'randonneur', 'Wolfram', ['vosgarde:58', 'gevaudan:58', 'dahu:58']),
  trainer('garance_revanche', 'championne', 'Garance', ['houlecrin:64', 'grangoule:64', 'servargent:64', 'gargouille:64', 'cabro_dor:64'], { ai: 'smart', last: true, portrait: 'portrait/garance' }),
  trainer('mael_revanche', 'champion', 'Maël', ['morgavague:65', 'bagnoz:65', 'goemonroc:65', 'laminara:66', 'melusine:66'], { ai: 'smart', last: true, portrait: 'portrait/mael' }),
  trainer('selene_revanche', 'championne', 'Sélène', ['follumine:64', 'follaclair:64', 'moinbourru:65', 'follorage:62', 'fouletot:64'], { ai: 'smart', last: true, portrait: 'portrait/selene' }),
  trainer('aubin_revanche', 'champion', 'Aubin', ['mandragoul:64', 'roncefee:64', 'bugul_noz:65', 'margolys:65', 'carcolosse:65', 'fadeon:66'], { ai: 'smart', last: true, portrait: 'portrait/aubin' }),
  trainer('ysolde_revanche', 'championne', 'Ysolde', ['barbegazi:65', 'bayard:65', 'hellequin:65', 'carcolosse:66', 'sirenor:66', 'hadelys:66'], { ai: 'smart', last: true, portrait: 'portrait/ysolde' }),
  trainer('lazare_revanche', 'champion', 'Lazare', ['revenant:65', 'matagot:66', 'birette:66', 'ankou:66', 'blancelune:66'], { ai: 'smart', last: true, portrait: 'portrait/lazare' }),
  trainer('brune_revanche', 'champion', 'Brune', ['leberombre:65', 'babau:66', 'taurnoir:66', 'mallet:66', 'grangoule:66'], { ai: 'smart', last: true, portrait: 'portrait/brune' }),
  trainer('oswin_revanche', 'champion', 'Oswin', ['hadelys:66', 'sirenor:66', 'melusine:66', 'alicorne:66', 'blancelune:66', 'fadeon:66'], { ai: 'smart', last: true, portrait: 'portrait/oswin' }),
];
