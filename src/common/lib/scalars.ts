export type Url = `https://${string}`;

export type YearMonth = `${number}-${number}`;

/** 수상·성취는 연도만 아는 경우가 많다. 월을 지어내지 않아도 되게 둘 다 받는다. */
export type YearOrMonth = `${number}` | YearMonth;

export type LogoPath = `/logos/${string}`;
