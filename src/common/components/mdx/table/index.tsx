/** 표는 제 폭 아래로 못 줄어든다. 스크롤 상자가 없으면 넘친 폭이 페이지로 샌다. */
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
