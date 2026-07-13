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
  ConnectionType,
  SiteStatus,
} from "@/shared/types/domain";
import { SitesFilters } from "./SitesFilters";
import { SitesTable } from "./SitesTable";
import { useSitesList } from "../hooks/useSites";
import {
  DEFAULT_SITES_FILTERS,
  type SitesFilters as SitesFiltersType,
  type SiteSortBy,
} from "../types";

const PAGE_SIZE_OPTIONS = [10, 25, 50];

export function SitesListView() {
  const { filters, setFilter, setFilters } = useUrlFilters<{
    search?: string;
    status?: string;
    connectionType?: string;
    sortBy?: string;
    page?: string;
    pageSize?: string;
  }>({
    resetPageOn: ["search", "status", "connectionType", "sortBy"],
  });

  const search = filters.search ?? "";
  const status = filters.status ?? "";
  const connectionType = filters.connectionType ?? "";
  const sortBy = filters.sortBy ?? DEFAULT_SITES_FILTERS.sortBy;
  const page = Number(filters.page ?? "1");
  const pageSize = Number(filters.pageSize ?? String(DEFAULT_SITES_FILTERS.pageSize));

  const debouncedSearch = useDebouncedValue(search, 300);

  const queryFilters: Partial<SitesFiltersType> = useMemo(
    () => ({
      search: debouncedSearch,
      status: (status as SiteStatus) || undefined,
      connectionType: (connectionType as ConnectionType) || undefined,
      sortBy: sortBy as SiteSortBy,
      sortDir: sortBy === "uptime" ? "asc" : sortBy === "latency" ? "desc" : "asc",
      page,
      pageSize,
    }),
    [debouncedSearch, status, connectionType, sortBy, page, pageSize],
  );

  const { data, isLoading, isError, refetch, isFetching } = useSitesList(queryFilters);

  const total = data?.total ?? 0;
  const items = data?.items ?? [];
  const hasActiveFilters = Boolean(search || status || connectionType);

  return (
    <>
      <PageHeader
        title="Sites"
        description="All customer sites, filterable by status and connection type."
      />

      <SectionCard title={`Sites${total ? ` (${total})` : ""}`}>
        <SitesFilters
          search={search}
          status={status}
          connectionType={connectionType}
          sortBy={sortBy}
          onSearch={(v) => setFilter("search", v)}
          onStatus={(v) => setFilter("status", v)}
          onConnectionType={(v) => setFilter("connectionType", v)}
          onSortBy={(v) => setFilter("sortBy", v)}
        />

        {isLoading && (
          <LoadingSkeleton rows={6} height={44} ariaLabel="Loading sites" />
        )}

        {isError && !isLoading && (
          <ErrorState
            message="We couldn't load sites. Check the API is running."
            onRetry={() => refetch()}
          />
        )}

        {!isLoading && !isError && items.length === 0 && (
          <EmptyState
            title="No sites match your filters"
            description={
              hasActiveFilters
                ? "Try clearing filters or changing the search term."
                : "There are no sites to display."
            }
          />
        )}

        {!isError && items.length > 0 && (
          <Stack spacing={2} sx={{ opacity: isFetching ? 0.7 : 1, transition: "opacity 150ms" }}>
            <SitesTable sites={items} />
            <TablePagination
              component="div"
              count={total}
              page={page - 1}
              onPageChange={(_, next) => setFilter("page", String(next + 1))}
              rowsPerPage={pageSize}
              onRowsPerPageChange={(e) =>
                setFilters({
                  pageSize: e.target.value,
                  page: "1",
                })
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
