// npm run perf: measures the game in Electron (src/debug/perf-probe.js) and checks the targets:
// 60 frames per second on a dense map and during battle animations, title screen in < 2 s.
import { runElectron } from './run-electron.js';

const TARGETS = { titleReadyMs: 2000, minFps: 58, maxGameCpuMsPerFrame: 4 };

const result = runElectron(['--dev', '--perf'], { capture: true });
const json = result.stdout?.slice(result.stdout.indexOf('{'));
if (result.status !== 0 || !json) {
  process.stderr.write(`La mesure a échoué (code ${result.status ?? result.signal}).\n${result.stdout ?? ''}`);
  process.exit(1);
}
const measures = JSON.parse(json);
process.stdout.write(`${JSON.stringify(measures, null, 2)}\n`);

const failures = [];
if (measures.titleReadyMs > TARGETS.titleReadyMs) failures.push(`écran titre en ${measures.titleReadyMs} ms`);
for (const name of ['denseMap', 'battleAnimations']) {
  const { fps, gameCpuMsPerFrame } = measures[name];
  if (fps < TARGETS.minFps) failures.push(`${name} : ${fps} images/s`);
  if (gameCpuMsPerFrame > TARGETS.maxGameCpuMsPerFrame) failures.push(`${name} : ${gameCpuMsPerFrame} ms de calcul par image`);
}
process.stdout.write(failures.length === 0 ? 'Cibles atteintes.\n' : `Hors cible : ${failures.join(', ')}\n`);
process.exitCode = failures.length === 0 ? 0 : 1;
