import { defineConfig } from 'astro/config'

// UnoCSS integration
import unocss from '@unocss/astro'
// Sitemap generation (https://docs.astro.build/en/guides/integrations-guide/sitemap)
import sitemap from '@astrojs/sitemap'

// Shiki code-block pipeline (ported from astro-theme-pure)
import {
  addCollapse,
  addCopyButton,
  addLanguage,
  addTitle,
  updateStyle
} from './src/plugins/shiki-custom-transformers.ts'
import {
  transformerNotationDiff,
  transformerNotationHighlight,
  transformerRemoveNotationEscape
} from './src/plugins/shiki-official/transformers.ts'
// Lazy-load Markdown images
import rehypeImageAttributes from './src/plugins/rehype-image-attributes.ts'

// https://astro.build/config
export default defineConfig({
  // TODO: replace with your real site URL — needed for sitemap & canonical links
  site: 'https://example.com',

  // The site is fully static, so we can prerender everything.
  output: 'static',

  // Prefetch every internal link on hover/scroll for instant navigation
  prefetch: { prefetchAll: true, defaultStrategy: 'hover' },

  // [Markdown]
  markdown: {
    rehypePlugins: [rehypeImageAttributes],
    shikiConfig: {
      themes: {
        light: 'github-light',
        dark: 'github-dark'
      },
      transformers: [
        // Notation: `[!code diff]` / `[!code highlight]` etc.
        // @ts-ignore — multiple copies of @shikijs/types can confuse TS
        transformerNotationDiff(),
        // @ts-ignore
        transformerNotationHighlight(),
        // @ts-ignore
        transformerRemoveNotationEscape(),
        // Structure & controls
        // @ts-ignore
        updateStyle(),
        // @ts-ignore
        addTitle(),
        // @ts-ignore
        addLanguage(),
        // @ts-ignore
        addCopyButton(2000), // timeout in ms
        // @ts-ignore
        addCollapse(15) // max lines that needs to collapse
      ]
    }
  },

  integrations: [unocss(), sitemap()]
})
