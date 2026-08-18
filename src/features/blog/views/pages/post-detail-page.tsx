import { ArrowLeftIcon } from '@phosphor-icons/react';
import { useTranslation } from 'react-i18next';

import { Badge, SiteDock, buttonVariants } from '@/common/components';
import { dayjs, localeHref } from '@/common/lib';
import { cn } from '@/common/utils';

import type { PostSummary } from '../../viewmodels';

export function PostDetailPage({ post, children }: PostDetailPage.Props) {
  const { t } = useTranslation('blog');

  const lang = post.lang;

  return (
    <div className="bg-background min-h-dvh">
      <main className="mx-auto flex max-w-3xl flex-col gap-8 px-4 py-12">
        <a
          href={localeHref(lang, '/blog')}
          className={cn(buttonVariants({ variant: 'ghost', size: 'sm' }), '-ml-2 self-start')}
        >
          <ArrowLeftIcon data-icon="inline-start" />
          {t(($) => $.detail.back)}
        </a>

        <header className="flex flex-col gap-3">
          <time dateTime={post.date} className="text-muted-foreground text-xs tabular-nums">
            {dayjs(post.date).format('LL')}
          </time>

          <h1 className="text-3xl font-semibold tracking-tight">{post.title}</h1>
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
