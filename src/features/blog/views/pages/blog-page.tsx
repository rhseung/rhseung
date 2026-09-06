import { useTranslation } from 'react-i18next';
import { css } from 'styled-system/css';
import { stack } from 'styled-system/patterns';

import { Empty, EmptyDescription, EmptyHeader, EmptyTitle, SiteDock } from '@/common/components';
import { localeHref, type Language } from '@/common/lib';
import { page } from '@/common/styles';

import { sortPosts, type PostSummary } from '../../viewmodels';
import { PostListItem } from '../components';

const title = css({ textStyle: 'heading.page' });

export function BlogPage({ lang, posts }: BlogPage.Props) {
  const { t } = useTranslation('blog');
  const shell = page();

  const visible = sortPosts(posts);

  return (
    <div className={shell.root}>
      <main className={shell.main}>
        <h1 className={title}>{t(($) => $.page.title)}</h1>

        {visible.length === 0 ? (
          <Empty>
            <EmptyHeader>
              <EmptyTitle>{t(($) => $.empty.title)}</EmptyTitle>
              <EmptyDescription>{t(($) => $.empty.description)}</EmptyDescription>
            </EmptyHeader>
          </Empty>
        ) : (
          <ul className={stack({ gap: '8' })}>
            {visible.map((post) => (
              <li key={post.slug}>
                <PostListItem
                  post={post}
                  href={localeHref(lang, '/[lang]/blog/[slug]', { slug: post.slug })}
                  showLanguage={post.bodyLang !== lang}
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
