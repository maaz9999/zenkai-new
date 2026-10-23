import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    cssCodeSplit: true,
    chunkSizeWarningLimit: 800,
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor-react': ['react', 'react-dom', 'react-router-dom'],
          'vendor-matter': ['matter-js'],
          'vendor-icons': ['lucide-react']
        }
      }
    }
  },
  server: {
    port: 3007,
    strictPort: true,
    host: true,
    watch: {
      ignored: ['**/*.mp4', '**/node_modules/**', '**/.git/**']
    }
  }
});
