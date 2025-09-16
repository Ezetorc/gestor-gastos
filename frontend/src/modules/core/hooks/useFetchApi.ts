import { useState, useCallback } from "react";
import type { ApiError, FetchOptions, FetchState } from "../types/fetch";


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
          let message = res.statusText;
          try {
            const errorData = await res.json();
            if (errorData?.error) {
              message = errorData.error;
            }
          } catch {
            // si no es JSON válido, usamos el statusText
          }

          const apiError: ApiError = {
            status: res.status,
            message,
          };

          setState({ data: null, loading: false, error: apiError });
          throw apiError;
        }

        const data: TData = await res.json();
        setState({ data, loading: false, error: null });
        return data;
      } catch (err) {
        // Si ya es ApiError, lo dejamos tal cual
        const apiError: ApiError =
          err && typeof err === "object" && "status" in err
            ? (err as ApiError)
            : { status: 0, message: "Error de conexión" };

        setState({ data: null, loading: false, error: apiError });
        throw apiError;
      }
    },
    []
  );

  return { ...state, request };
}
