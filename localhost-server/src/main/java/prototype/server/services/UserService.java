package prototype.server.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import prototype.server.models.Player;
import prototype.server.models.Team;
import prototype.server.models.User;
import prototype.server.repository.PlayerRepository;
import prototype.server.repository.TeamRepository;
import prototype.server.repository.UserRepository;

import java.util.Set;


@RestController
@CrossOrigin(origins = "*", allowCredentials = "true", allowedHeaders = "*")
public class UserService {

    @Autowired
    UserRepository userRepository;

    @Autowired
    PlayerRepository playerRepository;

    @Autowired
    TeamRepository teamRepository;

    @PostMapping("/api/user/{userId}/following/{playerId}")
    public void addFollowing(
            @PathVariable("userId") int userId,
            @PathVariable("playerId") int playerId) {

        if (userRepository.findById(userId).isPresent() && playerRepository.findById(playerId).isPresent()) {
            User user = userRepository.findById(userId).get();
            Player player = playerRepository.findById(playerId).get();
            user.addFollowing(player);
            userRepository.save(user);
        }
    }

    @GetMapping("/api/user/{userId}/following")
    public Set<Player> getFollowing(
            @PathVariable("userId") int userId) {

        if (userRepository.findById(userId).isPresent()) {
            User user = userRepository.findById(userId).get();
            return user.getFollowing();
        }
        return null;
    }

    @DeleteMapping("/api/user/{userId}/following/{playerId}")
    public void removeFollowing(
            @PathVariable("userId") int userId,
            @PathVariable("playerId") int playerId) {

        if (userRepository.findById(userId).isPresent() && playerRepository.findById(playerId).isPresent()) {
            User user = userRepository.findById(userId).get();
            Player player = playerRepository.findById(playerId).get();
            user.removeFollowing(player);
            userRepository.save(user);
        }
    }


    @PostMapping("/api/user/{userId}/favorite/{teamId}")
    public void addFavorite(
            @PathVariable("userId") int userId,
            @PathVariable("teamId") int teamId) {

        if (userRepository.findById(userId).isPresent() && teamRepository.findById(teamId).isPresent()) {
            User user = userRepository.findById(userId).get();
            Team team = teamRepository.findById(teamId).get();
            user.addFavorite(team);
            userRepository.save(user);
        }
    }

    @GetMapping("/api/user/{userId}/favorite")
    public Set<Team> getFavorite(
            @PathVariable("userId") int userId) {

        if (userRepository.findById(userId).isPresent()) {
            User user = userRepository.findById(userId).get();
            return user.getFavorites();
        }
        return null;
    }

    @DeleteMapping("/api/user/{userId}/favorite/{teamId}")
    public void removeFavorite(
            @PathVariable("userId") int userId,
            @PathVariable("teamId") int teamId) {

        if (userRepository.findById(userId).isPresent() && teamRepository.findById(teamId).isPresent()) {
            System.out.println("\nCame here");
            User user = userRepository.findById(userId).get();
            Team team = teamRepository.findById(teamId).get();
            user.removeFavorite(team);
            userRepository.save(user);
        }
    }

}
