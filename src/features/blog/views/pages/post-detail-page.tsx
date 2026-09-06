import { useTranslation } from 'react-i18next';
import { css } from 'styled-system/css';
import { stack } from 'styled-system/patterns';

import { Badge, DetailHeader, Prose, SiteDock, TranslationNotice } from '@/common/components';
import { dayjs, localeHref, type Language } from '@/common/lib';
import { metaText, page } from '@/common/styles';

import { PostToc, TocDock } from '../components';

import type { PostHeading, PostSummary } from '../../viewmodels';

// 셋 다 행·열을 명시해야 한다. 하나라도 자동 배치면 암시적 행·열이 생겨 칸이 어긋난다.
const header = css({ lg: { gridColumn: '[1 / 3]', gridRow: '[1]' } });
const main = css({
  display: 'flex',
  minW: '0',
  flexDirection: 'column',
  gap: '8',
  lg: { gridColumn: '[1]', gridRow: '[2]' },
});
const aside = css({ display: 'none', lg: { display: 'block', gridColumn: '[2]', gridRow: '[1]' } });

export function PostDetailPage({ lang, post, headings, children }: PostDetailPage.Props) {
  const { t } = useTranslation('blog');
  const shell = page();

  return (
    <div className={shell.root}>
      <div
        className={css({
          mx: 'auto',
          display: 'grid',
          w: 'full',
          maxW: '3xl',
          columnGap: '10',
          p: '4',
          sm: { p: '6' },
          md: { p: '8' },
          lg: { maxW: '5xl', gridTemplateColumns: '[minmax(0, 1fr) 13rem]' },
        })}
      >
        <DetailHeader
          lang={lang}
          backHref={localeHref(lang, '/[lang]/blog')}
          backLabel={t(($) => $.detail.back)}
          className={header}
        />

        <main className={main}>
          <header lang={post.bodyLang} className={stack({ gap: '3' })}>
            <time dateTime={post.date} className={metaText}>
              {dayjs(post.date).format('LL')}
            </time>

            <h1 data-vt-title={post.slug} className={css({ textStyle: 'heading.page' })}>
              {post.title}
            </h1>
            <p className={css({ color: 'text.muted', textStyle: 'body' })}>{post.summary}</p>

            {post.tags.length > 0 && (
              <ul className={css({ display: 'flex', flexWrap: 'wrap', gap: '1' })}>
                {post.tags.map((tag) => (
                  <li key={tag}>
                    <Badge variant="outline">{tag}</Badge>
                  </li>
                ))}
              </ul>
            )}
          </header>

          {post.bodyLang !== lang && <TranslationNotice bodyLang={post.bodyLang} />}

          <Prose lang={post.bodyLang}>{children}</Prose>
        </main>

        <aside className={aside}>
          <div
            className={css({
              position: 'fixed',
              top: '[50%]',
              w: '52',
              transform: 'translateY(-50%)',
            })}
          >
            <PostToc
              headings={headings}
              className={css({ maxH: '[calc(100dvh - 336px)]', w: 'full' })}
            />
          </div>
        </aside>
      </div>

      <TocDock headings={headings} />

      <SiteDock
        lang={lang}
        current="blog"
        route={{ to: '/[lang]/blog/[slug]', params: { slug: post.slug } }}
      />
    </div>
  );
}

export declare namespace PostDetailPage {
  export type Props = {
    lang: Language;
    post: PostSummary;
    headings: readonly PostHeading[];
    children: React.ReactNode;
  };
}
