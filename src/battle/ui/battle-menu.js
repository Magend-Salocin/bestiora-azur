// Battle action menu (ATTAQUE, SAC, ÉQUIPE, FUITE) drawn in the style of the battleUi option.
// Entries keep the MAIN_MENU order; grid styles lay them out in 2 columns, the list styles
// (classique, dynamique) in 1. Classique shows the player's creature card next to the list.
// motion: { time (seconds since the menu opened, drives the cascade), glide (CursorGlide) }.
import { drawText } from '../../gfx/font.js';
import { drawLevel, drawXpBar } from '../../ui/creature-widgets.js';
import {
  MENU_ICONS, drawBevelPanel, drawFlatFrame, drawPanel, drawPixels, drawRoundFrame, fillArea,
} from './battle-pixels.js';
import { revealed } from './battle-motion.js';

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

/** Draws `draw(x, y)` clipped to a rectangle (inverted text under a moving highlight). */
function clipped(ctx, { x, y, width, height }, draw) {
  ctx.save();
  ctx.beginPath();
  ctx.rect(x, y, width, height);
  ctx.clip();
  draw();
  ctx.restore();
}

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
function drawCardAndList(ctx, shown, { time, glide }) {
  drawCreatureCard(ctx, shown);
  drawRoundFrame(ctx, LIST);
  MAIN_MENU.forEach((entry, i) => {
    const y = LIST_ROW_Y + i * LIST_ROW_HEIGHT;
    if (i > 0) fillArea(ctx, 2, LIST.x + 3, y - 2, LIST.width - 6, 1); // clear of the accents (row 0)
    if (revealed(time, i)) drawText(ctx, entry.label, LIST.x + 7, y);
  });
  const cursor = glide.at((i) => ({ x: LIST.x + 2, y: LIST_ROW_Y + i * LIST_ROW_HEIGHT }));
  drawText(ctx, '▶', cursor.x, cursor.y);
}

// Moderne: the dark highlight of the selected cell glides between the cells; the text under it
// is redrawn in light ink (the icon becomes the cursor).
const MODERNE_CELL = { width: 70, height: 16 };
const moderneCell = (i) => ({ x: (i % 2) * 80 + 5, y: MENU_Y + (i < 2 ? 5 : 25) });

/** Moderne: two bevelled panels of two cells, icons, the selected cell filled dark. */
function drawPanels(ctx, { time, glide }) {
  fillArea(ctx, 0, 0, MENU_Y, 160, MENU_HEIGHT);
  [0, 80].forEach((left) => {
    drawBevelPanel(ctx, { x: left + 1, y: MENU_Y + 1, width: 79, height: MENU_HEIGHT - 2 });
    fillArea(ctx, 3, left + 4, MENU_Y + 22, 72, 1);
    fillArea(ctx, 1, left + 4, MENU_Y + 23, 72, 1);
  });
  const entries = MAIN_MENU.map((entry, i) => ({ entry, cell: moderneCell(i) })).filter((_, i) => revealed(time, i));
  entries.forEach(({ entry, cell }) => {
    drawPixels(ctx, MENU_ICONS[entry.id], cell.x + 2, cell.y + 4);
    drawText(ctx, entry.label, cell.x + 13, cell.y + 4);
  });
  const highlight = { ...glide.at(moderneCell), ...MODERNE_CELL };
  fillArea(ctx, 3, highlight.x, highlight.y, highlight.width, highlight.height);
  clipped(ctx, highlight, () => entries.forEach(({ entry, cell }) => {
    drawText(ctx, '▶', cell.x + 2, cell.y + 4, 0);
    drawText(ctx, entry.label, cell.x + 13, cell.y + 4, 0);
  }));
}

/** Dynamique: the cursor nudges forward and back, 2 steps per second. */
const nudge = (time) => Math.floor(time * 4) % 2;

