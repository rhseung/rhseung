import { useCallback, useSyncExternalStore } from 'react';

import { preferredLanguage, type Language } from '@/common/lib';

export const LANGUAGE_SUGGESTION_DISMISSED_KEY = 'language-suggestion-dismissed';

const listeners = new Set<() => void>();

function subscribe(onChange: () => void) {
  listeners.add(onChange);
  return () => listeners.delete(onChange);
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

// `navigator` 가 서버에 없다. 그 차이를 하이드레이션 불일치가 아니라 갱신으로 처리해야 한다.
export function useLanguageSuggestion(current: Language) {
  const suggested = useSyncExternalStore(
    subscribe,
    useCallback(() => read(current), [current]),
    () => null,
  );

  return { suggested, dismiss };
}
