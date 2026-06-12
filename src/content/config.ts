import { defineCollection, z } from 'astro:content';

const notes = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    date: z.coerce.date(),
    tags: z.array(z.string()).optional(),
    draft: z.boolean().optional().default(false),
    archived: z.boolean().optional().default(false),
    lang: z.enum(['en', 'zh']).optional().default('en'),
    enSlug: z.string().optional(),   // zh note → en counterpart
    zhSlug: z.string().optional(),   // en note → zh counterpart
  }),
});

const stream = defineCollection({
  type: 'content',
  schema: z.object({
    date: z.coerce.date(),
    // optional: zh pair for bilingual snippets
    zh: z.string().optional(),
  }),
});

const tutor = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    subject: z.enum(['math', 'physics', 'chemistry', 'english', 'chinese', 'history', 'politics']),
    grade: z.enum(['8', '9']),
    semester: z.enum(['上', '下']),
    chapter: z.number(),
    lesson: z.number(),
    description: z.string().optional(),
    prerequisites: z.array(z.string()).optional(),
    estimatedMinutes: z.number().optional().default(15),
    tags: z.array(z.string()).optional(),
  }),
});

export const collections = { notes, stream, tutor };
