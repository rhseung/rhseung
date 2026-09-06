import { useTranslation } from 'react-i18next';
import { css } from 'styled-system/css';
import { hstack, stack } from 'styled-system/patterns';

import { Badge } from '@/common/components';
import { dayjs } from '@/common/lib';
import { metaText } from '@/common/styles';

import type { PostSummary } from '../../../viewmodels';

const article = stack({ gap: '1' });
const head = hstack({ gap: '2' });
const title = css({
  textStyle: 'heading.card',
  '& a': { _hover: { textDecoration: 'underline' } },
});
const summary = css({ color: 'text.muted', textStyle: 'body' });

export function PostListItem({ post, href, showLanguage }: PostListItem.Props) {
  const { t } = useTranslation('blog');

  return (
    <article className={article}>
      <div className={head}>
        <time dateTime={post.date} className={metaText}>
          {dayjs(post.date).format('LL')}
        </time>

        {showLanguage && (
          <Badge variant="outline" aria-label={t(($) => $.item.writtenIn)}>
            {post.bodyLang.toUpperCase()}
          </Badge>
        )}
      </div>

      <h2 lang={post.bodyLang} data-vt-title={post.slug} className={title}>
        <a href={href}>{post.title}</a>
      </h2>

      <p lang={post.bodyLang} className={summary}>
        {post.summary}
      </p>
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
