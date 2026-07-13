"use client";

import Button from "@mui/material/Button";
import NextLink from "next/link";
import Stack from "@mui/material/Stack";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { PageHeader } from "@/shared/components/PageHeader";
import { LoadingSkeleton } from "@/shared/components/LoadingSkeleton";
import { ErrorState } from "@/shared/components/ErrorState";
import { SectionCard } from "@/shared/components/SectionCard";
import {
  useSite,
  useSiteIncidents,
  useSiteServices,
} from "../hooks/useSites";
import { SiteOverview } from "./SiteOverview";
import { SiteServicesTable } from "./SiteServicesTable";
import { SiteIncidentsList } from "./SiteIncidentsList";

export function SiteDetailView({ id }: { id: string }) {
  const site = useSite(id);
  const services = useSiteServices(id);
  const incidents = useSiteIncidents(id);

  if (site.isLoading) {
    return (
      <>
        <PageHeader title="Site" />
        <LoadingSkeleton rows={4} height={72} ariaLabel="Loading site" />
      </>
    );
  }

  if (site.isError || !site.data) {
    return (
      <>
        <PageHeader title="Site" />
        <ErrorState
          message="We couldn't load this site. It may have been removed."
          onRetry={() => site.refetch()}
        />
      </>
    );
  }

  const s = site.data;

  return (
    <>
      <PageHeader
        title={s.name}
        description={`${s.city}, ${s.country} · ${s.customerName}`}
        actions={
          <Button
            component={NextLink}
            href="/sites"
            size="small"
            startIcon={<ArrowBackIcon />}
          >
            Back to sites
          </Button>
        }
      />

      <Stack spacing={3}>
        <SiteOverview site={s} />

        <SectionCard title="Services">
          {services.isLoading ? (
            <LoadingSkeleton rows={3} ariaLabel="Loading services" />
          ) : services.isError ? (
            <ErrorState
              message="Couldn't load services."
              onRetry={() => services.refetch()}
            />
          ) : (
            <SiteServicesTable services={services.data ?? []} />
          )}
        </SectionCard>

        <SectionCard title="Incidents">
          {incidents.isLoading ? (
            <LoadingSkeleton rows={3} ariaLabel="Loading incidents" />
          ) : incidents.isError ? (
            <ErrorState
              message="Couldn't load incidents."
              onRetry={() => incidents.refetch()}
            />
          ) : (
            <SiteIncidentsList incidents={incidents.data ?? []} />
          )}
        </SectionCard>
      </Stack>
    </>
  );
}
