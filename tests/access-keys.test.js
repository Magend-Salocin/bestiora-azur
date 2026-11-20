import { test } from 'node:test';
import assert from 'node:assert/strict';
import crypto from 'node:crypto';
import {
  createDeviceId, formatDeviceId, isValidDeviceKey, normalizeDeviceId,
} from '../src/access/access-keys.js';
import { publicJwk, signDevice } from '../tools/access-key.js';

const privateKey = crypto.generateKeyPairSync('ec', { namedCurve: 'prime256v1' }).privateKey.export({ format: 'pem', type: 'pkcs8' });
const publicKey = publicJwk(privateKey);
const check = (device, key, revoked = []) => isValidDeviceKey(device, key, { publicKey, revoked });

test('device ids: 8 unambiguous characters, shown in two groups', () => {
  const id = createDeviceId();
  assert.match(id, /^[A-HJ-NP-Z2-9]{8}$/);
  assert.equal(formatDeviceId('k7qm2xra'), 'K7QM-2XRA');
  assert.equal(normalizeDeviceId(' k7qm-2xra '), 'K7QM2XRA');
});

test('device keys: valid only for the signed device', async () => {
  const key = signDevice(privateKey, 'K7QM2XRA');
  assert.equal(key.length, 86);
  assert.ok(await check('K7QM-2XRA', key));
  assert.ok(await check('k7qm2xra', `${key.slice(0, 40)}\n ${key.slice(40)}`), 'pasted with spaces');
  assert.ok(!(await check('K7QM2XRB', key)), 'another device');
  assert.ok(!(await check('K7QM2XRA', key.replace(/^./, (c) => (c === 'A' ? 'B' : 'A')))), 'altered key');
  assert.ok(!(await check('K7QM2XRA', 'PBQQ-FAK3-YY6Z')), 'old short key');
  assert.ok(!(await check('K7QM2XRA', key, ['K7QM2XRA'])), 'revoked device');
});

test('device keys: a key signed by someone else is refused', async () => {
  const other = crypto.generateKeyPairSync('ec', { namedCurve: 'prime256v1' }).privateKey.export({ format: 'pem', type: 'pkcs8' });
  assert.ok(!(await check('K7QM2XRA', signDevice(other, 'K7QM2XRA'))));
  assert.ok(!(await isValidDeviceKey('K7QM2XRA', signDevice(privateKey, 'K7QM2XRA'), { publicKey: null })), 'no public key');
});
