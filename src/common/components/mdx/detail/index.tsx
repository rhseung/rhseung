import { ChevronRightIcon } from '@heroicons/react/24/outline';
import { css } from 'styled-system/css';

const details = css({
  my: '6',
  rounded: 'md',
  border: 'line',
  px: '4',
  py: '3',
  '& p': { my: '0' },
  '& p + p': { mt: '2' },
});
const summary = css({
  display: 'flex',
  cursor: 'pointer',
  listStyleType: 'none',
  alignItems: 'center',
  gap: '2',
  color: 'text',
  textStyle: 'sm',
  fontWeight: 'medium',
});

export function Detail({ summary: label, children }: Detail.Props) {
  return (
    <details className={details}>
      <summary className={summary}>
        <ChevronRightIcon
          className={css({
            boxSize: '3.5',
            flexShrink: 0,
            transition: 'transform',
            'details[open] > summary > &': { transform: 'rotate(90deg)' },
          })}
        />
        {label}
      </summary>

      <div
        className={css({ mt: '3', color: 'text.muted', textStyle: 'sm', lineHeight: 'relaxed' })}
      >
        {children}
      </div>
    </details>
  );
}

export declare namespace Detail {
  export type Props = {
    summary: string;
    children: React.ReactNode;
  };
}
