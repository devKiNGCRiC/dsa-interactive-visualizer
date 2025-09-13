import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    // Plugin to replace environment variables in HTML
    {
      name: 'html-env-vars',
      transformIndexHtml(html: string) {
        return html.replace(/%VITE_GA_TRACKING_ID%/g, process.env.VITE_GA_TRACKING_ID || 'G-XXXXXXXXXX')
      }
    }
  ],
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: undefined,
      },
    },
  },
  base: '/',
})
