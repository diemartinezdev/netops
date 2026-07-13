import { ApiError } from "./ApiError";

const BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:5102";

type QueryValue = string | number | boolean | undefined | null;

export interface ApiRequestOptions {
  query?: Record<string, QueryValue>;
  body?: unknown;
  signal?: AbortSignal;
  headers?: Record<string, string>;
}

function buildUrl(path: string, query?: Record<string, QueryValue>): string {
  const url = new URL(path.startsWith("/") ? path : `/${path}`, BASE_URL);
  if (query) {
    for (const [key, raw] of Object.entries(query)) {
      if (raw === undefined || raw === null || raw === "") continue;
      url.searchParams.set(key, String(raw));
    }
  }
  return url.toString();
}

async function request<T>(
  method: string,
  path: string,
  options: ApiRequestOptions = {},
): Promise<T> {
  const url = buildUrl(path, options.query);
  const headers: Record<string, string> = {
    Accept: "application/json",
    ...options.headers,
  };

  let body: BodyInit | undefined;
  if (options.body !== undefined) {
    headers["Content-Type"] = "application/json";
    body = JSON.stringify(options.body);
  }

  const res = await fetch(url, {
    method,
    headers,
    body,
    signal: options.signal,
  });

  if (!res.ok) {
    let parsed: unknown = null;
    try {
      parsed = await res.json();
    } catch {
      // response had no JSON body
    }
    throw new ApiError(
      `Request failed: ${res.status} ${res.statusText}`,
      res.status,
      parsed,
    );
  }

  if (res.status === 204) return undefined as T;

  return (await res.json()) as T;
}

export const apiClient = {
  get: <T>(path: string, options?: ApiRequestOptions) =>
    request<T>("GET", path, options),
  post: <T>(path: string, options?: ApiRequestOptions) =>
    request<T>("POST", path, options),
  patch: <T>(path: string, options?: ApiRequestOptions) =>
    request<T>("PATCH", path, options),
  put: <T>(path: string, options?: ApiRequestOptions) =>
    request<T>("PUT", path, options),
  delete: <T>(path: string, options?: ApiRequestOptions) =>
    request<T>("DELETE", path, options),
};
