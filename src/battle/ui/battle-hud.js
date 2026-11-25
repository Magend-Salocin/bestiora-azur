// Battle layout at 160 × 144: enemy top right with its info box top left, player bottom left
// with its info box bottom right, text box at the bottom.
// The battleUi option (classique, moderne, dynamique, epuree) changes the info boxes and the
// scenery; the action menu of each style is drawn by battle-menu.js.
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../../engine/constants.js';
import { getAtlas } from '../../gfx/atlas.js';
import { drawSprite } from '../../gfx/draw.js';
import { GLYPH_HP, drawText } from '../../gfx/font.js';
import { getColor } from '../../gfx/palette.js';
import { getOptions } from '../../state/options.js';
import { drawWindowFrame } from '../../ui/window-frame.js';
import {
  HP_BAR_WIDTH, XP_BAR_WIDTH, barFill, drawHpBar, drawLevel, drawStatus, drawXpBar, hpColor, hpText,
} from '../../ui/creature-widgets.js';
import {
  drawBevelPanel, drawFlatFrame, drawPanel, drawPixels, drawRoundFrame, fillArea,
} from './battle-pixels.js';
import { drawDustPuff, drawStatusMark } from './battle-motion.js';

export const LAYOUT = {
  enemySprite: { x: 104, y: 4 },
  playerSprite: { x: 8, y: 44 },
  enemyHud: { x: 8, y: 6 },
  playerHud: { x: 80, y: 54 },
  textBox: { x: 0, y: 96, width: SCREEN_WIDTH, height: 48 },
};

export const spriteCenter = (side) => {
  const { x, y } = side === 0 ? LAYOUT.playerSprite : LAYOUT.enemySprite;
  return { x: x + 24, y: y + 24 };
};

/**
 * One displayed combatant: what the screen shows, which may lag behind the logic state.
 * Motion: trailHp (lost HP still drawn light), hudSlide (1 = off screen, 0 = in place),
 * hudShake (pixels), squash (pixels), glint (0 to 1 while the level-up glint sweeps, else null).
 */
export function createShownCreature() {
  return {
    visible: false, species: null, name: '', level: 1, hp: 0, maxHp: 1, status: null,
    dx: 0, dy: 0, blink: false, clipBottom: 0, expRatio: 0, hudVisible: false,
    trailHp: 0, hudSlide: 0, hudShake: 0, squash: 0, glint: null,
  };
}

// Dynamique and Épurée keep the original three-line layout: Dynamique in thin panels, Épurée
// without frames but with a soft shadow under each creature.
const ENEMY_PANEL = { x: 4, y: 3, width: 86, height: 32 };
const PLAYER_PANEL = { x: 76, y: 52, width: 84, height: 44 };
const SHADOW_ROWS = [{ inset: 6, y: 0 }, { inset: 0, y: 1 }, { inset: 6, y: 2 }];
const SHADOWS = [{ x: 8, y: 89, width: 48 }, { x: 104, y: 49, width: 48 }];

// Moderne: name and level on one line (the level drops next to the bar when a long name leaves
// no room), HP bar below; the player's box is a speech bubble.
const BOXED_ENEMY = { x: 1, y: 2, width: 103, height: 30 };
const BOXED_PLAYER = { x: 57, y: 50, width: 103, height: 44 };
const BOXED_PADDING = 6;
const GLYPH = 8;
const BOXED_STYLES = {
  moderne: { frame: drawBevelPanel, hpBar: drawGlossyHpBar },
};
// Classique enemy box: sized to its content, a shorter HP bar with the level on its right.
// The bar shrinks (down to 16 pixels) when a long name and a status would make the box too wide.
const COMPACT_ENEMY = { x: 1, y: 2, height: 29, maxWidth: 103 };
const SHORT_HP_FILL = 32;
const MIN_HP_FILL = 16;
// Grass tufts.
const LIVELY_STYLES = ['classique', 'dynamique'];
// Breathing while the player chooses: 2 steps per second, 4 when the HP are low.
const BREATH_RATE = 2;
const LOW_HP_BREATH_RATE = 4;
// Low HP bar pulse (3 changes per second), level-up glint width, info box slide distance.
const PULSE_RATE = 3;
const GLINT_WIDTH = 4;
const HUD_SLIDE_DISTANCE = 112;

