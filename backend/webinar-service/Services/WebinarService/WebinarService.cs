using webinar_service.Db;

namespace webinar_service.Services.WebinarService;

public partial class WebinarService(AppDbContext db)
{
    private readonly AppDbContext _db = db;
}
public class WebinarIn
{
    public required string Title { get; set; }
    public required DateTime StartTime { get; set; }
    public required Guid HostId { get; set; }
    public string? Description { get; set; }
}
public class WebinarOut
{
    public required string Title { get; set; }
    public required DateTime StartTime { get; set; }
    public required Guid HostId { get; set; }
    public string? Description { get; set; }
}