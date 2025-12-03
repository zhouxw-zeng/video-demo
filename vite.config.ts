import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss()
  ],
  resolve: {
    alias: {
      "@": resolve(__dirname, "./src"),
    }
  },
  server: {
    port: 3031,
    open: false,
    cors: true,
    proxy: {
      '/api': {
        target: 'http://localhost:3032', // 后端API地址
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  }

})
