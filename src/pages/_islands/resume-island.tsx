import { AppProviders } from '@/common/components';
import type { Language } from '@/common/lib';
import { ResumePage } from '@/features/resume';

export function ResumeIsland({ lang, ...props }: ResumeIsland.Props) {
  return (
    <AppProviders lang={lang}>
      <ResumePage {...props} />
    </AppProviders>
  );
}

export declare namespace ResumeIsland {
  export type Props = ResumePage.Props & { lang: Language };
}
