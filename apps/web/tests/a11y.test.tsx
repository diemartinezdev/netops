import { describe, expect, it } from "vitest";
import { axe } from "vitest-axe";
import { renderWithProviders } from "./utils/renderWithProviders";
import { MetricCard } from "@/shared/components/MetricCard";
import { StatusBadge } from "@/shared/components/StatusBadge";
import { SeverityBadge } from "@/shared/components/SeverityBadge";
import { EmptyState } from "@/shared/components/EmptyState";
import { ErrorState } from "@/shared/components/ErrorState";
import { PageHeader } from "@/shared/components/PageHeader";
import { SectionCard } from "@/shared/components/SectionCard";
import { SummaryCards } from "@/features/dashboard/components/SummaryCards";
import { IncidentsFilters } from "@/features/incidents/components/IncidentsFilters";
import { InvoicesTable } from "@/features/invoices/components/InvoicesTable";
import { dashboardSummary, invoice1, invoice2 } from "./mocks/fixtures";

async function expectNoAxeViolations(container: HTMLElement) {
  const results = await axe(container);
  expect(results).toHaveNoViolations();
}

describe("accessibility (axe)", () => {
  it("MetricCard has no violations", async () => {
    const { container } = renderWithProviders(
      <MetricCard title="Total sites" value={15} hint="of 15" />,
    );
    await expectNoAxeViolations(container);
  });

  it("StatusBadge has no violations", async () => {
    const { container } = renderWithProviders(<StatusBadge status="degraded" />);
    await expectNoAxeViolations(container);
  });

  it("SeverityBadge has no violations", async () => {
    const { container } = renderWithProviders(<SeverityBadge severity="critical" />);
    await expectNoAxeViolations(container);
  });

  it("EmptyState has no violations", async () => {
    const { container } = renderWithProviders(
      <EmptyState title="Nothing here" description="Try again" />,
    );
    await expectNoAxeViolations(container);
  });

  it("ErrorState has no violations", async () => {
    const { container } = renderWithProviders(
      <ErrorState title="Oops" message="Something failed" onRetry={() => {}} />,
    );
    await expectNoAxeViolations(container);
  });

  it("PageHeader has no violations", async () => {
    const { container } = renderWithProviders(
      <PageHeader title="Sites" description="All sites." />,
    );
    await expectNoAxeViolations(container);
  });

  it("SectionCard has no violations", async () => {
    const { container } = renderWithProviders(
      <SectionCard title="Sites">
        <p>content</p>
      </SectionCard>,
    );
    await expectNoAxeViolations(container);
  });

  it("SummaryCards has no violations", async () => {
    const { container } = renderWithProviders(<SummaryCards data={dashboardSummary} />);
    await expectNoAxeViolations(container);
  });

  it("IncidentsFilters has no violations", async () => {
    const { container } = renderWithProviders(
      <IncidentsFilters
        search=""
        status=""
        severity=""
        onSearch={() => {}}
        onStatus={() => {}}
        onSeverity={() => {}}
      />,
    );
    await expectNoAxeViolations(container);
  });

  it("InvoicesTable has no violations", async () => {
    const { container } = renderWithProviders(
      <InvoicesTable invoices={[invoice1, invoice2]} />,
    );
    await expectNoAxeViolations(container);
  });
});
