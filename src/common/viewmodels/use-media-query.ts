import { useCallback, useSyncExternalStore } from 'react';

/** 빌드 때는 뷰포트가 없다. 서버 스냅숏을 `false` 로 둬서 아무것도 안 그리는 쪽으로 떨군다. */
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
