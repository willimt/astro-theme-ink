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

export interface EducationItem {
  school: string
  /** e.g. "计算机技术" */
  major?: string
  /** e.g. "硕士" */
  degree?: string
  /** e.g. "August 2021 - July 2024" */
  date: string
}

export interface SkillGroup {
  title: string
  items: string[]
}

export interface HomeHeroConfig {
  /** Tagline chip above the name, e.g. "Developer / Designer / Photographer" */
  tagline?: string
  /** Location label, e.g. "China / QingDao" */
  location?: string
  /** About paragraph under the name */
  about: string
  /** Action buttons */
  buttons?: { title: string; link: string }[]
}

/** Home page content — edit this file and sections appear/disappear automatically. */
export interface HomeConfig {
  hero: HomeHeroConfig
  /** How many recent posts to show (0 hides the section) */
  recentPosts: number
  /** Education timeline; renders when non-empty */
  education?: EducationItem[]
  /** Skill groups; renders when non-empty */
  skills?: SkillGroup[]
  /** Show the tag cloud on the home page */
  showTags: boolean
  /** Show friend links on the home page */
  showFriends: boolean
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
    /** Avatar image shown on the home page hero; a path under `public/` */
    avatar: string
    /** Open-graph image path under `public/` */
    ogImage: string
    /** Default color palette for first-time visitors: 'ink' (warm) | 'fresh' (mint) */
    palette: 'ink' | 'fresh'
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
  /** Home page content (config-driven sections) */
  home: HomeConfig
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
    title: "Hansen's ink",
    author: 'Hansen W.',
    description: "Hansen's ink — 记录技术、生活与思考。",
    lang: 'en',
    favicon: '/favicon/favicon.ico',
    avatar: '/avatar.png',
    ogImage: '/og-card.svg',
    palette: 'fresh',
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
    copyright: `© 2020 - ${new Date().getFullYear()} Hansen W.`,
    links: [{ title: 'RSS', url: '/rss.xml' }],
    social: {
      github: { label: 'GitHub', url: 'https://github.com/willimt' }
    }
  },

  blog: {
    pageSize: 8
  },

  // Home page content — edit this and the sections render automatically
  home: {
    hero: {
      tagline: 'Developer / Designer / Photographer',
      location: 'China / QingDao',
      about:
        '你好，我是 Hansen，一名偶尔 996 的社畜，业余时间喜欢折腾各种技术和工具，追求高效和极简的生活方式。目前就职于一家芯片设计公司，主要从事软件开发和系统、工具的维护工作，最近在研究大模型在企业的实际应用落地。平时喜欢玩游戏、听音乐、看电影、拍照。',
      buttons: [{ title: 'More about me', link: '/about' }]
    },
    recentPosts: 5,
    education: [
      {
        school: '西南交通大学 计算机与人工智能学院',
        major: '计算机技术',
        degree: '硕士',
        date: 'August 2021 - July 2024'
      },
      {
        school: '西南交通大学 计算机与人工智能学院',
        major: '计算机科学与技术',
        degree: '本科',
        date: 'August 2017 - July 2021'
      }
    ],
    skills: [
      { title: 'Program', items: ['Python', 'Java', 'C', 'C++', 'SQL', 'Shell'] },
      { title: 'Web', items: ['TypeScript', 'Vue.js', 'Node.js', 'JavaScript', 'HTML', 'CSS'] },
      {
        title: 'Tools',
        items: [
          'VS Code',
          'Vim',
          'Emacs',
          'Git',
          'Docker',
          'Linux',
          'Kafka',
          'Redis',
          'Nginx',
          'CMake'
        ]
      },
      { title: 'Text', items: ['Markdown', 'LaTeX'] }
    ],
    showTags: false,
    showFriends: false
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
    lang: 'en'
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
