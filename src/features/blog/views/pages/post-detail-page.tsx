import { useTranslation } from 'react-i18next';

import { Badge, DetailHeader, SiteDock } from '@/common/components';
import { dayjs, localeHref } from '@/common/lib';

import { PostToc, TocDock } from '../components';

import type { PostHeading, PostSummary } from '../../viewmodels';

export function PostDetailPage({ post, headings, children }: PostDetailPage.Props) {
  const { t } = useTranslation('blog');

  const lang = post.lang;

  return (
    <div className="bg-background min-h-dvh">
      <div className="mx-auto grid w-full max-w-3xl gap-x-10 p-4 sm:p-6 md:p-8 lg:max-w-5xl lg:grid-cols-[minmax(0,1fr)_13rem]">
        <DetailHeader
          lang={lang}
          backHref={localeHref(lang, '/blog')}
          backLabel={t(($) => $.detail.back)}
          className="lg:col-start-1 lg:col-end-3 lg:row-start-1"
        />

        <main className="flex min-w-0 flex-col gap-8 lg:col-start-1 lg:row-start-2">
          <header className="flex flex-col gap-3">
            <time dateTime={post.date} className="text-muted-foreground text-xs tabular-nums">
              {dayjs(post.date).format('LL')}
            </time>

            <h1 data-vt-title={post.slug} className="text-3xl font-extrabold tracking-tight">
              {post.title}
            </h1>
            <p className="text-muted-foreground">{post.summary}</p>

            {post.tags.length > 0 && (
              <ul className="flex flex-wrap gap-1">
                {post.tags.map((tag) => (
                  <li key={tag}>
                    <Badge variant="outline">{tag}</Badge>
                  </li>
                ))}
              </ul>
            )}
          </header>

          <div className="prose prose-zinc dark:prose-invert max-w-none">{children}</div>
        </main>

        {/* 셋 다 행·열을 명시해야 한다. 하나라도 자동 배치면 암시적 행·열이 생겨 칸이 어긋난다. */}
        <aside className="hidden lg:col-start-2 lg:row-start-1 lg:block">
          <div className="fixed top-1/2 w-52 -translate-y-1/2">
            <PostToc headings={headings} className="max-h-[calc(100dvh-336px)] w-full" />
          </div>
        </aside>
      </div>

      <TocDock headings={headings} />

      <SiteDock lang={lang} current="blog" />
    </div>
  );
}

export declare namespace PostDetailPage {
  export type Props = {
    post: PostSummary;
    headings: readonly PostHeading[];
    children: React.ReactNode;
  };
}
