import { css } from 'styled-system/css';

export function MdxStrong({ children }: MdxStrong.Props) {
  return <strong className={css({ fontWeight: 'semibold' })}>{children}</strong>;
}

export declare namespace MdxStrong {
  export type Props = {
    children: React.ReactNode;
  };
}
