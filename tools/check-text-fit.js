// Checks that every game text fits the window that shows it, measured with the 8×8 font.
// Variables are replaced with their longest possible value (names typed by the player, the
// longest item, move, creature, trainer…). Used by npm run validate; also runnable alone:
// node tools/check-text-fit.js
import { fileURLToPath } from 'node:url';
import { SCREEN_WIDTH, TILE } from '../src/engine/constants.js';
import { GLYPH_SIZE } from '../src/gfx/font-glyphs.js';
import { STAT_LABELS } from '../src/data/texts/battle-fr.js';
import { CREDITS, CREDITS_AUTHOR } from '../src/data/texts/credits.js';
import { FALLBACK_PLACES } from '../src/ui/ending-screens.js';
import { NAME_MAX_LENGTH } from '../src/ui/name-entry.js';
import { START_MENU_BOX } from '../src/ui/start-menu.js';
import { DIALOG_LINE_WIDTH, splitWords } from '../src/ui/text-layout.js';

const textWidth = (text) => Array.from(text).length * GLYPH_SIZE;

/** Usable width of a list menu label (cursor column and both borders excluded). */
const listLabelWidth = (menuWidth) => menuWidth - 3 * TILE;

export const TEXT_AREAS = {
  dialog: DIALOG_LINE_WIDTH * GLYPH_SIZE,
  credits: SCREEN_WIDTH,
  creditsPlace: SCREEN_WIDTH - 2 * TILE,
  flyList: listLabelWidth(SCREEN_WIDTH),
  startMenu: listLabelWidth(START_MENU_BOX.width),
};

const longest = (values) => values.reduce((best, value) => (Array.from(value).length > Array.from(best).length ? value : best), '');

/** Longest value of each text variable. A typed name is a single word of NAME_MAX_LENGTH letters. */
export function worstCaseVariables(data) {
  const typedName = 'W'.repeat(NAME_MAX_LENGTH);
  const classNames = Object.fromEntries(data.trainerClasses.map((trainerClass) => [trainerClass.id, trainerClass.name]));
  const trainerTitles = Object.values(data.trainers).map((trainer) => `${classNames[trainer.class] ?? ''} ${trainer.name ?? ''}`.trim());
  return {
    PLAYER: typedName,
    RIVAL: typedName,
    CREATURE: longest([typedName, ...data.creatures.map((creature) => creature.name)]),
    ITEM: longest(data.items.map((item) => item.name)),
    MOVE: longest(data.moves.map((move) => move.name)),
    TRAINER: longest(trainerTitles),
    NUMBER: '999999',
    STAT: longest(Object.values(STAT_LABELS)),
    TYPE: longest(Object.values(data.types).map((type) => type.name)),
  };
}

const fill = (text, variables) => text.replace(/\{([A-Z_]+)\}/g, (token, name) => variables[name] ?? token);

/** Dialog text: wrapping is automatic, so only a word wider than the box can overflow. */
function checkDialogText(label, text, variables, errors) {
  for (const paragraph of fill(text, variables).split(/[\n\f]/)) {
    for (const word of splitWords(paragraph)) {
      if (textWidth(word) > TEXT_AREAS.dialog) errors.push(`${label} : « ${word} » dépasse la boîte de dialogue (${textWidth(word)} px > ${TEXT_AREAS.dialog})`);
    }
  }
}

function checkLine(label, text, area, errors) {
  if (textWidth(text) > TEXT_AREAS[area]) errors.push(`${label} : « ${text} » dépasse ${TEXT_AREAS[area]} px (${textWidth(text)} px)`);
}

/** Checker for npm run validate. */
export function checkTextFit(data) {
  const errors = [];
  const variables = worstCaseVariables(data);
  for (const [id, text] of Object.entries(data.texts)) if (typeof text === 'string') checkDialogText(`texte ${id}`, text, variables, errors);
  for (const [id, text] of Object.entries(data.battleTexts ?? {})) if (typeof text === 'string') checkDialogText(`combat ${id}`, text, variables, errors);

  const creditsVariables = { ...variables, CREDITS_AUTHOR };
  CREDITS.forEach((line, index) => checkLine(`crédits ligne ${index + 1}`, fill(line, creditsVariables), 'credits', errors));

  // Towns (fly points) appear in the Cerf-volant list and, once visited, in the credits band.
  for (const map of Object.values(data.worldMaps)) {
    if (!map.flyPoint && !FALLBACK_PLACES.includes(map.id)) continue;
    checkLine(`carte ${map.id} (bandeau des crédits)`, map.name, 'creditsPlace', errors);
    checkLine(`carte ${map.id} (liste du Cerf-volant)`, map.name, 'flyList', errors);
  }
  checkLine('menu START (nom du joueur)', variables.PLAYER, 'startMenu', errors);
  for (const label of ['BESTIAIRE', 'BESTIOLES', 'OPTIONS']) checkLine(`menu START (${label})`, label, 'startMenu', errors);
  return errors;
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const { loadGameData } = await import('./validators/game-data.js');
  const errors = checkTextFit(loadGameData());
  for (const error of errors) process.stdout.write(`${error}\n`);
  process.stdout.write(errors.length === 0 ? 'Tous les textes tiennent dans leur fenêtre.\n' : `${errors.length} dépassement(s)\n`);
  process.exitCode = errors.length === 0 ? 0 : 1;
}
