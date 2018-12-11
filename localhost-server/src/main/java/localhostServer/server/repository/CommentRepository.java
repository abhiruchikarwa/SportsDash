package localhostServer.server.repository;

import org.springframework.data.repository.CrudRepository;
import localhostServer.server.models.Comment;

public interface CommentRepository extends CrudRepository<Comment, Integer> {
}
