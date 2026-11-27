// Col des Échos (Provence): farandole in 6/8, E minor. The thin square at 12.5 % plays the
// galoubet (three-hole flute), the noise voice the tambourin that marks every step.
// Original melody (prompt 4).
import { chord, times } from './patterns.js';

const CHORDS = [
  'Em', 'Em', 'D', 'D', 'Em', 'Em', 'B', 'Em',
  'Em', 'Em', 'D', 'D', 'Em', 'Em', 'B', 'Em',
  'Em', 'Em', 'D', 'Am', 'Em', 'Em', 'B', 'Em',
];

export default {
  id: 'route_ligue',
  tempo: 136,
  channels: {
    1: `P12 V11
      E5 F#5 G5 A5 G5 F#5 E5:4 B4 E5:4 G5 F#5 G5 A5 B5 A5 G5 F#5:4 D5 F#5:4 A5
      G5 A5 B5 C6 B5 A5 G5:4 E5 G5:4 B5 A5 G5 F#5 E5 F#5 D#5 E5:2.
      B5 C6 B5 A5 G5 A5 B5:4 G5 E5:4 G5 A5 B5 A5 G5 F#5 G5 A5:4 F#5 D5:4 F#5
      G5 A5 G5 F#5 E5 F#5 G5:4 B5 E6:4 D6 C6 B5 A5 G5 F#5 D#5 E5:2.
      G5:4 G5 A5:4 A5 B5:4. G5:4. A5:4 A5 B5:4 B5 C6:4. A5:4.
      B5 A5 G5 F#5 G5 A5 B5:4 E5 G5:4 B5 A5 G5 F#5 E5 D#5 F#5 E5:2.`,
    2: `P25 V4 ${CHORDS.map((name) => `${chord(name).tones[1]}:2.`).join(' ')}`,
    3: `W1 V10 ${CHORDS.map((name) => `${chord(name).root}:4. ${chord(name).fifth}:4.`).join(' ')}`,
    4: `N15 V6 S-2 ${times('X8 X3 X3 X8 X3 X3', 24)}`,
  },
};
