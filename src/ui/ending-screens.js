// End of the game: Hall of Fame (records and shows the party), end credits (scrolling names over
// the places visited) and the Bestiary diploma. Opened by `open_menu` (see menu-hooks.js).
import { METATILE, SCREEN_HEIGHT, SCREEN_WIDTH } from '../engine/constants.js';
import { CREATURES_BY_ID } from '../data/creatures.js';
import { getMapDefinition } from '../data/maps/index.js';
import { CREDITS, CREDITS_AUTHOR } from '../data/texts/credits.js';
import { getAtlas } from '../gfx/atlas.js';
import { drawSprite } from '../gfx/draw.js';
import { GLYPH_LEVEL, GLYPH_WIDTH, drawText } from '../gfx/font.js';
import { getColor } from '../gfx/palette.js';
import { localDate } from '../overworld/script-runner.js';
import { buildMap } from '../overworld/map-loader.js';
import { createWorld } from '../overworld/world.js';
import { drawTiles } from '../overworld/world-renderer.js';
import { recordHallOfFame } from '../state/game-state.js';
import { PromiseScene } from './menu-cursor.js';
import { applyVariables, wrapParagraph } from './text-layout.js';
import { drawWindowFrame } from './window-frame.js';

const CREATURE_SIZE = 48;
const CREDITS_SPEED = 12; // pixels per second, x4 while A is held
const CREDITS_LINE_HEIGHT = 12;
const CREDITS_BAND = { y: 96, height: 48 };
const PLACE_DURATION = 6; // seconds per place in the background
const FALLBACK_PLACES = ['hameau_de_lys', 'bourg_sablon', 'port_ondine', 'cendrelune', 'ombrecourt', 'givremont', 'citadelle_azur'];

const centeredX = (text) => Math.floor((SCREEN_WIDTH - Array.from(text).length * GLYPH_WIDTH) / 2);
const drawCentered = (ctx, text, y) => drawText(ctx, text, centeredX(text), y);
const formatDate = (iso) => iso.split('-').reverse().join('/');

/** Hall of Fame: one page per creature of the party, then the whole team. */
export class HallOfFameScreen extends PromiseScene {
  constructor(state, entry) {
    super();
    this.state = state;
    this.entry = entry;
    this.page = 0;
  }

  get pageCount() {
    return this.entry.team.length + 1;
  }

  update(dt, input) {
    if (!input.justPressed('a') && !input.justPressed('b')) return;
    this.page += 1;
    if (this.page >= this.pageCount) this.done(this.entry);
  }

  render(ctx) {
    ctx.fillStyle = getColor(0);
    ctx.fillRect(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT);
    drawWindowFrame(ctx, 0, 0, SCREEN_WIDTH, SCREEN_HEIGHT);
    drawCentered(ctx, 'Salle d’honneur', 8);
    if (this.page < this.entry.team.length) this.renderMember(ctx, this.entry.team[this.page]);
    else this.renderTeam(ctx);
  }

  renderMember(ctx, member) {
    drawSprite(ctx, 'creatures', `${member.species}/front`, (SCREEN_WIDTH - CREATURE_SIZE) / 2, 32);
    drawCentered(ctx, member.name ?? CREATURES_BY_ID[member.species]?.name ?? member.species, 88);
    drawCentered(ctx, `${GLYPH_LEVEL}${member.level}`, 104);
  }

  renderTeam(ctx) {
    this.entry.team.forEach((member, index) => {
      const name = member.name ?? CREATURES_BY_ID[member.species]?.name ?? member.species;
      drawText(ctx, `${name} ${GLYPH_LEVEL}${member.level}`, 16, 24 + index * 14);
    });
    drawCentered(ctx, `${this.state.player.name}, ${formatDate(this.entry.date)}`, 120);
  }
}

/** Credits text with names and blank lines, ready to scroll. */
export function creditLines(state) {
  const context = { CREDITS_AUTHOR, PLAYER: state.player.name, RIVAL: state.rival.name };
  return CREDITS.flatMap((line) => (line === '' ? [''] : wrapParagraph(applyVariables(line, context), 18)));
}

/** Places shown behind the credits: the towns visited, in the order of the journey. */
export function creditPlaces(state) {
  const visited = (state.visitedTowns ?? []).filter((id) => getMapDefinition(id));
  return visited.length > 0 ? visited : FALLBACK_PLACES.filter((id) => getMapDefinition(id));
}

