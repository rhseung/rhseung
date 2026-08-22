import { useCallback } from 'react';

import { useTheme } from 'next-themes';
import { flushSync } from 'react-dom';

const DURATION = 450;

export const THEME_MODES = ['light', 'dark', 'system'] as const;

export type ThemeMode = (typeof THEME_MODES)[number];

function isThemeMode(value: string | undefined): value is ThemeMode {
  return value !== undefined && (THEME_MODES as readonly string[]).includes(value);
}

function resolveMode(mode: ThemeMode) {
  if (mode !== 'system') return mode;
  return matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

/**
 * `startViewTransition` 콜백이 동기라 `flushSync` 로 상태를 즉시 커밋해야 스냅숏 시점이 맞는다.
 */
export function useThemeTransition() {
  const { theme, resolvedTheme, setTheme } = useTheme();

  const mode = isThemeMode(theme) ? theme : 'system';

  const cycleTheme = useCallback(
    (event: React.MouseEvent<HTMLElement>) => {
      const next = THEME_MODES[(THEME_MODES.indexOf(mode) + 1) % THEME_MODES.length];
      const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;

      // 시스템으로 돌아갈 때 OS 설정이 지금 화면과 같으면 아무것도 안 바뀐다. 그때 원을
      // 퍼뜨리면 일어나지 않은 일이 일어난 것처럼 보인다.
      const unchanged = resolveMode(next) === resolvedTheme;

      if (reduced || unchanged || !document.startViewTransition) {
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
    [mode, resolvedTheme, setTheme],
  );

  return { mode, cycleTheme };
}
