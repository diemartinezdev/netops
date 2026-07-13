import { describe, expect, it } from "vitest";
import { screen } from "@testing-library/react";
import { renderWithProviders } from "../../../../tests/utils/renderWithProviders";
import { dashboardSummary } from "../../../../tests/mocks/fixtures";
import { SummaryCards } from "./SummaryCards";

describe("SummaryCards", () => {
  it("renders all six key metrics from the summary", () => {
    renderWithProviders(<SummaryCards data={dashboardSummary} />);

    expect(screen.getByRole("region", { name: "Total sites" })).toBeInTheDocument();
    expect(screen.getByRole("region", { name: "Online" })).toBeInTheDocument();
    expect(
      screen.getByRole("region", { name: "Degraded / offline" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("region", { name: "Open incidents" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("region", { name: "Average uptime" }),
    ).toBeInTheDocument();
    expect(screen.getByRole("region", { name: "Invoices" })).toBeInTheDocument();
  });

  it("renders the average uptime formatted as a percentage", () => {
    renderWithProviders(<SummaryCards data={dashboardSummary} />);
    expect(screen.getByText("92.02%")).toBeInTheDocument();
  });

  it("shows the split of degraded and offline sites as hint text", () => {
    renderWithProviders(<SummaryCards data={dashboardSummary} />);
    expect(screen.getByText(/3 degraded/)).toBeInTheDocument();
    expect(screen.getByText(/1 offline/)).toBeInTheDocument();
  });
});