/** Credits: names scroll in the bottom band while the visited places pan slowly above. */
export class CreditsScene extends PromiseScene {
  constructor(state) {
    super();
    this.lines = creditLines(state);
    this.places = creditPlaces(state);
    this.tilesets = getAtlas('tiles').meta.tilesets;
    this.scroll = 0;
    this.time = 0;
    this.worlds = new Map();
  }

  get totalHeight() {
    return this.lines.length * CREDITS_LINE_HEIGHT + CREDITS_BAND.height;
  }

  update(dt, input) {
    this.time += dt;
    this.scroll += CREDITS_SPEED * dt * (input.isDown('a') ? 4 : 1);
    if (this.scroll >= this.totalHeight) this.done(true);
  }

  world(id) {
    if (!this.worlds.has(id)) this.worlds.set(id, createWorld((mapId) => buildMap(getMapDefinition(mapId), this.tilesets), id));
    return this.worlds.get(id);
  }

  render(ctx) {
    ctx.fillStyle = getColor(0);
    ctx.fillRect(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT);
    this.renderPlace(ctx);
    this.renderNames(ctx);
  }

  renderPlace(ctx) {
    const index = Math.floor(this.time / PLACE_DURATION) % this.places.length;
    const progress = (this.time % PLACE_DURATION) / PLACE_DURATION;
    const world = this.world(this.places[index]);
    const { map } = world;
    const maxX = Math.max(0, map.width * METATILE - SCREEN_WIDTH);
    const camera = {
      x: Math.round(maxX * progress),
      y: Math.max(0, Math.round((map.height * METATILE - CREDITS_BAND.y) / 2)),
    };
    ctx.save();
    ctx.beginPath();
    ctx.rect(0, 0, SCREEN_WIDTH, CREDITS_BAND.y);
    ctx.clip();
    drawTiles(ctx, world, camera, Math.floor(this.time * 2));
    ctx.restore();
    drawWindowFrame(ctx, 0, CREDITS_BAND.y - 8, SCREEN_WIDTH, 16);
    drawCentered(ctx, map.name, CREDITS_BAND.y - 4);
  }

  renderNames(ctx) {
    const top = CREDITS_BAND.y + 8;
    ctx.save();
    ctx.beginPath();
    ctx.rect(0, top, SCREEN_WIDTH, SCREEN_HEIGHT - top);
    ctx.clip();
    this.lines.forEach((line, index) => {
      const y = Math.round(SCREEN_HEIGHT + index * CREDITS_LINE_HEIGHT - this.scroll);
      if (line && y > top - 8 && y < SCREEN_HEIGHT) drawCentered(ctx, line, y);
    });
    ctx.restore();
  }
}

/** Bestiary diploma, shown by Professor Morvan once the 150 species are caught. */
export class DiplomaScreen extends PromiseScene {
  constructor(state, date) {
    super();
    this.state = state;
    this.date = date;
  }

  update(dt, input) {
    if (input.justPressed('a') || input.justPressed('b')) this.done(true);
  }

  render(ctx) {
    ctx.fillStyle = getColor(0);
    ctx.fillRect(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT);
    drawWindowFrame(ctx, 0, 0, SCREEN_WIDTH, SCREEN_HEIGHT);
    drawWindowFrame(ctx, 8, 8, SCREEN_WIDTH - 16, SCREEN_HEIGHT - 16);
    drawCentered(ctx, 'DIPLOME', 20);
    drawCentered(ctx, 'du Bestiaire', 32);
    drawCentered(ctx, 'décerné à', 52);
    drawCentered(ctx, this.state.player.name, 64);
    drawCentered(ctx, '150 bestioles', 84);
    drawCentered(ctx, 'capturées.', 96);
    drawCentered(ctx, `Pr Morvan ${formatDate(this.date)}`, 116);
    drawSprite(ctx, 'ui', 'capsule/full', 20, 20);
    drawSprite(ctx, 'ui', 'capsule/full', SCREEN_WIDTH - 28, 20);
  }
}

export function openHallOfFame(manager, state, date = localDate(new Date())) {
  const entry = recordHallOfFame(state, date);
  return manager.push(new HallOfFameScreen(state, entry)).promise;
}

export const openCredits = (manager, state) => manager.push(new CreditsScene(state)).promise;

export const openDiploma = (manager, state, date = localDate(new Date())) => manager.push(new DiplomaScreen(state, date)).promise;
