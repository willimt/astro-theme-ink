import type { TypographyOptions } from '@unocss/preset-typography'
import {
  defineConfig,
  presetIcons,
  presetTypography,
  presetWind3,
  transformerDirectives
} from 'unocss'

/**
 * astro-theme-ink
 * Warm "ink on paper" design system.
 *
 * Colors live in CSS custom properties (see src/assets/styles/tokens.css)
 * and are mapped into UnoCSS theme here, so utilities like
 * `bg-paper text-ink border-line` work everywhere.
 */

const ink = 'hsl(var(--ink) / var(--un-text-opacity, 1))'
const inkSoft = 'hsl(var(--ink-soft) / var(--un-text-opacity, 1))'
const line = 'var(--un-default-border-color)'

const typography: TypographyOptions = {
  selectorName: 'prose',
  colorScheme: {
    body: inkSoft,
    headings: ink,
    links: ink,
    bold: ink,
    counters: 'hsl(var(--ink-soft) / 0.7)',
    bullets: 'hsl(var(--ink-soft) / 0.5)',
    hr: 'hsl(var(--line) / 1)',
    quotes: inkSoft,
    'quote-borders': 'hsl(var(--accent) / 0.45)',
    kbd: ink,
    code: ink,
    'pre-code': inkSoft,
    'th-borders': line,
    'td-borders': line
  },
  cssExtend: {
    // Serif headings — the "printed page" feel
    'h1,h2,h3,h4,h5,h6': {
      'font-family': 'var(--font-serif)',
      'font-weight': '600',
      'letter-spacing': '0.01em',
      'scroll-margin-top': '5.5rem'
    },
    // Anchor links appear on hover
    'h1>a,h2>a,h3>a,h4>a,h5>a,h6>a': {
      'margin-inline-start': '0.6rem',
      color: inkSoft,
      opacity: '0',
      transition: 'opacity 0.2s ease',
      'text-decoration': 'none',
      'font-weight': '400',
      'user-select': 'none'
    },
    'h1:hover>a,h2:hover>a,h3:hover>a,h4:hover>a,h5:hover>a,h6:hover>a': { opacity: '1' },
    'h1:focus-within>a,h2:focus-within>a,h3:focus-within>a,h4:focus-within>a,h5:focus-within>a,h6:focus-within>a':
      {
        opacity: '1'
      },
    // Links: underline on hover, accent color
    a: {
      'font-weight': '500',
      'text-decoration': 'underline',
      'text-decoration-color': 'hsl(var(--accent) / 0.35)',
      'text-underline-offset': '0.18em',
      'word-break': 'break-word',
      transition: 'color 0.15s ease, text-decoration-color 0.15s ease'
    },
    'a:hover': {
      color: 'hsl(var(--accent) / 1)',
      'text-decoration-color': 'hsl(var(--accent) / 0.9)'
    },
    // Inline code: little paper chips
    ':not(pre) > code': {
      'font-family': 'var(--font-mono)',
      'font-size': '0.86em',
      padding: '0.18em 0.42em',
      'border-radius': '0.35em',
      'background-color': 'hsl(var(--wash) / 1)',
      border: '1px solid hsl(var(--line) / 1)',
      'white-space': 'pre-wrap',
      'word-break': 'break-all'
    },
    ':not(pre) > code::before': { content: 'none' },
    ':not(pre) > code::after': { content: 'none' },
    // Blockquote: ink margin line + serif italic voice
    blockquote: {
      'font-family': 'var(--font-serif)',
      'font-style': 'italic',
      'border-inline-start-width': '3px',
      'border-inline-start-color': 'hsl(var(--accent) / 0.55)',
      'border-radius': '0 var(--radius) var(--radius) 0',
      'background-color': 'hsl(var(--wash) / 0.6)',
      'padding-inline': '1.1rem',
      'padding-block': '0.35rem'
    },
    // Tables
    'thead th': { 'font-weight': '600', color: ink },
    'td, th': { padding: '0.5em 0.9em' },
    // Images
    img: { 'border-radius': 'var(--radius)', margin: '0 auto' },
    kbd: {
      'font-family': 'var(--font-mono)',
      'border-radius': '0.3em',
      'border-color': line,
      'box-shadow': '0 2px 0 hsl(var(--line) / 1)',
      padding: '0.15em 0.45em'
    }
  }
}

export default defineConfig({
  presets: [
    presetWind3(),
    presetTypography(typography),
    presetIcons({
      collections: {
        lucide: () =>
          import('@iconify-json/lucide/icons.json').then((m) => (m.default || m) as never)
      },
      scale: 1.1,
      warn: true
    })
  ],
  transformers: [transformerDirectives()],
  theme: {
    colors: {
      // Surface & text
      paper: 'hsl(var(--paper) / <alpha-value>)',
      ink: 'hsl(var(--ink) / <alpha-value>)',
      'ink-soft': 'hsl(var(--ink-soft) / <alpha-value>)',
      // Muted surface
      wash: 'hsl(var(--wash) / <alpha-value>)',
      card: 'hsl(var(--card) / <alpha-value>)',
      // Accent (brand)
      accent: 'hsl(var(--accent) / <alpha-value>)',
      ring: 'hsl(var(--ring) / <alpha-value>)',
      // Borders
      line: 'hsl(var(--line) / <alpha-value>)'
    },
    fontFamily: {
      serif: 'var(--font-serif)',
      sans: 'var(--font-sans)',
      mono: 'var(--font-mono)'
    }
  },
  shortcuts: {
    // Paper card
    'paper-card':
      'rounded-xl border border-line bg-card/60 backdrop-blur-sm transition-all duration-300 hover:border-accent/40 hover:shadow-sm',
    // Pill chip (tags, meta)
    chip: 'inline-flex items-center gap-1 rounded-full border border-line bg-wash px-2.5 py-0.5 text-xs text-ink-soft transition-colors duration-200 hover:border-accent/50 hover:text-accent',
    // Text link with underline animation
    'link-ink':
      'underline decoration-accent/35 underline-offset-4 transition-colors hover:text-accent hover:decoration-accent/80',
    // Icon-only link (add a size utility, e.g. `size-8`)
    'icon-link':
      'inline-flex items-center justify-center rounded-lg text-ink-soft transition-colors duration-200 hover:bg-wash hover:text-accent'
  },
  // Classes referenced only through config lookups (SOCIAL_ICONS in
  // src/utils/index.ts) are invisible to the scanners — generate them explicitly.
  safelist: [
    'i-lucide-github',
    'i-lucide-gitlab',
    'i-lucide-rss',
    'i-lucide-mail',
    'i-lucide-twitter',
    'i-lucide-globe',
    'i-lucide-link'
  ]
})
