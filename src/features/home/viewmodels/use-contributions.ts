import { useQuery } from '@tanstack/react-query';

import { SITE } from '@/common/lib';

import {
  CONTRIBUTIONS_API,
  NO_CONTRIBUTIONS,
  type Contributions,
  type ContributionDay,
} from '../models';

const ONE_HOUR = 60 * 60 * 1000;

type ContributionsResponse = {
  total: { lastYear: number };
  contributions: ContributionDay[];
};

export function toContributions(response: ContributionsResponse): Contributions {
  return { total: response.total.lastYear, days: response.contributions };
}

export async function fetchContributions(): Promise<Contributions> {
  const response = await fetch(`${CONTRIBUTIONS_API}/${SITE.handle}?y=last`);
  if (!response.ok) throw new Error(`잔디 응답이 ${response.status}다`);

  return toContributions((await response.json()) as ContributionsResponse);
}

export type ContributionsSnapshot = {
  contributions: Contributions;
  fetchedAt: number;
};

let snapshot: Promise<ContributionsSnapshot> | null = null;

export function loadContributionsSnapshot(): Promise<ContributionsSnapshot> {
  snapshot ??= fetchContributions().then(
    (contributions) => ({ contributions, fetchedAt: Date.now() }),
    () => ({ contributions: NO_CONTRIBUTIONS, fetchedAt: 0 }),
  );

  return snapshot;
}

export function useContributions({
  initialData,
  fetchedAt,
}: useContributions.Options): Contributions {
  const { data } = useQuery({
    queryKey: ['contributions', SITE.handle],
    queryFn: fetchContributions,

    initialData,

    initialDataUpdatedAt: fetchedAt,

    staleTime: ONE_HOUR,
  });

  return data;
}

export declare namespace useContributions {
  export type Options = {
    initialData: Contributions;
    fetchedAt: number;
  };
}
