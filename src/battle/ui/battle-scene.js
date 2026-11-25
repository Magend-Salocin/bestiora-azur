// Battle scene: intro, action menus, event playback, outro, and the write-back to the game state.
// Input: { kind, enemyParty, trainer?, music?, canRun, onLose, state, rng }.
// `promise` resolves with { result: 'win' | 'lose' | 'run' | 'caught', caughtCreature?, evolutions }.
import { MOVES_BY_ID } from '../../data/moves.js';
import { ITEMS_BY_ID } from '../../data/items.js';
import { CREATURES_BY_ID } from '../../data/creatures.js';
import { expForLevel } from '../../data/formulas.js';
import { BATTLE_TEXTS } from '../../data/texts/battle-fr.js';
import { getText } from '../../data/texts/index.js';
import { drawSprite } from '../../gfx/draw.js';
import { drawText } from '../../gfx/font.js';
import { hooks } from '../../overworld/hooks.js';
import {
  PARTY_SIZE, addCreature, addMoney, markSeen, removeItem,
} from '../../state/game-state.js';
import { TEXT_SPEEDS, getTextSpeed } from '../../ui/dialog-box.js';
import { creatureName, creatureVars } from '../../ui/creature-widgets.js';
import { askBattle } from '../../ui/learn-move.js';
import { moveCursor } from '../../ui/menu-cursor.js';
import { chooseMoveSlot } from '../../ui/move-list-screen.js';
import { enterName } from '../../ui/name-entry.js';
import { choosePartyMember } from '../../ui/party-screen.js';
import { applyVariables, layoutText } from '../../ui/text-layout.js';
import { getOptions } from '../../state/options.js';
import { BATTLE_MUSIC, VICTORY_MUSIC, WILD_BATTLE_MUSIC } from '../../data/music.js';
import { TRAINER_CLASSES_BY_ID } from '../../data/trainer-classes.js';
import { chooseAction } from '../logic/ai.js';
import {
  battleStartEvents, chooseSwitch, createBattle, currentPending, freeSwitch, getAvailableActions, resolveTurn,
} from '../logic/engine.js';
import { itemProblem } from '../logic/items.js';
import { openBattleBag } from './bag-screen.js';
import {
  LAYOUT, battleUiStyle, createShownCreature, drawBattleWindow, renderBattle, spriteCenter,
} from './battle-hud.js';
import {
  MAIN_MENU, drawActionMenu, drawMoveList, menuColumns,
} from './battle-menu.js';
import { CursorGlide } from './battle-motion.js';
import { EventPlayer } from './event-player.js';

const TEXT_SPEED_FACTOR = 1.5;
const AUTO_ADVANCE = 0.6;
const STAT_ROWS = [['hp', 'PV'], ['atk', 'ATT'], ['def', 'DÉF'], ['spa', 'A.SPÉ'], ['spd', 'D.SPÉ'], ['spe', 'VIT']];
// The move info window is 8 characters wide.
const MOVE_MENU_MESSAGE_LINES = { no_pp: ['Plus de', 'PP !'] };
const ITEM_PROBLEMS = { fainted: 'Elle est K.O. !', not_fainted: 'Elle va bien.', default: 'Aucun effet.' };
const STAT_TICK_TIME = 0.4;
const BLINK_SECONDS = 0.12;
const HUD_SLIDE_TIME = 0.25;
const HUD_SHAKE_TIME = 0.3;
const GLINT_TIME = 0.45;

/** Text box: types the pages, then waits for A (wait) or advances alone after a short pause. */
class MessageBox {
  constructor(text, wait) {
    this.pages = layoutText(text);
    this.wait = wait;
    this.page = 0;
    this.visible = 0;
    this.idle = 0;
    this.speed = TEXT_SPEEDS[getTextSpeed()] * TEXT_SPEED_FACTOR;
    this.promise = new Promise((resolve) => { this.resolve = resolve; });
  }

  get pageLength() {
    return this.pages[this.page].reduce((total, line) => total + Array.from(line).length, 0);
  }

