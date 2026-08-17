/** 상대경로·http 를 막는다. */
export type Url = `https://${string}`;

/** `2024-03`. */
export type YearMonth = `${number}-${number}`;

/** 수상·성취는 연도만 아는 경우가 많다. 월을 지어내지 않아도 되게 둘 다 받는다. */
export type YearOrMonth = `${number}` | YearMonth;

/** `public/logos/` 밖을 가리킬 수 없다. */
export type LogoPath = `/logos/${string}`;
