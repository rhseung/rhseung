import { useCallback, useSyncExternalStore } from 'react';

import { PROJECT_DOMAINS, type ProjectDomain } from '../models';

const CHANGE_EVENT = 'projects:filterchange';

export type ProjectFilters = {
  domain: ProjectDomain | null;
  stack: readonly string[];
  query: string;
};

const EMPTY: ProjectFilters = { domain: null, stack: [], query: '' };

function readFilters(): ProjectFilters {
  const params = new URLSearchParams(window.location.search);
  const domain = params.get('domain');
  const stack = params.get('stack');

  return {
    domain: (PROJECT_DOMAINS as readonly string[]).includes(domain ?? '')
      ? (domain as ProjectDomain)
      : null,
    stack: stack ? stack.split(',').filter(Boolean) : [],
    query: params.get('q') ?? '',
  };
}

/** 스냅숏이 매번 새 객체면 `useSyncExternalStore` 가 무한 렌더한다. URL 을 키로 캐시한다. */
let snapshot: ProjectFilters = EMPTY;
let snapshotKey = '';

function getSnapshot(): ProjectFilters {
  const key = window.location.search;
  if (key !== snapshotKey) {
    snapshotKey = key;
    snapshot = readFilters();
  }
  return snapshot;
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
function getServerSnapshot(): ProjectFilters {
  return EMPTY;
}

function commit(next: ProjectFilters) {
  const url = new URL(window.location.href);
  const { searchParams } = url;

  if (next.domain === null) searchParams.delete('domain');
  else searchParams.set('domain', next.domain);

  if (next.stack.length === 0) searchParams.delete('stack');
  else searchParams.set('stack', next.stack.join(','));

  if (next.query === '') searchParams.delete('q');
  else searchParams.set('q', next.query);

  // 타이핑마다 히스토리를 쌓으면 뒤로가기가 글자 수만큼 필요해진다.
  window.history.replaceState(null, '', url);
  window.dispatchEvent(new Event(CHANGE_EVENT));
}

/** 필터 상태는 URL 쿼리에 산다 — 공유되고 뒤로가기가 동작한다. */
export function useProjectFilters() {
  const filters = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const setDomain = useCallback(
    (domain: ProjectDomain | null) => {
      commit({ ...filters, domain });
    },
    [filters],
  );

  const toggleStack = useCallback(
    (item: string) => {
      const stack = filters.stack.includes(item)
        ? filters.stack.filter((value) => value !== item)
        : [...filters.stack, item];
      commit({ ...filters, stack });
    },
    [filters],
  );

  const setQuery = useCallback(
    (query: string) => {
      commit({ ...filters, query });
    },
    [filters],
  );

  const reset = useCallback(() => {
    commit(EMPTY);
  }, []);

  const active = filters.domain !== null || filters.stack.length > 0 || filters.query !== '';

  return { filters, setDomain, toggleStack, setQuery, reset, active, domains: PROJECT_DOMAINS };
}
