export function parsePaginationQuery(query: any): { page: number; amount: number } {
  if (typeof query !== "object" || query === null) return { page: 1, amount: 8 };

  let page = Number(query.page);
  let amount = Number(query.amount);

  if (isNaN(page) || page < 1) page = 1;
  if (isNaN(amount) || amount < 1) amount = 8;

  return { page, amount };
}