  update(dt, input) {
    const pressed = input.justPressed('a') || input.justPressed('b');
    if (this.visible < this.pageLength) {
      this.visible = pressed ? this.pageLength : Math.min(this.pageLength, this.visible + this.speed * dt);
      return;
    }
    this.idle += dt;
    const last = this.page === this.pages.length - 1;
    if (pressed || (!this.wait && last && this.idle >= AUTO_ADVANCE)) {
      if (last) this.resolve();
      else {
        this.page += 1;
        this.visible = 0;
        this.idle = 0;
      }
    }
  }

  render(ctx) {
    const { x, y, width, height } = LAYOUT.textBox;
    drawBattleWindow(ctx, x, y, width, height);
    let remaining = Math.floor(this.visible);
    this.pages[this.page].forEach((line, index) => {
      drawText(ctx, line, 8, 108 + index * 16, undefined, remaining);
      remaining = Math.max(0, remaining - Array.from(line).length);
    });
    const typed = this.visible >= this.pageLength;
    // The arrow bobs by one pixel while it waits for A.
    if (typed && (this.wait || this.page < this.pages.length - 1)) drawText(ctx, '▼', 152, 124 + (Math.floor(this.idle * 4) % 2));
  }
}

class MainMenu {
  constructor(index, shown) {
    this.index = index;
    this.shown = shown;
    this.time = 0;
    this.glide = new CursorGlide(index);
    this.promise = new Promise((resolve) => { this.resolve = resolve; });
  }

  update(dt, input) {
    this.time += dt;
    this.index = moveCursor(this.index, MAIN_MENU.length, input, { columns: menuColumns(battleUiStyle()) });
    this.glide.update(dt, this.index);
    if (input.justPressed('a')) this.resolve(MAIN_MENU[this.index].id);
  }

  render(ctx) {
    drawActionMenu(ctx, battleUiStyle(), this.shown, { time: this.time, glide: this.glide });
  }
}

class MoveMenu {
  constructor(creature, index) {
    this.creature = creature;
    this.index = Math.min(index, creature.moves.length - 1);
    this.message = null;
    this.time = 0;
    this.glide = new CursorGlide(this.index);
    this.promise = new Promise((resolve) => { this.resolve = resolve; });
  }

  update(dt, input) {
    this.time += dt;
    const previous = this.index;
    this.index = moveCursor(this.index, this.creature.moves.length, input);
    this.glide.update(dt, this.index);
    if (previous !== this.index) this.message = null;
    if (input.justPressed('a')) {
      if (this.creature.moves[this.index].pp > 0) this.resolve(this.index);
      else this.message = 'no_pp';
    } else if (input.justPressed('b')) {
      this.resolve(null);
    }
  }

  render(ctx) {
    const names = this.creature.moves.map((slot) => MOVES_BY_ID[slot.id].name);
    drawMoveList(ctx, battleUiStyle(), names, { time: this.time, glide: this.glide });
    const slot = this.creature.moves[this.index];
    drawBattleWindow(ctx, 80, 56, 80, 40);
    if (this.message) {
      MOVE_MENU_MESSAGE_LINES[this.message].forEach((line, index) => drawText(ctx, line, 88, 64 + index * 12));
      return;
    }
    drawSprite(ctx, 'ui', `type/${MOVES_BY_ID[slot.id].type}`, 88, 64);
    drawText(ctx, `PP ${slot.pp}/${slot.maxPp}`, 88, 76);
  }
}

/** Window with the six stats: first the gains, then (after A) the new values counting up. */
class StatGainsWindow {
  constructor(previous, next) {
    this.previous = previous;
    this.next = next;
    this.showValues = false;
    this.tick = 0;
    this.promise = new Promise((resolve) => { this.resolve = resolve; });
  }

  update(dt, input) {
    if (this.showValues) this.tick = Math.min(1, this.tick + dt / STAT_TICK_TIME);
    if (!input.justPressed('a') && !input.justPressed('b')) return;
    if (!this.showValues) this.showValues = true;
    else if (this.tick < 1) this.tick = 1;
    else this.resolve();
  }

  statValue(key) {
    const from = this.previous[key];
    return Math.round(from + (this.next[key] - from) * this.tick);
  }

  render(ctx) {
    drawBattleWindow(ctx, 72, 0, 88, 96);
    STAT_ROWS.forEach(([key, label], index) => {
      const y = 10 + index * 13;
      drawText(ctx, label, 80, y);
      const value = this.showValues ? String(this.statValue(key)) : `+${this.next[key] - this.previous[key]}`;
      drawText(ctx, value.padStart(4, ' '), 120, y);
    });
  }
}

