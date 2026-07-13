namespace NetOps.Api.Domain;

public class Customer
{
    public Guid Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string Industry { get; set; } = string.Empty;
    public string Country { get; set; } = string.Empty;
    public DateTime CreatedAt { get; set; }

    public List<Site> Sites { get; set; } = new();
    public List<Invoice> Invoices { get; set; } = new();
}
