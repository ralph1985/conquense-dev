import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const blog = defineCollection({
  loader: glob({
    pattern: '**/*.md',
    base: './src/content/blog',
    // Slugs are intentionally shared by translated articles. The collection
    // id must still be unique, otherwise one language silently overwrites the
    // other during content sync.
    generateId: ({ data }) => `${data.lang}/${data.slug}`,
  }),
  schema: z.object({
    translationId: z.string(),
    lang: z.enum(['es', 'en']),
    slug: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
    title: z.string().min(10).max(140),
    description: z.string().min(40).max(180),
    publishedAt: z.coerce.date(),
    sourceName: z.string().min(2).max(80),
    sourceTitle: z.string().min(5).max(180),
    sourceUrl: z.url(),
    author: z.string().max(120).optional(),
    tags: z.array(z.string().min(1).max(32)).min(1).max(5),
    readingTime: z.number().int().positive().max(30),
    aiDisclosure: z.string().min(20).max(240),
  }),
});

export const collections = { blog };
