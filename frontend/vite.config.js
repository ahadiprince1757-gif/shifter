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
      'react-hot-toast',
      'react-router-dom',
    ],
    // Exclude the AI model SDK from pre-bundling — it's dynamically imported
    exclude: ['@mlc-ai/web-llm'],
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
          // ─── @mlc-ai/web-llm ───────────────────────────────────────────────
          // Isolated entirely — it's 6 MB and only used in AITutor.
          // Dynamic import in aiEngine.js keeps it out of every other route.
          if (id.includes('@mlc-ai/web-llm')) return 'vendor-webllm';

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
})