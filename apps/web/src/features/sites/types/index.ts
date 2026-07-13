import type {
  SiteStatus,
  ConnectionType,
} from "@/shared/types/domain";
export type { SiteSummary, SiteDetail, Service, Incident } from "@/shared/types/entities";

export type SiteSortBy = "name" | "uptime" | "latency" | "status";
export type SortDir = "asc" | "desc";

export interface SitesFilters {
  search: string;
  status: SiteStatus | "";
  connectionType: ConnectionType | "";
  sortBy: SiteSortBy;
  sortDir: SortDir;
  page: number;
  pageSize: number;
}

export const DEFAULT_SITES_FILTERS: SitesFilters = {
  search: "",
  status: "",
  connectionType: "",
  sortBy: "name",
  sortDir: "asc",
  page: 1,
  pageSize: 10,
};
