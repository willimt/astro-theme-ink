import rss from '@astrojs/rss'
import type { APIContext } from 'astro'

import { config } from '@/site-config'
import { getBlogCollection, postUrl, sortMDByDate } from '@/utils/server'

export async function GET(context: APIContext) {
  const posts = sortMDByDate(await getBlogCollection())

  return rss({
    title: config.site.title,
    description: config.site.description,
    site: context.site ?? 'https://example.com',
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.publishDate,
      link: postUrl(post.id),
      categories: post.data.tags,
      content: post.body // full post (markdown) so subscribers get the whole article
    })),
    customData: `<language>${config.site.lang}</language>`
  })
}
