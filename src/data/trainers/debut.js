// Trainers of the zone « debut » (prompt 09).
import { trainer, rival } from './helpers.js';

export default [
  // Lab, Hameau-de-Lys. Keys = the PLAYER's starter.
  rival('rival_1', {
    // Fresh starter: only basic moves, so the first battle is not decided by the type advantage.
    korrigan: [{ creature: 'galtza', level: 6, moves: ['egratignure', 'ardeur'] }],
    galtza: [{ creature: 'tarasquin', level: 3, moves: ['elan_vif'] }],
    tarasquin: [{ creature: 'korrigan', level: 6, moves: ['egratignure', 'spore_raide'] }],
  }),

  // Route 1
  trainer('route_1_gamin_theo', 'gamin', 'Gatien', ['farfadet:3']),
  trainer('route_1_fillette_lise', 'fillette', 'Agnès', ['poulpiquet:3', 'chauchet:3']),
  trainer('route_1_ecolier_marius', 'ecolier', 'Florent', ['faramin:5']),

  // Roche arena, Bourg-Sablon
  trainer('arene_roche_randonneur_basile', 'carrier', 'Mathurin', ['gargoulin:8', 'carcolh:9'], { moneyBase: 30 }),
  trainer('arene_roche_montagnard_gaspard', 'carrier', 'Aimé', ['bolegan:10']),
  trainer('arene_roche_randonneuse_ines', 'randonneuse', 'Perrine', ['gargoulin:10', 'houlin:11']),
  trainer('garance', 'championne', 'Garance', ['gargoulin:10', 'carcolh:10', 'houlin:10', 'gargoulin:12'], {
    ai: 'smart', last: true, portrait: 'portrait/garance',
  }),
];
