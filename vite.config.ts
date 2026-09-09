import {cloudflare} from '@cloudflare/vite-plugin';
import tailwindcss from '@tailwindcss/postcss';
import vinext from 'vinext';
import {defineConfig} from 'vite';

export default defineConfig({
  server: {
    watch: {
      ignored: ['**/public/previews/**', '**/public/demos/**', '**/work/**'],
    },
  },
  css: {
    postcss: {
      plugins: [tailwindcss()],
    },
  },
  resolve: {
    alias: {
      tailwindcss: 'tailwindcss/index.css',
    },
  },
  plugins: [
    cloudflare({
      viteEnvironment: {name: 'rsc', childEnvironments: ['ssr']},
    }),
    vinext(),
  ],
});

