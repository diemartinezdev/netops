import { apiClient } from "@/shared/api/apiClient";
import type { PagedResult } from "@/shared/types/domain";
import type { Incident } from "@/shared/types/entities";
import type { IncidentsFilters } from "../types";
import type { IncidentStatus } from "@/shared/types/domain";

export function getIncidents(
  filters: Partial<IncidentsFilters>,
  signal?: AbortSignal,
): Promise<PagedResult<Incident>> {
  return apiClient.get<PagedResult<Incident>>("/api/incidents", {
    signal,
    query: {
      status: filters.status,
      severity: filters.severity,
      search: filters.search,
      page: filters.page,
      pageSize: filters.pageSize,
    },
  });
}

export function updateIncidentStatus(
  id: string,
  status: IncidentStatus,
): Promise<Incident> {
  return apiClient.patch<Incident>(`/api/incidents/${id}/status`, {
    body: { status },
  });
}
