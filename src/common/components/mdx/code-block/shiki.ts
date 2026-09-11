import type { ShikiConfig } from 'astro';

export const shikiConfig: Partial<ShikiConfig> = {
  themes: { light: 'snazzy-light', dark: 'tokyo-night' },
  defaultColor: false,
};
