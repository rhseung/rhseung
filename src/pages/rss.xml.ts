import rss from '@astrojs/rss';
import { getCollection, type CollectionEntry } from 'astro:content';

import { DEFAULT_LANGUAGE, SITE, localeHref } from '@/common/lib';
import { sortPosts, toPostSummary } from '@/features/blog';

import type { APIContext } from 'astro';

/**
 * 피드는 하나다. 글이 언어별로 갈리지 않고 쓴 언어 그대로 섞여 있으므로, 언어별 피드를
 * 나누면 구독자가 절반을 놓친다. 항목마다 `xml:lang`을 달아 구분만 시켜준다.
 */
export async function GET(context: APIContext) {
  const entries: CollectionEntry<'posts'>[] = await getCollection(
    'posts',
    ({ data }: CollectionEntry<'posts'>) => !data.draft,
  );
  const posts = sortPosts(entries.map(toPostSummary));

  return rss({
    title: SITE.title[DEFAULT_LANGUAGE],
    description: SITE.description[DEFAULT_LANGUAGE],
    site: context.site ?? SITE.url,
    items: posts.map((post) => ({
      title: post.title,
      description: post.summary,
      pubDate: new Date(post.date),
      link: localeHref(post.lang, `/blog/${post.slug}`),
      categories: [...post.tags],
      customData: `<language>${post.lang}</language>`,
    })),
  });
}
