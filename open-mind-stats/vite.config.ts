import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  define: {
    "process.env": {}, // ← polyfill
  },
  build: {
    lib: {
      entry: "src/main.tsx",
      name: "OpenMindDashboard",
      fileName: "openmind-dashboard",
      formats: ["es"],
    },
    cssCodeSplit: false,
  },
});
