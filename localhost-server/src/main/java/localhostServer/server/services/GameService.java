package localhostServer.server.services;

import com.mashape.unirest.http.HttpResponse;
import com.mashape.unirest.http.JsonNode;
import com.mashape.unirest.http.Unirest;
import com.mashape.unirest.http.exceptions.UnirestException;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;
import localhostServer.server.constants.Constants;

@RestController
@CrossOrigin(origins = "*", allowCredentials = "true", allowedHeaders = "*")
public class GameService {

  @GetMapping("/api/game/{gameId}/details")
  public String getGameDetails(@PathVariable("gameId") String gameId) throws UnirestException {

    HttpResponse<JsonNode> jsonResponse = Unirest.get(Constants.API_URL + "games/" + gameId + "/statistics.json")
        .header("accept", "application/json").queryString("api_key", Constants.api_key).asJson();

    return jsonResponse.getBody().toString();
  }
}
