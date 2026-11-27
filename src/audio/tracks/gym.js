// Arena theme shared by every arena (A minor, march). Original melody (prompt 4).
import { DRUMS, chord, chordArp, drive, times } from './patterns.js';

const CHORDS = ['Am', 'F', 'C', 'G', 'Am', 'F', 'E', 'E', 'F', 'G', 'C', 'Am', 'Dm', 'E', 'Am', 'E'];

export default {
  id: 'gym',
  tempo: 120,
  channels: {
    1: `P50 V11
      A4:4 C5 E5 A5:4 G5:4 | F5:4. E5 D5:4 C5:4 | E5:4 G5 E5 C5:4 E5:4 | D5:2 B4:4 G4:4
      A4:4 C5 E5 A5:4 B5:4 | C6:4. B5 A5:4 F5:4 | G#5:4 E5 F5 G#5:4 B5:4 | B5:2 G#5:4 E5:4
      A5:4 F5 A5 C6:4 A5:4 | B5:4 G5 B5 D6:4 B5:4 | C6:4. B5 A5:4 G5:4 | E5:2 A5:4 C6:4
      D6:4 C6 B5 A5:4 F5:4 | G#5:4 A5 B5 E5:4 G#5:4 | A5:4 E5 C5 A4:4 C5:4 | B4:2 E5:4 G#5:4`,
    2: `P25 V6 ${chordArp(CHORDS)}`,
    3: `W1 V10 ${CHORDS.map((name) => drive(chord(name).root, chord(name).fifth)).join(' ')}`,
    4: `N15 V7 S-2 ${times(DRUMS.march, 16)}`,
  },
};
