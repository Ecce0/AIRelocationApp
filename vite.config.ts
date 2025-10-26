import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  root: "client",
  plugins: [tailwindcss(), react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "client/src"),
    },
  },
 server: {
  port: 1111,
  fs: { strict: false },
  open: true,
},
  appType: "spa",
  build: {
    outDir: "dist",
    emptyOutDir: true,
  },
  
});
