import { LANGUAGES } from '../src/common/lib/i18n/languages';

const ATTEMPTS = 3;
const RETRY_MS = 25_000;

function fail(message: string): never {
  console.error(message);
  process.exit(1);
}

function required(name: string): string {
  const value = process.env[name];

  return value === undefined || value === '' ? fail(`${name} 이 비어 있습니다`) : value;
}

function accessHeaders(): Record<string, string> {
  const id = process.env.ACCESS_CLIENT_ID;
  const secret = process.env.ACCESS_CLIENT_SECRET;

  return id && secret ? { 'CF-Access-Client-Id': id, 'CF-Access-Client-Secret': secret } : {};
}

const origin = required('RESUME_ORIGIN');
const headers = accessHeaders();

async function render(): Promise<void> {
  for (let attempt = 1; attempt <= ATTEMPTS; attempt += 1) {
    const status = await fetch(`${origin}/api/render-resume`, {
      method: 'POST',
      redirect: 'manual',
      headers: { ...headers, 'x-render-token': required('RENDER_TOKEN') },
    })
      .then((response) => response.status)
      .catch(() => 0);

    if (status === 200) {
      console.log('렌더 완료');
      return;
    }

    if (attempt === ATTEMPTS) fail(`렌더가 ${ATTEMPTS}번 다 실패했습니다 (마지막 응답 ${status})`);

    console.error(
      `렌더 실패(${status}), ${RETRY_MS / 1000}초 뒤 다시 시도합니다 (${attempt}/${ATTEMPTS})`,
    );
    await Bun.sleep(RETRY_MS);
  }
}

async function verify(): Promise<void> {
  for (const lang of LANGUAGES) {
    const url = `${origin}/resume-${lang}.pdf`;
    const response = await fetch(url, { redirect: 'manual', headers });
    const type = response.headers.get('content-type') ?? '';

    if (response.status !== 200 || !type.startsWith('application/pdf')) {
      fail(`${url} 가 [${response.status} ${type}] 입니다`);
    }

    console.log(`ok ${url}`);
  }
}

await render();
await verify();
