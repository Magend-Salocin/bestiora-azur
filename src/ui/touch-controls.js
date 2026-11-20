// On-screen controls for touch screens (iPhone, tablets): a d-pad you can slide over, A, B,
// START and SELECT. They feed the input like keys (input.setVirtualButton). The TACTILE option
// shows them always, never, or on touch screens only (AUTO). DOM only: drawn outside the canvas.

const DPAD_DEAD_ZONE = 0.25; // fraction of the d-pad radius where no direction is pressed
const BUTTONS = [
  { id: 'b', label: 'B', className: 'touch-button touch-b' },
  { id: 'a', label: 'A', className: 'touch-button touch-a' },
  { id: 'select', label: 'SELECT', className: 'touch-pill touch-select' },
  { id: 'start', label: 'START', className: 'touch-pill touch-start' },
];
const DIRECTIONS = ['up', 'down', 'left', 'right'];

let mode = 'auto';
let installed = false;

const isTouchScreen = () => window.matchMedia?.('(pointer: coarse)').matches ?? false;

function applyMode() {
  const visible = mode === 'on' || (mode === 'auto' && isTouchScreen());
  document.body.classList.toggle('touch', visible);
}

/** 'auto' | 'on' | 'off' (option TACTILE). */
export function setTouchControlsMode(next) {
  mode = next;
  if (installed) applyMode();
}

function element(tag, className, text) {
  const node = document.createElement(tag);
  node.className = className;
  if (text) node.textContent = text;
  return node;
}

/** Direction under the finger, from the d-pad center; null in the dead zone. */
function dpadDirection(pad, event) {
  const box = pad.getBoundingClientRect();
  const dx = (event.clientX - box.left) / box.width - 0.5;
  const dy = (event.clientY - box.top) / box.height - 0.5;
  if (Math.hypot(dx, dy) < DPAD_DEAD_ZONE / 2) return null;
  if (Math.abs(dx) > Math.abs(dy)) return dx < 0 ? 'left' : 'right';
  return dy < 0 ? 'up' : 'down';
}

function bindDpad(pad, input) {
  let current = null;
  const set = (direction) => {
    if (direction === current) return;
    if (current) input.setVirtualButton(current, false);
    if (direction) input.setVirtualButton(direction, true);
    current = direction;
    pad.dataset.direction = direction ?? '';
  };
  pad.addEventListener('pointerdown', (event) => {
    event.preventDefault();
    pad.setPointerCapture(event.pointerId);
    set(dpadDirection(pad, event));
  });
  pad.addEventListener('pointermove', (event) => {
    if (pad.hasPointerCapture(event.pointerId)) set(dpadDirection(pad, event));
  });
  for (const type of ['pointerup', 'pointercancel', 'lostpointercapture']) pad.addEventListener(type, () => set(null));
}

function bindButton(node, button, input) {
  const release = () => {
    node.classList.remove('pressed');
    input.setVirtualButton(button, false);
  };
  node.addEventListener('pointerdown', (event) => {
    event.preventDefault();
    node.setPointerCapture(event.pointerId);
    node.classList.add('pressed');
    input.setVirtualButton(button, true);
  });
  for (const type of ['pointerup', 'pointercancel', 'lostpointercapture']) node.addEventListener(type, release);
}

/** Builds the controls once; call setTouchControlsMode to show or hide them. */
export function installTouchControls(input) {
  if (installed) return;
  installed = true;
  const root = element('div', 'touch-controls');
  const pad = element('div', 'touch-dpad');
  for (const direction of DIRECTIONS) pad.append(element('span', `touch-arrow touch-${direction}`));
  bindDpad(pad, input);
  root.append(pad);
  for (const { id, label, className } of BUTTONS) {
    const node = element('div', className, label);
    bindButton(node, id, input);
    root.append(node);
  }
  // No zoom, scroll, selection or callout menu while playing.
  root.addEventListener('contextmenu', (event) => event.preventDefault());
  document.body.append(root);
  window.matchMedia?.('(pointer: coarse)').addEventListener?.('change', applyMode);
  applyMode();
}
