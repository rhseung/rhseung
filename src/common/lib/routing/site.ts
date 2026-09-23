export const SITE = {
  url: 'https://www.rhseung.me',
  handle: 'rhseung',
  github: 'https://github.com/rhseung',
  email: 'ryu@rhseung.me',
  ogImage: '/images/og.png',
  title: 'Rhseung',
} as const satisfies {
  url: string;
  handle: string;
  github: string;
  email: string;
  ogImage: string;
  title: string;
};
