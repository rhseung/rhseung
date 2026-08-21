import { http, HttpResponse } from 'msw';

import type { RequestHandler } from 'msw';

// 잔디 픽스처. faker를 안 쓰는 건 devDependency라서다 - `mocks/browser`가 동적 import라도
// Vite가 청크로 묶어서 프로덕션 번들에 딸려 들어간다.
const CONTRIBUTIONS = Array.from({ length: 53 * 7 }, (_, index) => {
  const date = new Date(Date.UTC(2025, 7, 17) + index * 86_400_000);

  return {
    date: date.toISOString().slice(0, 10),
    count: (index * 3) % 17,
    level: (index * 7) % 5,
  };
});

export const handlers: RequestHandler[] = [
  // 스토리가 vitest 브라우저 프로젝트에서 그대로 테스트로 돈다. 진짜 프록시를 때리면
  // 네트워크 상태에 따라 스냅숏이 흔들리고 a11y 실행이 남의 서버에 묶인다.
  http.get('https://github-contributions-api.jogruber.de/v4/:handle', () =>
    HttpResponse.json({ total: { lastYear: 2980 }, contributions: CONTRIBUTIONS }),
  ),
];
