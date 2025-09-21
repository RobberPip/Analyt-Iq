namespace webinar_service.Services.WebinarService;

public partial class WebinarService
{
    public WebinarOut? GetWebinar(Guid id)
    {
        var entity = _db.Webinars.FirstOrDefault(w => w.Id == id);
        if (entity == null) return null;

        return new WebinarOut
        {
            Title = entity.Title,
            Description = entity.Description,
            StartTime = entity.StartTime,
            HostId = entity.HostId
        };
    }

    public IEnumerable<WebinarOut> GetAllWebinars()
    {
        logger.LogInformation("1111111111111");
        return _db.Webinars
            .Select(w => new WebinarOut
            {
                Title = w.Title,
                Description = w.Description,
                StartTime = w.StartTime,
                HostId = w.HostId
            })
            .ToList();
    }
}