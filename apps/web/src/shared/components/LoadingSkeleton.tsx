"use client";

import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";

export interface LoadingSkeletonProps {
  rows?: number;
  height?: number;
  ariaLabel?: string;
}

export function LoadingSkeleton({
  rows = 3,
  height = 32,
  ariaLabel = "Loading",
}: LoadingSkeletonProps) {
  return (
    <Stack
      spacing={1}
      role="status"
      aria-live="polite"
      aria-busy="true"
      aria-label={ariaLabel}
    >
      {Array.from({ length: rows }).map((_, i) => (
        <Skeleton
          key={i}
          variant="rounded"
          height={height}
          animation="wave"
        />
      ))}
    </Stack>
  );
}
