import { defineProject } from '@/features/projects/models/define';

export default defineProject({
  slug: 'idp',
  domain: 'web',
  stack: ['React', 'TypeScript', 'TanStack Router', 'Tailwind CSS', 'Vite'],
  start: { year: 2024, month: 3 },
  end: { year: 2024, month: 8 },
  status: 'shipped',
  links: {
    repo: 'https://github.com/gsainfoteam/idp-fe',
    demo: 'https://idp.gistory.me',
  },
  ko: {
    title: 'IdP',
    summary:
      'GIST 통합 계정 시스템. OAuth 2.0과 OpenID Connect를 지원해 교내 서비스는 물론 외부 서비스에서도 하나의 계정으로 로그인한다.',
  },
  en: {
    title: 'IdP',
    summary:
      "GIST's single sign-on system. OAuth 2.0 and OpenID Connect let one account log into every campus service, and external ones too.",
  },
});
