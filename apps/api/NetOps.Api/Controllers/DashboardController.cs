using Microsoft.AspNetCore.Mvc;
using NetOps.Api.Dtos;
using NetOps.Api.Services;

namespace NetOps.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class DashboardController : ControllerBase
{
    private readonly DashboardService _service;

    public DashboardController(DashboardService service) => _service = service;

    [HttpGet("summary")]
    public async Task<ActionResult<DashboardSummaryDto>> Summary(CancellationToken ct)
        => Ok(await _service.GetSummaryAsync(ct));
}
