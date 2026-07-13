namespace NetOps.Api.Domain;

public class Invoice
{
    public Guid Id { get; set; }
    public Guid CustomerId { get; set; }
    public string InvoiceNumber { get; set; } = string.Empty;
    public decimal Amount { get; set; }
    public string Currency { get; set; } = "EUR";
    public InvoiceStatus Status { get; set; }
    public DateTime IssuedAt { get; set; }
    public DateTime DueDate { get; set; }

    public Customer? Customer { get; set; }
}
