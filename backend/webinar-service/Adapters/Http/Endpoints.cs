namespace webinar_service.Adapters.Http;

public static partial class WebinarEndpoints
{
    public static void AddWebinarEndpoints(this WebApplication app)
    {
        var router = app.MapGroup("/")
            .WithOpenApi()
            .WithTags(["Webinar"]);

        router.MapGet("/api/v1/webinars/{id:guid}", GetWebinar);
        router.MapGet("/api/v1/webinars", GetWebinars);
        router.MapPost("/api/v1/webinars", CreateWebinar);
    }
}