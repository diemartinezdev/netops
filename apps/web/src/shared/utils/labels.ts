import type {
  ConnectionType,
  IncidentSeverity,
  IncidentStatus,
  ServiceStatus,
  ServiceType,
  SiteStatus,
} from "@/shared/types/domain";

export const SITE_STATUS_LABEL: Record<SiteStatus, string> = {
  online: "Online",
  degraded: "Degraded",
  offline: "Offline",
  maintenance: "Maintenance",
};

export const CONNECTION_TYPE_LABEL: Record<ConnectionType, string> = {
  fiber: "Fiber",
  broadband: "Broadband",
  "4g": "4G",
  "5g": "5G",
  satellite: "Satellite",
};

export const SERVICE_TYPE_LABEL: Record<ServiceType, string> = {
  internet: "Internet",
  sdwan: "SD-WAN",
  sase: "SASE",
  vpn: "VPN",
  firewall: "Firewall",
};

export const SERVICE_STATUS_LABEL: Record<ServiceStatus, string> = {
  active: "Active",
  pending: "Pending",
  suspended: "Suspended",
  cancelled: "Cancelled",
};

export const INCIDENT_SEVERITY_LABEL: Record<IncidentSeverity, string> = {
  low: "Low",
  medium: "Medium",
  high: "High",
  critical: "Critical",
};

export const INCIDENT_STATUS_LABEL: Record<IncidentStatus, string> = {
  open: "Open",
  in_progress: "In progress",
  resolved: "Resolved",
  closed: "Closed",
};

function toOptions<T extends string>(
  labels: Record<T, string>,
): { value: T; label: string }[] {
  return (Object.entries(labels) as [T, string][]).map(([value, label]) => ({
    value,
    label,
  }));
}

export const SITE_STATUS_OPTIONS = toOptions(SITE_STATUS_LABEL);
export const CONNECTION_TYPE_OPTIONS = toOptions(CONNECTION_TYPE_LABEL);
export const INCIDENT_STATUS_OPTIONS = toOptions(INCIDENT_STATUS_LABEL);
export const INCIDENT_SEVERITY_OPTIONS = toOptions(INCIDENT_SEVERITY_LABEL);
