import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist', // Output directory
    sourcemap: true, // Generate source maps for debugging
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'), // For imports like '@/components/...'
      '@components': path.resolve(__dirname, './src/components'), // For imports like '@components/...'
      '@pages': path.resolve(__dirname, './src/pages'), // For imports like '@pages/...'
      '@helpers': path.resolve(__dirname, './src/helpers'), // For utility functions
      '@assets': path.resolve(__dirname, './src/assets'), // For static files
      '@styles': path.resolve(__dirname, './src/styles'), // For CSS/SCSS files
      '@constants': path.resolve(__dirname, './src/constants'),
    },
  },

  server: {
    port: 3000, // Dev server port
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './tests/setup.js',
  },
});
