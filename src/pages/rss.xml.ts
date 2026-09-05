import rss from '@astrojs/rss';
import { getCollection, type CollectionEntry } from 'astro:content';

import { DEFAULT_LANGUAGE, i18n, SITE, localeHref } from '@/common/lib';
import { pickBody, publishedPosts, sortPosts, toPostSummary } from '@/features/blog';

import type { APIContext } from 'astro';

export async function GET(context: APIContext) {
  const entries: CollectionEntry<'posts'>[] = await getCollection('posts');
  const posts = sortPosts(
    publishedPosts().map((item) =>
      toPostSummary(item, pickBody(entries, item.slug, DEFAULT_LANGUAGE)),
    ),
  );

  return rss({
    title: SITE.title,
    description: i18n.getFixedT(DEFAULT_LANGUAGE, 'common')(($) => $.site.description),
    site: context.site ?? SITE.url,
    customData: `<language>${DEFAULT_LANGUAGE}</language>`,
    items: posts.map((post) => ({
      title: post.title,
      description: post.summary,
      pubDate: new Date(post.date),
      link: localeHref(post.bodyLang, '/[lang]/blog/[slug]', { slug: post.slug }),
      categories: [...post.tags],
    })),
  });
}
