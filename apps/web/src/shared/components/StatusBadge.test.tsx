import { describe, expect, it } from "vitest";
import { renderWithProviders } from "../../../tests/utils/renderWithProviders";
import { screen } from "@testing-library/react";
import { StatusBadge } from "./StatusBadge";

describe("StatusBadge", () => {
  it("renders the label for each status", () => {
    const { rerender } = renderWithProviders(<StatusBadge status="online" />);
    expect(screen.getByText("Online")).toBeInTheDocument();

    rerender(<StatusBadge status="degraded" />);
    expect(screen.getByText("Degraded")).toBeInTheDocument();

    rerender(<StatusBadge status="offline" />);
    expect(screen.getByText("Offline")).toBeInTheDocument();

    rerender(<StatusBadge status="maintenance" />);
    expect(screen.getByText("Maintenance")).toBeInTheDocument();
  });

  it("exposes an accessible name that includes the status", () => {
    renderWithProviders(<StatusBadge status="degraded" />);
    expect(
      screen.getByLabelText("Site status: Degraded"),
    ).toBeInTheDocument();
  });
});
