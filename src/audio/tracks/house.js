// Inside a house, shared by the houses outside Hameau-de-Lys (G major, quiet, no percussion).
// Original melody (prompt 4).
import { chord, times } from './patterns.js';

const CHORDS = ['G', 'D', 'Em', 'C', 'G', 'Am', 'D', 'D', 'Em', 'C', 'D', 'G'];

export default {
  id: 'house',
  tempo: 84,
  channels: {
    1: `P50 V9
      B4:4 D5:4 G5:2 | F#5:4 E5 D5 A4:2 | G4:4 B4:4 E5:4. D5 | C5:2 E5:2
      D5:4 B4 G4 D5:4 G5:4 | E5:2. C5:4 | D5:4 F#5 A5 F#5:4 D5:4 | E5:2 F#5:2
      G5:4 F#5 E5 B4:2 | C5:4 E5:4 G5:4 E5:4 | D5:4 F#5:4 A4:4 C5:4 | B4:1`,
    2: `P50 V5 ${CHORDS.map((name) => `${chord(name).tones[0]}:2 ${chord(name).tones[2]}:2`).join(' ')}`,
    3: `W1 V8 ${CHORDS.map((name) => `${chord(name).root}:2 ${chord(name).fifth}:2`).join(' ')}`,
    4: `N15 V0 ${times('R:1', 12)}`,
  },
};
