"use client";

import Chip from "@mui/material/Chip";
import { DataTable, type DataTableColumn } from "@/shared/components/DataTable";
import { EmptyState } from "@/shared/components/EmptyState";
import { formatCurrency, formatDate } from "@/shared/utils/format";
import {
  SERVICE_STATUS_LABEL,
  SERVICE_TYPE_LABEL,
} from "@/shared/utils/labels";
import type { Service } from "../types";

const STATUS_COLOR: Record<
  Service["status"],
  "success" | "warning" | "error" | "default"
> = {
  active: "success",
  pending: "warning",
  suspended: "error",
  cancelled: "default",
};

const columns: DataTableColumn<Service>[] = [
  { key: "name", header: "Service", render: (s) => s.name },
  {
    key: "type",
    header: "Type",
    render: (s) => (
      <Chip size="small" variant="outlined" label={SERVICE_TYPE_LABEL[s.type]} />
    ),
  },
  { key: "provider", header: "Provider", render: (s) => s.provider },
  {
    key: "status",
    header: "Status",
    render: (s) => (
      <Chip
        size="small"
        color={STATUS_COLOR[s.status]}
        variant="outlined"
        label={SERVICE_STATUS_LABEL[s.status]}
        aria-label={`Service status: ${SERVICE_STATUS_LABEL[s.status]}`}
      />
    ),
  },
  {
    key: "cost",
    header: "Monthly cost",
    align: "right",
    render: (s) => formatCurrency(s.monthlyCost),
  },
  {
    key: "renewal",
    header: "Renews",
    render: (s) => formatDate(s.renewalDate),
  },
];

export function SiteServicesTable({ services }: { services: Service[] }) {
  if (services.length === 0) {
    return (
      <EmptyState
        title="No services"
        description="This site has no services associated yet."
      />
    );
  }
  return (
    <DataTable
      columns={columns}
      rows={services}
      rowKey={(s) => s.id}
      ariaLabel="Site services"
    />
  );
}
