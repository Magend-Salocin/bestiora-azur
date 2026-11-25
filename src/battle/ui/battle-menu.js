// Battle action menu (ATTAQUE, SAC, ÉQUIPE, FUITE) drawn in the style of the battleUi option.
// Entries keep the MAIN_MENU order; grid styles lay them out in 2 columns, the list styles
// (classique, dynamique) in 1. Classique shows the player's creature card next to the list.
import { drawText } from '../../gfx/font.js';
import { drawLevel, drawXpBar } from '../../ui/creature-widgets.js';
import {
  MENU_ICONS, drawBevelPanel, drawFlatFrame, drawPanel, drawPixels, drawRoundFrame, fillArea,
} from './battle-pixels.js';

export const MAIN_MENU = [
  { id: 'fight', label: 'ATTAQUE' },
  { id: 'bag', label: 'SAC' },
  { id: 'party', label: 'ÉQUIPE' },
  { id: 'run', label: 'FUITE' },
];

const MENU_Y = 96;
const MENU_HEIGHT = 48;

const labelWidth = (label) => Array.from(label).length * 8;
const LIST_STYLES = ['classique', 'dynamique'];

/** Columns used by the cursor in each style. */
export const menuColumns = (style) => (LIST_STYLES.includes(style) ? 1 : 2);

// Classique: card on the left (prompt, level, HP numbers, XP bar), list on the right. The list
// box is as narrow as « ▶ATTAQUE » allows so the prompt lines get 11 characters.
const CARD = { x: 0, y: MENU_Y, width: 96, height: MENU_HEIGHT };
const CARD_LEFT = 4;
const CARD_RIGHT = 92;
const LIST = { x: 96, y: MENU_Y, width: 64, height: MENU_HEIGHT };
const LIST_ROW_Y = MENU_Y + 5;
const LIST_ROW_HEIGHT = 10;

/** HP numbers right of the level; a level 100 with 3-digit HP that leaves no room keeps the HP only. */
function cardHpText(shown) {
  const hp = Math.max(0, Math.ceil(shown.hp));
  const full = `${hp}/${shown.maxHp}`;
  const levelWidth = labelWidth(`N${shown.level}`) + 8;
  return levelWidth + labelWidth(full) <= CARD_RIGHT - CARD_LEFT ? full : String(hp);
}

function drawCreatureCard(ctx, shown) {
  drawRoundFrame(ctx, CARD);
  drawText(ctx, `${shown.name},`, CARD_LEFT, MENU_Y + 3);
  drawText(ctx, 'que faire ?', CARD_LEFT, MENU_Y + 12);
  fillArea(ctx, 2, CARD.x + 3, MENU_Y + 21, CARD.width - 6, 1);
  drawLevel(ctx, shown.level, CARD_LEFT, MENU_Y + 24);
  const hp = cardHpText(shown);
  drawText(ctx, hp, CARD_RIGHT - labelWidth(hp), MENU_Y + 24);
  drawXpBar(ctx, CARD_LEFT, MENU_Y + 36, shown.expRatio);
}

/** Classique: the creature card and a list of the four actions separated by thin lines. */
function drawCardAndList(ctx, index, shown) {
  drawCreatureCard(ctx, shown);
  drawRoundFrame(ctx, LIST);
  MAIN_MENU.forEach((entry, i) => {
    const y = LIST_ROW_Y + i * LIST_ROW_HEIGHT;
    if (i > 0) fillArea(ctx, 2, LIST.x + 3, y - 2, LIST.width - 6, 1); // clear of the accents (row 0)
    if (i === index) drawText(ctx, '▶', LIST.x + 2, y);
    drawText(ctx, entry.label, LIST.x + 7, y);
  });
}

