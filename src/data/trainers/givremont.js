// Trainers of the zone « givremont » (prompt 10).
import { trainer, rival } from './helpers.js';

export default [
  trainer('randonneur_hilaire', 'randonneur', 'Hilaire', ['barbegazi:44', 'vosgar:45']),
  trainer('campeuse_gwenaelle', 'campeuse', 'Gwenaëlle', ['barbegel:44', 'vosgoup:44', 'cabro_dor:46']),
  trainer('mystique_balthus', 'mystique', 'Balthus', ['alicornet:46', 'gevaudan:47']),
  trainer('mystique_alizee', 'mystique', 'Alizée', ['sotremage:46', 'melusine:45']),
  trainer('savant_theodule', 'scientifique', 'Théodule', ['fadeon:46', 'blancelune:46']),
  trainer('mystique_sybille', 'mystique', 'Sybille', ['birette:46', 'sotremage:47']),
  trainer('archimage_gaspard', 'mystique', 'Gaspard', ['alicornet:47', 'melusine:47']),
  trainer('oswin', 'champion', 'Oswin', ['fadeon:43', 'sotremage:45', 'blancelune:47', 'alicorne:48', 'gevaudan:50'], { portrait: 'portrait/oswin', ai: 'smart', last: true }),
];
