/** Static UnoCSS icon classes for common social platforms.
 *  UnoCSS can only detect literal class names, so lookups happen here. */
export const SOCIAL_ICONS: Record<string, string> = {
  github: 'i-lucide-github',
  gitlab: 'i-lucide-gitlab',
  rss: 'i-lucide-rss',
  mail: 'i-lucide-mail',
  x: 'i-lucide-twitter',
  weibo: 'i-lucide-globe'
}

/** Join class names, skipping falsy values. */
export function cn(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(' ')
}

/** Format a date using the site locale, e.g. "August 16, 2026". */
export function formatDate(
  date: Date,
  locale = 'en-US',
  options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' }
): string {
  return new Intl.DateTimeFormat(locale, options).format(date)
}

/** Rough reading time in minutes based on CJK-aware word counting. */
export function readingTime(text: string, cjkPerMinute = 350, latinPerMinute = 200): number {
  const cjk = (text.match(/[\u4e00-\u9fff\u3040-\u30ff\uac00-\ud7af]/g) || []).length
  const latin = (
    text.replace(/[\u4e00-\u9fff\u3040-\u30ff\uac00-\ud7af]/g, ' ').match(/\S+/g) || []
  ).length
  const minutes = cjk / cjkPerMinute + latin / latinPerMinute
  return Math.max(1, Math.ceil(minutes))
}

/**
 * Strip Markdown frontmatter & syntax to plain text.
 * Used for the client-side search index (kept dependency-free).
 */
export function stripMarkdown(raw: string): string {
  return raw
    .replace(/^---[\s\S]*?---/, '') // frontmatter
    .replace(/```[\s\S]*?```/g, ' ') // code fences
    .replace(/`([^`]+)`/g, '$1') // inline code
    .replace(/!\[([^\]]*)\]\([^)]*\)/g, ' $1 ') // images
    .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1') // links
    .replace(/^\s{0,3}#{1,6}\s+/gm, '') // headings
    .replace(/^\s{0,3}>\s?/gm, '') // blockquotes
    .replace(/[*_~]{1,3}([^*_~]+)[*_~]{1,3}/g, '$1') // emphasis
    .replace(/[|\-*+]\s+/g, ' ') // list markers
    .replace(/<[^>]+>/g, ' ') // stray html
    .replace(/\s+/g, ' ')
    .trim()
}
