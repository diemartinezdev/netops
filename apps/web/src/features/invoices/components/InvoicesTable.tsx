"use client";

import { alpha } from "@mui/material/styles";
import { DataTable, type DataTableColumn } from "@/shared/components/DataTable";
import { formatCurrency, formatDate } from "@/shared/utils/format";
import { InvoiceStatusChip } from "./InvoiceStatusChip";
import type { Invoice } from "../types";

export function InvoicesTable({ invoices }: { invoices: Invoice[] }) {
  const columns: DataTableColumn<Invoice>[] = [
    { key: "number", header: "Invoice", render: (i) => i.invoiceNumber },
    { key: "customer", header: "Customer", render: (i) => i.customerName },
    {
      key: "amount",
      header: "Amount",
      align: "right",
      render: (i) => (
        <span style={i.status === "overdue" ? { fontWeight: 600 } : undefined}>
          {formatCurrency(i.amount, i.currency)}
        </span>
      ),
    },
    { key: "status", header: "Status", render: (i) => <InvoiceStatusChip status={i.status} /> },
    { key: "issued", header: "Issued", render: (i) => formatDate(i.issuedAt) },
    { key: "due", header: "Due", render: (i) => formatDate(i.dueDate) },
  ];

  return (
    <DataTable
      columns={columns}
      rows={invoices}
      rowKey={(i) => i.id}
      ariaLabel="Invoices"
      rowSx={(i) =>
        i.status === "overdue"
          ? {
              backgroundColor: (theme) => alpha(theme.palette.error.main, 0.08),
            }
          : undefined
      }
    />
  );
}
