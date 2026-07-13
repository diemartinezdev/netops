import { describe, expect, it, vi } from "vitest";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { renderWithProviders } from "../../../../tests/utils/renderWithProviders";
import { IncidentsFilters } from "./IncidentsFilters";

describe("IncidentsFilters", () => {
  it("calls onSearch as the user types", async () => {
    const onSearch = vi.fn();
    const user = userEvent.setup();
    renderWithProviders(
      <IncidentsFilters
        search=""
        status=""
        severity=""
        onSearch={onSearch}
        onStatus={vi.fn()}
        onSeverity={vi.fn()}
      />,
    );
    await user.type(screen.getByLabelText(/search incidents/i), "vpn");
    expect(onSearch).toHaveBeenCalled();
    expect(onSearch).toHaveBeenLastCalledWith("n");
  });

  it("calls onStatus when the user selects a status", async () => {
    const onStatus = vi.fn();
    const user = userEvent.setup();
    renderWithProviders(
      <IncidentsFilters
        search=""
        status=""
        severity=""
        onSearch={vi.fn()}
        onStatus={onStatus}
        onSeverity={vi.fn()}
      />,
    );
    await user.click(screen.getByLabelText("Status"));
    await user.click(screen.getByRole("option", { name: "In progress" }));
    expect(onStatus).toHaveBeenCalledWith("in_progress");
  });

  it("calls onSeverity when the user selects a severity", async () => {
    const onSeverity = vi.fn();
    const user = userEvent.setup();
    renderWithProviders(
      <IncidentsFilters
        search=""
        status=""
        severity=""
        onSearch={vi.fn()}
        onStatus={vi.fn()}
        onSeverity={onSeverity}
      />,
    );
    await user.click(screen.getByLabelText("Severity"));
    await user.click(screen.getByRole("option", { name: "Critical" }));
    expect(onSeverity).toHaveBeenCalledWith("critical");
  });
});
