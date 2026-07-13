"use client";

import Chip from "@mui/material/Chip";
import { memo } from "react";
import { useRouter } from "next/navigation";
import { DataTable, type DataTableColumn } from "@/shared/components/DataTable";
import { StatusBadge } from "@/shared/components/StatusBadge";
import {
  formatDateTime,
  formatLatency,
  formatPercent,
} from "@/shared/utils/format";
import { CONNECTION_TYPE_LABEL } from "@/shared/utils/labels";
import type { SiteSummary } from "../types";

function SitesTableImpl({ sites }: { sites: SiteSummary[] }) {
  const router = useRouter();

  const columns: DataTableColumn<SiteSummary>[] = [
    { key: "status", header: "Status", render: (s) => <StatusBadge status={s.status} /> },
    { key: "name", header: "Site", render: (s) => s.name },
    {
      key: "location",
      header: "Location",
      render: (s) => `${s.city}, ${s.country}`,
    },
    {
      key: "connection",
      header: "Connection",
      render: (s) => (
        <Chip
          size="small"
          variant="outlined"
          label={CONNECTION_TYPE_LABEL[s.connectionType]}
        />
      ),
    },
    {
      key: "uptime",
      header: "Uptime",
      align: "right",
      render: (s) => formatPercent(s.uptimePercentage, 2),
    },
    {
      key: "latency",
      header: "Latency",
      align: "right",
      render: (s) => formatLatency(s.latencyMs),
    },
    {
      key: "packetLoss",
      header: "Packet loss",
      align: "right",
      render: (s) => formatPercent(s.packetLossPercentage, 2),
    },
    {
      key: "lastChecked",
      header: "Last checked",
      render: (s) => formatDateTime(s.lastCheckedAt),
    },
  ];

  return (
    <DataTable
      columns={columns}
      rows={sites}
      rowKey={(s) => s.id}
      ariaLabel="Sites"
      onRowClick={(s) => router.push(`/sites/${s.id}`)}
    />
  );
}

export const SitesTable = memo(SitesTableImpl);
