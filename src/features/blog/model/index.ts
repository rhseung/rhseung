import { collectModules } from '@/common/lib';

import type { PostItem } from './types';

export { definePost } from './define';
export { postSchema, type PostFrontmatter } from './schema';
export type { PostHeading, PostItem, PostSummary } from './types';

const modules = import.meta.glob<{ default: PostItem }>('@/content/posts/*/index.ts', {
  eager: true,
});

export const POST_ITEMS: PostItem[] = collectModules(modules);

export function publishedPosts(): PostItem[] {
  return POST_ITEMS.filter((item) => !item.draft);
}
