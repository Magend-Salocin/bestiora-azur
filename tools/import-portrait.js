// Converts a reference image (docs/Pnj/references/) into the base of a portrait design module:
// square crop, area downscale, background made transparent, 4 tones by clustering the figure's
// luminance, isolated pixels removed. The module is then retouched by hand and exported with
// npm run trainer-design. Docs: docs/Pnj/references-portraits.md.
//
// Usage: npm run trainer-import -- <image> --id <id> [--panel <i>/<n> [--grid <C>x<R>]] [--size 48] [--force]
//   --panel i/n  the image is a vertical strip of n portraits; take the i-th (1 = top).
//   --grid CxR   with --panel: the n portraits are a grid of C columns and R rows (reading order).
//   --force      overwrite an existing design module (hand retouches are lost).
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { PNG } from 'pngjs';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const DESIGNS = path.join(ROOT, 'tools', 'trainer-designs');
const PANEL_INSET = 3;
const BACKGROUND_TOLERANCE = 28;
const BACKGROUND_SHARE = 0.55;

/**
 * Vertical ranges [top, bottom) of the panels of a strip: separators are rows of one flat color
 * clearly unlike the background. Falls back to an even split when the count does not match.
 */
export function panelRanges(image, count) {
  const { width, height, data } = image;
  const background = [data[8], data[9], data[10]];
  const separator = [];
  for (let y = 0; y < height; y += 1) {
    const mean = [0, 1, 2].map((c) => { let sum = 0; for (let x = 0; x < width; x += 1) sum += data[(y * width + x) * 4 + c]; return sum / width; });
    let flat = 0;
    for (let x = 0; x < width; x += 1) {
      const o = (y * width + x) * 4;
      if (Math.hypot(data[o] - mean[0], data[o + 1] - mean[1], data[o + 2] - mean[2]) < 20) flat += 1;
    }
    separator.push(flat / width > 0.9 && Math.hypot(mean[0] - background[0], mean[1] - background[1], mean[2] - background[2]) > 25);
  }
  const ranges = [];
  let start = 0;
  for (let y = 0; y <= height; y += 1) {
    if (y === height || separator[y]) {
      if (y - start > height / count / 2) ranges.push([start, y]);
      start = y + 1;
    }
  }
  if (ranges.length === count) return ranges;
  return Array.from({ length: count }, (_, i) => [Math.round((i * height) / count), Math.round(((i + 1) * height) / count)]);
}

/** Share of the cell width that the square around a grid portrait spans (head to hands). */
const GRID_SQUARE_SHARE = 1.4;

/**
 * Horizontal ranges [x0, x1) of the n figures of a grid row (rows y0 to y1). Generated grids are
 * not even: the figures are cut at the n - 1 deepest valleys of the column profile (the columns
 * with the fewest figure pixels), at least half a nominal figure width apart.
 */
export function figureColumns(width, y0, y1, n, isFigure) {
  const profile = [];
  for (let x = 0; x < width; x += 1) {
    let count = 0;
    for (let y = y0; y < y1; y += 1) if (isFigure(x, y)) count += 1;
    profile.push(count);
  }
  const first = profile.findIndex((count) => count > 0);
  const last = profile.findLastIndex((count) => count > 0) + 1;
  const gap = (last - first) / n / 2;
  const cuts = [];
  for (let i = 1; i < n; i += 1) {
    let best = null;
    for (let x = Math.ceil(first + gap); x < last - gap; x += 1) {
      if (cuts.some((cut) => Math.abs(cut - x) < gap)) continue;
      if (best === null || profile[x] < profile[best]) best = x;
    }
    if (best !== null) cuts.push(best);
  }
  const edges = [first, ...cuts.sort((a, b) => a - b), last];
  return edges.slice(0, -1).map((x0, i) => [x0, edges[i + 1]]);
}

/**
 * Square image of cell i of a grid (reading order, `columns` per row; the figures of a row are
 * separated by figureColumns). Busts are taller than wide: the square starts just above the
 * figure and is 1.4 nominal cell widths wide, the same scale for every portrait, so that it
 * keeps the hands and the tool of the trade. Outside the figure's range it is filled with the
 * background, so that the neighbouring portraits do not leak in.
 */
