using System.Text;
using System.Text.Json;
using Microsoft.AspNetCore.WebUtilities;
using webinar_service.Dtos;

namespace webinar_service.Services.WebinarService;

public partial class WebinarService
{
    public async Task<WebinarOut?> CreateWebinarAsync(WebinarIn input)
    {
        using var transaction = await _db.Database.BeginTransactionAsync();
        try
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
            
            var dbTask = _db.SaveChangesAsync();   
            var callRoomTask = CreateCallRoom();     

            await Task.WhenAll(dbTask, callRoomTask);

            var callResponse = callRoomTask.Result;
            if (callResponse == null || !callResponse.IsSuccessStatusCode)
            {
                await transaction.RollbackAsync();
                _logger.LogWarning("Call room creation failed, rolled back webinar creation.");
                return null;
            }
            //TODO: Допилить dto
            string responseBody = await callResponse.Content.ReadAsStringAsync();
            await transaction.CommitAsync();

            _logger.LogInformation("Webinar and call room created successfully.");

            return new WebinarOut
            {
                Title = entity.Title,
                Description = entity.Description,
                StartTime = entity.StartTime,
                HostId = entity.HostId
            };
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error during webinar creation.");
            await transaction.RollbackAsync();
            return null;
        }
    }

    private async Task<HttpResponseMessage?> CreateCallRoom()
    {
        try
        {
            string callId = Guid.NewGuid().ToString();
            var queryParameters = new Dictionary<string, string>
            {
                { "api_key", "h82bqdm4gk6u" }
            };
            string urlWithQuery = QueryHelpers.AddQueryString($"/video/call/default/{callId}", queryParameters!);
            var bodyObject = new CallCreateIn()
            {
                Data = new CallCreateData
                {
                    CreatedById = "test",
                    Members = new List<CallMember>
                    {
                        new CallMember { Role = "admin", UserId = "test" }
                    },
                    SettingsOverride = new CallSettingsOverride
                    {
                        Backstage = new CallBackstageSettings
                        {
                            Enabled = true,
                            JoinAheadTimeSeconds = 300
                        }
                    }
                }
            };
            var json = JsonSerializer.Serialize(bodyObject);
            var content = new StringContent(json, Encoding.UTF8, "application/json");
            HttpResponseMessage response = await _clientStream.PostAsync(urlWithQuery, content);
            response.EnsureSuccessStatusCode();
            return response;
        }
        catch (HttpRequestException httpEx)
        {
            _logger.LogError(httpEx, "HTTP error occurred while creating call room.");
            return null;
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Unexpected error occurred while creating call room.");
            return null;
        }
    }
}
