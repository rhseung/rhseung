import { existsSync } from 'node:fs';
import { writeFile } from 'node:fs/promises';

import { Octokit } from '@octokit/rest';

const OWNER = 'rhseung';
const REPO = 'rhseung-assets';
const OUT_DIR = 'public/fonts';

const FILES = ['monolisa-normal.woff2', 'monolisa-italic.woff2'];

async function download(octokit: Octokit, file: string) {
  const path = `fonts/${file}`;
  const { data } = await octokit.rest.repos.getContent({ owner: OWNER, repo: REPO, path });

  if (Array.isArray(data) || data.type !== 'file') throw new Error(`${path} 이 파일이 아닙니다.`);

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

  const missing = FILES.filter((file) => !existsSync(`${OUT_DIR}/${file}`));

  await Promise.all(
    missing.map(async (file) => writeFile(`${OUT_DIR}/${file}`, await download(octokit, file))),
  );
}

if (import.meta.main) await generateFonts();
