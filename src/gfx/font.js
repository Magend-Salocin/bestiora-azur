import { CHARACTER_ALIASES, GLYPH_SIZE, buildGlyphTable } from './font-glyphs.js';
import { createCanvas, paintRows } from './bitmap.js';
import { getColor, getPaletteKey } from './palette.js';

export { GLYPH_HP, GLYPH_LEVEL } from './font-glyphs.js';

export const GLYPH_WIDTH = GLYPH_SIZE;
export const TEXT_LINE_HEIGHT = 16;

const INK_INDEX = 3;
const FALLBACK_CHARACTER = '?';
const ATLAS_COLUMNS = 16;

const glyphTable = buildGlyphTable();
const glyphIndex = new Map([...glyphTable.keys()].map((character, index) => [character, index]));
const atlasCache = new Map();

/** Glyph lists of the texts drawn recently: the same labels are drawn every frame. */
const MAX_CACHED_TEXTS = 512;
const characterCache = new Map();

function cachedCharacters(text) {
  let characters = characterCache.get(text);
  if (!characters) {
    if (characterCache.size >= MAX_CACHED_TEXTS) characterCache.clear();
    characters = toCharacters(text);
    characterCache.set(text, characters);
  }
  return characters;
}

function toCharacters(text) {
  return Array.from(text.normalize('NFC'), (character) => CHARACTER_ALIASES[character] ?? character);
}

function buildAtlas(colorIndex) {
  const rows = Math.ceil(glyphTable.size / ATLAS_COLUMNS);
  const canvas = createCanvas(ATLAS_COLUMNS * GLYPH_SIZE, rows * GLYPH_SIZE);
  const context = canvas.getContext('2d');
  const image = context.createImageData(canvas.width, canvas.height);
  const resolveColor = (index) => getColor(index === INK_INDEX ? colorIndex : index);

  for (const [character, index] of glyphIndex) {
    const x = (index % ATLAS_COLUMNS) * GLYPH_SIZE;
    const y = Math.floor(index / ATLAS_COLUMNS) * GLYPH_SIZE;
    paintRows(image, glyphTable.get(character), x, y, resolveColor);
  }
  context.putImageData(image, 0, 0);
  return canvas;
}

/** One atlas per palette key and ink color: atlasCache.get(paletteKey)[colorIndex]. */
function getAtlas(colorIndex) {
  const paletteKey = getPaletteKey();
  let atlases = atlasCache.get(paletteKey);
  if (!atlases) {
    atlases = [];
    atlasCache.set(paletteKey, atlases);
  }
  atlases[colorIndex] ??= buildAtlas(colorIndex);
  return atlases[colorIndex];
}

export function hasGlyph(character) {
  return glyphIndex.has(CHARACTER_ALIASES[character] ?? character);
}

/**
 * Draws monospace 8×8 text. '\n' moves down TEXT_LINE_HEIGHT pixels.
 * colorIndex (0-3) replaces the glyph ink color. maxCharacters draws only the start of the text
 * (letter-by-letter dialogs) without building a new string each frame.
 */
export function drawText(ctx, text, x, y, colorIndex = INK_INDEX, maxCharacters = Infinity) {
  const atlas = getAtlas(colorIndex);
  const characters = cachedCharacters(text);
  const count = Math.min(characters.length, maxCharacters);
  let cursorX = x;
  let cursorY = y;

  for (let i = 0; i < count; i += 1) {
    const character = characters[i];
    if (character === '\n') {
      cursorX = x;
      cursorY += TEXT_LINE_HEIGHT;
      continue;
    }
    if (character !== ' ') {
      const index = glyphIndex.get(character) ?? glyphIndex.get(FALLBACK_CHARACTER);
      const sourceX = (index % ATLAS_COLUMNS) * GLYPH_SIZE;
      const sourceY = Math.floor(index / ATLAS_COLUMNS) * GLYPH_SIZE;
      ctx.drawImage(atlas, sourceX, sourceY, GLYPH_SIZE, GLYPH_SIZE, cursorX, cursorY, GLYPH_SIZE, GLYPH_SIZE);
    }
    cursorX += GLYPH_WIDTH;
  }
}

/** Width in pixels of the longest line of `text`. */
export function measureText(text) {
  const lines = toCharacters(text).join('').split('\n');
  return Math.max(...lines.map((line) => Array.from(line).length)) * GLYPH_WIDTH;
}
