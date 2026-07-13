"use client";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import InboxOutlinedIcon from "@mui/icons-material/InboxOutlined";
import type { ReactNode } from "react";

export interface EmptyStateProps {
  title?: string;
  description?: ReactNode;
  icon?: ReactNode;
  action?: ReactNode;
}

export function EmptyState({
  title = "No results",
  description,
  icon,
  action,
}: EmptyStateProps) {
  return (
    <Box
      role="status"
      sx={{
        textAlign: "center",
        p: 4,
        color: "text.secondary",
      }}
    >
      <Box aria-hidden sx={{ fontSize: 48, mb: 1, opacity: 0.6 }}>
        {icon ?? <InboxOutlinedIcon fontSize="inherit" />}
      </Box>
      <Typography variant="h4" component="p" gutterBottom sx={{ color: "text.primary" }}>
        {title}
      </Typography>
      {description && (
        <Typography variant="body2" sx={{ mb: 2 }}>
          {description}
        </Typography>
      )}
      {action}
    </Box>
  );
}
