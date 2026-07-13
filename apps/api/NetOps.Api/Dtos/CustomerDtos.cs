namespace NetOps.Api.Dtos;

public record CustomerDto(
    Guid Id,
    string Name,
    string Industry,
    string Country,
    int ActiveSitesCount,
    DateTime CreatedAt
);
