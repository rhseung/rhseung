import type { TechSpec } from '@/content/skills';

/** 크기 클래스를 직접 단다. 토글이 클래스 없는 svg 만 `size-4` 로 키운다. */
export function TechIcon({ icon }: TechIcon.Props) {
  return (
    <svg
      aria-hidden
      data-icon="inline-start"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="size-3 shrink-0"
    >
      <path d={icon.path} />
    </svg>
  );
}

export declare namespace TechIcon {
  export type Props = {
    icon: NonNullable<TechSpec['icon']>;
  };
}
