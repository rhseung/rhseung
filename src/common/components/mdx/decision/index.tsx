import { ArrowRightIcon } from '@phosphor-icons/react';

/**
 * 기술 선택 하나를 `포기한 것 → 고른 것` 한 줄로 적는다. 기능 나열은 README 가 할 일이고,
 * 프로젝트 글에서 읽는 쪽이 사는 건 이 판단이다.
 */
export function Decision({ title, chose, insteadOf, children }: Decision.Props) {
  return (
    <section className="border-border my-6 flex flex-col gap-2 rounded-md border p-4 [&_p]:my-0 [&_p+p]:mt-2">
      <p className="text-muted-foreground text-xs">{title}</p>

      <p className="flex flex-wrap items-center gap-2 text-sm">
        {insteadOf && (
          <>
            <span className="text-muted-foreground">{insteadOf}</span>
            <ArrowRightIcon className="text-muted-foreground size-3.5 shrink-0" />
          </>
        )}
        <span className="text-foreground font-medium">{chose}</span>
      </p>

      <div className="text-muted-foreground text-sm leading-relaxed">{children}</div>
    </section>
  );
}

export declare namespace Decision {
  export type Props = {
    /** 무엇을 정하는 자리였나. 질문 형태로 쓴다. */
    title: string;
    /** 고른 것. */
    chose: string;
    /** 포기한 것. 없으면 화살표째 안 나온다. */
    insteadOf?: string;
    children: React.ReactNode;
  };
}
