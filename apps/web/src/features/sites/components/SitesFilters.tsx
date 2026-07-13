"use client";

import Stack from "@mui/material/Stack";
import { SearchInput } from "@/shared/components/SearchInput";
import { FilterSelect } from "@/shared/components/FilterSelect";
import {
  CONNECTION_TYPE_OPTIONS,
  SITE_STATUS_OPTIONS,
} from "@/shared/utils/labels";
import type { SitesFilters as SitesFiltersType } from "../types";

interface SitesFiltersProps {
  search: string;
  status: string;
  connectionType: string;
  sortBy: string;
  onSearch: (v: string) => void;
  onStatus: (v: string) => void;
  onConnectionType: (v: string) => void;
  onSortBy: (v: string) => void;
}

const SORT_OPTIONS = [
  { value: "name", label: "Name" },
  { value: "uptime", label: "Uptime (worst first)" },
  { value: "latency", label: "Latency (worst first)" },
  { value: "status", label: "Status" },
];

export function SitesFilters({
  search,
  status,
  connectionType,
  sortBy,
  onSearch,
  onStatus,
  onConnectionType,
  onSortBy,
}: SitesFiltersProps) {
  return (
    <Stack
      direction={{ xs: "column", md: "row" }}
      spacing={2}
      sx={{ mb: 2, alignItems: { md: "center" } }}
    >
      <SearchInput
        value={search}
        onChange={onSearch}
        placeholder="Search by name, city or country"
        ariaLabel="Search sites"
      />
      <FilterSelect
        label="Status"
        value={status}
        onChange={onStatus}
        options={SITE_STATUS_OPTIONS}
      />
      <FilterSelect
        label="Connection type"
        value={connectionType}
        onChange={onConnectionType}
        options={CONNECTION_TYPE_OPTIONS}
        includeAll
        allLabel="All types"
        minWidth={180}
      />
      <FilterSelect
        label="Sort by"
        value={sortBy}
        onChange={onSortBy}
        options={SORT_OPTIONS}
        includeAll={false}
        minWidth={180}
      />
    </Stack>
  );
}

export type { SitesFiltersType };
