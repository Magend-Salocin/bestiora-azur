// Overworld ambience: short visual effects that make the map feel alive. Nothing here changes
// the game state; the scene feeds events (steps, jumps, surf) and the ambience spawns its own
// life (wind, birds, insects, fish, smoke, cave drips) around the visible tiles.
// Positions are in map pixels; `camera` converts them to the screen.
import { METATILE, SCREEN_HEIGHT, SCREEN_WIDTH } from '../engine/constants.js';
import { createRng } from '../engine/rng.js';
import { drawMetatile } from '../gfx/draw.js';
import { drawPixels, fillArea } from '../gfx/pixels.js';
import { pixelPosition } from './actor.js';

const SKY_TILESETS = ['outdoor', 'town'];
const MAX_EFFECTS = 60;
const SPRITE_OFFSET_Y = -4;

// Wind: a gust crosses the screen from left to right; trees and grass in its band lean.
const GUST_SPEED = 120;
const GUST_BAND = 40;
const RUSTLE_TIME = 0.5;
const RUSTLE_RATE = 8;

// ---- Pixel art ------------------------------------------------------------------------

const DUST_SMALL = ['.2.', '202', '.2.'];
const DUST_BIG = ['.2.2.', '2...2', '.2.2.'];
const BIRD_UP = ['3...3', '.3.3.', '..3..'];
const BIRD_DOWN = ['..3..', '.3.3.', '3...3'];
const BUTTERFLY_OPEN = ['2.2', '.3.'];
const BUTTERFLY_CLOSED = ['.2.', '.3.'];
const DRAGONFLY = [['2.2..', '33333', '2.2..'], ['.2.2.', '33333', '.2.2.']];
const FISH = ['333.', '.333'];
const LEAF = [['32'], ['3', '2']];
const SMOKE = [['.22.', '2002', '2002', '.22.'], ['.2.', '202', '.2.'], ['2']];
const GLINT_SMALL = ['0'];
const GLINT_BIG = ['.0.', '000', '.0.'];
const LAVA_BUBBLE = [['.3.', '303', '.3.'], ['.33.', '3003', '3003', '.33.']];
const CHIMNEY = ['33333', '32223', '32223', '32223', '32223'];
const SPARKLE = [['.3.', '303', '.3.'], ['..3..', '..3..', '33033', '..3..', '..3..']];
const BUBBLE_ICONS = {
  dots: ['.......', '.......', '.3.3.3.', '.......', '.......'],
  note: ['...33..', '...3.3.', '...3...', '.333...', '.33....'],
  heart: ['.33.33.', '3333333', '.33333.', '..333..', '...3...'],
};
const BUBBLE_KINDS = [{ icon: 'dots', weight: 3 }, { icon: 'note', weight: 3 }, { icon: 'heart', weight: 1 }];

/** Pixel rows centered horizontally on x, bottom at y. */
function drawCentered(ctx, rows, x, y) {
  drawPixels(ctx, rows, Math.round(x - rows[0].length / 2), Math.round(y - rows.length));
}

/** Flattened ring of single pixels (water seen from above). */
function drawRing(ctx, cx, cy, radius, color) {
  const points = Math.max(6, Math.round(radius * 3));
  for (let i = 0; i < points; i += 1) {
    const angle = (i / points) * Math.PI * 2;
    fillArea(ctx, color, Math.round(cx + Math.cos(angle) * radius), Math.round(cy + (Math.sin(angle) * radius) / 2), 1, 1);
  }
}

// ---- Effects ----------------------------------------------------------------------------
// Each kind: life (seconds), ground (drawn under the characters) and/or air (over them).
// (x, y) is the top left of the tile the effect belongs to, except for free movers.

