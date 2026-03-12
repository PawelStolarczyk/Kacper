// src/content/config.ts
import { defineCollection, z } from 'astro:content';

const projects = defineCollection({
  type: 'content',
  schema: z.object({
    title:       z.string(),
    subtitle:    z.string(),
    year:        z.number(),
    tags:        z.array(z.string()),
    accent:      z.string().default('#00E5A0'),
    coverBg:     z.string().default('#0D1520'),
    order:       z.number().default(99),
    featured:    z.boolean().default(false),
    wide:        z.boolean().default(false),
    client:      z.string().optional(),
    role:        z.string().optional(),
    duration:    z.string().optional(),
    tools:       z.array(z.string()).default([]),
    liveUrl:     z.string().optional(),
    stats: z.array(z.object({
      value: z.string(),
      label: z.string(),
    })).default([]),
    seo: z.object({
      description: z.string(),
    }).optional(),
  }),
});

export const collections = { projects };
