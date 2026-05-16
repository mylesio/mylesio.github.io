import { defineCollection, z } from 'astro:content';

const notes = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    date: z.coerce.date(),
    tags: z.array(z.string()).optional(),
    draft: z.boolean().optional().default(false),
    lang: z.enum(['en', 'zh']).optional().default('en'),
    enSlug: z.string().optional(),   // zh note → en counterpart
    zhSlug: z.string().optional(),   // en note → zh counterpart
  }),
});

export const collections = { notes };
