import type { RequestHandler } from 'msw';

/**
 * dev·Storybook·vitest·Playwright가 공유하는 목 핸들러.
 *
 * 콘텐츠는 전부 빌드타임 content collection이라 네트워크를 타지 않는다. 여기 들어올 것은
 * 런타임에 실제로 부르는 외부 API뿐이다 — GitHub star 수, 기여 그래프 등.
 */
export const handlers: RequestHandler[] = [];
