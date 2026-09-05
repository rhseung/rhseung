import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import { useTranslation } from 'react-i18next';

import { localeHref, SITE, type Language } from '@/common/lib';
import { cn } from '@/common/utils';

import { buttonVariants } from '../../ui/button';

const WORDMARK = { width: 91, height: 20 };

export function DetailHeader({ lang, backHref, backLabel, className }: DetailHeader.Props) {
  const { t } = useTranslation('common');

  return (
    <header className={cn('relative mb-24 flex h-10 items-center justify-center', className)}>
      <a
        href={backHref}
        aria-label={backLabel}
        className={cn(buttonVariants({ variant: 'ghost', size: 'icon' }), 'absolute left-0')}
      >
        <ArrowLeftIcon />
      </a>

      <a href={localeHref(lang, '/[lang]')} aria-label={t(($) => $.nav.home)} className="shrink-0">
        {/* 파일 이름은 테마가 아니라 글자 색이다. `-light` 가 흰 글자라 어두운 배경에 쓴다. */}
        {/* eslint-disable-next-line no-restricted-syntax */}
        <img
          src="/logos/wordmark-dark.svg"
          alt={SITE.title}
          {...WORDMARK}
          className="h-5 w-auto dark:hidden"
        />
        {/* eslint-disable-next-line no-restricted-syntax */}
        <img
          src="/logos/wordmark-light.svg"
          alt={SITE.title}
          {...WORDMARK}
          className="hidden h-5 w-auto dark:block"
        />
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
