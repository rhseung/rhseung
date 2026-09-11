import { css } from 'styled-system/css';

export function MdxQuote({ children }: MdxQuote.Props) {
  return (
    <blockquote
      className={css({
        mt: '5',
        borderLeftWidth: '[4px]',
        borderLeftStyle: 'solid',
        borderLeftColor: 'line',
        pl: '4',
        color: 'text.body',
        '& > :first-child': { mt: '0' },
        '& > *:not(:first-child)': { mt: '2' },
      })}
    >
      {children}
    </blockquote>
  );
}

export declare namespace MdxQuote {
  export type Props = {
    children: React.ReactNode;
  };
}
