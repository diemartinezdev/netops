# NetOps web

Next.js 16 (App Router) + React 19 + TypeScript + MUI + TanStack Query. See the top-level [README](../../README.md) for the full project overview.

## Quick start

```bash
npm install
npm run dev
```

- Listens on `http://localhost:3000`, redirects `/` → `/dashboard`
- Requires the API running on `http://localhost:5102` (see `apps/api/`)
- Config: `.env.local` → `NEXT_PUBLIC_API_BASE_URL`

## Scripts

| Script | What it does |
|---|---|
| `npm run dev` | Start the dev server with Turbopack |
| `npm run build` | Production build (typecheck included) |
| `npm start` | Serve the production build |
| `npm test` | Vitest single run (unit + integration + axe) |
| `npm run test:watch` | Vitest watch mode |
| `npm run test:coverage` | Vitest with v8 coverage |
| `npm run lint` | ESLint |
| `npm run storybook` | Storybook dev server on port 6006 |
| `npm run build-storybook` | Static Storybook build (`storybook-static/`) |

## Structure

```
src/
├── app/            Routes (thin — page = layout + Suspense + feature view)
├── features/
│   ├── dashboard/  types, api, hooks, components
│   ├── sites/
│   ├── incidents/  includes the optimistic PATCH mutation
│   └── invoices/
└── shared/
    ├── api/            apiClient + typed ApiError
    ├── components/     StatusBadge, DataTable, MetricCard, ...
    ├── hooks/          useDebouncedValue, useUrlFilters
    ├── providers/      QueryProvider (TanStack Query)
    ├── theme/          MUI theme (cssVariables + light/dark)
    ├── types/          Domain enums + entity shapes
    └── utils/          Formatters + label maps
```

Rule: **features never import from other features**; they only import from `shared/`.

## Testing

Vitest + jsdom + `@testing-library/react` + `@testing-library/user-event` + MSW.

MSW intercepts real `fetch` calls in the test env so the API layer is exercised end-to-end. Accessibility is checked automatically via `vitest-axe`.

## Storybook

Storybook 10 (Vite builder) documents the shared component library with `autodocs`, controls and the `@storybook/addon-a11y` axe panel. Stories are colocated with their component (`*.stories.tsx` next to `*.tsx`).
