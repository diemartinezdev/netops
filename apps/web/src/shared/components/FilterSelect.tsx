"use client";

import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select, { type SelectChangeEvent } from "@mui/material/Select";

export interface FilterOption {
  value: string;
  label: string;
}

export interface FilterSelectProps {
  label: string;
  value: string;
  options: FilterOption[];
  onChange: (value: string) => void;
  includeAll?: boolean;
  allLabel?: string;
  minWidth?: number;
  size?: "small" | "medium";
}

export function FilterSelect({
  label,
  value,
  options,
  onChange,
  includeAll = true,
  allLabel = "All",
  minWidth = 160,
  size = "small",
}: FilterSelectProps) {
  const id = `filter-${label.toLowerCase().replace(/\s+/g, "-")}`;
  const handleChange = (e: SelectChangeEvent) => onChange(e.target.value);

  return (
    <FormControl size={size} sx={{ minWidth }}>
      <InputLabel id={`${id}-label`}>{label}</InputLabel>
      <Select
        labelId={`${id}-label`}
        id={id}
        label={label}
        value={value}
        onChange={handleChange}
      >
        {includeAll && <MenuItem value="">{allLabel}</MenuItem>}
        {options.map((opt) => (
          <MenuItem key={opt.value} value={opt.value}>
            {opt.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
