// @ts-check
import { defineConfig } from 'astro/config'
import sitemap from '@astrojs/sitemap'

import tailwindcss from '@tailwindcss/vite'

// https://astro.build/config
export default defineConfig({
  site: 'https://cflwash.com',
  trailingSlash: 'never',
  build: {
    format: 'file',
  },
  integrations: [
    sitemap({
      filter: (page) =>
        !page.endsWith('/thank-you') && !page.endsWith('/thank-you/'),
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
})
