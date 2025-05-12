import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig(({ command }) => ({
  base: './', // Use relative paths for deployment
  plugins: [
    react(),
    tailwindcss(),
  ],
  build: {
    outDir: 'dist',
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'animation-vendor': ['framer-motion', '@react-three/fiber', '@react-three/drei']
        },
      },
    },
  },
  define: {
    'process.env': {}
  },
  server: {
    port: 3000,
    strictPort: true,
    open: true
  },
  preview: {
    port: 3000,
    strictPort: true,
  }
}))