// Lively styles: grass tufts under both creatures, the blade tips sway.
const GRASS_TUFT = [
  '...2....',
  '.2.2..2.',
  '.2.2.2..',
  '2.222.2.',
  '.21222..',
  '12222221',
];
const GRASS_SWAY_ROWS = 2;
const ENEMY_GRASS = { x: 92, y: 46, count: 8 };
const PLAYER_GRASS = { x: 0, y: 86, count: 9 };

export const battleUiStyle = () => getOptions().battleUi;

const STYLE_FRAMES = {
  classique: drawRoundFrame, moderne: drawBevelPanel, dynamique: drawPanel, epuree: drawFlatFrame,
};

/** Window of the battle screen (messages, move list, stat gains) in the frame of the style. */
export function drawBattleWindow(ctx, x, y, width, height) {
  const frame = STYLE_FRAMES[battleUiStyle()];
  if (frame) frame(ctx, { x, y, width, height });
  else drawWindowFrame(ctx, x, y, width, height);
}

function spritePosition(shown, side, bob) {
  const base = side === 0 ? LAYOUT.playerSprite : LAYOUT.enemySprite;
  return { base, x: base.x + shown.dx, y: base.y + shown.dy + bob };
}

function drawCreatureSprite(ctx, shown, side, bob = 0) {
  if (!shown.visible || shown.blink || !shown.species) return;
  const { base, x, y } = spritePosition(shown, side, bob);
  const frame = `${shown.species}/${side === 0 ? 'back' : 'front'}`;
  if (shown.clipBottom <= 0 && shown.squash > 0) {
    // Squash anchored on the feet: wider and shorter by `squash` pixels.
    ctx.save();
    ctx.translate(x + 24, y + 48);
    ctx.scale((48 + shown.squash) / 48, (48 - shown.squash) / 48);
    drawSprite(ctx, 'creatures', frame, -24, -48);
    ctx.restore();
    return;
  }
  if (shown.clipBottom <= 0) {
    drawSprite(ctx, 'creatures', frame, x, y);
    return;
  }
  // Faint: the sprite slides down behind the bottom of its area.
  ctx.save();
  ctx.beginPath();
  ctx.rect(base.x, base.y, 48, 48);
  ctx.clip();
  drawSprite(ctx, 'creatures', frame, x, y + shown.clipBottom);
  ctx.restore();
}

/** Light band sweeping a bar fill from left to right; progress from 0 to 1. */
function drawGlint(ctx, left, top, width, height, progress) {
  const start = left - GLINT_WIDTH + Math.round(progress * (width + GLINT_WIDTH));
  const from = Math.max(left, start);
  const to = Math.min(left + width, start + GLINT_WIDTH);
  if (to > from) fillArea(ctx, 0, from, top, to - from, height);
}

/**
 * Over an HP bar drawn at (x, y): the lost HP still shown light, the low HP pulse, the level-up
 * glint (`withGlint`). fx: { pulse } from renderBattle.
 */
function drawHpEffects(ctx, x, y, shown, fillWidth, fx, withGlint = false) {
  const fillX = x + GLYPH + 2;
  const filled = barFill(shown.hp, shown.maxHp, fillWidth);
  if (shown.trailHp > shown.hp) {
    const trail = barFill(shown.trailHp, shown.maxHp, fillWidth);
    fillArea(ctx, 1, fillX + filled, y + 1, trail - filled, 3);
  }
  if (fx.pulse && filled > 0 && hpColor(shown.hp, shown.maxHp) === 'low') fillArea(ctx, 2, fillX, y + 1, filled, 3);
  if (withGlint && shown.glint !== null) drawGlint(ctx, fillX, y + 1, filled, 3, shown.glint);
}

/** XP bar with the level-up glint. */
function drawBattleXpBar(ctx, x, y, shown) {
  drawXpBar(ctx, x, y, shown.expRatio);
  const filled = Math.round(Math.max(0, Math.min(1, shown.expRatio)) * XP_BAR_WIDTH);
  if (shown.glint !== null) drawGlint(ctx, x + 2, y + 1, filled, 2, shown.glint);
}

/** Moderne: the filled part of the HP bar gets a light top row, like a glossy tube. */
function drawGlossyHpBar(ctx, x, y, hp, maxHp) {
  drawHpBar(ctx, x, y, hp, maxHp);
  const width = barFill(hp, maxHp, HP_BAR_WIDTH);
  if (width > 0) fillArea(ctx, hpColor(hp, maxHp) === 'low' ? 2 : 1, x + 10, y + 1, width, 1);
}

const textWidth = (text) => Array.from(text).length * GLYPH;
const levelWidth = (level) => (1 + String(level).length) * GLYPH;

