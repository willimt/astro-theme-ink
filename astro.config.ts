import { defineConfig } from 'astro/config'

// UnoCSS integration
import unocss from '@unocss/astro'

// https://astro.build/config
export default defineConfig({
  site: 'https://example.com', // TODO: replace with your site URL

  // The site is fully static, so we can prerender everything.
  output: 'static',

  // [Markdown]
  markdown: {
    shikiConfig: {
      themes: {
        light: 'github-light',
        dark: 'github-dark'
      }
    }
  },

  integrations: [unocss()]
})
