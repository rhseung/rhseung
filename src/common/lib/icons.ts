import type { ComponentProps, ComponentType } from 'react';

// heroicons 와 phosphor 를 같은 자리에 꽂는다. 둘 다 이 형태로 좁혀져서, 아이콘을 받는 쪽이
// 어느 라이브러리에서 온 것인지 몰라도 된다.
export type IconComponent = ComponentType<ComponentProps<'svg'>>;
