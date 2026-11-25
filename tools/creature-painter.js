// Layer painter for hand-designed creature sprites (tools/creature-designs/): shapes become
// masks, painted in order with an ink outline, rim shading and a light area. Pure, no DOM.
// The result is text rows in the sprite source format ('0'-'3', '.' = transparent).
export const W = 48;
export const H = 48;

export function mask(test) {
  const m = new Uint8Array(W * H);
  for (let y = 0; y < H; y += 1) for (let x = 0; x < W; x += 1) if (test(x + 0.5, y + 0.5)) m[y * W + x] = 1;
  return m;
}

export const ellipse = (cx, cy, rx, ry) => (x, y) => ((x - cx) / rx) ** 2 + ((y - cy) / ry) ** 2 <= 1;
export const rect = (x0, y0, x1, y1) => (x, y) => x >= x0 && x < x1 && y >= y0 && y < y1;
export function poly(...points) {
  return (x, y) => {
    let inside = false;
    for (let i = 0, j = points.length - 1; i < points.length; j = i, i += 1) {
      const [xi, yi] = points[i];
      const [xj, yj] = points[j];
      if ((yi > y) !== (yj > y) && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi) inside = !inside;
    }
    return inside;
  };
}
export const union = (...tests) => (x, y) => tests.some((t) => t(x, y));
export const minus = (a, b) => (x, y) => a(x, y) && !b(x, y);
export const mirrorX = (test, axis = 24) => union(test, (x, y) => test(2 * axis - x, y));

/**
 * layers: { shape, tone, outline = true, shade = null (darker tone on bottom/right rim),
 *           light = null ({ tone, shape } painted inside the layer), pixels = [[x, y, tone]],
 *           outlineTone = 3, litOutline = outlineTone (tone of the outline on the top and left
 *           sides, facing the light: a softer selective outline) }
 */
export function paint(layers) {
  const grid = new Int8Array(W * H).fill(-1);
  const inside = (m, x, y) => x >= 0 && y >= 0 && x < W && y < H && m[y * W + x] === 1;
  for (const layer of layers) {
    const m = layer.shape ? mask(layer.shape) : null;
    if (m && layer.outline !== false) {
      for (let y = 0; y < H; y += 1) {
        for (let x = 0; x < W; x += 1) {
          if (m[y * W + x]) continue;
          const shadowSide = inside(m, x - 1, y) || inside(m, x, y - 1);
          const litSide = inside(m, x + 1, y) || inside(m, x, y + 1);
          if (shadowSide) grid[y * W + x] = layer.outlineTone ?? 3;
          else if (litSide) grid[y * W + x] = layer.litOutline ?? layer.outlineTone ?? 3;
        }
      }
    }
    if (m) {
      for (let i = 0; i < W * H; i += 1) if (m[i]) grid[i] = layer.tone;
      if (layer.shade != null) {
        const depth = layer.shadeDepth ?? 1;
        for (let y = 0; y < H; y += 1) {
          for (let x = 0; x < W; x += 1) {
            if (!m[y * W + x]) continue;
            let edge = false;
            for (let d = 1; d <= depth; d += 1) if (!inside(m, x + d, y) || !inside(m, x, y + d)) edge = true;
            if (edge) grid[y * W + x] = layer.shade;
          }
        }
      }
      if (layer.light) {
        const lm = mask(layer.light.shape);
        for (let i = 0; i < W * H; i += 1) if (m[i] && lm[i]) grid[i] = layer.light.tone;
      }
    }
    for (const [x, y, tone] of layer.pixels ?? []) grid[y * W + x] = tone;
  }
  return grid;
}

export function toRows(grid) {
  const rows = [];
  for (let y = 0; y < H; y += 1) {
    let row = '';
    for (let x = 0; x < W; x += 1) row += grid[y * W + x] < 0 ? '.' : String(grid[y * W + x]);
    rows.push(row);
  }
  return rows;
}

/** Parses "x,y,x2-x3,..." style pixel lists: px(tone, [x, y], ...) */
export const px = (tone, ...points) => points.map(([x, y]) => [x, y, tone]);

/** Thick polyline: points within r of any segment. */
export function capsule(points, r) {
  return (x, y) => {
    for (let i = 0; i + 1 < points.length; i += 1) {
      const [ax, ay] = points[i];
      const [bx, by] = points[i + 1];
      const dx = bx - ax;
      const dy = by - ay;
      const t = Math.max(0, Math.min(1, ((x - ax) * dx + (y - ay) * dy) / (dx * dx + dy * dy || 1)));
      if ((x - ax - t * dx) ** 2 + (y - ay - t * dy) ** 2 <= r * r) return true;
    }
    return false;
  };
}

/** Pixels from a mini text grid placed at (x0, y0): digits are tones, other characters are skipped. */
export function stamp(x0, y0, rows) {
  const pixels = [];
  rows.forEach((row, dy) => [...row].forEach((c, dx) => {
    if (/[0-3]/.test(c)) pixels.push([x0 + dx, y0 + dy, Number(c)]);
  }));
  return pixels;
}

/** Two glinting 2 × 3 eyes, left one at column lx, right one at rx, top row y. */
export function eyes(lx, rx, y, { height = 3 } = {}) {
  const pixels = [];
  for (const x of [lx, rx]) {
    for (let dy = 0; dy < height; dy += 1) pixels.push([x, y + dy, 3], [x + 1, y + dy, 3]);
    pixels.push([x + 1, y, 0]);
  }
  return pixels;
}

/** 16 × 16 party icon painted with the same layers, in the top-left corner of the grid. */
export const iconFrom = (layers) => toRows(paint(layers)).slice(0, 16).map((row) => row.slice(0, 16));
