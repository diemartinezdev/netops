namespace NetOps.Api.Domain;

public class Site
{
    public Guid Id { get; set; }
    public Guid CustomerId { get; set; }
    public string Name { get; set; } = string.Empty;
    public string City { get; set; } = string.Empty;
    public string Country { get; set; } = string.Empty;
    public string Address { get; set; } = string.Empty;
    public SiteStatus Status { get; set; }
    public ConnectionType ConnectionType { get; set; }
    public double UptimePercentage { get; set; }
    public int LatencyMs { get; set; }
    public double PacketLossPercentage { get; set; }
    public DateTime LastCheckedAt { get; set; }

    public Customer? Customer { get; set; }
    public List<Service> Services { get; set; } = new();
    public List<Incident> Incidents { get; set; } = new();
}
