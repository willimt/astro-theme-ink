import { glob } from 'astro/loaders'
import { defineCollection, z } from 'astro:content'

function dedupeTags(tags: string[]) {
  const seen = new Set<string>()
  return tags
    .map((t) => t.trim().toLowerCase())
    .filter((t) => (t && !seen.has(t) ? (seen.add(t), true) : false))
}

const blog = defineCollection({
  loader: glob({ base: './src/content/blog', pattern: '**/*.{md,mdx}' }),
  schema: z.object({
    /** Post title */
    title: z.string().max(80),
    /** Short summary shown in lists and meta description */
    description: z.string().max(200),
    publishDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    tags: z.array(z.string()).default([]).transform(dedupeTags),
    /** Optional cover image; a path under `public/`, e.g. `/covers/welcome.png` */
    heroImage: z.string().optional(),
    /** Hidden from lists but still accessible by URL */
    draft: z.boolean().default(false),
    /** Per-post comment toggle */
    comment: z.boolean().default(true)
  })
})

export const collections = { blog }
