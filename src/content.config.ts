import { glob } from 'astro/loaders';
import { defineCollection } from 'astro:content';

import { postSchema } from '@/features/blog/models';

const posts = defineCollection({
  loader: glob({ base: './src/content/posts', pattern: '**/*.mdx' }),
  schema: postSchema(),
});

const projects = defineCollection({
  loader: glob({ base: './src/content/projects', pattern: '*/{ko,en}.mdx' }),
});

export const collections = { posts, projects };
