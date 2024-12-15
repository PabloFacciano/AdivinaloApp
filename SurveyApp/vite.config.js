import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import tailwindcss from 'tailwindcss';
import mkcert from 'vite-plugin-mkcert'

export default defineConfig({
  server: {
    https: true
  },
  plugins: [
    vue(),
    mkcert()
  ],
  css: {
    postcss: {
      plugins: [
        tailwindcss
      ],
    },
  },
});
