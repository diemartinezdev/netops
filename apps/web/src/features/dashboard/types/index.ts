import type { Incident, SiteSummary } from "@/shared/types/entities";

export type { Incident, SiteSummary };

export interface DashboardSummary {
  totalSites: number;
  onlineSites: number;
  degradedSites: number;
  offlineSites: number;
  openIncidents: number;
  averageUptime: number;
  pendingInvoices: number;
  overdueInvoices: number;
  recentIncidents: Incident[];
  worstPerformingSites: SiteSummary[];
}
