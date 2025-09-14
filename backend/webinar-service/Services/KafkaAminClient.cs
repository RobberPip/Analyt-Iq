namespace webinar_service.Services;

using Confluent.Kafka;
using Confluent.Kafka.Admin;

public static class KafkaAdmin
{
    public static async Task CreateTopicsIfNotExistsAsync(string bootstrapServers, params TopicSpecification[] topics)
    {
        var config = new AdminClientConfig { BootstrapServers = bootstrapServers };
        using var adminClient = new AdminClientBuilder(config).Build();

        try
        {
            await adminClient.CreateTopicsAsync(topics);
            Console.WriteLine("Kafka topics created successfully.");
        }
        catch (CreateTopicsException e)
        {
            foreach (var result in e.Results)
            {
                if (result.Error.Code != ErrorCode.TopicAlreadyExists)
                {
                    Console.WriteLine($"Failed to create topic {result.Topic}: {result.Error.Reason}");
                }
            }
        }
    }
}
