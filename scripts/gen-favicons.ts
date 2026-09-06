import { existsSync } from 'node:fs';
import { copyFile, mkdir, readdir, readFile, unlink, writeFile } from 'node:fs/promises';
import { join } from 'node:path';

import { chunk } from 'es-toolkit';

/**
 * MDX 의 외부 링크 도메인마다 파비콘을 받아 `public/favicons/` 에 굽고, 어떤 도메인이
 * 있는지를 `src/common/lib/favicon-hosts.gen.ts` 로 내보낸다.
 *
 * 독자 브라우저가 남의 서버를 치지 않게 빌드 타임에 한 번만 받는다 - 폰트를 자체
 * 호스팅하는 것과 같은 이유다. 받은 파일은 `node_modules/.cache` 에 남겨 Vercel 이 빌드
 * 사이에 캐시하는 디렉터리를 타게 한다 - 웜 빌드는 네트워크를 안 탄다.
 */
const CONTENT = 'src/content';
const OUT_DIR = 'public/favicons';
const CACHE_DIR = 'node_modules/.cache/favicons';
const MANIFEST = 'src/common/lib/favicon-hosts.gen.ts';
const CONCURRENCY = 10;
const TIMEOUT_MS = 10_000;

/**
 * 사이트마다 `.ico`·`.svg`·여러 크기로 흩어져 있고 HTML 을 파싱해야 찾을 수 있다.
 * s2 는 어느 도메인이든 같은 크기의 PNG 하나로 정규화해준다.
 */
const source = (host: string) => `https://www.google.com/s2/favicons?domain=${host}&sz=64`;

/** 마크다운 링크만 본다. 코드 블록 안의 벌거벗은 URL 은 링크가 아니다. */
const MARKDOWN_LINK = /\]\((https?:\/\/[^)\s]+)\)/g;

async function mdxFiles(dir: string): Promise<string[]> {
  const entries = await readdir(dir, { withFileTypes: true, recursive: true });

  return entries
    .filter((entry) => entry.isFile() && entry.name.endsWith('.mdx'))
    .map((entry) => join(entry.parentPath, entry.name));
}

export async function collectHosts(): Promise<string[]> {
  const files = await mdxFiles(CONTENT);
  const sources = await Promise.all(files.map((file) => readFile(file, 'utf8')));
  const hosts = new Set<string>();

  for (const source of sources) {
    for (const [, url] of source.matchAll(MARKDOWN_LINK)) {
      hosts.add(new URL(url).host);
    }
  }

  return [...hosts].sort();
}

async function fetchFavicon(host: string): Promise<boolean> {
  const file = `${host}.png`;
  const cached = join(CACHE_DIR, file);

  if (!existsSync(cached)) {
    // 한 도메인이 안 받아진다고 `postinstall` 이 죽으면 `bun install` 이 통째로 실패한다.
    try {
      const response = await fetch(source(host), { signal: AbortSignal.timeout(TIMEOUT_MS) });

      if (!response.ok) return false;

      await writeFile(cached, Buffer.from(await response.arrayBuffer()));
    } catch {
      return false;
    }
  }

  await copyFile(cached, join(OUT_DIR, file));

  return true;
}

export async function generateFavicons() {
  const hosts = await collectHosts();

  await mkdir(OUT_DIR, { recursive: true });
  await mkdir(CACHE_DIR, { recursive: true });

  const wanted = new Set(hosts.map((host) => `${host}.png`));

  for (const file of await readdir(OUT_DIR)) {
    if (!wanted.has(file)) await unlink(join(OUT_DIR, file));
  }

  const saved: string[] = [];

  for (const batch of chunk(hosts, CONCURRENCY)) {
    const results = await Promise.all(
      batch.map(async (host) => [host, await fetchFavicon(host)] as const),
    );

    for (const [host, ok] of results) {
      if (ok) saved.push(host);
      else console.warn(`favicon 을 못 받았습니다: ${host}`);
    }
  }

  const body = saved.map((host) => `  '${host}',`).join('\n');

  await writeFile(
    MANIFEST,
    `// 생성물입니다. \`bun run gen:favicons\` 로 다시 굽습니다.\n` +
      `export const FAVICON_HOSTS = new Set([\n${body}\n]);\n`,
  );
}

if (import.meta.main) await generateFavicons();
