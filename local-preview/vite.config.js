import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

const siteRoot = fileURLToPath(new URL('../', import.meta.url));
const collectionEntries = {
  home: fileURLToPath(new URL('../index.html', import.meta.url)),
  women: fileURLToPath(new URL('../collections/women-pajama-sets.html', import.meta.url)),
  lounge: fileURLToPath(new URL('../collections/lounge-sets.html', import.meta.url)),
  satin: fileURLToPath(new URL('../collections/satin-pajama-sets.html', import.meta.url)),
  maternity: fileURLToPath(new URL('../collections/maternity-nursing-pajamas.html', import.meta.url)),
  bamboo: fileURLToPath(new URL('../collections/modal-bamboo-pajamas.html', import.meta.url)),
  nightgowns: fileURLToPath(new URL('../collections/nightgowns-sleep-dresses.html', import.meta.url))
};

export default defineConfig({
  root: siteRoot,
  publicDir: false,
  plugins: [react()],
  build: {
    outDir: fileURLToPath(new URL('./dist', import.meta.url)),
    emptyOutDir: true,
    rollupOptions: {
      input: {
        ...collectionEntries,
        detail: fileURLToPath(new URL('../collections/nightgown-product-details.html', import.meta.url))
      }
    }
  },
  server: {
    host: '127.0.0.1'
  }
});
