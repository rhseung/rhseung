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

/**
 * 빌드(Node)와 브라우저 양쪽이 이 함수를 부른다. 스냅숏을 굽는 쪽과 갱신하는 쪽이 갈라지면
 * 한쪽만 고쳤을 때 모양이 어긋나는데, 어긋난 걸 잡아주는 게 아무것도 없다.
 */
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

    // `placeholderData` 와 달리 캐시에 들어가서 갱신이 실패해도 스냅숏이 남는다.
    initialData,

    // 안 주면 react-query 가 "방금 받은 데이터"로 쳐서 배포 직후 한 시간을 통째로 넘긴다.
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
