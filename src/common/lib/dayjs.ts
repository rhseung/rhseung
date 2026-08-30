import dayjs from 'dayjs';
import 'dayjs/locale/en';
import 'dayjs/locale/ko';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import relativeTime from 'dayjs/plugin/relativeTime';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';

import { i18n } from './i18n';

dayjs.extend(localizedFormat);
dayjs.extend(relativeTime);
dayjs.extend(utc);
dayjs.extend(timezone); // utc 뒤에 와야 한다

dayjs.locale(i18n.language);

// 여기서 `i18n.changeLanguage` 를 부르면 이 리스너가 자기를 다시 깨워 루프가 된다.
i18n.on('languageChanged', (language) => {
  dayjs.locale(language);
});

export { dayjs };
