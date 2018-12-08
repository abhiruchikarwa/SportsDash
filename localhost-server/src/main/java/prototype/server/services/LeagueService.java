package prototype.server.services;

import com.mashape.unirest.http.HttpResponse;
import com.mashape.unirest.http.JsonNode;
import com.mashape.unirest.http.Unirest;
import com.mashape.unirest.http.exceptions.UnirestException;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins = "*", allowCredentials = "true", allowedHeaders = "*")
public class LeagueService {

  @GetMapping("/api/league")
  public String getLeagueInfo() throws UnirestException {

    HttpResponse<JsonNode> jsonResponse = Unirest
        .get("http://api.sportradar.us/nfl/official/trial/v5/en/league/hierarchy.json")
        .header("accept", "application/json").queryString("api_key", "3kgzp5wm7ryn7pw6tatkr793").asJson();

    return jsonResponse.getBody().toString();
  }

  @GetMapping("/api/standings")
  public String getStandings() throws UnirestException {

    HttpResponse<JsonNode> jsonResponse = Unirest
        .get("http://api.sportradar.us/nfl/official/trial/v5/en/seasons/2018/standings.json")
        .header("accept", "application/json").queryString("api_key", "3kgzp5wm7ryn7pw6tatkr793").asJson();

    return jsonResponse.getBody().toString();
  }

  @GetMapping("/api/schedule")
  public String getSchedule(String weekNumber) throws UnirestException {

    HttpResponse<JsonNode> jsonResponse = Unirest
        .get("http://api.sportradar.us/nfl/official/trial/v5/en/games/2018/REG/schedule.json")
        .header("accept", "application/json").queryString("api_key", "3kgzp5wm7ryn7pw6tatkr793").asJson();

    return jsonResponse.getBody().toString();
  }
}
