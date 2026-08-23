import { useTranslation } from 'react-i18next';

import { Empty, EmptyDescription, EmptyHeader, EmptyTitle, SiteDock } from '@/common/components';
import { localeHref, type Language } from '@/common/lib';

import { sortResearch, type Research } from '../../viewmodels';
import { ResearchCard } from '../components';

export function ResearchPage({ lang, items, papers = [] }: ResearchPage.Props) {
  const { t } = useTranslation('research');

  const visible = sortResearch(items);

  return (
    <div className="bg-background min-h-dvh">
      <main className="mx-auto flex max-w-3xl flex-col gap-8 px-4 py-12">
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl font-semibold tracking-tight">{t(($) => $.page.title)}</h1>
        </div>

        {visible.length === 0 ? (
          <Empty>
            <EmptyHeader>
              <EmptyTitle>{t(($) => $.empty.title)}</EmptyTitle>
              <EmptyDescription>{t(($) => $.empty.description)}</EmptyDescription>
            </EmptyHeader>
          </Empty>
        ) : (
          <ul className="flex flex-col gap-3">
            {visible.map((item) => (
              <li key={item.slug}>
                <ResearchCard
                  item={item}
                  detailHref={
                    papers.includes(item.slug)
                      ? localeHref(lang, `/research/${item.slug}`)
                      : undefined
                  }
                />
              </li>
            ))}
          </ul>
        )}
      </main>

      <SiteDock
        lang={lang}
        current="research"
        altHref={localeHref(lang === 'ko' ? 'en' : 'ko', '/research')}
      />
    </div>
  );
}

export declare namespace ResearchPage {
  export type Props = {
    lang: Language;
    items: Research[];
    papers?: string[];
  };
}
