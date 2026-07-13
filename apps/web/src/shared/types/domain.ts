export type SiteStatus = "online" | "degraded" | "offline" | "maintenance";

export type ConnectionType =
  | "fiber"
  | "broadband"
  | "4g"
  | "5g"
  | "satellite";

export type ServiceType =
  | "internet"
  | "sdwan"
  | "sase"
  | "vpn"
  | "firewall";

export type ServiceStatus =
  | "active"
  | "pending"
  | "suspended"
  | "cancelled";

export type IncidentSeverity = "low" | "medium" | "high" | "critical";

export type IncidentStatus =
  | "open"
  | "in_progress"
  | "resolved"
  | "closed";

export type InvoiceStatus = "paid" | "pending" | "overdue";

export interface PagedResult<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
}
