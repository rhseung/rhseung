import { useCallback, useSyncExternalStore } from 'react';

import { flushSync } from 'react-dom';

import { resolveTheme, setTheme, subscribeTheme, type ThemeMode } from '@/common/lib';

const DURATION = 450;

// `::view-transition-new(root)` 는 pseudo-element 라 WAAPI 의 `pseudoElement` 로만 잡힌다.
// 퍼센트 반지름은 참조 박스 대각선을 sqrt(2) 로 나눈 값 기준이라, px 로 줘야 계산이 화면 좌표와
// 그대로 맞는다.
function revealFrom({ top, left, width, height }: DOMRect) {
  const { clientWidth, clientHeight } = document.documentElement;

  const x = left + width / 2;
  const y = top + height / 2;
  const radius = Math.hypot(Math.max(x, clientWidth - x), Math.max(y, clientHeight - y));

  document.documentElement.animate(
    { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${radius}px at ${x}px ${y}px)`] },
    {
      duration: DURATION,
      easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
      pseudoElement: '::view-transition-new(root)',
    },
  );
}

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

      const origin = event.currentTarget.getBoundingClientRect();

      // 이 플래그가 붙은 동안만 페이지 전환용 크로스페이드가 꺼진다 (`styles.css`).
      document.documentElement.dataset.themeTransition = '';

      const transition = document.startViewTransition(() => {
        flushSync(() => setTheme(next));
      });

      void transition.ready.then(() => revealFrom(origin));

      void transition.finished.then(() => {
        delete document.documentElement.dataset.themeTransition;
      });
    },
    [mode],
  );

  return { mode, toggleTheme };
}
