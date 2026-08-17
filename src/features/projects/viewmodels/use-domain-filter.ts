import { useCallback, useSyncExternalStore } from 'react';

import { PROJECT_DOMAINS, type ProjectDomain } from '../models';

const PARAM = 'domain';

/** `pushState`는 `popstate`를 안 띄운다. 직접 바꿨을 때 구독자를 깨우는 신호. */
const CHANGE_EVENT = 'projects:domainchange';

function readParam(): ProjectDomain | null {
  const value = new URLSearchParams(window.location.search).get(PARAM);
  return (PROJECT_DOMAINS as readonly string[]).includes(value ?? '')
    ? (value as ProjectDomain)
    : null;
}

function subscribe(onChange: () => void) {
  window.addEventListener('popstate', onChange);
  window.addEventListener(CHANGE_EVENT, onChange);
  return () => {
    window.removeEventListener('popstate', onChange);
    window.removeEventListener(CHANGE_EVENT, onChange);
  };
}

/** 빌드타임 렌더에는 URL이 없다 — 정적 HTML은 항상 "전체" 상태로 굳는다. */
function getServerSnapshot(): ProjectDomain | null {
  return null;
}

/**
 * 필터 상태는 URL 쿼리에 산다 — 공유되고 뒤로가기가 동작한다. zustand+persist는 여기선
 * 버그다(방문자가 석 달 전 필터를 복원당한다).
 *
 * `useSyncExternalStore`인 이유: 하이드레이션이 서버 스냅샷(`null`)으로 시작해 마운트 후
 * 실제 쿼리로 넘어가야 SSG HTML과 첫 렌더가 갈리지 않는다.
 */
export function useDomainFilter() {
  const domain = useSyncExternalStore(subscribe, readParam, getServerSnapshot);

  const setDomain = useCallback((next: ProjectDomain | null) => {
    const url = new URL(window.location.href);
    if (next === null) url.searchParams.delete(PARAM);
    else url.searchParams.set(PARAM, next);

    window.history.pushState(null, '', url);
    window.dispatchEvent(new Event(CHANGE_EVENT));
  }, []);

  return { domain, setDomain, domains: PROJECT_DOMAINS };
}
