using Microsoft.EntityFrameworkCore;
using webinar_service.Db.Entities;

namespace webinar_service.Db;

public sealed class AppDbContext :DbContext  
{  
    private readonly string _schema;
    private readonly IWebHostEnvironment _environment;
    public DbSet<Webinar> Webinars { get; set; }  
    
    public AppDbContext(DbContextOptions<AppDbContext> options, IWebHostEnvironment environment, IConfiguration configuration) :base(options)  
    {  
        _schema = configuration["DatabaseSchema"] ?? "public";  
        _environment = environment;

        if (!Database.CanConnect())
            throw new Exception("Couldn't connect to the database");

        if (this._environment.IsEnvironment("Testing")) {
            Database.EnsureCreated();
            
        } else if (this._environment.IsDevelopment()) {
            if (base.Database.GetPendingMigrations().Any())
                base.Database.Migrate();
        }
    }  
    protected override void OnModelCreating(ModelBuilder modelBuilder)  
    {  
        modelBuilder.HasDefaultSchema(_schema);  
        base.OnModelCreating(modelBuilder);  
    }  
}