import { useState, useCallback } from "react";
import type { FetchOptions, FetchState } from "../types/fetch";


export function useFetchApi<TData = unknown, TBody = unknown>() {
  const [state, setState] = useState<FetchState<TData>>({
    data: null,
    loading: false,
    error: null,
  });

  const request = useCallback(
    async (url: string, options?: FetchOptions<TBody>) => {
      setState({ data: null, loading: true, error: null });

      try {
        const res = await fetch(url, {
          method: options?.method || "GET",
          headers: {
            "Content-Type": "application/json",
            ...(options?.token
              ? { Authorization: `Bearer ${options.token}` }
              : {}),
            ...options?.headers,
          },
          body: options?.body ? JSON.stringify(options.body) : undefined,
        });

        if (!res.ok) {
          throw new Error(`Error ${res.status}: ${res.statusText}`);
        }

        const data: TData = await res.json();
        setState({ data, loading: false, error: null });
        return data;
      } catch (err: any) {
        setState({ data: null, loading: false, error: err });
        throw err;
      }
    },
    []
  );

  return { ...state, request };
}
