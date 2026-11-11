// Fails the build if the published bundle grows past the budget.
// Size of an entry = the entry file + every shared chunk it (transitively) imports, gzipped.
import fs from "node:fs";
import path from "node:path";
import zlib from "node:zlib";

const budgets = { "dist/index.js": 7500, "dist/translate.js": 7500 }; // gzip bytes

function graph(file, seen = new Set()) {
  if (seen.has(file)) return seen;
  seen.add(file);
  const code = fs.readFileSync(file, "utf8");
  for (const [, spec] of code.matchAll(/(?:from|import)\s*["'](\.\/[^"']+\.js)["']/g)) {
    graph(path.join(path.dirname(file), spec), seen);
  }
  return seen;
}

let failed = false;
for (const [file, max] of Object.entries(budgets)) {
  const size = [...graph(file)].reduce((n, f) => n + zlib.gzipSync(fs.readFileSync(f), { level: 9 }).length, 0);
  const ok = size <= max;
  console.log(`${ok ? "ok  " : "FAIL"} ${file}: ${size} B gzip (budget ${max} B)`);
  if (!ok) failed = true;
}
process.exit(failed ? 1 : 0);
