// Text table: id → French text. Scripts and maps reference texts by id.
import common from './common.js';
import menus from './menus.js';
import intro from './intro.js';
import debut from './debut.js';
import bois from './bois.js';
import port from './port.js';
import cendrelune from './cendrelune.js';
import bise from './bise.js';
import marais from './marais.js';
import ombrecourt from './ombrecourt.js';
import mer from './mer.js';
import forge from './forge.js';
import givremont from './givremont.js';
import centrale from './centrale.js';
import reactions from './reactions.js';
import test from './test.js';

export const TEXTS = { ...common, ...menus, ...intro, ...debut, ...bois, ...port, ...cendrelune, ...bise, ...marais, ...ombrecourt, ...mer, ...forge, ...givremont, ...centrale, ...reactions, ...test };

export function getText(id) {
  const text = TEXTS[id];
  if (text === undefined) throw new Error(`Unknown text: ${id}`);
  return text;
}
