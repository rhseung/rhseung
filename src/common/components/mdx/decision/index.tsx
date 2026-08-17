import { CheckCircleIcon, XCircleIcon } from '@phosphor-icons/react';

/**
 * 기술 선택 하나를 `고른 것 / 이유 / 포기한 것`으로 적는다. 기능 나열은 README 가 할 일이고,
 * 프로젝트 글에서 읽는 쪽이 사는 건 이 판단이다.
 */
export function Decision({ title, chose, insteadOf, children }: Decision.Props) {
  return (
    <section className="border-border my-6 flex flex-col gap-3 rounded-md border p-4 [&_p]:my-0 [&_p+p]:mt-2">
      <p className="text-foreground text-sm font-medium">{title}</p>

      <dl className="flex flex-col gap-1.5 text-sm">
        <div className="flex items-start gap-2">
          <CheckCircleIcon weight="fill" className="text-primary mt-0.5 size-4 shrink-0" />
          <dd className="text-foreground">{chose}</dd>
        </div>

        {insteadOf && (
          <div className="flex items-start gap-2">
            <XCircleIcon className="text-muted-foreground mt-0.5 size-4 shrink-0" />
            <dd className="text-muted-foreground line-through">{insteadOf}</dd>
          </div>
        )}
      </dl>

      <div className="text-muted-foreground text-sm leading-relaxed">{children}</div>
    </section>
  );
}

export declare namespace Decision {
  export type Props = {
    title: string;
    /** 고른 것. */
    chose: string;
    /** 포기한 것. 없으면 줄 자체가 안 나온다. */
    insteadOf?: string;
    children: React.ReactNode;
  };
}
