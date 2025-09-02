export type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";

export interface FetchOptions<TBody = unknown> {
  method?: HttpMethod;
  body?: TBody;
  headers?: Record<string, string>;
  token?: string;
}

export interface FetchState<TData> {
  data: TData | null;
  loading: boolean;
  error: string | null;
}

export interface FetchError {
  message: string;
  status: number;
}
