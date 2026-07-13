using Microsoft.EntityFrameworkCore;
using NetOps.Api.Data;
using NetOps.Api.Domain;
using NetOps.Api.Dtos;
using NetOps.Api.Mapping;

namespace NetOps.Api.Services;

public class DashboardService
{
    private readonly AppDbContext _db;

    public DashboardService(AppDbContext db) => _db = db;

    public async Task<DashboardSummaryDto> GetSummaryAsync(CancellationToken ct = default)
    {
        var siteCounts = await _db.Sites
            .AsNoTracking()
            .GroupBy(s => s.Status)
            .Select(g => new { Status = g.Key, Count = g.Count() })
            .ToListAsync(ct);

        int total = siteCounts.Sum(x => x.Count);
        int online = siteCounts.FirstOrDefault(x => x.Status == SiteStatus.Online)?.Count ?? 0;
        int degraded = siteCounts.FirstOrDefault(x => x.Status == SiteStatus.Degraded)?.Count ?? 0;
        int offline = siteCounts.FirstOrDefault(x => x.Status == SiteStatus.Offline)?.Count ?? 0;

        var averageUptime = total == 0
            ? 0.0
            : await _db.Sites.AsNoTracking().AverageAsync(s => s.UptimePercentage, ct);

        int openIncidents = await _db.Incidents
            .AsNoTracking()
            .CountAsync(i => i.Status == IncidentStatus.Open || i.Status == IncidentStatus.InProgress, ct);

        int pending = await _db.Invoices.AsNoTracking().CountAsync(i => i.Status == InvoiceStatus.Pending, ct);
        int overdue = await _db.Invoices.AsNoTracking().CountAsync(i => i.Status == InvoiceStatus.Overdue, ct);

        var recentIncidents = await _db.Incidents
            .AsNoTracking()
            .Include(i => i.Site)
            .OrderByDescending(i => i.CreatedAt)
            .Take(5)
            .ToListAsync(ct);

        var worst = await _db.Sites
            .AsNoTracking()
            .Include(s => s.Customer)
            .Where(s => s.Status != SiteStatus.Maintenance)
            .OrderBy(s => s.UptimePercentage)
            .ThenByDescending(s => s.LatencyMs)
            .Take(5)
            .ToListAsync(ct);

        return new DashboardSummaryDto(
            TotalSites: total,
            OnlineSites: online,
            DegradedSites: degraded,
            OfflineSites: offline,
            OpenIncidents: openIncidents,
            AverageUptime: Math.Round(averageUptime, 2),
            PendingInvoices: pending,
            OverdueInvoices: overdue,
            RecentIncidents: recentIncidents.Select(i => i.ToDto(i.Site?.Name ?? "")).ToList(),
            WorstPerformingSites: worst.Select(s => s.ToSummaryDto(s.Customer?.Name ?? "")).ToList()
        );
    }
}
