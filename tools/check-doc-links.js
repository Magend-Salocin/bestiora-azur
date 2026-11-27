import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const ignoredDirectories = new Set(['.git', 'node_modules', 'dist', 'build', '_site', 'assets']);

function walk(directory) {
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    if (entry.isDirectory()) {
      if (ignoredDirectories.has(entry.name)) return [];
      return walk(path.join(directory, entry.name));
    }
    return entry.name.toLowerCase().endsWith('.md') ? [path.join(directory, entry.name)] : [];
  });
}

function cleanTarget(target) {
  let cleaned = target.trim();
  if (cleaned.startsWith('<') && cleaned.endsWith('>')) {
    cleaned = cleaned.slice(1, -1);
  }
  return decodeURI(cleaned.split('#')[0].split('?')[0]);
}

const broken = [];

for (const file of walk(root)) {
  const markdown = fs.readFileSync(file, 'utf8');
  for (const match of markdown.matchAll(/\[[^\]]*\]\(([^)]+)\)/g)) {
    const target = cleanTarget(match[1]);
    if (!target || /^(?:https?:|mailto:)/i.test(target) || target.startsWith('data:')) continue;

    const resolved = path.resolve(path.dirname(file), target);
    if (!fs.existsSync(resolved)) {
      broken.push(`${path.relative(root, file)} -> ${target}`);
    }
  }
}

if (broken.length) {
  console.error('Broken local Markdown links:');
  for (const item of broken) console.error(`- ${item}`);
  process.exit(1);
}

console.log('All local Markdown links resolve.');
