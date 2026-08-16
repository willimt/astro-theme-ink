/**
 * astro-theme-ink · site configuration
 * Everything the theme needs in one typed object — no virtual modules,
 * just import { config } from '@/site-config' where needed.
 */

export interface NavItem {
  title: string
  link: string
}

export interface FriendLink {
  name: string
  desc: string
  url: string
  /** Absolute URL of the avatar image. Optional. */
  avatar?: string
}

export interface Config {
  /** Site identity */
  site: {
    title: string
    /** Shown on the home page hero and in the footer copyright */
    author: string
    description: string
    lang: string
    favicon: string
    /** Open-graph image path under `public/` */
    ogImage: string
    /** e.g. " · " */
    titleDelimiter: string
  }
  header: {
    menu: NavItem[]
  }
  footer: {
    /** Shown as `© <year> <author>`; set a custom string to override entirely */
    copyright?: string
    /** Extra plain-text links rendered next to the copyright */
    links?: { title: string; url: string }[]
    social?: Record<string, { label: string; url: string }>
  }
  blog: {
    pageSize: number
  }
  /** Lightweight client-side search (no external indexer) */
  search: {
    enabled: boolean
  }
  /**
   * Giscus comment system. Leave `repo` empty to disable.
   * See https://giscus.app to obtain the ids.
   */
  comment: {
    provider: 'giscus'
    repo: string
    repoId: string
    category: string
    categoryId: string
    lang: string
  }
  friends: FriendLink[]
}

export const config: Config = {
  site: {
    title: 'Astro Theme Ink',
    author: 'Ink Lab',
    description: 'A warm, paper-feel personal blog theme — ink on paper.',
    lang: 'zh-CN',
    favicon: '/favicon.svg',
    ogImage: '/favicon.svg',
    titleDelimiter: ' · '
  },

  header: {
    menu: [
      { title: 'Blog', link: '/blog' },
      { title: 'Tags', link: '/tags' },
      { title: 'Links', link: '/links' },
      { title: 'About', link: '/about' }
    ]
  },

  footer: {
    // copyright: `© 2019 - ${new Date().getFullYear()} Ink Lab`,
    links: [{ title: 'RSS', url: '/rss.xml' }],
    social: {
      github: { label: 'GitHub', url: 'https://github.com/' }
    }
  },

  blog: {
    pageSize: 8
  },

  search: {
    enabled: true
  },

  comment: {
    provider: 'giscus',
    // Fill in your giscus.app settings to enable comments:
    repo: '',
    repoId: '',
    category: 'Announcements',
    categoryId: '',
    lang: 'zh-CN'
  },

  friends: [
    {
      name: 'Astro',
      desc: 'The web framework for content-driven websites.',
      url: 'https://astro.build',
      avatar: 'https://astro.build/favicon.svg'
    },
    {
      name: 'UnoCSS',
      desc: 'The instant atomic CSS engine.',
      url: 'https://unocss.dev',
      avatar: 'https://unocss.dev/favicon.svg'
    }
  ]
}
