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
import { useLanguage } from '@/common/hooks';
import { localeHref } from '@/common/lib';
import { page } from '@/common/styles';

const main = css({
  display: 'flex',
  flex: '1',
  alignItems: 'center',
  justifyContent: 'center',
  p: '6',
});

export function NotFound() {
  const lang = useLanguage();
  const { t } = useTranslation('common');
  const shell = page();

  return (
    <div className={cx(shell.root, css({ display: 'flex', flexDirection: 'column' }))}>
      <main className={main}>
        <Empty>
          <EmptyHeader>
            <EmptyTitle>
              <h1>{t(($) => $.notFound.title)}</h1>
            </EmptyTitle>
            <EmptyDescription>{t(($) => $.notFound.description)}</EmptyDescription>
          </EmptyHeader>

          <div
            className={css({
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'center',
              gap: '2',
            })}
          >
            <a href={localeHref(lang, '/[lang]')} className={buttonVariants({ size: 'sm' })}>
              {t(($) => $.notFound.action)}
            </a>
            <a
              href={localeHref(lang, '/[lang]/projects')}
              className={buttonVariants({ variant: 'outline', size: 'sm' })}
            >
              {t(($) => $.nav.projects)}
            </a>
            <a
              href={localeHref(lang, '/[lang]/blog')}
              className={buttonVariants({ variant: 'outline', size: 'sm' })}
            >
              {t(($) => $.nav.blog)}
            </a>
          </div>
        </Empty>
      </main>

      <SiteDock lang={lang} />
    </div>
  );
}
