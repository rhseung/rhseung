import { useCallback, useSyncExternalStore } from 'react';

import { useTheme } from 'next-themes';
import { flushSync } from 'react-dom';

import { DEFAULT_THEME_MODE, THEME_MODES, type ThemeMode } from '@/common/lib';

const DURATION = 450;

function isThemeMode(value: string | undefined): value is ThemeMode {
  return value !== undefined && (THEME_MODES as readonly string[]).includes(value);
}

function resolveMode(mode: ThemeMode) {
  if (mode !== 'system') return mode;
  return matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function subscribeNoop() {
  return () => {};
}

function isMounted() {
  return true;
}

function isNotMounted() {
  return false;
}

/**
 * `startViewTransition` 콜백이 동기라 `flushSync` 로 상태를 즉시 커밋해야 스냅숏 시점이 맞는다.
 */
export function useThemeTransition() {
  const { theme, resolvedTheme, setTheme } = useTheme();

  // next-themes는 localStorage를 첫 클라이언트 렌더에서 곧바로 읽는다. 빌드 때 구운 HTML은
  // `system`(defaultTheme)인데 방문자가 전에 light/dark를 골라뒀으면 첫 렌더부터 값이 갈려
  // 리액트가 하이드레이션 불일치로 본다. `useSyncExternalStore`의 서버 스냅숏만 `false`로 둬서
  // 첫 렌더는 서버와 맞추고, 하이드레이션이 끝난 뒤에만 진짜 값으로 바꾼다 - 언어 제안과 같은 패턴.
  const mounted = useSyncExternalStore(subscribeNoop, isMounted, isNotMounted);

  const mode = mounted && isThemeMode(theme) ? theme : DEFAULT_THEME_MODE;

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
