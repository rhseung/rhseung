import { contributionsResponse, refreshContributions } from './contributions';
import { faviconResponse } from './favicon';
import { empty } from './http';
import { renderResumePdfs, resumeResponse } from './resume';
import { isLanguage, LANGUAGES } from '../src/common/lib/i18n/languages';

const FAVICON = /^\/api\/favicon\/([^/]+)$/;
const RESUME = /^\/resume-([a-z]{2})\.pdf$/;

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const { pathname } = url;

    const favicon = FAVICON.exec(pathname);

    if (favicon !== null) {
      if (request.method !== 'GET') return empty(405);

      const cache = caches.default;
      const hit = await cache.match(request);

      if (hit !== undefined) return hit;

      const response = await faviconResponse(decodeURIComponent(favicon[1]));

      if (response.ok) ctx.waitUntil(cache.put(request, response.clone()));

      return response;
    }

    if (pathname === '/api/contributions') {
      if (request.method !== 'GET') return empty(405);

      return contributionsResponse(env);
    }

    const resume = RESUME.exec(pathname);

    if (resume !== null && isLanguage(resume[1])) {
      return resumeResponse(env, resume[1]);
    }

    if (pathname === '/api/render-resume') {
      if (request.method !== 'POST') return empty(405);

      if (
        env.RENDER_TOKEN === undefined ||
        request.headers.get('x-render-token') !== env.RENDER_TOKEN
      ) {
        return empty(401);
      }

      try {
        return Response.json({ written: await renderResumePdfs(env, url.origin) });
      } catch (error) {
        return Response.json(
          { error: error instanceof Error ? `${error.name}: ${error.message}` : String(error) },
          { status: 500 },
        );
      }
    }

    const response = await env.ASSETS.fetch(request);

    if (response.status === 404) {
      const lang = LANGUAGES.find((candidate) => pathname.startsWith(`/${candidate}/`));

      if (lang !== undefined) {
        const localized = await env.ASSETS.fetch(new URL(`/${lang}/404/`, request.url));

        if (localized.ok)
          return new Response(localized.body, { status: 404, headers: localized.headers });
      }
    }

    return response;
  },

  async scheduled(_event, env, ctx) {
    ctx.waitUntil(refreshContributions(env));
  },
} satisfies ExportedHandler<Env>;
