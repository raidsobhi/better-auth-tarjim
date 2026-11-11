#!/usr/bin/env node
/**
 * Extracts every error code from the installed Better Auth packages and writes:
 *   - src/codes.generated.ts   (ErrorCode union type + English messages)
 *   - docs/CODES.md            (human-readable table)
 *   - docs/codes.json          (data source for the documentation site)
 *
 * Better Auth is the single source of truth. Run `npm run sync` after upgrading it.
 * Use `--check` to fail (exit 1) when the generated files are out of date.
 *
 * Determinism: when a code is defined more than once, the FIRST definition wins, in this order:
 *   1. core (BASE_ERROR_CODES)
 *   2. `error-code(s).mjs` files inside better-auth/dist, sorted by path
 *   3. public entry points, in the order of ENTRIES below
 * Duplicates whose messages differ are reported as warnings, never silently dropped.
 */
import fs from "node:fs";
import path from "node:path";
import { createRequire } from "node:module";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const require = createRequire(path.join(root, "package.json"));
const check = process.argv.includes("--check");

/** Public entry points that export *_ERROR_CODES objects. Packages that are not installed are skipped. */
const ENTRIES = [
  "better-auth/plugins",
  "better-auth/client/plugins",
  "@better-auth/passkey",
  "@better-auth/passkey/client",
  "@better-auth/api-key",
  "@better-auth/api-key/client",
  "@better-auth/sso",
  "@better-auth/sso/client",
  "@better-auth/stripe",
  "@better-auth/stripe/client",
  "@better-auth/oauth-provider",
  "@better-auth/oauth-provider/client",
  "@better-auth/scim",
];

const warnings = [];
const warn = (msg) => { if (!warnings.includes(msg)) warnings.push(msg); };

const isEntry = (x) => x && typeof x === "object" && typeof x.code === "string" && typeof x.message === "string";
const groupOf = (exportName) =>
  exportName.replace(/_?ERROR_CODES?$/, "").toLowerCase().replace(/_/g, "-") || "misc";

/** code -> { message, group, source } */
const found = new Map();

function collect(group, source, map) {
  if (!map || typeof map !== "object" || Array.isArray(map)) return;
  for (const [key, entry] of Object.entries(map)) {
    if (!isEntry(entry)) {
      warn(`${source}: entry "${key}" does not look like { code, message }; skipped. Update scripts/sync-codes.mjs if Better Auth changed its format.`);
      continue;
    }
    const existing = found.get(key);
    if (!existing) {
      found.set(key, { message: entry.message, group, source });
    } else if (existing.message !== entry.message) {
      // Same conflict can be seen through both a package and its /client entry; report it once per message pair.
      warn(`${key} is defined twice with different messages: "${existing.message}" (${existing.group}) kept, "${entry.message}" ignored.`);
    }
  }
}

const isCodesExport = (name) => /ERROR_CODES?$/.test(name);

// 1. Core codes first so they are always grouped as "base".
const core = await import(pathToFileURL(require.resolve("better-auth")).href);
if (!core.BASE_ERROR_CODES) {
  console.error("better-auth no longer exports BASE_ERROR_CODES. Update scripts/sync-codes.mjs.");
  process.exit(1);
}
collect("base", "better-auth BASE_ERROR_CODES", core.BASE_ERROR_CODES);

// 2. Codes defined in `error-code(s).mjs` files that are not re-exported publicly (sorted, so order is stable).
const baPkg = path.join(root, "node_modules", "better-auth");
const walk = (dir) =>
  fs.readdirSync(dir, { withFileTypes: true }).flatMap((e) =>
    e.isDirectory() ? walk(path.join(dir, e.name)) : [path.join(dir, e.name)]);
const files = walk(path.join(baPkg, "dist"))
  .filter((f) => /error-codes?\.mjs$/.test(f))
  .sort();
for (const file of files) {
  const mod = await import(pathToFileURL(file).href);
  const rel = path.relative(baPkg, file);
  for (const [name, value] of Object.entries(mod)) {
    if (isCodesExport(name)) collect(path.basename(path.dirname(file)), `${rel} ${name}`, value);
  }
}

// 3. Public entry points.
for (const entry of ENTRIES) {
  let resolved;
  try { resolved = require.resolve(entry); } catch { continue; } // not installed: fine
  let mod;
  try { mod = await import(pathToFileURL(resolved).href); }
  catch (err) { warn(`${entry}: could not be imported (${err.message.split("\n")[0]}); its codes were skipped.`); continue; }
  for (const [name, value] of Object.entries(mod)) {
    if (isCodesExport(name)) collect(groupOf(name), `${entry} ${name}`, value);
  }
}

const baseCount = [...found.values()].filter((v) => v.group === "base").length;
if (baseCount === 0) {
  console.error("No base error codes found. Refusing to write empty output.");
  process.exit(1);
}

const version = JSON.parse(fs.readFileSync(path.join(baPkg, "package.json"), "utf8")).version;
const sorted = [...found.entries()].sort(([a], [b]) => (a < b ? -1 : a > b ? 1 : 0)); // locale-independent
const q = (s) => JSON.stringify(s);

const ts = `// AUTO-GENERATED by scripts/sync-codes.mjs. DO NOT EDIT.
// Source of truth: Better Auth ${version}. Run \`npm run sync\` after upgrading it.

export const BETTER_AUTH_VERSION = ${q(version)};

export type ErrorCode =
${sorted.map(([k]) => `  | ${q(k)}`).join("\n")};

/** English messages shipped by Better Auth (used by tests and tooling, not bundled). */
export const ENGLISH_MESSAGES: Record<ErrorCode, string> = {
${sorted.map(([k, v]) => `  ${k}: ${q(v.message)},`).join("\n")}
};
`;

const md = `# Better Auth error codes

Generated from Better Auth **${version}** by \`npm run sync\`. Do not edit by hand.

| Code | Group | English message |
| --- | --- | --- |
${sorted.map(([k, v]) => `| \`${k}\` | ${v.group} | ${v.message.replace(/\|/g, "\\|")} |`).join("\n")}
`;

// The docs site reads this file. It is generated too, so the site can never drift
// from the code list the package actually ships.
const json = `${JSON.stringify(
  {
    betterAuthVersion: version,
    count: sorted.length,
    codes: sorted.map(([code, v]) => ({ code, group: v.group, message: v.message })),
  },
  null,
  2,
)}\n`;

const outputs = [
  [path.join(root, "src/codes.generated.ts"), ts],
  [path.join(root, "docs/CODES.md"), md],
  [path.join(root, "docs/codes.json"), json],
];

for (const w of warnings) {
  console.warn(process.env.GITHUB_ACTIONS ? `::warning title=sync-codes::${w}` : `warning: ${w}`);
}

if (check) {
  const stale = outputs.filter(([f, c]) => !fs.existsSync(f) || fs.readFileSync(f, "utf8") !== c);
  if (stale.length) {
    console.error("Generated files are out of date. Run `npm run sync` and commit the result:");
    for (const [f] of stale) console.error("  - " + path.relative(root, f));
    process.exit(1);
  }
  console.log(`Generated files are up to date (Better Auth ${version}, ${sorted.length} codes).`);
} else {
  fs.mkdirSync(path.join(root, "docs"), { recursive: true });
  for (const [f, c] of outputs) fs.writeFileSync(f, c);
  console.log(`Synced ${sorted.length} error codes from Better Auth ${version}.`);
}
