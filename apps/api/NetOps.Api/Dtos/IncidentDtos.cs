using System.ComponentModel.DataAnnotations;

namespace NetOps.Api.Dtos;

public record IncidentDto(
    Guid Id,
    Guid SiteId,
    string SiteName,
    string Title,
    string Description,
    string Severity,
    string Status,
    DateTime CreatedAt,
    DateTime UpdatedAt,
    string AssignedTo
);

public class UpdateIncidentStatusRequest
{
    [Required]
    public string Status { get; set; } = string.Empty;
}