export class BattleScene {
  transparent = false;
  blocksInput = true;

  constructor({ kind, enemyParty, trainer = null, music = null, canRun = true, onLose = 'blackout', state, rng }) {
    this.gameState = state;
    this.rng = rng;
    this.trainer = trainer;
    this.canRun = canRun;
    this.onLose = onLose;
    this.music = music ?? trainer?.music ?? (kind === 'wild' ? WILD_BATTLE_MUSIC : BATTLE_MUSIC[TRAINER_CLASSES_BY_ID[trainer?.class]?.musicIntro] ?? BATTLE_MUSIC.trainer);
    this.battle = createBattle({
      kind,
      playerParty: state.party,
      enemyParty,
      trainer: trainer && { id: trainer.id, class: trainer.class, name: trainer.name, moneyBase: trainer.moneyBase, ai: trainer.ai },
    });
    this.player = new EventPlayer(this);
    this.shown = [createShownCreature(), createShownCreature()];
    this.view = {
      shown: this.shown,
      portraits: {
        player: { visible: false, frame: state.player.gender === 'girl' ? 'back/joueuse' : 'back/joueur', dx: 0 },
        trainer: { visible: false, frame: trainer?.portrait ?? null, dx: 0 },
      },
      capsule: null,
      effect: null,
      dust: null,
      indicators: [],
      shake: 0,
      hidePlayerHud: false,
      time: 0,
      idle: false,
    };
    this.tweens = [];
    this.widget = null;
    this.evolutions = [];
    this.moneyGained = 0;
    this.introDone = false;
    this.menuIndex = 0;
    this.moveIndex = 0;
    this.expTrackers = state.party.map((creature) => ({ exp: creature.exp, level: creature.level }));
    this.promise = new Promise((resolve) => { this.resolvePromise = resolve; });
  }

  get playerName() {
    return this.gameState.player.name;
  }

  get trainerTitle() {
    return `${this.trainer?.className ?? ''} ${this.trainer?.name ?? ''}`.trim();
  }

  enter(manager) {
    this.manager = manager;
    hooks.playMusic(this.music);
    this.run().catch((error) => {
      console.error(error);
      this.resolvePromise({ result: 'win', evolutions: [] });
    });
  }

  // ---- Primitives used by the event player -------------------------------------

  tween(duration, onUpdate) {
    return new Promise((resolve) => {
      this.tweens.push({ duration: Math.max(0.0001, duration), elapsed: 0, onUpdate, resolve });
    });
  }

  wait(seconds) {
    return this.tween(seconds, () => {});
  }

  /** Shows a text widget. wait: true = needs A at the end; false = advances alone. */
  say(key, variables = {}, { wait = true } = {}) {
    const template = BATTLE_TEXTS[key] ?? getText(key);
    const text = applyVariables(template, { PLAYER: this.playerName, RIVAL: this.gameState.rival?.name, ...variables });
    return this.runWidget(new MessageBox(text, wait));
  }

  runWidget(widget) {
    this.widget = widget;
    return widget.promise.finally(() => {
      if (this.widget === widget) this.widget = null;
    });
  }

  slide(side, from, to, duration) {
    const shown = this.shown[side];
    return this.tween(duration, (t) => { shown.dx = Math.round(from + (to - from) * t); });
  }

  /** Hit feedback: the sprite blinks, or shifts by 2 pixels with the reduced flashes option. */
  async blink(side, count) {
    const shown = this.shown[side];
    const phase = (t) => Math.floor(t * count * 2) % 2 === 0 && t < 1;
    if (getOptions().reduceFlashes) {
      const restX = shown.dx;
      await this.tween(count * BLINK_SECONDS, (t) => { shown.dx = restX + (phase(t) ? 2 : 0); });
      shown.dx = restX;
      return;
    }
    await this.tween(count * BLINK_SECONDS, (t) => { shown.blink = phase(t); });
    shown.blink = false;
  }

  /** The info box enters from the screen edge on its side (ease out). */
  revealHud(side) {
    const shown = this.shown[side];
    shown.hudVisible = true;
    shown.hudSlide = 1;
    return this.tween(HUD_SLIDE_TIME, (t) => { shown.hudSlide = (1 - t) ** 2; });
  }

