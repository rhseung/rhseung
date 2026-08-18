import { useCallback } from 'react';

import { useTheme } from 'next-themes';
import { flushSync } from 'react-dom';

const DURATION = 450;

/**
 * 테마를 누른 버튼 자리에서 원이 퍼지듯 바꾼다.
 *
 * `startViewTransition` 콜백이 동기라 `flushSync` 로 상태를 즉시 커밋해야 스냅숏 시점이 맞는다.
 */
export function useThemeTransition() {
  const { resolvedTheme, setTheme } = useTheme();

  const toggleTheme = useCallback(
    (event: React.MouseEvent<HTMLElement>) => {
      const next = resolvedTheme === 'dark' ? 'light' : 'dark';
      const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;

      if (reduced || !document.startViewTransition) {
        setTheme(next);
        return;
      }

      const { top, left, width, height } = event.currentTarget.getBoundingClientRect();
      const x = left + width / 2;
      const y = top + height / 2;
      const radius = Math.hypot(
        Math.max(x, window.innerWidth - x),
        Math.max(y, window.innerHeight - y),
      );

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
          { clipPath: [`circle(0 at ${x}px ${y}px)`, `circle(${radius}px at ${x}px ${y}px)`] },
          {
            duration: DURATION,
            easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
            pseudoElement: '::view-transition-new(root)',
          },
        );
      });
    },
    [resolvedTheme, setTheme],
  );

  return { isDark: resolvedTheme === 'dark', toggleTheme };
}
