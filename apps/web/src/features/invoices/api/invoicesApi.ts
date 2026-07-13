import { apiClient } from "@/shared/api/apiClient";
import type { Invoice } from "@/shared/types/entities";

export function getInvoices(signal?: AbortSignal): Promise<Invoice[]> {
  return apiClient.get<Invoice[]>("/api/invoices", { signal });
}
