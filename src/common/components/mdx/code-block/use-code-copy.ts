import { useEffect, useRef } from 'react';

import { delay } from 'es-toolkit';

const COPIED_DURATION = 2000;

export function useCodeCopy<T extends HTMLElement>() {
  const ref = useRef<T>(null);

  useEffect(() => {
    const root = ref.current;

    if (!root) return;

    const controller = new AbortController();
    const { signal } = controller;

    const copy = async (event: MouseEvent) => {
      const button = (event.target as HTMLElement).closest<HTMLElement>('[data-copy-code]');
      const code = button?.closest('[data-code-block]')?.querySelector('pre')?.textContent;

      if (!button || !code) return;

      try {
        await navigator.clipboard.writeText(code);
        button.dataset.copied = '';
        await delay(COPIED_DURATION, { signal });
      } catch {
        return;
      }

      delete button.dataset.copied;
    };

    root.addEventListener('click', copy, { signal });

    return () => controller.abort();
  }, []);

  return ref;
}
