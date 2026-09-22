import { faker } from '@faker-js/faker';

import { dayjs } from '@/common/lib';

const START = '2025-08-17';
const WEEKS = 53;

faker.seed(20260821);

export const CONTRIBUTIONS = {
  total: 2980,
  days: Array.from({ length: WEEKS * 7 }, (_, index) => ({
    date: dayjs(START).add(index, 'day').format('YYYY-MM-DD'),
    count: faker.number.int({ min: 0, max: 40 }),
    level: faker.number.int({ min: 0, max: 4 }),
  })),
};
