import { useState } from 'react';

import { CheckIcon, ClipboardDocumentIcon } from '@heroicons/react/24/outline';
import { useTranslation } from 'react-i18next';

import {
  Badge,
  Button,
  DetailHeader,
  LinkRow,
  SiteDock,
} from '@/common/components';
import { formatPeriod, localeHref, tone, type Language } from '@/common/lib';

import {
  RESEARCH_KIND_TONE,
  researchLinks,
  useResearchLabels,
  type Research,
} from '../../viewmodels';
import { RESEARCH_LINK_ICON } from '../components';

const COPIED_MS = 1600;

export function PaperPage({
  lang,
  item,
  authors,
  bibtex,
  children,
  bibliography,
}: PaperPage.Props) {
  const { t } = useTranslation('research');
  const label = useResearchLabels();

  const [copied, setCopied] = useState(false);

  const period = formatPeriod(
    item.start,
    item.end,
    t(($) => $.period.ongoing),
  );

  const links = researchLinks(item).map(({ kind, href }) => ({
    key: kind,
    href,
    label: label.link[kind],
    Icon: RESEARCH_LINK_ICON[kind],
  }));

  const copy = () => {
    if (bibtex === undefined) return;

    void navigator.clipboard.writeText(bibtex).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), COPIED_MS);
    });
  };

  return (
    <div className="bg-background min-h-dvh">
      <div className="mx-auto w-full max-w-4xl p-4 sm:p-6 md:p-8">
        <DetailHeader
          lang={lang}
          backHref={localeHref(lang, '/[lang]/research')}
          backLabel={t(($) => $.detail.back)}
        />

        <main className="flex min-w-0 flex-col gap-8">
          <header className="flex flex-col gap-3">
            <div className="flex items-center gap-1.5">
              <Badge variant="secondary" className={tone({ tone: RESEARCH_KIND_TONE[item.kind] })}>
                {label.kind[item.kind]}
              </Badge>
              <span className="text-muted-foreground ml-auto text-xs tabular-nums">{period}</span>
            </div>

            <h1 data-vt-title={item.slug} className="text-3xl font-extrabold">
              {item.title}
            </h1>

            <p className="text-muted-foreground text-sm">
              {authors ?? item.org}
              {authors !== undefined && ` · ${item.org}`}
            </p>

            <LinkRow links={links} variant="button">
              {bibtex !== undefined && (
                <Button variant="outline" size="sm" onClick={copy}>
                  {copied ? (
                    <CheckIcon data-icon="inline-start" />
                  ) : (
                    <ClipboardDocumentIcon data-icon="inline-start" />
                  )}
                  {copied ? t(($) => $.detail.copied) : t(($) => $.detail.bibtex)}
                </Button>
              )}
            </LinkRow>
          </header>

          <div className="paper flex flex-col gap-8">
            <div className="prose prose-zinc dark:prose-invert max-w-none">{children}</div>

            {bibliography !== undefined && (
              <section className="flex flex-col gap-3">
                <h2 className="text-lg font-semibold">{t(($) => $.detail.references)}</h2>
                {bibliography}
              </section>
            )}
          </div>
        </main>
      </div>

      <SiteDock
        lang={lang}
        current="research"
        route={{ to: '/[lang]/research/[slug]', params: { slug: item.slug } }}
      />
    </div>
  );
}

export declare namespace PaperPage {
  export type Props = {
    lang: Language;
    item: Research;
    authors?: string;
    bibtex?: string;
    children: React.ReactNode;
    bibliography?: React.ReactNode;
  };
}
