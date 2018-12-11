package localhostServer.server.services;

import localhostServer.server.repository.CommentRepository;
import localhostServer.server.repository.PlayerRepository;
import localhostServer.server.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import localhostServer.server.models.Comment;
import localhostServer.server.models.Player;
import localhostServer.server.models.User;

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
    public List<Comment> addComment(
            @PathVariable("userId") int userId,
            @PathVariable("playerId") int playerId,
            @RequestBody Comment comment) {

        if (userRepository.findById(userId).isPresent() && playerRepository.findById(playerId).isPresent()) {

            User user = userRepository.findById(userId).get();
            Player player = playerRepository.findById(playerId).get();
            comment.setUser(user);
            comment.setPlayer(player);
            commentRepository.save(comment);
            return findCommentsForPlayer(playerId);
        }
        return null;
    }

    @GetMapping("/api/user/{userId}/comment")
    public List<Comment> findCommentsByUser(
            @PathVariable("userId") int userId) {

        if (userRepository.findById(userId).isPresent()) {
            User user = userRepository.findById(userId).get();
            return user.getCommentsGiven();
        }
        return null;
    }

    @GetMapping("/api/player/{playerId}/comment")
    public List<Comment> findCommentsForPlayer(
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
