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

  const hast = unified()
    .use(unifiedLatexToHast as never)
    .runSync(tree as never) as never;

  visit(
    hast,
    'element',
    (node: { tagName: string; properties?: Record<string, unknown>; children: unknown[] }) => {
      const heading = /^h([3-5])$/.exec(node.tagName);
      if (heading) node.tagName = `h${Number(heading[1]) - 1}`;

      const classes = (node.properties?.className as string[] | undefined) ?? [];
      const display = classes.includes('display-math');

      if (display || classes.includes('inline-math')) {
        node.children = fromHtml(
          katex.renderToString(textOf(node), { displayMode: display, throwOnError: false }),
          { fragment: true },
        ).children;
        return;
      }

      if (!classes.includes('macro-cite') || source === undefined) return;

      const keys = keysOf(textOf(node)).filter((key) => known.has(key));
      if (keys.length === 0) return;

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
      .replace(/data-csl-entry-id="([^"]+)"/g, 'id="ref-$1" data-csl-entry-id="$1"');

    paper.bibliography = fromHtml(html, { fragment: true });
  }

  return paper;
}
