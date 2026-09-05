import { z } from 'zod';

export const POST_SUMMARY_MAX = 120;

export const postSchema = () =>
  z
    .object({
      title: z.string().min(1),
      summary: z.string().min(1).max(POST_SUMMARY_MAX),
    })
    .strict();

export type PostFrontmatter = z.infer<ReturnType<typeof postSchema>>;
