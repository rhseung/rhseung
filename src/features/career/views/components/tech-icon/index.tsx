import type { TechSpec } from '../../../viewmodels';

/**
 * `fill="currentColor"` 라서 라벨 색을 그대로 따라간다 - 뱃지의 `--tone` 이 곧 이 색이다.
 * 크기 클래스를 직접 다는 이유: 토글의 `[&_svg:not([class*='size-'])]:size-4` 가
 * 클래스가 없을 때만 4로 키운다.
 */
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
