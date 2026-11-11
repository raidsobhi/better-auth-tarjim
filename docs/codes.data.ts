import { defineLoader } from "vitepress";
import codes from "./codes.json";
import { ar } from "../src/ar";

export interface CodeRow {
  code: string;
  group: string;
  ar: string;
  en: string;
}

export interface CodesData {
  betterAuthVersion: string;
  groups: { name: string; count: number }[];
  rows: CodeRow[];
}

declare const data: CodesData;
export { data };

// Built from the generated code list (docs/codes.json) and the real Arabic dictionary (src/ar.ts),
// so the table can never drift from what the package ships.
export default defineLoader({
  watch: ["./codes.json", "../src/ar.ts"],
  load(): CodesData {
    const dictionary = ar as Record<string, string>;
    const rows: CodeRow[] = codes.codes.map((c) => ({
      code: c.code,
      group: c.group,
      en: c.message,
      ar: dictionary[c.code] ?? "",
    }));
    const counts = new Map<string, number>();
    for (const r of rows) counts.set(r.group, (counts.get(r.group) ?? 0) + 1);
    const groups = [...counts].map(([name, count]) => ({ name, count })).sort((a, b) => a.name.localeCompare(b.name, "en"));
    return { betterAuthVersion: codes.betterAuthVersion, groups, rows };
  },
});
