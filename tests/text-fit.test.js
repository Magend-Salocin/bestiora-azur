import { test } from 'node:test';
import assert from 'node:assert/strict';
import { TEXT_AREAS, checkTextFit, worstCaseVariables } from '../tools/check-text-fit.js';
import { loadGameData } from '../tools/validators/game-data.js';

const data = loadGameData();

test('text fit: the game data passes', () => {
  assert.deepEqual(checkTextFit(data), []);
});

test('text fit: variables take their longest value', () => {
  const variables = worstCaseVariables(data);
  assert.equal(variables.PLAYER.length, 10);
  assert.ok(variables.ITEM.length >= 17);
  assert.equal(TEXT_AREAS.dialog, 144);
});

test('text fit: a word wider than the dialog box is reported', () => {
  const texts = { ...data.texts, too_long: 'Bonjour {PLAYER}, voici {ITEM} !', way_too_long: 'Anticonstitutionnellement.' };
  const errors = checkTextFit({ ...data, texts });
  assert.ok(errors.some((error) => error.startsWith('texte way_too_long')));
  assert.ok(!errors.some((error) => error.startsWith('texte too_long')), 'item names wrap at their spaces');
});
