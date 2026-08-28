import { useState } from 'react';

import { ArrowLeftIcon, CheckIcon, CopyIcon } from '@phosphor-icons/react';
import { useTranslation } from 'react-i18next';

import { Badge, Button, ExternalLink, SiteDock, buttonVariants } from '@/common/components';
import { formatYearMonth, localeHref, tone, type Language } from '@/common/lib';
import { cn } from '@/common/utils';

import {
  RESEARCH_KIND_TONE,
  RESEARCH_LINK_KINDS,
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
  altHref,
  children,
  bibliography,
}: PaperPage.Props) {
  const { t } = useTranslation('research');
  const label = useResearchLabels();

  const [copied, setCopied] = useState(false);

  const period = item.end
    ? `${formatYearMonth(item.start)} – ${formatYearMonth(item.end)}`
    : `${formatYearMonth(item.start)} – ${t(($) => $.period.ongoing)}`;

  const links = RESEARCH_LINK_KINDS.flatMap((kind) => {
    const href = item.links?.[kind];
    return href ? [{ kind, href }] : [];
  });

  const copy = () => {
    if (bibtex === undefined) return;

    void navigator.clipboard.writeText(bibtex).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), COPIED_MS);
    });
  };

  return (
    <div className="bg-background min-h-dvh">
      <main className="mx-auto flex max-w-3xl flex-col gap-8 px-4 py-12">
        <a
          href={localeHref(lang, '/research')}
          className={cn(buttonVariants({ variant: 'ghost', size: 'sm' }), '-ml-2 self-start')}
        >
          <ArrowLeftIcon data-icon="inline-start" />
          {t(($) => $.detail.back)}
        </a>

        <header className="flex flex-col gap-3">
          <div className="flex items-center gap-1.5">
            <Badge variant="secondary" className={tone({ tone: RESEARCH_KIND_TONE[item.kind] })}>
              {label.kind[item.kind]}
            </Badge>
            <span className="text-muted-foreground ml-auto text-xs tabular-nums">{period}</span>
          </div>

          <h1 data-vt-title={item.slug} className="text-3xl font-semibold tracking-tight">
            {item.title}
          </h1>

          <p className="text-muted-foreground text-sm">
            {authors ?? item.org}
            {authors !== undefined && ` · ${item.org}`}
          </p>

          {(links.length > 0 || bibtex !== undefined) && (
            <div className="flex flex-wrap gap-2">
              {links.map(({ kind, href }) => {
                const Icon = RESEARCH_LINK_ICON[kind];

                return (
                  <ExternalLink
                    key={kind}
                    href={href}
                    className={cn(buttonVariants({ variant: 'outline', size: 'sm' }))}
                  >
                    <Icon data-icon="inline-start" />
                    {label.link[kind]}
                  </ExternalLink>
                );
              })}

              {bibtex !== undefined && (
                <Button variant="outline" size="sm" onClick={copy}>
                  {copied ? (
                    <CheckIcon data-icon="inline-start" />
                  ) : (
                    <CopyIcon data-icon="inline-start" />
                  )}
                  {copied ? t(($) => $.detail.copied) : t(($) => $.detail.bibtex)}
                </Button>
              )}
            </div>
          )}
        </header>

        <div className="paper flex flex-col gap-8">
          <div className="prose prose-zinc dark:prose-invert max-w-none">{children}</div>

          {bibliography !== undefined && (
            <section className="flex flex-col gap-3">
              <h2 className="text-lg font-semibold tracking-tight">
                {t(($) => $.detail.references)}
              </h2>
              {bibliography}
            </section>
          )}
        </div>
      </main>

      <SiteDock lang={lang} current="research" altHref={altHref} />
    </div>
  );
}

export declare namespace PaperPage {
  export type Props = {
    lang: Language;
    item: Research;
    authors?: string;
    bibtex?: string;
    altHref?: string;
    children: React.ReactNode;
    bibliography?: React.ReactNode;
  };
}
