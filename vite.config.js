import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: '/tic-tac-toe/',   // <-- IMPORTANT: your repo name, with leading & trailing slash
  plugins: [react()],
})