const KINDS = {
  // Tall grass entered by the player: the tuft shakes, a few blades fly up.
  grass: {
    life: 0.4,
    ground(ctx, e, sx, sy) {
      drawMetatile(ctx, e.tileset, e.tile, sx, sy, 1 + (Math.floor(e.age * 14) % 2));
    },
    air(ctx, e, sx, sy) {
      const lift = 60 * e.age - 120 * e.age * e.age;
      [-1, 0, 1].forEach((side) => {
        fillArea(ctx, 2, Math.round(sx + 7 + side * (3 + e.age * 16)), Math.round(sy + 8 - lift - (side === 0 ? 2 : 0)), 1, 2);
      });
    },
  },
  dust: {
    life: 0.35,
    ground(ctx, e, sx, sy) {
      const cloud = e.age < 0.15 ? DUST_SMALL : DUST_BIG;
      (e.landing ? [3, 13] : [8]).forEach((dx) => drawCentered(ctx, cloud, sx + dx, sy + 15));
    },
  },
  // Footprints on sand, darker first, then fading.
  print: {
    life: 4,
    ground(ctx, e, sx, sy) {
      const color = e.age < 2.5 ? 2 : 1;
      const vertical = e.facing === 'up' || e.facing === 'down';
      const [w, h] = vertical ? [1, 2] : [2, 1];
      fillArea(ctx, color, sx + 5, sy + 10, w, h);
      fillArea(ctx, color, sx + 10, sy + 6, w, h);
    },
  },
  // Foam spreading behind the buoy.
  wake: {
    life: 0.6,
    ground(ctx, e, sx, sy) {
      const spread = Math.round(e.age * 10);
      fillArea(ctx, 0, sx + 6 - spread, sy + 12, 2, 1);
      fillArea(ctx, 0, sx + 9 + spread, sy + 12, 2, 1);
    },
  },
  splash: {
    life: 0.5,
    ground(ctx, e, sx, sy) {
      drawRing(ctx, sx + 8, sy + 10, 2 + e.age * 14, 0);
    },
    air(ctx, e, sx, sy) {
      const lift = 40 * e.age - 80 * e.age * e.age;
      [-5, 0, 5].forEach((dx) => fillArea(ctx, 0, Math.round(sx + 8 + dx * (1 + e.age * 2)), Math.round(sy + 6 - lift * 2), 1, 1));
    },
  },
  // A fish ring on the water, sometimes with the fish jumping out.
  fish: {
    life: 0.9,
    ground(ctx, e, sx, sy) {
      drawRing(ctx, sx + 8, sy + 9, 1 + e.age * 8, 0);
    },
    air(ctx, e, sx, sy) {
      if (!e.jump || e.age >= 0.5) return;
      const p = e.age / 0.5;
      drawPixels(ctx, FISH, Math.round(sx + 4 + p * 8), Math.round(sy + 6 - Math.sin(p * Math.PI) * 8));
    },
  },
  glint: {
    life: 0.45,
    ground(ctx, e, sx, sy) {
      const p = e.age / 0.45;
      drawCentered(ctx, p > 0.3 && p < 0.7 ? GLINT_BIG : GLINT_SMALL, sx + e.dx, sy + e.dy);
    },
  },
  // Cave drip: a drop falls from the ceiling, then a small ring.
  drip: {
    life: 1.1,
    ground(ctx, e, sx, sy) {
      if (e.age >= 0.35) drawRing(ctx, sx + 8, sy + 10, 1 + (e.age - 0.35) * 8, 0);
    },
    air(ctx, e, sx, sy) {
      if (e.age < 0.35) fillArea(ctx, 0, sx + 8, Math.round(sy - 18 + (e.age / 0.35) * 26), 1, 2);
    },
  },
  lava: {
    life: 0.7,
    ground(ctx, e, sx, sy) {
      const x = sx + e.dx;
      const y = sy + e.dy;
      if (e.age < 0.5) {
        drawCentered(ctx, LAVA_BUBBLE[e.age < 0.25 ? 0 : 1], x, y);
        return;
      }
      const spread = Math.round((e.age - 0.5) * 20);
      [[-1, -1], [1, -1], [-1, 0], [1, 0]].forEach(([dx, dy]) => fillArea(ctx, 0, x + dx * (2 + spread), y - 2 + dy * spread, 1, 1));
    },
  },
  leaf: {
    life: 2.2,
    air(ctx, e, sx, sy) {
      const x = sx + Math.sin(e.age * 4 + e.phase) * 3 + e.age * e.drift;
      drawPixels(ctx, LEAF[Math.floor(e.age * 4) % 2], Math.round(x), Math.round(sy + e.age * 12));
    },
  },
  butterfly: {
    life: 7,
    air(ctx, e, sx, sy) {
      const leaving = Math.max(0, e.age - 5.5);
      const x = sx + 8 + Math.sin(e.age * 1.7 + e.phase) * 10 + Math.sin(e.age * 4.1) * 3 + leaving * 20;
      const y = sy + 2 + Math.cos(e.age * 1.3 + e.phase) * 5 + Math.sin(e.age * 5) * 2 - leaving * 30;
      drawPixels(ctx, Math.floor(e.age * 8) % 2 ? BUTTERFLY_OPEN : BUTTERFLY_CLOSED, Math.round(x), Math.round(y));
    },
  },
  // Dragonfly over the water: hovers, then darts to another spot.
  dragonfly: {
    life: 6,
    air(ctx, e, sx, sy) {
      const hop = Math.floor(e.age / 0.8);
      const from = e.spots[hop % e.spots.length];
      const to = e.spots[(hop + 1) % e.spots.length];
      const p = Math.min(1, ((e.age % 0.8) - 0.6) / 0.15);
      const t = p > 0 ? p : 0;
      const x = sx + from.x + (to.x - from.x) * t;
      const y = sy + from.y + (to.y - from.y) * t;
      drawPixels(ctx, DRAGONFLY[Math.floor(e.age * 12) % 2], Math.round(x), Math.round(y));
    },
  },
  // Bird crossing the screen, its shadow on the ground far below.
  bird: {
    ground(ctx, e, sx, sy) {
      fillArea(ctx, 2, Math.round(sx + e.age * e.vx + 1), Math.round(sy + e.age * e.vy + 30), 3, 1);
    },
    air(ctx, e, sx, sy) {
      const frame = Math.floor(e.age * 5 + e.phase) % 2 ? BIRD_UP : BIRD_DOWN;
      drawPixels(ctx, frame, Math.round(sx + e.age * e.vx), Math.round(sy + e.age * e.vy));
    },
  },
  smoke: {
    life: 2,
    air(ctx, e, sx, sy) {
      const frame = SMOKE[e.age < 0.7 ? 0 : e.age < 1.4 ? 1 : 2];
      drawCentered(ctx, frame, sx + e.age * 4 + Math.sin(e.age * 3) * 2, sy - e.age * 10);
    },
  },
};

