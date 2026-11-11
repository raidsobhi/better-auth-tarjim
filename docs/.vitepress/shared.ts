import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const pkg = JSON.parse(
  fs.readFileSync(path.resolve(here, "../../package.json"), "utf8"),
);

export const owner = "raidsobhi";
export const repo = "better-auth-tarjim";
export const repoUrl = `https://github.com/${owner}/${repo}`;
export const npmUrl = `https://www.npmjs.com/package/${repo}`;
export const version: string = pkg.version;

export const base = process.env.DOCS_BASE ?? `/${repo}/`;
export const siteUrl =
  process.env.DOCS_SITE_URL ?? `https://${owner}.github.io${base}`;

export const brandColor = "#0f766e";
