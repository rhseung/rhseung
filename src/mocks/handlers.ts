import { http, HttpResponse } from 'msw';

import { CONTRIBUTIONS_API } from '@/features/home';

import type { RequestHandler } from 'msw';

const CONTRIBUTIONS = Array.from({ length: 53 * 7 }, (_, index) => {
  const date = new Date(Date.UTC(2025, 7, 17) + index * 86_400_000);

  return {
    date: date.toISOString().slice(0, 10),
    count: (index * 3) % 17,
    level: (index * 7) % 5,
  };
});

export const handlers: RequestHandler[] = [
  http.get(`${CONTRIBUTIONS_API}/:handle`, () =>
    HttpResponse.json({ total: { lastYear: 2980 }, contributions: CONTRIBUTIONS }),
  ),
];
