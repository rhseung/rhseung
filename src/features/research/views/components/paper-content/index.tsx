import { toJsxRuntime } from 'hast-util-to-jsx-runtime';
import { Fragment, jsx, jsxs } from 'react/jsx-runtime';

import { mdxComponents } from '@/common/components';
import type { Language } from '@/common/lib';

import type { Root } from 'hast';

// 논문은 hast 를 문자열로 굳히지 않고 글과 같은 컴포넌트 맵으로 렌더한다. 그래서 본문 디자인이
// 정의상 하나다. 아일랜드 children 으로 들어가므로 unified-latex 는 클라이언트에 안 실린다.
export function PaperContent({ hast, lang }: PaperContent.Props) {
  return toJsxRuntime(hast, { Fragment, jsx, jsxs, components: mdxComponents(lang) });
}

export declare namespace PaperContent {
  export type Props = {
    hast: Root;
    lang: Language;
  };
}
