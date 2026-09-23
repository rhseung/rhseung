import { existsSync } from 'node:fs';

import { z } from 'zod';

import wrangler from '../wrangler.jsonc';

const OUT_DIR = 'public/fonts';
const PREFIX = 'fonts';

const FILES = ['monolisa-normal.woff2', 'monolisa-italic.woff2'];

const config = z
  .object({ r2_buckets: z.array(z.object({ bucket_name: z.string() })).nonempty() })
  .parse(wrangler);

const BUCKET = config.r2_buckets[0].bucket_name;

function download(file: string): boolean {
  try {
    const { exitCode, stderr } = Bun.spawnSync([
      'wrangler',
      'r2',
      'object',
      'get',
      `${BUCKET}/${PREFIX}/${file}`,
      '--file',
      `${OUT_DIR}/${file}`,
      '--remote',
    ]);

    if (exitCode !== 0) console.info(stderr.toString().trim());

    return exitCode === 0;
  } catch {
    return false;
  }
}

export function generateFonts() {
  const missing = FILES.filter((file) => !existsSync(`${OUT_DIR}/${file}`));

  for (const file of missing) {
    if (!download(file)) {
      console.info(`${file} 을 받지 못했습니다. 시스템 고정폭으로 폴백합니다.`);
    }
  }
}

if (import.meta.main) generateFonts();
