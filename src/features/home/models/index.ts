export const CONTRIBUTIONS_API = 'https://github-contributions-api.jogruber.de/v4';

export type ContributionDay = {
  date: string;
  count: number;
  level: number;
};

export type Contributions = {
  total: number;
  /** 격자가 이 순서에 기댄다. 일요일 시작, 빈 날 포함. */
  days: ContributionDay[];
};

export const NO_CONTRIBUTIONS: Contributions = { total: 0, days: [] };
