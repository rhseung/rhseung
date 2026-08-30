import { useCallback, useSyncExternalStore } from 'react';

import { flushSync } from 'react-dom';

import { resolveTheme, setTheme, subscribeTheme, type ThemeMode } from '@/common/lib';

const DURATION = 450;

// `::view-transition-new(root)` 는 pseudo-element 라 WAAPI 의 `pseudoElement` 로만 잡힌다.
//
// 좌표를 px 로 주면 안 된다. `-new(root)` 는 `-group(root)` 의 자식이라 group 상자가 스케일되면
// 그 안의 px 이 같이 끌려가고, 원점이 버튼에서 화면 중앙 쪽으로 밀린다. 퍼센트는 의사요소 자기
// 상자를 기준으로 풀려서 상자가 변해도 따라간다. 상용 Chrome 에서만 나오고 Playwright 와
// Safari 에서는 재현되지 않아, px 로 되돌리면 검증 없이 통과한다 (24463bf, bd974a2).
function revealFrom({ top, left, width, height }: DOMRect) {
  const { clientWidth, clientHeight } = document.documentElement;

  const originX = left + width / 2;
  const originY = top + height / 2;
  const reach = Math.hypot(
    Math.max(originX, clientWidth - originX),
    Math.max(originY, clientHeight - originY),
  );

  const x = (originX / clientWidth) * 100;
  const y = (originY / clientHeight) * 100;
  // `circle()` 의 퍼센트 반지름 기준은 참조 박스 대각선을 sqrt(2) 로 나눈 값이다.
  const radius = (reach / (Math.hypot(clientWidth, clientHeight) / Math.SQRT2)) * 100;

  document.documentElement.animate(
    { clipPath: [`circle(0% at ${x}% ${y}%)`, `circle(${radius}% at ${x}% ${y}%)`] },
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
