import { toJsxRuntime } from 'hast-util-to-jsx-runtime';
import { Fragment, jsx, jsxs } from 'react/jsx-runtime';

import { paperComponents } from '@/common/components';
import type { Language } from '@/common/lib';

import type { Root } from 'hast';

export function PaperContent({ hast, lang }: PaperContent.Props) {
  return toJsxRuntime(hast, { Fragment, jsx, jsxs, components: paperComponents(lang) });
}

export declare namespace PaperContent {
  export type Props = {
    hast: Root;
    lang: Language;
  };
}
