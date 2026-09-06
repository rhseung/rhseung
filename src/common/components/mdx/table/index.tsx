import { css } from 'styled-system/css';

const scroller = css({ position: 'relative', my: '6', overflowX: 'auto' });

export function MdxTable({ children }: MdxTable.Props) {
  return (
    <div className={scroller}>
      <table>{children}</table>
    </div>
  );
}

export declare namespace MdxTable {
  export type Props = {
    children: React.ReactNode;
  };
}
