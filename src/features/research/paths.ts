import { LANGUAGES } from '@/common/lib';

import { renderPaper } from './lib/render-paper';
import { PAPER_SLUGS, researchOf } from './model';

const papers = import.meta.glob('@/content/research/*/paper.tex', {
  query: '?raw',
  import: 'default',
  eager: true,
});
const bibs = import.meta.glob('@/content/research/*/refs.bib', {
  query: '?raw',
  import: 'default',
  eager: true,
});

const sourceOf = (bucket: Record<string, unknown>, slug: string) =>
  Object.entries(bucket).find(([path]) => path.split('/').at(-2) === slug)?.[1] as
    string | undefined;

export function paperPaths() {
  return LANGUAGES.flatMap((lang) =>
    [...PAPER_SLUGS].map((slug) => {
      const item = researchOf(lang).find((entry) => entry.slug === slug);

      if (item === undefined) throw new Error(`research 에 ${slug} 가 없습니다`);

      const source = sourceOf(papers, slug);

      if (source === undefined) throw new Error(`${slug} 의 paper.tex 가 없습니다`);

      return {
        params: { lang, slug },
        props: {
          lang,
          item,
          bibtex: sourceOf(bibs, slug),
          paper: renderPaper(source, sourceOf(bibs, slug)),
        },
      };
    }),
  );
}
