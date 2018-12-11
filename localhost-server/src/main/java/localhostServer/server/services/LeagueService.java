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
public class LeagueService {

    @GetMapping("/api/league")
    public String getLeagueInfo() throws UnirestException {

        HttpResponse<JsonNode> jsonResponse = Unirest.get(Constants.API_URL + "league/hierarchy.json")
                .header("accept", "application/json").queryString("api_key", Constants.api_key).asJson();

        return jsonResponse.getBody().toString();
    }

    @GetMapping("/api/standings")
    public String getStandings() throws UnirestException {

        HttpResponse<JsonNode> jsonResponse = Unirest.get(Constants.API_URL + "seasons/2018/standings.json")
                .header("accept", "application/json").queryString("api_key", Constants.api_key).asJson();

        return jsonResponse.getBody().toString();
    }

    @GetMapping("/api/schedule/{weekNum}")
    public String getSchedule(@PathVariable("weekNum") String weekNumber) throws UnirestException {

        HttpResponse<JsonNode> jsonResponse = Unirest
                .get(Constants.API_URL + "games/2018/REG/" + weekNumber + "/schedule.json")
                .header("accept", "application/json").queryString("api_key", Constants.api_key).asJson();

        return jsonResponse.getBody().toString();
    }
}
