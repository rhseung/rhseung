import { css } from 'styled-system/css';

export function MdxParagraph({ children }: MdxParagraph.Props) {
  return <p className={css({ mt: '5' })}>{children}</p>;
}

export declare namespace MdxParagraph {
  export type Props = {
    children: React.ReactNode;
  };
}
