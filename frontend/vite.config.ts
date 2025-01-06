import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '*': { target: process.env.NODE_ENV == "production" ? 'https://bandarmusikindonesiaserver.vercel.app' : 'http://localhost:5000' }
    }
  }
})
