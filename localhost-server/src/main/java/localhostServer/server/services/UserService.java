package localhostServer.server.services;

import localhostServer.server.repository.PlayerRepository;
import localhostServer.server.repository.TeamRepository;
import localhostServer.server.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import localhostServer.server.models.Player;
import localhostServer.server.models.Team;
import localhostServer.server.models.User;

import java.util.List;
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

    @PostMapping("/api/user/login")
    public User login(@RequestBody User user) {
        return userRepository.findPersonByCredentials(user.getUsername(), user.getPassword());
    }

    @PostMapping("/api/user/register")
    public User register(@RequestBody User user) {
        if (userRepository.findPersonByUsername(user.getUsername()) != null)
            return null;
        else {
            userRepository.save(user);
            return user;
        }
    }

    @GetMapping("/api/user/{userId}")
    public User findUserById(@PathVariable("userId") int userId) {
        return userRepository.findById(userId).get();
    }

    @PutMapping("/api/user/update")
    public void update(@RequestBody User user) {
        User u = userRepository.findById(user.getId()).get();
        u.setPassword(user.getPassword());
        u.setFirstName(user.getFirstName());
        u.setLastName(user.getLastName());
        u.setEmail(user.getEmail());
        userRepository.save(u);
    }

    @PostMapping("/api/user/{userId}/following/{playerId}")
    public Set<Player> addFollowing(
            @PathVariable("userId") int userId,
            @PathVariable("playerId") int playerId) {

        if (userRepository.findById(userId).isPresent() && playerRepository.findById(playerId).isPresent()) {
            User user = userRepository.findById(userId).get();
            Player player = playerRepository.findById(playerId).get();
            user.addFollowing(player);
            userRepository.save(user);
            return userRepository.findById(userId).get().getFollowing();
        }
        return null;
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
    public Set<Player> removeFollowing(
            @PathVariable("userId") int userId,
            @PathVariable("playerId") int playerId) {

        if (userRepository.findById(userId).isPresent() && playerRepository.findById(playerId).isPresent()) {
            User user = userRepository.findById(userId).get();
            Player player = playerRepository.findById(playerId).get();
            user.removeFollowing(player);
            userRepository.save(user);
            return userRepository.findById(userId).get().getFollowing();
        }
        return null;
    }


    @PostMapping("/api/user/{userId}/favorite/{teamId}")
    public Set<Team> addFavorite(
            @PathVariable("userId") int userId,
            @PathVariable("teamId") int teamId) {

        if (userRepository.findById(userId).isPresent() && teamRepository.findById(teamId).isPresent()) {
            User user = userRepository.findById(userId).get();
            Team team = teamRepository.findById(teamId).get();
            user.addFavorite(team);
            userRepository.save(user);
            return userRepository.findById(userId).get().getFavorites();
        }
        return null;
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
    public Set<Team> removeFavorite(
            @PathVariable("userId") int userId,
            @PathVariable("teamId") int teamId) {

        if (userRepository.findById(userId).isPresent() && teamRepository.findById(teamId).isPresent()) {
            User user = userRepository.findById(userId).get();
            Team team = teamRepository.findById(teamId).get();
            user.removeFavorite(team);
            userRepository.save(user);
            return userRepository.findById(userId).get().getFavorites();
        }
        return null;
    }

}
