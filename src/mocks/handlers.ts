import { http, HttpResponse } from 'msw';

import { CONTRIBUTIONS_API } from '@/features/home';

import type { RequestHandler } from 'msw';


// faker 를 안 쓴다. 동적 import 라도 Vite 가 청크로 묶어 프로덕션 번들에 딸려 들어간다.
const CONTRIBUTIONS = Array.from({ length: 53 * 7 }, (_, index) => {
  const date = new Date(Date.UTC(2025, 7, 17) + index * 86_400_000);

  return {
    date: date.toISOString().slice(0, 10),
    count: (index * 3) % 17,
    level: (index * 7) % 5,
  };
});

export const handlers: RequestHandler[] = [
  // 스토리가 그대로 테스트로 돈다. 진짜로 때리면 스냅숏이 네트워크를 탄다.
  http.get(`${CONTRIBUTIONS_API}/:handle`, () =>
    HttpResponse.json({ total: { lastYear: 2980 }, contributions: CONTRIBUTIONS }),
  ),
];
