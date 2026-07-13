using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using NetOps.Api.Data;
using NetOps.Api.Dtos;
using NetOps.Api.Mapping;

namespace NetOps.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class IncidentsController : ControllerBase
{
    private readonly AppDbContext _db;

    public IncidentsController(AppDbContext db) => _db = db;

    [HttpGet]
    public async Task<ActionResult<PagedResult<IncidentDto>>> List(
        [FromQuery] string? status,
        [FromQuery] string? severity,
        [FromQuery] string? search,
        [FromQuery] int page = 1,
        [FromQuery] int pageSize = 20)
    {
        if (page < 1) page = 1;
        pageSize = Math.Clamp(pageSize, 1, 100);

        var query = _db.Incidents.AsNoTracking().Include(i => i.Site).AsQueryable();

        if (EnumMap.TryParseIncidentStatus(status, out var st))
            query = query.Where(i => i.Status == st);

        if (EnumMap.TryParseIncidentSeverity(severity, out var sv))
            query = query.Where(i => i.Severity == sv);

        if (!string.IsNullOrWhiteSpace(search))
        {
            var q = search.Trim().ToLower();
            query = query.Where(i =>
                i.Title.ToLower().Contains(q) ||
                i.Description.ToLower().Contains(q));
        }

        query = query.OrderByDescending(i => i.CreatedAt);

        var total = await query.CountAsync();
        var items = await query
            .Skip((page - 1) * pageSize)
            .Take(pageSize)
            .ToListAsync();

        var dto = items.Select(i => i.ToDto(i.Site?.Name ?? "")).ToList();
        return Ok(new PagedResult<IncidentDto>(dto, total, page, pageSize));
    }

    [HttpGet("{id:guid}")]
    public async Task<ActionResult<IncidentDto>> Get(Guid id)
    {
        var incident = await _db.Incidents
            .AsNoTracking()
            .Include(i => i.Site)
            .FirstOrDefaultAsync(i => i.Id == id);

        if (incident is null) return NotFound();
        return Ok(incident.ToDto(incident.Site?.Name ?? ""));
    }

    [HttpPatch("{id:guid}/status")]
    public async Task<ActionResult<IncidentDto>> UpdateStatus(Guid id, [FromBody] UpdateIncidentStatusRequest body)
    {
        if (!EnumMap.TryParseIncidentStatus(body.Status, out var newStatus))
            return ValidationProblem($"Invalid status '{body.Status}'. Allowed: open, in_progress, resolved, closed.");

        var incident = await _db.Incidents.Include(i => i.Site).FirstOrDefaultAsync(i => i.Id == id);
        if (incident is null) return NotFound();

        incident.Status = newStatus;
        incident.UpdatedAt = DateTime.UtcNow;
        await _db.SaveChangesAsync();

        return Ok(incident.ToDto(incident.Site?.Name ?? ""));
    }
}
