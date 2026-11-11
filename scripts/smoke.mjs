// Loads the BUILT package the way a consumer would (ESM and CJS) and checks real output.
// CI runs this on the oldest Node versions we support (18, 20), which the toolchain itself no longer runs on.
import { createRequire } from "node:module";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const require = createRequire(import.meta.url);
const esm = await import("../dist/translate.js");
const cjs = require("../dist/translate.cjs");

for (const [name, mod] of [["esm", esm], ["cjs", cjs]]) {
  assert.equal(mod.translate({ code: "INVALID_EMAIL_OR_PASSWORD" }), mod.messages.INVALID_EMAIL_OR_PASSWORD, `${name}: code lookup`);
  assert.match(mod.translate({ code: "INVALID_EMAIL_OR_PASSWORD" }), /[\u0600-\u06FF]/, `${name}: Arabic output`);
  assert.equal(mod.translate({ status: 429 }), mod.translate({ status: 429, code: "NOPE" }), `${name}: 429`);
  assert.match(mod.translate(new TypeError("fetch failed")), /الاتصال/, `${name}: network`);
  assert.notEqual(typeof mod.translate({ code: "toString" }), "function", `${name}: prototype safety`);
}

// The /translate entry must stay free of Sonner: sonner is an OPTIONAL peer dependency, so a
// consumer who only wants translation must never be forced to install it. This repo has sonner
// in devDependencies, so the import would resolve fine here — the only way to catch a leak is
// to inspect the built output. The shared chunk is checked too, because /translate re-exports it.
const dist = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..", "dist");
const bundles = fs.readdirSync(dist).filter((f) => /\.(js|cjs)$/.test(f));
assert.ok(bundles.length > 0, "no built bundles found");
for (const file of bundles) {
  const source = fs.readFileSync(path.join(dist, file), "utf8");
  const referencesSonner = /["']sonner["']/.test(source);
  const isMainEntry = /^index\.(js|cjs)$/.test(file);
  if (isMainEntry) {
    assert.ok(referencesSonner, `${file}: the main entry should reference sonner`);
  } else {
    assert.ok(!referencesSonner, `${file}: only the main entry may reference sonner`);
  }
}

console.log(`smoke ok on Node ${process.version}`);

