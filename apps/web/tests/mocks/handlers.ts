import { HttpResponse, http } from "msw";
import {
  dashboardSummary,
  incident1,
  incident2,
  invoice1,
  invoice2,
  service1,
  site1,
  site2,
  site3,
  siteDetail1,
} from "./fixtures";

const BASE = "http://localhost:5102";

const allSites = [site1, site2, site3];

export const handlers = [
  http.get(`${BASE}/api/dashboard/summary`, () => HttpResponse.json(dashboardSummary)),

  http.get(`${BASE}/api/sites`, ({ request }) => {
    const url = new URL(request.url);
    const search = url.searchParams.get("search")?.toLowerCase() ?? "";
    const status = url.searchParams.get("status") ?? "";
    const page = Number(url.searchParams.get("page") ?? "1");
    const pageSize = Number(url.searchParams.get("pageSize") ?? "10");

    let items = [...allSites];
    if (search) {
      items = items.filter(
        (s) =>
          s.name.toLowerCase().includes(search) ||
          s.city.toLowerCase().includes(search) ||
          s.country.toLowerCase().includes(search),
      );
    }
    if (status) items = items.filter((s) => s.status === status);
    const total = items.length;
    const start = (page - 1) * pageSize;
    items = items.slice(start, start + pageSize);
    return HttpResponse.json({ items, total, page, pageSize });
  }),

  http.get(`${BASE}/api/sites/:id`, ({ params }) => {
    if (params.id !== siteDetail1.id) return new HttpResponse(null, { status: 404 });
    return HttpResponse.json(siteDetail1);
  }),
  http.get(`${BASE}/api/sites/:id/services`, () => HttpResponse.json([service1])),
  http.get(`${BASE}/api/sites/:id/incidents`, () => HttpResponse.json([incident1])),

  http.get(`${BASE}/api/incidents`, ({ request }) => {
    const url = new URL(request.url);
    const status = url.searchParams.get("status") ?? "";
    const severity = url.searchParams.get("severity") ?? "";
    const search = url.searchParams.get("search")?.toLowerCase() ?? "";

    let items = [incident1, incident2];
    if (status) items = items.filter((i) => i.status === status);
    if (severity) items = items.filter((i) => i.severity === severity);
    if (search) {
      items = items.filter(
        (i) =>
          i.title.toLowerCase().includes(search) ||
          i.description.toLowerCase().includes(search),
      );
    }
    return HttpResponse.json({
      items,
      total: items.length,
      page: 1,
      pageSize: 10,
    });
  }),

  http.get(`${BASE}/api/invoices`, () => HttpResponse.json([invoice1, invoice2])),
];
