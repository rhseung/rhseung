import { z } from 'zod';

import { LANGUAGES } from '@/common/lib';

export const POST_SUMMARY_MAX = 120;

export const POST_TAGS_MAX = 5;

export const postSchema = () =>
  z.object({
    title: z.string().min(1),
    date: z.coerce.date(),
    summary: z.string().min(1).max(POST_SUMMARY_MAX),
    lang: z.enum(LANGUAGES),
    tags: z.array(z.string()).max(POST_TAGS_MAX).default([]),
    draft: z.boolean().default(false),
  });

export type Post = z.infer<ReturnType<typeof postSchema>>;

export type PostSummary = Omit<Post, 'date'> & { slug: string; date: string };
