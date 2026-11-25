import { defineConfig } from "vite";

export default defineConfig({
  base: "/IAM/",
  build: {
    outDir: "dist",
    emptyOutDir: true,
    rollupOptions: { input: ["index.html", ...Array.from({ length: 8 }, (_, index) => `domain${index + 1}-study.html`)] }
  }
});
