import { glob } from 'astro/loaders';
import { defineCollection } from 'astro:content';

import { resumeSchema } from '@/features/about/models';
import { postSchema } from '@/features/blog/models';
import { projectSchema } from '@/features/projects/models';

const projects = defineCollection({
  loader: glob({ base: './src/content/projects', pattern: '**/*.mdx' }),
  schema: projectSchema(),
});

const posts = defineCollection({
  loader: glob({ base: './src/content/posts', pattern: '**/*.mdx' }),
  schema: postSchema(),
});

const resume = defineCollection({
  loader: glob({ base: './src/content/resume', pattern: '*.yaml' }),
  schema: resumeSchema(),
});

export const collections = { posts, projects, resume };
