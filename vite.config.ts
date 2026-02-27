import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api/crz': {
        target: 'https://jsonplaceholder.typicode.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/crz/, '/posts')
      },
      '/api/slovensko-digital': {
        target: 'https://autoform.ekosystem.slovensko.digital',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/slovensko-digital/, '/api/corporate_bodies/search')
      }
    }
  }
})
