namespace NetOps.Api.Domain;

public enum SiteStatus
{
    Online,
    Degraded,
    Offline,
    Maintenance
}

public enum ConnectionType
{
    Fiber,
    Broadband,
    Fourg,
    Fiveg,
    Satellite
}

public enum ServiceType
{
    Internet,
    Sdwan,
    Sase,
    Vpn,
    Firewall
}

public enum ServiceStatus
{
    Active,
    Pending,
    Suspended,
    Cancelled
}

public enum IncidentSeverity
{
    Low,
    Medium,
    High,
    Critical
}

public enum IncidentStatus
{
    Open,
    InProgress,
    Resolved,
    Closed
}

public enum InvoiceStatus
{
    Paid,
    Pending,
    Overdue
}