  /** The info box jolts by one pixel while its creature takes a hit. */
  async shakeHud(side) {
    const shown = this.shown[side];
    await this.tween(HUD_SHAKE_TIME, (t) => { shown.hudShake = t < 1 ? (Math.floor(t * 12) % 2 === 0 ? 1 : -1) : 0; });
    shown.hudShake = 0;
  }

  /** Super effective hit: the sprite is squashed by a few pixels, then springs back. */
  async squash(side, duration) {
    const shown = this.shown[side];
    await this.tween(duration, (t) => { shown.squash = Math.round(3 * (1 - t)); });
    shown.squash = 0;
  }

  /** Level up: a light glint sweeps the player's XP bar (the HP bar in classique). */
  async sweepGlint() {
    const shown = this.shown[0];
    await this.tween(GLINT_TIME, (t) => { shown.glint = t; });
    shown.glint = null;
  }

  async shakeScreen(duration) {
    await this.tween(duration, (t) => { this.view.shake = t < 1 ? (Math.floor(t * 20) % 2 === 0 ? 2 : -2) : 0; });
    this.view.shake = 0;
  }

  async playAnimation(animation, from, to) {
    if (!getOptions().battleAnimations) return;
    this.view.effect = { animation, t: 0, from, to };
    await this.tween(animation.duration, (t) => { this.view.effect.t = t; });
    this.view.effect = null;
  }

  showCreature(side, event) {
    const creature = this.battle.sides[side].party[event.index];
    const shown = this.shown[side];
    Object.assign(shown, {
      visible: true, species: event.species, name: creatureName(creature), level: event.level,
      hp: event.hp, maxHp: event.maxHp, status: creature.status, clipBottom: 0, trailHp: 0,
    });
    this.revealHud(side);
    if (side === 0) shown.expRatio = this.expRatio(event.index, creature.species);
    else markSeen(this.gameState, event.species);
  }

  expTracker(index) {
    const creature = this.battle.sides[0].party[index];
    this.expTrackers[index] ??= { exp: creature.exp, level: creature.level };
    return this.expTrackers[index];
  }

  expRatio(index, species) {
    const { exp, level } = this.expTracker(index);
    const growth = CREATURES_BY_ID[species].growth;
    const low = expForLevel(growth, level);
    const high = expForLevel(growth, level + 1);
    return Math.max(0, Math.min(1, (exp - low) / Math.max(1, high - low)));
  }

  showStatGains(previous, next) {
    return this.runWidget(new StatGainsWindow(previous, next));
  }

  onItemConsumed(event) {
    if (event.side === 0) removeItem(this.gameState, event.item);
  }

  async throwCapsule(itemName) {
    await this.say('item_used', { ITEM: itemName }, { wait: false });
    const from = spriteCenter(0);
    const to = spriteCenter(1);
    this.view.capsule = { ...from };
    hooks.playSfx('capsule_throw');
    await this.tween(0.5, (t) => {
      this.view.capsule.x = from.x + (to.x - from.x) * t;
      this.view.capsule.y = from.y + (to.y - from.y) * t - Math.sin(t * Math.PI) * 24;
    });
    await this.blink(1, 2);
    this.shown[1].visible = false;
    await this.tween(0.2, (t) => { this.view.capsule.y = to.y + t * 16; });
  }

  /** Before a trainer's next creature: « Changer de bestiole ? » (free switch). */
  async offerSwitchBeforeEnemy(event) {
    if (!this.introDone || this.shown[1].visible || getOptions().battleStyle === 'set') return;
    const player = this.battle.sides[0].party[this.battle.sides[0].active];
    if (player.hp <= 0 || !getAvailableActions(this.battle, 0).canSwitch) return;
    const next = creatureName(this.battle.sides[1].party[event.index]);
    await this.say('trainer_will_send', { TRAINER: this.trainerTitle, CREATURE: next }, { wait: false });
    if (!(await askBattle(this.manager, 'ask_switch', {}, { frame: drawBattleWindow }))) return;
    const index = await this.choosePartyIndex(false);
    if (index === null) return;
    const result = freeSwitch(this.battle, index);
    this.battle = result.state;
    await this.player.play(result.events);
  }

