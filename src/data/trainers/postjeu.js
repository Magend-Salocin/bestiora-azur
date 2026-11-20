// Trainers of the zone « postjeu » (prompt 11).
import { trainer, rival } from './helpers.js';

export default [
  trainer('randonneur_amaury', 'randonneur', 'Amaury', ['volplaneur:60', 'cumulard:60', 'albavent:61']),
  trainer('montagnard_hildebert', 'montagnard', 'Hildebert', ['cabrecime:60', 'stoicor:61', 'menhirgon:60']),
  trainer('mystique_mahaut', 'mystique', 'Mahaut', ['miroitage:61', 'brumaitre:61', 'cristarche:62']),
  trainer('randonneuse_ottilie', 'campeuse', 'Ottilie', ['frimastoc:61', 'neveon:61', 'givrailes:60']),
  trainer('scientifique_gwendal', 'scientifique', 'Gwendal', ['amperion:61', 'fulmarene:62', 'raieciel:61']),
  trainer('dresseur_aldric', 'randonneur', 'Aldric', ['stoicor:62', 'cristarche:62', 'salamassif:61']),
  trainer('randonneur_osmond', 'randonneur', 'Osmond', ['givrailes:55', 'frimours:55', 'cristelan:56']),
  trainer('campeuse_berenice', 'campeuse', 'Bérénice', ['neveon:56', 'frimastoc:56', 'glasnuit:55']),
  trainer('chercheuse_isaure', 'chercheuse', 'Isaure', ['cristarche:57', 'cristelan:56', 'miroitage:56']),
  trainer('montagnard_gunther', 'montagnard', 'Günther', ['menhirgon:56', 'cabrecime:57', 'stoicor:57']),
  trainer('mystique_edmee', 'mystique', 'Edmée', ['neveon:57', 'brumaitre:57', 'cristarche:58']),
  trainer('dresseur_wolfram', 'randonneur', 'Wolfram', ['frimastoc:58', 'stoicor:58', 'neveon:58']),
  trainer('garance_revanche', 'championne', 'Garance', ['quartzard:64', 'tisonnard:64', 'fonderion:64', 'menhirgon:64', 'cabrecime:64'], { ai: 'smart', last: true, portrait: 'portrait/garance' }),
  trainer('mael_revanche', 'champion', 'Maël', ['ombrellor:65', 'epavard:65', 'crabastion:65', 'brochemor:66', 'grimoulix:66'], { ai: 'smart', last: true, portrait: 'portrait/mael' }),
  trainer('selene_revanche', 'championne', 'Sélène', ['lampyrex:64', 'ampoulard:64', 'fusiblard:65', 'amperion:62', 'piquevolt:64'], { ai: 'smart', last: true, portrait: 'portrait/selene' }),
  trainer('aubin_revanche', 'champion', 'Aubin', ['morillard:64', 'ronceroc:64', 'dionavore:65', 'corolline:65', 'bousigor:65', 'cervoral:66'], { ai: 'smart', last: true, portrait: 'portrait/aubin' }),
  trainer('ysolde_revanche', 'championne', 'Ysolde', ['givrailes:65', 'girouette:65', 'cumulard:65', 'bousigor:66', 'raieciel:66', 'lumirande:66'], { ai: 'smart', last: true, portrait: 'portrait/ysolde' }),
  trainer('lazare_revanche', 'champion', 'Lazare', ['glasnuit:65', 'chafourbe:66', 'nocturbe:66', 'lustrombre:66', 'brumaitre:66'], { ai: 'smart', last: true, portrait: 'portrait/lazare' }),
  trainer('brune_revanche', 'champion', 'Brune', ['cendrador:65', 'scoriarque:66', 'pyrobelier:66', 'enclumor:66', 'tisonnard:66'], { ai: 'smart', last: true, portrait: 'portrait/brune' }),
  trainer('oswin_revanche', 'champion', 'Oswin', ['lumirande:66', 'raieciel:66', 'grimoulix:66', 'cristarche:66', 'brumaitre:66', 'cervoral:66'], { ai: 'smart', last: true, portrait: 'portrait/oswin' }),
];