/** Dynamique: the prompt on the left, a compact list with a lively cursor on the right. */
function drawDynamique(ctx, creatureName, { time, glide }) {
  drawPanel(ctx, { x: 0, y: MENU_Y, width: 88, height: MENU_HEIGHT });
  drawPanel(ctx, { x: 88, y: MENU_Y, width: 72, height: MENU_HEIGHT });
  [creatureName, 'doit faire', 'quoi ?'].forEach((line, i) => drawText(ctx, line, 4, 100 + i * 14));
  MAIN_MENU.forEach((entry, i) => {
    if (revealed(time, i)) drawText(ctx, entry.label, 100, 100 + i * 10);
  });
  const cursor = glide.at((i) => ({ x: 91, y: 100 + i * 10 }));
  drawText(ctx, '▶', cursor.x + nudge(time), cursor.y);
}

const EPUREE_CELL = { width: 77, height: 21 };
const epureeCell = (i) => ({ x: i % 2 === 0 ? 2 : 81, y: i < 2 ? MENU_Y + 2 : MENU_Y + 25 });

/** Épurée: one window cut in a 2 × 2 grid, centered labels, the shaded cell glides. */
function drawEpuree(ctx, { time, glide }) {
  drawFlatFrame(ctx, { x: 0, y: MENU_Y, width: 160, height: MENU_HEIGHT });
  const highlight = glide.at(epureeCell);
  fillArea(ctx, 1, highlight.x, highlight.y, EPUREE_CELL.width, EPUREE_CELL.height);
  drawText(ctx, '▶', highlight.x + 2, highlight.y + 7);
  MAIN_MENU.forEach((entry, i) => {
    if (!revealed(time, i)) return;
    const cell = epureeCell(i);
    drawText(ctx, entry.label, cell.x + 39 - labelWidth(entry.label) / 2, cell.y + 7);
  });
  fillArea(ctx, 2, 80, MENU_Y + 2, 1, MENU_HEIGHT - 4);
  fillArea(ctx, 2, 2, MENU_Y + 24, 156, 1);
}

/** Draws the action menu; `shown` is the player's displayed creature (card, dynamique prompt). */
export function drawActionMenu(ctx, style, shown, motion) {
  if (style === 'classique') drawCardAndList(ctx, shown, motion);
  else if (style === 'dynamique') drawDynamique(ctx, shown.name, motion);
  else if (style === 'epuree') drawEpuree(ctx, motion);
  else drawPanels(ctx, motion);
}

const MOVE_ROW_Y = MENU_Y + 5;
const MOVE_ROW_HEIGHT = 10;
const MOVE_FRAMES = {
  classique: drawRoundFrame, moderne: drawBevelPanel, dynamique: drawPanel, epuree: drawFlatFrame,
};
// Highlight of the selected row: moderne dark (text inverted), épurée shaded.
const MOVE_HIGHLIGHTS = {
  moderne: { x: 4, width: 152, color: 3, ink: 0 },
  epuree: { x: 2, width: 156, color: 1, ink: 3 },
};

/**
 * Move list at the bottom, one row of 10 pixels per move: classique and dynamique rule the rows
 * (dynamique nudges the cursor), moderne and épurée slide a highlight under the selected row.
 */
export function drawMoveList(ctx, style, names, { time, glide }) {
  (MOVE_FRAMES[style] ?? drawRoundFrame)(ctx, { x: 0, y: MENU_Y, width: 160, height: MENU_HEIGHT });
  const rowY = (i) => MOVE_ROW_Y + i * MOVE_ROW_HEIGHT;
  const cursor = glide.at((i) => ({ x: 4, y: rowY(i) }));
  const look = MOVE_HIGHLIGHTS[style];
  const highlight = look && { x: look.x, y: cursor.y - 1, width: look.width, height: 9 };
  if (highlight) fillArea(ctx, look.color, highlight.x, highlight.y, highlight.width, highlight.height);
  const ruled = LIST_STYLES.includes(style);
  const drawNames = (ink) => names.forEach((name, i) => {
    if (revealed(time, i)) drawText(ctx, name, 12, rowY(i), ink);
  });
  names.forEach((_, i) => {
    if (ruled && i > 0) fillArea(ctx, 2, 3, rowY(i) - 2, 154, 1);
  });
  drawNames(3);
  if (highlight && look.ink !== 3) clipped(ctx, highlight, () => drawNames(look.ink));
  drawText(ctx, '▶', cursor.x + (style === 'dynamique' ? nudge(time) : 0), cursor.y, look?.ink ?? 3);
}
