using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using NetOps.Api.Domain;

namespace NetOps.Api.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

    public DbSet<Customer> Customers => Set<Customer>();
    public DbSet<Site> Sites => Set<Site>();
    public DbSet<Service> Services => Set<Service>();
    public DbSet<Incident> Incidents => Set<Incident>();
    public DbSet<Invoice> Invoices => Set<Invoice>();

    protected override void ConfigureConventions(ModelConfigurationBuilder builder)
    {
        base.ConfigureConventions(builder);
        builder.Properties<DateTime>().HaveConversion<UtcDateTimeConverter>();
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Customer>(e =>
        {
            e.HasKey(x => x.Id);
            e.Property(x => x.Name).IsRequired().HasMaxLength(200);
            e.Property(x => x.Industry).HasMaxLength(100);
            e.Property(x => x.Country).HasMaxLength(100);
            e.HasMany(x => x.Sites).WithOne(s => s.Customer!).HasForeignKey(s => s.CustomerId);
            e.HasMany(x => x.Invoices).WithOne(i => i.Customer!).HasForeignKey(i => i.CustomerId);
        });

        modelBuilder.Entity<Site>(e =>
        {
            e.HasKey(x => x.Id);
            e.Property(x => x.Name).IsRequired().HasMaxLength(200);
            e.Property(x => x.City).HasMaxLength(100);
            e.Property(x => x.Country).HasMaxLength(100);
            e.Property(x => x.Address).HasMaxLength(300);
            e.Property(x => x.Status).HasConversion<string>().HasMaxLength(20);
            e.Property(x => x.ConnectionType).HasConversion<string>().HasMaxLength(20);
            e.HasIndex(x => x.CustomerId);
            e.HasIndex(x => x.Status);
            e.HasMany(x => x.Services).WithOne(s => s.Site!).HasForeignKey(s => s.SiteId);
            e.HasMany(x => x.Incidents).WithOne(i => i.Site!).HasForeignKey(i => i.SiteId);
        });

        modelBuilder.Entity<Service>(e =>
        {
            e.HasKey(x => x.Id);
            e.Property(x => x.Name).IsRequired().HasMaxLength(200);
            e.Property(x => x.Provider).HasMaxLength(100);
            e.Property(x => x.Type).HasConversion<string>().HasMaxLength(20);
            e.Property(x => x.Status).HasConversion<string>().HasMaxLength(20);
            e.Property(x => x.MonthlyCost).HasPrecision(12, 2);
            e.HasIndex(x => x.SiteId);
        });

        modelBuilder.Entity<Incident>(e =>
        {
            e.HasKey(x => x.Id);
            e.Property(x => x.Title).IsRequired().HasMaxLength(200);
            e.Property(x => x.Description).HasMaxLength(2000);
            e.Property(x => x.AssignedTo).HasMaxLength(100);
            e.Property(x => x.Severity).HasConversion<string>().HasMaxLength(20);
            e.Property(x => x.Status).HasConversion<string>().HasMaxLength(20);
            e.HasIndex(x => x.SiteId);
            e.HasIndex(x => x.Status);
        });

        modelBuilder.Entity<Invoice>(e =>
        {
            e.HasKey(x => x.Id);
            e.Property(x => x.InvoiceNumber).IsRequired().HasMaxLength(50);
            e.Property(x => x.Currency).HasMaxLength(3);
            e.Property(x => x.Status).HasConversion<string>().HasMaxLength(20);
            e.Property(x => x.Amount).HasPrecision(12, 2);
            e.HasIndex(x => x.CustomerId);
        });
    }
}
