"use client";

import Stack from "@mui/material/Stack";
import { SearchInput } from "@/shared/components/SearchInput";
import { FilterSelect } from "@/shared/components/FilterSelect";
import {
  INCIDENT_SEVERITY_OPTIONS,
  INCIDENT_STATUS_OPTIONS,
} from "@/shared/utils/labels";

interface IncidentsFiltersProps {
  search: string;
  status: string;
  severity: string;
  onSearch: (v: string) => void;
  onStatus: (v: string) => void;
  onSeverity: (v: string) => void;
}

export function IncidentsFilters({
  search,
  status,
  severity,
  onSearch,
  onStatus,
  onSeverity,
}: IncidentsFiltersProps) {
  return (
    <Stack
      direction={{ xs: "column", md: "row" }}
      spacing={2}
      sx={{ mb: 2, alignItems: { md: "center" } }}
    >
      <SearchInput
        value={search}
        onChange={onSearch}
        placeholder="Search by title or description"
        ariaLabel="Search incidents"
      />
      <FilterSelect
        label="Status"
        value={status}
        onChange={onStatus}
        options={INCIDENT_STATUS_OPTIONS}
      />
      <FilterSelect
        label="Severity"
        value={severity}
        onChange={onSeverity}
        options={INCIDENT_SEVERITY_OPTIONS}
      />
    </Stack>
  );
}
