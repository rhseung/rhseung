import { bundledLanguagesInfo } from 'shiki';

import type { ShikiConfig } from 'astro';

const DISPLAY_NAMES = new Map(
  bundledLanguagesInfo.flatMap((info) =>
    [info.id, ...(info.aliases ?? [])].map((key) => [key, info.name] as const),
  ),
);

export const shikiConfig: Partial<ShikiConfig> = {
  themes: { light: 'snazzy-light', dark: 'vitesse-dark' },
  defaultColor: false,
  transformers: [
    {
      name: 'code-block-label',
      pre(node) {
        const language = node.properties.dataLanguage;
        const meta = this.options.meta?.__raw?.trim();
        const label =
          meta !== undefined && meta !== ''
            ? meta
            : typeof language === 'string'
              ? DISPLAY_NAMES.get(language)
              : undefined;

        if (label !== undefined) node.properties.dataLabel = label;
      },
    },
  ],
};
