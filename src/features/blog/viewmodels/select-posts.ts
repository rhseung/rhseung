import { omit } from 'es-toolkit';

import { LANGUAGES, type Language } from '@/common/lib';

import type { PostFrontmatter, PostItem, PostSummary } from '../models';

export type PostBody<E> = { bodyLang: Language; entry: E };

export function pickBody<E extends { id: string }>(
  entries: readonly E[],
  slug: string,
  lang: Language,
): PostBody<E> {
  const bodies = new Map(
    entries
      .filter((entry) => entry.id.startsWith(`${slug}/`))
      .map((entry) => [entry.id.slice(slug.length + 1), entry] as const),
  );

  for (const bodyLang of [lang, ...LANGUAGES]) {
    const entry = bodies.get(bodyLang);
    if (entry !== undefined) return { bodyLang, entry };
  }

  throw new Error(`${slug}: 본문 MDX 가 하나도 없습니다`);
}

export function toPostSummary(
  item: PostItem,
  body: PostBody<{ data: PostFrontmatter }>,
): PostSummary {
  return { ...omit(item, ['draft']), ...body.entry.data, bodyLang: body.bodyLang };
}

export function sortPosts(posts: readonly PostSummary[]): PostSummary[] {
  return [...posts].sort((a, b) => b.date.localeCompare(a.date));
}

export function pickRecent(posts: readonly PostSummary[], count: number): PostSummary[] {
  return sortPosts(posts).slice(0, count);
}
