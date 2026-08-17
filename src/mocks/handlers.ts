import type { RequestHandler } from 'msw';

/** 소비자가 아직 없다. GitHub API 같은 외부 호출이 생기면 여기 채운다. */
export const handlers: RequestHandler[] = [];
