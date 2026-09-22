import puppeteer from '@cloudflare/puppeteer';

import { cacheControl, empty, MINUTE } from './http';
import { LANGUAGES, type Language } from '../src/common/lib/i18n/languages';

const TITLE: Record<Language, string> = {
  ko: '류현승 - 이력서',
  en: 'Hyunseung Ryu - Resume',
};

const key = (lang: Language) => `resume/${lang}.pdf`;

export async function renderResumePdfs(
  env: Pick<Env, 'BROWSER' | 'ASSET_STORE' | 'ACCESS_CLIENT_ID' | 'ACCESS_CLIENT_SECRET'>,
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

      await page.evaluate(`document.title = ${JSON.stringify(TITLE[lang])}`);

      const pdf = await page.pdf({
        format: 'A4',
        printBackground: true,
        displayHeaderFooter: false,
        margin: { top: '16mm', right: '16mm', bottom: '16mm', left: '16mm' },
      });

      await env.ASSET_STORE.put(key(lang), pdf, {
        httpMetadata: { contentType: 'application/pdf' },
      });

      written.push(key(lang));
      await page.close();
    }

    return written;
  } finally {
    await browser.close();
  }
}

export async function resumeResponse(bucket: R2Bucket, lang: Language): Promise<Response> {
  const object = await bucket.get(key(lang));

  if (object === null) return empty(404);

  return new Response(object.body, {
    headers: {
      'content-type': 'application/pdf',
      'cache-control': cacheControl(5 * MINUTE),
      etag: object.httpEtag,
    },
  });
}
