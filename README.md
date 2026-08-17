# astro-theme-ink 墨

[English](./README.md) · [简体中文](./README.zh-CN.md)

A warm, paper-feel personal blog theme built with [Astro](https://astro.build) & [UnoCSS](https://unocss.dev). Ink on paper — one accent hue, quiet grays, generous whitespace, serif headings.

## Screenshots

<p>
  <img src="public/images/home-ink.png" alt="Home page - ink palette" width="49%" />
  <img src="public/images/home-fresh.png" alt="Home page - fresh palette" width="49%" />
</p>

<p>
  <img src="public/images/blog-content-ink.png" alt="Article page - ink palette" width="49%" />
  <img src="public/images/blog-content-fresh.png" alt="Article page - fresh palette" width="49%" />
</p>

<p>
  <img src="public/images/blog-index.png" alt="Blog list page" width="32%" />
  <img src="public/images/about.png" alt="About page" width="32%" />
  <img src="public/images/links.png" alt="Links page" width="32%" />
</p>

## Features

- 📝 Blog list with pagination, tags, yearly archives, RSS & sitemap
- 🔍 Built-in lightweight full-text search — a prerendered JSON index, zero external services
- 💬 Waline comments + 📊 article page views (share one Waline server, opt-in via `src/site.config.ts`)
- 🧮 Site-wide total-visits counter in the footer — shares the same Waline server, no extra dependency
- 🌗 Light / dark / system themes, applied before first paint (no flash) with a smooth cross-fade
- 🎨 Two built-in palettes — warm **ink** and fresh **haze blue** — switchable from the header (persisted); soft aurora gradients & palette-aware accents
- 📖 Sticky table of contents on desktop, collapsible TOC on mobile
- 🖼️ Optional cover images per post (`heroImage`)
- 📊 Reading progress bar + prev/next post navigation on article pages
- 🔍 SEO: JSON-LD `BlogPosting` structured data, Open Graph / Twitter cards, canonical URLs
- ✍️ Serif-display typography over UnoCSS `presetTypography`
- 📦 Code blocks with language badges, copy buttons, and proper dark-mode token colors
- 🧩 UnoCSS `presetWind3` + `presetIcons` (lucide), pure static output

## Quick start

```bash
pnpm install
pnpm dev          # http://localhost:4321
```

Build & preview:

```bash
pnpm build
pnpm preview
```

## Writing posts

Add a Markdown file under `src/content/blog/`:

```markdown
---
title: 'Post title'
description: 'One-sentence summary'
publishDate: 2026-08-16
updatedDate: 2026-08-16 # optional
heroImage: # optional — local asset relative to this file, optimized at build
  src: ../../assets/cover.png
  alt: 'Cover description'
tags: [tag-a, tag-b]
draft: false # optional, hidden from lists when true
comment: true # optional, per-post comment toggle
---

Your content here.
```

## Configuration

Everything lives in [`src/site.config.ts`](./src/site.config.ts):

| Section          | What it controls                                                                         |
| ---------------- | ---------------------------------------------------------------------------------------- |
| `site`           | Title, author, avatar, description, language, favicon, OG card                           |
| `header.menu`    | Navigation links                                                                         |
| `footer`         | Copyright, extra links, social icons                                                     |
| `home`           | **Config-driven home page** — hero, posts count, education, skills, tags/friends toggles |
| `blog.pageSize`  | Posts per page                                                                           |
| `search.enabled` | Toggle the search page & index                                                           |
| `comment`        | Waline server URL — leave empty to disable                                               |
| `friends`        | Friend links rendered on `/links` and (optionally) the home page                         |

### Config-driven home page

Sections on the home page render automatically from [`src/site.config.ts`](./src/site.config.ts) → `home`:

```ts
home: {
  hero: {
    tagline: 'Developer / Designer / Photographer', // chip above the name
    location: 'China / QingDao',                    // location chip
    about: 'A short paragraph about yourself…',
    buttons: [{ title: 'More about me', link: '/about' }]
  },
  recentPosts: 5,        // 0 hides the section
  education: [{ school: '…', major: '…', degree: '…', date: '…' }],
  skills: [{ title: 'Program', items: ['Python', 'Java'] }],
  showTags: false,       // optional tag cloud
  showFriends: false     // optional friend links
}
```

Edit the config — sections appear / disappear without touching any component.

## Customizing the look

- Design tokens (colors, radius, fonts): [`src/assets/styles/tokens.css`](./src/assets/styles/tokens.css)
- UnoCSS theme mapping & typography: [`uno.config.ts`](./uno.config.ts)
- Global styles (code blocks, motion, scrollbar): [`src/assets/styles/global.css`](./src/assets/styles/global.css)

## Project structure

```
src/
├── site.config.ts        # all theme configuration
├── content.config.ts     # blog content-collection schema
├── assets/styles/        # design tokens + global styles
├── components/           # Header, Footer, PostCard, Pagination, TOC, Comment
├── layouts/              # BaseLayout, PostLayout
├── pages/                # index, blog, tags, archives, links, about, search, rss, 404
├── utils/                # helpers + server-side collection utilities
└── content/blog/         # your posts (Markdown)
```

## Deployment

`pnpm build` produces a fully static site in `dist/` — host it anywhere (GitHub Pages, Vercel, Netlify, Cloudflare Pages…).

**Before going live:** set your real domain as `site` in [`astro.config.ts`](./astro.config.ts) — sitemap, canonical links and RSS depend on it.

**Performance:** deploy to a platform with a global CDN and automatic compression — Vercel, Netlify and Cloudflare Pages all enable Brotli/gzip and an image CDN by default, so you get those for free.

## Credits & license

Inspired by the design ideas of [astro-theme-pure](https://github.com/cworld1/astro-theme-pure) (Apache-2.0) — same Astro ecosystem, independent implementation. The Shiki code-block pipeline (`src/plugins/shiki-custom-transformers.ts`, `src/plugins/shiki-official/`, `public/icons/code.svg`) is ported from astro-theme-pure (Apache-2.0). Licensed under [MIT](./LICENSE).