export function gridCell(image, { index, count, columns }) {
  const { width, height, data } = image;
  const rows = Math.ceil(count / columns);
  const column = (index - 1) % columns;
  const row = Math.floor((index - 1) / columns);
  const y0 = Math.round((row * height) / rows);
  const y1 = Math.round(((row + 1) * height) / rows);
  const background = [data[0], data[1], data[2]];
  const isFigure = (x, y) => {
    const o = (y * width + x) * 4;
    return Math.hypot(data[o] - background[0], data[o + 1] - background[1], data[o + 2] - background[2]) > BACKGROUND_TOLERANCE;
  };
  const inRow = Math.min(columns, count - row * columns);
  const [x0, x1] = figureColumns(width, y0, y1, inRow, isFigure)[column];
  let top = y1;
  let left = x1;
  let right = x0;
  for (let y = y0; y < y1; y += 1) {
    for (let x = x0; x < x1; x += 1) {
      if (!isFigure(x, y)) continue;
      top = Math.min(top, y);
      left = Math.min(left, x);
      right = Math.max(right, x);
    }
  }
  if (top === y1) throw new Error(`Case ${index} vide`);
  top = Math.max(y0, top - PANEL_INSET);
  const size = Math.min(y1 - top, Math.round((width / columns) * GRID_SQUARE_SHARE));
  const offsetX = Math.round((left + right) / 2 - size / 2);
  const cell = { width: size, height: size, data: Buffer.alloc(size * size * 4) };
  for (let y = 0; y < size; y += 1) {
    for (let x = 0; x < size; x += 1) {
      const [sx, sy] = [offsetX + x, top + y];
      const inside = sx >= x0 && sx < x1 && sy < y1;
      const o = (y * size + x) * 4;
      if (inside) data.copy(cell.data, o, (sy * width + sx) * 4, (sy * width + sx) * 4 + 4);
      else cell.data.set([...background, 255], o);
    }
  }
  return cell;
}

/** Square crop { left, top, size } of the image, or of panel i of a vertical strip of n. */
export function cropBox(image, panel = null) {
  const { width, height } = image;
  if (!panel) {
    const size = Math.min(width, height);
    return { left: Math.floor((width - size) / 2), top: Math.floor((height - size) / 2), size };
  }
  const [top, bottom] = panelRanges(image, panel.count)[panel.index - 1];
  const size = Math.min(width, bottom - top) - 2 * PANEL_INSET;
  return { left: Math.floor((width - size) / 2), top: top + Math.floor((bottom - top - size) / 2), size };
}

/** Median color of the crop border: the flat background of the reference. */
function backgroundColor(image, box) {
  const samples = [];
  for (let i = 0; i < box.size; i += 1) {
    for (const [x, y] of [[box.left + i, box.top], [box.left + i, box.top + box.size - 1], [box.left, box.top + i], [box.left + box.size - 1, box.top + i]]) {
      const o = (y * image.width + x) * 4;
      samples.push([image.data[o], image.data[o + 1], image.data[o + 2]]);
    }
  }
  return [0, 1, 2].map((c) => samples.map((s) => s[c]).sort((a, b) => a - b)[Math.floor(samples.length / 2)]);
}

