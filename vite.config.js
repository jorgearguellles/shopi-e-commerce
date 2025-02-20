import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/shopi-e-commerce/",
  test: {
    // Configuración para Vitest
    globals: true, // Permite usar expect() y otros métodos sin importar Jest
    environment: "jsdom", // Simula un navegador en Node.js
    setupFiles: "./src/setupTests.js", // Archivo para configurar Jest-DOM y otros
  },
});
