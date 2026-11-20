// Dev only tasks run in the game window, then the app quits (never packaged):
//   --capture=<dir>  README screenshots: each step of src/debug/capture-scenes.js returns the
//                    160 × 144 game canvas as a PNG data URL, written as <step>.png
//                    (tools/capture-screenshots.js enlarges them afterwards).
//   --perf           frame time measures of src/debug/perf-probe.js, printed as JSON on stdout.
const fs = require('node:fs');
const path = require('node:path');

const CAPTURE_STEPS = ['title', 'town', 'menu', 'battle'];

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function waitForDebugTools(win) {
  for (let attempt = 0; attempt < 100; attempt += 1) {
    if (await win.webContents.executeJavaScript('typeof window.debugCapture === "function"')) return;
    await wait(100);
  }
  throw new Error('Debug tools are missing (is the game running with --dev?)');
}

async function captureScreens(win, directory) {
  fs.mkdirSync(directory, { recursive: true });
  await waitForDebugTools(win);
  for (const step of CAPTURE_STEPS) {
    const dataUrl = await win.webContents.executeJavaScript(`window.debugCapture(${JSON.stringify(step)})`);
    fs.writeFileSync(path.join(directory, `${step}.png`), Buffer.from(dataUrl.split(',')[1], 'base64'));
  }
}

async function measurePerformance(win) {
  await waitForDebugTools(win);
  await wait(3000); // let the title screen settle
  const results = await win.webContents.executeJavaScript('window.debugPerf()');
  process.stdout.write(`${JSON.stringify(results, null, 2)}\n`);
}

module.exports = { captureScreens, measurePerformance };
