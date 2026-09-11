import { css } from 'styled-system/css';

export function MdxCode({ children }: MdxCode.Props) {
  return (
    <code
      className={css({
        ':not(pre) > &': {
          rounded: 'md',
          bg: 'surface.muted',
          px: '1.5',
          py: '0.5',
          fontFamily: 'mono',
          fontSize: '[0.85em]',
          fontWeight: 'normal',
        },
      })}
    >
      {children}
    </code>
  );
}

export declare namespace MdxCode {
  export type Props = {
    children: React.ReactNode;
  };
}
