import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

const remoteHost = 'http://localhost:8000'

// https://vite.dev/config/
export default defineConfig({
  base: "/",
  server: {
    proxy: {
      '/graphql': remoteHost,
      '/image': remoteHost,
      '/extract_faces': remoteHost
    },
  },
  plugins: [react()]
})
