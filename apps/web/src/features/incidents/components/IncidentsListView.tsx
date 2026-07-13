"use client";

import Stack from "@mui/material/Stack";
import TablePagination from "@mui/material/TablePagination";
import { useMemo } from "react";
import { PageHeader } from "@/shared/components/PageHeader";
import { LoadingSkeleton } from "@/shared/components/LoadingSkeleton";
import { ErrorState } from "@/shared/components/ErrorState";
import { EmptyState } from "@/shared/components/EmptyState";
import { SectionCard } from "@/shared/components/SectionCard";
import { useDebouncedValue } from "@/shared/hooks/useDebouncedValue";
import { useUrlFilters } from "@/shared/hooks/useUrlFilters";
import type {
  IncidentSeverity,
  IncidentStatus,
} from "@/shared/types/domain";
import { IncidentsFilters } from "./IncidentsFilters";
import { IncidentsTable } from "./IncidentsTable";
import { useIncidentsList } from "../hooks/useIncidents";
import { DEFAULT_INCIDENTS_FILTERS, type IncidentsFilters as IncidentsFiltersType } from "../types";

const PAGE_SIZE_OPTIONS = [10, 25, 50];

export function IncidentsListView() {
  const { filters, setFilter, setFilters } = useUrlFilters<{
    search?: string;
    status?: string;
    severity?: string;
    page?: string;
    pageSize?: string;
  }>({
    resetPageOn: ["search", "status", "severity"],
  });

  const search = filters.search ?? "";
  const status = filters.status ?? "";
  const severity = filters.severity ?? "";
  const page = Number(filters.page ?? "1");
  const pageSize = Number(filters.pageSize ?? String(DEFAULT_INCIDENTS_FILTERS.pageSize));

  const debouncedSearch = useDebouncedValue(search, 300);

  const queryFilters: Partial<IncidentsFiltersType> = useMemo(
    () => ({
      search: debouncedSearch,
      status: (status as IncidentStatus) || undefined,
      severity: (severity as IncidentSeverity) || undefined,
      page,
      pageSize,
    }),
    [debouncedSearch, status, severity, page, pageSize],
  );

  const { data, isLoading, isError, isFetching, refetch } = useIncidentsList(queryFilters);

  const total = data?.total ?? 0;
  const items = data?.items ?? [];
  const hasActiveFilters = Boolean(search || status || severity);

  return (
    <>
      <PageHeader
        title="Incidents"
        description="Operational cases across all sites. Change status from the row."
      />

      <SectionCard title={`Incidents${total ? ` (${total})` : ""}`}>
        <IncidentsFilters
          search={search}
          status={status}
          severity={severity}
          onSearch={(v) => setFilter("search", v)}
          onStatus={(v) => setFilter("status", v)}
          onSeverity={(v) => setFilter("severity", v)}
        />

        {isLoading && (
          <LoadingSkeleton rows={6} height={44} ariaLabel="Loading incidents" />
        )}

        {isError && !isLoading && (
          <ErrorState
            message="We couldn't load incidents. Check the API is running."
            onRetry={() => refetch()}
          />
        )}

        {!isLoading && !isError && items.length === 0 && (
          <EmptyState
            title="No incidents match your filters"
            description={
              hasActiveFilters
                ? "Try clearing filters or changing the search term."
                : "All quiet on the network."
            }
          />
        )}

        {!isError && items.length > 0 && (
          <Stack spacing={2} sx={{ opacity: isFetching ? 0.7 : 1, transition: "opacity 150ms" }}>
            <IncidentsTable incidents={items} />
            <TablePagination
              component="div"
              count={total}
              page={page - 1}
              onPageChange={(_, next) => setFilter("page", String(next + 1))}
              rowsPerPage={pageSize}
              onRowsPerPageChange={(e) =>
                setFilters({ pageSize: e.target.value, page: "1" })
              }
              rowsPerPageOptions={PAGE_SIZE_OPTIONS}
              labelRowsPerPage="Rows per page"
            />
          </Stack>
        )}
      </SectionCard>
    </>
  );
}
