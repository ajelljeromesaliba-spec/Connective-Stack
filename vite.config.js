import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        main: 'index.html',
        hvacDemo: 'demos/hvac-ai-front-desk/index.html',
        realEstateDemo: 'demos/luxury-real-estate/index.html',
        healthcareDemo: 'demos/healthcare-patient-experience/index.html',
      },
    },
  },
})
