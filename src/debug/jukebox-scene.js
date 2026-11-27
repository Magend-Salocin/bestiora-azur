// Jukebox (F2, dev only): every track of the game in a list, to listen to them one by one.
// Up/down choose, left/right jump a page, A plays, B closes (the track keeps playing).
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../engine/constants.js';
import { drawText } from '../gfx/font.js';
import { getColor } from '../gfx/palette.js';
import { THEMES, TRACKS } from '../audio/tracks/index.js';
import { hooks } from '../overworld/hooks.js';
import { PromiseScene, moveCursor, scrollOffset } from '../ui/menu-cursor.js';
import { drawWindowFrame } from '../ui/window-frame.js';

const VISIBLE_ROWS = 12;
/** The themes first (map, battle and story music), then jingles and encounter loops. */
export const JUKEBOX_TRACKS = [
  ...THEMES.map((track) => track.id),
  ...Object.keys(TRACKS).filter((id) => !THEMES.some((track) => track.id === id)),
];

// Kept between openings, so that F2 reopens on the track being played.
let lastIndex = 0;
let playing = null;

export class JukeboxScene extends PromiseScene {
  constructor() {
    super();
    this.index = lastIndex;
    this.offset = scrollOffset(0, this.index, VISIBLE_ROWS);
  }

  update(dt, input) {
    const page = (input.repeat('right') ? VISIBLE_ROWS : 0) - (input.repeat('left') ? VISIBLE_ROWS : 0);
    if (page) this.index = Math.max(0, Math.min(JUKEBOX_TRACKS.length - 1, this.index + page));
    else this.index = moveCursor(this.index, JUKEBOX_TRACKS.length, input);
    this.offset = scrollOffset(this.offset, this.index, VISIBLE_ROWS);
    lastIndex = this.index;
    if (input.justPressed('a')) {
      playing = JUKEBOX_TRACKS[this.index];
      hooks.playMusic(playing);
    }
    if (input.justPressed('b')) this.done(null);
  }

  render(ctx) {
    ctx.fillStyle = getColor(0);
    ctx.fillRect(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT);
    drawWindowFrame(ctx, 0, 0, SCREEN_WIDTH, SCREEN_HEIGHT);
    drawText(ctx, `MUSIQUES ${this.index + 1}/${JUKEBOX_TRACKS.length}`, 8, 4);
    JUKEBOX_TRACKS.slice(this.offset, this.offset + VISIBLE_ROWS).forEach((id, row) => {
      const y = 16 + row * 9;
      if (this.offset + row === this.index) drawText(ctx, '▶', 4, y);
      drawText(ctx, `${id === playing ? '*' : ' '}${id}`.slice(0, 18), 12, y);
    });
    drawText(ctx, 'A jouer  B fermer', 8, 128);
  }
}
