/**
 * 표는 좁은 화면에서 제 폭 아래로 못 줄어든다 — 감싸는 스크롤 상자가 없으면 넘친 폭이
 * 페이지로 새서 본문 전체가 가로로 밀린다(390px 뷰포트에서 문서 폭이 552px 이 됐다).
 */
export function MdxTable({ children }: MdxTable.Props) {
  return (
    <div className="my-6 overflow-x-auto">
      <table>{children}</table>
    </div>
  );
}

export declare namespace MdxTable {
  export type Props = {
    children: React.ReactNode;
  };
}
