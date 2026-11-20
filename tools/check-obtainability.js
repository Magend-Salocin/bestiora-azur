// node tools/check-obtainability.js: proves from the data that the 150 species can be had in one
// playthrough (145 + 4 legendaries + the mythical one, which needs the 149 others caught), for each
// starter. Also run by npm run validate (checker « Obtention »).
import { CREATURES } from '../src/data/creatures.js';
import { MAPS } from '../src/data/maps/index.js';
import { SCRIPTS } from '../src/data/scripts.js';
import { STARTERS } from '../src/data/trainers/helpers.js';
import { LEGENDARIES, MYTHICAL, computeObtainable } from './validators/obtainability.js';

let failed = false;
for (const starter of STARTERS) {
  const { obtainable, missing } = computeObtainable(MAPS, SCRIPTS, CREATURES, starter);
  const count = (filter) => [...obtainable.keys()].filter(filter).length;
  const regular = count((id) => !LEGENDARIES.includes(id) && id !== MYTHICAL);
  const legendary = count((id) => LEGENDARIES.includes(id));
  const byHow = {};
  for (const how of obtainable.values()) {
    const kind = how.split(' ')[0];
    byHow[kind] = (byHow[kind] ?? 0) + 1;
  }
  process.stdout.write(
    `${missing.length ? 'ERR' : 'OK '} ${starter} : ${obtainable.size}/${CREATURES.length} ` +
    `(${regular} non légendaires, ${legendary}/${LEGENDARIES.length} légendaires, mythique : ${obtainable.get(MYTHICAL) ?? 'non'}) ` +
    `${JSON.stringify(byHow)}\n`,
  );
  if (missing.length) process.stdout.write(`    manquantes : ${missing.join(', ')}\n`);
  failed ||= missing.length > 0;
}
process.exitCode = failed ? 1 : 0;
