import { useCallback, useSyncExternalStore } from 'react';

import { preferredLanguage, type Language } from '@/common/lib';

/** 스토리북이 이 값을 미리 심어서 제안을 닫힌 상태로 고정한다. */
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

// `setState`를 부르지 않고 외부 스토어로 읽는다 - `navigator`가 서버에 없어서 서버
// 스냅숏은 `null`이고, 그 차이를 하이드레이션 불일치가 아니라 정상 갱신으로 처리하는 게
// `useSyncExternalStore`가 있는 이유다.
export function useLanguageSuggestion(current: Language) {
  const suggested = useSyncExternalStore(
    subscribe,
    useCallback(() => read(current), [current]),
    () => null,
  );

  return { suggested, dismiss };
}
