import { mkdir, readdir, readFile, unlink, writeFile } from 'node:fs/promises';
import { join } from 'node:path';

/**
 * MDX 의 외부 링크 도메인마다 파비콘을 받아 `public/favicons/` 에 굽고, 어떤 도메인이
 * 있는지를 `src/common/lib/favicon-hosts.gen.ts` 로 내보낸다.
 *
 * 독자 브라우저가 남의 서버를 치지 않게 빌드 타임에 한 번만 받는다 - 폰트를 자체
 * 호스팅하는 것과 같은 이유다.
 */
const CONTENT = 'src/content';
const OUT_DIR = 'public/favicons';
const MANIFEST = 'src/common/lib/favicon-hosts.gen.ts';

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

async function download(host: string, path: string): Promise<boolean> {
  const response = await fetch(source(host));

  if (!response.ok) return false;

  await writeFile(path, Buffer.from(await response.arrayBuffer()));

  return true;
}

export async function generateFavicons() {
  const hosts = await collectHosts();

  await mkdir(OUT_DIR, { recursive: true });

  const existing = new Set(await readdir(OUT_DIR));
  const wanted = new Set(hosts.map((host) => `${host}.png`));

  for (const file of existing) {
    if (!wanted.has(file)) await unlink(join(OUT_DIR, file));
  }

  const saved: string[] = [];

  for (const host of hosts) {
    const file = `${host}.png`;

    if (existing.has(file) || (await download(host, join(OUT_DIR, file)))) {
      saved.push(host);
    } else {
      console.warn(`favicon 을 못 받았습니다: ${host}`);
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
