"use client";

import { memo } from "react";
import { DataTable, type DataTableColumn } from "@/shared/components/DataTable";
import { SeverityBadge } from "@/shared/components/SeverityBadge";
import { formatRelative } from "@/shared/utils/format";
import { IncidentStatusSelect } from "./IncidentStatusSelect";
import { useUpdateIncidentStatus } from "../hooks/useIncidents";
import type { Incident } from "../types";

interface IncidentsTableProps {
  incidents: Incident[];
}

function IncidentsTableImpl({ incidents }: IncidentsTableProps) {
  const mutation = useUpdateIncidentStatus();

  const columns: DataTableColumn<Incident>[] = [
    { key: "severity", header: "Severity", render: (i) => <SeverityBadge severity={i.severity} /> },
    { key: "title", header: "Title", render: (i) => i.title },
    { key: "site", header: "Site", render: (i) => i.siteName },
    { key: "assignedTo", header: "Assigned to", render: (i) => i.assignedTo || "—" },
    { key: "created", header: "Created", render: (i) => formatRelative(i.createdAt) },
    { key: "updated", header: "Updated", render: (i) => formatRelative(i.updatedAt) },
    {
      key: "status",
      header: "Status",
      render: (i) => (
        <IncidentStatusSelect
          id={i.id}
          value={i.status}
          onChange={(next) => mutation.mutate({ id: i.id, status: next })}
          isPending={mutation.isPending && mutation.variables?.id === i.id}
        />
      ),
    },
  ];

  return (
    <DataTable
      columns={columns}
      rows={incidents}
      rowKey={(i) => i.id}
      ariaLabel="Incidents"
    />
  );
}

export const IncidentsTable = memo(IncidentsTableImpl);
