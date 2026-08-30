import { readFile, writeFile } from 'node:fs/promises';

import { SKILL_GROUPS, type TechSpec } from '../src/content/skills';

/** README 의 `## Tech` 구간을 `src/content/skills.ts` 에서 다시 굽는다. 마커 밖은 안 건드린다. */
const README = 'README.md';
const START = '<!-- tech:start -->';
const END = '<!-- tech:end -->';

/** shields 는 라벨의 `_`·`-`·공백을 이스케이프로 읽는다. */
function escapeLabel(name: string): string {
  return name.replaceAll('_', '__').replaceAll('-', '--').replaceAll(' ', '_');
}

/** 밝은 바탕에 흰 로고를 얹으면 안 보인다. WCAG 상대 휘도로 가른다. */
function logoColor(hex: string): 'black' | 'white' {
  const channel = (offset: number) => {
    const value = Number.parseInt(hex.slice(offset, offset + 2), 16) / 255;
    return value <= 0.03928 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4;
  };

  const luminance = 0.2126 * channel(0) + 0.7152 * channel(2) + 0.0722 * channel(4);

  return luminance > 0.45 ? 'black' : 'white';
}

function badge({ name, hex, icon }: TechSpec): string {
  const fill = hex.slice(1); // shields 는 `#` 없는 hex 를 받는다
  const logo = icon === undefined ? '' : `&logo=${icon.slug}&logoColor=${logoColor(fill)}`;

  return `[![${name}](https://img.shields.io/badge/${escapeLabel(name)}-${fill}?style=for-the-badge${logo})](#)`;
}

export function renderTech(): string {
  return [...SKILL_GROUPS]
    .sort((a, b) => a.order - b.order)
    .map((group) => [`**${group.en.group}**`, '', ...group.items.map(badge)].join('\n'))
    .join('\n\n');
}

export async function generateReadme() {
  const source = await readFile(README, 'utf8');
  const start = source.indexOf(START);
  const end = source.indexOf(END);

  if (start === -1 || end === -1) {
    throw new Error(`${README} 에 ${START} / ${END} 마커가 없습니다.`);
  }

  const next = `${source.slice(0, start + START.length)}\n\n${renderTech()}\n\n${source.slice(end)}`;

  if (next !== source) {
    await writeFile(README, next);
  }
}

if (import.meta.main) await generateReadme();
