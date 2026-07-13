import { apiClient } from "@/shared/api/apiClient";
import type { PagedResult } from "@/shared/types/domain";
import type {
  Incident,
  Service,
  SiteDetail,
  SiteSummary,
} from "@/shared/types/entities";
import type { SitesFilters } from "../types";

export function getSites(
  filters: Partial<SitesFilters>,
  signal?: AbortSignal,
): Promise<PagedResult<SiteSummary>> {
  return apiClient.get<PagedResult<SiteSummary>>("/api/sites", {
    signal,
    query: {
      search: filters.search,
      status: filters.status,
      connectionType: filters.connectionType,
      sortBy: filters.sortBy,
      sortDir: filters.sortDir,
      page: filters.page,
      pageSize: filters.pageSize,
    },
  });
}

export function getSite(id: string, signal?: AbortSignal): Promise<SiteDetail> {
  return apiClient.get<SiteDetail>(`/api/sites/${id}`, { signal });
}

export function getSiteServices(
  id: string,
  signal?: AbortSignal,
): Promise<Service[]> {
  return apiClient.get<Service[]>(`/api/sites/${id}/services`, { signal });
}

export function getSiteIncidents(
  id: string,
  signal?: AbortSignal,
): Promise<Incident[]> {
  return apiClient.get<Incident[]>(`/api/sites/${id}/incidents`, { signal });
}
