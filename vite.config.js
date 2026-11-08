import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { cpSync } from 'node:fs';
import path from 'node:path';

// Editing masters remain in public/assets/LEO locally. Never copy them to a web build.
function copyDeliveryAssets() {
  let config;
  return {
    name: 'copy-delivery-assets',
    configResolved(resolved) { config = resolved; },
    writeBundle() {
      cpSync(config.publicDir, path.resolve(config.root, config.build.outDir), {
        recursive: true,
        filter(source) {
          const relative = path.relative(config.publicDir, source).replaceAll('\\', '/');
          return !/^assets\/LEO\/[^/]+\.mp4$/i.test(relative)
            && !/\.(tmp\.mp4|incomplete)$/.test(relative);
        },
      });
    },
  };
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), copyDeliveryAssets()],
  build: {
    copyPublicDir: false,
    cssCodeSplit: true,
    chunkSizeWarningLimit: 1200
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
