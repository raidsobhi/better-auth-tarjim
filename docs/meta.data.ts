import { defineLoader } from "vitepress";
import codes from "./codes.json";
import { ar } from "../src/ar";

export interface MetaData {
  betterAuthVersion: string;
  codeCount: number;
  pluginCount: number;
  samples: { code: string; message: string }[];
}

declare const data: MetaData;
export { data };

const SAMPLE_CODES = ["INVALID_EMAIL_OR_PASSWORD", "EMAIL_NOT_VERIFIED", "USER_ALREADY_EXISTS", "SESSION_EXPIRED"];

// Small, page-specific data for the home page (kept separate so the full table is not bundled there).
export default defineLoader({
  watch: ["./codes.json", "../src/ar.ts"],
  load(): MetaData {
    const dictionary = ar as Record<string, string>;
    const groups = new Set(codes.codes.map((c) => c.group));
    groups.delete("base");
    return {
      betterAuthVersion: codes.betterAuthVersion,
      codeCount: codes.count,
      pluginCount: groups.size,
      samples: SAMPLE_CODES.map((code) => ({ code, message: dictionary[code] ?? "" })),
    };
  },
});
