namespace NetOps.Api.Dtos;

public record DashboardSummaryDto(
    int TotalSites,
    int OnlineSites,
    int DegradedSites,
    int OfflineSites,
    int OpenIncidents,
    double AverageUptime,
    int PendingInvoices,
    int OverdueInvoices,
    IReadOnlyList<IncidentDto> RecentIncidents,
    IReadOnlyList<SiteSummaryDto> WorstPerformingSites
);
