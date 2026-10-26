import { getCollection, render, type CollectionEntry } from 'astro:content';

import { languagePaths, LANGUAGES } from '@/common/lib';

import { pickBody, toPostSummary, tocHeadings } from './lib';
import { publishedPosts } from './model';

async function entries() {
  return (await getCollection('posts')) as CollectionEntry<'posts'>[];
}

export async function blogPaths() {
  const posts = await entries();

  return languagePaths().map((path) => ({
    ...path,
    props: {
      ...path.props,
      posts: publishedPosts().map((item) =>
        toPostSummary(item, pickBody(posts, item.slug, path.params.lang)),
      ),
    },
  }));
}

export async function postPaths() {
  const posts = await entries();

  return Promise.all(
    LANGUAGES.flatMap((lang) =>
      publishedPosts().map(async (item) => {
        const body = pickBody(posts, item.slug, lang);
        const { Content, headings } = await render(body.entry);

        return {
          params: { lang, slug: item.slug },
          props: {
            lang,
            post: toPostSummary(item, body),
            headings: tocHeadings(headings),
            Content,
          },
        };
      }),
    ),
  );
}
