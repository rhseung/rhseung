import { SITE } from './site';

import type { Language } from '../i18n/languages';

export type PageSchema = {
  type: 'website' | 'article';
  lang: Language;
  title: string;
  description: string;
  author: string;
  canonical: string;
  published?: string;
  image?: string;
};

export function pageSchema({
  type,
  lang,
  title,
  description,
  author,
  canonical,
  published,
  image,
}: PageSchema): Record<string, unknown> {
  const person = { '@type': 'Person', name: author, url: SITE.url };

  if (type === 'website') {
    return {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: SITE.title,
      url: SITE.url,
      inLanguage: lang,
      author: person,
    };
  }

  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: title,
    description,
    datePublished: published,
    inLanguage: lang,
    mainEntityOfPage: canonical,
    image,
    author: person,
  };
}
