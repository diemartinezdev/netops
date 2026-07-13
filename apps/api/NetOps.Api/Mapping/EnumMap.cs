using NetOps.Api.Domain;

namespace NetOps.Api.Mapping;

public static class EnumMap
{
    private static readonly IReadOnlyDictionary<SiteStatus, string> SiteStatusToStr = new Dictionary<SiteStatus, string>
    {
        [SiteStatus.Online] = "online",
        [SiteStatus.Degraded] = "degraded",
        [SiteStatus.Offline] = "offline",
        [SiteStatus.Maintenance] = "maintenance"
    };

    private static readonly IReadOnlyDictionary<ConnectionType, string> ConnectionTypeToStr = new Dictionary<ConnectionType, string>
    {
        [ConnectionType.Fiber] = "fiber",
        [ConnectionType.Broadband] = "broadband",
        [ConnectionType.Fourg] = "4g",
        [ConnectionType.Fiveg] = "5g",
        [ConnectionType.Satellite] = "satellite"
    };

    private static readonly IReadOnlyDictionary<ServiceType, string> ServiceTypeToStr = new Dictionary<ServiceType, string>
    {
        [ServiceType.Internet] = "internet",
        [ServiceType.Sdwan] = "sdwan",
        [ServiceType.Sase] = "sase",
        [ServiceType.Vpn] = "vpn",
        [ServiceType.Firewall] = "firewall"
    };

    private static readonly IReadOnlyDictionary<ServiceStatus, string> ServiceStatusToStr = new Dictionary<ServiceStatus, string>
    {
        [ServiceStatus.Active] = "active",
        [ServiceStatus.Pending] = "pending",
        [ServiceStatus.Suspended] = "suspended",
        [ServiceStatus.Cancelled] = "cancelled"
    };

    private static readonly IReadOnlyDictionary<IncidentSeverity, string> IncidentSeverityToStr = new Dictionary<IncidentSeverity, string>
    {
        [IncidentSeverity.Low] = "low",
        [IncidentSeverity.Medium] = "medium",
        [IncidentSeverity.High] = "high",
        [IncidentSeverity.Critical] = "critical"
    };

    private static readonly IReadOnlyDictionary<IncidentStatus, string> IncidentStatusToStr = new Dictionary<IncidentStatus, string>
    {
        [IncidentStatus.Open] = "open",
        [IncidentStatus.InProgress] = "in_progress",
        [IncidentStatus.Resolved] = "resolved",
        [IncidentStatus.Closed] = "closed"
    };

    private static readonly IReadOnlyDictionary<InvoiceStatus, string> InvoiceStatusToStr = new Dictionary<InvoiceStatus, string>
    {
        [InvoiceStatus.Paid] = "paid",
        [InvoiceStatus.Pending] = "pending",
        [InvoiceStatus.Overdue] = "overdue"
    };

    public static string ToApiString(this SiteStatus v) => SiteStatusToStr[v];
    public static string ToApiString(this ConnectionType v) => ConnectionTypeToStr[v];
    public static string ToApiString(this ServiceType v) => ServiceTypeToStr[v];
    public static string ToApiString(this ServiceStatus v) => ServiceStatusToStr[v];
    public static string ToApiString(this IncidentSeverity v) => IncidentSeverityToStr[v];
    public static string ToApiString(this IncidentStatus v) => IncidentStatusToStr[v];
    public static string ToApiString(this InvoiceStatus v) => InvoiceStatusToStr[v];

    private static bool TryParseFromMap<T>(IReadOnlyDictionary<T, string> map, string? raw, out T value) where T : struct
    {
        if (!string.IsNullOrWhiteSpace(raw))
        {
            var lower = raw.ToLowerInvariant();
            foreach (var kvp in map)
            {
                if (kvp.Value == lower) { value = kvp.Key; return true; }
            }
        }
        value = default;
        return false;
    }

    public static bool TryParseSiteStatus(string? raw, out SiteStatus value) => TryParseFromMap(SiteStatusToStr, raw, out value);
    public static bool TryParseConnectionType(string? raw, out ConnectionType value) => TryParseFromMap(ConnectionTypeToStr, raw, out value);
    public static bool TryParseIncidentStatus(string? raw, out IncidentStatus value) => TryParseFromMap(IncidentStatusToStr, raw, out value);
    public static bool TryParseIncidentSeverity(string? raw, out IncidentSeverity value) => TryParseFromMap(IncidentSeverityToStr, raw, out value);
}
