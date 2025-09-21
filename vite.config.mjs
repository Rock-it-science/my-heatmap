// vite.config.ts
import { defineConfig } from "vite";

export default defineConfig({
  root: "src/frontend", // where index.html lives
  build: {
    outDir: "../../dist/frontend", // relative to root
    emptyOutDir: true,
  },
});
