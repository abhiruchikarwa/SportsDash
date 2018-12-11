package localhostServer.server.services;

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
public class GameService {

  @GetMapping("/api/game/{gameId}/details")
  public String getGameDetails(@PathVariable("gameId") String gameId) throws UnirestException {

    HttpResponse<JsonNode> jsonResponse = Unirest
        .get("http://api.sportradar.us/nfl/official/trial/v5/en/games/" + gameId + "/statistics.json")
        .header("accept", "application/json").queryString("api_key", "3gmsn3sbfgus6hw96bs6pyya").asJson();

    return jsonResponse.getBody().toString();
  }
}
