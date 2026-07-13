using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using NetOps.Api.Data;
using NetOps.Api.Domain;
using NetOps.Api.Dtos;
using NetOps.Api.Mapping;

namespace NetOps.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class CustomersController : ControllerBase
{
    private readonly AppDbContext _db;

    public CustomersController(AppDbContext db) => _db = db;

    [HttpGet]
    public async Task<ActionResult<IReadOnlyList<CustomerDto>>> List()
    {
        var rows = await _db.Customers
            .AsNoTracking()
            .Select(c => new
            {
                Customer = c,
                ActiveSites = c.Sites.Count(s => s.Status != SiteStatus.Offline)
            })
            .ToListAsync();

        var dto = rows.Select(r => r.Customer.ToDto(r.ActiveSites)).ToList();
        return Ok(dto);
    }

    [HttpGet("{id:guid}")]
    public async Task<ActionResult<CustomerDto>> Get(Guid id)
    {
        var row = await _db.Customers
            .AsNoTracking()
            .Where(c => c.Id == id)
            .Select(c => new
            {
                Customer = c,
                ActiveSites = c.Sites.Count(s => s.Status != SiteStatus.Offline)
            })
            .FirstOrDefaultAsync();

        if (row is null) return NotFound();
        return Ok(row.Customer.ToDto(row.ActiveSites));
    }
}
