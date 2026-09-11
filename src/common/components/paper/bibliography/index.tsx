import { css } from 'styled-system/css';

export function PaperBibliography({ children }: PaperBibliography.Props) {
  return (
    <div
      className={css({
        fontFamily: 'serif',
        '& .csl-entry': {
          mb: '2',
          pl: '6',
          textIndent: '[-1.5rem]',
          color: 'text.muted',
          textStyle: 'sm',
          lineHeight: 'relaxed',
        },
      })}
    >
      {children}
    </div>
  );
}

export declare namespace PaperBibliography {
  export type Props = {
    children: React.ReactNode;
  };
}
