// Draws the visible part of the world: tiles (with connected neighbors), objects, actors,
// tall grass over feet, the "!" emote and the darkness of unlit caves.
import { METATILE, SCREEN_HEIGHT, SCREEN_WIDTH } from '../engine/constants.js';
import { createCanvas } from '../gfx/bitmap.js';
import { drawMetatile, drawMetatileBottom, drawSprite } from '../gfx/draw.js';
import { drawText } from '../gfx/font.js';
import { getColor, getPaletteKey } from '../gfx/palette.js';
import { animationFrame, pixelPosition } from './actor.js';
import { locateTile } from './world.js';

/** Characters are drawn 4 px above their tile so they look grounded. */
export const SPRITE_OFFSET_Y = -4;
const GRASS_COVER_ROW = 10;
const DARK_RADIUS = 24;
const DARK_CELL = 4;

export function drawTiles(ctx, world, camera, animationStep) {
  const firstX = Math.floor(camera.x / METATILE);
  const firstY = Math.floor(camera.y / METATILE);
  const columns = Math.ceil(SCREEN_WIDTH / METATILE) + 1;
  const rows = Math.ceil(SCREEN_HEIGHT / METATILE) + 1;
  const { map } = world;

  ctx.fillStyle = getColor(3);
  ctx.fillRect(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT);
  for (let ty = firstY; ty < firstY + rows; ty += 1) {
    for (let tx = firstX; tx < firstX + columns; tx += 1) {
      const sx = tx * METATILE - camera.x;
      const sy = ty * METATILE - camera.y;
      const located = locateTile(world, tx, ty);
      if (located) drawMetatile(ctx, located.map.tileset, located.map.tileAt(located.x, located.y), sx, sy, animationStep);
      else if (map.borderTile) drawMetatile(ctx, map.tileset, map.borderTile, sx, sy, animationStep);
    }
  }
}

function spriteFrameId(actor, frame) {
  const direction = actor.facing === 'right' ? 'left' : actor.facing;
  return `${actor.sprite}/${direction}/${frame}`;
}

function drawActor(ctx, actor, camera) {
  const { px, py, lift } = pixelPosition(actor);
  const x = px - camera.x;
  const y = py - camera.y + SPRITE_OFFSET_Y;
  if (lift > 0) {
    // Shadow on the ground during a jump.
    ctx.fillStyle = getColor(2);
    ctx.fillRect(x + 4, py - camera.y + 12, 8, 2);
  }
  const { frame, flip } = animationFrame(actor);
  drawSprite(ctx, 'characters', spriteFrameId(actor, frame), x, y - lift, { flipX: flip });
}

/** Tile under an actor's feet: the target tile once past the middle of a step. */
function feetTile(actor) {
  const { px, py } = pixelPosition(actor);
  return { x: Math.round(px / METATILE), y: Math.round(py / METATILE) };
}

function drawGrassOverFeet(ctx, world, actor, camera, animationStep) {
  if (actor.movement?.jump) return;
  const { x, y } = feetTile(actor);
  const located = locateTile(world, x, y);
  if (!located || !located.map.metatileAt(located.x, located.y)?.grass) return;
  drawMetatileBottom(ctx, located.map.tileset, located.map.tileAt(located.x, located.y),
    x * METATILE - camera.x, y * METATILE - camera.y, GRASS_COVER_ROW, animationStep);
}

function drawEmote(ctx, actor, camera) {
  const { px, py } = pixelPosition(actor);
  const x = px - camera.x + 3;
  const y = py - camera.y + SPRITE_OFFSET_Y - 12;
  ctx.fillStyle = getColor(3);
  ctx.fillRect(x - 1, y - 1, 12, 12);
  ctx.fillStyle = getColor(0);
  ctx.fillRect(x, y, 10, 10);
  drawText(ctx, '!', x + 1, y + 1);
}

/** Radius (px) of the light around a lit brazier. */
export const BRAZIER_RADIUS = 40;

let darkLayer = null;

/**
 * Darkness over the whole screen with blocky holes ({ cx, cy, radius } in screen pixels): one
 * around the player, one around each lit brazier of the map.
 */
function drawDarkness(ctx, holes) {
  darkLayer ??= createCanvas(SCREEN_WIDTH, SCREEN_HEIGHT);
  const layer = darkLayer.getContext('2d');
  layer.globalCompositeOperation = 'source-over';
  layer.fillStyle = getColor(3);
  layer.fillRect(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT);
  layer.globalCompositeOperation = 'destination-out';
  layer.fillStyle = '#000000';
  for (const { cx, cy, radius } of holes) {
    for (let y = -radius; y < radius; y += DARK_CELL) {
      for (let x = -radius; x < radius; x += DARK_CELL) {
        const dx = x + DARK_CELL / 2;
        const dy = y + DARK_CELL / 2;
        if (dx * dx + dy * dy <= radius * radius) layer.fillRect(Math.round(cx + x), Math.round(cy + y), DARK_CELL, DARK_CELL);
      }
    }
  }
  ctx.drawImage(darkLayer, 0, 0);
}

/**
 * scene: { world, camera, player, actors, objects, animationStep, emote, dark, lights, shake }
 * `lights`: lit braziers [{ x, y }] (tile coordinates) that open a hole in the darkness.
 * `objects` are { x, y, frame } drawn from the characters atlas (items on the ground).
 */
export function renderWorld(ctx, scene) {
  const { world, player, actors, objects, animationStep, emote, dark, lights = [] } = scene;
  const camera = { x: scene.camera.x + (scene.shake ?? 0), y: scene.camera.y };

  drawTiles(ctx, world, camera, animationStep);
  for (const object of objects) {
    drawSprite(ctx, 'characters', object.frame, object.x * METATILE - camera.x, object.y * METATILE - camera.y + SPRITE_OFFSET_Y);
  }
  const visible = [...actors.filter((actor) => actor.visible), player].sort((a, b) => pixelPosition(a).py - pixelPosition(b).py);
  for (const actor of visible) drawActor(ctx, actor, camera);
  for (const actor of visible) drawGrassOverFeet(ctx, world, actor, camera, animationStep);
  if (emote) drawEmote(ctx, emote, camera);

  if (dark) {
    const { px, py } = pixelPosition(player);
    const toScreen = (tileX, tileY) => ({ cx: tileX * METATILE - camera.x + METATILE / 2, cy: tileY * METATILE - camera.y + METATILE / 2 + SPRITE_OFFSET_Y });
    drawDarkness(ctx, [
      { cx: px - camera.x + METATILE / 2, cy: py - camera.y + METATILE / 2 + SPRITE_OFFSET_Y, radius: DARK_RADIUS },
      ...lights.map((light) => ({ ...toScreen(light.x, light.y), radius: BRAZIER_RADIUS })),
    ]);
  }
}
