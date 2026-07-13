namespace NetOps.Api.Domain;

public class Service
{
    public Guid Id { get; set; }
    public Guid SiteId { get; set; }
    public string Name { get; set; } = string.Empty;
    public ServiceType Type { get; set; }
    public string Provider { get; set; } = string.Empty;
    public decimal MonthlyCost { get; set; }
    public ServiceStatus Status { get; set; }
    public DateTime StartedAt { get; set; }
    public DateTime RenewalDate { get; set; }

    public Site? Site { get; set; }
}
