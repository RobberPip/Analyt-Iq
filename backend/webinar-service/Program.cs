using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi.Models;
using Serilog;
using Serilog.Formatting.Compact;
using webinar_service.Adapters;
using webinar_service.Adapters.Http;
using webinar_service.Adapters.Kafka;
using webinar_service.Db;
using webinar_service.Services.WebinarService;

var builder = WebApplication.CreateBuilder(args);
// Logs
var loggerConfig = new LoggerConfiguration()
    .MinimumLevel.Information()
    .Enrich.FromLogContext();
if (builder.Environment.IsDevelopment())
{
    loggerConfig = loggerConfig.WriteTo.Console();
}
loggerConfig = loggerConfig.WriteTo.File(
    new RenderedCompactJsonFormatter(),
    path: "logs/webinar_service.log",
    rollingInterval: RollingInterval.Day,
    retainedFileCountLimit: 7);
Log.Logger = loggerConfig.CreateLogger();
builder.Host.UseSerilog();

builder.Services.AddOpenApi();
// Database
var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");  
builder.Services.AddDbContext<AppDbContext>(options => options.UseNpgsql(connectionString));

builder.Services.AddScoped<WebinarService>();


// Swagger
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new OpenApiInfo
    {
        Title = "Webinar API",
        Version = "v1"
    });
});
builder.Services.Configure<KafkaSettings>(
    builder.Configuration.GetSection("Kafka")
);

builder.Services.AddHostedService<KafkaConsumer>();
var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI(opt =>
        opt.SwaggerEndpoint("/swagger/v1/swagger.json", "App"));
}
app.AddWebinarEndpoints();
app.UseHttpsRedirection();

app.Run();