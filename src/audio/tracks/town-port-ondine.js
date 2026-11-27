// Port-Ondine (Bretagne littorale): an dro for a couple of sonneurs, D dorian.
// The biniou (voice 2, high and thin) plays every phrase twice without a break; the bombarde
// (voice 1, an octave lower) plays the first time only, then breathes, as in a fest-noz.
// The wave voice is the drone and the an dro step. Original melody (prompt 4).
import { DRUMS, bass, times } from './patterns.js';

/** Phrases of two 4/4 bars, in eighths, written at the biniou octave. */
const PHRASES = [
  ['D5 E5 F5 A5 G5:4 F5 E5', 'D5 E5 F5 E5 D5:2'],
  ['A5 C6 B5 A5 G5:4 A5 B5', 'C6 B5 A5 G5 A5:2'],
  ['D5 E5 F5 A5 G5:4 A5 C6', 'B5 A5 G5 E5 D5:2'],
  ['F5 G5 A5 F5 G5 E5 C5 E5', 'F5 E5 D5 C5 D5:2'],
];

/** Same notes one octave lower (bombarde). */
const octaveDown = (text) => text.replace(/([A-G][#b]?)(\d)/g, (_, note, octave) => `${note}${Number(octave) - 1}`);

/** Drone and step: D everywhere, A under the second phrase. */
const DRONES = ['D2', 'D2', 'D2', 'D2', 'A1', 'A1', 'A1', 'D2', 'D2', 'D2', 'D2', 'D2', 'C2', 'D2', 'C2', 'D2'];
const FIFTH = { D2: 'A1', A1: 'E2', C2: 'G1' };

export default {
  id: 'town_port_ondine',
  tempo: 120,
  channels: {
    1: `P25 V11 ${PHRASES.map(([first, second]) => `${octaveDown(first)} ${octaveDown(second)} R:1 R:1`).join(' ')}`,
    2: `P12 V8 ${PHRASES.map(([first, second]) => `${first} ${second} ${first} ${second}`).join(' ')}`,
    3: `W1 V10 ${DRONES.map((root) => bass(root, FIFTH[root])).join(' ')}`,
    4: `N15 V5 S-2 ${times(DRUMS.calm, 16)}`,
  },
};
