"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useCallback, useMemo } from "react";

type FilterValue = string | number | undefined;

export interface UseUrlFiltersOptions<T extends Record<string, FilterValue>> {
  defaults?: Partial<T>;
  resetPageOn?: (keyof T)[];
  pageKey?: keyof T;
}

export function useUrlFilters<T extends Record<string, FilterValue>>(
  options: UseUrlFiltersOptions<T> = {},
) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const { defaults = {}, resetPageOn = [], pageKey = "page" as keyof T } = options;

  const filters = useMemo(() => {
    const result: Record<string, string> = {};
    searchParams.forEach((value, key) => {
      result[key] = value;
    });
    return { ...defaults, ...result } as T;
  }, [searchParams, defaults]);

  const applyToUrl = useCallback(
    (next: Record<string, FilterValue>) => {
      const params = new URLSearchParams();
      for (const [key, value] of Object.entries(next)) {
        if (value === undefined || value === null || value === "") continue;
        params.set(key, String(value));
      }
      const qs = params.toString();
      router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
    },
    [pathname, router],
  );

  const setFilter = useCallback(
    <K extends keyof T>(key: K, value: T[K]) => {
      const next: Record<string, FilterValue> = { ...filters };
      next[key as string] = value;
      if (resetPageOn.includes(key) && pageKey !== key) {
        delete next[pageKey as string];
      }
      applyToUrl(next);
    },
    [filters, applyToUrl, resetPageOn, pageKey],
  );

  const setFilters = useCallback(
    (patch: Partial<T>) => {
      const next: Record<string, FilterValue> = { ...filters, ...patch };
      const patchKeys = Object.keys(patch) as (keyof T)[];
      const shouldResetPage = patchKeys.some(
        (k) => resetPageOn.includes(k) && k !== pageKey,
      );
      if (shouldResetPage) delete next[pageKey as string];
      applyToUrl(next);
    },
    [filters, applyToUrl, resetPageOn, pageKey],
  );

  const reset = useCallback(() => {
    applyToUrl({});
  }, [applyToUrl]);

  return { filters, setFilter, setFilters, reset };
}
