namespace NetOps.Api.Dtos;

public record ServiceDto(
    Guid Id,
    Guid SiteId,
    string Name,
    string Type,
    string Provider,
    decimal MonthlyCost,
    string Status,
    DateTime StartedAt,
    DateTime RenewalDate
);
