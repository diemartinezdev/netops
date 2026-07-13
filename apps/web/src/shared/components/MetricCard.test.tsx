import { describe, expect, it } from "vitest";
import { screen } from "@testing-library/react";
import { renderWithProviders } from "../../../tests/utils/renderWithProviders";
import { MetricCard } from "./MetricCard";

describe("MetricCard", () => {
  it("renders title and value", () => {
    renderWithProviders(<MetricCard title="Total sites" value={15} />);
    expect(screen.getByText("Total sites")).toBeInTheDocument();
    expect(screen.getByText("15")).toBeInTheDocument();
  });

  it("renders the optional hint", () => {
    renderWithProviders(
      <MetricCard title="Online" value={10} hint="of 15 sites" />,
    );
    expect(screen.getByText("of 15 sites")).toBeInTheDocument();
  });

  it("exposes the title as the accessible section name", () => {
    renderWithProviders(<MetricCard title="Open incidents" value={4} />);
    expect(
      screen.getByRole("region", { name: "Open incidents" }),
    ).toBeInTheDocument();
  });
});
