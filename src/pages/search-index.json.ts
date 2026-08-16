import type { APIRoute } from 'astro'
import { getCollection } from 'astro:content'

import { stripMarkdown } from '@/utils'
import { getPostRawMarkdown } from '@/utils/server'

/**
 * Prerendered JSON index used by the client-side search page.
 * Kept dependency-free: plain markdown is stripped to text at build time.
 */
export const GET: APIRoute = async () => {
  const posts = await getCollection('blog', ({ data }) => !data.draft)

  const index = posts.map((post) => ({
    slug: post.id,
    title: post.data.title,
    description: post.data.description,
    tags: post.data.tags,
    date: post.data.publishDate.toISOString(),
    content: stripMarkdown(getPostRawMarkdown(post.id)).slice(0, 4000)
  }))

  return new Response(JSON.stringify(index), {
    headers: { 'Content-Type': 'application/json; charset=utf-8' }
  })
}
