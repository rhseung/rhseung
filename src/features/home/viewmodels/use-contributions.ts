import { useQuery } from '@tanstack/react-query';

import { SITE } from '@/common/lib';

const CONTRIBUTIONS_API = 'https://github-contributions-api.jogruber.de/v4';

/** 잔디는 1년 롤링 창이라 하루에 칸 하나가 는다. 이보다 자주 물어볼 이유가 없다. */
const ONE_HOUR = 60 * 60 * 1000;

export type ContributionDay = {
  /** `YYYY-MM-DD`. */
  date: string;
  count: number;
  /** 0~4. GitHub이 자기 분위수로 매긴 값이라 우리가 다시 나누지 않는다. */
  level: number;
};

export type Contributions = {
  total: number;
  /** 일요일에 시작해 오늘까지, 빈 날 포함 하루도 안 빠지고 온다. 격자가 이 순서에 기댄다. */
  days: ContributionDay[];
};

export const NO_CONTRIBUTIONS: Contributions = { total: 0, days: [] };

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

    // 스냅숏을 캐시에 심는다. `placeholderData`와 달리 캐시에 들어가서, 갱신 요청이 실패해도
    // 빌드 때 구운 잔디가 그대로 남는다.
    initialData,

    // 스냅숏은 빌드 시각의 것이다. 이 값을 안 주면 react-query가 "방금 받은 데이터"로 쳐서
    // 배포 직후 한 시간 동안 아무도 갱신을 못 받는다. 빌드 때 못 받았으면 0이 와서 즉시 만료다.
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
