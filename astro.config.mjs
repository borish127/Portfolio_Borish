// @ts-check
import { defineConfig } from 'astro/config';

import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: 'https://borish127.github.io',
  base: '/Portfolio_Borish',
  integrations: [react()],

  vite: {
    plugins: [tailwindcss()]
  }
});