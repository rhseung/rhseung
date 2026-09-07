import { Alert, AlertDescription, AlertTitle } from '../../ui/alert';

export function ReviewProbe({ count }: ReviewProbe.Props) {
  return (
    <Alert>
      <AlertTitle>Unread items</AlertTitle>
      <AlertDescription>You have {count} unread items.</AlertDescription>
    </Alert>
  );
}

export declare namespace ReviewProbe {
  export type Props = {
    count: number;
  };
}
