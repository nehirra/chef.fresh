import { defineConfig } from 'vite';
import { resolve } from 'node:path';

// GitHub Pages proje sayfası alt yolu
export default defineConfig({
  base: '/chef.fresh/',
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        privacy: resolve(__dirname, 'privacy.html'),
      },
    },
  },
});
