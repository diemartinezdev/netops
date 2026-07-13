"use client";

import { useQuery, keepPreviousData } from "@tanstack/react-query";
import {
  getSite,
  getSiteIncidents,
  getSiteServices,
  getSites,
} from "../api/sitesApi";
import type { SitesFilters } from "../types";

export const sitesKeys = {
  all: ["sites"] as const,
  list: (filters: Partial<SitesFilters>) => ["sites", "list", filters] as const,
  detail: (id: string) => ["sites", "detail", id] as const,
  services: (id: string) => ["sites", id, "services"] as const,
  incidents: (id: string) => ["sites", id, "incidents"] as const,
};

export function useSitesList(filters: Partial<SitesFilters>) {
  return useQuery({
    queryKey: sitesKeys.list(filters),
    queryFn: ({ signal }) => getSites(filters, signal),
    placeholderData: keepPreviousData,
  });
}

export function useSite(id: string) {
  return useQuery({
    queryKey: sitesKeys.detail(id),
    queryFn: ({ signal }) => getSite(id, signal),
    enabled: Boolean(id),
  });
}

export function useSiteServices(id: string) {
  return useQuery({
    queryKey: sitesKeys.services(id),
    queryFn: ({ signal }) => getSiteServices(id, signal),
    enabled: Boolean(id),
  });
}

export function useSiteIncidents(id: string) {
  return useQuery({
    queryKey: sitesKeys.incidents(id),
    queryFn: ({ signal }) => getSiteIncidents(id, signal),
    enabled: Boolean(id),
  });
}
