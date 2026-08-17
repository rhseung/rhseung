import { AppProviders } from '@/common/components';
import type { Language } from '@/common/lib';
import { ResumeDocument, type Resume } from '@/features/about';

/**
 * 클라이언트 지시자가 없다 — 이 페이지는 PDF로 구워지는 정적 문서라 JavaScript가 필요 없다.
 * Astro가 서버에서 한 번 그리고 끝낸다.
 */
export function ResumeIsland({ lang, name, resume }: ResumeIsland.Props) {
  return (
    <AppProviders lang={lang}>
      <ResumeDocument name={name} resume={resume} />
    </AppProviders>
  );
}

export declare namespace ResumeIsland {
  export type Props = {
    lang: Language;
    name: string;
    resume: Resume;
  };
}
