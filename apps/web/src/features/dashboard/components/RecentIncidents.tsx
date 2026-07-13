"use client";

import Button from "@mui/material/Button";
import NextLink from "next/link";
import { SectionCard } from "@/shared/components/SectionCard";
import { EmptyState } from "@/shared/components/EmptyState";
import { DataTable, type DataTableColumn } from "@/shared/components/DataTable";
import { SeverityBadge } from "@/shared/components/SeverityBadge";
import { formatRelative } from "@/shared/utils/format";
import type { Incident } from "../types";

const columns: DataTableColumn<Incident>[] = [
  { key: "severity", header: "Severity", render: (i) => <SeverityBadge severity={i.severity} /> },
  { key: "title", header: "Title", render: (i) => i.title },
  { key: "site", header: "Site", render: (i) => i.siteName },
  { key: "created", header: "Created", render: (i) => formatRelative(i.createdAt) },
];

export function RecentIncidents({ incidents }: { incidents: Incident[] }) {
  return (
    <SectionCard
      title="Recent incidents"
      action={
        <Button component={NextLink} href="/incidents" size="small">
          View all
        </Button>
      }
    >
      {incidents.length === 0 ? (
        <EmptyState title="No incidents" description="All quiet on the network." />
      ) : (
        <DataTable
          columns={columns}
          rows={incidents}
          rowKey={(i) => i.id}
          ariaLabel="Recent incidents"
        />
      )}
    </SectionCard>
  );
}
