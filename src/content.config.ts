import { glob } from 'astro/loaders';
import { defineCollection } from 'astro:content';

import { postSchema } from '@/features/blog/models';
import { projectSchema } from '@/features/projects/models';
import {
  awardSchema,
  educationSchema,
  experienceSchema,
  resumeSchema,
  skillGroupSchema,
} from '@/features/resume/models';

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

const experience = defineCollection({
  loader: glob({ base: './src/content/experience', pattern: '**/*.mdx' }),
  schema: experienceSchema(),
});

const education = defineCollection({
  loader: glob({ base: './src/content/education', pattern: '**/*.mdx' }),
  schema: educationSchema(),
});

const awards = defineCollection({
  loader: glob({ base: './src/content/awards', pattern: '**/*.mdx' }),
  schema: awardSchema(),
});

const skills = defineCollection({
  loader: glob({ base: './src/content/skills', pattern: '**/*.mdx' }),
  schema: skillGroupSchema(),
});

export const collections = { awards, education, experience, posts, projects, resume, skills };
