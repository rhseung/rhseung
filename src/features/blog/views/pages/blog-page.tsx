import { useTranslation } from 'react-i18next';

import { Empty, EmptyDescription, EmptyHeader, EmptyTitle, SiteDock } from '@/common/components';
import { localeHref, type Language } from '@/common/lib';

import { sortPosts, type PostSummary } from '../../viewmodels';
import { PostListItem } from '../components';

export function BlogPage({ lang, posts }: BlogPage.Props) {
  const { t } = useTranslation('blog');

  const visible = sortPosts(posts);

  return (
    <div className="bg-background min-h-dvh">
      <main className="mx-auto flex max-w-3xl flex-col gap-8 p-4 sm:p-6 md:p-8">
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl font-semibold">{t(($) => $.page.title)}</h1>
        </div>

        {visible.length === 0 ? (
          <Empty>
            <EmptyHeader>
              <EmptyTitle>{t(($) => $.empty.title)}</EmptyTitle>
              <EmptyDescription>{t(($) => $.empty.description)}</EmptyDescription>
            </EmptyHeader>
          </Empty>
        ) : (
          <ul className="flex flex-col gap-8">
            {visible.map((post) => (
              <li key={post.slug}>
                <PostListItem
                  post={post}
                  href={localeHref(post.lang, '/[lang]/blog/[slug]', { slug: post.slug })}
                  showLanguage={post.lang !== lang}
                />
              </li>
            ))}
          </ul>
        )}
      </main>

      <SiteDock lang={lang} current="blog" route={{ to: '/[lang]/blog' }} />
    </div>
  );
}

export declare namespace BlogPage {
  export type Props = {
    lang: Language;
    posts: PostSummary[];
  };
}
