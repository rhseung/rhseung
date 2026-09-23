import { AppProviders } from '@/common/components';
import { ResumePage } from '@/features/resume';

export function ResumeIsland(props: ResumeIsland.Props) {
  return (
    <AppProviders lang={props.lang}>
      <ResumePage {...props} />
    </AppProviders>
  );
}

export declare namespace ResumeIsland {
  export type Props = ResumePage.Props;
}
