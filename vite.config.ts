import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { fileURLToPath } from "node:url";
import { BRANDING, brandingTitle } from "./src/config/branding.ts";

// Deriva el <title> de cada entrada desde la configuración central de branding.
function brandingHtmlPlugin() {
  const sectionFor = (filename: string) => {
    const match = filename.replace(/\\/g, "/").match(/\/versiones\/([^/]+)\/index\.html$/);
    if (!match) return "Seleccionar fase";
    return match[1].charAt(0).toUpperCase() + match[1].slice(1);
  };
  return {
    name: "branding-html",
    transformIndexHtml(html: string, ctx: { filename: string }) {
      return html
        .replace(/<title>[\s\S]*?<\/title>/, `<title>${brandingTitle(sectionFor(ctx.filename))}</title>`)
        .replace("</head>", `  <meta name="description" content="${BRANDING.appName}" />\n  </head>`);
    },
  };
}

export default defineConfig({
  base: "./",
  server: {
    watch: {
      ignored: [
        "**/release-competencia-matematica",
        "**/release-competencia-matematica/**",
        "**/release",
        "**/release/**",
      ],
    },
  },
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
    brandingHtmlPlugin(),
  ],
});
