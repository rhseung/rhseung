import { useCallback, useSyncExternalStore } from 'react';

/**
 * 서버 스냅숏은 항상 `false`다. 빌드 때는 뷰포트가 없어서 좁은 화면을 가정하든 넓은 화면을
 * 가정하든 절반은 틀리는데, 이 훅을 쓰는 쪽이 "조건이 맞을 때만 뭔가를 더 그리는" 형태라
 * `false`가 아무것도 안 그리는 쪽으로 떨어진다.
 */
export function useMediaQuery(query: string): boolean {
  const subscribe = useCallback(
    (onChange: () => void) => {
      const list = window.matchMedia(query);
      list.addEventListener('change', onChange);
      return () => list.removeEventListener('change', onChange);
    },
    [query],
  );

  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia(query).matches,
    () => false,
  );
}
