import { glob } from 'astro/loaders';
import { defineCollection } from 'astro:content';

import { LANGUAGES } from '@/common/lib';
import { postSchema } from '@/features/blog/models';

const bodies = `*/{${LANGUAGES.join(',')}}.mdx`;

const posts = defineCollection({
  loader: glob({ base: './src/content/posts', pattern: bodies }),
  schema: postSchema(),
});

const projects = defineCollection({
  loader: glob({ base: './src/content/projects', pattern: bodies }),
});

export const collections = { posts, projects };
