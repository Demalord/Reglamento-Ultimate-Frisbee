import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// base relativa: funciona en https://<usuario>.github.io/<repo>/ sin importar el nombre del repo.
// Las rutas usan HashRouter (#/...), así que GitHub Pages no necesita reescrituras.
export default defineConfig({
  build: { chunkSizeWarningLimit: 1000 },
  base: './',
  plugins: [react()],
})
