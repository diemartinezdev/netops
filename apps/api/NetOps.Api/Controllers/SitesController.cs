using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using NetOps.Api.Data;
using NetOps.Api.Domain;
using NetOps.Api.Dtos;
using NetOps.Api.Mapping;

namespace NetOps.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class SitesController : ControllerBase
{
    private readonly AppDbContext _db;

    public SitesController(AppDbContext db) => _db = db;

    [HttpGet]
    public async Task<ActionResult<PagedResult<SiteSummaryDto>>> List(
        [FromQuery] string? search,
        [FromQuery] string? status,
        [FromQuery] string? connectionType,
        [FromQuery] string? sortBy,
        [FromQuery] string? sortDir,
        [FromQuery] int page = 1,
        [FromQuery] int pageSize = 20)
    {
        if (page < 1) page = 1;
        pageSize = Math.Clamp(pageSize, 1, 100);

        IQueryable<Site> query = _db.Sites.AsNoTracking().Include(s => s.Customer);

        if (!string.IsNullOrWhiteSpace(search))
        {
            var q = search.Trim().ToLower();
            query = query.Where(s =>
                s.Name.ToLower().Contains(q) ||
                s.City.ToLower().Contains(q) ||
                s.Country.ToLower().Contains(q));
        }

        if (EnumMap.TryParseSiteStatus(status, out var st))
            query = query.Where(s => s.Status == st);

        if (EnumMap.TryParseConnectionType(connectionType, out var ct))
            query = query.Where(s => s.ConnectionType == ct);

        var desc = string.Equals(sortDir, "desc", StringComparison.OrdinalIgnoreCase);
        query = (sortBy?.ToLowerInvariant()) switch
        {
            "uptime" => desc ? query.OrderByDescending(s => s.UptimePercentage) : query.OrderBy(s => s.UptimePercentage),
            "latency" => desc ? query.OrderByDescending(s => s.LatencyMs) : query.OrderBy(s => s.LatencyMs),
            "status" => desc ? query.OrderByDescending(s => s.Status) : query.OrderBy(s => s.Status),
            _ => desc ? query.OrderByDescending(s => s.Name) : query.OrderBy(s => s.Name)
        };

        var total = await query.CountAsync();
        var items = await query
            .Skip((page - 1) * pageSize)
            .Take(pageSize)
            .ToListAsync();

        var dto = items.Select(s => s.ToSummaryDto(s.Customer?.Name ?? "")).ToList();
        return Ok(new PagedResult<SiteSummaryDto>(dto, total, page, pageSize));
    }

    [HttpGet("{id:guid}")]
    public async Task<ActionResult<SiteDetailDto>> Get(Guid id)
    {
        var site = await _db.Sites
            .AsNoTracking()
            .Include(s => s.Customer)
            .FirstOrDefaultAsync(s => s.Id == id);

        if (site is null) return NotFound();

        var serviceCount = await _db.Services.CountAsync(s => s.SiteId == id);
        var openIncidentCount = await _db.Incidents
            .CountAsync(i => i.SiteId == id && (i.Status == IncidentStatus.Open || i.Status == IncidentStatus.InProgress));

        return Ok(site.ToDetailDto(site.Customer?.Name ?? "", serviceCount, openIncidentCount));
    }

    [HttpGet("{id:guid}/services")]
    public async Task<ActionResult<IReadOnlyList<ServiceDto>>> Services(Guid id)
    {
        var exists = await _db.Sites.AnyAsync(s => s.Id == id);
        if (!exists) return NotFound();

        var services = await _db.Services
            .AsNoTracking()
            .Where(s => s.SiteId == id)
            .OrderBy(s => s.Name)
            .ToListAsync();

        return Ok(services.Select(s => s.ToDto()).ToList());
    }

    [HttpGet("{id:guid}/incidents")]
    public async Task<ActionResult<IReadOnlyList<IncidentDto>>> Incidents(Guid id)
    {
        var site = await _db.Sites.AsNoTracking().FirstOrDefaultAsync(s => s.Id == id);
        if (site is null) return NotFound();

        var incidents = await _db.Incidents
            .AsNoTracking()
            .Where(i => i.SiteId == id)
            .OrderByDescending(i => i.CreatedAt)
            .ToListAsync();

        return Ok(incidents.Select(i => i.ToDto(site.Name)).ToList());
    }
}
