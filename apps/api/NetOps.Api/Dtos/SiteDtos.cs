namespace NetOps.Api.Dtos;

public record SiteSummaryDto(
    Guid Id,
    Guid CustomerId,
    string CustomerName,
    string Name,
    string City,
    string Country,
    string Status,
    string ConnectionType,
    double UptimePercentage,
    int LatencyMs,
    double PacketLossPercentage,
    DateTime LastCheckedAt
);

public record SiteDetailDto(
    Guid Id,
    Guid CustomerId,
    string CustomerName,
    string Name,
    string City,
    string Country,
    string Address,
    string Status,
    string ConnectionType,
    double UptimePercentage,
    int LatencyMs,
    double PacketLossPercentage,
    DateTime LastCheckedAt,
    int ServiceCount,
    int OpenIncidentCount
);
