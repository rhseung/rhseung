import { css, cva, cx } from 'styled-system/css';

import { ExternalLink } from '@/common/components';
import { formatPeriod } from '@/common/lib';
import { metaText } from '@/common/styles';

import type { CareerEntry } from '../../../viewmodels';

const list = cva({
  base: { display: 'flex', flexDirection: 'column' },
  variants: {
    timeline: {
      true: { gap: '0', pl: '2.5' },
      false: { gap: '6' },
    },
  },
});

const entry = cva({
  base: { display: 'flex', breakInside: 'avoid', flexDirection: 'column', gap: '1' },
  variants: {
    timeline: { true: { position: 'relative', borderLeft: 'line', pl: '6', pb: '8' }, false: {} },
    last: { true: {}, false: {} },
  },
  compoundVariants: [
    { timeline: true, last: true, css: { borderLeftColor: 'transparent', pb: '0' } },
  ],
});

const dot = cva({
  base: {
    position: 'absolute',
    top: '1.5',
    left: '[-0.3125rem]',
    boxSize: '2.5',
    rounded: 'full',
    boxShadow: 'halo',
  },
  variants: {
    ongoing: { true: { bg: 'accent' }, false: { bg: 'text.muted/40' } },
  },
});

export function CareerList({
  entries,
  ongoingLabel,
  headingLevel = 3,
  timeline = false,
}: CareerList.Props) {
  const Heading = `h${headingLevel}` as const;

  return (
    <ul className={list({ timeline })}>
      {entries.map((item, index) => {
        const last = index === entries.length - 1;
        const ongoing = item.end === undefined;

        return (
          <li key={item.slug} className={entry({ timeline, last })}>
            {timeline && <span aria-hidden className={dot({ ongoing })} />}

            <div
              className={css({
                display: 'flex',
                flexWrap: 'wrap',
                alignItems: 'baseline',
                columnGap: '2',
              })}
            >
              {item.logo && (
                // eslint-disable-next-line no-restricted-syntax
                <img
                  src={item.logo}
                  alt=""
                  width={20}
                  height={20}
                  loading="lazy"
                  decoding="async"
                  className={css({
                    boxSize: '5',
                    flexShrink: 0,
                    alignSelf: 'center',
                    rounded: 'sm',
                    objectFit: 'contain',
                  })}
                />
              )}
              <Heading className={css({ fontWeight: 'medium' })}>{item.org}</Heading>
              <span className={cx(metaText, css({ ml: 'auto' }))}>
                {formatPeriod(item.start, item.end, ongoingLabel)}
              </span>
            </div>

            <p className={css({ color: 'text.muted', textStyle: 'sm' })}>{item.role}</p>
            {item.summary && (
              <p className={css({ color: 'text.muted', textStyle: 'body' })}>{item.summary}</p>
            )}

            {(item.achievements?.length ?? 0) > 0 && (
              <ul
                className={css({
                  mt: '1',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '1',
                  borderLeftWidth: '[1px]',
                  borderLeftStyle: 'solid',
                  borderLeftColor: 'line/60',
                  pl: '3',
                })}
              >
                {item.achievements?.map((text) => (
                  <li key={text} className={css({ color: 'text.muted', textStyle: 'caption' })}>
                    {text}
                  </li>
                ))}
              </ul>
            )}

            {item.links?.site && (
              <ExternalLink
                href={item.links.site}
                className={css({
                  w: 'fit',
                  color: 'text.muted',
                  textStyle: 'xs',
                  _hover: { color: 'text', textDecoration: 'underline' },
                })}
              >
                {item.links.site.replace('https://', '')}
              </ExternalLink>
            )}
          </li>
        );
      })}
    </ul>
  );
}

export declare namespace CareerList {
  export type Props = {
    entries: CareerEntry[];
    ongoingLabel: string;
    headingLevel?: 2 | 3;
    timeline?: boolean;
  };
}
