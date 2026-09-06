import { useState } from 'react';

import { CheckIcon, ClipboardDocumentIcon } from '@heroicons/react/24/outline';
import { useTranslation } from 'react-i18next';
import { css, cx } from 'styled-system/css';
import { stack } from 'styled-system/patterns';

import { Badge, Button, DetailHeader, LinkRow, Prose, SiteDock } from '@/common/components';
import { formatPeriod, localeHref, type Language } from '@/common/lib';
import { bibliography as bibliographyStyle, metaText, page } from '@/common/styles';

import {
  RESEARCH_KIND_TONE,
  researchLinks,
  useResearchLabels,
  type Research,
} from '../../viewmodels';
import { RESEARCH_LINK_ICON } from '../components';

const COPIED_MS = 1600;

const main = css({ display: 'flex', minW: '0', flexDirection: 'column', gap: '8' });
const header = stack({ gap: '3' });
const kindRow = css({ display: 'flex', alignItems: 'center', gap: '1.5' });
const period = css({ ml: 'auto' });
const title = css({ textStyle: 'heading.page' });
const authors = css({ color: 'text.muted', textStyle: 'sm' });
const paper = stack({ gap: '8' });
const references = stack({ gap: '3' });
const referencesTitle = css({ textStyle: 'heading.sub' });

export function PaperPage({
  lang,
  item,
  authors: authorLine,
  bibtex,
  children,
  bibliography,
}: PaperPage.Props) {
  const { t } = useTranslation('research');
  const label = useResearchLabels();
  const shell = page({ width: 'lg' });

  const [copied, setCopied] = useState(false);

  const periodText = formatPeriod(
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
    <div className={shell.root}>
      <div className={shell.frame}>
        <DetailHeader
          lang={lang}
          backHref={localeHref(lang, '/[lang]/research')}
          backLabel={t(($) => $.detail.back)}
        />

        <main className={main}>
          <header className={header}>
            <div className={kindRow}>
              <Badge variant="secondary" tone={RESEARCH_KIND_TONE[item.kind]}>
                {label.kind[item.kind]}
              </Badge>
              <span className={cx(metaText, period)}>{periodText}</span>
            </div>

            <h1 data-vt-title={item.slug} className={title}>
              {item.title}
            </h1>

            <p className={authors}>
              {authorLine ?? item.org}
              {authorLine !== undefined && ` · ${item.org}`}
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

          <div className={paper}>
            <Prose layout="paper">{children}</Prose>

            {bibliography !== undefined && (
              <section className={references}>
                <h2 className={referencesTitle}>{t(($) => $.detail.references)}</h2>
                <div className={bibliographyStyle}>{bibliography}</div>
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
