import { useCallback, useSyncExternalStore } from 'react';

import { flushSync } from 'react-dom';

import { nextTheme, resolveTheme, setTheme, subscribeTheme } from '@/common/lib';

const DURATION = 450;

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

function unknownTheme() {
  return undefined;
}

export function useThemeTransition() {
  const mode = useSyncExternalStore(subscribeTheme, resolveTheme, unknownTheme);

  const toggleTheme = useCallback(
    (event: React.MouseEvent<HTMLElement>) => {
      const next = nextTheme(mode ?? resolveTheme());
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
