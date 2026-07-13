using Microsoft.EntityFrameworkCore;
using NetOps.Api.Domain;

namespace NetOps.Api.Data;

public static class DbSeeder
{
    public static async Task SeedAsync(AppDbContext db)
    {
        if (await db.Customers.AnyAsync()) return;

        var rand = new Random(42);
        var now = new DateTime(2026, 7, 10, 12, 0, 0, DateTimeKind.Utc);

        var customers = new[]
        {
            new Customer { Id = Guid.NewGuid(), Name = "Aurora Retail Group", Industry = "Retail", Country = "Spain", CreatedAt = now.AddYears(-3) },
            new Customer { Id = Guid.NewGuid(), Name = "MediCare Clinics", Industry = "Healthcare", Country = "Portugal", CreatedAt = now.AddYears(-2) },
            new Customer { Id = Guid.NewGuid(), Name = "NorthBank Financial", Industry = "Finance", Country = "France", CreatedAt = now.AddYears(-4) },
            new Customer { Id = Guid.NewGuid(), Name = "LogiChain Logistics", Industry = "Logistics", Country = "Germany", CreatedAt = now.AddYears(-1) }
        };
        await db.Customers.AddRangeAsync(customers);

        var sitesData = new (string Name, string City, string Country, string Address, SiteStatus Status, ConnectionType Conn, double Uptime, int Latency, double Loss)[]
        {
            ("Aurora HQ", "Madrid", "Spain", "Calle Gran Via 42", SiteStatus.Online, ConnectionType.Fiber, 99.98, 12, 0.01),
            ("Aurora Barcelona Store", "Barcelona", "Spain", "Passeig de Gracia 21", SiteStatus.Online, ConnectionType.Fiber, 99.87, 18, 0.05),
            ("Aurora Valencia Warehouse", "Valencia", "Spain", "Poligono Industrial Norte 5", SiteStatus.Degraded, ConnectionType.Broadband, 96.20, 82, 1.4),
            ("Aurora Seville Store", "Seville", "Spain", "Avenida de la Constitucion 8", SiteStatus.Online, ConnectionType.Fiber, 99.65, 22, 0.08),
            ("MediCare Lisbon Central", "Lisbon", "Portugal", "Avenida da Liberdade 100", SiteStatus.Online, ConnectionType.Fiber, 99.95, 14, 0.02),
            ("MediCare Porto Clinic", "Porto", "Portugal", "Rua de Santa Catarina 320", SiteStatus.Maintenance, ConnectionType.Fiber, 98.10, 20, 0.10),
            ("MediCare Faro Branch", "Faro", "Portugal", "Rua Cruz das Mestras 15", SiteStatus.Offline, ConnectionType.Fourg, 0.0, 0, 100.0),
            ("NorthBank Paris HQ", "Paris", "France", "Rue de Rivoli 55", SiteStatus.Online, ConnectionType.Fiber, 99.99, 8, 0.00),
            ("NorthBank Lyon Office", "Lyon", "France", "Rue de la Republique 12", SiteStatus.Online, ConnectionType.Fiber, 99.72, 16, 0.03),
            ("NorthBank Marseille Branch", "Marseille", "France", "La Canebiere 40", SiteStatus.Degraded, ConnectionType.Broadband, 94.50, 110, 2.1),
            ("NorthBank Nice ATM Hub", "Nice", "France", "Promenade des Anglais 7", SiteStatus.Online, ConnectionType.Fourg, 99.20, 35, 0.4),
            ("LogiChain Berlin HQ", "Berlin", "Germany", "Alexanderplatz 1", SiteStatus.Online, ConnectionType.Fiber, 99.90, 10, 0.01),
            ("LogiChain Hamburg Port", "Hamburg", "Germany", "Hafenstrasse 88", SiteStatus.Online, ConnectionType.Fiveg, 99.60, 15, 0.05),
            ("LogiChain Munich Warehouse", "Munich", "Germany", "Landsberger Strasse 200", SiteStatus.Degraded, ConnectionType.Broadband, 95.30, 95, 1.8),
            ("LogiChain Frankfurt Depot", "Frankfurt", "Germany", "Mainzer Landstrasse 45", SiteStatus.Online, ConnectionType.Satellite, 98.40, 220, 0.6)
        };

        var sites = new List<Site>();
        var customerIndexBySite = new[] { 0,0,0,0, 1,1,1, 2,2,2,2, 3,3,3,3 };
        for (int i = 0; i < sitesData.Length; i++)
        {
            var s = sitesData[i];
            sites.Add(new Site
            {
                Id = Guid.NewGuid(),
                CustomerId = customers[customerIndexBySite[i]].Id,
                Name = s.Name,
                City = s.City,
                Country = s.Country,
                Address = s.Address,
                Status = s.Status,
                ConnectionType = s.Conn,
                UptimePercentage = s.Uptime,
                LatencyMs = s.Latency,
                PacketLossPercentage = s.Loss,
                LastCheckedAt = now.AddMinutes(-rand.Next(1, 30))
            });
        }
        await db.Sites.AddRangeAsync(sites);

        var serviceCatalog = new (string Name, ServiceType Type, string Provider, decimal Cost)[]
        {
            ("Enterprise Internet 1Gbps", ServiceType.Internet, "TelcoEurope", 450m),
            ("SD-WAN Managed", ServiceType.Sdwan, "NetShield", 320m),
            ("SASE Cloud Security", ServiceType.Sase, "CloudGuard", 280m),
            ("Site-to-Site VPN", ServiceType.Vpn, "VPNPro", 90m),
            ("Managed Firewall", ServiceType.Firewall, "FortiCore", 180m)
        };

        var services = new List<Service>();
        foreach (var site in sites)
        {
            var svcCount = rand.Next(2, 5);
            var picked = serviceCatalog.OrderBy(_ => rand.Next()).Take(svcCount).ToList();
            foreach (var s in picked)
            {
                var started = now.AddMonths(-rand.Next(3, 30));
                services.Add(new Service
                {
                    Id = Guid.NewGuid(),
                    SiteId = site.Id,
                    Name = s.Name,
                    Type = s.Type,
                    Provider = s.Provider,
                    MonthlyCost = s.Cost,
                    Status = ServiceStatus.Active,
                    StartedAt = started,
                    RenewalDate = started.AddYears(1)
                });
            }
        }
        await db.Services.AddRangeAsync(services);

        var incidentTemplates = new (string Title, string Desc, IncidentSeverity Sev)[]
        {
            ("High latency detected", "Latency exceeded 100ms threshold for over 15 minutes.", IncidentSeverity.Medium),
            ("Circuit down", "Primary circuit reported no signal by the CPE.", IncidentSeverity.Critical),
            ("Packet loss spike", "Packet loss above 1% detected on WAN interface.", IncidentSeverity.High),
            ("Scheduled maintenance", "Planned maintenance window for firmware upgrade.", IncidentSeverity.Low),
            ("Firewall CPU high", "Managed firewall CPU sustained above 85% for 30 minutes.", IncidentSeverity.Medium),
            ("VPN tunnel flapping", "VPN tunnel to HQ flapping every few minutes.", IncidentSeverity.High)
        };
        var engineers = new[] { "M. Fernandez", "L. Torres", "A. Nguyen", "S. Ivanova", "J. Dubois" };
        var incidents = new List<Incident>();

        var trouble = sites.Where(s => s.Status is SiteStatus.Degraded or SiteStatus.Offline or SiteStatus.Maintenance).ToList();
        foreach (var site in trouble)
        {
            var count = rand.Next(1, 4);
            for (int k = 0; k < count; k++)
            {
                var tpl = incidentTemplates[rand.Next(incidentTemplates.Length)];
                var created = now.AddHours(-rand.Next(1, 96));
                incidents.Add(new Incident
                {
                    Id = Guid.NewGuid(),
                    SiteId = site.Id,
                    Title = tpl.Title,
                    Description = tpl.Desc,
                    Severity = site.Status == SiteStatus.Offline ? IncidentSeverity.Critical : tpl.Sev,
                    Status = k == 0 ? IncidentStatus.Open : (IncidentStatus)rand.Next(0, 3),
                    CreatedAt = created,
                    UpdatedAt = created.AddMinutes(rand.Next(5, 300)),
                    AssignedTo = engineers[rand.Next(engineers.Length)]
                });
            }
        }

        foreach (var site in sites.Where(s => s.Status == SiteStatus.Online).OrderBy(_ => rand.Next()).Take(5))
        {
            var tpl = incidentTemplates[rand.Next(incidentTemplates.Length)];
            var created = now.AddDays(-rand.Next(1, 20));
            incidents.Add(new Incident
            {
                Id = Guid.NewGuid(),
                SiteId = site.Id,
                Title = tpl.Title,
                Description = tpl.Desc,
                Severity = tpl.Sev,
                Status = IncidentStatus.Resolved,
                CreatedAt = created,
                UpdatedAt = created.AddHours(rand.Next(1, 24)),
                AssignedTo = engineers[rand.Next(engineers.Length)]
            });
        }
        await db.Incidents.AddRangeAsync(incidents);

        var invoices = new List<Invoice>();
        int invoiceCounter = 1;
        foreach (var customer in customers)
        {
            for (int m = 4; m >= 0; m--)
            {
                var issued = now.AddMonths(-m).AddDays(-15);
                var due = issued.AddDays(30);
                var status = m switch
                {
                    0 => InvoiceStatus.Pending,
                    1 => due < now ? InvoiceStatus.Overdue : InvoiceStatus.Pending,
                    _ => InvoiceStatus.Paid
                };
                var siteCount = sites.Count(s => s.CustomerId == customer.Id);
                var amount = 1200m + (decimal)rand.Next(200, 1500) + siteCount * 350m;
                invoices.Add(new Invoice
                {
                    Id = Guid.NewGuid(),
                    CustomerId = customer.Id,
                    InvoiceNumber = $"INV-2026-{invoiceCounter++:0000}",
                    Amount = Math.Round(amount, 2),
                    Currency = "EUR",
                    Status = status,
                    IssuedAt = issued,
                    DueDate = due
                });
            }
        }
        await db.Invoices.AddRangeAsync(invoices);

        await db.SaveChangesAsync();
    }
}
