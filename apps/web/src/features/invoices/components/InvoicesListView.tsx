"use client";

import { PageHeader } from "@/shared/components/PageHeader";
import { LoadingSkeleton } from "@/shared/components/LoadingSkeleton";
import { ErrorState } from "@/shared/components/ErrorState";
import { EmptyState } from "@/shared/components/EmptyState";
import { SectionCard } from "@/shared/components/SectionCard";
import { useInvoices } from "../hooks/useInvoices";
import { InvoicesTable } from "./InvoicesTable";

export function InvoicesListView() {
  const { data, isLoading, isError, refetch } = useInvoices();

  const items = data ?? [];
  const overdueCount = items.filter((i) => i.status === "overdue").length;

  return (
    <>
      <PageHeader
        title="Invoices"
        description={
          overdueCount > 0
            ? `${overdueCount} overdue ${overdueCount === 1 ? "invoice needs" : "invoices need"} attention.`
            : "Billing and payment status."
        }
      />

      <SectionCard title={`Invoices${items.length ? ` (${items.length})` : ""}`}>
        {isLoading && (
          <LoadingSkeleton rows={5} height={44} ariaLabel="Loading invoices" />
        )}

        {isError && !isLoading && (
          <ErrorState
            message="We couldn't load invoices. Check the API is running."
            onRetry={() => refetch()}
          />
        )}

        {!isLoading && !isError && items.length === 0 && (
          <EmptyState
            title="No invoices"
            description="No invoices have been issued yet."
          />
        )}

        {!isError && items.length > 0 && <InvoicesTable invoices={items} />}
      </SectionCard>
    </>
  );
}
