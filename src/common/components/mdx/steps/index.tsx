/** 번호를 고정폭 원으로 그린다 — prose 의 `<ol>` 마커는 단계가 길어지면 축이 흐트러진다. */
export function Steps({ children }: Steps.Props) {
  return <ol className="my-6 flex list-none flex-col gap-4 pl-0">{children}</ol>;
}

export function Step({ index, title, children }: Step.Props) {
  return (
    <li className="flex gap-3 [&_p]:my-0 [&_p+p]:mt-2">
      <span className="border-border text-muted-foreground mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full border text-xs tabular-nums">
        {index}
      </span>

      <div className="flex min-w-0 flex-col gap-1">
        <p className="text-foreground text-sm font-medium">{title}</p>
        <div className="text-muted-foreground text-sm leading-relaxed">{children}</div>
      </div>
    </li>
  );
}

export declare namespace Steps {
  export type Props = { children: React.ReactNode };
}

export declare namespace Step {
  export type Props = {
    index: number;
    title: string;
    children: React.ReactNode;
  };
}
