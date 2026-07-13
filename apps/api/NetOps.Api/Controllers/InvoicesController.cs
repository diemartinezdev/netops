using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using NetOps.Api.Data;
using NetOps.Api.Dtos;
using NetOps.Api.Mapping;

namespace NetOps.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class InvoicesController : ControllerBase
{
    private readonly AppDbContext _db;

    public InvoicesController(AppDbContext db) => _db = db;

    [HttpGet]
    public async Task<ActionResult<IReadOnlyList<InvoiceDto>>> List()
    {
        var invoices = await _db.Invoices
            .AsNoTracking()
            .Include(i => i.Customer)
            .OrderByDescending(i => i.IssuedAt)
            .ToListAsync();

        return Ok(invoices.Select(i => i.ToDto(i.Customer?.Name ?? "")).ToList());
    }

    [HttpGet("{id:guid}")]
    public async Task<ActionResult<InvoiceDto>> Get(Guid id)
    {
        var invoice = await _db.Invoices
            .AsNoTracking()
            .Include(i => i.Customer)
            .FirstOrDefaultAsync(i => i.Id == id);

        if (invoice is null) return NotFound();
        return Ok(invoice.ToDto(invoice.Customer?.Name ?? ""));
    }
}
