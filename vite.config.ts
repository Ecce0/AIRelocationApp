import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [
    tailwindcss(),
    react(),
  ],
  root: 'client',
 resolve: {
    alias: {
      "@": path.resolve(__dirname, "client/src")
    }
  },
  server: {
    port: 1111,
  },
  build: {
    outDir: '../dist',
    emptyOutDir: true,
  },
})
