namespace webinar_service.Adapters.Kafka;

public class KafkaSettings
{
    public string BootstrapServers { get; set; } = "";
    public string GroupId { get; set; } = "";
    public KafkaTopics Topics { get; set; } = new();
    public string AutoOffsetReset { get; set; } = "Earliest";
}

public class KafkaTopics
{
    public string CreateWebinar { get; set; } = "";
    public string GetWebinar { get; set; } = "";
    public string UpdateWebinar { get; set; } = "";
}
