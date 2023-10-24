import { defineConfig } from 'vite';
import dotenv from 'dotenv';
import react from '@vitejs/plugin-react';

dotenv.config()

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/',
  // base: '/week-17-sherinolivia/',
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: './src/main.tsx', 
    },
  }
})
