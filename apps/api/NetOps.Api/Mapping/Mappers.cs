using NetOps.Api.Domain;
using NetOps.Api.Dtos;

namespace NetOps.Api.Mapping;

public static class Mappers
{
    public static CustomerDto ToDto(this Customer c, int activeSitesCount) => new(
        c.Id, c.Name, c.Industry, c.Country, activeSitesCount, c.CreatedAt
    );

    public static SiteSummaryDto ToSummaryDto(this Site s, string customerName) => new(
        s.Id, s.CustomerId, customerName, s.Name, s.City, s.Country,
        s.Status.ToApiString(), s.ConnectionType.ToApiString(),
        s.UptimePercentage, s.LatencyMs, s.PacketLossPercentage, s.LastCheckedAt
    );

    public static SiteDetailDto ToDetailDto(this Site s, string customerName, int serviceCount, int openIncidentCount) => new(
        s.Id, s.CustomerId, customerName, s.Name, s.City, s.Country, s.Address,
        s.Status.ToApiString(), s.ConnectionType.ToApiString(),
        s.UptimePercentage, s.LatencyMs, s.PacketLossPercentage, s.LastCheckedAt,
        serviceCount, openIncidentCount
    );

    public static ServiceDto ToDto(this Service s) => new(
        s.Id, s.SiteId, s.Name, s.Type.ToApiString(), s.Provider,
        s.MonthlyCost, s.Status.ToApiString(), s.StartedAt, s.RenewalDate
    );

    public static IncidentDto ToDto(this Incident i, string siteName) => new(
        i.Id, i.SiteId, siteName, i.Title, i.Description,
        i.Severity.ToApiString(), i.Status.ToApiString(),
        i.CreatedAt, i.UpdatedAt, i.AssignedTo
    );

    public static InvoiceDto ToDto(this Invoice i, string customerName) => new(
        i.Id, i.CustomerId, customerName, i.InvoiceNumber,
        i.Amount, i.Currency, i.Status.ToApiString(),
        i.IssuedAt, i.DueDate
    );
}
