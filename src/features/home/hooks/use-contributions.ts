import { useQuery } from '@tanstack/react-query';

import { SITE } from '@/common/lib';

import { CONTRIBUTIONS_API, NO_CONTRIBUTIONS, type Contributions } from '../model';

const ONE_HOUR = 60 * 60 * 1000;

async function fetchContributions(): Promise<Contributions> {
  const response = await fetch(CONTRIBUTIONS_API);
  if (!response.ok) throw new Error(`잔디 응답이 ${response.status}다`);

  return (await response.json()) as Contributions;
}

export function useContributions(): Contributions {
  const { data } = useQuery({
    queryKey: ['contributions', SITE.handle],
    queryFn: fetchContributions,
    placeholderData: NO_CONTRIBUTIONS,
    staleTime: ONE_HOUR,
  });

  return data ?? NO_CONTRIBUTIONS;
}
