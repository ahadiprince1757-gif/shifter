import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath } from 'url'
import { dirname, resolve } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, __dirname, '')

  const supabaseUrl = process.env.SUPABASE_URL || env.SUPABASE_URL || process.env.VITE_SUPABASE_URL || env.VITE_SUPABASE_URL || ''
  const supabaseAnonKey = process.env.SUPABASE_ANON_KEY || env.SUPABASE_ANON_KEY || process.env.VITE_SUPABASE_ANON_KEY || env.VITE_SUPABASE_ANON_KEY || ''
  const apiUrl = process.env.API_URL || env.API_URL || process.env.VITE_API_URL || env.VITE_API_URL || ''

  return {
    envPrefix: ['VITE_', 'SUPABASE_', 'API_'],
    define: {
      'import.meta.env.VITE_SUPABASE_URL': JSON.stringify(supabaseUrl),
      'import.meta.env.SUPABASE_URL': JSON.stringify(supabaseUrl),
      'import.meta.env.VITE_SUPABASE_ANON_KEY': JSON.stringify(supabaseAnonKey),
      'import.meta.env.SUPABASE_ANON_KEY': JSON.stringify(supabaseAnonKey),
      'import.meta.env.VITE_API_URL': JSON.stringify(apiUrl),
      'import.meta.env.API_URL': JSON.stringify(apiUrl),
    },
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
      'react-hot-toast',
      'react-router-dom',
    ],
  },

  build: {
    // Target modern browsers — smaller, faster output
    target: 'es2020',

    // Don't compute compressed size during build (faster builds, numbers still shown)
    reportCompressedSize: true,

    // Warn on chunks > 500 kB (down from 600)
    chunkSizeWarningLimit: 500,

    rollupOptions: {
      output: {
        manualChunks(id) {
          // ─── Supabase ──────────────────────────────────────────────────────
          if (id.includes('@supabase')) return 'vendor-supabase';

          // ─── Dexie (IndexedDB ORM) ────────────────────────────────────────
          if (id.includes('dexie')) return 'vendor-dexie';

          // ─── React ecosystem ──────────────────────────────────────────────
          if (id.includes('node_modules/react-router') || id.includes('node_modules/react-hot-toast')) {
            return 'vendor-router';
          }
          if (id.includes('node_modules/react') || id.includes('node_modules/react-dom')) {
            return 'vendor-react';
          }

          // ─── Markdown rendering (only needed in NotesPhase) ───────────────
          if (
            id.includes('react-markdown') ||
            id.includes('remark') ||
            id.includes('rehype')
          ) {
            return 'vendor-markdown';
          }

          // ─── Heavy AI/grading utils — only needed inside LearnFlow ─────────
          // These are only imported inside lazy-loaded components so they
          // naturally land in those chunks, but grouping them avoids
          // them polluting the main bundle if anything imports them eagerly.
          if (
            id.includes('answerAnalyzer') ||
            id.includes('answerParser') ||
            id.includes('mathVerifier') ||
            id.includes('mcqVerifier') ||
            id.includes('misconceptionDiagnoser') ||
            id.includes('grader') ||
            id.includes('diagnosticSelector')
          ) {
            return 'vendor-grading';
          }

          // ─── Large utility modules ────────────────────────────────────────
          if (
            id.includes('questionMutator') ||
            id.includes('LocalSearchEngine') ||
            id.includes('spacedRepetition') ||
            id.includes('conceptGraphMapper') ||
            id.includes('weaknessMap') ||
            id.includes('nextActionEngine') ||
            id.includes('studentMemoryModel') ||
            id.includes('learningPolicyEngine')
          ) {
            return 'vendor-learning-engine';
          }
        },
      },
    },
  },

  server: {
    port: 5173,
  },
  };
})