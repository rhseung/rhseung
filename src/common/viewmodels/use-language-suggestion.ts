import { useCallback, useSyncExternalStore } from 'react';

import { isLanguage, type Language } from '@/common/lib';

export const LANGUAGE_SUGGESTION_DISMISSED_KEY = 'language-suggestion-dismissed';

const listeners = new Set<() => void>();

function subscribe(onChange: () => void) {
  listeners.add(onChange);
  return () => listeners.delete(onChange);
}

function preferredLanguage(tags: readonly string[]): Language | null {
  const base = tags[0]?.split('-')[0];
  return isLanguage(base) ? base : null;
}

function read(current: Language): Language | null {
  if (localStorage.getItem(LANGUAGE_SUGGESTION_DISMISSED_KEY) !== null) return null;

  const preferred = preferredLanguage(navigator.languages);
  return preferred !== null && preferred !== current ? preferred : null;
}

function dismiss() {
  localStorage.setItem(LANGUAGE_SUGGESTION_DISMISSED_KEY, 'true');
  for (const notify of listeners) notify();
}

export function useLanguageSuggestion(current: Language) {
  const suggested = useSyncExternalStore(
    subscribe,
    useCallback(() => read(current), [current]),
    () => null,
  );

  return { suggested, dismiss };
}
