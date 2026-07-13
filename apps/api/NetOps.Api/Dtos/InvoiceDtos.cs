namespace NetOps.Api.Dtos;

public record InvoiceDto(
    Guid Id,
    Guid CustomerId,
    string CustomerName,
    string InvoiceNumber,
    decimal Amount,
    string Currency,
    string Status,
    DateTime IssuedAt,
    DateTime DueDate
);
