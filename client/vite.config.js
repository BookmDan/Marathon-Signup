import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
   proxy: {
    '/api': {
      target: 'http://127.0.0.1:5555',
      changeOrigin: true,
    },
   },
  },
  resolve: {
    alias: {
      '@stripe/react-stripe-js': '@stripe/react-stripe-js/dist/index.esm.js',
    },
  },
})
