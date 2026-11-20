// Start menu (window on the right): BESTIAIRE (once obtained), BESTIOLES, SAC, {PLAYER},
// SAUVER, OPTIONS, FERMER. Hidden entries are not shown. `field` gives the map actions.
import { hasFlag } from '../state/game-state.js';
import { openBag } from './bag-menu.js';
import { openBestiary } from './bestiary-screen.js';
import { ListMenu } from './components/list-menu.js';
import { withMenuLayer } from './components/menu-layer.js';
import { openOptions } from './options-screen.js';
import { openPartyMenu } from './party-menu.js';
import { openTrainerCard } from './trainer-card.js';
import { runSaveMenu } from './save-menu.js';

export const BESTIARY_FLAG = 'has_bestiary';
/** Wide enough for a player name of NAME_MAX_LENGTH letters (checked by tools/check-text-fit.js). */
export const START_MENU_BOX = { x: 56, y: 0, width: 104 };

export function startMenuEntries(state) {
  const entries = [];
  if (hasFlag(state, BESTIARY_FLAG)) entries.push({ id: 'bestiary', label: 'BESTIAIRE' });
  if (state.party.length > 0) entries.push({ id: 'party', label: 'BESTIOLES' });
  entries.push({ id: 'bag', label: 'SAC' }, { id: 'card', label: state.player.name.toUpperCase() });
  entries.push({ id: 'save', label: 'SAUVER' }, { id: 'options', label: 'OPTIONS' }, { id: 'close', label: 'FERMER' });
  return entries;
}

/**
 * field: { save(), canSave(), fly(), canFly(), escape(), canEscape() }.
 * Resolves with a map action to run after the menu closed (fly, escape), or null.
 */
export function openStartMenu(manager, state, field) {
  let index = 0;
  return withMenuLayer(manager, async (layer) => {
    for (;;) {
      const entries = startMenuEntries(state);
      const menu = new ListMenu(entries.map((entry) => ({ label: entry.label })), { ...START_MENU_BOX, rows: entries.length, rowHeight: 14, index });
      const choice = await layer.open(menu);
      if (choice === null) return null;
      index = choice;
      const { id } = entries[choice];
      if (id === 'close') return null;
      if (id === 'bestiary') await openBestiary(manager, state);
      else if (id === 'card') await openTrainerCard(manager, state);
      else if (id === 'options') await openOptions(manager);
      else if (id === 'save') await runSaveMenu(manager, layer, state, field);
      else {
        const result = id === 'party' ? await openPartyMenu(manager, state, field) : await openBag(manager, state, field);
        if (result?.action) return result.action;
      }
    }
  });
}
