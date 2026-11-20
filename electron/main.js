const fs = require('node:fs');
const path = require('node:path');
const { app, BrowserWindow, Menu, ipcMain } = require('electron');
const { deleteSave, readSave, writeAtomic, writeSave } = require('./save-store.js');

// The packaged game never runs in dev mode: no DevTools, no F1 debug menu.
const isDev = process.argv.includes('--dev') && !app.isPackaged;
// Dev only: the process exits between writing save.json.tmp and renaming it (crash test).
const simulateSaveCrash = isDev && process.argv.includes('--simulate-save-crash');
// Dev only tasks (electron/dev-tasks.js), run in the game window before quitting:
// --capture=<directory> saves the README screenshots there, --perf prints frame time measures.
const captureArgument = process.argv.find((argument) => argument.startsWith('--capture='));
const captureDirectory = isDev && captureArgument ? path.resolve(captureArgument.slice('--capture='.length)) : null;
const measurePerf = isDev && process.argv.includes('--perf');
const devTask = captureDirectory || measurePerf;

const WINDOW_WIDTH = 640;
const WINDOW_HEIGHT = 576;
const SCREEN_WIDTH = 160;
const SCREEN_HEIGHT = 144;
const SCALES = [2, 3, 4, 5, 6];

const userData = () => app.getPath('userData');
const optionsPath = () => path.join(userData(), 'options.json');
const MAX_LOG_LENGTH = 20000;

/** Appends an error report to userData/logs/YYYY-MM-DD.log. */
function writeErrorLog(report) {
  try {
    const directory = path.join(userData(), 'logs');
    fs.mkdirSync(directory, { recursive: true });
    const now = new Date();
    const file = path.join(directory, `${now.toISOString().slice(0, 10)}.log`);
    fs.appendFileSync(file, `[${now.toISOString()}] ${String(report).slice(0, MAX_LOG_LENGTH)}\n\n`, 'utf8');
  } catch {
    // Logging must never crash the game.
  }
}

function createWindow() {
  const win = new BrowserWindow({
    width: WINDOW_WIDTH,
    height: WINDOW_HEIGHT,
    useContentSize: true,
    resizable: true,
    backgroundColor: '#000000',
    title: 'Bestiora Azur',
    show: false,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: true,
    },
  });

  win.once('ready-to-show', () => win.show());

  win.webContents.on('before-input-event', (event, input) => {
    if (input.type === 'keyDown' && input.key === 'F11') {
      event.preventDefault();
      win.setFullScreen(!win.isFullScreen());
    }
  });

  win.webContents.setWindowOpenHandler(() => ({ action: 'deny' }));
  win.webContents.on('will-navigate', (event) => event.preventDefault());

  // --newgame (with --dev): start on the title screen instead of the test map.
  const query = process.argv.includes('--newgame') || devTask ? { newgame: '1' } : {};
  if (devTask) {
    query.devtask = '1';
    win.webContents.setAudioMuted(true);
    win.webContents.once('did-finish-load', () => runDevTask(win));
  }
  win.loadFile(path.join(__dirname, '..', 'src', 'index.html'), { query });

  if (isDev && !devTask) {
    // Not activated: the game pauses when its window loses focus.
    win.webContents.openDevTools({ mode: 'detach', activate: false });
  }
}

async function runDevTask(win) {
  const { captureScreens, measurePerformance } = require('./dev-tasks.js');
  try {
    if (captureDirectory) await captureScreens(win, captureDirectory);
    else await measurePerformance(win);
    app.exit(0);
  } catch (error) {
    process.stderr.write(`${error.stack ?? error.message}\n`);
    app.exit(1);
  }
}

function registerIpc() {
  ipcMain.on('app:is-dev', (event) => {
    event.returnValue = isDev;
  });

  ipcMain.on('window:toggle-fullscreen', (event) => {
    const win = BrowserWindow.fromWebContents(event.sender);
    if (win) win.setFullScreen(!win.isFullScreen());
  });

  ipcMain.on('window:set-fullscreen', (event, enabled) => {
    const win = BrowserWindow.fromWebContents(event.sender);
    if (win && win.isFullScreen() !== enabled) win.setFullScreen(enabled);
  });

  ipcMain.on('window:set-scale', (event, scale) => {
    const win = BrowserWindow.fromWebContents(event.sender);
    if (!win || win.isFullScreen() || !SCALES.includes(scale)) return;
    win.setContentSize(SCREEN_WIDTH * scale, SCREEN_HEIGHT * scale);
  });

  // Options file, separate from the save. Written with a temporary file and a rename.
  ipcMain.handle('options:write', (event, json) => {
    try {
      JSON.parse(json);
      writeAtomic(optionsPath(), json);
      return { ok: true };
    } catch (error) {
      return { ok: false, error: error.message };
    }
  });
  ipcMain.handle('options:read', () => {
    try {
      return JSON.parse(fs.readFileSync(optionsPath(), 'utf8'));
    } catch {
      return null;
    }
  });

  ipcMain.handle('save:write', (event, json) => {
    try {
      const beforeRename = simulateSaveCrash ? () => process.kill(process.pid, 'SIGKILL') : undefined;
      writeSave(userData(), json, { beforeRename });
      return { ok: true };
    } catch (error) {
      writeErrorLog(`save:write ${error.stack ?? error.message}`);
      return { ok: false, error: error.message };
    }
  });
  // TOUT EFFACER on the title screen: save, backup, options, browser storage and cache. Logs are kept.
  ipcMain.handle('data:clear', async (event) => {
    try {
      deleteSave(userData());
      fs.rmSync(optionsPath(), { force: true });
      await event.sender.session.clearStorageData();
      await event.sender.session.clearCache();
      return { ok: true };
    } catch (error) {
      writeErrorLog(`data:clear ${error.stack ?? error.message}`);
      return { ok: false, error: error.message };
    }
  });

  ipcMain.handle('save:read', () => {
    try {
      return readSave(userData());
    } catch (error) {
      writeErrorLog(`save:read ${error.stack ?? error.message}`);
      return { main: null, backup: null };
    }
  });

  ipcMain.on('log:error', (event, report) => writeErrorLog(report));
  // The renderer cannot reload itself: will-navigate blocks every page navigation.
  ipcMain.on('window:reload', (event) => event.sender.reload());
}

process.on('uncaughtException', (error) => writeErrorLog(`main ${error.stack ?? error.message}`));

app.whenReady().then(() => {
  if (!isDev) Menu.setApplicationMenu(null);
  registerIpc();
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
