import { useTranslation } from 'react-i18next';
import { css } from 'styled-system/css';
import { stack } from 'styled-system/patterns';

import { Badge, DetailHeader, SiteDock, TranslationNotice } from '@/common/components';
import { dayjs, localeHref, type Language } from '@/common/lib';
import { metaText, page } from '@/common/styles';

import { PostToc, TocDock } from '../components';

import type { PostHeading, PostSummary } from '../../viewmodels';

const frame = css({
  mx: 'auto',
  display: 'grid',
  w: 'full',
  maxW: '3xl',
  columnGap: '10',
  p: '4',
  sm: { p: '6' },
  md: { p: '8' },
  lg: { maxW: '5xl', gridTemplateColumns: '[minmax(0, 1fr) 13rem]' },
});

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

const meta = stack({ gap: '3' });
const title = css({ textStyle: 'heading.page' });
const summary = css({ color: 'text.muted', textStyle: 'body' });
const tags = css({ display: 'flex', flexWrap: 'wrap', gap: '1' });
const tocFrame = css({ position: 'fixed', top: '[50%]', w: '52', transform: 'translateY(-50%)' });
const toc = css({ maxH: '[calc(100dvh - 336px)]', w: 'full' });

export function PostDetailPage({ lang, post, headings, children }: PostDetailPage.Props) {
  const { t } = useTranslation('blog');
  const shell = page();

  return (
    <div className={shell.root}>
      <div className={frame}>
        <DetailHeader
          lang={lang}
          backHref={localeHref(lang, '/[lang]/blog')}
          backLabel={t(($) => $.detail.back)}
          className={header}
        />

        <main className={main}>
          <header lang={post.bodyLang} className={meta}>
            <time dateTime={post.date} className={metaText}>
              {dayjs(post.date).format('LL')}
            </time>

            <h1 data-vt-title={post.slug} className={title}>
              {post.title}
            </h1>
            <p className={summary}>{post.summary}</p>

            {post.tags.length > 0 && (
              <ul className={tags}>
                {post.tags.map((tag) => (
                  <li key={tag}>
                    <Badge variant="outline">{tag}</Badge>
                  </li>
                ))}
              </ul>
            )}
          </header>

          {post.bodyLang !== lang && <TranslationNotice bodyLang={post.bodyLang} />}

          <div lang={post.bodyLang} className="prose prose-zinc dark:prose-invert max-w-none">
            {children}
          </div>
        </main>

        <aside className={aside}>
          <div className={tocFrame}>
            <PostToc headings={headings} className={toc} />
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
