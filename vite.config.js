import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss()
  ],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/tests/setup.js',
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html'], // 'text' shows in terminal, 'html' creates a folder
      include: ['src/components/**', 'src/store/**'],
      exclude: ['src/main.jsx', 'src/assets/**'],
    },
  },
})
