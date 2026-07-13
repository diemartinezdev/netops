# NetOps.Api

ASP.NET Core Web API (.NET 10) for the NetOps dashboard. See the top-level [README](../../README.md) for the full project overview.

## Quick start

```bash
cd NetOps.Api
dotnet run
```

- Listens on `http://localhost:5102`
- SQLite database (`netops.db`) is created and seeded on first run
- Swagger UI: `http://localhost:5102/swagger`

## Structure

| Folder | Contains |
|---|---|
| `Domain/` | Entities (`Customer`, `Site`, `Service`, `Incident`, `Invoice`) + enums |
| `Data/` | `AppDbContext`, `DbSeeder`, `UtcDateTimeConverter` |
| `Dtos/` | Request/response records + `PagedResult<T>` |
| `Mapping/` | Enum ↔ API string maps + entity → DTO extensions |
| `Services/` | `DashboardService` (composed queries) |
| `Controllers/` | Thin controllers, one per resource |
| `Program.cs` | DI, CORS, EF Core provider switch, Swagger, seed |

## Switching to Postgres

Set two env vars (or the equivalent in `appsettings.Local.json`):

```
Database__Provider=Postgres
ConnectionStrings__Default=Host=localhost;Database=netops;Username=netops;Password=netops
```

See `podman-compose.yml` at the repo root for a working container setup.

## Endpoints

See the main [README §API endpoints](../../README.md#api-endpoints).
