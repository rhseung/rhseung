import { WrenchScrewdriverIcon } from '@heroicons/react/24/outline';
import { useTranslation } from 'react-i18next';
import { css, cx } from 'styled-system/css';

import { Empty, EmptyHeader, EmptyTitle, buttonVariants } from '@/common/components';
import { localeHref, type Language } from '@/common/lib';
import { page } from '@/common/styles';

export declare namespace WipNotice {
  export type Props = {
    lang: Language;
  };
}

const main = css({
  display: 'flex',
  flex: '1',
  alignItems: 'center',
  justifyContent: 'center',
  p: '6',
});

export function WipNotice({ lang }: WipNotice.Props) {
  const { t } = useTranslation('common');
  const shell = page();

  return (
    <div className={cx(shell.root, css({ display: 'flex', flexDirection: 'column' }))}>
      <main className={main}>
        <Empty>
          <EmptyHeader>
            <div className={css({ color: 'text.muted', '& svg': { w: '8', h: '8' } })}>
              <WrenchScrewdriverIcon />
            </div>
            <EmptyTitle>
              <h1>{t(($) => $.wip.title)}</h1>
            </EmptyTitle>
          </EmptyHeader>

          <a href={localeHref(lang, '/[lang]')} className={buttonVariants({ size: 'sm' })}>
            {t(($) => $.wip.action)}
          </a>
        </Empty>
      </main>
    </div>
  );
}
