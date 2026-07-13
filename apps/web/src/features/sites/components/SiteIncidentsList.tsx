"use client";

import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { SeverityBadge } from "@/shared/components/SeverityBadge";
import { EmptyState } from "@/shared/components/EmptyState";
import { formatDateTime, formatRelative } from "@/shared/utils/format";
import { Fragment } from "react";
import { INCIDENT_STATUS_LABEL } from "@/shared/utils/labels";
import type { Incident } from "../types";

export function SiteIncidentsList({ incidents }: { incidents: Incident[] }) {
  if (incidents.length === 0) {
    return (
      <EmptyState
        title="No incidents"
        description="No incidents have been reported for this site."
      />
    );
  }

  return (
    <Stack
      component="ol"
      spacing={0}
      sx={{ listStyle: "none", p: 0, m: 0 }}
      aria-label="Site incidents timeline"
    >
      {incidents.map((incident, index) => (
        <Fragment key={incident.id}>
          {index > 0 && <Divider component="li" />}
          <Box component="li" sx={{ py: 2 }}>
            <Stack
              direction={{ xs: "column", sm: "row" }}
              spacing={2}
              sx={{ alignItems: { sm: "flex-start" } }}
            >
              <Box sx={{ minWidth: 90 }}>
                <SeverityBadge severity={incident.severity} />
              </Box>
              <Box sx={{ flexGrow: 1 }}>
                <Typography variant="subtitle2" component="h3">
                  {incident.title}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                  {incident.description}
                </Typography>
                <Typography
                  variant="caption"
                  color="text.secondary"
                  sx={{ display: "block", mt: 1 }}
                >
                  {INCIDENT_STATUS_LABEL[incident.status]} · Assigned to {incident.assignedTo || "—"} ·{" "}
                  <time dateTime={incident.createdAt}>
                    {formatRelative(incident.createdAt)}
                  </time>{" "}
                  ({formatDateTime(incident.createdAt)})
                </Typography>
              </Box>
            </Stack>
          </Box>
        </Fragment>
      ))}
    </Stack>
  );
}

