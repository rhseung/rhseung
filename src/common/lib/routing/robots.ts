import { SITE } from './site';

const TRAINING_CRAWLERS = [
  'GPTBot',
  'ClaudeBot',
  'Google-Extended',
  'Applebot-Extended',
  'Meta-ExternalAgent',
  'CCBot',
  'Bytespider',
] as const;

export function robotsTxt(isProduction: boolean): string {
  if (!isProduction) {
    return `User-agent: *
Disallow: /
`;
  }

  const denied = TRAINING_CRAWLERS.map((agent) => `User-agent: ${agent}\nDisallow: /`).join('\n\n');

  return `${denied}

User-agent: *
Disallow:

Sitemap: ${SITE.url}/sitemap-index.xml
`;
}
