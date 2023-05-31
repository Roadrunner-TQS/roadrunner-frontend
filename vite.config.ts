import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': '/src'
    }
  },
  server: {
    watch: {
      usePolling: true,
    },
    host: true,
    strictPort: true,
  },
  preview: {
    port: 8085,
  }
})
