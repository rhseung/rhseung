import type { Post, PostSummary } from '../models';

export function toPostSummary(entry: { id: string; data: Post }): PostSummary {
  const { date, ...rest } = entry.data;
  return { ...rest, slug: entry.id, date: date.toISOString() };
}

export function sortPosts(posts: readonly PostSummary[]): PostSummary[] {
  return [...posts].sort((a, b) => b.date.localeCompare(a.date));
}

export function pickRecent(posts: readonly PostSummary[], count: number): PostSummary[] {
  return sortPosts(posts).slice(0, count);
}
