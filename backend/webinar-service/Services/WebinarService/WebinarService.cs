using webinar_service.Db;


namespace webinar_service.Services.WebinarService;

public partial class WebinarService
{
    private readonly AppDbContext _db;
    private readonly ILogger<WebinarService> _logger;
    private readonly HttpClient _clientStream;

    public WebinarService(AppDbContext db, ILogger<WebinarService> logger, IHttpClientFactory clientFactory)
    {
        _db = db;
        _logger = logger;
        _clientStream = clientFactory.CreateClient("StreamAPI");
        _clientStream.BaseAddress = new Uri(Constants.StreamApiUrl);
        _clientStream.DefaultRequestHeaders.Add("accept", "application/json");
        _clientStream.DefaultRequestHeaders.Add("Authorization", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNzU4NTU1NzA4LCJleHAiOjE3NTkxNjA1MDN9.7WeU7T1YXz8tAJM9DKHksyh3EpwwiDnok9lOrSE_Bqo");
        _clientStream.DefaultRequestHeaders.Add("Stream-Auth-Type", "jwt");
    }
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