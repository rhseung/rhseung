import { useCallback } from 'react';

import { parseAsArrayOf, parseAsString, useQueryStates } from 'nuqs';

export type ProjectFilters = {
  stack: readonly string[];
  query: string;
};

const PARSERS = {
  stack: parseAsArrayOf(parseAsString).withDefault([]),
  q: parseAsString.withDefault(''),
};

/** 기본값이면 쿼리에서 아예 뺀다 - `?stack=&q=` 같은 빈 파라미터가 링크에 남지 않게. */
const OPTIONS = { history: 'replace', clearOnDefault: true } as const;

export function useProjectFilters() {
  const [{ stack, q }, setParams] = useQueryStates(PARSERS, OPTIONS);

  const setStack = useCallback(
    (next: readonly string[]) => void setParams({ stack: [...next] }),
    [setParams],
  );

  const toggleStack = useCallback(
    (item: string) =>
      void setParams((previous) => ({
        stack: previous.stack.includes(item)
          ? previous.stack.filter((value) => value !== item)
          : [...previous.stack, item],
      })),
    [setParams],
  );

  const setQuery = useCallback((query: string) => void setParams({ q: query }), [setParams]);

  const reset = useCallback(() => void setParams(null), [setParams]);

  return {
    filters: { stack, query: q } satisfies ProjectFilters,
    setStack,
    toggleStack,
    setQuery,
    reset,
    active: stack.length > 0 || q !== '',
  };
}