// ---- Map queries ---------------------------------------------------------------------------

const isTree = (metatile) => Boolean(metatile?.wind);
const isWater = (metatile) => metatile?.id === 'water';
const isChimney = (metatile) => /^house_[abc]_roof_top_r$/.test(metatile?.id ?? '');

/** Top left tile of the 2 × 2 tree a tree tile belongs to. */
function treeOrigin(id, tx, ty) {
  return { x: id.endsWith('r') ? tx - 1 : tx, y: id.includes('_b') ? ty - 1 : ty };
}

/** Tiles of the current map on screen that pass `test`: [{ tx, ty, metatile }]. */
function visibleTiles(map, camera, test) {
  const found = [];
  const firstX = Math.floor(camera.x / METATILE);
  const firstY = Math.floor(camera.y / METATILE);
  for (let ty = firstY; ty <= firstY + SCREEN_HEIGHT / METATILE; ty += 1) {
    for (let tx = firstX; tx <= firstX + SCREEN_WIDTH / METATILE; tx += 1) {
      const metatile = map.metatileAt(tx, ty);
      if (metatile && test(metatile)) found.push({ tx, ty, metatile });
    }
  }
  return found;
}

// ---- Spawners -----------------------------------------------------------------------------
// Each spawner runs every `every` seconds (random in the range) when `when(map)` holds.

