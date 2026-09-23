import puppeteer from '@cloudflare/puppeteer';

import { cacheControl, empty, MINUTE } from './http';
import { LANGUAGES, type Language } from '../src/common/lib/i18n/languages';

const key = (environment: string, lang: Language) => `resume/${environment}/${lang}.pdf`;

export async function renderResumePdfs(
  env: Pick<
    Env,
    'BROWSER' | 'ASSET_STORE' | 'ENVIRONMENT' | 'ACCESS_CLIENT_ID' | 'ACCESS_CLIENT_SECRET'
  >,
  origin: string,
): Promise<string[]> {
  const browser = await puppeteer.launch(env.BROWSER);

  try {
    const written: string[] = [];

    for (const lang of LANGUAGES) {
      const page = await browser.newPage();

      if (env.ACCESS_CLIENT_ID !== undefined && env.ACCESS_CLIENT_SECRET !== undefined) {
        await page.setExtraHTTPHeaders({
          'CF-Access-Client-Id': env.ACCESS_CLIENT_ID,
          'CF-Access-Client-Secret': env.ACCESS_CLIENT_SECRET,
        });
      }

      const response = await page.goto(`${origin}/${lang}/resume/`, { waitUntil: 'networkidle0' });

      if (response === null || response.status() !== 200) {
        throw new Error(`/${lang}/resume/ 가 ${response?.status() ?? '응답 없음'} 입니다`);
      }

      await page.emulateMediaType('print');

      const pdf = await page.pdf({
        format: 'A4',
        printBackground: true,
        displayHeaderFooter: false,
        margin: { top: '16mm', right: '16mm', bottom: '16mm', left: '16mm' },
      });

      await env.ASSET_STORE.put(key(env.ENVIRONMENT, lang), pdf, {
        httpMetadata: { contentType: 'application/pdf' },
      });

      written.push(key(env.ENVIRONMENT, lang));
      await page.close();
    }

    return written;
  } finally {
    await browser.close();
  }
}

export async function resumeResponse(
  env: Pick<Env, 'ASSET_STORE' | 'ENVIRONMENT'>,
  lang: Language,
): Promise<Response> {
  const object = await env.ASSET_STORE.get(key(env.ENVIRONMENT, lang));

  if (object === null) return empty(404);

  return new Response(object.body, {
    headers: {
      'content-type': 'application/pdf',
      'cache-control': cacheControl(5 * MINUTE),
      etag: object.httpEtag,
    },
  });
}
