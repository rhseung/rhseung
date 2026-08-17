import { useTranslation } from 'react-i18next';

import { Badge } from '@/common/components';
import { dayjs } from '@/common/lib';

import type { PostSummary } from '../../../viewmodels';

export function PostListItem({ post, href, showLanguage }: PostListItem.Props) {
  const { t } = useTranslation('blog');

  return (
    <article className="flex flex-col gap-1">
      <div className="flex items-center gap-2">
        <time dateTime={post.date} className="text-muted-foreground text-xs tabular-nums">
          {dayjs(post.date).format('LL')}
        </time>

        {showLanguage && (
          <Badge variant="outline" aria-label={t(($) => $.item.writtenIn)}>
            {post.lang.toUpperCase()}
          </Badge>
        )}
      </div>

      <h2 className="text-base font-medium">
        <a href={href} className="hover:underline">
          {post.title}
        </a>
      </h2>

      <p className="text-muted-foreground text-sm">{post.summary}</p>
    </article>
  );
}

export declare namespace PostListItem {
  export type Props = {
    post: PostSummary;
    href: string;
    showLanguage: boolean;
  };
}
