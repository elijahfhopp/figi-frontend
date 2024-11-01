import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

const backendHost = 'https://figi.litmuspaper.art'
const backendPath = "/api"; // rewrites go to backendHost + path: http://localhost:80/ + figi-api/

// https://vite.dev/config/
export default defineConfig({
  base: "/",
  server: {
    proxy: {
        '/api': {
          target: backendHost,
          changeOrigin: true,
          secure: false,
          rewrite: (path) => path.replace(/^\/api/, backendPath),
        },
      },
  },
  plugins: [react()]
})
