/** 글에서 실제로 기억되는 건 숫자다. 문단에 묻히지 않게 꺼내 놓는다. */
export function Stats({ children }: Stats.Props) {
  return <div className="my-6 grid gap-3 sm:grid-cols-3">{children}</div>;
}

export function Stat({ value, label }: Stat.Props) {
  return (
    <div className="border-border flex flex-col gap-1 rounded-md border p-3">
      <span className="text-foreground text-lg font-semibold tabular-nums">{value}</span>
      <span className="text-muted-foreground text-xs">{label}</span>
    </div>
  );
}

export declare namespace Stats {
  export type Props = { children: React.ReactNode };
}

export declare namespace Stat {
  export type Props = {
    value: string;
    label: string;
  };
}
