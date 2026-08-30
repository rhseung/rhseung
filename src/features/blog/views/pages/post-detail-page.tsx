import { useTranslation } from 'react-i18next';

import { Badge, DetailHeader, SiteDock } from '@/common/components';
import { dayjs, localeHref } from '@/common/lib';

import type { PostSummary } from '../../viewmodels';

export function PostDetailPage({ post, children }: PostDetailPage.Props) {
  const { t } = useTranslation('blog');

  const lang = post.lang;

  return (
    <div className="bg-background min-h-dvh">
      <div className="mx-auto w-full max-w-3xl px-4">
        <DetailHeader
          lang={lang}
          backHref={localeHref(lang, '/blog')}
          backLabel={t(($) => $.detail.back)}
        />

        <main className="flex flex-col gap-8 pb-12">
          <header className="flex flex-col gap-3">
            <time dateTime={post.date} className="text-muted-foreground text-xs tabular-nums">
              {dayjs(post.date).format('LL')}
            </time>

            <h1 data-vt-title={post.slug} className="text-3xl font-semibold tracking-tight">
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
      </div>

      <SiteDock lang={lang} current="blog" />
    </div>
  );
}

export declare namespace PostDetailPage {
  export type Props = {
    post: PostSummary;
    children: React.ReactNode;
  };
}
