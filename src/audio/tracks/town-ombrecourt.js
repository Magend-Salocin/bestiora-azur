// Ombrecourt (Île-de-France): valse musette in 3/4, A minor. The square at 25 % plays the
// accordion; the wave voice gives the bass on the first beat, voice 2 the chords on beats 2 and 3.
// Original melody (prompt 4).
import { chord, times } from './patterns.js';

const CHORDS = [
  'Am', 'Am', 'Dm', 'Dm', 'E', 'E', 'Am', 'Am',
  'Am', 'Am', 'Dm', 'Dm', 'E', 'E', 'Am', 'Am',
  'F', 'F', 'C', 'C', 'Dm', 'E', 'Am', 'E',
];

export default {
  id: 'town_ombrecourt',
  tempo: 138,
  channels: {
    1: `P25 V10
      E5:4 A5:4 C6:4 B5:4. A5 G#5:4 A5:2 F5:4 D5:2.
      E5:4 G#5:4 B5:4 D6:4. C6 B5:4 C6:4 B5:4 A5:4 E5:2.
      E5:4 A5:4 C6:4 E6:4. D6 C6:4 D6:4 F5:4 A5:4 D6:2.
      B5:4 G#5:4 E5:4 F5:4. E5 D5:4 C5:4 E5:4 A5:4 A5:2.
      F5:4 A5:4 C6:4 A5:4. G5 F5:4 E5:4 G5:4 C6:4 G5:2.
      F5:4 A5:4 D6:4 B5:4. A5 G#5:4 A5:4 C6:4 E5:4 B5:2.`,
    2: `P50 V6 ${CHORDS.map((name) => `R:4 ${chord(name).tones[1]}:4 ${chord(name).tones[1]}:4`).join(' ')}`,
    3: `W1 V10 ${CHORDS.map((name, bar) => `${bar % 2 ? chord(name).fifth : chord(name).root}:4 R:2`).join(' ')}`,
    4: `N15 V4 S-2 ${times('X2:4 X1:4 X1:4', 24)}`,
  },
};
