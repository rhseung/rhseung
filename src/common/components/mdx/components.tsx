import { i18n, type Language } from '@/common/lib';

import { Callout } from './callout';
import { CodeBlock } from './code-block';
import { Detail } from './detail';
import { Figure } from './figure';
import { MdxHeading } from './heading';
import { MdxCode } from './inline-code';
import { MdxLink } from './link';
import { MdxList } from './list';
import { MdxListItem } from './list-item';
import { MdxParagraph } from './paragraph';
import { MdxQuote } from './quote';
import { MdxRule } from './rule';
import { Shortcut } from './shortcut';
import { Stat, Stats } from './stat';
import { Step, Steps } from './steps';
import { MdxStrong } from './strong';
import { MdxTable } from './table';
import { Kbd } from '../ui/kbd';

export function mdxComponents(lang: Language) {
  const t = i18n.getFixedT(lang, 'common');
  const permalinkLabel = t(($) => $.actions.permalink);
  const copyLabel = t(($) => $.actions.copyCode);
  const copiedLabel = t(($) => $.actions.copied);

  const heading = (level: MdxHeading.Level) => (props: MdxHeading.SlotProps) => (
    <MdxHeading level={level} permalinkLabel={permalinkLabel} {...props} />
  );

  return {
    a: MdxLink,
    blockquote: MdxQuote,
    code: MdxCode,
    h1: heading(1),
    h2: heading(2),
    h3: heading(3),
    h4: heading(4),
    h5: heading(5),
    h6: heading(6),
    hr: MdxRule,
    kbd: Kbd,
    li: MdxListItem,
    ol: (props: MdxList.Props) => <MdxList ordered {...props} />,
    p: MdxParagraph,
    pre: (props: CodeBlock.SlotProps) => (
      <CodeBlock copyLabel={copyLabel} copiedLabel={copiedLabel} {...props} />
    ),
    strong: MdxStrong,
    table: MdxTable,
    ul: MdxList,
    Callout,
    Detail,
    Figure,
    Shortcut,
    Stat,
    Stats,
    Step,
    Steps,
  };
}
