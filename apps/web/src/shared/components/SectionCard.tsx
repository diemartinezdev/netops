"use client";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import type { ReactNode } from "react";

export interface SectionCardProps {
  title: string;
  action?: ReactNode;
  children: ReactNode;
  headingLevel?: "h2" | "h3" | "h4";
}

export function SectionCard({
  title,
  action,
  children,
  headingLevel = "h2",
}: SectionCardProps) {
  return (
    <Card component="section" aria-label={title}>
      <CardHeader
        title={title}
        slotProps={{
          title: { variant: headingLevel, component: headingLevel },
        }}
        action={action}
      />
      <CardContent sx={{ pt: 0 }}>{children}</CardContent>
    </Card>
  );
}
