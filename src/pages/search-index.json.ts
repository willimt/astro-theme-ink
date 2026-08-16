import type { APIRoute } from 'astro'
import { getCollection } from 'astro:content'

import { stripMarkdown } from '@/utils'

const rawPosts = import.meta.glob('/src/content/blog/**/*.{md,mdx}', {
  query: '?raw',
  import: 'default',
  eager: true
})

/**
 * Prerendered JSON index used by the client-side search page.
 * Kept dependency-free: plain markdown is stripped to text at build time.
 */
export const GET: APIRoute = async () => {
  const posts = await getCollection('blog', ({ data }) => !data.draft)

  const index = posts.map((post) => {
    const raw =
      (rawPosts[`/src/content/blog/${post.id}.md`] as string | undefined) ??
      (rawPosts[`/src/content/blog/${post.id}.mdx`] as string | undefined) ??
      ''
    return {
      slug: post.id,
      title: post.data.title,
      description: post.data.description,
      tags: post.data.tags,
      date: post.data.publishDate.toISOString(),
      content: stripMarkdown(raw).slice(0, 4000)
    }
  })

  return new Response(JSON.stringify(index), {
    headers: { 'Content-Type': 'application/json; charset=utf-8' }
  })
}
