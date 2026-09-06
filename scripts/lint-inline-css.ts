import { readFile } from 'node:fs/promises';

import { Glob } from 'bun';

// 한 번 쓰는 `css()`/`stack()` 상수는 호출 자리에 인라인한다(AGENTS.md 4절). 이름 등장 횟수로 세되
// `$.name`·`obj.name` 같은 속성 접근은 사용처가 아니다.
const DECL = /^const (\w+) = (?:css|stack|hstack|vstack|css\.raw)\(/gm;

const offenders: string[] = [];

for await (const file of new Glob('src/**/*.tsx').scan('.')) {
  if (file.includes('.stories.')) continue;

  const source = await readFile(file, 'utf8');

  for (const [, name] of source.matchAll(DECL)) {
    const uses = source.match(new RegExp(String.raw`(?<![.\w$])${name}\b`, 'g'))?.length ?? 0;
    if (uses === 2) offenders.push(`${file}: ${name}`);
  }
}

if (offenders.length > 0) {
  console.error(`한 번만 쓰는 스타일 상수는 인라인합니다:\n  ${offenders.join('\n  ')}`);
  process.exit(1);
}
