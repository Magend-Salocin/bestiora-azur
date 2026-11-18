// Trainers of the zone « givremont » (prompt 10).
import { trainer, rival } from './helpers.js';

export default [
  trainer('randonneur_hilaire', 'randonneur', 'Hilaire', ['givrailes:44', 'frimours:45']),
  trainer('campeuse_gwenaelle', 'campeuse', 'Gwenaëlle', ['givrelet:44', 'frimousson:44', 'cabrecime:46']),
  trainer('mystique_balthus', 'mystique', 'Balthus', ['cristelan:46', 'stoicor:47']),
  trainer('mystique_alizee', 'mystique', 'Alizée', ['miroitage:46', 'grimoulix:45']),
  trainer('savant_theodule', 'scientifique', 'Théodule', ['cervoral:46', 'brumaitre:46']),
  trainer('mystique_sybille', 'mystique', 'Sybille', ['nocturbe:46', 'miroitage:47']),
  trainer('archimage_gaspard', 'mystique', 'Gaspard', ['cristelan:47', 'grimoulix:47']),
  trainer('oswin', 'champion', 'Oswin', ['cervoral:43', 'miroitage:45', 'brumaitre:47', 'cristarche:48', 'stoicor:50'], { portrait: 'portrait/oswin', ai: 'smart', last: true }),
];
