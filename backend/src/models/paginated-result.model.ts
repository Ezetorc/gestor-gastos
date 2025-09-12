export type PaginatedResult<T> = {
  data: T[];
  hasNextPage: boolean;
};
