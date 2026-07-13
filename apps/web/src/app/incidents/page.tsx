import { Suspense } from "react";
import { IncidentsListView } from "@/features/incidents/components/IncidentsListView";
import { LoadingSkeleton } from "@/shared/components/LoadingSkeleton";
import { PageHeader } from "@/shared/components/PageHeader";

export default function IncidentsPage() {
  return (
    <Suspense
      fallback={
        <>
          <PageHeader title="Incidents" />
          <LoadingSkeleton rows={6} height={44} ariaLabel="Loading incidents" />
        </>
      }
    >
      <IncidentsListView />
    </Suspense>
  );
}
