import { css } from 'styled-system/css';

export function MdxCode({ children }: MdxCode.Props) {
  return (
    <code
      className={css({
        ':not(pre) > &': {
          rounded: '[0.35em]',
          border: 'line',
          bg: 'surface.muted',
          px: '[0.35em]',
          py: '[0.12em]',
          color: 'text',
          fontFamily: 'mono',
          fontSize: '[0.85em]',
          fontWeight: 'normal',
          boxDecorationBreak: 'clone',
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
