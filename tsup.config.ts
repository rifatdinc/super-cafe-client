import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["./backend/main.ts", "./backend/preload.ts"],
  splitting: false,
  sourcemap: false,
  clean: true,
  cjsInterop: true,
  skipNodeModulesBundle: true,
  treeshake: true,
  outDir: "build",
  external: ["electron"],
  format: ["cjs"],
  bundle: true,
});
