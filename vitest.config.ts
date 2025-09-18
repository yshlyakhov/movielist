import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom", // Use JSDOM for a browser-like environment
    globals: true, // Make test functions globally available
    setupFiles: ["./vitest.setup.ts"], // Optional: for global setup like custom matchers
  },
});
