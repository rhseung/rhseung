import { IS_PRODUCTION, robotsTxt } from '@/common/lib';

export function GET() {
  return new Response(robotsTxt(IS_PRODUCTION), {
    headers: { 'content-type': 'text/plain; charset=utf-8' },
  });
}
