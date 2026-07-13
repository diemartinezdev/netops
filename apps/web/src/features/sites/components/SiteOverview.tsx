"use client";

import Grid from "@mui/material/Grid";
import { MetricCard } from "@/shared/components/MetricCard";
import { SectionCard } from "@/shared/components/SectionCard";
import { StatusBadge } from "@/shared/components/StatusBadge";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import {
  formatDateTime,
  formatLatency,
  formatPercent,
} from "@/shared/utils/format";
import { CONNECTION_TYPE_LABEL } from "@/shared/utils/labels";
import type { SiteDetail } from "../types";

export function SiteOverview({ site }: { site: SiteDetail }) {
  return (
    <Stack spacing={3}>
      <SectionCard title="Overview">
        <Stack spacing={1}>
          <Row label="Customer" value={site.customerName} />
          <Row label="Address" value={site.address} />
          <Row label="City / country" value={`${site.city}, ${site.country}`} />
          <Row label="Connection type" value={CONNECTION_TYPE_LABEL[site.connectionType]} />
          <Row
            label="Status"
            value={<StatusBadge status={site.status} />}
          />
          <Row label="Last checked" value={formatDateTime(site.lastCheckedAt)} />
        </Stack>
      </SectionCard>

      <Grid container spacing={2}>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <MetricCard
            title="Uptime"
            value={formatPercent(site.uptimePercentage, 2)}
            tone={site.uptimePercentage >= 99 ? "success" : "warning"}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <MetricCard
            title="Latency"
            value={formatLatency(site.latencyMs)}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <MetricCard
            title="Packet loss"
            value={formatPercent(site.packetLossPercentage, 2)}
            tone={site.packetLossPercentage > 1 ? "warning" : "default"}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <MetricCard
            title="Open incidents"
            value={site.openIncidentCount}
            tone={site.openIncidentCount > 0 ? "error" : "default"}
          />
        </Grid>
      </Grid>
    </Stack>
  );
}

function Row({
  label,
  value,
}: {
  label: string;
  value: React.ReactNode;
}) {
  return (
    <Stack direction="row" spacing={2} sx={{ alignItems: "center" }}>
      <Typography
        variant="body2"
        color="text.secondary"
        sx={{ minWidth: 140 }}
      >
        {label}
      </Typography>
      <Typography variant="body2" component="span">
        {value}
      </Typography>
    </Stack>
  );
}
