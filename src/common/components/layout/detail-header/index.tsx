import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import { useTranslation } from 'react-i18next';

import { localeHref, SITE, type Language } from '@/common/lib';
import { cn } from '@/common/utils';

import { buttonVariants } from '../../ui/button';

// 264x58 원본을 20px 높이로 눕힌 값. 비율을 attribute 로 박아야 로고가 늦게 와도 줄이 안 밀린다.
const WORDMARK = { width: 91, height: 20 };

/**
 * 상세 페이지(글·프로젝트·논문)가 같이 쓰는 머리줄. 되돌아가기는 절대 배치라서 로고가
 * 본문 폭의 한가운데에 선다 - 같은 줄에 flex 로 늘어놓으면 라벨 길이가 언어마다 달라
 * 로고 중심이 페이지마다 어긋난다.
 */
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

      <a href={localeHref(lang, '/')} aria-label={t(($) => $.nav.home)} className="shrink-0">
        {/*
         * 워드마크는 `public/` 의 SVG 라 변환할 것도 srcset 도 없다 - `<Image />` 가 주는
         * 이점이 없는 자리다. 게다가 여기는 React 아일랜드라 애초에 쓸 수도 없다.
         *
         * 라이트·다크가 파일 두 개인 건 글자 색이 통째로 뒤집히기 때문이다. 하나를
         * `currentColor` 로 만들려면 SVG 를 인라인해야 하는데 7KB 짜리다.
         *
         * 파일 이름은 글자 색이지 테마가 아니다 - `wordmark-light.svg` 가 흰 글자라
         * 어두운 배경에 쓴다. 그대로 짝지으면 두 테마 다 안 보인다.
         */}
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
