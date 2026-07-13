"use client";

import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import { PageHeader } from "@/shared/components/PageHeader";
import { LoadingSkeleton } from "@/shared/components/LoadingSkeleton";
import { ErrorState } from "@/shared/components/ErrorState";
import { useDashboardSummary } from "@/features/dashboard/hooks/useDashboardSummary";
import { SummaryCards } from "@/features/dashboard/components/SummaryCards";
import { RecentIncidents } from "@/features/dashboard/components/RecentIncidents";
import { WorstPerformingSites } from "@/features/dashboard/components/WorstPerformingSites";

export default function DashboardPage() {
  const { data, isLoading, isError, refetch } = useDashboardSummary();

  return (
    <>
      <PageHeader
        title="Dashboard"
        description="Overview of your customer sites, incidents and invoices."
      />

      {isLoading && (
        <Stack spacing={3}>
          <LoadingSkeleton rows={2} height={96} ariaLabel="Loading summary" />
          <LoadingSkeleton rows={4} height={40} ariaLabel="Loading tables" />
        </Stack>
      )}

      {isError && (
        <ErrorState
          message="We couldn't load the dashboard. Check the API is running."
          onRetry={() => refetch()}
        />
      )}

      {data && (
        <Stack spacing={3}>
          <SummaryCards data={data} />
          <Grid container spacing={2}>
            <Grid size={{ xs: 12, lg: 6 }}>
              <RecentIncidents incidents={data.recentIncidents} />
            </Grid>
            <Grid size={{ xs: 12, lg: 6 }}>
              <WorstPerformingSites sites={data.worstPerformingSites} />
            </Grid>
          </Grid>
        </Stack>
      )}
    </>
  );
}
