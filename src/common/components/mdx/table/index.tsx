import { css } from 'styled-system/css';

export function MdxTable({ children }: MdxTable.Props) {
  return (
    <div className={css({ position: 'relative', my: '6', overflowX: 'auto' })}>
      <table>{children}</table>
    </div>
  );
}

export declare namespace MdxTable {
  export type Props = {
    children: React.ReactNode;
  };
}
