namespace webinar_service.Services.WebinarService;

public partial class WebinarService
{
    public async Task<WebinarOut> CreateWebinarAsync(WebinarIn input)
    {
        var entity = new Db.Entities.Webinar
        {
            Id = Guid.NewGuid(),
            Title = input.Title,
            Description = input.Description,
            StartTime = input.StartTime,
            HostId = input.HostId,
        };

        _db.Webinars.Add(entity);
        await _db.SaveChangesAsync();
        
        return new WebinarOut
        {
            Title = entity.Title,
            Description = entity.Description,
            StartTime = entity.StartTime,
            HostId = entity.HostId
        };
    }
}