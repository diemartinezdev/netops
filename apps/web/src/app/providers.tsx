"use client";

import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import { AppShell } from "@/shared/components/AppShell";
import { QueryProvider } from "@/shared/providers/QueryProvider";
import theme from "@/shared/theme/theme";
import type { ReactNode } from "react";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <QueryProvider>
        <AppShell>{children}</AppShell>
      </QueryProvider>
    </ThemeProvider>
  );
}
