import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath } from 'url'
import { dirname, resolve } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
      'react': resolve(__dirname, 'node_modules/react'),
      'react-dom': resolve(__dirname, 'node_modules/react-dom'),
    },
    dedupe: ['react', 'react-dom'],
  },
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'react/jsx-runtime',
      'react/jsx-dev-runtime',
      'dexie',
      'dexie-react-hooks',
      'react-hot-toast',
      'react-router-dom',
    ],
  },
  build: {
    // Increase warning limit — we're actively splitting below anyway
    chunkSizeWarningLimit: 600,
    rollupOptions: {
      output: {
        manualChunks(id) {
          // Supabase into its own chunk (large auth SDK)
          if (id.includes('@supabase')) return 'supabase';
          // Dexie (IndexedDB ORM) into its own chunk
          if (id.includes('dexie')) return 'dexie';
          // React ecosystem into vendor chunk
          if (id.includes('react-router') || id.includes('react-hot-toast')) return 'vendor-router';
          if (id.includes('node_modules/react') || id.includes('node_modules/react-dom')) return 'vendor-react';
          // Markdown rendering (only needed on learn pages)
          if (id.includes('react-markdown') || id.includes('remark') || id.includes('rehype')) return 'vendor-markdown';
        },
      },
    },
  },
  server: {
    port: 5173,
  },
})