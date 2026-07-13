import type {
  Incident,
  Invoice,
  Service,
  SiteDetail,
  SiteSummary,
} from "@/shared/types/entities";
import type { DashboardSummary } from "@/features/dashboard/types";

export const site1: SiteSummary = {
  id: "site-1",
  customerId: "cust-1",
  customerName: "Aurora Retail Group",
  name: "Aurora HQ",
  city: "Madrid",
  country: "Spain",
  status: "online",
  connectionType: "fiber",
  uptimePercentage: 99.9,
  latencyMs: 12,
  packetLossPercentage: 0.01,
  lastCheckedAt: "2026-07-10T11:55:00Z",
};

export const site2: SiteSummary = {
  id: "site-2",
  customerId: "cust-1",
  customerName: "Aurora Retail Group",
  name: "Aurora Barcelona Store",
  city: "Barcelona",
  country: "Spain",
  status: "degraded",
  connectionType: "broadband",
  uptimePercentage: 94.2,
  latencyMs: 82,
  packetLossPercentage: 1.4,
  lastCheckedAt: "2026-07-10T11:55:00Z",
};

export const site3: SiteSummary = {
  id: "site-3",
  customerId: "cust-2",
  customerName: "NorthBank Financial",
  name: "NorthBank Paris HQ",
  city: "Paris",
  country: "France",
  status: "online",
  connectionType: "fiber",
  uptimePercentage: 99.99,
  latencyMs: 8,
  packetLossPercentage: 0,
  lastCheckedAt: "2026-07-10T11:55:00Z",
};

export const siteDetail1: SiteDetail = {
  ...site2,
  address: "Passeig de Gracia 21",
  serviceCount: 2,
  openIncidentCount: 1,
};

export const incident1: Incident = {
  id: "inc-1",
  siteId: "site-2",
  siteName: "Aurora Barcelona Store",
  title: "High latency detected",
  description: "Latency exceeded 100ms threshold.",
  severity: "high",
  status: "open",
  createdAt: "2026-07-09T10:00:00Z",
  updatedAt: "2026-07-09T10:00:00Z",
  assignedTo: "M. Fernandez",
};

export const incident2: Incident = {
  id: "inc-2",
  siteId: "site-2",
  siteName: "Aurora Barcelona Store",
  title: "Packet loss spike",
  description: "Packet loss above 1%.",
  severity: "critical",
  status: "in_progress",
  createdAt: "2026-07-09T09:00:00Z",
  updatedAt: "2026-07-09T09:30:00Z",
  assignedTo: "L. Torres",
};

export const service1: Service = {
  id: "svc-1",
  siteId: "site-2",
  name: "Enterprise Internet 1Gbps",
  type: "internet",
  provider: "TelcoEurope",
  monthlyCost: 450,
  status: "active",
  startedAt: "2025-01-01T00:00:00Z",
  renewalDate: "2026-01-01T00:00:00Z",
};

export const invoice1: Invoice = {
  id: "inv-1",
  customerId: "cust-1",
  customerName: "Aurora Retail Group",
  invoiceNumber: "INV-2026-0001",
  amount: 2500,
  currency: "EUR",
  status: "overdue",
  issuedAt: "2026-05-10T00:00:00Z",
  dueDate: "2026-06-10T00:00:00Z",
};

export const invoice2: Invoice = {
  id: "inv-2",
  customerId: "cust-1",
  customerName: "Aurora Retail Group",
  invoiceNumber: "INV-2026-0002",
  amount: 3000,
  currency: "EUR",
  status: "paid",
  issuedAt: "2026-04-10T00:00:00Z",
  dueDate: "2026-05-10T00:00:00Z",
};

export const dashboardSummary: DashboardSummary = {
  totalSites: 15,
  onlineSites: 10,
  degradedSites: 3,
  offlineSites: 1,
  openIncidents: 8,
  averageUptime: 92.02,
  pendingInvoices: 4,
  overdueInvoices: 2,
  recentIncidents: [incident1, incident2],
  worstPerformingSites: [site2, site3],
};