/** Grid of mean luminance per cell, null for the background around the figure. */
export function sampleGrid(image, box, size) {
  const background = backgroundColor(image, box);
  const grid = [];
  for (let gy = 0; gy < size; gy += 1) {
    const row = [];
    for (let gx = 0; gx < size; gx += 1) {
      const x0 = box.left + Math.floor((gx * box.size) / size);
      const x1 = box.left + Math.floor(((gx + 1) * box.size) / size);
      const y0 = box.top + Math.floor((gy * box.size) / size);
      const y1 = box.top + Math.floor(((gy + 1) * box.size) / size);
      let sum = 0;
      let count = 0;
      let backgroundCount = 0;
      for (let y = y0; y < y1; y += 1) {
        for (let x = x0; x < x1; x += 1) {
          const o = (y * image.width + x) * 4;
          const [r, g, b] = [image.data[o], image.data[o + 1], image.data[o + 2]];
          sum += 0.299 * r + 0.587 * g + 0.114 * b;
          count += 1;
          if (Math.hypot(r - background[0], g - background[1], b - background[2]) < BACKGROUND_TOLERANCE) backgroundCount += 1;
        }
      }
      row.push({ value: sum / count, backgroundLike: backgroundCount / count > BACKGROUND_SHARE });
    }
    grid.push(row);
  }
  // Only the background-like cells connected to the border are background: a light cheek or
  // shirt of the same color inside the figure stays opaque.
  const outside = grid.map((row) => row.map(() => false));
  const queue = [];
  for (let i = 0; i < size; i += 1) queue.push([i, 0], [i, size - 1], [0, i], [size - 1, i]);
  while (queue.length > 0) {
    const [x, y] = queue.pop();
    if (x < 0 || y < 0 || x >= size || y >= size || outside[y][x] || !grid[y][x].backgroundLike) continue;
    outside[y][x] = true;
    queue.push([x + 1, y], [x - 1, y], [x, y + 1], [x, y - 1]);
  }
  return grid.map((row, y) => row.map((cell, x) => (outside[y][x] ? null : cell.value)));
}

/** Four luminance centers of the figure (1D k-means), darkest first. */
export function toneCenters(values) {
  const sorted = [...values].sort((a, b) => a - b);
  const [low, high] = [sorted[0], sorted[sorted.length - 1]];
  let centers = [0.125, 0.375, 0.625, 0.875].map((f) => low + f * (high - low));
  for (let pass = 0; pass < 20; pass += 1) {
    const sums = [0, 0, 0, 0];
    const counts = [0, 0, 0, 0];
    for (const v of sorted) {
      const k = nearest(centers, v);
      sums[k] += v;
      counts[k] += 1;
    }
    centers = centers.map((c, k) => (counts[k] ? sums[k] / counts[k] : c));
  }
  return centers;
}

const nearest = (centers, v) => centers.reduce((best, c, k) => (Math.abs(v - c) < Math.abs(v - centers[best]) ? k : best), 0);

/** Rows in the sprite format: darkest cluster = tone 3, lightest = tone 0, background = '.'. */
export function quantize(grid, centers = toneCenters(grid.flat().filter((v) => v !== null))) {
  return grid.map((row) => row.map((v) => (v === null ? '.' : String(3 - nearest(centers, v)))));
}

/** Replaces each pixel unlike all 4 neighbours by the tone most of them share (at least 3). */
export function removeIsolated(cells) {
  const size = cells.length;
  const at = (x, y) => (x >= 0 && y >= 0 && x < size && y < size ? cells[y][x] : '.');
  return cells.map((row, y) => row.map((c, x) => {
    const around = [at(x - 1, y), at(x + 1, y), at(x, y - 1), at(x, y + 1)];
    if (around.includes(c)) return c;
    const counts = {};
    for (const n of around) counts[n] = (counts[n] ?? 0) + 1;
    const [tone, count] = Object.entries(counts).sort((a, b) => b[1] - a[1])[0];
    return count >= 3 ? tone : c;
  }));
}

/**
 * Light pixels (tone 0) on the silhouette edge would melt into the battle background, which is
 * tone 0 too: they become tone 1 where the background is above or on the left (lit side) and
 * tone 2 where it is below or on the right (shadow side).
 */
export function outlineLightEdges(cells) {
  const size = cells.length;
  const isBackground = (x, y) => x < 0 || y < 0 || x >= size || y >= size || cells[y][x] === '.';
  return cells.map((row, y) => row.map((c, x) => {
    if (c !== '0') return c;
    if (isBackground(x + 1, y) || isBackground(x, y + 1)) return '2';
    if (isBackground(x - 1, y) || isBackground(x, y - 1)) return '1';
    return c;
  }));
}

/**
 * Clears the opaque islands much smaller than the figure: in a grid, the edge of a neighbouring
 * portrait that crosses the cell boundary. A held tool touches the hand, so it stays.
 */
