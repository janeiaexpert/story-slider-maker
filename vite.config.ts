import { defineConfig } from "vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import { nitro } from "nitro/vite";
import viteReact from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  build: {
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        manualChunks(id: string) {
          if (id.includes("jspdf") || id.includes("html2canvas")) return "vendor-pdf";
          if (id.includes("lucide-react")) return "vendor-icons";
          if (id.includes("node_modules")) return "vendor";
        },
      },
    },
  },
  plugins: [
    tanstackStart({
      server: { entry: "server" },
    }),
    nitro(),
    viteReact(),
    tailwindcss(),
    tsconfigPaths(),
  ],
});
