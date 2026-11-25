import { defineConfig } from "vite";

export default defineConfig({
  base: "/IAM/",
  build: {
    outDir: "dist",
    emptyOutDir: true,
    rollupOptions: { input: ["index.html", "domain1-study.html"] }
  }
});
