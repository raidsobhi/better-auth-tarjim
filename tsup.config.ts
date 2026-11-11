import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts", "src/translate.ts"],
  format: ["esm", "cjs"],
  dts: true,
  minify: true,
  clean: true,
  treeshake: true,
  external: ["sonner"],
});
