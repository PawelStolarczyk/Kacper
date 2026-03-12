import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const projects = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    subtitle: z.string(),
    year: z.number(),
    tags: z.array(z.string()),
    accent: z.string().optional(),
    coverBg: z.string().optional(),
    order: z.number().optional(),
    featured: z.boolean().optional(),
    wide: z.boolean().optional(),
    client: z.string().optional(),
    role: z.string().optional(),
    duration: z.string().optional(),
    tools: z.array(z.string()).optional(),
    liveUrl: z.string().optional(),
    caseUrl: z.string().optional(),
    stats: z.array(z.object({
      value: z.string(),
      label: z.string(),
    })).optional(),
    seo: z.object({
      description: z.string(),
    }).optional(),
  }),
});

export const collections = { projects };
