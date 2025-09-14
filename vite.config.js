import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    chunkSizeWarningLimit: 1000, // raise limit to 1MB
    rollupOptions: {
      output: {
        manualChunks: {
          // Split common vendor libraries
          react: ['react', 'react-dom'],
          router: ['react-router-dom'],
          query: ['@tanstack/react-query', '@tanstack/react-query-devtools'],
          ui: ['react-hot-toast', 'styled-components'],
        },
      },
    },
  },
})
