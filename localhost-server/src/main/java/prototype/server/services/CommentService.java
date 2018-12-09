package prototype.server.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import prototype.server.models.Comment;
import prototype.server.models.Player;
import prototype.server.models.User;
import prototype.server.repository.CommentRepository;
import prototype.server.repository.PlayerRepository;
import prototype.server.repository.UserRepository;

import java.util.List;

@RestController
@CrossOrigin(origins = "*", allowCredentials = "true", allowedHeaders = "*")
public class CommentService {

    @Autowired
    CommentRepository commentRepository;

    @Autowired
    PlayerRepository playerRepository;

    @Autowired
    UserRepository userRepository;

    @PostMapping("/api/user/{userId}/comment/{playerId}")
    public void addFollowing(
            @PathVariable("userId") int userId,
            @PathVariable("playerId") int playerId,
            @RequestBody Comment comment) {

        if (userRepository.findById(userId).isPresent() && playerRepository.findById(playerId).isPresent()) {

            User user = userRepository.findById(userId).get();
            Player player = playerRepository.findById(playerId).get();
            comment.setUser(user);
            comment.setPlayer(player);
            commentRepository.save(comment);
        }
    }

    @GetMapping("/api/user/{userId}/comment")
    public List<Comment> finCommentsByUser(
            @PathVariable("userId") int userId) {

        if (userRepository.findById(userId).isPresent()) {
            User user = userRepository.findById(userId).get();
            return user.getCommentsGiven();
        }
        return null;
    }

    @GetMapping("/api/player/{playerId}/comment")
    public List<Comment> finCommentsForPlayer(
            @PathVariable("playerId") int playerId) {

        if (playerRepository.findById(playerId).isPresent()) {
            Player player = playerRepository.findById(playerId).get();
            return player.getCommentsReceived();
        }
        return null;
    }

    @DeleteMapping("/api/comment/{commentId}")
    public void deleteComment(
            @PathVariable("commentId") int commentId) {

        if (commentRepository.findById(commentId).isPresent()) {
            commentRepository.deleteById(commentId);
        }
    }
}
