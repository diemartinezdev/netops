"use client";

import {
  useMutation,
  useQuery,
  useQueryClient,
  keepPreviousData,
} from "@tanstack/react-query";
import { getIncidents, updateIncidentStatus } from "../api/incidentsApi";
import type { IncidentsFilters } from "../types";
import type { Incident } from "@/shared/types/entities";
import type { PagedResult } from "@/shared/types/domain";
import type { IncidentStatus } from "@/shared/types/domain";

export const incidentsKeys = {
  all: ["incidents"] as const,
  list: (filters: Partial<IncidentsFilters>) =>
    ["incidents", "list", filters] as const,
};

export function useIncidentsList(filters: Partial<IncidentsFilters>) {
  return useQuery({
    queryKey: incidentsKeys.list(filters),
    queryFn: ({ signal }) => getIncidents(filters, signal),
    placeholderData: keepPreviousData,
  });
}

export function useUpdateIncidentStatus() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: ({ id, status }: { id: string; status: IncidentStatus }) =>
      updateIncidentStatus(id, status),

    onMutate: async ({ id, status }) => {
      await qc.cancelQueries({ queryKey: incidentsKeys.all });

      const previous = qc.getQueriesData<PagedResult<Incident>>({
        queryKey: incidentsKeys.all,
      });

      qc.setQueriesData<PagedResult<Incident>>(
        { queryKey: incidentsKeys.all },
        (old) => {
          if (!old) return old;
          return {
            ...old,
            items: old.items.map((i) =>
              i.id === id ? { ...i, status, updatedAt: new Date().toISOString() } : i,
            ),
          };
        },
      );

      return { previous };
    },

    onError: (_err, _vars, context) => {
      context?.previous.forEach(([key, data]) => {
        qc.setQueryData(key, data);
      });
    },

    onSettled: () => {
      qc.invalidateQueries({ queryKey: incidentsKeys.all });
      qc.invalidateQueries({ queryKey: ["dashboard", "summary"] });
    },
  });
}
