namespace NetOps.Api.Domain;

public class Incident
{
    public Guid Id { get; set; }
    public Guid SiteId { get; set; }
    public string Title { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public IncidentSeverity Severity { get; set; }
    public IncidentStatus Status { get; set; }
    public DateTime CreatedAt { get; set; }
    public DateTime UpdatedAt { get; set; }
    public string AssignedTo { get; set; } = string.Empty;

    public Site? Site { get; set; }
}
