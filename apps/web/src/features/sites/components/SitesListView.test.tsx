import { describe, expect, it, vi } from "vitest";
import { fireEvent, screen, waitFor } from "@testing-library/react";
import { HttpResponse, http } from "msw";
import { server } from "../../../../tests/mocks/server";
import { renderWithProviders } from "../../../../tests/utils/renderWithProviders";
import { SitesListView } from "./SitesListView";

let currentSearchParams = new URLSearchParams();

const mockReplace = vi.fn((url: string) => {
  const qIndex = url.indexOf("?");
  currentSearchParams = new URLSearchParams(qIndex >= 0 ? url.slice(qIndex + 1) : "");
});

vi.mock("next/navigation", () => ({
  useRouter: () => ({
    replace: mockReplace,
    push: vi.fn(),
    back: vi.fn(),
    forward: vi.fn(),
    refresh: vi.fn(),
    prefetch: vi.fn(),
  }),
  useSearchParams: () => currentSearchParams,
  usePathname: () => "/sites",
}));

function setSearchParams(qs: string) {
  currentSearchParams = new URLSearchParams(qs);
}

describe("SitesListView", () => {
  beforeEach(() => {
    setSearchParams("");
    mockReplace.mockClear();
  });

  it("renders sites returned by the API", async () => {
    renderWithProviders(<SitesListView />);

    expect(await screen.findByText("Aurora HQ")).toBeInTheDocument();
    expect(screen.getByText("Aurora Barcelona Store")).toBeInTheDocument();
    expect(screen.getByText("NorthBank Paris HQ")).toBeInTheDocument();
  });

  it("pushes the search term to the URL when the user types", async () => {
    renderWithProviders(<SitesListView />);
    await screen.findByText("Aurora HQ");

    const input = screen.getByLabelText(/search sites/i) as HTMLInputElement;
    fireEvent.change(input, { target: { value: "paris" } });

    await waitFor(() => {
      const calls = mockReplace.mock.calls.map((c) => c[0] as string);
      expect(calls.some((url) => url.includes("search=paris"))).toBe(true);
    });
  });

  it("filters the visible rows using the search value from the URL", async () => {
    setSearchParams("search=paris");
    renderWithProviders(<SitesListView />);

    expect(await screen.findByText("NorthBank Paris HQ")).toBeInTheDocument();
    expect(screen.queryByText("Aurora HQ")).not.toBeInTheDocument();
    expect(screen.queryByText("Aurora Barcelona Store")).not.toBeInTheDocument();
  });

  it("shows the empty state when filters return no results", async () => {
    setSearchParams("search=nomatch-xyz");
    renderWithProviders(<SitesListView />);

    expect(
      await screen.findByText(/no sites match your filters/i),
    ).toBeInTheDocument();
  });

  it("shows the error state when the API fails", async () => {
    server.use(
      http.get("http://localhost:5102/api/sites", () =>
        new HttpResponse(null, { status: 500 }),
      ),
    );

    renderWithProviders(<SitesListView />);

    expect(
      await screen.findByRole("alert"),
    ).toHaveTextContent(/couldn't load sites/i);
  });
});
