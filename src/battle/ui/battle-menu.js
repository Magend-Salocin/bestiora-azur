// Battle action menu (ATTAQUE, SAC, ÉQUIPE, FUITE) drawn in the style of the battleUi option.
// Entries keep the MAIN_MENU order; grid styles lay them out in 2 columns, the list styles
// (classique, dynamique) in 1. Classique shows the player's creature card next to the list.
import { drawText } from '../../gfx/font.js';
import { drawLevel, drawXpBar } from '../../ui/creature-widgets.js';
import { drawWindowFrame } from '../../ui/window-frame.js';
import {
  MENU_ICONS, drawBevelPanel, drawPixels, drawRoundFrame, fillArea,
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
    if (i > 0) fillArea(ctx, 2, LIST.x + 3, y - 1, LIST.width - 6, 1);
    if (i === index) drawText(ctx, '▶', LIST.x + 2, y);
    drawText(ctx, entry.label, LIST.x + 6, y);
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

/** Dynamique: the prompt on the left, a compact list on the right. */
function drawDynamique(ctx, index, creatureName) {
  drawWindowFrame(ctx, 0, MENU_Y, 88, MENU_HEIGHT);
  drawWindowFrame(ctx, 88, MENU_Y, 72, MENU_HEIGHT);
  [creatureName, 'doit faire', 'quoi ?'].forEach((line, i) => drawText(ctx, line, 4, 100 + i * 14));
  MAIN_MENU.forEach((entry, i) => {
    const y = 100 + i * 10;
    if (i === index) drawText(ctx, '▶', 92, y);
    drawText(ctx, entry.label, 100, y);
  });
}

/** Épurée: one window cut in a 2 × 2 grid, centered labels, the selected cell shaded. */
function drawEpuree(ctx, index) {
  drawWindowFrame(ctx, 0, MENU_Y, 160, MENU_HEIGHT);
  const cellTop = [MENU_Y + 3, MENU_Y + 25];
  const cellHeight = 20;
  MAIN_MENU.forEach((entry, i) => {
    const left = i % 2 === 0 ? 3 : 81;
    const top = cellTop[Math.floor(i / 2)];
    const y = top + 6;
    if (i === index) {
      fillArea(ctx, 1, left, top, 76, cellHeight);
      drawText(ctx, '▶', left + 1, y);
    }
    drawText(ctx, entry.label, left + 38 - labelWidth(entry.label) / 2, y);
  });
  fillArea(ctx, 2, 80, MENU_Y + 3, 1, MENU_HEIGHT - 6);
  fillArea(ctx, 2, 3, MENU_Y + 24, 154, 1);
}

/** The player's box on the field turns compact while the menu shows its card. */
export const menuShowsCreatureCard = (style) => style === 'classique';

/** Draws the action menu; `shown` is the player's displayed creature (card, dynamique prompt). */
export function drawActionMenu(ctx, style, index, shown) {
  if (style === 'classique') drawCardAndList(ctx, index, shown);
  else if (style === 'dynamique') drawDynamique(ctx, index, shown.name);
  else if (style === 'epuree') drawEpuree(ctx, index);
  else drawPanels(ctx, index);
}
