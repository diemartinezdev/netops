import { apiClient } from "@/shared/api/apiClient";
import type { DashboardSummary } from "../types";

export function getDashboardSummary(signal?: AbortSignal): Promise<DashboardSummary> {
  return apiClient.get<DashboardSummary>("/api/dashboard/summary", { signal });
}
