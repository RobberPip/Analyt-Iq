using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi.Models;
using webinar_service.Adapters;
using webinar_service.Adapters.Http;
using webinar_service.Adapters.Kafka;
using webinar_service.Db;
using webinar_service.Services.WebinarService;

var builder = WebApplication.CreateBuilder(args);

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