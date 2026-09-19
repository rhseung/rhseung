import { readFile } from 'node:fs/promises';

const PIN = /^bun = "(.+)"$/m;
const FIELDS = ['installCommand', 'buildCommand'] as const;

const version = PIN.exec(await readFile('mise.toml', 'utf8'))?.[1];

if (!version) {
  console.error('mise.toml 의 [tools] 에서 bun 버전을 못 읽었습니다.');
  process.exit(1);
}

const vercel: Record<string, string> = JSON.parse(await readFile('vercel.json', 'utf8'));

const offenders = FIELDS.filter((field) => !vercel[field]?.startsWith(`bunx bun@${version} `));

if (offenders.length > 0) {
  console.error(
    `Vercel 은 mise 를 안 읽습니다. vercel.json 을 \`bunx bun@${version}\` 으로 맞추세요:\n  ${offenders
      .map((field) => `${field}: ${vercel[field]}`)
      .join('\n  ')}`,
  );
  process.exit(1);
}
