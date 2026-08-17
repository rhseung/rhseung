import { useTranslation } from 'react-i18next';

import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyTitle,
  buttonVariants,
} from '@/common/components';
import { DEFAULT_LANGUAGE, localeHref } from '@/common/lib';

// 라우터가 없어서 `<Link>` 대신 `<a>`를 쓴다.
export function NotFound() {
  const { t } = useTranslation('common');

  return (
    <div className="flex min-h-dvh items-center justify-center p-6">
      <Empty>
        <EmptyHeader>
          {/* EmptyTitle은 div다. 페이지마다 h1이 하나 있어야 해서 안을 h1로 채운다. */}
          <EmptyTitle>
            <h1>{t(($) => $.notFound.title)}</h1>
          </EmptyTitle>
          <EmptyDescription>{t(($) => $.notFound.description)}</EmptyDescription>
        </EmptyHeader>
        <a href={localeHref(DEFAULT_LANGUAGE, '/')} className={buttonVariants()}>
          {t(($) => $.notFound.action)}
        </a>
      </Empty>
    </div>
  );
}
