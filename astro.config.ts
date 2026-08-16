import { defineConfig } from 'astro/config'

// UnoCSS integration
import unocss from '@unocss/astro'
// Sitemap generation (https://docs.astro.build/en/guides/integrations-guide/sitemap)
import sitemap from '@astrojs/sitemap'

// https://astro.build/config
export default defineConfig({
  // TODO: replace with your real site URL — needed for sitemap & canonical links
  site: 'https://example.com',

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

  integrations: [unocss(), sitemap()]
})
