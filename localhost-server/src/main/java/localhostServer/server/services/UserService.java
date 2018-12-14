package localhostServer.server.services;

import localhostServer.server.repository.PlayerRepository;
import localhostServer.server.repository.TeamRepository;
import localhostServer.server.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import localhostServer.server.models.Player;
import localhostServer.server.models.Team;
import localhostServer.server.models.User;

import java.util.Set;

import javax.servlet.http.HttpSession;

@RestController
@CrossOrigin(origins = "*", allowCredentials = "true", allowedHeaders = "*")
public class UserService {

    @Autowired
    UserRepository userRepository;

    @Autowired
    PlayerRepository playerRepository;

    @Autowired
    TeamRepository teamRepository;

    @PostMapping("/api/login")
    public User login(@RequestBody User user, HttpSession session) {
        User loggedUser = userRepository.findPersonByCredentials(user.getUsername(), user.getPassword());

        if (loggedUser != null) {
            session.setAttribute("currentUser", loggedUser);
            return loggedUser;
        }
        return null;
    }

    @PostMapping("/api/logout")
    public void logout(HttpSession session) {
        session.invalidate();
    }

    @GetMapping("/api/profile")
    public User profile(HttpSession session) {
        User currentUser = (User) session.getAttribute("currentUser");
        return currentUser;
    }

    @PostMapping("/api/register")
    public User register(@RequestBody User user, HttpSession session) {
        if (userRepository.findPersonByUsername(user.getUsername()) != null)
            return null;
        else if(user.getType().equals("USER")){
            user.setPlayerApiId("");
            User createdUser = userRepository.save(user);
            session.setAttribute("currentUser", createdUser);
            return createdUser;
        }else {
            if(playerRepository.findPlayerByApiId(user.getPlayerApiId())!=null &&
                    userRepository.findPersonByPlayerId(user.getPlayerApiId())==null) {
                User createdUser = userRepository.save(user);
                session.setAttribute("currentUser", createdUser);
                return createdUser;
            }else{
                return null;
            }
        }
    }

    @GetMapping("/api/user/{userId}")
    public User findUserById(@PathVariable("userId") int userId) {
        return userRepository.findById(userId).get();
    }

    @PutMapping("/api/user/update")
    public User update(@RequestBody User user) {
        User userToUpdate = userRepository.findById(user.getId()).get();
        userToUpdate.setPassword(user.getPassword());
        userToUpdate.setFirstName(user.getFirstName());
        userToUpdate.setLastName(user.getLastName());
        userToUpdate.setEmail(user.getEmail());
        return userRepository.save(userToUpdate);
    }

    @PostMapping("/api/user/{userId}/following/{playerId}")
    public Set<Player> addFollowing(@PathVariable("userId") int userId, @PathVariable("playerId") int playerId) {

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
    public Set<Player> getFollowing(@PathVariable("userId") int userId) {

        if (userRepository.findById(userId).isPresent()) {
            User user = userRepository.findById(userId).get();
            return user.getFollowing();
        }
        return null;
    }

    @DeleteMapping("/api/user/{userId}/following/{playerId}")
    public Set<Player> removeFollowing(@PathVariable("userId") int userId, @PathVariable("playerId") int playerId) {

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
    public Set<Team> addFavorite(@PathVariable("userId") int userId, @PathVariable("teamId") int teamId) {

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
    public Set<Team> getFavorite(@PathVariable("userId") int userId) {

        if (userRepository.findById(userId).isPresent()) {
            User user = userRepository.findById(userId).get();
            return user.getFavorites();
        }
        return null;
    }

    @DeleteMapping("/api/user/{userId}/favorite/{teamId}")
    public Set<Team> removeFavorite(@PathVariable("userId") int userId, @PathVariable("teamId") int teamId) {

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
