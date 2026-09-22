import type { contributionsSchema } from './contributions-schema';
import type { z } from 'zod';

export const CONTRIBUTIONS_API = '/api/contributions';

export type Contributions = z.infer<typeof contributionsSchema>;
export type ContributionDay = Contributions['days'][number];

export const NO_CONTRIBUTIONS: Contributions = { total: 0, days: [] };
