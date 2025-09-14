using System.Text.Json;
using Confluent.Kafka;
using Confluent.Kafka.Admin;
using Microsoft.Extensions.Options;
using webinar_service.Services;
using webinar_service.Services.WebinarService;

namespace webinar_service.Adapters.Kafka;

public class KafkaConsumer(IServiceProvider serviceProvider, IOptions<KafkaSettings> kafkaOptions) : BackgroundService
{
    private readonly IServiceProvider _serviceProvider = serviceProvider;
    private readonly KafkaSettings _kafkaSettings = kafkaOptions.Value;

    protected override async Task ExecuteAsync(CancellationToken stoppingToken)
    {
        await KafkaAdmin.CreateTopicsIfNotExistsAsync(
            _kafkaSettings.BootstrapServers,
            new TopicSpecification { Name = _kafkaSettings.Topics.CreateWebinar, NumPartitions = 3, ReplicationFactor = 1 },
            new TopicSpecification { Name = _kafkaSettings.Topics.GetWebinar, NumPartitions = 1, ReplicationFactor = 1 },
            new TopicSpecification { Name = _kafkaSettings.Topics.UpdateWebinar, NumPartitions = 1, ReplicationFactor = 1 }
        );
        var config = new ConsumerConfig
        {
            BootstrapServers = _kafkaSettings.BootstrapServers,
            GroupId = _kafkaSettings.GroupId,
            AutoOffsetReset = Enum.Parse<AutoOffsetReset>(_kafkaSettings.AutoOffsetReset, true)
        };
        using var consumer = new ConsumerBuilder<Ignore, string>(config).Build();
        consumer.Subscribe([
            _kafkaSettings.Topics.CreateWebinar,
            _kafkaSettings.Topics.GetWebinar,
            _kafkaSettings.Topics.UpdateWebinar
        ]);

        try
        {
            while (!stoppingToken.IsCancellationRequested)
            {
                var cr = await Task.Run(() => consumer.Consume(stoppingToken), stoppingToken);
                switch (cr.Topic)
                {
                    case "create-webinar":
                        var createInput = JsonSerializer.Deserialize<WebinarIn>(cr.Message.Value);
                        if (createInput != null)
                        {
                            using var scope = _serviceProvider.CreateScope();
                            var webinarService = scope.ServiceProvider.GetRequiredService<WebinarService>();
                            await webinarService.CreateWebinarAsync(createInput);
                        }
                        break;

                    case "get-webinar":
                        // Тут можно десериализовать другой DTO и вызвать метод получения
                        break;

                    case "update-webinar":
                        // Аналогично для обновления
                        break;
                }
            }
        }
        catch (OperationCanceledException)
        {

        }
        finally
        {
            consumer.Close();
        }
    }
}