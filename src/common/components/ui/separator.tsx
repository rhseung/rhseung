import { Separator as SeparatorPrimitive } from '@base-ui/react/separator';

import { cn } from '@/common/utils/index';

function Separator({ className, orientation = 'horizontal', ...props }: SeparatorPrimitive.Props) {
  return (
    <SeparatorPrimitive
      data-slot="separator"
      orientation={orientation}
      className={cn(
        // 레지스트리는 `data-horizontal:`을 쓰는데 Base UI 1.7은 `data-orientation="horizontal"`을
        // 낸다 - 그대로 두면 높이가 0이라 선이 아예 안 보인다. `ui:add`로 되돌려도 재현된다.
        // 세로줄 높이는 `self-stretch`가 아니라 `h-full`이다 - 부르는 쪽이 높이를 지정하면
        // `align-self: stretch`가 무시되면서 줄이 위로 붙는다.
        'bg-border shrink-0 data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-px',
        className,
      )}
      {...props}
    />
  );
}

export { Separator };
