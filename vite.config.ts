import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  server: {
    proxy: {
      '/graphql': 'http://localhost:8000',
      '/images': 'http://localhost:8000',
    },
  },
  plugins: [react()]
})