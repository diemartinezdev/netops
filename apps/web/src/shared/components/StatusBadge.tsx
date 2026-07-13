"use client";

import Chip from "@mui/material/Chip";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import type { SiteStatus } from "@/shared/types/domain";

const CONFIG: Record<
  SiteStatus,
  { label: string; color: "success" | "warning" | "error" | "default" }
> = {
  online: { label: "Online", color: "success" },
  degraded: { label: "Degraded", color: "warning" },
  offline: { label: "Offline", color: "error" },
  maintenance: { label: "Maintenance", color: "default" },
};

export interface StatusBadgeProps {
  status: SiteStatus;
  size?: "small" | "medium";
}

export function StatusBadge({ status, size = "small" }: StatusBadgeProps) {
  const { label, color } = CONFIG[status];
  return (
    <Chip
      size={size}
      color={color}
      variant="outlined"
      label={label}
      icon={<FiberManualRecordIcon fontSize="inherit" />}
      aria-label={`Site status: ${label}`}
    />
  );
}
