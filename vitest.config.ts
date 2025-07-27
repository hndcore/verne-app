/// <reference types="vitest/config" />
import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./src/test/setup.ts",
    coverage: {
      include: ["src/**/*.{ts,tsx}"],
      exclude: ["src/lib/**/*.stories.{ts,tsx}", "src/main.tsx", "src/App.tsx"],
    },
    include: ["src/**/*.{test,spec}.{ts,tsx}"],
  },
});
