using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace webinar_service.Db.Entities;

[EntityTypeConfiguration(typeof(WebinarConfig))]
public class Webinar
{
    public Guid Id { get; init; }
    public required string Title { get; set; }
    public required DateTime StartTime { get; set; }
    public required Guid HostId { get; set; }
    public string? Description { get; set; }
}
public class WebinarConfig : IEntityTypeConfiguration<Webinar>
{
    public void Configure(EntityTypeBuilder<Webinar> builder)
    {
        builder.Property(b => b.Title).HasMaxLength(155);
        builder.Property(b => b.Description).HasMaxLength(255);
    }
}

