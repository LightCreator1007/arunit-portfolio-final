// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  // REPLACE with your actual GitHub URL
  site: 'https://LightCreator1007.github.io',
  base: '/arunit-portfolio-final', 

  integrations: [react()],
  vite: {
    plugins: [tailwindcss()]
  }
});