import { glob } from 'astro/loaders';
import { defineCollection } from 'astro:content';

import { postSchema } from '@/features/blog/models';

/**
 * 컬렉션에는 **본문이 있는 것만** 둔다. 경력·학력·대회·기술처럼 본문이 없는 구조 데이터는
 * feature 의 `models` TS 모듈에 있다 — 거기서는 언어를 빠뜨리면 컴파일이 깨지고,
 * 언어 무관 필드가 한 곳에만 있어 어긋날 수가 없다.
 */
const posts = defineCollection({
  loader: glob({ base: './src/content/posts', pattern: '**/*.mdx' }),
  schema: postSchema(),
});

/**
 * 프로젝트 폴더 하나에 `index.ts`(메타데이터)와 언어별 본문이 같이 산다. 여기는 본문만 본다 —
 * frontmatter 가 아예 없어서 스키마도 없다.
 */
const projects = defineCollection({
  loader: glob({ base: './src/content/projects', pattern: '*/{ko,en}.mdx' }),
});

export const collections = { posts, projects };