/** Moderne: two bevelled panels of two cells, icons, the selected cell filled dark. */
function drawPanels(ctx, index) {
  fillArea(ctx, 0, 0, MENU_Y, 160, MENU_HEIGHT);
  [0, 80].forEach((left) => {
    drawBevelPanel(ctx, { x: left + 1, y: MENU_Y + 1, width: 79, height: MENU_HEIGHT - 2 });
    fillArea(ctx, 3, left + 4, MENU_Y + 22, 72, 1);
    fillArea(ctx, 1, left + 4, MENU_Y + 23, 72, 1);
  });
  MAIN_MENU.forEach((entry, i) => {
    const left = i % 2 === 0 ? 0 : 80;
    const cellTop = i < 2 ? MENU_Y + 4 : MENU_Y + 24;
    const y = cellTop + 5;
    const selected = i === index;
    if (selected) {
      fillArea(ctx, 3, left + 5, cellTop + 1, 70, 16);
      drawText(ctx, '▶', left + 7, y, 0);
    } else {
      drawPixels(ctx, MENU_ICONS[entry.id], left + 7, y);
    }
    drawText(ctx, entry.label, left + 18, y, selected ? 0 : 3);
  });
}

/** Dynamique: the cursor nudges forward and back, 2 steps per second. */
const nudge = (time) => Math.floor(time * 4) % 2;

/** Dynamique: the prompt on the left, a compact list with a lively cursor on the right. */
function drawDynamique(ctx, index, creatureName, time) {
  drawPanel(ctx, { x: 0, y: MENU_Y, width: 88, height: MENU_HEIGHT });
  drawPanel(ctx, { x: 88, y: MENU_Y, width: 72, height: MENU_HEIGHT });
  [creatureName, 'doit faire', 'quoi ?'].forEach((line, i) => drawText(ctx, line, 4, 100 + i * 14));
  MAIN_MENU.forEach((entry, i) => {
    const y = 100 + i * 10;
    if (i === index) drawText(ctx, '▶', 91 + nudge(time), y);
    drawText(ctx, entry.label, 100, y);
  });
}

/** Épurée: one window cut in a 2 × 2 grid, centered labels, the selected cell shaded. */
function drawEpuree(ctx, index) {
  drawFlatFrame(ctx, { x: 0, y: MENU_Y, width: 160, height: MENU_HEIGHT });
  const cellTop = [MENU_Y + 2, MENU_Y + 25];
  const cellHeight = 21;
  MAIN_MENU.forEach((entry, i) => {
    const left = i % 2 === 0 ? 2 : 81;
    const top = cellTop[Math.floor(i / 2)];
    const y = top + 7;
    if (i === index) {
      fillArea(ctx, 1, left, top, 77, cellHeight);
      drawText(ctx, '▶', left + 2, y);
    }
    drawText(ctx, entry.label, left + 39 - labelWidth(entry.label) / 2, y);
  });
  fillArea(ctx, 2, 80, MENU_Y + 2, 1, MENU_HEIGHT - 4);
  fillArea(ctx, 2, 2, MENU_Y + 24, 156, 1);
}

/** Draws the action menu; `shown` is the player's displayed creature (card, dynamique prompt). */
export function drawActionMenu(ctx, style, index, shown, time = 0) {
  if (style === 'classique') drawCardAndList(ctx, index, shown);
  else if (style === 'dynamique') drawDynamique(ctx, index, shown.name, time);
  else if (style === 'epuree') drawEpuree(ctx, index);
  else drawPanels(ctx, index);
}

const MOVE_ROW_Y = MENU_Y + 5;
const MOVE_FRAMES = {
  classique: drawRoundFrame, moderne: drawBevelPanel, dynamique: drawPanel, epuree: drawFlatFrame,
};

/**
 * Move list at the bottom, one row of 10 pixels per move: classique and dynamique rule the rows
 * (dynamique nudges the cursor), moderne fills the selected row dark, épurée shades it.
 */
export function drawMoveList(ctx, style, names, index, time = 0) {
  (MOVE_FRAMES[style] ?? drawRoundFrame)(ctx, { x: 0, y: MENU_Y, width: 160, height: MENU_HEIGHT });
  names.forEach((name, i) => {
    const y = MOVE_ROW_Y + i * 10;
    const selected = i === index;
    let ink = 3;
    if (selected && style === 'moderne') {
      fillArea(ctx, 3, 4, y - 1, 152, 9);
      ink = 0;
    } else if (selected && style === 'epuree') {
      fillArea(ctx, 1, 2, y - 1, 156, 9);
    }
    if (i > 0 && (style === 'classique' || style === 'dynamique')) fillArea(ctx, 2, 3, y - 2, 154, 1);
    if (selected) drawText(ctx, '▶', 4 + (style === 'dynamique' ? nudge(time) : 0), y, ink);
    drawText(ctx, name, 12, y, ink);
  });
}
