import { Cite } from '@citation-js/core';
import '@citation-js/plugin-bibtex';
import '@citation-js/plugin-csl';
import { unifiedLatexToHast } from '@unified-latex/unified-latex-to-hast';
import { parse } from '@unified-latex/unified-latex-util-parse';
import { printRaw } from '@unified-latex/unified-latex-util-print-raw';
import { visit as visitLatex } from '@unified-latex/unified-latex-util-visit';
import { fromHtml } from 'hast-util-from-html';
import katex from 'katex';
import { unified } from 'unified';
import { visit } from 'unist-util-visit';

import type { Root } from 'hast';

export type Paper = {
  title?: string;
  authors?: string;
  abstract?: string;
  body: Root;
  bibliography?: Root;
};

const STYLE = 'apa';

function textOf(node: unknown): string {
  let out = '';
  visit(node as never, 'text', (child: { value: string }) => {
    out += child.value;
  });
  return out;
}

function keysOf(raw: string): string[] {
  return raw.split(',').map((key) => key.trim());
}

/**
 * KaTeX 를 MathML 전용으로 돌리지 않는 이유: MathML Core 가 `mathvariant` 를 `normal`
 * 빼고 다 뺐고 크롬이 그 속성을 버린다. `\mathbf` 이 조용히 이탤릭으로 나온다.
 */
export function renderPaper(tex: string, bib?: string): Paper {
  const tree = parse(tex);

  const paper: Paper = { body: { type: 'root', children: [] } };
  const cited: string[] = [];

  visitLatex(tree, (node) => {
    if (node.type === 'environment' && printRaw(node.env) === 'abstract')
      paper.abstract = printRaw(node.content).trim();

    if (node.type !== 'macro') return;

    const body = node.args?.at(-1)?.content;
    if (body === undefined) return;

    if (node.content === 'title') paper.title = printRaw(body);
    if (node.content === 'author') paper.authors = printRaw(body);
    if (node.content === 'cite') cited.push(...keysOf(printRaw(body)));
  });

  const source = bib === undefined ? undefined : new Cite(bib);
  const known = new Set<string>(source?.data.map((entry: { id: string }) => entry.id) ?? []);

  // `convertToHtml` 대신 hast 를 거치는 이유: 수식과 인용을 트리에서 갈아끼워야 한다.
  // 캐스팅은 unified-latex 의 플러그인 타입이 unified 의 `Root` 와 안 맞아서다.
  const hast = unified()
    .use(unifiedLatexToHast as never)
    .runSync(tree as never) as never;

  visit(
    hast,
    'element',
    (node: { tagName: string; properties?: Record<string, unknown>; children: unknown[] }) => {
      // unified-latex 는 `\section` 을 h3 으로 낸다. 페이지 제목이 h1 이라 h2 가 비어
      // 레벨을 건너뛴다.
      const heading = /^h([3-5])$/.exec(node.tagName);
      if (heading) node.tagName = `h${Number(heading[1]) - 1}`;

      const classes = (node.properties?.className as string[] | undefined) ?? [];
      const display = classes.includes('display-math');

      if (display || classes.includes('inline-math')) {
        // 문자열이 아니라 트리로 넣어야 `raw` 노드 없이 JSX 로 바로 나간다.
        node.children = fromHtml(
          katex.renderToString(textOf(node), { displayMode: display, throwOnError: false }),
          { fragment: true },
        ).children;
        return;
      }

      if (!classes.includes('macro-cite') || source === undefined) return;

      const keys = keysOf(textOf(node)).filter((key) => known.has(key));
      if (keys.length === 0) return;

      // CSL 이 여러 키를 한 문장으로 조판하므로 마크를 쪼갤 수 없다.
      node.tagName = 'a';
      node.properties = { className: ['citation'], href: `#ref-${keys[0]}` };
      node.children = [
        { type: 'text', value: source.format('citation', { template: STYLE, entry: keys }) },
      ];
    },
  );

  paper.body = hast;

  const entries = [...new Set(cited)].filter((key) => known.has(key));

  if (source !== undefined && entries.length > 0) {
    const html: string = source
      .format('bibliography', { format: 'html', template: STYLE, entry: entries })
      // citation-js 는 앵커로 쓸 `id` 를 안 붙인다. 인용 마크가 걸 자리를 만든다.
      .replace(/data-csl-entry-id="([^"]+)"/g, 'id="ref-$1" data-csl-entry-id="$1"');

    paper.bibliography = fromHtml(html, { fragment: true });
  }

  return paper;
}
