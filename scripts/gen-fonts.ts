import { existsSync } from 'node:fs';
import { writeFile } from 'node:fs/promises';

import { Octokit } from '@octokit/rest';

/**
 * 유료 폰트(MonoLisa)를 private repo 에서 받아 `public/fonts/` 에 굽는다.
 *
 * EULA 가 재배포를 막아서 이 repo 에 커밋할 수 없다. `FONTS_TOKEN` 이 없으면 아무것도
 * 안 받고, `src/fonts.css` 의 `@font-face` 가 조용히 실패해 폰트 스택 다음인
 * Monaspace 로 떨어진다 - 포크와 라이선스 없는 클론이 폴백 코드 없이 그냥 돈다.
 */
const OWNER = 'rhseung';
const REPO = 'rhseung-assets';
const OUT_DIR = 'public/fonts';

const FILES = ['monolisa-normal.woff2', 'monolisa-italic.woff2'];

async function download(octokit: Octokit, file: string) {
  const path = `fonts/${file}`;
  const { data } = await octokit.rest.repos.getContent({ owner: OWNER, repo: REPO, path });

  if (Array.isArray(data) || data.type !== 'file') throw new Error(`${path} 이 파일이 아닙니다.`);

  // contents API 는 1MB 를 넘으면 본문 대신 `encoding: 'none'` 을 준다.
  if (data.encoding !== 'base64') throw new Error(`${path} 이 1MB 를 넘습니다.`);

  return Buffer.from(data.content, 'base64');
}

export async function generateFonts() {
  const auth = process.env.FONTS_TOKEN;

  if (!auth) {
    console.info('FONTS_TOKEN 이 없어 MonoLisa 를 건너뜁니다. Monaspace 로 폴백합니다.');
    return;
  }

  const octokit = new Octokit({ auth });

  // 있으면 안 받는다 - 오프라인에서도 `bun install` 의 postinstall 이 안 죽는다.
  const missing = FILES.filter((file) => !existsSync(`${OUT_DIR}/${file}`));

  await Promise.all(
    missing.map(async (file) => writeFile(`${OUT_DIR}/${file}`, await download(octokit, file))),
  );
}

if (import.meta.main) await generateFonts();
