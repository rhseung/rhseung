import { defineProject } from '@/features/projects/model/define';

export default defineProject({
  slug: 'idp',
  stack: ['React', 'TypeScript', 'TanStack Router', 'Tailwind CSS', 'Vite'],
  start: { year: 2024, month: 3 },
  end: { year: 2024, month: 8 },
  status: 'shipped',
  category: 'service',
  links: {
    repo: 'https://github.com/gsainfoteam/idp-fe',
    demo: 'https://idp.gistory.me',
  },
  ko: {
    title: 'IdP',
    summary:
      'GIST 통합 계정 시스템. OAuth 2.0과 OpenID Connect로 교내외 서비스에 하나의 계정으로 로그인하고, 패스키 인증과 외부 서비스용 OAuth 클라이언트 관리 화면을 구현했다.',
  },
  en: {
    title: 'IdP',
    summary:
      "GIST's single sign-on system. OAuth 2.0 and OpenID Connect let one account log into campus and external services; I built passkey sign-in and the OAuth client management screens.",
  },
});