/** Name, level and HP bar inside a box; returns the y below the bar. */
function drawBoxedInfo(ctx, shown, { x, width }, top, hpBar, fx) {
  const left = x + BOXED_PADDING;
  const right = x + width - BOXED_PADDING;
  const level = levelWidth(shown.level);
  const levelOnNameLine = textWidth(shown.name) + GLYPH + level <= right - left;
  const barY = top + 13;
  drawText(ctx, shown.name, left, top);
  drawLevel(ctx, shown.level, right - level, levelOnNameLine ? top : barY - 2);
  hpBar(ctx, left, barY, shown.hp, shown.maxHp);
  drawHpEffects(ctx, left, barY, shown, HP_BAR_WIDTH, fx);
  if (shown.status) drawStatus(ctx, shown.status, right - (levelOnNameLine ? 16 : level + 18), barY - 1);
  return barY + 5;
}

const HP_FILL_ROWS = { high: ['2', '2', '2'], mid: ['21', '12', '21'], low: ['3', '3', '3'] };

/** HP bar of any fill width: "PV" glyph, 1-pixel rounded frame, the usual fill patterns. */
function drawHpGauge(ctx, x, y, hp, maxHp, fillWidth) {
  drawText(ctx, GLYPH_HP, x, y - 2);
  const barX = x + GLYPH;
  fillArea(ctx, 3, barX + 1, y, fillWidth + 2, 5);
  fillArea(ctx, 3, barX, y + 1, fillWidth + 4, 3);
  fillArea(ctx, 0, barX + 1, y + 1, fillWidth + 2, 3);
  const width = barFill(hp, maxHp, fillWidth);
  const rows = HP_FILL_ROWS[hpColor(hp, maxHp)];
  rows.forEach((pattern, row) => {
    for (let dx = 0; dx < width; dx += 1) fillArea(ctx, Number(pattern[dx % pattern.length]), barX + 2 + dx, y + 1 + row, 1, 1);
  });
}

/** Width of « PV » + bar frame for a fill width. */
const gaugeWidth = (fillWidth) => GLYPH + fillWidth + 4;
const STATUS_WIDTH = 16;

function drawCompactEnemyHud(ctx, shown, fx) {
  const level = levelWidth(shown.level);
  const status = shown.status ? STATUS_WIDTH + 4 : 0;
  const rowWidth = (fill) => gaugeWidth(fill) + 6 + status + level;
  const maxInner = COMPACT_ENEMY.maxWidth - 2 * BOXED_PADDING;
  const fill = Math.max(MIN_HP_FILL, SHORT_HP_FILL - Math.max(0, rowWidth(SHORT_HP_FILL) - maxInner));
  const inner = Math.min(maxInner, Math.max(textWidth(shown.name), rowWidth(fill)));
  const box = { ...COMPACT_ENEMY, width: inner + 2 * BOXED_PADDING };
  drawRoundFrame(ctx, box);
  const left = box.x + BOXED_PADDING;
  const right = left + inner;
  const top = box.y + 5;
  const barY = top + 13;
  drawText(ctx, shown.name, left, top);
  drawHpGauge(ctx, left, barY, shown.hp, shown.maxHp, fill);
  drawHpEffects(ctx, left, barY, shown, fill, fx);
  if (shown.status) drawStatus(ctx, shown.status, right - level - status, barY - 1);
  drawLevel(ctx, shown.level, right - level, barY - 2);
}

function drawBoxedEnemyHud(ctx, shown, { frame, hpBar }, fx) {
  frame(ctx, BOXED_ENEMY);
  drawBoxedInfo(ctx, shown, BOXED_ENEMY, BOXED_ENEMY.y + 5, hpBar, fx);
}

function drawBoxedPlayerHud(ctx, shown, { frame, hpBar }, fx) {
  const box = BOXED_PLAYER;
  frame(ctx, box, { tail: true });
  const below = drawBoxedInfo(ctx, shown, box, box.y + 5, hpBar, fx);
  const hp = hpText(shown.hp, shown.maxHp);
  drawText(ctx, hp, box.x + box.width - BOXED_PADDING - textWidth(hp), below + 1);
  drawBattleXpBar(ctx, box.x + BOXED_PADDING, below + 12, shown);
}

