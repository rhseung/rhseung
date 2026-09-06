import { css } from 'styled-system/css';

// 표는 제 폭 아래로 못 줄어든다. 스크롤 상자가 없으면 넘친 폭이 페이지로 샌다.
// `relative` 가 없으면 셀 안의 `srOnly`(absolute) 가 상자 밖 좌표에 놓여 페이지 폭을 늘린다.
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
