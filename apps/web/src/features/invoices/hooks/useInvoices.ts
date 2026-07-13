"use client";

import { useQuery } from "@tanstack/react-query";
import { getInvoices } from "../api/invoicesApi";

export const invoicesKeys = {
  list: ["invoices", "list"] as const,
};

export function useInvoices() {
  return useQuery({
    queryKey: invoicesKeys.list,
    queryFn: ({ signal }) => getInvoices(signal),
  });
}
