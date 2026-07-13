"use client";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import type { ReactNode } from "react";

export interface MetricCardProps {
  title: string;
  value: ReactNode;
  hint?: ReactNode;
  icon?: ReactNode;
  tone?: "default" | "warning" | "error" | "success";
}

const TONE_STYLES: Record<
  NonNullable<MetricCardProps["tone"]>,
  { color: string }
> = {
  default: { color: "text.primary" },
  warning: { color: "warning.main" },
  error: { color: "error.main" },
  success: { color: "success.main" },
};

export function MetricCard({
  title,
  value,
  hint,
  icon,
  tone = "default",
}: MetricCardProps) {
  return (
    <Card component="section" aria-label={title} sx={{ height: "100%" }}>
      <CardContent>
        <Stack direction="row" spacing={1} sx={{ alignItems: "flex-start" }}>
          <Box sx={{ flexGrow: 1 }}>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              {title}
            </Typography>
            <Typography variant="h3" component="p" sx={{ color: TONE_STYLES[tone].color }}>
              {value}
            </Typography>
            {hint && (
              <Typography variant="caption" color="text.secondary">
                {hint}
              </Typography>
            )}
          </Box>
          {icon && (
            <Box aria-hidden sx={{ color: "text.secondary", opacity: 0.8, mt: 0.5 }}>
              {icon}
            </Box>
          )}
        </Stack>
      </CardContent>
    </Card>
  );
}
