import { CaretRightIcon } from '@phosphor-icons/react';

/** 네이티브 `<details>` — JS 를 꺼도 열린다. */
export function Detail({ summary, children }: Detail.Props) {
  return (
    <details className="border-border group my-6 rounded-md border px-4 py-3 [&_p]:my-0 [&_p+p]:mt-2">
      <summary className="text-foreground flex cursor-pointer list-none items-center gap-2 text-sm font-medium">
        <CaretRightIcon className="size-3.5 shrink-0 transition-transform group-open:rotate-90" />
        {summary}
      </summary>

      <div className="text-muted-foreground mt-3 text-sm leading-relaxed">{children}</div>
    </details>
  );
}

export declare namespace Detail {
  export type Props = {
    summary: string;
    children: React.ReactNode;
  };
}
