"use client";

import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select, { type SelectChangeEvent } from "@mui/material/Select";
import CircularProgress from "@mui/material/CircularProgress";
import InputAdornment from "@mui/material/InputAdornment";
import type { IncidentStatus } from "@/shared/types/domain";
import { INCIDENT_STATUS_LABEL } from "@/shared/utils/labels";

interface IncidentStatusSelectProps {
  id: string;
  value: IncidentStatus;
  onChange: (next: IncidentStatus) => void;
  disabled?: boolean;
  isPending?: boolean;
}

export function IncidentStatusSelect({
  id,
  value,
  onChange,
  disabled,
  isPending,
}: IncidentStatusSelectProps) {
  const labelId = `incident-status-${id}-label`;
  const selectId = `incident-status-${id}`;

  const handleChange = (e: SelectChangeEvent) => {
    onChange(e.target.value as IncidentStatus);
  };

  return (
    <FormControl size="small" sx={{ minWidth: 150 }}>
      <InputLabel id={labelId}>Status</InputLabel>
      <Select
        labelId={labelId}
        id={selectId}
        label="Status"
        value={value}
        onChange={handleChange}
        disabled={disabled || isPending}
        onClick={(e) => e.stopPropagation()}
        endAdornment={
          isPending ? (
            <InputAdornment position="end" sx={{ mr: 3 }}>
              <CircularProgress size={16} />
            </InputAdornment>
          ) : null
        }
      >
        {Object.entries(INCIDENT_STATUS_LABEL).map(([v, label]) => (
          <MenuItem key={v} value={v}>
            {label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
