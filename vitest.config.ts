/// <reference types="vitest/config" />
import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./src/test/setup.ts",
    coverage: {
      include: ["src/**/*.{ts,tsx}"],
      exclude: [
        "src/lib/**/*.stories.{ts,tsx}",
        "src/main.tsx",
        "src/App.tsx",
        "src/**/**Schema.ts",
        "src/**/query-client.ts",
        "src/features/books/config/*",
      ],
    },
    include: ["src/**/*.{test,spec}.{ts,tsx}"],
  },
  server: {
    watch: {
      ignored: ["**/db.json"],
    },
    proxy: {
      "/api": {
        target: "http://localhost:3000",
        changeOrigin: true,
        rewrite: path => path.replace(/^\/api/, ""),
      },
    },
  },
});
