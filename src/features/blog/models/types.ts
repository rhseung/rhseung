import type { Language } from '@/common/lib';

import type { PostFrontmatter } from './schema';

export type PostItem = {
  slug: string;
  date: string;
  tags: readonly string[];
  draft?: boolean;
};

export type PostSummary = PostFrontmatter & Omit<PostItem, 'draft'> & { bodyLang: Language };

/** `MarkdownHeading` 을 다시 적는다. models 는 `astro:content` 를 import 할 수 없다. */
export type PostHeading = { depth: number; slug: string; text: string };