  // ---- Flow ------------------------------------------------------------------------

  async run() {
    await this.intro();
    this.introDone = true;
    while (!this.battle.outcome) {
      const action = await this.choosePlayerAction();
      const enemyAction = chooseAction(this.battle, 1, this.rng);
      const { state, events } = resolveTurn(this.battle, action, enemyAction, this.rng);
      this.battle = state;
      await this.player.play(events);
      await this.resolvePendingSwitch();
    }
    const outcome = await this.outro();
    this.writeBack();
    this.resolvePromise(outcome);
  }

  async intro() {
    const { portraits } = this.view;
    const [enemyEvent, playerEvent] = battleStartEvents(this.battle);
    portraits.player.visible = true;
    portraits.player.dx = 120;
    if (this.battle.kind === 'trainer') {
      portraits.trainer.visible = true;
      portraits.trainer.dx = -120;
      await this.tween(0.8, (t) => {
        portraits.player.dx = Math.round(120 * (1 - t));
        portraits.trainer.dx = Math.round(-120 * (1 - t));
      });
      this.view.indicators = [0, 1].map((side) => ({ side, states: this.partyStates(side) }));
      await this.say('trainer_wants_battle', { TRAINER: this.trainerTitle });
      this.view.indicators = [];
      await this.tween(0.3, (t) => { portraits.trainer.dx = Math.round(t * 80); });
      portraits.trainer.visible = false;
      await this.player.play([enemyEvent]);
    } else {
      this.showCreature(1, enemyEvent);
      this.shown[1].hudVisible = false;
      this.shown[1].dx = -120;
      await this.tween(0.8, (t) => {
        portraits.player.dx = Math.round(120 * (1 - t));
        this.shown[1].dx = Math.round(-120 * (1 - t));
      });
      hooks.playSfx(`cry_${enemyEvent.species}`);
      this.revealHud(1);
      await this.say('wild_appears', creatureVars(this.battle.sides[1].party[0]));
    }
    await this.tween(0.3, (t) => { portraits.player.dx = Math.round(-t * 80); });
    portraits.player.visible = false;
    await this.player.play([playerEvent]);
  }

  partyStates(side) {
    return this.battle.sides[side].party.map((creature) => (creature.hp > 0 ? 'full' : 'ko'));
  }

  async resolvePendingSwitch() {
    if (currentPending(this.battle)?.type !== 'need_switch') return;
    const index = await this.choosePartyIndex(true);
    const result = chooseSwitch(this.battle, index);
    this.battle = result.state;
    await this.player.play(result.events);
  }

  choosePartyIndex(forced) {
    const { party, active } = this.battle.sides[0];
    return choosePartyMember(this.manager, party, {
      forced,
      canSelect: (creature, index) => {
        if (creature.hp <= 0) return ITEM_PROBLEMS.fainted;
        if (index === active) return 'Déjà au combat !';
        return null;
      },
    });
  }

  async choosePlayerAction() {
    const available = getAvailableActions(this.battle, 0);
    if (available.forced) {
      if (available.forced.type === 'struggle') await this.say('struggle', { CREATURE: this.shown[0].name }, { wait: false });
      return available.forced;
    }
    for (;;) {
      const menu = new MainMenu(this.menuIndex, this.shown[0]);
      this.view.idle = true;
      const choice = await this.runWidget(menu);
      this.view.idle = false;
      this.menuIndex = menu.index;
      const action = await this.handleMenuChoice(choice, available);
      if (action) return action;
    }
  }

  async handleMenuChoice(choice, available) {
    const active = this.battle.sides[0].party[this.battle.sides[0].active];
    if (choice === 'fight') {
      this.view.hidePlayerHud = true;
      this.view.idle = true;
      const menu = new MoveMenu(active, this.moveIndex);
      const index = await this.runWidget(menu);
      this.view.hidePlayerHud = false;
      this.view.idle = false;
      this.moveIndex = menu.index;
      return index === null ? null : { type: 'move', index };
    }
    if (choice === 'party') {
      if (!available.canSwitch) {
        await this.say('run_blocked_trapped');
        return null;
      }
      const index = await this.choosePartyIndex(false);
      return index === null ? null : { type: 'switch', index };
    }
    if (choice === 'bag') return this.chooseItemAction();
    if (this.battle.kind === 'trainer') {
      await this.say('run_blocked_trainer');
      return null;
    }
    if (!this.canRun) {
      await this.say('run_fail');
      return null;
    }
    return { type: 'run' };
  }

