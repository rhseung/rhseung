import { useTranslation } from 'react-i18next';
import { css } from 'styled-system/css';
import { stack } from 'styled-system/patterns';

import { Empty, EmptyDescription, EmptyHeader, EmptyTitle } from '@/common/components';
import { useLanguage } from '@/common/hooks';
import { localeHref } from '@/common/lib';
import { page } from '@/common/styles';

import { sortResearch, type Research } from '../lib';

import { ResearchCard } from '.';

export function ResearchPage({ items, papers = [] }: ResearchPage.Props) {
  const lang = useLanguage();
  const { t } = useTranslation('research');
  const shell = page();

  const visible = sortResearch(items);

  return (
    <div className={shell.root}>
      <main className={shell.main}>
        <h1 className={css({ textStyle: 'heading.page' })}>{t(($) => $.page.title)}</h1>

        {visible.length === 0 ? (
          <Empty>
            <EmptyHeader>
              <EmptyTitle>{t(($) => $.empty.title)}</EmptyTitle>
              <EmptyDescription>{t(($) => $.empty.description)}</EmptyDescription>
            </EmptyHeader>
          </Empty>
        ) : (
          <ul className={stack({ gap: '3' })}>
            {visible.map((item) => (
              <li key={item.slug}>
                <ResearchCard
                  item={item}
                  detailHref={
                    papers.includes(item.slug)
                      ? localeHref(lang, '/[lang]/research/[slug]', { slug: item.slug })
                      : undefined
                  }
                />
              </li>
            ))}
          </ul>
        )}
      </main>
    </div>
  );
}

export declare namespace ResearchPage {
  export type Props = {
    items: Research[];
    papers?: string[];
  };
}
