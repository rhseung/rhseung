export const CONTRIBUTIONS_API = 'https://github-contributions-api.jogruber.de/v4';

export type ContributionDay = {
  date: string;
  count: number;
  level: number;
};

export type Contributions = {
  total: number;
  days: ContributionDay[];
};

export const NO_CONTRIBUTIONS: Contributions = { total: 0, days: [] };
