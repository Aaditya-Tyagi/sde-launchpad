import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const lessons = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/lessons' }),
  schema: z.object({
    title: z.string(),
    track: z.enum([
      'quick-wins',
      'javascript',
      'react-native',
      'dsa',
      'system-design',
      'behavioral',
      'ai-engineering',
      'js-output',
      'lld',
      'frontend-system-design',
      'hld',
      'backend',
      // QA / Automation program
      'qa-foundations',
      'qa-programming',
      'qa-web',
      'qa-api',
      'qa-framework',
      'qa-cicd',
      'qa-performance',
      'qa-ai',
      'qa-mobile',
      'qa-career',
      'qa-cheatsheets',
    ]),
    summary: z.string(),
    order: z.number().default(0),
    est: z.number().default(15), // estimated minutes
    difficulty: z.enum(['easy', 'medium', 'hard']).optional(),
    priority: z.enum(['must', 'deep', 'know']).optional(),
    tags: z.array(z.string()).default([]),
    prereqs: z.array(z.string()).default([]),
    whyAsked: z.string().optional(),
    followUps: z.array(z.string()).default([]),
    resources: z.array(z.object({ label: z.string(), url: z.string() })).default([]),
    draft: z.boolean().default(false),
  }),
});

export const collections = { lessons };
