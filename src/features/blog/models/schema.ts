import { z } from 'zod';

export const POST_SUMMARY_MAX = 120;

export const postSchema = () =>
  z.strictObject({
    title: z.string().min(1),
    summary: z.string().min(1).max(POST_SUMMARY_MAX),
  });

export type PostFrontmatter = z.infer<ReturnType<typeof postSchema>>;
