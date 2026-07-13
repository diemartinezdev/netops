using Microsoft.EntityFrameworkCore;
using NetOps.Api.Data;
using NetOps.Api.Services;

var builder = WebApplication.CreateBuilder(args);

const string CorsPolicy = "WebClient";

builder.Services.AddCors(options =>
{
    options.AddPolicy(CorsPolicy, policy =>
    {
        policy
            .WithOrigins(
                "http://localhost:3000",
                "http://127.0.0.1:3000"
            )
            .AllowAnyHeader()
            .AllowAnyMethod();
    });
});

builder.Services.AddDbContext<AppDbContext>(options =>
{
    var provider = builder.Configuration["Database:Provider"] ?? "Sqlite";
    var conn = builder.Configuration.GetConnectionString("Default")
        ?? (provider.Equals("Postgres", StringComparison.OrdinalIgnoreCase)
            ? "Host=localhost;Database=netops;Username=netops;Password=netops"
            : "Data Source=netops.db");

    if (provider.Equals("Postgres", StringComparison.OrdinalIgnoreCase))
        options.UseNpgsql(conn);
    else
        options.UseSqlite(conn);
});

builder.Services.AddScoped<DashboardService>();

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new() { Title = "NetOps API", Version = "v1" });
});

var app = builder.Build();

using (var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider.GetRequiredService<AppDbContext>();
    await db.Database.EnsureCreatedAsync();
    await DbSeeder.SeedAsync(db);
}

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI(c =>
    {
        c.SwaggerEndpoint("/swagger/v1/swagger.json", "NetOps API v1");
        c.RoutePrefix = "swagger";
    });
}

app.UseCors(CorsPolicy);
app.MapControllers();

app.Run();
