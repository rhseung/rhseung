import { existsSync } from 'node:fs';
import { copyFile, mkdir, readdir, readFile, unlink, writeFile } from 'node:fs/promises';
import { join } from 'node:path';

import { Glob } from 'bun';
import { chunk } from 'es-toolkit';

const CONTENT = 'src/content';
const OUT_DIR = 'public/favicons';
const CACHE_DIR = 'node_modules/.cache/favicons';
const MANIFEST = 'src/common/lib/favicon-hosts.gen.ts';
const CONCURRENCY = 10;
const TIMEOUT_MS = 10_000;

const source = (host: string) => `https://www.google.com/s2/favicons?domain=${host}&sz=64`;

const MARKDOWN_LINK = /\]\((https?:\/\/[^)\s]+)\)/g;

export async function collectHosts(): Promise<string[]> {
  const hosts = new Set<string>();

  for await (const file of new Glob('**/*.mdx').scan({ cwd: CONTENT, absolute: true })) {
    for (const [, url] of (await readFile(file, 'utf8')).matchAll(MARKDOWN_LINK)) {
      hosts.add(new URL(url).host);
    }
  }

  return [...hosts].sort();
}

async function fetchFavicon(host: string): Promise<boolean> {
  const file = `${host}.png`;
  const cached = join(CACHE_DIR, file);

  if (!existsSync(cached)) {
    try {
      const response = await fetch(source(host), { signal: AbortSignal.timeout(TIMEOUT_MS) });

      if (!response.ok) return false;

      await writeFile(cached, Buffer.from(await response.arrayBuffer()));
    } catch {
      return false;
    }
  }

  try {
    await copyFile(cached, join(OUT_DIR, file));
  } catch {
    return false;
  }

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
