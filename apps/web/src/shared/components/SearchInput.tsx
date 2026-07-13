"use client";

import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";

export interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  label?: string;
  ariaLabel?: string;
  size?: "small" | "medium";
}

export function SearchInput({
  value,
  onChange,
  placeholder = "Search...",
  label,
  ariaLabel = "Search",
  size = "small",
}: SearchInputProps) {
  return (
    <TextField
      type="search"
      size={size}
      label={label}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      slotProps={{
        input: {
          "aria-label": label ? undefined : ariaLabel,
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon fontSize="small" />
            </InputAdornment>
          ),
          endAdornment: value ? (
            <InputAdornment position="end">
              <IconButton
                aria-label="Clear search"
                size="small"
                edge="end"
                onClick={() => onChange("")}
              >
                <ClearIcon fontSize="small" />
              </IconButton>
            </InputAdornment>
          ) : undefined,
        },
      }}
      sx={{ minWidth: 240 }}
    />
  );
}