function drawEnemyHud(ctx, shown, style, fx) {
  if (style === 'classique') {
    drawCompactEnemyHud(ctx, shown, fx);
    return;
  }
  if (BOXED_STYLES[style]) {
    drawBoxedEnemyHud(ctx, shown, BOXED_STYLES[style], fx);
    return;
  }
  const { x, y } = LAYOUT.enemyHud;
  if (style === 'dynamique') drawPanel(ctx, ENEMY_PANEL);
  drawText(ctx, shown.name, x, y);
  drawLevel(ctx, shown.level, x + 32, y + 9);
  drawStatus(ctx, shown.status, x + 8, y + 9);
  drawHpBar(ctx, x + 8, y + 20, shown.hp, shown.maxHp);
  drawHpEffects(ctx, x + 8, y + 20, shown, HP_BAR_WIDTH, fx);
}

// Classique player: the name and the HP bar only, both right aligned just above the bottom
// window, the status left of the bar (the menu card shows the level, the numbers and the XP).
const COMPACT_RIGHT = 158;
const COMPACT_NAME_Y = 72;
const COMPACT_BAR_Y = 86;
const HP_BAR_TOTAL_WIDTH = GLYPH + HP_BAR_WIDTH + 4;

// Without an XP bar on the field, the level-up glint sweeps the HP bar.
function drawCompactPlayerHud(ctx, shown, fx) {
  drawText(ctx, shown.name, COMPACT_RIGHT - textWidth(shown.name), COMPACT_NAME_Y);
  const barX = COMPACT_RIGHT - HP_BAR_TOTAL_WIDTH;
  drawHpBar(ctx, barX, COMPACT_BAR_Y, shown.hp, shown.maxHp);
  drawHpEffects(ctx, barX, COMPACT_BAR_Y, shown, HP_BAR_WIDTH, fx, true);
  drawStatus(ctx, shown.status, barX - 18, COMPACT_BAR_Y - 1);
}

function drawPlayerHud(ctx, shown, style, fx) {
  if (style === 'classique') {
    drawCompactPlayerHud(ctx, shown, fx);
    return;
  }
  if (BOXED_STYLES[style]) {
    drawBoxedPlayerHud(ctx, shown, BOXED_STYLES[style], fx);
    return;
  }
  const { x, y } = LAYOUT.playerHud;
  if (style === 'dynamique') drawPanel(ctx, PLAYER_PANEL);
  drawText(ctx, shown.name, x, y);
  drawLevel(ctx, shown.level, x + 40, y + 9);
  drawStatus(ctx, shown.status, x + 8, y + 9);
  drawHpBar(ctx, x + 8, y + 20, shown.hp, shown.maxHp);
  drawHpEffects(ctx, x + 8, y + 20, shown, HP_BAR_WIDTH, fx);
  drawText(ctx, hpText(shown.hp, shown.maxHp), x + 16, y + 26);
  drawBattleXpBar(ctx, x + 8, y + 36, shown);
}

/** Épurée: a flat oval shadow under the creature's feet, narrower while the creature rises. */
function drawShadow(ctx, { x, y, width }, raised) {
  const shrink = raised ? 2 : 0;
  for (const row of SHADOW_ROWS) {
    const inset = row.inset + shrink;
    fillArea(ctx, 1, x + inset, y + row.y, width - 2 * inset, 1);
  }
}

/** Info box drawn shifted by its slide-in and hit shake; the enemy's enters from the left. */
function drawHudAt(ctx, shown, side, draw) {
  const slide = Math.round(shown.hudSlide * HUD_SLIDE_DISTANCE) * (side === 1 ? -1 : 1);
  ctx.save();
  ctx.translate(slide + shown.hudShake, 0);
  draw();
  ctx.restore();
}

/** Breathing step (0 or 1) of a creature, faster when its HP are low. */
function breathStep(shown, time) {
  const rate = hpColor(shown.hp, shown.maxHp) === 'low' ? LOW_HP_BREATH_RATE : BREATH_RATE;
  return Math.floor(time * rate) % 2;
}

function drawCreatureStatus(ctx, shown, side, bob, time) {
  if (!shown.visible || shown.blink || !shown.species || !shown.status || shown.clipBottom > 0) return;
  const { x, y } = spritePosition(shown, side, bob);
  drawStatusMark(ctx, shown.status.id, x, y, time);
}

