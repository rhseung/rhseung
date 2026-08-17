import { glob } from 'astro/loaders';
import { defineCollection } from 'astro:content';

import { resumeSchema } from '@/features/about/models';
import { postSchema } from '@/features/blog/models';
import { projectSchema } from '@/features/projects/models';

/**
 * 스키마는 Model 계층이 소유한다 — 이유는 `projects/models/index.ts` 참고.
 * 언어는 디렉토리로 가르고, 슬러그가 같은 게 곧 hreflang 짝이다.
 */
const projects = defineCollection({
  loader: glob({ base: './src/content/projects', pattern: '**/*.mdx' }),
  schema: projectSchema,
});

/** 글은 번역하지 않는다 — 언어가 디렉토리가 아니라 frontmatter 필드다. */
const posts = defineCollection({
  loader: glob({ base: './src/content/posts', pattern: '**/*.mdx' }),
  schema: postSchema,
});

/** 본문 없이 구조만 있는 데이터라 MDX가 아니라 yaml이다. id가 곧 언어(`ko`/`en`). */
const resume = defineCollection({
  loader: glob({ base: './src/content/resume', pattern: '*.yaml' }),
  schema: resumeSchema,
});

export const collections = { posts, projects, resume };
