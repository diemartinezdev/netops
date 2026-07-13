"use client";

import Button from "@mui/material/Button";
import NextLink from "next/link";
import { SectionCard } from "@/shared/components/SectionCard";
import { EmptyState } from "@/shared/components/EmptyState";
import { DataTable, type DataTableColumn } from "@/shared/components/DataTable";
import { StatusBadge } from "@/shared/components/StatusBadge";
import { formatLatency, formatPercent } from "@/shared/utils/format";
import type { SiteSummary } from "../types";

const columns: DataTableColumn<SiteSummary>[] = [
  { key: "status", header: "Status", render: (s) => <StatusBadge status={s.status} /> },
  { key: "name", header: "Site", render: (s) => s.name },
  { key: "location", header: "Location", render: (s) => `${s.city}, ${s.country}` },
  {
    key: "uptime",
    header: "Uptime",
    render: (s) => formatPercent(s.uptimePercentage, 2),
    align: "right",
  },
  {
    key: "latency",
    header: "Latency",
    render: (s) => formatLatency(s.latencyMs),
    align: "right",
  },
];

export function WorstPerformingSites({ sites }: { sites: SiteSummary[] }) {
  return (
    <SectionCard
      title="Worst-performing sites"
      action={
        <Button component={NextLink} href="/sites" size="small">
          View all
        </Button>
      }
    >
      {sites.length === 0 ? (
        <EmptyState title="No sites" description="Nothing to show yet." />
      ) : (
        <DataTable
          columns={columns}
          rows={sites}
          rowKey={(s) => s.id}
          ariaLabel="Worst-performing sites"
        />
      )}
    </SectionCard>
  );
}
