import { readFile } from 'node:fs/promises';

import { Glob } from 'bun';

const DECL = /^const (\w+) = (?:css|stack|hstack|vstack|css\.raw)\(/gm;

const offenders: string[] = [];

for await (const file of new Glob('src/**/*.tsx').scan('.')) {
  if (file.includes('.stories.')) continue;

  const source = await readFile(file, 'utf8');

  for (const [, name] of source.matchAll(DECL)) {
    const uses =
      source.match(new RegExp(String.raw`(?<![.\w$])${name}(?!\w)(?!\s*[:=])`, 'g'))?.length ?? 0;
    if (uses === 1) offenders.push(`${file}: ${name}`);
  }
}

if (offenders.length > 0) {
  console.error(`한 번만 쓰는 스타일 상수는 인라인합니다:\n  ${offenders.join('\n  ')}`);
  process.exit(1);
}