const sky = (map) => SKY_TILESETS.includes(map.tileset);

const SPAWNERS = [
  {
    name: 'gust', every: [10, 18], when: sky,
    spawn(a, { camera }) { a.gust = { from: camera.x - GUST_BAND, start: a.time }; },
  },
  {
    name: 'rustle', every: [1, 2.5], when: sky,
    spawn(a, { map, camera }) {
      const tile = a.pickTile(map, camera, isTree);
      if (!tile) return;
      const origin = treeOrigin(tile.metatile.id, tile.tx, tile.ty);
      a.rustles.set(`${origin.x},${origin.y}`, a.time + RUSTLE_TIME);
    },
  },
  {
    name: 'leaf', every: [1.2, 3], when: sky,
    spawn(a, { map, camera }) {
      const tile = a.pickTile(map, camera, isTree);
      if (!tile) return;
      const x = tile.tx * METATILE + a.rng.int(2, 13);
      a.add('leaf', x, tile.ty * METATILE + a.rng.int(2, 10), { phase: a.rng.next() * 6, drift: a.inGust(x) ? 24 : 0 });
    },
  },
  {
    name: 'bird', every: [12, 25], when: sky,
    spawn(a, { camera }) {
      const count = a.rng.int(1, 3);
      const vx = 40 + a.rng.int(0, 15);
      const vy = a.rng.int(-8, 8);
      const y = camera.y + a.rng.int(8, 70);
      for (let i = 0; i < count; i += 1) {
        a.add('bird', camera.x - 8 - i * 9, y + (i % 2) * 6 - (i > 0 ? 3 : 0), {
          vx, vy, phase: i * 0.5, life: (SCREEN_WIDTH + 32 + i * 9) / vx,
        });
      }
    },
  },
  {
    name: 'butterfly', every: [3, 6], when: sky,
    spawn(a, { map, camera }) {
      if (a.count('butterfly') >= 2) return;
      const tile = a.pickTile(map, camera, (m) => m.id === 'flowers');
      if (tile) a.add('butterfly', tile.tx * METATILE, tile.ty * METATILE, { phase: a.rng.next() * 6 });
    },
  },
  {
    name: 'dragonfly', every: [5, 9], when: sky,
    spawn(a, { map, camera }) {
      if (a.count('dragonfly') >= 1) return;
      const tile = a.pickTile(map, camera, isWater);
      if (!tile) return;
      const spots = Array.from({ length: 8 }, () => ({ x: a.rng.int(-12, 16), y: a.rng.int(-10, 6) }));
      a.add('dragonfly', tile.tx * METATILE, tile.ty * METATILE, { spots });
    },
  },
  {
    name: 'fish', every: [3, 7], when: (map) => map.tileset !== 'indoor',
    spawn(a, { map, camera }) {
      const tile = a.pickTile(map, camera, isWater);
      if (tile) a.add('fish', tile.tx * METATILE, tile.ty * METATILE, { jump: a.rng.chance(0.5) });
    },
  },
  {
    name: 'glint', every: [0.4, 0.9], when: (map) => map.tileset !== 'indoor', flashes: true,
    spawn(a, { map, camera }) {
      const tile = a.pickTile(map, camera, isWater);
      if (tile) a.add('glint', tile.tx * METATILE, tile.ty * METATILE, { dx: a.rng.int(3, 12), dy: a.rng.int(4, 13) });
    },
  },
  {
    name: 'drip', every: [1.2, 2.8], when: (map) => map.tileset === 'cave',
    spawn(a, { map, camera }) {
      const tile = a.pickTile(map, camera, (m) => !m.solid);
      if (tile) a.add('drip', tile.tx * METATILE, tile.ty * METATILE);
    },
  },
  {
    name: 'lava', every: [0.4, 0.8], when: (map) => map.tileset !== 'indoor',
    spawn(a, { map, camera }) {
      const tile = a.pickTile(map, camera, (m) => m.id === 'lava');
      if (tile) a.add('lava', tile.tx * METATILE, tile.ty * METATILE, { dx: a.rng.int(4, 12), dy: a.rng.int(6, 14) });
    },
  },
  {
    name: 'smoke', every: [0.5, 0.9], when: (map) => map.tileset === 'town',
    spawn(a, { map, camera }) {
      for (const tile of visibleTiles(map, camera, isChimney)) {
        if (a.rng.chance(0.6)) a.add('smoke', tile.tx * METATILE + 11, tile.ty * METATILE - 3);
      }
    },
  },
];