  async chooseItemAction() {
    const itemId = await openBattleBag(this.manager, this.gameState.bag);
    if (!itemId) return null;
    const item = ITEMS_BY_ID[itemId];
    if (item.use.effect === 'catch') return { type: 'item', itemId };
    const party = this.battle.sides[0].party;
    const target = await choosePartyMember(this.manager, party, {
      message: 'Sur qui ?',
      canSelect: (creature) => {
        const problem = item.use.effect === 'restore_pp' ? null : itemProblem(item, creature);
        return problem ? (ITEM_PROBLEMS[problem] ?? ITEM_PROBLEMS.default) : null;
      },
    });
    if (target === null) return null;
    let moveIndex;
    if (item.use.effect === 'restore_pp' && !item.use.params.allMoves) {
      moveIndex = await chooseMoveSlot(this.manager, party[target]);
      if (moveIndex === null) return null;
    }
    return { type: 'item', itemId, target, moveIndex };
  }

  async outro() {
    const outcome = this.battle.outcome;
    if (outcome === 'win' || outcome === 'caught') hooks.playMusic(VICTORY_MUSIC[this.battle.kind]);
    if (outcome === 'win' && this.battle.kind === 'trainer') {
      const portrait = this.view.portraits.trainer;
      portrait.visible = true;
      portrait.dx = 80;
      await this.tween(0.4, (t) => { portrait.dx = Math.round(80 * (1 - t)); });
      await this.say('trainer_defeated', { TRAINER: this.trainerTitle });
      if (this.trainer.defeat) await this.say(this.trainer.defeat);
      if (this.moneyGained > 0) {
        addMoney(this.gameState, this.moneyGained);
        await this.say('money_gain', { NUMBER: this.moneyGained });
      }
      return { result: 'win' };
    }
    if (outcome === 'lose') {
      await this.say('blackout');
      if (this.onLose === 'blackout') {
        const lost = Math.floor(this.gameState.money / 2);
        addMoney(this.gameState, -lost);
        if (lost > 0) await this.say('blackout_money', { NUMBER: lost });
      }
      return { result: 'lose' };
    }
    if (outcome === 'caught') return this.afterCapture();
    if (outcome === 'fled') return { result: 'run' };
    return { result: 'win' };
  }

  async afterCapture() {
    const caught = structuredClone(this.battle.sides[1].party[this.battle.sides[1].active]);
    caught.originalTrainer = this.playerName;
    const name = CREATURES_BY_ID[caught.species].name;
    if (await askBattle(this.manager, 'ask_nickname', { CREATURE: name }, { frame: drawBattleWindow })) {
      const nickname = await enterName(this.manager, { title: `Surnom de ${name} ?`, defaultName: name });
      if (nickname !== name) caught.nickname = nickname;
    }
    this.caught = caught;
    if (this.battle.sides[0].party.length >= PARTY_SIZE) await this.say('sent_to_storage', creatureVars(caught));
    return { result: 'caught', caughtCreature: caught };
  }

  /** PV, PP, statuts, XP and levels go back to the game state; the caught creature joins it. */
  writeBack() {
    this.gameState.party = this.battle.sides[0].party;
    if (this.caught) {
      const where = addCreature(this.gameState, this.caught);
      this.storedCaught = where === 'storage';
    }
  }

  // ---- Scene loop -----------------------------------------------------------------------

  update(dt, input) {
    this.view.time += dt;
    for (const tween of [...this.tweens]) {
      tween.elapsed += dt;
      const t = Math.min(1, tween.elapsed / tween.duration);
      tween.onUpdate(t);
      if (t >= 1) {
        this.tweens.splice(this.tweens.indexOf(tween), 1);
        tween.resolve();
      }
    }
    this.widget?.update(dt, input);
  }

  render(ctx) {
    renderBattle(ctx, this.view);
    drawBattleWindow(ctx, 0, 96, 160, 48);
    this.widget?.render(ctx);
  }
}
