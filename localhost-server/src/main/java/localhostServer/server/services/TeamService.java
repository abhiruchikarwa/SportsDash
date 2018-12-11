package localhostServer.server.services;

import com.mashape.unirest.http.HttpResponse;
import com.mashape.unirest.http.JsonNode;
import com.mashape.unirest.http.Unirest;
import com.mashape.unirest.http.exceptions.UnirestException;
import localhostServer.server.repository.TeamRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import localhostServer.server.models.Team;
import localhostServer.server.models.TeamWrapper;

import java.util.List;

@RestController
@CrossOrigin(origins = "*", allowCredentials = "true", allowedHeaders = "*")
public class TeamService {

    @Autowired
    TeamRepository teamRepository;
    
    @GetMapping("/api/team/{teamId}/details")
    public String getTeamDetails(@PathVariable("teamId") String teamId) throws UnirestException {

        HttpResponse<JsonNode> jsonResponse = Unirest
                .get("http://api.sportradar.us/nfl/official/trial/v5/en/teams/" + teamId + "/profile.json")
                .header("accept", "application/json").queryString("api_key", "3gmsn3sbfgus6hw96bs6pyya").asJson();

        return jsonResponse.getBody().toString();
    }

    @GetMapping("/api/team/")
    public List<Team> findAllTeams() {
        return (List<Team>) teamRepository.findAll();
    }

    @GetMapping("/api/team/{teamId}")
    public Team findTeamById(
            @PathVariable("teamId") int teamId) {
        return teamRepository.findById(teamId).orElse(null);
    }

    @GetMapping("/api/team/{teamId}/api_id")
    public Team findTeamByApiId(@PathVariable("teamId") String teamId) {
        return teamRepository.findTeamByApiId(teamId);
    }

    @GetMapping("/api/team")
    public List<Team> findMatchingTeams(
            @RequestParam("filter") String filterString) {
        return teamRepository.findMatchingTeams(filterString);
    }

    @PostMapping("/api/team")
    public List<Team> createTeam(
            @RequestBody Team team) {
        teamRepository.save(team);
        return (List<Team>) teamRepository.findAll();
    }

    @PostMapping("/api/team/bulk")
    public List<Team> bulkCreateTeams(
            @RequestBody TeamWrapper teams) {
        teamRepository.saveAll(teams.getTeamList());
        return (List<Team>) teamRepository.findAll();
    }

    @PutMapping("/api/team/{teamId}")
    public Team updateTeam(
            @PathVariable("teamId") int teamId,
            @RequestBody Team updatedTeam) {

        if (teamRepository.findById(teamId).isPresent()) {
            Team team = teamRepository.findById(teamId).get();
            team.setApi_id(updatedTeam.getApi_id());
            team.setName(updatedTeam.getName());

            return teamRepository.save(team);
        }
        return null;
    }

    @DeleteMapping("/api/team/{teamId}")
    public void deleteTeam(
            @PathVariable("teamId") int teamId) {
        teamRepository.deleteById(teamId);
    }

    @DeleteMapping("/api/team")
    public void deleteAllTeams() {
        teamRepository.deleteAll();
    }
}
