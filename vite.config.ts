import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { copyFileSync } from 'fs'

export default defineConfig({
  plugins: [
    react(),
    {
      name: 'copy-cname',
      closeBundle() {
        copyFileSync('CNAME', 'dist/CNAME')
      }
    }
  ],
  base: '/',
})
