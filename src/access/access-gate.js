// « Test en cours » screen of the web version: asks for an activation key before the game starts.
// The key is remembered on the device and checked again at each launch, so a revoked key stops
// working after the next update of the site. HTML (not the canvas) so the phone keyboard opens.
import { isValidKey, normalizeKey } from './access-keys.js';

const STORAGE_KEY = 'bestiora-access-key';

function readStoredKey() {
  try {
    return localStorage.getItem(STORAGE_KEY);
  } catch {
    return null;
  }
}

function storeKey(key) {
  try {
    if (key === null) localStorage.removeItem(STORAGE_KEY);
    else localStorage.setItem(STORAGE_KEY, normalizeKey(key));
  } catch {
    // Private browsing: the key will be asked again next time.
  }
}

function element(tag, className, text) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text) node.textContent = text;
  return node;
}

function showGate(revoked) {
  return new Promise((resolve) => {
    const gate = element('form', 'access-gate');
    const input = element('input', 'access-input');
    Object.assign(input, { type: 'text', placeholder: 'XXXX-XXXX-XXXX', autocomplete: 'off', spellcheck: false });
    input.setAttribute('autocapitalize', 'characters');
    input.setAttribute('autocorrect', 'off');
    input.setAttribute('aria-label', 'Clé d’activation');
    const error = element('p', 'access-error', revoked ? 'Cette clé n’est plus valide.' : '');
    gate.append(
      element('h1', 'access-title', 'Bestiora Azur'),
      element('p', 'access-status', 'Test en cours'),
      element('p', 'access-text', 'Le jeu est en test privé. Entrez votre clé d’activation pour jouer.'),
      input,
      element('button', 'access-button', 'Valider'),
      error,
      element('p', 'access-notice', 'Projet personnel et non commercial, réalisé à des fins de découverte.'),
    );
    gate.addEventListener('submit', (event) => {
      event.preventDefault();
      if (!isValidKey(input.value)) {
        error.textContent = 'Clé invalide.';
        input.select();
        return;
      }
      storeKey(input.value);
      gate.remove();
      resolve();
    });
    document.body.append(gate);
    input.focus();
  });
}

/** Resolves once a valid key is entered or already stored on this device. */
export async function requireAccessKey() {
  const stored = readStoredKey();
  if (stored && isValidKey(stored)) return;
  if (stored) storeKey(null);
  await showGate(Boolean(stored));
}
