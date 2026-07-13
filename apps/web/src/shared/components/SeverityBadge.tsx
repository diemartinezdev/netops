"use client";

import Chip from "@mui/material/Chip";
import PriorityHighIcon from "@mui/icons-material/PriorityHigh";
import KeyboardDoubleArrowUpIcon from "@mui/icons-material/KeyboardDoubleArrowUp";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import type { IncidentSeverity } from "@/shared/types/domain";
import type { ReactElement } from "react";

const CONFIG: Record<
  IncidentSeverity,
  {
    label: string;
    color: "success" | "warning" | "error" | "info";
    icon: ReactElement;
  }
> = {
  low: { label: "Low", color: "info", icon: <KeyboardArrowDownIcon fontSize="inherit" /> },
  medium: { label: "Medium", color: "warning", icon: <KeyboardArrowUpIcon fontSize="inherit" /> },
  high: { label: "High", color: "warning", icon: <KeyboardDoubleArrowUpIcon fontSize="inherit" /> },
  critical: { label: "Critical", color: "error", icon: <PriorityHighIcon fontSize="inherit" /> },
};

export interface SeverityBadgeProps {
  severity: IncidentSeverity;
  size?: "small" | "medium";
}

export function SeverityBadge({ severity, size = "small" }: SeverityBadgeProps) {
  const { label, color, icon } = CONFIG[severity];
  return (
    <Chip
      size={size}
      color={color}
      variant="outlined"
      label={label}
      icon={icon}
      aria-label={`Severity: ${label}`}
    />
  );
}
