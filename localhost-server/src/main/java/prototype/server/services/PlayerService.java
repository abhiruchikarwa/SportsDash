package prototype.server.services;

import com.mashape.unirest.http.HttpResponse;
import com.mashape.unirest.http.JsonNode;
import com.mashape.unirest.http.Unirest;
import com.mashape.unirest.http.exceptions.UnirestException;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins = "*", allowCredentials = "true", allowedHeaders = "*")
public class PlayerService {

  @GetMapping("/api/player/{playerId}")
  public String getPlayerDetails(@PathVariable("playerId") String playerId) throws UnirestException {

    HttpResponse<JsonNode> jsonResponse = Unirest
        .get("http://api.sportradar.us/nfl/official/trial/v5/en/players/" + playerId + "/profile.json")
        .header("accept", "application/json").queryString("api_key", "3kgzp5wm7ryn7pw6tatkr793").asJson();

    return jsonResponse.getBody().toString();
  }
}
