import { useCallback, useSyncExternalStore } from 'react';

import { flushSync } from 'react-dom';

import { resolveTheme, setTheme, subscribeTheme, type ThemeMode } from '@/common/lib';

const DURATION = 450;

// 빌드 때 구운 HTML 은 방문자의 OS 설정을 모른다. 서버 스냅숏에 아무 값이나 주면 첫 렌더가
// 서버와 갈려 하이드레이션 불일치가 난다 - 언어 제안과 같은 패턴.
function unknownTheme() {
  return undefined;
}

/**
 * `startViewTransition` 콜백이 동기라 `flushSync` 로 상태를 즉시 커밋해야 스냅숏 시점이 맞는다.
 */
export function useThemeTransition() {
  const mode = useSyncExternalStore(subscribeTheme, resolveTheme, unknownTheme);

  const toggleTheme = useCallback(
    (event: React.MouseEvent<HTMLElement>) => {
      const next: ThemeMode = mode === 'dark' ? 'light' : 'dark';
      const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;

      if (reduced || !document.startViewTransition) {
        setTheme(next);
        return;
      }

      const { clientWidth, clientHeight } = document.documentElement;
      const { top, left, width, height } = event.currentTarget.getBoundingClientRect();

      const originX = left + width / 2;
      const originY = top + height / 2;
      const reach = Math.hypot(
        Math.max(originX, clientWidth - originX),
        Math.max(originY, clientHeight - originY),
      );

      const x = (originX / clientWidth) * 100;
      const y = (originY / clientHeight) * 100;
      const radius = (reach / (Math.hypot(clientWidth, clientHeight) / Math.SQRT2)) * 100;

      // 이 플래그가 붙은 동안만 페이지 전환용 크로스페이드가 꺼진다 (`styles.css`).
      document.documentElement.dataset.themeTransition = '';

      const transition = document.startViewTransition(() => {
        flushSync(() => setTheme(next));
      });

      void transition.finished.then(() => {
        delete document.documentElement.dataset.themeTransition;
      });

      void transition.ready.then(() => {
        document.documentElement.animate(
          { clipPath: [`circle(0% at ${x}% ${y}%)`, `circle(${radius}% at ${x}% ${y}%)`] },
          {
            duration: DURATION,
            easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
            pseudoElement: '::view-transition-new(root)',
          },
        );
      });
    },
    [mode],
  );

  return { mode, toggleTheme };
}
