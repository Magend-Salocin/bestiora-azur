// Givremont (Auvergne-Rhône-Alpes): bourrée in 3/8, written as 6/8 measures, G major.
// The melody limps long-short like the dance; the wave voice holds the drone of a cabrette
// (bagpipe), voice 2 marks the offbeats. Original melody (prompt 4).
import { chord, times } from './patterns.js';

const CHORDS = [
  'G', 'G', 'C', 'G', 'G', 'C', 'D', 'G',
  'D', 'G', 'C', 'D', 'D', 'G', 'D', 'D',
  'G', 'C', 'D', 'G', 'C', 'D', 'D', 'G',
];

export default {
  id: 'town_givremont',
  tempo: 140,
  channels: {
    1: `P25 V11
      G5:4 A5 B5:4 G5 D5:4 E5 D5:4 B4 C5:4 D5 E5:4 C5 D5:4. B4:4 G4
      G5:4 A5 B5:4 G5 C6:4 B5 A5:4 G5 F#5:4 G5 A5:4 F#5 G5:2.
      A5:4 B5 C6:4 A5 B5:4 A5 G5:4 D5 E5:4 F#5 G5:4 E5 D5:4. A4:4 D5
      A5:4 B5 C6:4 A5 D6:4 C6 B5:4 G5 A5:4 G5 F#5:4 E5 D5:2.
      B5:4 C6 D6:4 B5 C6:4 B5 A5:4 G5 A5:4 B5 C6:4 A5 B5:4. G5:4 D5
      E5:4 F#5 G5:4 E5 D5:4 E5 F#5:4 A5 G5:4 F#5 E5:4 F#5 G5:2.`,
    2: `P50 V5 ${CHORDS.map((name) => { const [, third, fifth] = chord(name).tones; return `R ${third} ${fifth} R ${third} ${fifth}`; }).join(' ')}`,
    3: `W1 V9 ${times('G2:4. D2:4.', 24)}`,
    4: `N15 V5 S-2 ${times('X10:4 X3 X5:4 X3', 24)}`,
  },
};
