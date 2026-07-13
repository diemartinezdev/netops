"use client";

import Chip from "@mui/material/Chip";
import CheckCircleIcon from "@mui/icons-material/CheckCircleOutlined";
import HourglassEmptyIcon from "@mui/icons-material/HourglassEmptyOutlined";
import ErrorIcon from "@mui/icons-material/ErrorOutlined";
import type { InvoiceStatus } from "@/shared/types/domain";
import type { ReactElement } from "react";

const CONFIG: Record<
  InvoiceStatus,
  {
    label: string;
    color: "success" | "warning" | "error";
    icon: ReactElement;
  }
> = {
  paid: { label: "Paid", color: "success", icon: <CheckCircleIcon fontSize="inherit" /> },
  pending: { label: "Pending", color: "warning", icon: <HourglassEmptyIcon fontSize="inherit" /> },
  overdue: { label: "Overdue", color: "error", icon: <ErrorIcon fontSize="inherit" /> },
};

export function InvoiceStatusChip({ status }: { status: InvoiceStatus }) {
  const { label, color, icon } = CONFIG[status];
  return (
    <Chip
      size="small"
      color={color}
      variant="outlined"
      label={label}
      icon={icon}
      aria-label={`Invoice status: ${label}`}
    />
  );
}
