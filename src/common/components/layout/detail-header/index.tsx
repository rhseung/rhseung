import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import { useTranslation } from 'react-i18next';
import { css, cx } from 'styled-system/css';

import { localeHref, SITE, type Language } from '@/common/lib';

import { buttonVariants } from '../../ui/button';

const WORDMARK = { width: 91, height: 20 };

const header = css({
  position: 'relative',
  mb: '24',
  display: 'flex',
  h: '10',
  alignItems: 'center',
  justifyContent: 'center',
});

const back = css({ position: 'absolute', left: '0' });
const home = css({ flexShrink: 0 });
const lightMark = css({ h: '5', w: 'auto', _dark: { display: 'none' } });
const darkMark = css({ display: 'none', h: '5', w: 'auto', _dark: { display: 'block' } });

export function DetailHeader({ lang, backHref, backLabel, className }: DetailHeader.Props) {
  const { t } = useTranslation('common');

  return (
    <header className={cx(header, className)}>
      <a
        href={backHref}
        aria-label={backLabel}
        className={cx(buttonVariants({ variant: 'ghost', size: 'icon' }), back)}
      >
        <ArrowLeftIcon />
      </a>

      <a href={localeHref(lang, '/[lang]')} aria-label={t(($) => $.nav.home)} className={home}>
        {/* 파일 이름은 테마가 아니라 글자 색이다. `-light` 가 흰 글자라 어두운 배경에 쓴다. */}
        {/* eslint-disable-next-line no-restricted-syntax */}
        <img src="/logos/wordmark-dark.svg" alt={SITE.title} {...WORDMARK} className={lightMark} />
        {/* eslint-disable-next-line no-restricted-syntax */}
        <img src="/logos/wordmark-light.svg" alt={SITE.title} {...WORDMARK} className={darkMark} />
      </a>
    </header>
  );
}

export declare namespace DetailHeader {
  export type Props = {
    lang: Language;
    backHref: string;
    backLabel: string;
    className?: string;
  };
}
