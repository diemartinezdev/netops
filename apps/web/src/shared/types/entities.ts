import type {
  SiteStatus,
  ConnectionType,
  ServiceType,
  ServiceStatus,
  IncidentSeverity,
  IncidentStatus,
  InvoiceStatus,
} from "./domain";

export interface Customer {
  id: string;
  name: string;
  industry: string;
  country: string;
  activeSitesCount: number;
  createdAt: string;
}

export interface SiteSummary {
  id: string;
  customerId: string;
  customerName: string;
  name: string;
  city: string;
  country: string;
  status: SiteStatus;
  connectionType: ConnectionType;
  uptimePercentage: number;
  latencyMs: number;
  packetLossPercentage: number;
  lastCheckedAt: string;
}

export interface SiteDetail extends SiteSummary {
  address: string;
  serviceCount: number;
  openIncidentCount: number;
}

export interface Service {
  id: string;
  siteId: string;
  name: string;
  type: ServiceType;
  provider: string;
  monthlyCost: number;
  status: ServiceStatus;
  startedAt: string;
  renewalDate: string;
}

export interface Incident {
  id: string;
  siteId: string;
  siteName: string;
  title: string;
  description: string;
  severity: IncidentSeverity;
  status: IncidentStatus;
  createdAt: string;
  updatedAt: string;
  assignedTo: string;
}

export interface Invoice {
  id: string;
  customerId: string;
  customerName: string;
  invoiceNumber: string;
  amount: number;
  currency: string;
  status: InvoiceStatus;
  issuedAt: string;
  dueDate: string;
}
