using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace webinar_service.Dtos;

public class CallCreateIn
{
    [JsonPropertyName("data")]
    public CallCreateData Data { get; set; }
}

public class CallCreateData
{
    [JsonPropertyName("created_by_id")]
    public string CreatedById { get; set; }

    [JsonPropertyName("members")]
    public List<CallMember> Members { get; set; }

    [JsonPropertyName("custom")]
    public Dictionary<string, string> Custom { get; set; }

    [JsonPropertyName("settings_override")]
    public CallSettingsOverride SettingsOverride { get; set; }
}

public class CallMember
{
    [JsonPropertyName("role")]
    public string Role { get; set; }

    [JsonPropertyName("user_id")]
    public string UserId { get; set; }
}

public class CallSettingsOverride
{
    [JsonPropertyName("backstage")]
    public CallBackstageSettings Backstage { get; set; }
}

public class CallBackstageSettings
{
    [JsonPropertyName("enabled")]
    public bool Enabled { get; set; }

    [JsonPropertyName("join_ahead_time_seconds")]
    public int JoinAheadTimeSeconds { get; set; }
}
