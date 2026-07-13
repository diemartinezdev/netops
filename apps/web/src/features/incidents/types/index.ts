export type { Incident } from "@/shared/types/entities";
import type {
  IncidentStatus,
  IncidentSeverity,
} from "@/shared/types/domain";

export interface IncidentsFilters {
  status: IncidentStatus | "";
  severity: IncidentSeverity | "";
  search: string;
  page: number;
  pageSize: number;
}

export const DEFAULT_INCIDENTS_FILTERS: IncidentsFilters = {
  status: "",
  severity: "",
  search: "",
  page: 1,
  pageSize: 10,
};