function drawGrass(ctx, { x, y, count }, time) {
  const sway = Math.floor(time * 2) % 2;
  for (let i = 0; i < count; i += 1) {
    const tuftY = y + (i % 2);
    const shift = (i + sway) % 2;
    drawPixels(ctx, GRASS_TUFT.slice(0, GRASS_SWAY_ROWS), x + i * 7 + shift, tuftY);
    drawPixels(ctx, GRASS_TUFT.slice(GRASS_SWAY_ROWS), x + i * 7, tuftY + GRASS_SWAY_ROWS);
  }
}

/** Capsule icons of a party: full, empty slot or K.O. */
function drawPartyIndicator(ctx, indicator) {
  const { side, states } = indicator;
  const y = side === 0 ? 84 : 32;
  const startX = side === 0 ? 88 : 16;
  for (let i = 0; i < 6; i += 1) drawSprite(ctx, 'ui', `capsule/${states[i] ?? 'empty'}`, startX + i * 9, y);
}

/**
 * Battle portrait (48 or 64 px). A 64 px trainer keeps the right edge of the enemy spot and the
 * top of the screen; a 64 px player back keeps the bottom of the player spot, inside the screen.
 */
export function portraitPosition(size, side) {
  const spot = side === 0 ? LAYOUT.playerSprite : LAYOUT.enemySprite;
  if (side === 1) return { x: spot.x + 48 - size, y: Math.max(0, spot.y + 48 - size) };
  return { x: Math.max(0, spot.x + 24 - size / 2), y: spot.y + 48 - size };
}

function drawPortrait(ctx, portrait, side) {
  const { x, y } = portraitPosition(getAtlas('trainers').frames[portrait.frame].w, side);
  drawSprite(ctx, 'trainers', portrait.frame, x + portrait.dx, y);
}

/**
 * view: { shown: [player, enemy], portraits: { player, trainer }, capsule, effect, indicators, shake,
 *   time (seconds, drives the idle motion), idle (true while the player chooses an action or a move),
 *   dust ({ side, progress } during a K.O.) }
 */
export function renderBattle(ctx, view) {
  const style = battleUiStyle();
  const lively = LIVELY_STYLES.includes(style);
  const time = view.time ?? 0;
  const [player, enemy] = view.shown;
  // While the player chooses, both creatures breathe in opposite phases: the enemy rises on
  // step 1, the player's creature on step 0.
  const enemyBob = view.idle ? -breathStep(enemy, time) : 0;
  const playerBob = view.idle ? breathStep(player, time) - 1 : 0;
  const fx = { pulse: !getOptions().reduceFlashes && Math.floor(time * PULSE_RATE) % 2 === 1 };
  ctx.save();
  ctx.translate(view.shake ?? 0, 0);
  ctx.fillStyle = getColor(0);
  ctx.fillRect(-4, 0, SCREEN_WIDTH + 8, SCREEN_HEIGHT);
  if (style === 'epuree') {
    drawShadow(ctx, SHADOWS[0], player.visible && playerBob < 0);
    drawShadow(ctx, SHADOWS[1], enemy.visible && enemyBob < 0);
  }
  if (lively) {
    drawGrass(ctx, ENEMY_GRASS, time);
    drawGrass(ctx, PLAYER_GRASS, time + 0.5);
  }

  const { player: playerPortrait, trainer: trainerPortrait } = view.portraits;
  if (trainerPortrait.visible) drawPortrait(ctx, trainerPortrait, 1);
  if (playerPortrait.visible) drawPortrait(ctx, playerPortrait, 0);
  drawCreatureSprite(ctx, enemy, 1, enemyBob);
  drawCreatureSprite(ctx, player, 0, playerBob);
  drawCreatureStatus(ctx, enemy, 1, enemyBob, time);
  drawCreatureStatus(ctx, player, 0, playerBob, time);
  if (view.dust) {
    const { x, y } = view.dust.side === 0 ? LAYOUT.playerSprite : LAYOUT.enemySprite;
    drawDustPuff(ctx, x + 24, y + 48, view.dust.progress);
  }
  if (view.capsule) drawSprite(ctx, 'characters', 'capsule', Math.round(view.capsule.x - 8), Math.round(view.capsule.y - 8));
  if (view.effect) view.effect.animation.draw(ctx, view.effect.t, view.effect.from, view.effect.to);

  if (enemy.hudVisible) drawHudAt(ctx, enemy, 1, () => drawEnemyHud(ctx, enemy, style, fx));
  if (player.hudVisible && !view.hidePlayerHud) drawHudAt(ctx, player, 0, () => drawPlayerHud(ctx, player, style, fx));
  for (const indicator of view.indicators) drawPartyIndicator(ctx, indicator);
  ctx.restore();
}
