import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { fileURLToPath } from "node:url";

export default defineConfig({
  base: "./",
  build: {
    rollupOptions: {
      input: {
        menu: fileURLToPath(new URL("./index.html", import.meta.url)),
        eliminatoria: fileURLToPath(new URL("./versiones/eliminatoria/index.html", import.meta.url)),
        desempate: fileURLToPath(new URL("./versiones/desempate/index.html", import.meta.url)),
        final: fileURLToPath(new URL("./versiones/final/index.html", import.meta.url)),
      },
    },
  },
  plugins: [
    react(),
    tailwindcss(),
  ],
});
