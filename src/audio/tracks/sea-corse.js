// Routes 9 and 10, Ilots (Corse): slow three-voice song in the manner of a paghjella, A minor.
// The secunda leads (voice 1), the terza sings above (voice 2), the bassu holds below (wave);
// the last chord opens on a major third. Sea swell on the noise voice. Original melody (prompt 4).

export default {
  id: 'sea_corse',
  tempo: 72,
  channels: {
    1: `P50 V9
      E5:2. D5 E5 | C5:2 D5:4 E5:4 | F5:2. E5 D5 | E5:1
      A5:2 G5:4 F5:4 | E5:2. D5:4 | C5:4 D5:4 E5:4 F5:4 | E5:2 D5:2
      C5:2. B4:4 | A4:1`,
    2: `P25 V6
      A5:2. G5 A5 | E5:2 F5:4 G5:4 | A5:2. G5 F5 | A5:1
      D6:2 B5:4 A5:4 | A5:2. F5:4 | E5:4 F5:4 G5:4 A5:4 | G5:2 F5:2
      E5:2. D5:4 | C#5:1`,
    3: `W0 V10
      A2:1 | A2:2 G2:2 | D3:1 | A2:1
      D3:2 G2:2 | A2:1 | F2:2 C3:2 | G2:1
      E2:1 | A2:1`,
    4: `N15 V3 S-1 X14:2 X12:2 | X14:2 X12:2 | X14:2 X12:2 | X14:2 X12:2
      X14:2 X12:2 | X14:2 X12:2 | X14:2 X12:2 | X14:2 X12:2
      X14:2 X12:2 | X14:2 X12:2`,
  },
};