// NPC mood bubbles: an idle, non-trainer NPC on screen shows « … », a note or a heart.
const BUBBLE_EVERY = [4, 8];
const BUBBLE_TIME = 1.8;

export class Ambience {
  constructor(rng = createRng()) {
    this.rng = rng;
    this.time = 0;
    this.reset();
  }

  /** Clears everything (new map). */
  reset() {
    this.effects = [];
    this.rustles = new Map();
    this.gust = null;
    this.bubbles = new Map();
    this.timers = Object.fromEntries(SPAWNERS.map((spawner) => [spawner.name, this.interval(spawner.every)]));
    this.bubbleTimer = this.interval(BUBBLE_EVERY);
  }

  interval([min, max]) {
    return min + this.rng.next() * (max - min);
  }

  add(kind, x, y, data = {}) {
    if (this.effects.length >= MAX_EFFECTS) return;
    this.effects.push({ kind, x, y, age: 0, life: KINDS[kind].life, ...data });
  }

  count(kind) {
    return this.effects.filter((effect) => effect.kind === kind).length;
  }

  pickTile(map, camera, test) {
    const tiles = visibleTiles(map, camera, test);
    return tiles.length > 0 ? this.rng.pick(tiles) : null;
  }

  /** True while the gust band covers the map x coordinate. */
  inGust(x) {
    if (!this.gust) return false;
    const front = this.gust.from + (this.time - this.gust.start) * GUST_SPEED;
    return x <= front && x >= front - GUST_BAND;
  }

  /**
   * Frame of a metatile: trees use their wind frame in a gust or while rustling (never the
   * clock); tall grass and flowers lean one frame ahead in a gust.
   */
  tileStep(metatile, tx, ty, clockStep) {
    if (!metatile) return clockStep;
    if (metatile.wind) {
      const origin = treeOrigin(metatile.id, tx, ty);
      if (this.inGust((origin.x + 1) * METATILE)) return 1;
      const until = this.rustles.get(`${origin.x},${origin.y}`) ?? 0;
      return until > this.time ? Math.floor(this.time * RUSTLE_RATE) % 2 : 0;
    }
    if ((metatile.grass || metatile.id === 'flowers') && this.inGust(tx * METATILE + METATILE / 2)) return clockStep + 1;
    return clockStep;
  }

  /** world: { map, camera, actors, busy, reduceFlashes } */
  update(dt, world) {
    this.time += dt;
    for (const effect of this.effects) effect.age += dt;
    this.effects = this.effects.filter((effect) => effect.age < effect.life);
    for (const [key, until] of this.rustles) if (until <= this.time) this.rustles.delete(key);
    if (this.gust && this.gust.from + (this.time - this.gust.start) * GUST_SPEED > this.gust.from + SCREEN_WIDTH + 3 * GUST_BAND) {
      this.gust = null;
    }
    for (const spawner of SPAWNERS) {
      this.timers[spawner.name] -= dt;
      if (this.timers[spawner.name] > 0) continue;
      this.timers[spawner.name] = this.interval(spawner.every);
      if (spawner.when(world.map) && !(spawner.flashes && world.reduceFlashes)) spawner.spawn(this, world);
    }
    this.updateBubbles(dt, world);
  }

