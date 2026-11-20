// Activation keys of the web version, bound to one device (pure, Web Crypto).
// The game creates a random device id; the organizer signs it with a private key that never
// leaves their computer (`npm run key`, tools/access-key.js). The game only holds the public
// key: it can check a key, nobody can forge one. Signature: ECDSA P-256 / SHA-256, 64 bytes,
// written in base64url (86 characters, meant to be pasted).
import { ACCESS_PUBLIC_KEY } from '../data/access-public-key.js';
import { REVOKED_DEVICES } from '../data/revoked-devices.js';

const DEVICE_ID_ALPHABET = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'; // no 0/O or 1/I confusion
const DEVICE_ID_LENGTH = 8;
const SIGNATURE_BYTES = 64;
const ALGORITHM = { name: 'ECDSA', namedCurve: 'P-256' };

export const normalizeDeviceId = (id) => String(id).toUpperCase().replace(/[^A-Z0-9]/g, '');

/** "K7QM2XRA" → "K7QM-2XRA" (how the id is shown and typed). */
export const formatDeviceId = (id) => normalizeDeviceId(id).replace(/(.{4})(?=.)/g, '$1-');

/** Text signed for a device; the tool and the game must build it the same way. */
export const signedMessage = (deviceId) => `bestiora-azur:device:${normalizeDeviceId(deviceId)}`;

/** Pasted keys may carry spaces or line breaks. */
export const normalizeKey = (key) => String(key).replace(/[^A-Za-z0-9_-]/g, '');

/** New random device id. `randomValues` fills a Uint8Array (crypto.getRandomValues). */
export function createDeviceId(randomValues = (array) => globalThis.crypto.getRandomValues(array)) {
  const bytes = randomValues(new Uint8Array(DEVICE_ID_LENGTH));
  return Array.from(bytes, (byte) => DEVICE_ID_ALPHABET[byte % DEVICE_ID_ALPHABET.length]).join('');
}

function base64UrlToBytes(text) {
  try {
    const binary = atob(text.replace(/-/g, '+').replace(/_/g, '/'));
    return Uint8Array.from(binary, (character) => character.charCodeAt(0));
  } catch {
    return null;
  }
}

/** True when `key` is the organizer's signature of this device id, and the device is not revoked. */
export async function isValidDeviceKey(deviceId, key, {
  publicKey = ACCESS_PUBLIC_KEY, revoked = REVOKED_DEVICES, subtle = globalThis.crypto?.subtle,
} = {}) {
  if (!publicKey || !subtle || revoked.includes(normalizeDeviceId(deviceId))) return false;
  const signature = base64UrlToBytes(normalizeKey(key));
  if (signature?.length !== SIGNATURE_BYTES) return false;
  try {
    const verifier = await subtle.importKey('jwk', publicKey, ALGORITHM, false, ['verify']);
    const message = new TextEncoder().encode(signedMessage(deviceId));
    return await subtle.verify({ name: 'ECDSA', hash: 'SHA-256' }, verifier, signature, message);
  } catch {
    return false;
  }
}
