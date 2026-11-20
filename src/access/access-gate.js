// « Test en cours » screen of the web version. Shows the device id to send to the organizer and
// asks for the key they send back (bound to this device, see access-keys.js). The key is
// remembered and checked again at each launch, so a revoked device is stopped after the next
// update of the site. HTML (not the canvas) so the phone keyboard and paste work.
// Not shown on plain HTTP (npm run web on the local network): browsers only give Web Crypto to
// secure pages, and that server is only meant for the organizer's own network.
import { createDeviceId, formatDeviceId, isValidDeviceKey, normalizeKey } from './access-keys.js';

const DEVICE_STORAGE_KEY = 'bestiora-device-id';
const KEY_STORAGE_KEY = 'bestiora-access-key';

function read(name) {
  try {
    return localStorage.getItem(name);
  } catch {
    return null;
  }
}

function write(name, value) {
  try {
    if (value === null) localStorage.removeItem(name);
    else localStorage.setItem(name, value);
  } catch {
    // Private browsing: the id and the key will not be remembered.
  }
}

/** The device id of this browser, created on first use. */
function deviceId() {
  let id = read(DEVICE_STORAGE_KEY);
  if (!id) {
    id = createDeviceId();
    write(DEVICE_STORAGE_KEY, id);
  }
  return id;
}

function element(tag, className, text) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text) node.textContent = text;
  return node;
}

function showGate(id, revoked) {
  return new Promise((resolve) => {
    const gate = element('form', 'access-gate');
    const shownId = formatDeviceId(id);
    const copy = element('button', 'access-copy', 'Copier');
    copy.type = 'button';
    copy.addEventListener('click', () => {
      navigator.clipboard?.writeText(shownId).then(() => { copy.textContent = 'Copié'; }, () => {});
    });
    const input = element('input', 'access-input');
    Object.assign(input, { type: 'text', placeholder: 'Collez votre clé ici', autocomplete: 'off', spellcheck: false });
    input.setAttribute('autocapitalize', 'off');
    input.setAttribute('autocorrect', 'off');
    input.setAttribute('aria-label', 'Clé d’activation');
    const error = element('p', 'access-error', revoked ? 'Cette clé n’est plus valide.' : '');
    const idRow = element('div', 'access-device');
    idRow.append(element('span', 'access-device-id', shownId), copy);
    gate.append(
      element('h1', 'access-title', 'Bestiora Azur'),
      element('p', 'access-status', 'Test en cours'),
      element('p', 'access-text', '1. Envoyez cet identifiant à l’organisateur du test :'),
      idRow,
      element('p', 'access-text', '2. Collez la clé reçue :'),
      input,
      element('button', 'access-button', 'Valider'),
      error,
      element('p', 'access-notice', 'Projet personnel et non commercial, réalisé à des fins de découverte.'),
    );
    gate.addEventListener('submit', async (event) => {
      event.preventDefault();
      const key = normalizeKey(input.value);
      if (!(await isValidDeviceKey(id, key))) {
        error.textContent = 'Clé invalide pour cet appareil.';
        input.select();
        return;
      }
      write(KEY_STORAGE_KEY, key);
      gate.remove();
      resolve();
    });
    document.body.append(gate);
  });
}

/** Resolves once this device holds a valid key (or right away on plain HTTP). */
export async function requireAccessKey() {
  if (!window.isSecureContext || !globalThis.crypto?.subtle) return;
  const id = deviceId();
  const stored = read(KEY_STORAGE_KEY);
  if (stored && (await isValidDeviceKey(id, stored))) return;
  if (stored) write(KEY_STORAGE_KEY, null);
  await showGate(id, Boolean(stored));
}