  updateBubbles(dt, { actors, camera, busy }) {
    if (busy) {
      this.bubbles.clear();
      return;
    }
    for (const [actor, bubble] of this.bubbles) {
      bubble.age += dt;
      if (bubble.age >= BUBBLE_TIME || actor.movement || !actor.visible) this.bubbles.delete(actor);
    }
    this.bubbleTimer -= dt;
    if (this.bubbleTimer > 0) return;
    this.bubbleTimer = this.interval(BUBBLE_EVERY);
    const idle = actors.filter((actor) => {
      if (!actor.visible || actor.trainerId || actor.movement || this.bubbles.has(actor)) return false;
      const { px, py } = pixelPosition(actor);
      return px >= camera.x && px < camera.x + SCREEN_WIDTH - METATILE && py >= camera.y + METATILE && py < camera.y + SCREEN_HEIGHT;
    });
    if (idle.length > 0) this.bubbles.set(this.rng.pick(idle), { icon: this.rng.weighted(BUBBLE_KINDS).icon, age: 0 });
  }

  /** Under the characters: tile effects, chimneys, bird shadows. */
  drawGround(ctx, camera, map) {
    if (map.tileset === 'town') {
      for (const { tx, ty } of visibleTiles(map, camera, isChimney)) drawPixels(ctx, CHIMNEY, tx * METATILE + 9 - camera.x, ty * METATILE - 2 - camera.y);
    }
    this.drawLayer(ctx, camera, 'ground');
  }

  /** Over the characters: flying things, smoke, NPC bubbles. */
  drawAir(ctx, camera) {
    this.drawLayer(ctx, camera, 'air');
    for (const [actor, bubble] of this.bubbles) {
      const { px, py } = pixelPosition(actor);
      const x = px - camera.x + 3;
      const y = py - camera.y + SPRITE_OFFSET_Y - 11 + (bubble.age < 0.08 ? 1 : 0);
      fillArea(ctx, 3, x, y, 11, 9);
      fillArea(ctx, 0, x + 1, y + 1, 9, 7);
      fillArea(ctx, 3, x + 2, y + 9, 2, 1);
      fillArea(ctx, 3, x + 2, y + 10, 1, 1);
      drawPixels(ctx, BUBBLE_ICONS[bubble.icon], x + 2, y + 2);
    }
  }

  drawLayer(ctx, camera, layer) {
    for (const effect of this.effects) {
      const draw = KINDS[effect.kind][layer];
      if (draw) draw(ctx, effect, effect.x - camera.x, effect.y - camera.y);
    }
  }
}

/** Items on the ground: a short sparkle every few seconds, each item at its own moment. */
export function drawItemSparkle(ctx, x, y, time, seed) {
  const phase = (time + seed * 0.73) % 2.4;
  if (phase >= 0.3) return;
  drawCentered(ctx, SPARKLE[phase < 0.1 || phase >= 0.2 ? 0 : 1], x + 13, y + 4);
}

// Place name banner of the overworld scene.
const BANNER_LINE_CHARS = 18;

/** Place name on one line, or two lines split at the space nearest the middle. */
export function bannerLines(name) {
  const chars = Array.from(name);
  if (chars.length <= BANNER_LINE_CHARS) return [name];
  const spaces = chars.map((char, index) => (char === ' ' ? index : -1)).filter((index) => index > 0);
  if (spaces.length === 0) return [name];
  const middle = chars.length / 2;
  const cut = spaces.reduce((best, index) => (Math.abs(index - middle) < Math.abs(best - middle) ? index : best));
  return [chars.slice(0, cut).join(''), chars.slice(cut + 1).join('')];
}
