import { useTranslation } from 'react-i18next';

import { formatYearMonth, localeHref, type Language } from '@/common/lib';

import type { Award } from '../../../viewmodels';

export function AwardList({ awards, lang, headingLevel = 3, showDate = true }: AwardList.Props) {
  const { t } = useTranslation('resume');
  const Heading = `h${headingLevel}` as const;
  return (
    <ul className="flex flex-col gap-4">
      {awards.map((award) => {
        return (
          <li key={award.slug} className="flex break-inside-avoid flex-col gap-0.5">
            <div className="flex flex-wrap items-baseline gap-x-2">
              <Heading className="font-medium">{award.title}</Heading>
              {showDate && (
                <span className="text-muted-foreground ml-auto text-xs tabular-nums">
                  {formatYearMonth(award.date)}
                </span>
              )}
            </div>

            {award.issuer && <p className="text-primary text-sm">{award.issuer}</p>}
            {award.summary && <p className="text-muted-foreground text-sm">{award.summary}</p>}

            {award.project && lang && (
              <a
                href={localeHref(lang, `/projects/${award.project}`)}
                className="text-muted-foreground hover:text-foreground w-fit text-xs hover:underline print:hidden"
              >
                {t(($) => $.awards.project)}
              </a>
            )}
          </li>
        );
      })}
    </ul>
  );
}

export declare namespace AwardList {
  export type Props = {
    awards: Award[];
    /** 안 넘기면 프로젝트 링크를 숨긴다 - 이력서 PDF 처럼 링크가 의미 없는 자리. */
    lang?: Language;
    headingLevel?: 2 | 3;
    showDate?: boolean;
  };
}
