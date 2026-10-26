import { useCallback } from 'react';

import { parseAsString, parseAsStringLiteral, useQueryStates } from 'nuqs';

import { PROJECT_CATEGORIES, type ProjectCategory } from '../model';

export type ProjectFilters = {
  category: ProjectCategory | null;
  query: string;
};

const PARSERS = {
  category: parseAsStringLiteral(PROJECT_CATEGORIES),
  q: parseAsString.withDefault(''),
};

const OPTIONS = { history: 'replace', clearOnDefault: true } as const;

export function useProjectFilters() {
  const [{ category, q }, setParams] = useQueryStates(PARSERS, OPTIONS);

  const setCategory = useCallback(
    (next: ProjectCategory | null) => void setParams({ category: next }),
    [setParams],
  );

  const setQuery = useCallback((query: string) => void setParams({ q: query }), [setParams]);

  const reset = useCallback(() => void setParams(null), [setParams]);

  return {
    filters: { category, query: q } satisfies ProjectFilters,
    setCategory,
    setQuery,
    reset,
    active: category !== null || q !== '',
  };
}
