// Add `import BulbText` to any file that references <BulbText> but doesn't import it.
const fs = require("fs");
const { execSync } = require("child_process");

const files = execSync('git ls-files src/', { encoding: 'utf-8' }).trim().split('\n');
let added = 0;
for (const f of files) {
  if (!f.endsWith('.tsx') && !f.endsWith('.ts')) continue;
  let src;
  try { src = fs.readFileSync(f, 'utf-8'); } catch { continue; }
  if (!src.includes('<BulbText')) continue;
  if (src.includes("import BulbText")) continue;
  // Find the last import line and insert after it
  const lines = src.split('\n');
  let lastImport = -1;
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].startsWith('import ') || lines[i].match(/^\s*}\s*from\s+["']/)) {
      lastImport = i;
    }
    if (lastImport >= 0 && lines[i].includes('from ') && !lines[i+1]?.startsWith('import') && !lines[i+1]?.startsWith('}')) {
      // potentially the last
    }
  }
  if (lastImport === -1) continue;
  lines.splice(lastImport + 1, 0, 'import BulbText from "@/components/ui/BulbText";');
  fs.writeFileSync(f, lines.join('\n'));
  added++;
  console.log('  added import in ' + f);
}
console.log('Imports added: ' + added);
