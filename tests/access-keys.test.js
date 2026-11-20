import { test } from 'node:test';
import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { sha256 } from '../src/access/sha256.js';
import { hashKey, isValidKey, normalizeKey } from '../src/access/access-keys.js';
import { generateKey } from '../tools/access-key.js';

test('sha256 matches node:crypto', () => {
  for (const text of ['', 'abc', 'bestiora-azur:ABCD', 'é'.repeat(100), 'x'.repeat(64)]) {
    assert.equal(sha256(text), createHash('sha256').update(text).digest('hex'));
  }
});

test('access keys: format, normalization and check', () => {
  const key = generateKey();
  assert.match(key, /^[A-Z2-9]{4}-[A-Z2-9]{4}-[A-Z2-9]{4}$/);
  assert.equal(normalizeKey(' abcd-efgh ijkl '), 'ABCDEFGHIJKL');
  const hashes = [{ id: 'x', hash: hashKey(key) }];
  assert.ok(isValidKey(key.toLowerCase().replaceAll('-', ' '), hashes));
  assert.ok(!isValidKey('AAAA-AAAA-AAAA', hashes));
  assert.ok(!isValidKey('', hashes));
});
