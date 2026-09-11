import { css } from 'styled-system/css';

export function PaperParagraph({ children }: PaperParagraph.Props) {
  return (
    <p className={css({ mt: '5', textIndent: '[1.5em]', '& + &': { mt: '0' } })}>{children}</p>
  );
}

export declare namespace PaperParagraph {
  export type Props = {
    children: React.ReactNode;
  };
}