export function removeStrayIslands(cells, minShare = 0.25) {
  const size = cells.length;
  const label = cells.map((row) => row.map(() => -1));
  const islands = [];
  for (let y = 0; y < size; y += 1) {
    for (let x = 0; x < size; x += 1) {
      if (cells[y][x] === '.' || label[y][x] >= 0) continue;
      const pixels = [];
      const stack = [[x, y]];
      label[y][x] = islands.length;
      while (stack.length > 0) {
        const [px, py] = stack.pop();
        pixels.push([px, py]);
        for (const [nx, ny] of [[px + 1, py], [px - 1, py], [px, py + 1], [px, py - 1]]) {
          if (nx < 0 || ny < 0 || nx >= size || ny >= size || cells[ny][nx] === '.' || label[ny][nx] >= 0) continue;
          label[ny][nx] = islands.length;
          stack.push([nx, ny]);
        }
      }
      islands.push(pixels);
    }
  }
  const largest = Math.max(0, ...islands.map((pixels) => pixels.length));
  const result = cells.map((row) => [...row]);
  for (const pixels of islands) {
    if (pixels.length < largest * minShare) for (const [x, y] of pixels) result[y][x] = '.';
  }
  return result;
}

/** Luminance grid of a panel: a cell of a grid, a panel of a strip, or the whole image. */
function panelGrid(image, panel, size) {
  if (panel?.columns > 1) {
    const cell = gridCell(image, panel);
    return sampleGrid(cell, cropBox(cell), size);
  }
  return sampleGrid(image, cropBox(image, panel), size);
}

/**
 * In a strip or a grid, the four tones come from all its panels together, so that skin, cloth
 * and hair get the same tones from one portrait to the next.
 */
export function importPortrait(image, { size = 48, panel = null } = {}) {
  let centers;
  if (panel) {
    const values = [];
    for (let index = 1; index <= panel.count; index += 1) {
      for (const v of panelGrid(image, { ...panel, index }, size).flat()) if (v !== null) values.push(v);
    }
    centers = toneCenters(values);
  }
  let cells = quantize(panelGrid(image, panel, size), centers);
  if (panel?.columns > 1) cells = removeStrayIslands(cells);
  return outlineLightEdges(removeIsolated(cells)).map((row) => row.join(''));
}

function designSource(id, rows, reference, panel) {
  const grid = panel?.columns > 1 ? `, grid ${panel.columns}x${Math.ceil(panel.count / panel.columns)}` : '';
  const origin = `${reference}${panel ? ` (panel ${panel.index}/${panel.count}${grid})` : ''}`;
  return `// ${id}: imported by npm run trainer-import from ${origin}, then retouched by hand.\n`
    + "// Edit the rows directly ('0'-'3' = tone, '.' = transparent), then npm run trainer-design.\n"
    + `export const portraits = [{\n  id: '${id}',\n  portrait: [\n${rows.map((row) => `    '${row}',`).join('\n')}\n  ],\n}];\n`;
}

function option(args, name) {
  const index = args.indexOf(name);
  return index >= 0 ? args[index + 1] : null;
}

function main(args) {
  const file = args[0];
  const id = option(args, '--id');
  if (!file || !id) throw new Error('Usage: npm run trainer-import -- <image> --id <id> [--panel i/n [--grid CxR]] [--size 48] [--force]');
  const panelArgument = option(args, '--panel');
  const gridArgument = option(args, '--grid');
  const panel = panelArgument ? {
    index: Number(panelArgument.split('/')[0]),
    count: Number(panelArgument.split('/')[1]),
    columns: gridArgument ? Number(gridArgument.split('x')[0]) : 1,
  } : null;
  const size = Number(option(args, '--size') ?? 48);
  const target = path.join(DESIGNS, `${id}.js`);
  if (fs.existsSync(target) && !args.includes('--force')) throw new Error(`${path.relative(ROOT, target)} existe déjà (--force pour l'écraser)`);
  const rows = importPortrait(PNG.sync.read(fs.readFileSync(file)), { size, panel });
  const reference = path.relative(ROOT, path.resolve(file)).replace(/\\/g, '/');
  fs.writeFileSync(target, designSource(id, rows, reference, panel));
  process.stdout.write(`${path.relative(ROOT, target)} ← ${reference}\n`);
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  try {
    main(process.argv.slice(2));
  } catch (error) {
    process.stderr.write(`${error.message}\n`);
    process.exit(1);
  }
}
