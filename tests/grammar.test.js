import assert from 'node:assert/strict';
import test from 'node:test';

import { genderOfName, longestAgreement } from '../src/data/grammar.js';
import { BATTLE_TEXTS } from '../src/data/texts/battle-fr.js';
import { applyVariables } from '../src/ui/text-layout.js';

test('agreement markers follow the species name in the variable', () => {
  const text = '{CREATURE:Un|Une} {CREATURE} sauvage apparaît !';
  assert.equal(applyVariables(text, { CREATURE: 'Korrigan' }), 'Un Korrigan sauvage apparaît !');
  assert.equal(applyVariables(text, { CREATURE: 'Tarasque' }), 'Une Tarasque sauvage apparaît !');
});

test('battle suffixes keep the species gender', () => {
  assert.equal(genderOfName('Tarasque ennemie'), 'f');
  assert.equal(genderOfName('Tarasque sauvage'), 'f');
  assert.equal(genderOfName('Korrigan ennemi'), 'm');
  assert.equal(genderOfName('Inconnu'), 'm');
});

test('a nickname keeps the gender given by the context', () => {
  const text = '{CREATURE} est brûlé{CREATURE:|e} !';
  assert.equal(applyVariables(text, { CREATURE: 'Pétale', CREATURE_GENDER: 'f' }), 'Pétale est brûlée !');
  assert.equal(applyVariables(text, { CREATURE: 'Pétale' }), 'Pétale est brûlé !');
});

test('each marker agrees with its own variable', () => {
  const text = 'Contre {TARGET:mon|ma} {TARGET}, {CREATURE:un|une} {CREATURE}.';
  assert.equal(applyVariables(text, { CREATURE: 'Korrigan', TARGET: 'Tarasque' }), 'Contre ma Tarasque, un Korrigan.');
});

test('layout checks measure the longest form', () => {
  assert.equal(longestAgreement('{CREATURE:Il|Elle} dort'), 'Elle dort');
  assert.equal(longestAgreement('gelé{CREATURE:|e}'), 'gelée');
});

test('battle texts use agreement markers where a past participle follows the creature', () => {
  assert.match(BATTLE_TEXTS.wild_appears, /\{CREATURE:Un\|Une\}/);
  assert.match(BATTLE_TEXTS.status_brl, /brûlé\{CREATURE:\|e\}/);
});
