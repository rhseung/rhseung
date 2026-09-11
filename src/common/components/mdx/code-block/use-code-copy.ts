import { useEffect, useRef } from 'react';

const COPIED_DURATION = 2000;

export function useCodeCopy<T extends HTMLElement>() {
  const ref = useRef<T>(null);

  useEffect(() => {
    const root = ref.current;

    if (!root) return;

    const copy = async (event: MouseEvent) => {
      const button = (event.target as HTMLElement).closest<HTMLElement>('[data-copy-code]');
      const code = button?.closest('[data-code-block]')?.querySelector('pre')?.textContent;

      if (!button || !code) return;

      try {
        await navigator.clipboard.writeText(code);
      } catch {
        return;
      }

      button.dataset.copied = '';
      setTimeout(() => delete button.dataset.copied, COPIED_DURATION);
    };

    root.addEventListener('click', copy);

    return () => root.removeEventListener('click', copy);
  }, []);

  return ref;
}
