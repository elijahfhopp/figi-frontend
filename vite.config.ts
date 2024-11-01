import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  base: "/figi-demo/",
  server: {
    proxy: {
      '/graphql': 'http://localhost:8000',
      '/image': 'http://localhost:8000',
      '/extract_faces': 'http://localhost:8000'
    },
  },
  plugins: [react()]
})
