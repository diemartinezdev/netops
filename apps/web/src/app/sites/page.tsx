import { Suspense } from "react";
import { SitesListView } from "@/features/sites/components/SitesListView";
import { LoadingSkeleton } from "@/shared/components/LoadingSkeleton";
import { PageHeader } from "@/shared/components/PageHeader";

export default function SitesPage() {
  return (
    <Suspense
      fallback={
        <>
          <PageHeader title="Sites" />
          <LoadingSkeleton rows={6} height={44} ariaLabel="Loading sites" />
        </>
      }
    >
      <SitesListView />
    </Suspense>
  );
}
