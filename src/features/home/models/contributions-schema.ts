import { z } from 'zod';

const day = z.object({
  date: z.string(),
  count: z.number(),
  level: z.number(),
});

export const contributionsSchema = z.object({
  total: z.number(),
  days: z.array(day),
});

export const upstreamSchema = z
  .object({
    total: z.object({ lastYear: z.number() }),
    contributions: z.array(day),
  })
  .transform((response) => ({ total: response.total.lastYear, days: response.contributions }));
