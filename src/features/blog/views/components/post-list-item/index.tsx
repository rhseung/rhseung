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

        {/* 글은 쓴 언어 그대로 한 벌뿐이다. 다른 언어로 보는 사람이 열었다 튕기지 않게 미리 알린다. */}
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
    /** 보고 있는 UI 언어와 글 언어가 다를 때만 켠다. */
    showLanguage: boolean;
  };
}
