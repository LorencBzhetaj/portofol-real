import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    seoTitle: z.string(),
    description: z.string(),
    excerpt: z.string(),
    category: z.string(),
    author: z.string(),
    draft: z.boolean().default(true),
    wordCount: z.number(),
    readingTimeMinutes: z.number(),
  }),
});

export const collections = { blog };
