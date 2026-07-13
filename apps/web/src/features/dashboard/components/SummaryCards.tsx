"use client";

import Grid from "@mui/material/Grid";
import HubIcon from "@mui/icons-material/HubOutlined";
import WifiIcon from "@mui/icons-material/WifiOutlined";
import WarningIcon from "@mui/icons-material/WarningAmberOutlined";
import ReportProblemIcon from "@mui/icons-material/ReportProblemOutlined";
import SpeedIcon from "@mui/icons-material/SpeedOutlined";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLongOutlined";
import { MetricCard } from "@/shared/components/MetricCard";
import { formatPercent } from "@/shared/utils/format";
import type { DashboardSummary } from "../types";

export function SummaryCards({ data }: { data: DashboardSummary }) {
  const impaired = data.degradedSites + data.offlineSites;
  const overdue = data.overdueInvoices;

  return (
    <Grid container spacing={2}>
      <Grid size={{ xs: 12, sm: 6, md: 4, lg: 2 }}>
        <MetricCard
          title="Total sites"
          value={data.totalSites}
          icon={<HubIcon />}
        />
      </Grid>
      <Grid size={{ xs: 12, sm: 6, md: 4, lg: 2 }}>
        <MetricCard
          title="Online"
          value={data.onlineSites}
          hint={`of ${data.totalSites} sites`}
          tone="success"
          icon={<WifiIcon />}
        />
      </Grid>
      <Grid size={{ xs: 12, sm: 6, md: 4, lg: 2 }}>
        <MetricCard
          title="Degraded / offline"
          value={impaired}
          hint={`${data.degradedSites} degraded · ${data.offlineSites} offline`}
          tone={impaired > 0 ? "warning" : "default"}
          icon={<WarningIcon />}
        />
      </Grid>
      <Grid size={{ xs: 12, sm: 6, md: 4, lg: 2 }}>
        <MetricCard
          title="Open incidents"
          value={data.openIncidents}
          tone={data.openIncidents > 0 ? "error" : "default"}
          icon={<ReportProblemIcon />}
        />
      </Grid>
      <Grid size={{ xs: 12, sm: 6, md: 4, lg: 2 }}>
        <MetricCard
          title="Average uptime"
          value={formatPercent(data.averageUptime, 2)}
          icon={<SpeedIcon />}
        />
      </Grid>
      <Grid size={{ xs: 12, sm: 6, md: 4, lg: 2 }}>
        <MetricCard
          title="Invoices"
          value={data.pendingInvoices + overdue}
          hint={`${data.pendingInvoices} pending · ${overdue} overdue`}
          tone={overdue > 0 ? "error" : "default"}
          icon={<ReceiptLongIcon />}
        />
      </Grid>
    </Grid>
  );
}
