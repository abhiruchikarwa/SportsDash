package localhostServer.server.services;

import com.mashape.unirest.http.HttpResponse;
import com.mashape.unirest.http.JsonNode;
import com.mashape.unirest.http.Unirest;
import com.mashape.unirest.http.exceptions.UnirestException;
import localhostServer.server.repository.PlayerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import localhostServer.server.models.Player;
import localhostServer.server.models.PlayerWrapper;
import localhostServer.server.constants.Constants;

import java.util.List;

@RestController
@CrossOrigin(origins = "*", allowCredentials = "true", allowedHeaders = "*")
public class PlayerService {

    @Autowired
    PlayerRepository playerRepository;

    @GetMapping("/api/player/{playerId}/details")
    public String getPlayerDetails(@PathVariable("playerId") String playerId) throws UnirestException {

        HttpResponse<JsonNode> jsonResponse = Unirest.get(Constants.API_URL + "players/" + playerId + "/profile.json")
                .header("accept", "application/json").queryString("api_key", Constants.api_key).asJson();

        return jsonResponse.getBody().toString();
    }

    @GetMapping("/api/player/")
    public List<Player> findAllPlayers() {
        return (List<Player>) playerRepository.findAll();
    }

    @GetMapping("/api/player/{playerId}")
    public Player findPlayerById(@PathVariable("playerId") int playerId) {
        return playerRepository.findById(playerId).orElse(null);
    }

    @GetMapping("/api/player/{playerId}/api_id")
    public Player findPlayerByApiId(@PathVariable("playerId") String playerId) {
        return playerRepository.findPlayerByApiId(playerId);
    }

    @GetMapping("/api/player")
    public List<Player> findMatchingPlayers(@RequestParam("filter") String filterString) {
        return playerRepository.findMatchingPlayers(filterString);
    }

    @PostMapping("/api/player")
    public List<Player> createPlayer(@RequestBody Player player) {
        playerRepository.save(player);
        return (List<Player>) playerRepository.findAll();
    }

    @PostMapping("/api/player/bulk")
    public List<Player> bulkCreatePlayers(@RequestBody PlayerWrapper players) {
        playerRepository.saveAll(players.getPlayerList());
        return (List<Player>) playerRepository.findAll();
    }

    @PutMapping("/api/player/{playerId}")
    public Player updatePlayer(@PathVariable("playerId") int playerId, @RequestBody Player updatedPlayer) {

        if (playerRepository.findById(playerId).isPresent()) {
            Player player = playerRepository.findById(playerId).get();
            player.setApi_id(updatedPlayer.getApi_id());
            player.setName(updatedPlayer.getName());

            return playerRepository.save(player);
        }
        return null;
    }

    @DeleteMapping("/api/player/{playerId}")
    public void deletePlayer(@PathVariable("playerId") int playerId) {
        playerRepository.deleteById(playerId);
    }

    @DeleteMapping("/api/player")
    public void deleteAllPlayers() {
        playerRepository.deleteAll();
    }

}
