import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        main: 'index.html',
        ghlSystems: 'ghl-systems/index.html',
        hvacDemo: 'demos/hvac-ai-front-desk/index.html',
      },
    },
  },
})
