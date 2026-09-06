import { useTranslation } from 'react-i18next';
import { css, cx } from 'styled-system/css';

import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyTitle,
  SiteDock,
  buttonVariants,
} from '@/common/components';
import { DEFAULT_LANGUAGE, localeHref } from '@/common/lib';
import { page } from '@/common/styles';

const root = css({ display: 'flex', flexDirection: 'column' });
const main = css({
  display: 'flex',
  flex: '1',
  alignItems: 'center',
  justifyContent: 'center',
  p: '6',
});
const actions = css({ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '2' });

export function NotFound() {
  const { t } = useTranslation('common');
  const shell = page();

  return (
    <div className={cx(shell.root, root)}>
      <main className={main}>
        <Empty>
          <EmptyHeader>
            {/* `EmptyTitle` 은 div 라 안을 h1 로 채운다. */}
            <EmptyTitle>
              <h1>{t(($) => $.notFound.title)}</h1>
            </EmptyTitle>
            <EmptyDescription>{t(($) => $.notFound.description)}</EmptyDescription>
          </EmptyHeader>

          <div className={actions}>
            <a
              href={localeHref(DEFAULT_LANGUAGE, '/[lang]')}
              className={buttonVariants({ size: 'sm' })}
            >
              {t(($) => $.notFound.action)}
            </a>
            <a
              href={localeHref(DEFAULT_LANGUAGE, '/[lang]/projects')}
              className={buttonVariants({ variant: 'outline', size: 'sm' })}
            >
              {t(($) => $.nav.projects)}
            </a>
            <a
              href={localeHref(DEFAULT_LANGUAGE, '/[lang]/blog')}
              className={buttonVariants({ variant: 'outline', size: 'sm' })}
            >
              {t(($) => $.nav.blog)}
            </a>
          </div>
        </Empty>
      </main>

      <SiteDock lang={DEFAULT_LANGUAGE} />
    </div>
  );
}
