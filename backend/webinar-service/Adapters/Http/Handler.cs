using webinar_service.Services.WebinarService;

namespace webinar_service.Adapters.Http;

public static partial class WebinarEndpoints
{
    private static IResult GetWebinar(Guid id, WebinarService service)
    {
        var webinar = service.GetWebinar(id);
        return webinar is null ? Results.NotFound() : Results.Ok(webinar);
    }

    private static IResult GetWebinars(WebinarService service)
    {
        var webinars = service.GetAllWebinars();
        return Results.Ok(webinars);
    }

    private static async Task<IResult> CreateWebinar(WebinarIn input, WebinarService service)
    {
        var created = await service.CreateWebinarAsync(input);
        return Results.Ok(created);
    }
}