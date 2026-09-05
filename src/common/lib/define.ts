export const defineItem =
  <Item extends { slug: string }>() =>
  <Slug extends string>(item: Item & { slug: Slug }) =>
    item;
